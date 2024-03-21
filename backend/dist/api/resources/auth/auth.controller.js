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
            if (!((findUser === null || findUser === void 0 ? void 0 : findUser.verify) === null)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2FkZFVzZXIkZmluZFVzZXIkZ2V0IiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJub3RlIiwidXNlcl9pZCIsImF2YXRhciIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJmaW5kVXNlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYXR0cmlidXRlcyIsInF1ZXJ5IiwiZGF0YSIsIm9rIiwiZ2V0QWxsVXNlckxpc3QiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJ1c2VyVXBkYXRlIiwiX2NhbGxlZTQiLCJfcmVxJGJvZHkyIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiUmVxdWVzdEVycm9yIiwidXBkYXRlIiwibG9naW4iLCJfY2FsbGVlNSIsIl9yZXEkYm9keTMiLCJkZXZpY2VDb2RlIiwiX2ZpbmRVc2VyJGRldmljZSIsIl9maW5kVXNlciRkZXZpY2UyIiwiX2ZpbmRVc2VyJGRldmljZTMiLCJfZmluZFVzZXIkZGV2aWNlNCIsIl9maW5kVXNlciRkZXZpY2U1IiwiX2ZpbmRVc2VyJGRldmljZTYiLCJfZmluZFVzZXIkZGV2aWNlNyIsIl9maW5kVXNlciRkZXZpY2U4IiwiZGV2aWNlMUNvZGUiLCJkZXZpY2UyQ29kZSIsIl90b2tlbiIsIl9kZXZpY2UxQ29kZSIsIl90b2tlbjIiLCJmaW5kVXNlcmRldmljZTEiLCJmaW5kVXNlcmRldmljZTIiLCJfdG9rZW4zIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsImFicnVwdCIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJ0aGlyZCIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJfY2FsbGVlNiIsIl9yZXEkcXVlcnkiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZWxldGVVc2VyTGlzdCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZGVzdHJveSIsInIiLCJyZSIsInZlcmlmeU1haWwiLCJfY2FsbGVlOCIsIl9yZXEkYm9keTQiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4Iiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwiTUFJTF9VU0VSTkFNRSIsInBhc3MiLCJNQUlMX1BBU1NXT1JEIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJjb25jYXQiLCJVUkxfRlJPTlRFTkQiLCJzZW5kTWFpbCIsInQwIiwiZXJyb3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuaW1wb3J0IEpXVCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG1haWxlciBmcm9tICcuLi8uLi8uLi9tYWlsZXInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQtbm9kZWpzJztcbmltcG9ydCBzcGVha2Vhc3kgZnJvbSAnc3BlYWtlYXN5Jztcbi8vIGltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiXG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgICByZXR1cm4gSldULnNpZ24oe1xuICAgICAgICBpc3M6IGNvbmZpZy5hcHAubmFtZSxcbiAgICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgICBpYW0gOiB1c2VyLnR5cGUsXG4gICAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICAgIGV4cDogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApXG4gICAgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICAgIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSlcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICAgIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpLFxuICAgICAgICB3aW5kb3c6IDBcbiAgICB9KTtcbiAgICByZXR1cm4gZXhwaXJ5XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lLCBwaG9uZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnksIG5vdGUsIHVzZXJfaWQsIGF2YXRhciB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXNzd29yZEhhc2gpXG4gICAgICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XG4gICAgICAgIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbihmaW5kID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIiwgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIiAgICBcIiBcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogb3RwLCBtc2c6IFwiTmV3IFJlZ2lzdHJhdGlvbiBhZGRlZCBhbmQgcGFzc3dvcmQgaGFzIGJlZW4gc2VudCB0byBcIiArIGVtYWlsICsgXCIgLlwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgYXR0cmlidXRlczpbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCIsIFwiZW1haWxcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnkudXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlciwgb2s6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5LCBwaG9uZSwgc3RhdHVzLCBub3RlLCB1c2VyX2lkLCBhdmF0YXIgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUgPyBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoOiB1c2VyLnBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUgPyByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0sIHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVc2VyIHVwZGF0ZSBzdWNjZXNzc2Z1bGx5XCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIC8vIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgLy8gICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAvLyAgICAgdmFyIHRva2VuID0gSldUU2lnbihyZXEudXNlciwgZGF0ZSk7XG4gICAgLy8gICAgIHJlcy5jb29raWUoJ1hTUkYtdG9rZW4nLHRva2VuLCB7XG4gICAgLy8gICAgICAgICBleHBpcmU6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcbiAgICAvLyAgICAgICAgIGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGNvbmZpZy5hcHAuc2VjdXJlXG4gICAgLy8gICAgIH0pO1xuICAgICAgICBcbiAgICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSAsdG9rZW4sIHJvbGU6IHJlcS51c2VyLnJvbGV9KTtcbiAgICAvLyB9LFxuICAgIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IHtlbWFpbCwgcGFzc3dvcmQsIGRldmljZUNvZGUgfT0gcmVxLmJvZHlcbiAgICAgICAgLy8gdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXNzd29yZClcbiAgICAgICAgLy8gY29uc29sZS5sb2coYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkKSlcbiAgICAgICAgY29uc3QgZmluZFVzZXI9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgIGlmKGZpbmRVc2VyPy52ZXJpZnkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LnZlcmlmeSkge1xuICAgICAgICAgICAgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMkNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UyOiBkZXZpY2UyQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMkNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UxQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlMUNvZGUpXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YT0gYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTE6IGRldmljZTFDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTFDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMT0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTE6IGRldmljZUNvZGV9fSlcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTI9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UyOiBkZXZpY2VDb2RlfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICBpZihmaW5kVXNlcmRldmljZTE/LmVtYWlsIHx8IGZpbmRVc2VyZGV2aWNlMj8uZW1haWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coNSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coNilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbG9naW46IGZhbHNlLCB0aGlyZDogdHJ1ZX0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgYXR0cmlidXRlczpbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCIsIFwiZW1haWxcIiwgXCJhdmF0YXJcIiwgXCJwaG9uZVwiLCBcImFkZHJlc3NcIiwgXCJyb2xlXCJdLCB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5Py51c2VyX2lkIH19KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyLCBvazogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZGVsZXRlVXNlckxpc3QocmVxLCByZXMsIG5leHQpIHsgXG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZH0gfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KS50aGVuKHIgPT4gW3IsIGRhdGFdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N0YXR1cyc6IFwiZGVsZXRlZCB1c2VybGlzdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgIH0sXG4gICAgYXN5bmMgdmVyaWZ5TWFpbChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XG4gICAgICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgZmlyc3ROYW1lIH0gPSByZXEuYm9keTtcbiAgICBcbiAgICAgICAgICAgIC8vIFThuqFvIG3hu5l0IG3DoyB4w6FjIHRo4buxYyBuZ+G6q3Ugbmhpw6puXG4gICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggdGjDtG5nIHRpbiBtYWlsIHNlcnZlciAoZMO5bmcgR21haWwgbMOgbSB2w60gZOG7pSlcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIHNlcnZpY2U6ICdnbWFpbCcsXG4gICAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCAvLyBUaGF5IGLhurFuZyBt4bqtdCBraOG6qXUgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIG7hu5lpIGR1bmcgZW1haWxcbiAgICAgICAgICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZyb206IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ0VtYWlsIFZlcmlmaWNhdGlvbicsIC8vIFRpw6p1IMSR4buBIGVtYWlsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5VUkxfRlJPTlRFTkR9L3NpZ251cC9zdWNjZXNzXCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU4OWZmOyBjb2xvcjogI2ZmZjsgd2lkdGg6IDEwMCVcIj5DbGljayBoZXJlIHRvIGNvbXBsZXRlIHNpbmd1cCBwcm9jZXNzPC9hPlxuICAgICAgICAgICAgICAgIGAgLy8gTuG7mWkgZHVuZyBlbWFpbCBjaOG7qWEgbcOjIHjDoWMgdGjhu7FjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBH4butaSBlbWFpbFxuICAgICAgICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xuICAgICAgICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcbiAgICAgICAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFjhu60gbMO9IGzhu5dpIG7hur91IGPDs1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWw6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFHLE9BQUEsR0FBQUQsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFJLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFLLGFBQUEsR0FBQUgsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUosc0JBQUEsQ0FBQUYsT0FBQTtBQUVBLElBQUFPLEdBQUEsR0FBQUwsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFRLFdBQUEsR0FBQU4sc0JBQUEsQ0FBQUYsT0FBQTtBQUFtQyxJQUFBUyxxQkFBQSxFQUZuQztBQUlBLElBQUlDLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFhQyxJQUFJLEVBQUVDLElBQUksRUFBRTtFQUNoQyxPQUFPQyx3QkFBRyxDQUFDQyxJQUFJLENBQUM7SUFDWkMsR0FBRyxFQUFFQyxrQkFBTSxDQUFDQyxHQUFHLENBQUNDLElBQUk7SUFDcEJDLEdBQUcsRUFBRVIsSUFBSSxDQUFDUyxFQUFFO0lBQ1pDLEdBQUcsRUFBR1YsSUFBSSxDQUFDVyxJQUFJO0lBQ2ZDLEdBQUcsRUFBRVgsSUFBSSxDQUFDWSxPQUFPLENBQUMsQ0FBQztJQUNuQkMsR0FBRyxFQUFFLElBQUlDLElBQUksQ0FBQyxDQUFDLENBQUNDLFVBQVUsQ0FBQ2YsSUFBSSxDQUFDZ0IsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFO0VBQ3JELENBQUMsRUFBRUMsT0FBTyxDQUFDQyxHQUFH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