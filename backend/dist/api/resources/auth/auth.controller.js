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
                // verify : status? status: user.verify,
                phone: phone ? phone : user.phone,
                note: note ? note : "",
                user_id: user_id ? user_id : "",
                avatar: avatar ? avatar : "",
                status: status ? parseInt(status) : 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2FkZFVzZXIkZmluZFVzZXIkZ2V0IiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJub3RlIiwidXNlcl9pZCIsImF2YXRhciIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJmaW5kVXNlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYXR0cmlidXRlcyIsInF1ZXJ5IiwiZGF0YSIsIm9rIiwiZ2V0QWxsVXNlckxpc3QiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRBbGwiLCJ1c2VyVXBkYXRlIiwiX2NhbGxlZTQiLCJfcmVxJGJvZHkyIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiUmVxdWVzdEVycm9yIiwidXBkYXRlIiwicGFyc2VJbnQiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsImRldmljZUNvZGUiLCJfZmluZFVzZXIkZGV2aWNlIiwiX2ZpbmRVc2VyJGRldmljZTIiLCJfZmluZFVzZXIkZGV2aWNlMyIsIl9maW5kVXNlciRkZXZpY2U0IiwiX2ZpbmRVc2VyJGRldmljZTUiLCJfZmluZFVzZXIkZGV2aWNlNiIsIl9maW5kVXNlciRkZXZpY2U3IiwiX2ZpbmRVc2VyJGRldmljZTgiLCJkZXZpY2UxQ29kZSIsImRldmljZTJDb2RlIiwiX3Rva2VuIiwiX2RldmljZTFDb2RlIiwiX3Rva2VuMiIsImZpbmRVc2VyZGV2aWNlMSIsImZpbmRVc2VyZGV2aWNlMiIsIl90b2tlbjMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJzZW50IiwiYWJydXB0IiwiZGV2aWNlMSIsImRldmljZTIiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYXVpZCIsInRoaXJkIiwiX2RlZmluZVByb3BlcnR5MiIsIl9jYWxsZWU2IiwiX3JlcSRxdWVyeSIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlbGV0ZVVzZXJMaXN0IiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJkZXN0cm95IiwiciIsInJlIiwidmVyaWZ5TWFpbCIsIl9jYWxsZWU4IiwiX3JlcSRib2R5NCIsInRyYW5zcG9ydGVyIiwibWFpbE9wdGlvbnMiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJNQUlMX1VTRVJOQU1FIiwicGFzcyIsIk1BSUxfUEFTU1dPUkQiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImNvbmNhdCIsIlVSTF9GUk9OVEVORCIsInNlbmRNYWlsIiwidDAiLCJlcnJvciIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9hdXRoL2F1dGguY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdC1ub2RlanMnO1xuaW1wb3J0IHNwZWFrZWFzeSBmcm9tICdzcGVha2Vhc3knO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGVFbWFpbCB9IGZyb20gJy4vLi4vLi4vLi4vZnVuY3Rpb25zJ1xuaW1wb3J0IG1kNSBmcm9tIFwibWQ1XCJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCJcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICAgIHJldHVybiBKV1Quc2lnbih7XG4gICAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxuICAgICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0OiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgZXhwOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMClcbiAgICB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21TdHJpbmcobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XG4gICAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XG4gICAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSksXG4gICAgICAgIHdpbmRvdzogMFxuICAgIH0pO1xuICAgIHJldHVybiBleHBpcnlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSwgbm90ZSwgdXNlcl9pZCwgYXZhdGFyIH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkSGFzaClcbiAgICAgICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICAgICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKGZpbmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuanNvbihcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIiwgdXNlcl9pZDogdXNlcl9pZCA/IHVzZXJfaWQgOiBcIlwiLCBhdmF0YXI6IGF2YXRhciA/IGF2YXRhciA6IFwiICAgIFwiIFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwga2V5OiBvdHAsIG1zZzogXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICsgZW1haWwgKyBcIiAuXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiXSwgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS51c2VyX2lkIH19KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyLCBvazogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRBbGwoKVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp1c2VyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIHVzZXJVcGRhdGUocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgY29uc3QgeyBpZCwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGFkZHJlc3MsIHBhc3N3b3JkLCByb2xlLCB2ZXJpZnksIHBob25lLCBzdGF0dXMsIG5vdGUsIHVzZXJfaWQsIGF2YXRhciB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSA/IGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2g6IHVzZXIucGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdmVyaWZ5IDogc3RhdHVzPyBzdGF0dXM6IHVzZXIudmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUgPyBwaG9uZSA6IHVzZXIucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9pZDogdXNlcl9pZCA/IHVzZXJfaWQgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6IGF2YXRhciA/IGF2YXRhciA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzID8gcGFyc2VJbnQoc3RhdHVzKSA6IDBcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gICAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAgIC8vICAgICB9KTtcbiAgICAgICAgXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gICAgLy8gfSxcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkLCBkZXZpY2VDb2RlIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICBpZihmaW5kVXNlcj8udmVyaWZ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy52ZXJpZnkpIHtcbiAgICAgICAgICAgIGlmKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTFDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMTogZGV2aWNlMUNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTFDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTJDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMjogZGV2aWNlMkNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTJDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRldmljZTFDb2RlKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDAgJiYgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTE9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UxOiBkZXZpY2VDb2RlfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMjogZGV2aWNlQ29kZX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgaWYoZmluZFVzZXJkZXZpY2UxPy5lbWFpbCB8fCBmaW5kVXNlcmRldmljZTI/LmVtYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIGxvZ2luOiBmYWxzZSwgdGhpcmQ6IHRydWV9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGZpbmRVc2VyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IGF0dHJpYnV0ZXM6W1wiZmlyc3ROYW1lXCIsXCJsYXN0TmFtZVwiLCBcImVtYWlsXCIsIFwiYXZhdGFyXCIsIFwicGhvbmVcIiwgXCJhZGRyZXNzXCIsIFwicm9sZVwiXSwgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeT8udXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlciwgb2s6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIGRlbGV0ZVVzZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7IFxuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxPQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSyxhQUFBLEdBQUFILHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFKLHNCQUFBLENBQUFGLE9BQUE7QUFFQSxJQUFBTyxHQUFBLEdBQUFMLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBUSxXQUFBLEdBQUFOLHNCQUFBLENBQUFGLE9BQUE7QUFBbUMsSUFBQVMscUJBQUEsRUFGbkM7QUFJQSxJQUFJQyxPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBYUMsSUFBSSxFQUFFQyxJQUFJLEVBQUU7RUFDaEMsT0FBT0Msd0JBQUcsQ0FBQ0MsSUFBSSxDQUFDO0lBQ1pDLEdBQUcsRUFBRUMsa0JBQU0sQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJO0lBQ3BCQyxHQUFHLEVBQUVSLElBQUksQ0FBQ1MsRUFBRTtJQUNaQyxHQUFHLEVBQUdWLElBQUksQ0FBQ1csSUFBSTtJQUNmQyxHQUFHLEVBQUVYLElBQUksQ0FBQ1ksT0FBTyxDQUFDLENBQUM7SUFDbkJDLEdBQUcsRUFBRSxJQUFJQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxVQUFVLENBQUNmLElBQUksQ0FBQ2dCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtFQUNyRCxDQUFDLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUM7QUFDOUIsQ0FBQztBQUVELFNBQVNDLG9CQUFvQkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ2xDLElBQU1DLFVBQVUsR0FBRyxnRUFBZ0U7RUFDbkYsSUFBSUMsTUFBTSxHQUFHLEVBQUU7RUFDZixJQUFNQyxnQkFBZ0IsR0FBR0YsVUFBVSxDQUFDRCxNQUFNO0VBQzFDLEtBQUssSUFBSUksQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSixNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO0lBQzdCRixNQUFNLElBQUlELFVBQVUsQ0FBQ0ksTUFBTSxDQUFDQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHTCxnQkFBZ0IsQ0FBQyxDQUFDO0VBQzdFO0VBQ0EsT0FBT0QsTUFBTTtBQUNqQjtBQUdBLFNBQVNPLFdBQVdBLENBQUEsRUFBRztFQUNuQixJQUFJQyxLQUFLLEdBQUdDLHFCQUFTLENBQUNDLElBQUksQ0FBQztJQUN2QkMsTUFBTSxFQUFFakIsT0FBTyxDQUFDQyxHQUFHLENBQUNpQixPQUFPO0lBQzNCQyxRQUFRLEVBQUUsUUFBUTtJQUNsQkMsSUFBSSxFQUFHLEVBQUUsR0FBR1YsSUFBSSxDQUFDQyxLQUFLLENBQUUsSUFBSWQsSUFBSSxDQUFDLENBQUMsQ0FBQ0YsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRztFQUMvRCxDQUFDLENBQUM7RUFDRixPQUFPbUIsS0FBSztBQUNoQjtBQUVBLFNBQVNPLFNBQVNBLENBQUNQLEtBQUssRUFBRTtFQUN0QixJQUFJUSxNQUFNLEdBQUdQLHFCQUFTLENBQUNDLElBQUksQ0FBQ08sTUFBTSxDQUFDO0lBQy9CTixNQUFNLEVBQUVqQixPQUFPLENBQUNDLEdBQUcsQ0FBQ2lCLE9BQU87SUFDM0JDLFFBQVEsRUFBRSxRQUFRO0lBQ2xCTCxLQUFLLEVBQUVBLEtBQUs7SUFDWk0sSUFBSSxFQUFHLEVBQUUsR0FBR1YsSUFBSSxDQUFDQyxLQUFLLENBQUUsSUFBSWQsSUFBSSxDQUFDLENBQUMsQ0FBQ0YsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRyxDQUFFO0lBQzdENkIsTUFBTSxFQUFFO0VBQ1osQ0FBQyxDQUFDO0VBQ0YsT0FBT0YsTUFBTTtBQUNqQjtBQUFDLElBQUFHLFFBQUEsSUFBQTdDLHFCQUFBO0VBSVM4QyxPQUFPLFdBQUFBLFFBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxTQUFBLEVBQUFDLFNBQUEsRUFBQUMsUUFBQSxFQUFBQyxLQUFBLEVBQUFDLEtBQUEsRUFBQUMsT0FBQSxFQUFBQyxRQUFBLEVBQUFDLElBQUEsRUFBQWxCLE1BQUEsRUFBQW1CLElBQUEsRUFBQUMsT0FBQSxFQUFBQyxNQUFBLEVBQUFDLFlBQUEsRUFBQS9CLEtBQUEsRUFBQWdDLEdBQUE7TUFBQSxPQUFBZixZQUFBLFlBQUFnQixJQUFBLFVBQUFDLFNBQUFDLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQXBCLElBQUE7VUFBQTtZQUFBSyxTQUFBLEdBQzRFUCxHQUFHLENBQUN3QixJQUFJLEVBQXRHaEIsU0FBUyxHQUFBRCxTQUFBLENBQVRDLFNBQVMsRUFBRUMsUUFBUSxHQUFBRixTQUFBLENBQVJFLFFBQVEsRUFBRUMsS0FBSyxHQUFBSCxTQUFBLENBQUxHLEtBQUssRUFBRUMsS0FBSyxHQUFBSixTQUFBLENBQUxJLEtBQUssRUFBRUMsT0FBTyxHQUFBTCxTQUFBLENBQVBLLE9BQU8sRUFBRUMsUUFBUSxHQUFBTixTQUFBLENBQVJNLFFBQVEsRUFBRUMsSUFBSSxHQUFBUCxTQUFBLENBQUpPLElBQUksRUFBRWxCLE1BQU0sR0FBQVcsU0FBQSxDQUFOWCxNQUFNLEVBQUVtQixJQUFJLEdBQUFSLFNBQUEsQ0FBSlEsSUFBSSxFQUFFQyxPQUFPLEdBQUFULFNBQUEsQ0FBUFMsT0FBTyxFQUFFQyxNQUFNLEdBQUFWLFNBQUEsQ0FBTlUsTUFBTTtZQUM3RkMsWUFBWSxHQUFHLElBQUFPLGNBQUcsRUFBQ1osUUFBUSxDQUFDO1lBQ2hDYSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1QsWUFBWSxDQUFDO1lBQ3JCL0IsS0FBSyxHQUFHRCxXQUFXLENBQUMsQ0FBQztZQUNyQmlDLEdBQUcsR0FBR3pCLFNBQVMsQ0FBQ1AsS0FBSyxDQUFDO1lBQzFCeUMsVUFBRSxDQUFDekUsSUFBSSxDQUFDMEUsT0FBTyxDQUFDO2NBQUVDLEtBQUssRUFBRTtnQkFBRW5CLEtBQUssRUFBRUE7Y0FBTSxDQUFDO2NBQUVvQixRQUFRLEVBQUU7WUFBTSxDQUFDLENBQUMsQ0FDeERDLElBQUksQ0FBQyxVQUFBQyxJQUFJLEVBQUk7Y0FDVixJQUFJQSxJQUFJLEVBQUU7Z0JBQ04sT0FBT2hDLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLHlCQUF5QixDQUFDO2NBQzFEO2NBQ0EsT0FBT1AsVUFBRSxDQUFDekUsSUFBSSxDQUFDaUYsTUFBTSxDQUFDO2dCQUNsQjVCLFNBQVMsRUFBRUEsU0FBUztnQkFDcEJDLFFBQVEsRUFBRUEsUUFBUTtnQkFDbEJFLEtBQUssRUFBRUEsS0FBSztnQkFDWkQsS0FBSyxFQUFFQSxLQUFLO2dCQUNaRSxPQUFPLEVBQUVBLE9BQU87Z0JBQ2hCQyxRQUFRLEVBQUVLLFlBQVk7Z0JBQ3RCdEIsTUFBTSxFQUFFQSxNQUFNO2dCQUNka0IsSUFBSSxFQUFFQSxJQUFJO2dCQUNWQyxJQUFJLEVBQUVBLElBQUksR0FBR0EsSUFBSSxHQUFHLEVBQUU7Z0JBQUVDLE9BQU8sRUFBRUEsT0FBTyxHQUFHQSxPQUFPLEdBQUcsRUFBRTtnQkFBRUMsTUFBTSxFQUFFQSxNQUFNLEdBQUdBLE1BQU0sR0FBRztjQUN2RixDQUFDLENBQUM7WUFFTixDQUFDLENBQUMsQ0FDRGUsSUFBSSxDQUFDLFVBQUE3RSxJQUFJLEVBQUk7Y0FDVixJQUFJQSxJQUFJLEVBQUU7Z0JBQ05rRixrQkFBTSxDQUFDQyxvQkFBb0IsQ0FBQzNCLEtBQUssRUFBRXhCLEtBQUssQ0FBQztnQkFDekMsT0FBT2MsR0FBRyxDQUFDaUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQUVJLE9BQU8sRUFBRSxJQUFJO2tCQUFFQyxHQUFHLEVBQUVyQixHQUFHO2tCQUFFc0IsR0FBRyxFQUFFLHVEQUF1RCxHQUFHOUIsS0FBSyxHQUFHO2dCQUFLLENBQUMsQ0FBQztjQUN6SSxDQUFDLE1BRUdWLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRTtjQUFNLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFPLEdBQUcsRUFBSTtjQUNWaEIsT0FBTyxDQUFDQyxHQUFHLENBQUNlLEdBQUcsQ0FBQztjQUNoQnhDLElBQUksQ0FBQ3dDLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBcEIsUUFBQSxDQUFBcUIsSUFBQTtRQUFBO01BQUEsR0FBQXJDLE9BQUE7SUFBQTtFQUNWLENBQUM7RUFFS3NDLFFBQVEsV0FBQUEsU0FBQzVDLEdBQUcsRUFBQ0MsR0FBRyxFQUFDQyxJQUFJLEVBQUM7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUF3QyxTQUFBO01BQUEsT0FBQXpDLFlBQUEsWUFBQWdCLElBQUEsVUFBQTBCLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBeEIsSUFBQSxHQUFBd0IsU0FBQSxDQUFBN0MsSUFBQTtVQUFBO1lBQ3hCMEIsVUFBRSxDQUFDekUsSUFBSSxDQUFDMEUsT0FBTyxDQUFDO2NBQUVtQixVQUFVLEVBQUMsQ0FBQyxXQUFXLEVBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztjQUFFbEIsS0FBSyxFQUFFO2dCQUFFbEUsRUFBRSxFQUFFb0MsR0FBRyxDQUFDaUQsS0FBSyxDQUFDakM7Y0FBUTtZQUFDLENBQUMsQ0FBQyxDQUNqR2dCLElBQUksQ0FBQyxVQUFBN0UsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU84QyxHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztrQkFBRUksT0FBTyxFQUFFLElBQUk7a0JBQUVXLElBQUksRUFBQy9GLElBQUk7a0JBQUVnRyxFQUFFLEVBQUU7Z0JBQUksQ0FBQyxDQUFDO2NBQ3RFLENBQUMsTUFFR2xELEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRTtjQUFNLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFPLEdBQUcsRUFBSTtjQUNWaEIsT0FBTyxDQUFDQyxHQUFHLENBQUNlLEdBQUcsQ0FBQztjQUNoQnhDLElBQUksQ0FBQ3dDLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBSyxTQUFBLENBQUFKLElBQUE7UUFBQTtNQUFBLEdBQUFFLFFBQUE7SUFBQTtFQUNOLENBQUM7RUFFTU8sY0FBYyxXQUFBQSxlQUFDcEQsR0FBRyxFQUFDQyxHQUFHLEVBQUNDLElBQUksRUFBQztJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWdELFNBQUE7TUFBQSxPQUFBakQsWUFBQSxZQUFBZ0IsSUFBQSxVQUFBa0MsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUFoQyxJQUFBLEdBQUFnQyxTQUFBLENBQUFyRCxJQUFBO1VBQUE7WUFDL0IwQixVQUFFLENBQUN6RSxJQUFJLENBQUNxRyxPQUFPLENBQUMsQ0FBQyxDQUNoQnhCLElBQUksQ0FBQyxVQUFBN0UsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU84QyxHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztrQkFBRUksT0FBTyxFQUFFLElBQUk7a0JBQUVXLElBQUksRUFBQy9GO2dCQUFJLENBQUMsQ0FBQztjQUM1RCxDQUFDLE1BRUc4QyxHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUU7Y0FBTSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFBTyxHQUFHLEVBQUk7Y0FDVmhCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDZSxHQUFHLENBQUM7Y0FDaEJ4QyxJQUFJLENBQUN3QyxHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWEsU0FBQSxDQUFBWixJQUFBO1FBQUE7TUFBQSxHQUFBVSxRQUFBO0lBQUE7RUFDTixDQUFDO0VBRU1JLFVBQVUsV0FBQUEsV0FBQ3pELEdBQUcsRUFBQ0MsR0FBRyxFQUFDQyxJQUFJLEVBQUM7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFxRCxTQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBL0YsRUFBQSxFQUFBNEMsU0FBQSxFQUFBQyxRQUFBLEVBQUFFLEtBQUEsRUFBQUMsT0FBQSxFQUFBQyxRQUFBLEVBQUFDLElBQUEsRUFBQWxCLE1BQUEsRUFBQWMsS0FBQSxFQUFBd0IsTUFBQSxFQUFBbkIsSUFBQSxFQUFBQyxPQUFBLEVBQUFDLE1BQUEsRUFBQUMsWUFBQTtNQUFBLE9BQUFkLFlBQUEsWUFBQWdCLElBQUEsVUFBQXdDLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBdEMsSUFBQSxHQUFBc0MsU0FBQSxDQUFBM0QsSUFBQTtVQUFBO1lBQUF5RCxVQUFBLEdBQ3VGM0QsR0FBRyxDQUFDd0IsSUFBSSxFQUFsSDVELEVBQUUsR0FBQStGLFVBQUEsQ0FBRi9GLEVBQUUsRUFBRTRDLFNBQVMsR0FBQW1ELFVBQUEsQ0FBVG5ELFNBQVMsRUFBRUMsUUFBUSxHQUFBa0QsVUFBQSxDQUFSbEQsUUFBUSxFQUFFRSxLQUFLLEdBQUFnRCxVQUFBLENBQUxoRCxLQUFLLEVBQUVDLE9BQU8sR0FBQStDLFVBQUEsQ0FBUC9DLE9BQU8sRUFBRUMsUUFBUSxHQUFBOEMsVUFBQSxDQUFSOUMsUUFBUSxFQUFFQyxJQUFJLEdBQUE2QyxVQUFBLENBQUo3QyxJQUFJLEVBQUVsQixNQUFNLEdBQUErRCxVQUFBLENBQU4vRCxNQUFNLEVBQUVjLEtBQUssR0FBQWlELFVBQUEsQ0FBTGpELEtBQUssRUFBRXdCLE1BQU0sR0FBQXlCLFVBQUEsQ0FBTnpCLE1BQU0sRUFBRW5CLElBQUksR0FBQTRDLFVBQUEsQ0FBSjVDLElBQUksRUFBRUMsT0FBTyxHQUFBMkMsVUFBQSxDQUFQM0MsT0FBTyxFQUFFQyxNQUFNLEdBQUEwQyxVQUFBLENBQU4xQyxNQUFNO1lBQ3pHQyxZQUFZLEdBQUcsSUFBQU8sY0FBRyxFQUFDWixRQUFRLENBQUM7WUFDaENlLFVBQUUsQ0FBQ3pFLElBQUksQ0FBQzBFLE9BQU8sQ0FBQztjQUFFQyxLQUFLLEVBQUU7Z0JBQUVuQixLQUFLLEVBQUVBO2NBQU0sQ0FBQztjQUFFb0IsUUFBUSxFQUFFO1lBQU0sQ0FBQyxDQUFDLENBQ3hEQyxJQUFJLENBQUMsVUFBQTdFLElBQUksRUFBSTtjQUNWLElBQUksQ0FBQ0EsSUFBSSxFQUFFO2dCQUNQLE1BQU0sSUFBSTJHLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUM7Y0FDcEQ7Y0FDQSxPQUFPbEMsVUFBRSxDQUFDekUsSUFBSSxDQUFDNEcsTUFBTSxDQUFDO2dCQUNsQnZELFNBQVMsRUFBRUEsU0FBUyxHQUFHQSxTQUFTLEdBQUVyRCxJQUFJLENBQUNxRCxTQUFTO2dCQUNoREMsUUFBUSxFQUFFQSxRQUFRLEdBQUdBLFFBQVEsR0FBRXRELElBQUksQ0FBQ3NELFFBQVE7Z0JBQzVDSSxRQUFRLEVBQUVBLFFBQVEsR0FBR0ssWUFBWSxHQUFFL0QsSUFBSSxDQUFDK0QsWUFBWTtnQkFDcEROLE9BQU8sRUFBRUEsT0FBTyxHQUFHQSxPQUFPLEdBQUd6RCxJQUFJLENBQUN5RCxPQUFPO2dCQUN6Q0UsSUFBSSxFQUFFQSxJQUFJLEdBQUdBLElBQUksR0FBRTNELElBQUksQ0FBQzJELElBQUk7Z0JBQzVCO2dCQUNBSixLQUFLLEVBQUVBLEtBQUssR0FBR0EsS0FBSyxHQUFHdkQsSUFBSSxDQUFDdUQsS0FBSztnQkFDakNLLElBQUksRUFBRUEsSUFBSSxHQUFHQSxJQUFJLEdBQUcsRUFBRTtnQkFDdEJDLE9BQU8sRUFBRUEsT0FBTyxHQUFHQSxPQUFPLEdBQUcsRUFBRTtnQkFDL0JDLE1BQU0sRUFBRUEsTUFBTSxHQUFHQSxNQUFNLEdBQUcsRUFBRTtnQkFDNUJpQixNQUFNLEVBQUVBLE1BQU0sR0FBRzhCLFFBQVEsQ0FBQzlCLE1BQU0sQ0FBQyxHQUFHO2NBQ3hDLENBQUMsRUFBRTtnQkFBRUosS0FBSyxFQUFFO2tCQUFFbEUsRUFBRSxFQUFFQTtnQkFBRztjQUFFLENBQUMsQ0FBQztZQUU3QixDQUFDLENBQUMsQ0FDRG9FLElBQUksQ0FBQyxVQUFBN0UsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU84QyxHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztrQkFBRUksT0FBTyxFQUFFLElBQUk7a0JBQUVFLEdBQUcsRUFBRTtnQkFBMkIsQ0FBQyxDQUFDO2NBQ25GLENBQUMsTUFFR3hDLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRTtjQUFNLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFPLEdBQUcsRUFBSTtjQUNWaEIsT0FBTyxDQUFDQyxHQUFHLENBQUNlLEdBQUcsQ0FBQztjQUNoQnhDLElBQUksQ0FBQ3dDLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBbUIsU0FBQSxDQUFBbEIsSUFBQTtRQUFBO01BQUEsR0FBQWUsUUFBQTtJQUFBO0VBQ1YsQ0FBQztFQUVEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7RUFDQTtFQUNNTyxLQUFLLFdBQUFBLE1BQUNqRSxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBNkQsU0FBQTtNQUFBLElBQUFDLFVBQUEsRUFBQXhELEtBQUEsRUFBQUUsUUFBQSxFQUFBdUQsVUFBQSxFQUFBeEIsUUFBQSxFQUFBeUIsZ0JBQUEsRUFBQUMsaUJBQUEsRUFBQUMsaUJBQUEsRUFBQUMsaUJBQUEsRUFBQUMsaUJBQUEsRUFBQUMsaUJBQUEsRUFBQUMsaUJBQUEsRUFBQUMsaUJBQUEsRUFBQUMsV0FBQSxFQUFBMUYsS0FBQSxFQUFBMkYsV0FBQSxFQUFBQyxNQUFBLEVBQUFDLFlBQUEsRUFBQTlCLElBQUEsRUFBQStCLE9BQUEsRUFBQUMsZUFBQSxFQUFBQyxlQUFBLEVBQUFDLE9BQUE7TUFBQSxPQUFBaEYsWUFBQSxZQUFBZ0IsSUFBQSxVQUFBaUUsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUEvRCxJQUFBLEdBQUErRCxTQUFBLENBQUFwRixJQUFBO1VBQUE7WUFBQWlFLFVBQUEsR0FDY25FLEdBQUcsQ0FBQ3dCLElBQUksRUFBdkNiLEtBQUssR0FBQXdELFVBQUEsQ0FBTHhELEtBQUssRUFBRUUsUUFBUSxHQUFBc0QsVUFBQSxDQUFSdEQsUUFBUSxFQUFFdUQsVUFBVSxHQUFBRCxVQUFBLENBQVZDLFVBQVUsRUFDbEM7WUFDQTtZQUNBO1lBQUFrQixTQUFBLENBQUFwRixJQUFBO1lBQUEsT0FDc0IwQixVQUFFLENBQUN6RSxJQUFJLENBQUMwRSxPQUFPLENBQUM7Y0FBQ0MsS0FBSyxFQUFFO2dCQUFDcEIsS0FBSyxFQUFFQyxLQUFLO2dCQUFFRSxRQUFRLEVBQUUsSUFBQVksY0FBRyxFQUFDWixRQUFRO2NBQUM7WUFBQyxDQUFDLENBQUM7VUFBQTtZQUFqRitCLFFBQVEsR0FBQTBDLFNBQUEsQ0FBQUMsSUFBQTtZQUFBLE1BQ1gsQ0FBQTNDLFFBQVEsYUFBUkEsUUFBUSx1QkFBUkEsUUFBUSxDQUFFaEQsTUFBTSxNQUFLLElBQUk7Y0FBQTBGLFNBQUEsQ0FBQXBGLElBQUE7Y0FBQTtZQUFBO1lBQUEsT0FBQW9GLFNBQUEsQ0FBQUUsTUFBQSxXQUNqQnZGLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVJLE9BQU8sRUFBRTtZQUFNLENBQUMsQ0FBQztVQUFBO1lBQUEsTUFFM0NLLFFBQVEsYUFBUkEsUUFBUSxlQUFSQSxRQUFRLENBQUVoRCxNQUFNO2NBQUEwRixTQUFBLENBQUFwRixJQUFBO2NBQUE7WUFBQTtZQUFBLE1BQ2pCLENBQUEwQyxRQUFRLGFBQVJBLFFBQVEsd0JBQUF5QixnQkFBQSxHQUFSekIsUUFBUSxDQUFFNkMsT0FBTyxjQUFBcEIsZ0JBQUEsdUJBQWpCQSxnQkFBQSxDQUFtQjVGLE1BQU0sS0FBSSxDQUFDLElBQUksQ0FBQW1FLFFBQVEsYUFBUkEsUUFBUSx3QkFBQTBCLGlCQUFBLEdBQVIxQixRQUFRLENBQUU4QyxPQUFPLGNBQUFwQixpQkFBQSx1QkFBakJBLGlCQUFBLENBQW1CN0YsTUFBTSxJQUFHLENBQUM7Y0FBQTZHLFNBQUEsQ0FBQXBGLElBQUE7Y0FBQTtZQUFBO1lBQ3hEMkUsV0FBVyxHQUFFckcsb0JBQW9CLENBQUMsRUFBRSxDQUFDO1lBQUE4RyxTQUFBLENBQUFwRixJQUFBO1lBQUEsT0FDckMwQixVQUFFLENBQUN6RSxJQUFJLENBQUM0RyxNQUFNLENBQUM7Y0FBQzBCLE9BQU8sRUFBRVo7WUFBVyxDQUFDLEVBQUU7Y0FBQy9DLEtBQUssRUFBRTtnQkFBQ3BCLEtBQUssRUFBRUMsS0FBSztnQkFBRUUsUUFBUSxFQUFFLElBQUFZLGNBQUcsRUFBQ1osUUFBUTtjQUFDO1lBQUMsQ0FBQyxDQUFDO1VBQUE7WUFDeEYxQixLQUFLLEdBQUU5Qix3QkFBRyxDQUFDQyxJQUFJLENBQUM7Y0FBQ3FJLEdBQUcsRUFBRS9DLFFBQVEsQ0FBQ2dELFVBQVUsQ0FBQ2hJLEVBQUU7Y0FBRUEsRUFBRSxFQUFFZ0YsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEk7WUFBRSxDQUFDLEVBQUVTLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUM7WUFBQSxPQUFBK0csU0FBQSxDQUFBRSxNQUFBLFdBQ2pHdkYsR0FBRyxDQUFDaUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUksT0FBTyxFQUFFLElBQUk7Y0FBRXBELEtBQUssRUFBTEEsS0FBSztjQUFFMEcsSUFBSSxFQUFFakQsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEksRUFBRTtjQUFFa0QsSUFBSSxFQUFFOEIsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDOUUsSUFBSTtjQUFFcEQsSUFBSSxFQUFFLENBQUFrRixRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBRXBDLFNBQVMsSUFBRyxHQUFHLElBQUdvQyxRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBRW5DLFFBQVE7Y0FBRTJELFVBQVUsRUFBRVM7WUFBWSxDQUFDLENBQUM7VUFBQTtZQUFBLE1BRTlMLENBQUFqQyxRQUFRLGFBQVJBLFFBQVEsd0JBQUEyQixpQkFBQSxHQUFSM0IsUUFBUSxDQUFFOEMsT0FBTyxjQUFBbkIsaUJBQUEsdUJBQWpCQSxpQkFBQSxDQUFtQjlGLE1BQU0sS0FBSSxDQUFDLElBQUksQ0FBQW1FLFFBQVEsYUFBUkEsUUFBUSx3QkFBQTRCLGlCQUFBLEdBQVI1QixRQUFRLENBQUU2QyxPQUFPLGNBQUFqQixpQkFBQSx1QkFBakJBLGlCQUFBLENBQW1CL0YsTUFBTSxJQUFHLENBQUM7Y0FBQTZHLFNBQUEsQ0FBQXBGLElBQUE7Y0FBQTtZQUFBO1lBRTdENEUsV0FBVyxHQUFFdEcsb0JBQW9CLENBQUMsRUFBRSxDQUFDO1lBQUE4RyxTQUFBLENBQUFwRixJQUFBO1lBQUEsT0FDckMwQixVQUFFLENBQUN6RSxJQUFJLENBQUM0RyxNQUFNLENBQUM7Y0FBQzJCLE9BQU8sRUFBRVo7WUFBVyxDQUFDLEVBQUU7Y0FBQ2hELEtBQUssRUFBRTtnQkFBQ3BCLEtBQUssRUFBRUMsS0FBSztnQkFBRUUsUUFBUSxFQUFFLElBQUFZLGNBQUcsRUFBQ1osUUFBUTtjQUFDO1lBQUMsQ0FBQyxDQUFDO1VBQUE7WUFDeEYxQixNQUFLLEdBQUU5Qix3QkFBRyxDQUFDQyxJQUFJLENBQUM7Y0FBQ3FJLEdBQUcsRUFBRS9DLFFBQVEsQ0FBQ2dELFVBQVUsQ0FBQ2hJLEVBQUU7Y0FBRUEsRUFBRSxFQUFFZ0YsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEk7WUFBRSxDQUFDLEVBQUVTLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUM7WUFBQSxPQUFBK0csU0FBQSxDQUFBRSxNQUFBLFdBQ2pHdkYsR0FBRyxDQUFDaUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUksT0FBTyxFQUFFLElBQUk7Y0FBRXBELEtBQUssRUFBTEEsTUFBSztjQUFFMEcsSUFBSSxFQUFFakQsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEksRUFBRTtjQUFFa0QsSUFBSSxFQUFFOEIsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDOUUsSUFBSTtjQUFFcEQsSUFBSSxFQUFFLENBQUFrRixRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBRXBDLFNBQVMsSUFBRyxHQUFHLElBQUdvQyxRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBRW5DLFFBQVE7Y0FBRTJELFVBQVUsRUFBRVU7WUFBWSxDQUFDLENBQUM7VUFBQTtZQUFBLE1BRTlMLENBQUFsQyxRQUFRLGFBQVJBLFFBQVEsd0JBQUE2QixpQkFBQSxHQUFSN0IsUUFBUSxDQUFFNkMsT0FBTyxjQUFBaEIsaUJBQUEsdUJBQWpCQSxpQkFBQSxDQUFtQmhHLE1BQU0sS0FBSSxDQUFDLElBQUksQ0FBQW1FLFFBQVEsYUFBUkEsUUFBUSx3QkFBQThCLGlCQUFBLEdBQVI5QixRQUFRLENBQUU4QyxPQUFPLGNBQUFoQixpQkFBQSx1QkFBakJBLGlCQUFBLENBQW1CakcsTUFBTSxLQUFJLENBQUM7Y0FBQTZHLFNBQUEsQ0FBQXBGLElBQUE7Y0FBQTtZQUFBO1lBQzlEMkUsWUFBVyxHQUFFckcsb0JBQW9CLENBQUMsRUFBRSxDQUFDO1lBQzNDa0QsT0FBTyxDQUFDQyxHQUFHLENBQUNrRCxZQUFXLENBQUM7WUFBQVMsU0FBQSxDQUFBcEYsSUFBQTtZQUFBLE9BQ04wQixVQUFFLENBQUN6RSxJQUFJLENBQUM0RyxNQUFNLENBQUM7Y0FBQzBCLE9BQU8sRUFBRVo7WUFBVyxDQUFDLEVBQUU7Y0FBQy9DLEtBQUssRUFBRTtnQkFBQ3BCLEtBQUssRUFBRUMsS0FBSztnQkFBRUUsUUFBUSxFQUFFLElBQUFZLGNBQUcsRUFBQ1osUUFBUTtjQUFDO1lBQUMsQ0FBQyxDQUFDO1VBQUE7WUFBcEdxQyxJQUFJLEdBQUFvQyxTQUFBLENBQUFDLElBQUE7WUFDVjdELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDdUIsSUFBSSxDQUFDO1lBQ1gvRCxPQUFLLEdBQUU5Qix3QkFBRyxDQUFDQyxJQUFJLENBQUM7Y0FBQ3FJLEdBQUcsRUFBRS9DLFFBQVEsQ0FBQ2dELFVBQVUsQ0FBQ2hJLEVBQUU7Y0FBRUEsRUFBRSxFQUFFZ0YsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEk7WUFBRSxDQUFDLEVBQUVTLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUM7WUFBQSxPQUFBK0csU0FBQSxDQUFBRSxNQUFBLFdBQ2pHdkYsR0FBRyxDQUFDaUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Y0FBRUksT0FBTyxFQUFFLElBQUk7Y0FBRXBELEtBQUssRUFBTEEsT0FBSztjQUFFMEcsSUFBSSxFQUFFakQsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEksRUFBRTtjQUFFa0QsSUFBSSxFQUFFOEIsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDOUUsSUFBSTtjQUFFcEQsSUFBSSxFQUFFLENBQUFrRixRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBRXBDLFNBQVMsSUFBRyxHQUFHLElBQUdvQyxRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBRW5DLFFBQVE7Y0FBRTJELFVBQVUsRUFBRVM7WUFBWSxDQUFDLENBQUM7VUFBQTtZQUFBLE1BRTlMLENBQUFqQyxRQUFRLGFBQVJBLFFBQVEsd0JBQUErQixpQkFBQSxHQUFSL0IsUUFBUSxDQUFFOEMsT0FBTyxjQUFBZixpQkFBQSx1QkFBakJBLGlCQUFBLENBQW1CbEcsTUFBTSxJQUFHLENBQUMsSUFBSSxDQUFBbUUsUUFBUSxhQUFSQSxRQUFRLHdCQUFBZ0MsaUJBQUEsR0FBUmhDLFFBQVEsQ0FBRTZDLE9BQU8sY0FBQWIsaUJBQUEsdUJBQWpCQSxpQkFBQSxDQUFtQm5HLE1BQU0sSUFBRyxDQUFDO2NBQUE2RyxTQUFBLENBQUFwRixJQUFBO2NBQUE7WUFBQTtZQUFBb0YsU0FBQSxDQUFBcEYsSUFBQTtZQUFBLE9BQ3JDMEIsVUFBRSxDQUFDekUsSUFBSSxDQUFDMEUsT0FBTyxDQUFDO2NBQUNDLEtBQUssRUFBRTtnQkFBQ3BCLEtBQUssRUFBRUMsS0FBSztnQkFBRUUsUUFBUSxFQUFFLElBQUFZLGNBQUcsRUFBQ1osUUFBUSxDQUFDO2dCQUFFNEUsT0FBTyxFQUFFckI7Y0FBVTtZQUFDLENBQUMsQ0FBQztVQUFBO1lBQTdHYyxlQUFlLEdBQUFJLFNBQUEsQ0FBQUMsSUFBQTtZQUFBRCxTQUFBLENBQUFwRixJQUFBO1lBQUEsT0FDUTBCLFVBQUUsQ0FBQ3pFLElBQUksQ0FBQzBFLE9BQU8sQ0FBQztjQUFDQyxLQUFLLEVBQUU7Z0JBQUNwQixLQUFLLEVBQUVDLEtBQUs7Z0JBQUVFLFFBQVEsRUFBRSxJQUFBWSxjQUFHLEVBQUNaLFFBQVEsQ0FBQztnQkFBRTZFLE9BQU8sRUFBRXRCO2NBQVU7WUFBQyxDQUFDLENBQUM7VUFBQTtZQUE3R2UsZUFBZSxHQUFBRyxTQUFBLENBQUFDLElBQUE7WUFDZnBHLE9BQUssR0FBRTlCLHdCQUFHLENBQUNDLElBQUksQ0FBQztjQUFDcUksR0FBRyxFQUFFL0MsUUFBUSxDQUFDZ0QsVUFBVSxDQUFDaEksRUFBRTtjQUFFQSxFQUFFLEVBQUVnRixRQUFRLENBQUNnRCxVQUFVLENBQUNoSTtZQUFFLENBQUMsRUFBRVMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFVBQVUsQ0FBQztZQUFBLE1BQ3JHMkcsZUFBZSxhQUFmQSxlQUFlLGVBQWZBLGVBQWUsQ0FBRXZFLEtBQUssSUFBSXdFLGVBQWUsYUFBZkEsZUFBZSxlQUFmQSxlQUFlLENBQUV4RSxLQUFLO2NBQUEyRSxTQUFBLENBQUFwRixJQUFBO2NBQUE7WUFBQTtZQUMvQ3dCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFBLE9BQUEyRCxTQUFBLENBQUFFLE1BQUEsV0FDUHZGLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVJLE9BQU8sRUFBRSxJQUFJO2NBQUVwRCxLQUFLLEVBQUxBLE9BQUs7Y0FBRTBHLElBQUksRUFBRWpELFFBQVEsQ0FBQ2dELFVBQVUsQ0FBQ2hJLEVBQUU7Y0FBRWtELElBQUksRUFBRThCLFFBQVEsQ0FBQ2dELFVBQVUsQ0FBQzlFLElBQUk7Y0FBRXBELElBQUksRUFBRSxDQUFBa0YsUUFBUSxhQUFSQSxRQUFRLHVCQUFSQSxRQUFRLENBQUVwQyxTQUFTLElBQUcsR0FBRyxJQUFHb0MsUUFBUSxhQUFSQSxRQUFRLHVCQUFSQSxRQUFRLENBQUVuQyxRQUFRO2NBQUUyRCxVQUFVLEVBQVZBO1lBQVcsQ0FBQyxDQUFDO1VBQUE7WUFHckwxQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBQSxPQUFBMkQsU0FBQSxDQUFBRSxNQUFBLFdBQ1B2RixHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFDSSxPQUFPLEVBQUUsS0FBSztjQUFFMEIsS0FBSyxFQUFFLEtBQUs7Y0FBRTZCLEtBQUssRUFBRTtZQUFJLENBQUMsQ0FBQztVQUFBO1lBQUFSLFNBQUEsQ0FBQXBGLElBQUE7WUFBQTtVQUFBO1lBQUEsT0FBQW9GLFNBQUEsQ0FBQUUsTUFBQSxXQU16RXZGLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUVJLE9BQU8sRUFBRTtZQUFNLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBK0MsU0FBQSxDQUFBM0MsSUFBQTtRQUFBO01BQUEsR0FBQXVCLFFBQUE7SUFBQTtFQUV2RDtBQUFDLE9BQUE2QixnQkFBQSxhQUFBOUkscUJBQUEsdUJBQUEyRixTQUNjNUMsR0FBRyxFQUFDQyxHQUFHLEVBQUNDLElBQUksRUFBQztFQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTJGLFNBQUE7SUFBQSxJQUFBQyxVQUFBO0lBQUEsT0FBQTdGLFlBQUEsWUFBQWdCLElBQUEsVUFBQThFLFVBQUFDLFNBQUE7TUFBQSxrQkFBQUEsU0FBQSxDQUFBNUUsSUFBQSxHQUFBNEUsU0FBQSxDQUFBakcsSUFBQTtRQUFBO1VBQ3hCMEIsVUFBRSxDQUFDekUsSUFBSSxDQUFDMEUsT0FBTyxDQUFDO1lBQUVtQixVQUFVLEVBQUMsQ0FBQyxXQUFXLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7WUFBRWxCLEtBQUssRUFBRTtjQUFFbEUsRUFBRSxHQUFBcUksVUFBQSxHQUFFakcsR0FBRyxDQUFDaUQsS0FBSyxjQUFBZ0QsVUFBQSx1QkFBVEEsVUFBQSxDQUFXakY7WUFBUTtVQUFDLENBQUMsQ0FBQyxDQUN4SWdCLElBQUksQ0FBQyxVQUFBN0UsSUFBSSxFQUFJO1lBQ1YsSUFBSUEsSUFBSSxFQUFFO2NBQ04sT0FBTzhDLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFSSxPQUFPLEVBQUUsSUFBSTtnQkFBRVcsSUFBSSxFQUFDL0YsSUFBSTtnQkFBRWdHLEVBQUUsRUFBRTtjQUFJLENBQUMsQ0FBQztZQUN0RSxDQUFDLE1BRUdsRCxHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFNLENBQUMsQ0FBQztVQUNsRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFPLEdBQUcsRUFBSTtZQUNWLE9BQU96QyxHQUFHLENBQUNpQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFLFNBQVMsRUFBRTtZQUFNLENBQUMsQ0FBQztZQUNqRFQsT0FBTyxDQUFDQyxHQUFHLENBQUNlLEdBQUcsQ0FBQztZQUNoQnhDLElBQUksQ0FBQ3dDLEdBQUcsQ0FBQztVQUNiLENBQUMsQ0FBQztRQUFBO1FBQUE7VUFBQSxPQUFBeUQsU0FBQSxDQUFBeEQsSUFBQTtNQUFBO0lBQUEsR0FBQXFELFFBQUE7RUFBQTtBQUNOLENBQUMsT0FBQUQsZ0JBQUEsYUFBQTlJLHFCQUFBLDZCQUFBbUosZUFFcUJwRyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0VBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBZ0csU0FBQTtJQUFBLE9BQUFqRyxZQUFBLFlBQUFnQixJQUFBLFVBQUFrRixVQUFBQyxTQUFBO01BQUEsa0JBQUFBLFNBQUEsQ0FBQWhGLElBQUEsR0FBQWdGLFNBQUEsQ0FBQXJHLElBQUE7UUFBQTtVQUNsQzBCLFVBQUUsQ0FBQ3pFLElBQUksQ0FBQzBFLE9BQU8sQ0FBQztZQUFFQyxLQUFLLEVBQUU7Y0FBRWxFLEVBQUUsRUFBRW9DLEdBQUcsQ0FBQ3dCLElBQUksQ0FBQzVEO1lBQUU7VUFBRSxDQUFDLENBQUMsQ0FDekNvRSxJQUFJLENBQUMsVUFBQWtCLElBQUksRUFBSTtZQUNWLElBQUlBLElBQUksRUFBRTtjQUNOLE9BQU90QixVQUFFLENBQUN6RSxJQUFJLENBQUNxSixPQUFPLENBQUM7Z0JBQUUxRSxLQUFLLEVBQUU7a0JBQUVsRSxFQUFFLEVBQUVvQyxHQUFHLENBQUN3QixJQUFJLENBQUM1RDtnQkFBRztjQUFFLENBQUMsQ0FBQyxDQUFDb0UsSUFBSSxDQUFDLFVBQUF5RSxDQUFDO2dCQUFBLE9BQUksQ0FBQ0EsQ0FBQyxFQUFFdkQsSUFBSSxDQUFDO2NBQUEsRUFBQztZQUMvRTtZQUNBLE1BQU0sSUFBSVksWUFBWSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQztVQUNwRCxDQUFDLENBQUMsQ0FDRDlCLElBQUksQ0FBQyxVQUFBMEUsRUFBRSxFQUFJO1lBQ1IsT0FBT3pHLEdBQUcsQ0FBQ2lDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2NBQUUsUUFBUSxFQUFFO1lBQWdDLENBQUMsQ0FBQztVQUM5RSxDQUFDLENBQUMsU0FBTSxDQUFDLFVBQUFPLEdBQUcsRUFBSTtZQUNaeEMsSUFBSSxDQUFDd0MsR0FBRyxDQUFDO1VBQ2IsQ0FBQyxDQUFDO1FBQUE7UUFBQTtVQUFBLE9BQUE2RCxTQUFBLENBQUE1RCxJQUFBO01BQUE7SUFBQSxHQUFBMEQsUUFBQTtFQUFBO0FBQ1YsQ0FBQyxPQUFBTixnQkFBQSxhQUFBOUkscUJBQUEseUJBQUEwSixXQUNnQjNHLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0VBQUEsV0FBQUUsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBdUcsU0FBQTtJQUFBLElBQUFDLFVBQUEsRUFBQWxHLEtBQUEsRUFBQUUsUUFBQSxFQUFBTCxTQUFBLEVBQUFzRyxXQUFBLEVBQUFDLFdBQUE7SUFBQSxPQUFBM0csWUFBQSxZQUFBZ0IsSUFBQSxVQUFBNEYsVUFBQUMsU0FBQTtNQUFBLGtCQUFBQSxTQUFBLENBQUExRixJQUFBLEdBQUEwRixTQUFBLENBQUEvRyxJQUFBO1FBQUE7VUFBQStHLFNBQUEsQ0FBQTFGLElBQUE7VUFFbkI7VUFBQXNGLFVBQUEsR0FDdUM3RyxHQUFHLENBQUN3QixJQUFJLEVBQXZDYixLQUFLLEdBQUFrRyxVQUFBLENBQUxsRyxLQUFLLEVBQUVFLFFBQVEsR0FBQWdHLFVBQUEsQ0FBUmhHLFFBQVEsRUFBRUwsU0FBUyxHQUFBcUcsVUFBQSxDQUFUckcsU0FBUyxFQUVsQztVQUdBO1VBQ01zRyxXQUFXLEdBQUdJLHNCQUFVLENBQUNDLGVBQWUsQ0FBQztZQUMzQ0MsT0FBTyxFQUFFLE9BQU87WUFDaEJDLElBQUksRUFBRTtjQUNGbEssSUFBSSxFQUFFa0IsT0FBTyxDQUFDQyxHQUFHLENBQUNnSixhQUFhO2NBQUU7Y0FDakNDLElBQUksRUFBRWxKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDa0osYUFBYSxDQUFDO1lBQ3BDO1VBQ0osQ0FBQyxDQUFDLEVBRUY7VUFDTVQsV0FBVyxHQUFHO1lBQ2hCVSxJQUFJLEVBQUVwSixPQUFPLENBQUNDLEdBQUcsQ0FBQ2dKLGFBQWE7WUFBRTtZQUNqQ0ksRUFBRSxFQUFFL0csS0FBSztZQUFFO1lBQ1hnSCxPQUFPLEVBQUUsb0JBQW9CO1lBQUU7WUFDL0JDLElBQUkscUNBQUFDLE1BQUEsQ0FDV3hKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDd0osWUFBWSxvTEFDdEMsQ0FBQztVQUNOLENBQUMsRUFFRDtVQUFBYixTQUFBLENBQUEvRyxJQUFBO1VBQUEsT0FDTTRHLFdBQVcsQ0FBQ2lCLFFBQVEsQ0FBQ2hCLFdBQVcsQ0FBQztRQUFBO1VBQ3ZDO1VBQ0E5RyxHQUFHLENBQUNrQyxJQUFJLENBQUM7WUFBRUksT0FBTyxFQUFFO1VBQUssQ0FBQyxDQUFDO1VBQUMwRSxTQUFBLENBQUEvRyxJQUFBO1VBQUE7UUFBQTtVQUFBK0csU0FBQSxDQUFBMUYsSUFBQTtVQUFBMEYsU0FBQSxDQUFBZSxFQUFBLEdBQUFmLFNBQUE7VUFFNUI7VUFDQXZGLE9BQU8sQ0FBQ3VHLEtBQUssQ0FBQyxtQ0FBbUMsRUFBQWhCLFNBQUEsQ0FBQWUsRUFBTyxDQUFDO1VBQ3pEL0gsR0FBRyxDQUFDaUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUksT0FBTyxFQUFFLEtBQUs7WUFBRTBGLEtBQUssRUFBRTtVQUFtQyxDQUFDLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQWhCLFNBQUEsQ0FBQXRFLElBQUE7TUFBQTtJQUFBLEdBQUFpRSxRQUFBO0VBQUE7QUFFNUYsQ0FBQyxHQUFBM0oscUJBQUE7QUFBQWlMLE9BQUEsY0FBQXBJLFFBQUEifQ==