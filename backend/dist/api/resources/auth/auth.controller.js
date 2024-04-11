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
var _addUser$findUser$get;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } // import { validateEmail } from './../../../functions'
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
  findUser: function findUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            console.log(111);
            _models.db.user.findOne({
              attributes: ["firstName", "lastName", "email", "user_manager"],
              where: {
                id: req.query.user_id
              }
            }).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user) {
                var userManager;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!user) {
                        _context2.next = 10;
                        break;
                      }
                      console.log(user);
                      if (!user.user_manager) {
                        _context2.next = 7;
                        break;
                      }
                      _context2.next = 5;
                      return _models.db.user.findOne({
                        where: {
                          id: user.id
                        }
                      });
                    case 5:
                      userManager = _context2.sent;
                      return _context2.abrupt("return", res.status(200).json({
                        success: true,
                        data: _objectSpread(_objectSpread({}, user), {}, {
                          userManager: userManager
                        }),
                        ok: true
                      }));
                    case 7:
                      return _context2.abrupt("return", res.status(200).json({
                        success: true,
                        data: user,
                        ok: true
                      }));
                    case 10:
                      res.status(500).json({
                        'success': false
                      });
                    case 11:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              console.log(err);
              next(err);
            });
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  getAllUserList: function getAllUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
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
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getAllLeader: function getAllLeader(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
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
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  userUpdate: function userUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, phone, status, note, user_id, avatar, user_manager, passwordHash;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
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
            return _context6.stop();
        }
      }, _callee6);
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
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body3, email, password, deviceCode, findUser, _findUser$device, _findUser$device2, _findUser$device3, _findUser$device4, _findUser$device5, _findUser$device6, _findUser$device7, _findUser$device8, device1Code, token, device2Code, _token, _device1Code, data, _token2, findUserdevice1, findUserdevice2, _token3;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, deviceCode = _req$body3.deviceCode; // var date = new Date();
            // console.log(password)
            // console.log(bcrypt.hashSync(password))
            _context7.next = 3;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 3:
            findUser = _context7.sent;
            if (!((findUser === null || findUser === void 0 ? void 0 : findUser.verify) === null)) {
              _context7.next = 8;
              break;
            }
            return _context7.abrupt("return", res.status(200).json({
              success: false
            }));
          case 8:
            if (!(findUser !== null && findUser !== void 0 && findUser.verify)) {
              _context7.next = 53;
              break;
            }
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device = findUser.device1) === null || _findUser$device === void 0 ? void 0 : _findUser$device.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device2 = findUser.device2) === null || _findUser$device2 === void 0 ? void 0 : _findUser$device2.length) > 0)) {
              _context7.next = 17;
              break;
            }
            device1Code = generateRandomString(10);
            _context7.next = 13;
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
            return _context7.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device1Code
            }));
          case 17:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device3 = findUser.device2) === null || _findUser$device3 === void 0 ? void 0 : _findUser$device3.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device4 = findUser.device1) === null || _findUser$device4 === void 0 ? void 0 : _findUser$device4.length) > 0)) {
              _context7.next = 25;
              break;
            }
            device2Code = generateRandomString(10);
            _context7.next = 21;
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
            return _context7.abrupt("return", res.status(200).json({
              success: true,
              token: _token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device2Code
            }));
          case 25:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device5 = findUser.device1) === null || _findUser$device5 === void 0 ? void 0 : _findUser$device5.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device6 = findUser.device2) === null || _findUser$device6 === void 0 ? void 0 : _findUser$device6.length) <= 0)) {
              _context7.next = 36;
              break;
            }
            _device1Code = generateRandomString(10);
            console.log(_device1Code);
            _context7.next = 30;
            return _models.db.user.update({
              device1: _device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 30:
            data = _context7.sent;
            console.log(data);
            _token2 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            return _context7.abrupt("return", res.status(200).json({
              success: true,
              token: _token2,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: _device1Code
            }));
          case 36:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device7 = findUser.device2) === null || _findUser$device7 === void 0 ? void 0 : _findUser$device7.length) > 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device8 = findUser.device1) === null || _findUser$device8 === void 0 ? void 0 : _findUser$device8.length) > 0)) {
              _context7.next = 51;
              break;
            }
            _context7.next = 39;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device1: deviceCode
              }
            });
          case 39:
            findUserdevice1 = _context7.sent;
            _context7.next = 42;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device2: deviceCode
              }
            });
          case 42:
            findUserdevice2 = _context7.sent;
            _token3 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id
            }, process.env.JWT_SECRET);
            if (!(findUserdevice1 !== null && findUserdevice1 !== void 0 && findUserdevice1.email || findUserdevice2 !== null && findUserdevice2 !== void 0 && findUserdevice2.email)) {
              _context7.next = 49;
              break;
            }
            console.log(5);
            return _context7.abrupt("return", res.status(200).json({
              success: true,
              token: _token3,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: deviceCode
            }));
          case 49:
            console.log(6);
            return _context7.abrupt("return", res.status(200).json({
              success: false,
              login: false,
              third: true
            }));
          case 51:
            _context7.next = 54;
            break;
          case 53:
            return _context7.abrupt("return", res.status(200).json({
              success: false
            }));
          case 54:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  }
}, (0, _defineProperty2["default"])(_addUser$findUser$get, "findUser", function findUser(req, res, next) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var _req$query;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
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
          return _context8.stop();
      }
    }, _callee8);
  }))();
}), (0, _defineProperty2["default"])(_addUser$findUser$get, "deleteUserList", function deleteUserList(req, res, next) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
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
          return _context9.stop();
      }
    }, _callee9);
  }))();
}), (0, _defineProperty2["default"])(_addUser$findUser$get, "verifyMail", function verifyMail(req, res) {
  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var _req$body4, email, password, firstName, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
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
          _context10.next = 6;
          return transporter.sendMail(mailOptions);
        case 6:
          // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
          res.json({
            success: true
          });
          _context10.next = 13;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          // Xử lý lỗi nếu có
          console.error('Error sending verification email:', _context10.t0);
          res.status(500).json({
            success: false,
            error: 'Error sending verification email'
          });
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 9]]);
  }))();
}), _addUser$findUser$get);
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiX2FkZFVzZXIkZmluZFVzZXIkZ2V0Iiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJKV1RTaWduIiwidXNlciIsImRhdGUiLCJKV1QiLCJzaWduIiwiaXNzIiwiY29uZmlnIiwiYXBwIiwibmFtZSIsInN1YiIsImlkIiwiaWFtIiwidHlwZSIsImlhdCIsImdldFRpbWUiLCJleHAiLCJEYXRlIiwic2V0TWludXRlcyIsImdldE1pbnV0ZXMiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiY2hhcmFjdGVycyIsInJlc3VsdCIsImNoYXJhY3RlcnNMZW5ndGgiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsIk9UUF9LRVkiLCJlbmNvZGluZyIsInN0ZXAiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lIiwiZW1haWwiLCJhZGRyZXNzIiwicGFzc3dvcmQiLCJyb2xlIiwibm90ZSIsInVzZXJfaWQiLCJhdmF0YXIiLCJ1c2VyX21hbmFnZXIiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsIl9yZWYiLCJfY2FsbGVlMiIsInVzZXJNYW5hZ2VyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwic2VudCIsImFicnVwdCIsImRhdGEiLCJvayIsIl94IiwiZ2V0QWxsVXNlckxpc3QiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImZpbmRBbGwiLCJnZXRBbGxMZWFkZXIiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNiIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJwYXJzZUludCIsImxvZ2luIiwiX2NhbGxlZTciLCJfcmVxJGJvZHkzIiwiZGV2aWNlQ29kZSIsIl9maW5kVXNlciRkZXZpY2UiLCJfZmluZFVzZXIkZGV2aWNlMiIsIl9maW5kVXNlciRkZXZpY2UzIiwiX2ZpbmRVc2VyJGRldmljZTQiLCJfZmluZFVzZXIkZGV2aWNlNSIsIl9maW5kVXNlciRkZXZpY2U2IiwiX2ZpbmRVc2VyJGRldmljZTciLCJfZmluZFVzZXIkZGV2aWNlOCIsImRldmljZTFDb2RlIiwiZGV2aWNlMkNvZGUiLCJfdG9rZW4iLCJfZGV2aWNlMUNvZGUiLCJfdG9rZW4yIiwiZmluZFVzZXJkZXZpY2UxIiwiZmluZFVzZXJkZXZpY2UyIiwiX3Rva2VuMyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJ0aGlyZCIsIl9jYWxsZWU4IiwiX3JlcSRxdWVyeSIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImRlbGV0ZVVzZXJMaXN0IiwiX2NhbGxlZTkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJkZXN0cm95IiwiciIsInJlIiwidmVyaWZ5TWFpbCIsIl9jYWxsZWUxMCIsIl9yZXEkYm9keTQiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJNQUlMX1VTRVJOQU1FIiwicGFzcyIsIk1BSUxfUEFTU1dPUkQiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImNvbmNhdCIsIlVSTF9GUk9OVEVORCIsInNlbmRNYWlsIiwidDAiLCJlcnJvciIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9hdXRoL2F1dGguY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdC1ub2RlanMnO1xuaW1wb3J0IHNwZWFrZWFzeSBmcm9tICdzcGVha2Vhc3knO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGVFbWFpbCB9IGZyb20gJy4vLi4vLi4vLi4vZnVuY3Rpb25zJ1xuaW1wb3J0IG1kNSBmcm9tIFwibWQ1XCJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCJcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICAgIHJldHVybiBKV1Quc2lnbih7XG4gICAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxuICAgICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0OiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgZXhwOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMClcbiAgICB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21TdHJpbmcobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XG4gICAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XG4gICAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSksXG4gICAgICAgIHdpbmRvdzogMFxuICAgIH0pO1xuICAgIHJldHVybiBleHBpcnlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSwgbm90ZSwgdXNlcl9pZCwgYXZhdGFyLCB1c2VyX21hbmFnZXIgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcbiAgICAgICAgY29uc29sZS5sb2cocGFzc3dvcmRIYXNoKVxuICAgICAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xuICAgICAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4oZmluZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IHZlcmlmeSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLCB1c2VyX2lkOiB1c2VyX2lkID8gdXNlcl9pZCA6IFwiXCIsIGF2YXRhcjogYXZhdGFyID8gYXZhdGFyIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBudWxsIFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwga2V5OiBvdHAsIG1zZzogXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICsgZW1haWwgKyBcIiAuXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coMTExKVxuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiLCBcInVzZXJfbWFuYWdlclwiXSwgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS51c2VyX2lkIH19KVxuICAgICAgICAudGhlbihhc3luYyB1c2VyID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgICAgICAgICAgICAgIGlmKHVzZXIudXNlcl9tYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJNYW5hZ2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7aWQ6IHVzZXIuaWR9fSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTp7Li4udXNlciwgdXNlck1hbmFnZXJ9LCBvazogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIGdldEFsbFVzZXJMaXN0KHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZEFsbCgpXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0QWxsTGVhZGVyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZEFsbCh7d2hlcmU6IHtyb2xlOiBcImxlYWRlclwifX0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgdXNlclVwZGF0ZShyZXEscmVzLG5leHQpe1xuICAgICAgICBjb25zdCB7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSwgcGhvbmUsIHN0YXR1cywgbm90ZSwgdXNlcl9pZCwgYXZhdGFyLCB1c2VyX21hbmFnZXIgfSA9IHJlcS5ib2R5O1xuICAgICAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkID8gcGFzc3dvcmQgOiBcIlwiKTtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUgPyBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoOiB1c2VyLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsID8gZW1haWwgOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAvLyB2ZXJpZnkgOiBzdGF0dXM/IHN0YXR1czogdXNlci52ZXJpZnksXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSA/IHBob25lIDogdXNlci5waG9uZSxcbiAgICAgICAgICAgICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB1c2VyX2lkID8gdXNlcl9pZCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogYXZhdGFyID8gYXZhdGFyIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMgPyBwYXJzZUludChzdGF0dXMpIDogMCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBudWxsXG4gICAgICAgICAgICAgICAgfSwgeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVzZXIgdXBkYXRlIHN1Y2Nlc3NzZnVsbHlcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vICAgICB2YXIgdG9rZW4gPSBKV1RTaWduKHJlcS51c2VyLCBkYXRlKTtcbiAgICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcbiAgICAvLyAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAgIC8vICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgICAvLyAgICAgfSk7XG4gICAgICAgIFxuICAgIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbiwgcm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAgIC8vIH0sXG4gICAgYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCwgZGV2aWNlQ29kZSB9PSByZXEuYm9keVxuICAgICAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpKVxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgaWYoZmluZFVzZXI/LnZlcmlmeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8udmVyaWZ5KSB7XG4gICAgICAgICAgICBpZihmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UxQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTE6IGRldmljZTFDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UyQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTI6IGRldmljZTJDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UyQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTFDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UxQ29kZSlcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhPSBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMTogZGV2aWNlMUNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UxPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMTogZGV2aWNlQ29kZX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTI6IGRldmljZUNvZGV9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIGlmKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg1KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBsb2dpbjogZmFsc2UsIHRoaXJkOiB0cnVlfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBmaW5kVXNlcihyZXEscmVzLG5leHQpe1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyBhdHRyaWJ1dGVzOltcImZpcnN0TmFtZVwiLFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiLCBcImF2YXRhclwiLCBcInBob25lXCIsIFwiYWRkcmVzc1wiLCBcInJvbGVcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnk/LnVzZXJfaWQgfX0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkgeyBcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkfSB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLnVzZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pLnRoZW4ociA9PiBbciwgZGF0YV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ1VzZXIgaXMgbm90IGZvdW5kJywgNDA5KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIHVzZXJsaXN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfSxcbiAgICBhc3luYyB2ZXJpZnlNYWlsKHJlcSwgcmVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBOaOG6rW4gZW1haWwgdOG7qyByZXF1ZXN0IGJvZHlcbiAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xuICAgIFxuICAgICAgICAgICAgLy8gVOG6oW8gbeG7mXQgbcOjIHjDoWMgdGjhu7FjIG5n4bqrdSBuaGnDqm5cbiAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCB0aMO0bmcgdGluIG1haWwgc2VydmVyIChkw7luZyBHbWFpbCBsw6BtIHbDrSBk4bulKVxuICAgICAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgICAgc2VydmljZTogJ2dtYWlsJyxcbiAgICAgICAgICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMX1BBU1NXT1JEIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxuICAgICAgICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgdG86IGVtYWlsLCAvLyDEkOG7i2EgY2jhu4kgZW1haWwgbmfGsOG7nWkgZMO5bmcgY+G6p24geMOhYyB0aOG7sWNcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiAnRW1haWwgVmVyaWZpY2F0aW9uJywgLy8gVGnDqnUgxJHhu4EgZW1haWxcbiAgICAgICAgICAgICAgICBodG1sOiBgXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LlVSTF9GUk9OVEVORH0vc2lnbnVwL3N1Y2Nlc3NcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6ICMyZTg5ZmY7IGNvbG9yOiAjZmZmOyB3aWR0aDogMTAwJVwiPkNsaWNrIGhlcmUgdG8gY29tcGxldGUgc2luZ3VwIHByb2Nlc3M8L2E+XG4gICAgICAgICAgICAgICAgYCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEfhu61pIGVtYWlsXG4gICAgICAgICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBUcuG6oyB24buBIG3DoyB4w6FjIHRo4buxYyDEkeG7gyBz4butIGThu6VuZyBzYXUgbsOgeSAodsOtIGThu6UgxJHhu4Mga2nhu4NtIHRyYSBtw6Mga2hpIG5nxrDhu51pIGTDuW5nIG5o4bqtcCB2w6BvKVxuICAgICAgICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gWOG7rSBsw70gbOG7l2kgbuG6v3UgY8OzXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDonLCBlcnJvcik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsJyB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBQyxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUcsT0FBQSxHQUFBRCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFB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