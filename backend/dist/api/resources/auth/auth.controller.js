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
            console.log(passwordHash);
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
          case 6:
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
            passwordHash = (0, _md["default"])(password);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsIk9UUF9LRVkiLCJlbmNvZGluZyIsInN0ZXAiLCJNYXRoIiwiZmxvb3IiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lTm8iLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInNlbnQiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYWJydXB0IiwiYXVpZCIsImRlbGV0ZVVzZXJMaXN0IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZXN0cm95IiwiciIsInJlIiwidmVyaWZ5TWFpbCIsIl9jYWxsZWU3IiwiX3JlcSRib2R5NCIsInRyYW5zcG9ydGVyIiwibWFpbE9wdGlvbnMiLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJNQUlMX1VTRVJOQU1FIiwicGFzcyIsIk1BSUxfUEFTU1dPUkQiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImNvbmNhdCIsIlVSTF9GUk9OVEVORCIsInNlbmRNYWlsIiwidDAiLCJlcnJvciIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9hdXRoL2F1dGguY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdC1ub2RlanMnO1xuaW1wb3J0IHNwZWFrZWFzeSBmcm9tICdzcGVha2Vhc3knO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGVFbWFpbCB9IGZyb20gJy4vLi4vLi4vLi4vZnVuY3Rpb25zJ1xuaW1wb3J0IG1kNSBmcm9tIFwibWQ1XCJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCJcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICAgIHJldHVybiBKV1Quc2lnbih7XG4gICAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxuICAgICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0OiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgZXhwOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMClcbiAgICB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XG4gICAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XG4gICAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSksXG4gICAgICAgIHdpbmRvdzogMFxuICAgIH0pO1xuICAgIHJldHVybiBleHBpcnlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lTm8sIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkSGFzaClcbiAgICAgICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICAgICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKGZpbmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuanNvbihcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBob25lTm86IHBob25lTm8sXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kRW1wbG95ZWVQYXNzd29yZChlbWFpbCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBrZXk6IG90cCwgbXNnOiBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgKyBlbWFpbCArIFwiIC5cIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFzeW5jIGZpbmRVc2VyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IGF0dHJpYnV0ZXM6W1wiZmlyc3ROYW1lXCIsXCJsYXN0TmFtZVwiLCBcImVtYWlsXCJdLCB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LnVzZXJfaWQgfX0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIGdldEFsbFVzZXJMaXN0KHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZEFsbCgpXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgdXNlclVwZGF0ZShyZXEscmVzLG5leHQpe1xuICAgICAgICBjb25zdCB7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSA/IGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2g6IHVzZXIucGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5IDogdmVyaWZ5PyB2ZXJpZnk6IHVzZXIudmVyaWZ5XG4gICAgICAgICAgICAgICAgfSwgeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVzZXIgdXBkYXRlIHN1Y2Nlc3NzZnVsbHlcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vICAgICB2YXIgdG9rZW4gPSBKV1RTaWduKHJlcS51c2VyLCBkYXRlKTtcbiAgICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcbiAgICAvLyAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAgIC8vICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgICAvLyAgICAgfSk7XG4gICAgICAgIFxuICAgIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbiwgcm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAgIC8vIH0sXG4gICAgYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCB9PSByZXEuYm9keVxuICAgICAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpKVxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge2VtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICBpZihmaW5kVXNlcikge1xuICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRp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