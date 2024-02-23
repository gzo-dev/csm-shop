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
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2F4aW9zIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsIk9UUF9LRVkiLCJlbmNvZGluZyIsInN0ZXAiLCJNYXRoIiwiZmxvb3IiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lTm8iLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJiY3J5cHQiLCJoYXNoU3luYyIsIlJlcXVlc3RFcnJvciIsInVwZGF0ZSIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsInVpZCIsImRhdGFWYWx1ZXMiLCJhYnJ1cHQiLCJhdWlkIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTciLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIlxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIlxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiXG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZU5vLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xuICAgICAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmVObzogcGhvbmVObyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogb3RwLCBtc2c6IFwiTmV3IFJlZ2lzdHJhdGlvbiBhZGRlZCBhbmQgcGFzc3dvcmQgaGFzIGJlZW4gc2VudCB0byBcIiArIGVtYWlsICsgXCIgLlwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgYXR0cmlidXRlczpbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCIsIFwiZW1haWxcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnkudXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlciwgb2s6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCk7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lID8gZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lID8gbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCA/IHBhc3N3b3JkSGFzaDogdXNlci5wYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogdXNlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlID8gcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnkgOiB2ZXJpZnk/IHZlcmlmeTogdXNlci52ZXJpZnlcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gICAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAgIC8vICAgICB9KTtcbiAgICAgICAgXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gICAgLy8gfSxcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7ZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgIGlmKGZpbmRVc2VyKSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgIGFzeW5jIGRlbGV0ZVVzZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZH0gfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KS50aGVuKHIgPT4gW3IsIGRhdGFdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N0YXR1cyc6IFwiZGVsZXRlZCB1c2VybGlzdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgIH0sXG4gICAgYXN5bmMgdmVyaWZ5TWFpbChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XG4gICAgICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgZmlyc3ROYW1lIH0gPSByZXEuYm9keTtcbiAgICBcbiAgICAgICAgICAgIC8vIFThuqFvIG3hu5l0IG3DoyB4w6FjIHRo4buxYyBuZ+G6q3Ugbmhpw6puXG4gICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggdGjDtG5nIHRpbiBtYWlsIHNlcnZlciAoZMO5bmcgR21haWwgbMOgbSB2w60gZOG7pSlcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIHNlcnZpY2U6ICdnbWFpbCcsXG4gICAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCAvLyBUaGF5IGLhurFuZyBt4bqtdCBraOG6qXUgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIG7hu5lpIGR1bmcgZW1haWxcbiAgICAgICAgICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZyb206IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ0VtYWlsIFZlcmlmaWNhdGlvbicsIC8vIFRpw6p1IMSR4buBIGVtYWlsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5VUkxfRlJPTlRFTkR9L3NpZ251cC9zdWNjZXNzXCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU4OWZmOyBjb2xvcjogI2ZmZjsgd2lkdGg6IDEwMCVcIj5DbGljayBoZXJlIHRvIGNvbXBsZXRlIHNpbmd1cCBwcm9jZXNzPC9hPlxuICAgICAgICAgICAgICAgIGAgLy8gTuG7mWkgZHVuZyBlbWFpbCBjaOG7qWEgbcOjIHjDoWMgdGjhu7FjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBH4butaSBlbWFpbFxuICAgICAgICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xuICAgICAgICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcbiAgICAgICAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFjhu60gbMO9IGzhu5dpIG7hur91IGPDs1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWw6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBQyxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUcsT0FBQSxHQUFBRCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUksT0FBQSxHQUFBRixzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUssYUFBQSxHQUFBSCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQU0sVUFBQSxHQUFBSixzQkFBQSxDQUFBRixPQUFBO0FBRUEsSUFBQU8sR0FBQSxHQUFBTCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQVEsV0FBQSxHQUFBTixzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQVMsTUFBQSxHQUFBUCxzQkFBQSxDQUFBRixPQUFBO0FBSEE7O0FBS0EsSUFBSVUsT0FBTyxHQUFHLFNBQVZBLE9BQU9BLENBQWFDLElBQUksRUFBRUMsSUFBSSxFQUFFO0VBQ2hDLE9BQU9DLHdCQUFHLENBQUNDLElBQUksQ0FBQztJQUNaQyxHQUFHLEVBQUVDLGtCQUFNLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSTtJQUNwQkMsR0FBRyxFQUFFUixJQUFJLENBQUNTLEVBQUU7SUFDWkMsR0FBRyxFQUFHVixJQUFJLENBQUNXLElBQUk7SUFDZkMsR0FBRyxFQUFFWCxJQUFJLENBQUNZLE9BQU8sQ0FBQyxDQUFDO0lBQ25CQyxHQUFHLEVBQUUsSUFBSUMsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsVUFBVSxDQUFDZixJQUFJLENBQUNnQixVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUU7RUFDckQsQ0FBQyxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsVUFBVSxDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFTQyxXQUFXQSxDQUFBLEVBQUc7RUFDbkIsSUFBSUMsS0FBSyxHQUFHQyxx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