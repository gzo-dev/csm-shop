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
var _default = {
  addUser: function addUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, firstName, lastName, phone, email, address, password, role, verify, note, user_id, avatar, user_manager, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify, note = _req$body.note, user_id = _req$body.user_id, avatar = _req$body.avatar, user_manager = _req$body.user_manager;
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
                avatar: avatar ? avatar : "",
                user_manager: user_manager ? user_manager : null
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
  getAllUserList: function getAllUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
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
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  getAllLeader: function getAllLeader(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _models.db.user.findAll({
              where: {
                role: "leader"
              }
            }).then(function (user) {
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
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, phone, status, note, user_id, avatar, user_manager, passwordHash;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify, phone = _req$body2.phone, status = _req$body2.status, note = _req$body2.note, user_id = _req$body2.user_id, avatar = _req$body2.avatar, user_manager = _req$body2.user_manager;
            passwordHash = (0, _md["default"])(password ? password : "");
            _models.db.user.findOne({
              where: {
                id: id
              },
              paranoid: false
            }).then(function (user) {
              if (!user) {
                throw new RequestError('User is not found', 409);
              }
              return _models.db.user.update({
                firstName: firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName,
                password: password ? passwordHash : user.password,
                address: address ? address : user.address,
                role: role ? role : user.role,
                email: email ? email : user.email,
                // verify : status? status: user.verify,
                phone: phone ? phone : user.phone,
                note: note ? note : "",
                user_id: user_id ? user_id : "",
                avatar: avatar ? avatar : "",
                status: status ? parseInt(status) : 0,
                user_manager: user_manager ? user_manager : null
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
  },
  findUser: function findUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$query;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _models.db.user.findOne({
              attributes: ["firstName", "lastName", "email", "avatar", "phone", "address", "role", "user_manager"],
              where: {
                id: (_req$query = req.query) === null || _req$query === void 0 ? void 0 : _req$query.user_id
              }
            }).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(user) {
                var _user$dataValues, userManager;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!user) {
                        _context6.next = 9;
                        break;
                      }
                      if (!((_user$dataValues = user.dataValues) !== null && _user$dataValues !== void 0 && _user$dataValues.user_manager)) {
                        _context6.next = 6;
                        break;
                      }
                      _context6.next = 4;
                      return _models.db.user.findOne({
                        where: {
                          id: user.dataValues.user_manager
                        }
                      });
                    case 4:
                      userManager = _context6.sent;
                      return _context6.abrupt("return", res.status(200).json({
                        success: true,
                        data: user,
                        dataManager: userManager,
                        ok: true
                      }));
                    case 6:
                      return _context6.abrupt("return", res.status(200).json({
                        success: true,
                        data: user,
                        ok: true,
                        dataManager: null
                      }));
                    case 9:
                      res.status(500).json({
                        'success': false
                      });
                    case 10:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              console.log(err);
              return res.status(500).json({
                'success': false
              });
              next(err);
            });
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  deleteUserList: function deleteUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
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
            return _context8.stop();
        }
      }, _callee8);
    }))();
  },
  verifyMail: function verifyMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$body4, email, password, firstName, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
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
            _context9.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
            res.json({
              success: true
            });
            _context9.next = 13;
            break;
          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](0);
            // Xử lý lỗi nếu có
            console.error('Error sending verification email:', _context9.t0);
            res.status(500).json({
              success: false,
              error: 'Error sending verification email'
            });
          case 13:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJub3RlIiwidXNlcl9pZCIsImF2YXRhciIsInVzZXJfbWFuYWdlciIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZmluZEFsbCIsImRhdGEiLCJnZXRBbGxMZWFkZXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJwYXJzZUludCIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiZGV2aWNlQ29kZSIsImZpbmRVc2VyIiwiX2ZpbmRVc2VyJGRldmljZSIsIl9maW5kVXNlciRkZXZpY2UyIiwiX2ZpbmRVc2VyJGRldmljZTMiLCJfZmluZFVzZXIkZGV2aWNlNCIsIl9maW5kVXNlciRkZXZpY2U1IiwiX2ZpbmRVc2VyJGRldmljZTYiLCJfZmluZFVzZXIkZGV2aWNlNyIsIl9maW5kVXNlciRkZXZpY2U4IiwiZGV2aWNlMUNvZGUiLCJkZXZpY2UyQ29kZSIsIl90b2tlbiIsIl9kZXZpY2UxQ29kZSIsIl90b2tlbjIiLCJmaW5kVXNlcmRldmljZTEiLCJmaW5kVXNlcmRldmljZTIiLCJfdG9rZW4zIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsImFicnVwdCIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJ0aGlyZCIsIl9jYWxsZWU3IiwiX3JlcSRxdWVyeSIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsIl9yZWYiLCJfY2FsbGVlNiIsIl91c2VyJGRhdGFWYWx1ZXMiLCJ1c2VyTWFuYWdlciIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRhdGFNYW5hZ2VyIiwib2siLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTkiLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIlxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIlxuXG52YXIgSldUU2lnbiA9IGZ1bmN0aW9uICh1c2VyLCBkYXRlKSB7XG4gICAgcmV0dXJuIEpXVC5zaWduKHtcbiAgICAgICAgaXNzOiBjb25maWcuYXBwLm5hbWUsXG4gICAgICAgIHN1YjogdXNlci5pZCxcbiAgICAgICAgaWFtIDogdXNlci50eXBlLFxuICAgICAgICBpYXQ6IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxuICAgIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW5ndGgpIHtcbiAgICBjb25zdCBjaGFyYWN0ZXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZU90cCgpIHtcbiAgICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpXG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlPdHAodG9rZW4pIHtcbiAgICBsZXQgZXhwaXJ5ID0gc3BlYWtlYXN5LnRvdHAudmVyaWZ5KHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKSxcbiAgICAgICAgd2luZG93OiAwXG4gICAgfSk7XG4gICAgcmV0dXJuIGV4cGlyeVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBhZGRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5LCBub3RlLCB1c2VyX2lkLCBhdmF0YXIsIHVzZXJfbWFuYWdlciB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXNzd29yZEhhc2gpXG4gICAgICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XG4gICAgICAgIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbihmaW5kID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmluZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIiwgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGwgXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kRW1wbG95ZWVQYXNzd29yZChlbWFpbCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBrZXk6IG90cCwgbXNnOiBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgKyBlbWFpbCArIFwiIC5cIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBhc3luYyBnZXRBbGxMZWFkZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKHt3aGVyZToge3JvbGU6IFwibGVhZGVyXCJ9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5LCBwaG9uZSwgc3RhdHVzLCBub3RlLCB1c2VyX2lkLCBhdmF0YXIsIHVzZXJfbWFuYWdlciB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQgPyBwYXNzd29yZCA6IFwiXCIpO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSA/IGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2g6IHVzZXIucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogdXNlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlID8gcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwgPyBlbWFpbCA6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIC8vIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyA/IHBhcnNlSW50KHN0YXR1cykgOiAwLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGxcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gICAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAgIC8vICAgICB9KTtcbiAgICAgICAgXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gICAgLy8gfSxcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkLCBkZXZpY2VDb2RlIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICBpZihmaW5kVXNlcj8udmVyaWZ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy52ZXJpZnkpIHtcbiAgICAgICAgICAgIGlmKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTFDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMTogZGV2aWNlMUNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTFDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTJDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMjogZGV2aWNlMkNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTJDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRldmljZTFDb2RlKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE9IGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDAgJiYgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTE9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UxOiBkZXZpY2VDb2RlfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMjogZGV2aWNlQ29kZX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgaWYoZmluZFVzZXJkZXZpY2UxPy5lbWFpbCB8fCBmaW5kVXNlcmRldmljZTI/LmVtYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIGxvZ2luOiBmYWxzZSwgdGhpcmQ6IHRydWV9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGZpbmRVc2VyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IGF0dHJpYnV0ZXM6W1wiZmlyc3ROYW1lXCIsXCJsYXN0TmFtZVwiLCBcImVtYWlsXCIsIFwiYXZhdGFyXCIsIFwicGhvbmVcIiwgXCJhZGRyZXNzXCIsIFwicm9sZVwiLCBcInVzZXJfbWFuYWdlclwiXSwgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeT8udXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4oYXN5bmMgdXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIGlmKHVzZXIuZGF0YVZhbHVlcz8udXNlcl9tYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJNYW5hZ2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7aWQ6IHVzZXIuZGF0YVZhbHVlcy51c2VyX21hbmFnZXJ9fSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciwgZGF0YU1hbmFnZXI6IHVzZXJNYW5hZ2VyLCBvazogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB1c2VyLCBvazogdHJ1ZSwgZGF0YU1hbmFnZXI6IG51bGx9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIGRlbGV0ZVVzZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7IFxuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FB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