"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../../../models");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mailer = _interopRequireDefault(require("../../../mailer"));
var _config = _interopRequireDefault(require("../../../config"));
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _addUser$findUser$get; // import { validateEmail } from './../../../functions'
var JWTSign = function JWTSign(user, date) {
  return _jsonwebtoken["default"].sign({
    iss: _config["default"].app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 30)
  }, process.env.JWT_SECRET);
};
function generateRandomString(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
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
var _default = (_addUser$findUser$get = {
  addUser: function addUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, firstName, lastName, phone, email, address, password, role, verify, note, user_id, avatar, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify, note = _req$body.note, user_id = _req$body.user_id, avatar = _req$body.avatar;
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
                phone: phone,
                address: address,
                password: passwordHash,
                verify: verify,
                role: role,
                note: note ? note : "",
                user_id: user_id ? user_id : "",
                avatar: avatar ? avatar : "    "
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
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, phone, status, note, user_id, avatar, passwordHash;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify, phone = _req$body2.phone, status = _req$body2.status, note = _req$body2.note, user_id = _req$body2.user_id, avatar = _req$body2.avatar;
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
                verify: status ? status : user.verify,
                phone: phone ? phone : user.phone,
                note: note ? note : "",
                user_id: user_id ? user_id : "",
                avatar: avatar ? avatar : ""
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
      var _req$body3, email, password, deviceCode, findUser, _findUser$device, _findUser$device2, _findUser$device3, _findUser$device4, _findUser$device5, _findUser$device6, _findUser$device7, _findUser$device8, device1Code, token, device2Code, _token, _device1Code, data, _token2, findUserdevice1, findUserdevice2, _token3;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, deviceCode = _req$body3.deviceCode; // var date = new Date();
            // console.log(password)
            // console.log(bcrypt.hashSync(password))
            _context5.next = 3;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 3:
            findUser = _context5.sent;
            if (!(findUser.verify === null)) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 8:
            if (!(findUser !== null && findUser !== void 0 && findUser.verify)) {
              _context5.next = 53;
              break;
            }
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device = findUser.device1) === null || _findUser$device === void 0 ? void 0 : _findUser$device.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device2 = findUser.device2) === null || _findUser$device2 === void 0 ? void 0 : _findUser$device2.length) > 0)) {
              _context5.next = 17;
              break;
            }
            device1Code = generateRandomString(10);
            _context5.next = 13;
            return _models.db.user.update({
              device1: device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 13:
            token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device1Code
            }));
          case 17:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device3 = findUser.device2) === null || _findUser$device3 === void 0 ? void 0 : _findUser$device3.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device4 = findUser.device1) === null || _findUser$device4 === void 0 ? void 0 : _findUser$device4.length) > 0)) {
              _context5.next = 25;
              break;
            }
            device2Code = generateRandomString(10);
            _context5.next = 21;
            return _models.db.user.update({
              device2: device2Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 21:
            _token = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device2Code
            }));
          case 25:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device5 = findUser.device1) === null || _findUser$device5 === void 0 ? void 0 : _findUser$device5.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device6 = findUser.device2) === null || _findUser$device6 === void 0 ? void 0 : _findUser$device6.length) <= 0)) {
              _context5.next = 36;
              break;
            }
            _device1Code = generateRandomString(10);
            console.log(_device1Code);
            _context5.next = 30;
            return _models.db.user.update({
              device1: _device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 30:
            data = _context5.sent;
            console.log(data);
            _token2 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token2,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: _device1Code
            }));
          case 36:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device7 = findUser.device2) === null || _findUser$device7 === void 0 ? void 0 : _findUser$device7.length) > 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device8 = findUser.device1) === null || _findUser$device8 === void 0 ? void 0 : _findUser$device8.length) > 0)) {
              _context5.next = 51;
              break;
            }
            _context5.next = 39;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device1: deviceCode
              }
            });
          case 39:
            findUserdevice1 = _context5.sent;
            _context5.next = 42;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device2: deviceCode
              }
            });
          case 42:
            findUserdevice2 = _context5.sent;
            _token3 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            if (!(findUserdevice1 !== null && findUserdevice1 !== void 0 && findUserdevice1.email || findUserdevice2 !== null && findUserdevice2 !== void 0 && findUserdevice2.email)) {
              _context5.next = 49;
              break;
            }
            console.log(5);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token3,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: deviceCode
            }));
          case 49:
            console.log(6);
            return _context5.abrupt("return", res.status(200).json({
              success: false,
              login: false,
              third: true
            }));
          case 51:
            _context5.next = 54;
            break;
          case 53:
            return _context5.abrupt("return", res.status(200).json({
              success: false
            }));
          case 54:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  }
}, (0, _defineProperty2["default"])(_addUser$findUser$get, "findUser", function findUser(req, res, next) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var _req$query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _models.db.user.findOne({
            attributes: ["firstName", "lastName", "email", "avatar", "phone", "address", "role"],
            where: {
              id: (_req$query = req.query) === null || _req$query === void 0 ? void 0 : _req$query.user_id
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
            return res.status(500).json({
              'success': false
            });
            console.log(err);
            next(err);
          });
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }))();
}), (0, _defineProperty2["default"])(_addUser$findUser$get, "deleteUserList", function deleteUserList(req, res, next) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
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
          return _context7.stop();
      }
    }, _callee7);
  }))();
}), (0, _defineProperty2["default"])(_addUser$findUser$get, "verifyMail", function verifyMail(req, res) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var _req$body4, email, password, firstName, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
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
          _context8.next = 6;
          return transporter.sendMail(mailOptions);
        case 6:
          // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
          res.json({
            success: true
          });
          _context8.next = 13;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          // Xử lý lỗi nếu có
          console.error('Error sending verification email:', _context8.t0);
          res.status(500).json({
            success: false,
            error: 'Error sending verification email'
          });
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }))();
}), _addUser$findUser$get);
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2FkZFVzZXIkZmluZFVzZXIkZ2V0IiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJub3RlIiwidXNlcl9pZCIsImF2YXRhciIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJmaW5kVXNlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYXR0cmlidXRlcyIsInF1ZXJ5IiwiZGF0YSIsIm9rIiwiZ2V0QWxsVXNlckxpc3QiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJ1c2VyVXBkYXRlIiwiX2NhbGxlZTQiLCJfcmVxJGJvZHkyIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiUmVxdWVzdEVycm9yIiwidXBkYXRlIiwibG9naW4iLCJfY2FsbGVlNSIsIl9yZXEkYm9keTMiLCJkZXZpY2VDb2RlIiwiX2ZpbmRVc2VyJGRldmljZSIsIl9maW5kVXNlciRkZXZpY2UyIiwiX2ZpbmRVc2VyJGRldmljZTMiLCJfZmluZFVzZXIkZGV2aWNlNCIsIl9maW5kVXNlciRkZXZpY2U1IiwiX2ZpbmRVc2VyJGRldmljZTYiLCJfZmluZFVzZXIkZGV2aWNlNyIsIl9maW5kVXNlciRkZXZpY2U4IiwiZGV2aWNlMUNvZGUiLCJkZXZpY2UyQ29kZSIsIl90b2tlbiIsIl9kZXZpY2UxQ29kZSIsIl90b2tlbjIiLCJmaW5kVXNlcmRldmljZTEiLCJmaW5kVXNlcmRldmljZTIiLCJfdG9rZW4zIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsImFicnVwdCIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJ0aGlyZCIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJfY2FsbGVlNiIsIl9yZXEkcXVlcnkiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZWxldGVVc2VyTGlzdCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZGVzdHJveSIsInIiLCJyZSIsInZlcmlmeU1haWwiLCJfY2FsbGVlOCIsIl9yZXEkYm9keTQiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4Iiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwiTUFJTF9VU0VSTkFNRSIsInBhc3MiLCJNQUlMX1BBU1NXT1JEIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJjb25jYXQiLCJVUkxfRlJPTlRFTkQiLCJzZW5kTWFpbCIsInQwIiwiZXJyb3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG1haWxlciBmcm9tICcuLi8uLi8uLi9tYWlsZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBzcGVha2Vhc3kgZnJvbSAnc3BlYWtlYXN5Jztcbi8vIGltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiXG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnksIG5vdGUsIHVzZXJfaWQsIGF2YXRhciB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXNzd29yZEhhc2gpXG4gICAgICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XG4gICAgICAgIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbihmaW5kID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIiwgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIiAgICBcIiBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogb3RwLCBtc2c6IFwiTmV3IFJlZ2lzdHJhdGlvbiBhZGRlZCBhbmQgcGFzc3dvcmQgaGFzIGJlZW4gc2VudCB0byBcIiArIGVtYWlsICsgXCIgLlwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgYXR0cmlidXRlczpbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCIsIFwiZW1haWxcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnkudXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlciwgb2s6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5LCBwaG9uZSwgc3RhdHVzLCBub3RlLCB1c2VyX2lkLCBhdmF0YXIgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUgPyBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoOiB1c2VyLnBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUgPyByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0sIHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVc2VyIHVwZGF0ZSBzdWNjZXNzc2Z1bGx5XCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIC8vIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgLy8gICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAvLyAgICAgdmFyIHRva2VuID0gSldUU2lnbihyZXEudXNlciwgZGF0ZSk7XG4gICAgLy8gICAgIHJlcy5jb29raWUoJ1hTUkYtdG9rZW4nLHRva2VuLCB7XG4gICAgLy8gICAgICAgICBleHBpcmU6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcbiAgICAvLyAgICAgICAgIGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGNvbmZpZy5hcHAuc2VjdXJlXG4gICAgLy8gICAgIH0pO1xuICAgICAgICBcbiAgICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSAsdG9rZW4sIHJvbGU6IHJlcS51c2VyLnJvbGV9KTtcbiAgICAvLyB9LFxuICAgIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IHtlbWFpbCwgcGFzc3dvcmQsIGRldmljZUNvZGUgfT0gcmVxLmJvZHlcbiAgICAgICAgLy8gdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXNzd29yZClcbiAgICAgICAgLy8gY29uc29sZS5sb2coYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkKSlcbiAgICAgICAgY29uc3QgZmluZFVzZXI9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgIGlmKGZpbmRVc2VyLnZlcmlmeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8udmVyaWZ5KSB7XG4gICAgICAgICAgICBpZihmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UxQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTE6IGRldmljZTFDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UyQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTI6IGRldmljZTJDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UyQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTFDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UxQ29kZSlcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhPSBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMTogZGV2aWNlMUNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UxPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMTogZGV2aWNlQ29kZX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTI6IGRldmljZUNvZGV9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIGlmKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg1KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBsb2dpbjogZmFsc2UsIHRoaXJkOiB0cnVlfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiLCBcImF2YXRhclwiLCBcInBob25lXCIsIFwiYWRkcmVzc1wiLCBcInJvbGVcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnk/LnVzZXJfaWQgfX0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkgeyBcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkfSB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pLnRoZW4ociA9PiBbciwgZGF0YV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIHVzZXJsaXN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfSxcbiAgICBhc3luYyB2ZXJpZnlNYWlsKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBOaOG6rW4gZW1haWwgdOG7qyByZXF1ZXN0IGJvZHlcbiAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xuICAgIFxuICAgICAgICAgICAgLy8gVOG6oW8gbeG7mXQgbcOjIHjDoWMgdGjhu7FjIG5n4bqrdSBuaGnDqm5cbiAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCB0aMO0bmcgdGluIG1haWwgc2VydmVyIChkw7luZyBHbWFpbCBsw6BtIHbDrSBk4bulKVxuICAgICAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgICAgc2VydmljZTogJ2dtYWlsJyxcbiAgICAgICAgICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMX1BBU1NXT1JEIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxuICAgICAgICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgdG86IGVtYWlsLCAvLyDEkOG7i2EgY2jhu4kgZW1haWwgbmfGsOG7nWkgZMO5bmcgY+G6p24geMOhYyB0aOG7sWNcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiAnRW1haWwgVmVyaWZpY2F0aW9uJywgLy8gVGnDqnUgxJHhu4EgZW1haWxcbiAgICAgICAgICAgICAgICBodG1sOiBgXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LlVSTF9GUk9OVEVORH0vc2lnbnVwL3N1Y2Nlc3NcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6ICMyZTg5ZmY7IGNvbG9yOiAjZmZmOyB3aWR0aDogMTAwJVwiPkNsaWNrIGhlcmUgdG8gY29tcGxldGUgc2luZ3VwIHByb2Nlc3M8L2E+XG4gICAgICAgICAgICAgICAgYCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEfhu61pIGVtYWlsXG4gICAgICAgICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBUcuG6oyB24buBIG3DoyB4w6FjIHRo4buxYyDEkeG7gyBz4butIGThu6VuZyBzYXUgbsOgeSAodsOtIGThu6UgxJHhu4Mga2nhu4NtIHRyYSBtw6Mga2hpIG5nxrDhu51pIGTDuW5nIG5o4bqtcCB2w6BvKVxuICAgICAgICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gWOG7rSBsw70gbOG7l2kgbuG6v3UgY8OzXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDonLCBlcnJvcik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsJyB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBQyxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUcsT0FBQSxHQUFBRCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUksT0FBQSxHQUFBRixzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUssYUFBQSxHQUFBSCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQU0sVUFBQSxHQUFBSixzQkFBQSxDQUFBRixPQUFBO0FBRUEsSUFBQU8sR0FBQSxHQUFBTCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQVEsV0FBQSxHQUFBTixzQkFBQSxDQUFBRixPQUFBO0FBQW1DLElBQUFTLHFCQUFBLEVBRm5DO0FBSUEsSUFBSUMsT0FBTyxHQUFHLFNBQVZBLE9BQU9BLENBQWFDLElBQUksRUFBRUMsSUFBSSxFQUFFO0VBQ2hDLE9BQU9DLHdCQUFHLENBQUNDLElBQUksQ0FBQztJQUNaQyxHQUFHLEVBQUVDLGtCQUFNLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSTtJQUNwQkMsR0FBRyxFQUFFUixJQUFJLENBQUNTLEVBQUU7SUFDWkMsR0FBRyxFQUFHVixJQUFJLENBQUNXLElBQUk7SUFDZkMsR0FBRyxFQUFFWCxJQUFJLENBQUNZLE9BQU8sQ0FBQyxDQUFDO0lBQ25CQyxHQUFHLEVBQUUsSUFBSUMsSUFBSSxDQUFDLENBQUMsQ0FBQ0MsVUFBVSxDQUFDZixJQUFJLENBQUNnQixVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUU7RUFDckQsQ0FBQyxFQUFFQyxPQUFPLENBQUNDLEdBQUcs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