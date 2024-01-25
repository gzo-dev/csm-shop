"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _config = _interopRequireDefault(require("../../../config"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _axios = _interopRequireDefault(require("axios"));
// import { validateEmail } from './../../../functions'

var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    iss: _config["default"].app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, process.env.JWT_SECRET);
};
function generateOtp() {
  var token = _speakeasy["default"].totp({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30)
  });
  return token;
}
function verifyOtp(token) {
  var expiry = _speakeasy["default"].totp.verify({
    secret: process.env.OTP_KEY,
    encoding: 'base32',
    token: token,
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30),
    window: 0
  });
  return expiry;
}
var _default = {
  addUser: function addUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, firstName, lastName, phoneNo, email, address, password, role, verify, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNo = _req$body.phoneNo, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify;
            passwordHash = (0, _md["default"])(password);
            token = generateOtp();
            otp = verifyOtp(token);
            _models.db.user.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (find) {
              if (find) {
                return res.status(409).json("Email is already in use");
              }
              return _models.db.user.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                address: address,
                password: passwordHash,
                verify: verify,
                role: role
              });
            }).then(function (user) {
              if (user) {
                _mailer["default"].sendEmployeePassword(email, token);
                return res.status(200).json({
                  success: true,
                  key: otp,
                  msg: "New Registration added and password has been sent to " + email + " ."
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  findUser: function findUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _models.db.user.findOne({
              attributes: ["firstName", "lastName", "email"],
              where: {
                id: req.query.user_id
              }
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user,
                  ok: true
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  getAllUserList: function getAllUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _models.db.user.findAll().then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  userUpdate: function userUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, passwordHash;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify;
            passwordHash = _bcryptNodejs["default"].hashSync(password);
            _models.db.user.findOne({
              where: {
                email: email
              },
              paranoid: false
            }).then(function (user) {
              if (!user) {
                throw new RequestError('User is not found', 409);
              }
              return _models.db.user.update({
                firstName: firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName,
                password: password ? passwordHash : user.passwordHash,
                address: address ? address : user.address,
                role: role ? role : user.role,
                verify: verify ? verify : user.verify
              }, {
                where: {
                  id: id
                }
              });
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  msg: "User update successsfully"
                });
              } else res.status(500).json({
                'success': false
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  // async login(req, res, next) {
  //     var date = new Date();
  //     var token = JWTSign(req.user, date);
  //     res.cookie('XSRF-token',token, {
  //         expire: new Date().setMinutes(date.getMinutes() + 30),
  //         httpOnly: true, secure: config.app.secure
  //     });
  //     return res.status(200).json({ success: true ,token, role: req.user.role});
  // },
  login: function login(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body3, email, password, findUser, token;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password; // var date = new Date();
            // console.log(password)
            // console.log(bcrypt.hashSync(password))
            _context5.next = 3;
            return _models.db.user.findOne({
              where: {
                email: email,
                password: (0, _md["default"])(password)
              }
            });
          case 3:
            findUser = _context5.sent;
            if (!findUser) {
              _context5.next = 9;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role
            }));
          case 9:
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  deleteUserList: function deleteUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _models.db.user.findOne({
              where: {
                id: req.body.id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.user.destroy({
                  where: {
                    id: req.body.id
                  }
                }).then(function (r) {
                  return [r, data];
                });
              }
              throw new RequestError('User is not found', 409);
            }).then(function (re) {
              return res.status(200).json({
                'status': "deleted userlist Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  verifyMail: function verifyMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body4, email, password, firstName, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            // Nhận email từ request body
            _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password, firstName = _req$body4.firstName; // Tạo một mã xác thực ngẫu nhiên
            // Cấu hình thông tin mail server (dùng Gmail làm ví dụ)
            transporter = _nodemailer["default"].createTransport({
              service: 'gmail',
              auth: {
                user: process.env.MAIL_USERNAME,
                // Thay bằng địa chỉ email của bạn
                pass: process.env.MAIL_PASSWORD // Thay bằng mật khẩu email của bạn
              }
            }); // Cấu hình nội dung email
            mailOptions = {
              from: process.env.MAIL_USERNAME,
              // Thay bằng địa chỉ email của bạn
              to: email,
              // Địa chỉ email người dùng cần xác thực
              subject: 'Email Verification',
              // Tiêu đề email
              html: "\n                    <a href=\"".concat(process.env.URL_FRONTEND, "/signup/success\" style=\"padding: 10px; border-radius: 10px; background-color: #2e89ff; color: #fff; width: 100%\">Click here to complete singup process</a>\n                ") // Nội dung email chứa mã xác thực
            }; // Gửi email
            _context7.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
            res.json({
              success: true
            });
            _context7.next = 13;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            // Xử lý lỗi nếu có
            console.error('Error sending verification email:', _context7.t0);
            res.status(500).json({
              success: false,
              error: 'Error sending verification email'
            });
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2F4aW9zIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsIk9UUF9LRVkiLCJlbmNvZGluZyIsInN0ZXAiLCJNYXRoIiwiZmxvb3IiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lTm8iLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJiY3J5cHQiLCJoYXNoU3luYyIsIlJlcXVlc3RFcnJvciIsInVwZGF0ZSIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsInVpZCIsImRhdGFWYWx1ZXMiLCJhYnJ1cHQiLCJhdWlkIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTciLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIlxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIlxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiXG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZU5vLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xuICAgICAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmVObzogcGhvbmVObyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogb3RwLCBtc2c6IFwiTmV3IFJlZ2lzdHJhdGlvbiBhZGRlZCBhbmQgcGFzc3dvcmQgaGFzIGJlZW4gc2VudCB0byBcIiArIGVtYWlsICsgXCIgLlwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgYXR0cmlidXRlczpbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCIsIFwiZW1haWxcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnkudXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlciwgb2s6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lID8gZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lID8gbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCA/IHBhc3N3b3JkSGFzaDogdXNlci5wYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogdXNlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlID8gcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnkgOiB2ZXJpZnk/IHZlcmlmeTogdXNlci52ZXJpZnlcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gICAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAgIC8vICAgICB9KTtcbiAgICAgICAgXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gICAgLy8gfSxcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7ZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgIGlmKGZpbmRVc2VyKSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xuICAgICAg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