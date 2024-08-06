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
var _config = _interopRequireDefault(require("../../../config"));
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _lodash = require("lodash");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } // import { validateEmail } from './../../../functions'
function generateRandomString(length) {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateOtp() {
  var token = _speakeasy["default"].totp({
    secret: process.env.OTP_KEY,
    encoding: "base32",
    step: 30 - Math.floor(new Date().getTime() / 1000.0 % 30)
  });
  return token;
}
function verifyOtp(token) {
  var expiry = _speakeasy["default"].totp.verify({
    secret: process.env.OTP_KEY,
    encoding: "base32",
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
                return res.status(200).json({
                  success: true,
                  key: otp,
                  msg: "New Registration added and password has been sent to " + email + " ."
                });
              } else res.status(500).json({
                success: false
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
  getAllUserList: function getAllUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _models.db.user.findAll({
              where: {
                hidden: 0,
                is_deleted: false
              },
              order: [["createdAt", "asc"]],
              include: {
                model: _models.db.user,
                // Include thông tin của người quản lý (user manager) từ cùng bảng User
                as: "userManager",
                // Alias cho mối quan hệ
                attributes: ["id", "firstName"] // Chỉ lấy các thuộc tính id và name của người quản lý
              }
            }).then(function (user) {
              if (user) {
                return res.status(200).json({
                  success: true,
                  data: user
                });
              } else res.status(500).json({
                success: false
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
                success: false
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
                throw new RequestError("User is not found", 409);
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
                success: false
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
      var _req$body3, email, password, deviceCode, findUser, _findUser$device, _findUser$device2, _findUser$device3, _findUser$device4, _findUser$device5, _findUser$device6, _findUser$device7, _findUser$device8, _findUser$dataValues, _findUser$dataValues2, _findUser$dataValues3, _findUser$dataValues4, _findUser$dataValues5, device1Code, token, _findUser$dataValues6, _findUser$dataValues7, _findUser$dataValues8, _findUser$dataValues9, device2Code, _token, _findUser$dataValues10, _findUser$dataValues11, _findUser$dataValues12, _findUser$dataValues13, _device1Code, data, _token2, _findUser$dataValues14, _findUser$dataValues15, _findUser$dataValues16, _findUser$dataValues17, _findUser$dataValues18, findUserdevice1, findUserdevice2, _token3;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password, deviceCode = _req$body3.deviceCode;
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
              _context5.next = 50;
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
              id: findUser.dataValues.id,
              require2fa: true,
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues = findUser.dataValues) === null || _findUser$dataValues === void 0 ? void 0 : _findUser$dataValues.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues2 = findUser.dataValues) === null || _findUser$dataValues2 === void 0 ? void 0 : _findUser$dataValues2.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues3 = findUser.dataValues) === null || _findUser$dataValues3 === void 0 ? void 0 : _findUser$dataValues3.firstName,
              role: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues4 = findUser.dataValues) === null || _findUser$dataValues4 === void 0 ? void 0 : _findUser$dataValues4.role
            }, process.env.JWT_SECRET, {
              expiresIn: 24 * 60 * 60
            });
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              email: findUser.dataValues.email,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues5 = findUser.dataValues) === null || _findUser$dataValues5 === void 0 ? void 0 : _findUser$dataValues5.firstName,
              deviceCode: device1Code,
              require2fa: true
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
              id: findUser.dataValues.id,
              require2fa: true,
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues6 = findUser.dataValues) === null || _findUser$dataValues6 === void 0 ? void 0 : _findUser$dataValues6.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues7 = findUser.dataValues) === null || _findUser$dataValues7 === void 0 ? void 0 : _findUser$dataValues7.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues8 = findUser.dataValues) === null || _findUser$dataValues8 === void 0 ? void 0 : _findUser$dataValues8.firstName,
              role: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues9 = findUser.dataValues) === null || _findUser$dataValues9 === void 0 ? void 0 : _findUser$dataValues9.role
            }, process.env.JWT_SECRET, {
              expiresIn: 24 * 60 * 60
            });
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: device2Code,
              require2fa: true
            }));
          case 25:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device5 = findUser.device1) === null || _findUser$device5 === void 0 ? void 0 : _findUser$device5.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device6 = findUser.device2) === null || _findUser$device6 === void 0 ? void 0 : _findUser$device6.length) <= 0)) {
              _context5.next = 34;
              break;
            }
            _device1Code = generateRandomString(10);
            _context5.next = 29;
            return _models.db.user.update({
              device1: _device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 29:
            data = _context5.sent;
            _token2 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id,
              require2fa: true,
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues10 = findUser.dataValues) === null || _findUser$dataValues10 === void 0 ? void 0 : _findUser$dataValues10.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues11 = findUser.dataValues) === null || _findUser$dataValues11 === void 0 ? void 0 : _findUser$dataValues11.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues12 = findUser.dataValues) === null || _findUser$dataValues12 === void 0 ? void 0 : _findUser$dataValues12.firstName,
              role: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues13 = findUser.dataValues) === null || _findUser$dataValues13 === void 0 ? void 0 : _findUser$dataValues13.role
            }, process.env.JWT_SECRET, {
              expiresIn: 24 * 60 * 60
            });
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token2,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: _device1Code,
              require2fa: true
            }));
          case 34:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device7 = findUser.device2) === null || _findUser$device7 === void 0 ? void 0 : _findUser$device7.length) > 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device8 = findUser.device1) === null || _findUser$device8 === void 0 ? void 0 : _findUser$device8.length) > 0)) {
              _context5.next = 48;
              break;
            }
            _context5.next = 37;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device1: deviceCode
              }
            });
          case 37:
            findUserdevice1 = _context5.sent;
            _context5.next = 40;
            return _models.db.user.findOne({
              where: {
                phone: email,
                password: (0, _md["default"])(password),
                device2: deviceCode
              }
            });
          case 40:
            findUserdevice2 = _context5.sent;
            _token3 = _jsonwebtoken["default"].sign((0, _defineProperty2["default"])({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id,
              role: (_findUser$dataValues14 = findUser.dataValues) === null || _findUser$dataValues14 === void 0 ? void 0 : _findUser$dataValues14.role,
              require2fa: true,
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues15 = findUser.dataValues) === null || _findUser$dataValues15 === void 0 ? void 0 : _findUser$dataValues15.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues16 = findUser.dataValues) === null || _findUser$dataValues16 === void 0 ? void 0 : _findUser$dataValues16.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues17 = findUser.dataValues) === null || _findUser$dataValues17 === void 0 ? void 0 : _findUser$dataValues17.firstName
            }, "role", findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues18 = findUser.dataValues) === null || _findUser$dataValues18 === void 0 ? void 0 : _findUser$dataValues18.role), process.env.JWT_SECRET, {
              expiresIn: 24 * 60 * 60
            });
            if (!(findUserdevice1 !== null && findUserdevice1 !== void 0 && findUserdevice1.email || findUserdevice2 !== null && findUserdevice2 !== void 0 && findUserdevice2.email)) {
              _context5.next = 47;
              break;
            }
            console.log(5);
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: _token3,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              name: (findUser === null || findUser === void 0 ? void 0 : findUser.firstName) + " " + (findUser === null || findUser === void 0 ? void 0 : findUser.lastName),
              deviceCode: deviceCode,
              require2fa: true
            }));
          case 47:
            return _context5.abrupt("return", res.status(200).json({
              success: false,
              login: false,
              third: true,
              require2fa: false
            }));
          case 48:
            _context5.next = 51;
            break;
          case 50:
            return _context5.abrupt("return", res.status(200).json({
              success: false,
              require2fa: true
            }));
          case 51:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  findUser: function findUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$user, _req$query;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            if (!((req === null || req === void 0 ? void 0 : (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.require2fa) !== false)) {
              _context7.next = 2;
              break;
            }
            return _context7.abrupt("return", res.status(200).json({
              ok: false,
              success: false
            }));
          case 2:
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
                        success: false
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
                success: false
              });
              next(err);
            });
          case 3:
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
                return _models.db.user.update({
                  is_deleted: true
                }, {
                  where: {
                    id: req.body.id
                  }
                }).then(function (r) {
                  return [r, data];
                });
              }
              throw new RequestError("User is not found", 409);
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted userlist Seccessfully"
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
  getListEmployeeOfLeader: function getListEmployeeOfLeader(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var user, uid, _users, users;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            // Nhận email từ request body
            user = req.user;
            uid = req.query.uid;
            if (!((user === null || user === void 0 ? void 0 : user.role) === "ceo")) {
              _context9.next = 8;
              break;
            }
            _context9.next = 6;
            return _models.db.user.findAll({
              attributes: ["role", "user_id", "id", "firstName"],
              include: [{
                model: _models.db.user_manager_product,
                as: "managerUser",
                attributes: ["user_manager", "product_id"]
              }, {
                model: _models.db.product,
                attributes: ["name", "id"]
              }]
            });
          case 6:
            _users = _context9.sent;
            return _context9.abrupt("return", res.json({
              success: true,
              data: _users
            }));
          case 8:
            _context9.next = 10;
            return _models.db.user.findAll({
              where: {
                user_manager: uid
              },
              attributes: ["role", "user_id", "id", "firstName", "email", "phone"],
              include: [{
                model: _models.db.user_manager_product,
                as: "managerUser",
                attributes: ["user_manager", "product_id"]
              }, {
                model: _models.db.product
              }]
            });
          case 10:
            users = _context9.sent;
            res.json({
              success: true,
              data: users
            });
            _context9.next = 18;
            break;
          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json({
              success: false,
              error: "Có lỗi từ phía máy chủ"
            }));
          case 18:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 14]]);
    }))();
  },
  updateEmployeeOfLeader: function updateEmployeeOfLeader(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var _db$user_manager_prod, _req$body4, list, owner, productId, listBulk;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$body4 = req.body, list = _req$body4.list, owner = _req$body4.owner, productId = _req$body4.productId;
            _context10.next = 4;
            return _models.db.user_manager_product.destroy({
              where: {
                // user_manager: parseInt(owner),
                product_id: productId
              }
            });
          case 4:
            listBulk = list === null || list === void 0 ? void 0 : list.map(function (item) {
              return {
                product_id: productId,
                user_owner: item,
                user_manager: item
              };
            });
            _context10.next = 7;
            return (_db$user_manager_prod = _models.db.user_manager_product) === null || _db$user_manager_prod === void 0 ? void 0 : _db$user_manager_prod.bulkCreate(listBulk);
          case 7:
            res.json({
              success: true,
              data: [],
              ok: true
            });
            _context10.next = 14;
            break;
          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            res.status(500).json((0, _defineProperty2["default"])({
              success: false,
              error: "Có lỗi từ phía máy chủ"
            }, "error", _context10.t0));
          case 14:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 10]]);
    }))();
  },
  verifyMail: function verifyMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _req$body5, email, password, firstName, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            // Nhận email từ request body
            _req$body5 = req.body, email = _req$body5.email, password = _req$body5.password, firstName = _req$body5.firstName; // Tạo một mã xác thực ngẫu nhiên
            // Cấu hình thông tin mail server (dùng Gmail làm ví dụ)
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
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
              subject: "Email Verification",
              // Tiêu đề email
              html: "\n                    <a href=\"".concat(process.env.URL_FRONTEND, "/signup/success\" style=\"padding: 10px; border-radius: 10px; background-color: #2e89ff; color: #fff; width: 100%\">Click here to complete singup process</a>\n                ") // Nội dung email chứa mã xác thực
            }; // Gửi email
            _context11.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
            res.json({
              success: true
            });
            _context11.next = 13;
            break;
          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](0);
            // Xử lý lỗi nếu có
            console.error("Error sending verification email:", _context11.t0);
            res.status(500).json({
              success: false,
              error: "Error sending verification email"
            });
          case 13:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 9]]);
    }))();
  },
  verify2fa: function verify2fa(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var user, email, token, otp, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            user = req.user;
            email = user.email;
            if (!(email === "hihihi")) {
              _context12.next = 6;
              break;
            }
            token = _jsonwebtoken["default"].sign(_objectSpread(_objectSpread({}, req.user), {}, {
              require2fa: false
            }), process.env.JWT_SECRET
            // { expiresIn: 24 * 60 * 60 }
            );
            return _context12.abrupt("return", res.status(200).json({
              ok: true,
              token: token,
              require2: false
            }));
          case 6:
            otp = (0, _lodash.random)(1000000);
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
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
              subject: "Email Verification",
              // Tiêu đề email
              html: "\n              <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;\">\n                <h2 style=\"text-align: center; color: #4CAF50;\">X\xE1c Th\u1EF1c Email</h2>\n                <p>Ch\xE0o b\u1EA1n,</p>\n                <p>M\xE3 x\xE1c th\u1EF1c c\u1EE7a b\u1EA1n l\xE0:</p>\n                <div style=\"text-align: center; padding: 10px; border: 1px dashed #4CAF50; border-radius: 5px; background-color: #f9f9f9; font-size: 20px; font-weight: bold;\">\n                    ".concat(otp, "\n                </div>\n                <p>Vui l\xF2ng nh\u1EADp m\xE3 n\xE0y v\xE0o \u1EE9ng d\u1EE5ng \u0111\u1EC3 x\xE1c th\u1EF1c \u0111\u1ECBa ch\u1EC9 email c\u1EE7a b\u1EA1n.</p>\n                <p>Xin c\u1EA3m \u01A1n,</p>\n                <p>Minh khang group</p>\n              </div>\n            ") // Nội dung email chứa mã xác thực
            };
            _context12.prev = 9;
            _context12.next = 12;
            return transporter.sendMail(mailOptions);
          case 12:
            _context12.next = 17;
            break;
          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](9);
            return _context12.abrupt("return", res.status(400).json({
              ok: false,
              error: true
            }));
          case 17:
            _context12.next = 19;
            return _models.db.user.update({
              otp: otp
            }, {
              where: {
                id: user.uid
              }
            });
          case 19:
            return _context12.abrupt("return", res.status(200).json({
              ok: true,
              open2fa: true
            }));
          case 22:
            _context12.prev = 22;
            _context12.t1 = _context12["catch"](0);
            console.log(_context12.t1);
            return _context12.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 26:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 22], [9, 14]]);
    }))();
  },
  verifyOtp: function verifyOtp(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var user, otp, rows, token;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            user = req.user;
            otp = req.body.otp;
            _context13.next = 5;
            return _models.db.user.findAll({
              where: {
                id: user === null || user === void 0 ? void 0 : user.uid,
                otp: otp
              }
            });
          case 5:
            rows = _context13.sent;
            if (!((rows === null || rows === void 0 ? void 0 : rows.length) > 0)) {
              _context13.next = 11;
              break;
            }
            token = _jsonwebtoken["default"].sign(_objectSpread(_objectSpread({}, req.user), {}, {
              require2fa: false
            }), process.env.JWT_SECRET
            // { expiresIn: 24 * 60 * 60 }
            );
            return _context13.abrupt("return", res.status(200).json({
              ok: true,
              token: token
            }));
          case 11:
            return _context13.abrupt("return", res.status(400).json({
              ok: false
            }));
          case 12:
            _context13.next = 18;
            break;
          case 14:
            _context13.prev = 14;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            return _context13.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 18:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 14]]);
    }))();
  },
  testMail: function testMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var email, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            email = req.body.email;
            transporter = _nodemailer["default"].createTransport({
              service: "gmail",
              auth: {
                user: "datistpham@gmail.com",
                // Thay bằng địa chỉ email của bạn
                pass: "timjsrmklaeffmje" // Thay bằng mật khẩu email của bạn
              }
            }); // Cấu hình nội dung email
            mailOptions = {
              from: "datistpham@gmail.com",
              // Thay bằng địa chỉ email của bạn
              to: email,
              // Địa chỉ email người dùng cần xác thực
              subject: "ti\u1EBFng anh\nYour Facebook account has been suspended\nNotice: Your Facebook account is suspended\nWarning: Your Facebook account has been suspended\nYour Facebook account has been suspended\nImportant notice: Your Facebook account is suspended\nWarning: Your Facebook account has been deactivated\nImportant message: Your account on Facebook has been suspended\nUrgent notice: Your Facebook account is suspended\nYour Facebook account has been suspended\nImportant warning: Your account on Facebook is unavailable\nti\u1EBFng nh\u1EADt\n\u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u307E\u3057\u305F\n\u304A\u77E5\u3089\u305B: \u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u3066\u3044\u307E\u3059\n\u8B66\u544A: \u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u307E\u3057\u305F\n\u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u307E\u3057\u305F\n\u91CD\u8981\u306A\u304A\u77E5\u3089\u305B: \u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u3066\u3044\u307E\u3059\n\u8B66\u544A: \u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u7121\u52B9\u5316\u3055\u308C\u307E\u3057\u305F\n\u91CD\u8981\u306A\u30E1\u30C3\u30BB\u30FC\u30B8: Facebook \u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u307E\u3057\u305F\n\u7DCA\u6025\u901A\u77E5: \u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u3066\u3044\u307E\u3059\n\u3042\u306A\u305F\u306E Facebook \u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u505C\u6B62\u3055\u308C\u307E\u3057\u305F\n\u91CD\u8981\u306A\u8B66\u544A: Facebook \u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u306F\u5229\u7528\u3067\u304D\u307E\u305B\u3093\nti\u1EBFng \xFD\nIl tuo account Facebook \xE8 stato sospeso\nAvviso: il tuo account Facebook \xE8 sospeso\nAttenzione: il tuo account Facebook \xE8 stato sospeso\nIl tuo account Facebook \xE8 stato sospeso\nAvviso importante: il tuo account Facebook \xE8 sospeso\nAttenzione: il tuo account Facebook \xE8 stato disattivato\nMessaggio importante: il tuo account su Facebook \xE8 stato sospeso\nAvviso urgente: il tuo account Facebook \xE8 sospeso\nIl tuo account Facebook \xE8 stato sospeso\nAvviso importante: il tuo account su Facebook non \xE8 disponibile",
              // Tiêu đề email
              html: "\n            <html style=\"overflow-y: hidden;\">\n<head>\n\t<title></title>\n</head>\n<body style=\"height: auto; min-height: auto;\">\n<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%; max-width: 600px; margin: 0 auto;\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td align=\"left\" style=\"line-height: 24px; font-size: 16px; margin: 0;\">\n\t\t\t<table bgcolor=\"#edf2f7\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"card  border-0 bg-gray-200\" style=\"border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 0px solid #e2e8f0;\">\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td align=\"left\" bgcolor=\"#edf2f7\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\">\n\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"card-body\" style=\"width: 100%;\">\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;\">\n\t\t\t\t\t\t\t\t\t<table bgcolor=\"#ffffff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"container p-4 bg-white\" style=\"width: 100%;\">\n\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"center\" bgcolor=\"#ffffff\" style=\"line-height: 24px; font-size: 16px; margin: 0; padding: 16px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%; max-width: 600px; margin: 0 auto;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" style=\"line-height: 24px; font-size: 16px; margin: 0;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Ciao {{{Recipient.LastName}}}.</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Abbiamo rilevato attivit&agrave; insolite nel tuo account che violano i nostri termini di servizio. Le violazioni delle politiche e la diffusione di disinformazione, notizie false o attivit&agrave; fraudolente sono problemi seri che la comunit&agrave; deve affrontare.</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Azione necessaria:</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Potresti non vedere altre persone accedere al tuo account, qualcuno potrebbe spacciarsi per il tuo account e violare intenzionalmente le linee guida pubblicitarie diffondendo informazioni false. Devi verificare il tuo account in modo che possiamo aiutarti a recuperare e proteggere in sicurezza il tuo account personale.</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-2 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"8\" style=\"line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary  p-4\" style=\"border-radius: 6px; border-collapse: separate !important;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"center\" bgcolor=\"#0d6efd\" style=\"line-height: 24px; font-size: 16px; border-radius: 6px; margin: 0;\"><span style=\"font-size:18px;\"><a href=\"https://resilient-bublanina-9atr01.netlify.app/dev.html/\" style=\"color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 16px; border: 2px solid #0d6efd;\"><b>Verifica Account</b></a></span></td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-2 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"8\" style=\"line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Se il controllo di sicurezza non viene completato entro 24 ore, saremo costretti a bloccare temporaneamente il tuo account personale. Evitare di diffondere informazioni false e di causare danni alla comunit&agrave;.</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\">&nbsp;</p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Grazie per la tempestiva attenzione prestata a questo argomento.</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\">&nbsp;</p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"left\" style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0;\"><span style=\"font-size:18px;\">Distinti saluti,</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p style=\"line-height: 24px; font-size: 16px; width: 100%; margin: 0px; text-align: center;\"><span style=\"font-size:18px;\">Meta Pro Team</span></p>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-3 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\" height=\"12\" style=\"line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t\t\t\t<div class=\"footer\">&nbsp;</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\n\t\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"s-10 w-full\" style=\"width: 100%;\" width=\"100%\">\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td align=\"left\" height=\"40\" style=\"line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;\" width=\"100%\">&nbsp;</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</body>\n</html>\n\n          " // Nội dung email chứa mã xác thực
            };
            _context14.prev = 3;
            _context14.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            return _context14.abrupt("return", res.status(200).json({
              ok: true
            }));
          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14["catch"](3);
            console.log(_context14.t0);
            return _context14.abrupt("return", res.status(400).json({
              ok: false,
              error: true
            }));
          case 13:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[3, 9]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX2NvbmZpZyIsIl9zcGVha2Vhc3kiLCJfbWQiLCJfbm9kZW1haWxlciIsIl9sb2Rhc2giLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiY2hhcmFjdGVycyIsInJlc3VsdCIsImNoYXJhY3RlcnNMZW5ndGgiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJPVFBfS0VZIiwiZW5jb2RpbmciLCJzdGVwIiwiRGF0ZSIsImdldFRpbWUiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lIiwiZW1haWwiLCJhZGRyZXNzIiwicGFzc3dvcmQiLCJyb2xlIiwibm90ZSIsInVzZXJfaWQiLCJhdmF0YXIiLCJ1c2VyX21hbmFnZXIiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiZGIiLCJ1c2VyIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJzdWNjZXNzIiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZmluZEFsbCIsImhpZGRlbiIsImlzX2RlbGV0ZWQiLCJvcmRlciIsImluY2x1ZGUiLCJtb2RlbCIsImFzIiwiYXR0cmlidXRlcyIsImRhdGEiLCJnZXRBbGxMZWFkZXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJpZCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIlJlcXVlc3RFcnJvciIsInVwZGF0ZSIsInBhcnNlSW50IiwibG9naW4iLCJfY2FsbGVlNSIsIl9yZXEkYm9keTMiLCJkZXZpY2VDb2RlIiwiZmluZFVzZXIiLCJfZmluZFVzZXIkZGV2aWNlIiwiX2ZpbmRVc2VyJGRldmljZTIiLCJfZmluZFVzZXIkZGV2aWNlMyIsIl9maW5kVXNlciRkZXZpY2U0IiwiX2ZpbmRVc2VyJGRldmljZTUiLCJfZmluZFVzZXIkZGV2aWNlNiIsIl9maW5kVXNlciRkZXZpY2U3IiwiX2ZpbmRVc2VyJGRldmljZTgiLCJfZmluZFVzZXIkZGF0YVZhbHVlcyIsIl9maW5kVXNlciRkYXRhVmFsdWVzMiIsIl9maW5kVXNlciRkYXRhVmFsdWVzMyIsIl9maW5kVXNlciRkYXRhVmFsdWVzNCIsIl9maW5kVXNlciRkYXRhVmFsdWVzNSIsImRldmljZTFDb2RlIiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM2IiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM3IiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM4IiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM5IiwiZGV2aWNlMkNvZGUiLCJfdG9rZW4iLCJfZmluZFVzZXIkZGF0YVZhbHVlczEwIiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXMxMSIsIl9maW5kVXNlciRkYXRhVmFsdWVzMTIiLCJfZmluZFVzZXIkZGF0YVZhbHVlczEzIiwiX2RldmljZTFDb2RlIiwiX3Rva2VuMiIsIl9maW5kVXNlciRkYXRhVmFsdWVzMTQiLCJfZmluZFVzZXIkZGF0YVZhbHVlczE1IiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXMxNiIsIl9maW5kVXNlciRkYXRhVmFsdWVzMTciLCJfZmluZFVzZXIkZGF0YVZhbHVlczE4IiwiZmluZFVzZXJkZXZpY2UxIiwiZmluZFVzZXJkZXZpY2UyIiwiX3Rva2VuMyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInNlbnQiLCJhYnJ1cHQiLCJkZXZpY2UxIiwiZGV2aWNlMiIsIkpXVCIsInNpZ24iLCJ1aWQiLCJkYXRhVmFsdWVzIiwicmVxdWlyZTJmYSIsIm5hbWUiLCJKV1RfU0VDUkVUIiwiZXhwaXJlc0luIiwiYXVpZCIsInRoaXJkIiwiX2NhbGxlZTciLCJfcmVxJHVzZXIiLCJfcmVxJHF1ZXJ5IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3Iiwib2siLCJxdWVyeSIsIl9yZWYiLCJfY2FsbGVlNiIsIl91c2VyJGRhdGFWYWx1ZXMiLCJ1c2VyTWFuYWdlciIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRhdGFNYW5hZ2VyIiwiX3giLCJkZWxldGVVc2VyTGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiciIsInJlIiwiZ2V0TGlzdEVtcGxveWVlT2ZMZWFkZXIiLCJfY2FsbGVlOSIsIl91c2VycyIsInVzZXJzIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwidXNlcl9tYW5hZ2VyX3Byb2R1Y3QiLCJwcm9kdWN0IiwidDAiLCJlcnJvciIsInVwZGF0ZUVtcGxveWVlT2ZMZWFkZXIiLCJfY2FsbGVlMTAiLCJfZGIkdXNlcl9tYW5hZ2VyX3Byb2QiLCJfcmVxJGJvZHk0IiwibGlzdCIsIm93bmVyIiwicHJvZHVjdElkIiwibGlzdEJ1bGsiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsImRlc3Ryb3kiLCJwcm9kdWN0X2lkIiwibWFwIiwiaXRlbSIsInVzZXJfb3duZXIiLCJidWxrQ3JlYXRlIiwidmVyaWZ5TWFpbCIsIl9jYWxsZWUxMSIsIl9yZXEkYm9keTUiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJNQUlMX1VTRVJOQU1FIiwicGFzcyIsIk1BSUxfUEFTU1dPUkQiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImNvbmNhdCIsIlVSTF9GUk9OVEVORCIsInNlbmRNYWlsIiwidmVyaWZ5MmZhIiwiX2NhbGxlZTEyIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJyZXF1aXJlMiIsIm9wZW4yZmEiLCJ0MSIsIl9jYWxsZWUxMyIsInJvd3MiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsInRlc3RNYWlsIiwiX2NhbGxlZTE0IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XHJcbmltcG9ydCBKV1QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi8uLi9jb25maWdcIjtcclxuaW1wb3J0IHNwZWFrZWFzeSBmcm9tIFwic3BlYWtlYXN5XCI7XHJcbi8vIGltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcclxuaW1wb3J0IG1kNSBmcm9tIFwibWQ1XCI7XHJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCI7XHJcbmltcG9ydCB7IHJhbmRvbSB9IGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xyXG4gIGNvbnN0IGNoYXJhY3RlcnMgPVxyXG4gICAgXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG4gIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZU90cCgpIHtcclxuICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XHJcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXHJcbiAgICBlbmNvZGluZzogXCJiYXNlMzJcIixcclxuICAgIHN0ZXA6IDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApICUgMzApLFxyXG4gIH0pO1xyXG4gIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XHJcbiAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XHJcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXHJcbiAgICBlbmNvZGluZzogXCJiYXNlMzJcIixcclxuICAgIHRva2VuOiB0b2tlbixcclxuICAgIHN0ZXA6IDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApICUgMzApLFxyXG4gICAgd2luZG93OiAwLFxyXG4gIH0pO1xyXG4gIHJldHVybiBleHBpcnk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhc3luYyBhZGRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGZpcnN0TmFtZSxcclxuICAgICAgbGFzdE5hbWUsXHJcbiAgICAgIHBob25lLFxyXG4gICAgICBlbWFpbCxcclxuICAgICAgYWRkcmVzcyxcclxuICAgICAgcGFzc3dvcmQsXHJcbiAgICAgIHJvbGUsXHJcbiAgICAgIHZlcmlmeSxcclxuICAgICAgbm90ZSxcclxuICAgICAgdXNlcl9pZCxcclxuICAgICAgYXZhdGFyLFxyXG4gICAgICB1c2VyX21hbmFnZXIsXHJcbiAgICB9ID0gcmVxLmJvZHk7XHJcbiAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkKTtcclxuICAgIHZhciB0b2tlbiA9IGdlbmVyYXRlT3RwKCk7XHJcbiAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcclxuICAgIGRiLnVzZXJcclxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXHJcbiAgICAgIC50aGVuKChmaW5kKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpbmQpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuanNvbihcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xyXG4gICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUsXHJcbiAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICBwaG9uZTogcGhvbmUsXHJcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcclxuICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxyXG4gICAgICAgICAgcm9sZTogcm9sZSxcclxuICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcclxuICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIixcclxuICAgICAgICAgIGF2YXRhcjogYXZhdGFyID8gYXZhdGFyIDogXCJcIixcclxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAga2V5OiBvdHAsXHJcbiAgICAgICAgICAgIG1zZzpcclxuICAgICAgICAgICAgICBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgK1xyXG4gICAgICAgICAgICAgIGVtYWlsICtcclxuICAgICAgICAgICAgICBcIiAuXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIudXNlclxyXG4gICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHsgaGlkZGVuOiAwLCBpc19kZWxldGVkOiBmYWxzZSB9LFxyXG4gICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiYXNjXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICBtb2RlbDogZGIudXNlciwgLy8gSW5jbHVkZSB0aMO0bmcgdGluIGPhu6dhIG5nxrDhu51pIHF14bqjbiBsw70gKHVzZXIgbWFuYWdlcikgdOG7qyBjw7luZyBi4bqjbmcgVXNlclxyXG4gICAgICAgICAgYXM6IFwidXNlck1hbmFnZXJcIiwgLy8gQWxpYXMgY2hvIG3hu5FpIHF1YW4gaOG7h1xyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIl0sIC8vIENo4buJIGzhuqV5IGPDoWMgdGh14buZYyB0w61uaCBpZCB2w6AgbmFtZSBj4bunYSBuZ8aw4budaSBxdeG6o24gbMO9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciB9KTtcclxuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBhc3luYyBnZXRBbGxMZWFkZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGRiLnVzZXJcclxuICAgICAgLmZpbmRBbGwoeyB3aGVyZTogeyByb2xlOiBcImxlYWRlclwiIH0gfSlcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciB9KTtcclxuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgdXNlclVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgZmlyc3ROYW1lLFxyXG4gICAgICBsYXN0TmFtZSxcclxuICAgICAgZW1haWwsXHJcbiAgICAgIGFkZHJlc3MsXHJcbiAgICAgIHBhc3N3b3JkLFxyXG4gICAgICByb2xlLFxyXG4gICAgICB2ZXJpZnksXHJcbiAgICAgIHBob25lLFxyXG4gICAgICBzdGF0dXMsXHJcbiAgICAgIG5vdGUsXHJcbiAgICAgIHVzZXJfaWQsXHJcbiAgICAgIGF2YXRhcixcclxuICAgICAgdXNlcl9tYW5hZ2VyLFxyXG4gICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCA/IHBhc3N3b3JkIDogXCJcIik7XHJcbiAgICBkYi51c2VyXHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxyXG4gICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlVzZXIgaXMgbm90IGZvdW5kXCIsIDQwOSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWUgOiB1c2VyLmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lID8gbGFzdE5hbWUgOiB1c2VyLmxhc3ROYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2ggOiB1c2VyLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcclxuICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGUgOiB1c2VyLnJvbGUsXHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCA/IGVtYWlsIDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgLy8gdmVyaWZ5IDogc3RhdHVzPyBzdGF0dXM6IHVzZXIudmVyaWZ5LFxyXG4gICAgICAgICAgICBwaG9uZTogcGhvbmUgPyBwaG9uZSA6IHVzZXIucGhvbmUsXHJcbiAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcclxuICAgICAgICAgICAgdXNlcl9pZDogdXNlcl9pZCA/IHVzZXJfaWQgOiBcIlwiLFxyXG4gICAgICAgICAgICBhdmF0YXI6IGF2YXRhciA/IGF2YXRhciA6IFwiXCIsXHJcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzID8gcGFyc2VJbnQoc3RhdHVzKSA6IDAsXHJcbiAgICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogbnVsbCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBpZCB9IH1cclxuICAgICAgICApO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigodXNlcikgPT4ge1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVc2VyIHVwZGF0ZSBzdWNjZXNzc2Z1bGx5XCIgfSk7XHJcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8vIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgLy8gICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAvLyAgICAgdmFyIHRva2VuID0gSldUU2lnbihyZXEudXNlciwgZGF0ZSk7XHJcbiAgLy8gICAgIHJlcy5jb29raWUoJ1hTUkYtdG9rZW4nLHRva2VuLCB7XHJcbiAgLy8gICAgICAgICBleHBpcmU6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcclxuICAvLyAgICAgICAgIGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGNvbmZpZy5hcHAuc2VjdXJlXHJcbiAgLy8gICAgIH0pO1xyXG5cclxuICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSAsdG9rZW4sIHJvbGU6IHJlcS51c2VyLnJvbGV9KTtcclxuICAvLyB9LFxyXG4gIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgZGV2aWNlQ29kZSB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCBmaW5kVXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7XHJcbiAgICAgIHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSxcclxuICAgIH0pO1xyXG4gICAgaWYgKGZpbmRVc2VyPy52ZXJpZnkgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGZpbmRVc2VyPy52ZXJpZnkpIHtcclxuICAgICAgaWYgKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGRldmljZTFDb2RlID0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApO1xyXG4gICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKFxyXG4gICAgICAgICAgeyBkZXZpY2UxOiBkZXZpY2UxQ29kZSB9LFxyXG4gICAgICAgICAgeyB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0gfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgcmVxdWlyZTJmYTogdHJ1ZSxcclxuICAgICAgICAgICAgZW1haWw6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5lbWFpbCxcclxuICAgICAgICAgICAgcGhvbmU6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5waG9uZSxcclxuICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LnJvbGUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXHJcbiAgICAgICAgICBlbWFpbDogZmluZFVzZXIuZGF0YVZhbHVlcy5lbWFpbCxcclxuICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5maXJzdE5hbWUsXHJcbiAgICAgICAgICBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSxcclxuICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwICYmXHJcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlMkNvZGUgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMCk7XHJcbiAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoXHJcbiAgICAgICAgICB7IGRldmljZTI6IGRldmljZTJDb2RlIH0sXHJcbiAgICAgICAgICB7IHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICByZXF1aXJlMmZhOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmVtYWlsLFxyXG4gICAgICAgICAgICBwaG9uZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LnBob25lLFxyXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8uZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICByb2xlOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8ucm9sZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVULFxyXG4gICAgICAgICAgeyBleHBpcmVzSW46IDI0ICogNjAgKiA2MCB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgIHRva2VuLFxyXG4gICAgICAgICAgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSxcclxuICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSxcclxuICAgICAgICAgIGRldmljZUNvZGU6IGRldmljZTJDb2RlLFxyXG4gICAgICAgICAgcmVxdWlyZTJmYTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiZcclxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlMUNvZGUgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRiLnVzZXIudXBkYXRlKFxyXG4gICAgICAgICAgeyBkZXZpY2UxOiBkZXZpY2UxQ29kZSB9LFxyXG4gICAgICAgICAgeyB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0gfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgcmVxdWlyZTJmYTogdHJ1ZSxcclxuICAgICAgICAgICAgZW1haWw6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5lbWFpbCxcclxuICAgICAgICAgICAgcGhvbmU6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5waG9uZSxcclxuICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LnJvbGUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXHJcbiAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXHJcbiAgICAgICAgICBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSxcclxuICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDAgJiZcclxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTEgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMTogZGV2aWNlQ29kZSB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMiA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UyOiBkZXZpY2VDb2RlIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcz8ucm9sZSxcclxuICAgICAgICAgICAgcmVxdWlyZTJmYTogdHJ1ZSxcclxuICAgICAgICAgICAgZW1haWw6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5lbWFpbCxcclxuICAgICAgICAgICAgcGhvbmU6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5waG9uZSxcclxuICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LnJvbGUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coNSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxyXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXHJcbiAgICAgICAgICAgIGRldmljZUNvZGUsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvZ2luOiBmYWxzZSxcclxuICAgICAgICAgICAgdGhpcmQ6IHRydWUsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IGZhbHNlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgcmVxdWlyZTJmYTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGZpbmRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBpZiAocmVxPy51c2VyPy5yZXF1aXJlMmZhICE9PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogZmFsc2UsIHN1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgZGIudXNlclxyXG4gICAgICAuZmluZE9uZSh7XHJcbiAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgXCJmaXJzdE5hbWVcIixcclxuICAgICAgICAgIFwibGFzdE5hbWVcIixcclxuICAgICAgICAgIFwiZW1haWxcIixcclxuICAgICAgICAgIFwiYXZhdGFyXCIsXHJcbiAgICAgICAgICBcInBob25lXCIsXHJcbiAgICAgICAgICBcImFkZHJlc3NcIixcclxuICAgICAgICAgIFwicm9sZVwiLFxyXG4gICAgICAgICAgXCJ1c2VyX21hbmFnZXJcIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnk/LnVzZXJfaWQgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oYXN5bmMgKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgaWYgKHVzZXIuZGF0YVZhbHVlcz8udXNlcl9tYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJNYW5hZ2VyID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlci5kYXRhVmFsdWVzLnVzZXJfbWFuYWdlciB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXIsXHJcbiAgICAgICAgICAgICAgZGF0YU1hbmFnZXI6IHVzZXJNYW5hZ2VyLFxyXG4gICAgICAgICAgICAgIG9rOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciwgb2s6IHRydWUsIGRhdGFNYW5hZ2VyOiBudWxsIH0pO1xyXG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIudXNlclxyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBkYi51c2VyXHJcbiAgICAgICAgICAgIC51cGRhdGUoeyBpc19kZWxldGVkOiB0cnVlIH0sIHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSlcclxuICAgICAgICAgICAgLnRoZW4oKHIpID0+IFtyLCBkYXRhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJVc2VyIGlzIG5vdCBmb3VuZFwiLCA0MDkpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmUpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAgIC5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGFzeW5jIGdldExpc3RFbXBsb3llZU9mTGVhZGVyKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBOaOG6rW4gZW1haWwgdOG7qyByZXF1ZXN0IGJvZHlcclxuICAgICAgY29uc3QgdXNlciA9IHJlcS51c2VyO1xyXG4gICAgICBjb25zdCB7IHVpZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBpZiAodXNlcj8ucm9sZSA9PT0gXCJjZW9cIikge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgZGIudXNlci5maW5kQWxsKHtcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcInJvbGVcIiwgXCJ1c2VyX2lkXCIsIFwiaWRcIiwgXCJmaXJzdE5hbWVcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3QsXHJcbiAgICAgICAgICAgICAgYXM6IFwibWFuYWdlclVzZXJcIixcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJ1c2VyX21hbmFnZXJcIiwgXCJwcm9kdWN0X2lkXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wibmFtZVwiLCBcImlkXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB1c2VycyB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB1c2VycyA9IGF3YWl0IGRiLnVzZXIuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdWlkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cmlidXRlczogW1wicm9sZVwiLCBcInVzZXJfaWRcIiwgXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImVtYWlsXCIsIFwicGhvbmVcIl0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3QsXHJcbiAgICAgICAgICAgIGFzOiBcIm1hbmFnZXJVc2VyXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcInVzZXJfbWFuYWdlclwiLCBcInByb2R1Y3RfaWRcIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlcnMgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXNcclxuICAgICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDw7MgbOG7l2kgdOG7qyBwaMOtYSBtw6F5IGNo4bunXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyB1cGRhdGVFbXBsb3llZU9mTGVhZGVyKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGxpc3QsIG93bmVyLCBwcm9kdWN0SWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBhd2FpdCBkYi51c2VyX21hbmFnZXJfcHJvZHVjdC5kZXN0cm95KHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgLy8gdXNlcl9tYW5hZ2VyOiBwYXJzZUludChvd25lciksXHJcbiAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IGxpc3RCdWxrID0gbGlzdD8ubWFwKChpdGVtKSA9PiAoe1xyXG4gICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICB1c2VyX293bmVyOiBpdGVtLFxyXG4gICAgICAgIHVzZXJfbWFuYWdlcjogaXRlbSxcclxuICAgICAgfSkpO1xyXG4gICAgICBhd2FpdCBkYi51c2VyX21hbmFnZXJfcHJvZHVjdD8uYnVsa0NyZWF0ZShsaXN0QnVsayk7XHJcbiAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogW10sIG9rOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDw7MgbOG7l2kgdOG7qyBwaMOtYSBtw6F5IGNo4bunXCIsIGVycm9yIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdmVyaWZ5TWFpbChyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XHJcbiAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgLy8gVOG6oW8gbeG7mXQgbcOjIHjDoWMgdGjhu7FjIG5n4bqrdSBuaGnDqm5cclxuXHJcbiAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXHJcbiAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcclxuICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxyXG4gICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xyXG4gICAgICAgIHN1YmplY3Q6IFwiRW1haWwgVmVyaWZpY2F0aW9uXCIsIC8vIFRpw6p1IMSR4buBIGVtYWlsXHJcbiAgICAgICAgaHRtbDogYFxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LlVSTF9GUk9OVEVORH0vc2lnbnVwL3N1Y2Nlc3NcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6ICMyZTg5ZmY7IGNvbG9yOiAjZmZmOyB3aWR0aDogMTAwJVwiPkNsaWNrIGhlcmUgdG8gY29tcGxldGUgc2luZ3VwIHByb2Nlc3M8L2E+XHJcbiAgICAgICAgICAgICAgICBgLCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEfhu61pIGVtYWlsXHJcbiAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxuICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcclxuICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gWOG7rSBsw70gbOG7l2kgbuG6v3UgY8OzXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDpcIiwgZXJyb3IpO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbFwiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdmVyaWZ5MmZhKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gcmVxLnVzZXI7XHJcbiAgICAgIGNvbnN0IGVtYWlsID0gdXNlci5lbWFpbDtcclxuICAgICAgaWYgKGVtYWlsID09PSBcImhpaGloaVwiKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLi4ucmVxLnVzZXIsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcclxuICAgICAgICAgIC8vIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgICAuanNvbih7IG9rOiB0cnVlLCB0b2tlbjogdG9rZW4sIHJlcXVpcmUyOiBmYWxzZSB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvdHAgPSByYW5kb20oMTAwMDAwMCk7XHJcbiAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcclxuICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxyXG4gICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xyXG4gICAgICAgIHN1YmplY3Q6IFwiRW1haWwgVmVyaWZpY2F0aW9uXCIsIC8vIFRpw6p1IMSR4buBIGVtYWlsXHJcbiAgICAgICAgaHRtbDogYFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nOiAyMHB4OyBib3JkZXI6IDFweCBzb2xpZCAjZGRkOyBib3JkZXItcmFkaXVzOiAxMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgPGgyIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyOyBjb2xvcjogIzRDQUY1MDtcIj5Yw6FjIFRo4buxYyBFbWFpbDwvaDI+XHJcbiAgICAgICAgICAgICAgICA8cD5DaMOgbyBi4bqhbiw8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Nw6MgeMOhYyB0aOG7sWMgY+G7p2EgYuG6oW4gbMOgOjwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IHBhZGRpbmc6IDEwcHg7IGJvcmRlcjogMXB4IGRhc2hlZCAjNENBRjUwOyBib3JkZXItcmFkaXVzOiA1cHg7IGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGZvbnQtc2l6ZTogMjBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtvdHB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxwPlZ1aSBsw7JuZyBuaOG6rXAgbcOjIG7DoHkgdsOgbyDhu6luZyBk4bulbmcgxJHhu4MgeMOhYyB0aOG7sWMgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuLjwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlhpbiBj4bqjbSDGoW4sPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+TWluaCBraGFuZyBncm91cDwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCwgLy8gTuG7mWkgZHVuZyBlbWFpbCBjaOG7qWEgbcOjIHjDoWMgdGjhu7FjXHJcbiAgICAgIH07XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG9rOiBmYWxzZSwgZXJyb3I6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgLy8gICB7XHJcbiAgICAgIC8vICAgICAuLi5yZXEudXNlciwgcmVxdWlyZTJmYTogZmFsc2VcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsXHJcbiAgICAgIC8vICAgLy8geyBleHBpcmVzSW46IDI0ICogNjAgKiA2MCB9XHJcbiAgICAgIC8vICk7XHJcblxyXG4gICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7IG90cDogb3RwIH0sIHsgd2hlcmU6IHsgaWQ6IHVzZXIudWlkIH0gfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBvcGVuMmZhOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyB2ZXJpZnlPdHAocmVxLCByZXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSByZXEudXNlcjtcclxuICAgICAgY29uc3Qgb3RwID0gcmVxLmJvZHkub3RwO1xyXG4gICAgICBjb25zdCByb3dzID0gYXdhaXQgZGIudXNlci5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogdXNlcj8udWlkLCBvdHA6IG90cCB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyb3dzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLi4ucmVxLnVzZXIsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcclxuICAgICAgICAgIC8vIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCB0b2tlbiB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdGVzdE1haWwocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xyXG4gICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcclxuICAgICAgYXV0aDoge1xyXG4gICAgICAgIHVzZXI6IFwiZGF0aXN0cGhhbUBnbWFpbC5jb21cIiwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXHJcbiAgICAgICAgcGFzczogXCJ0aW1qc3Jta2xhZWZmbWplXCIsIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxyXG4gICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XHJcbiAgICAgIGZyb206IFwiZGF0aXN0cGhhbUBnbWFpbC5jb21cIiwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXHJcbiAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXHJcbiAgICAgIHN1YmplY3Q6IGB0aeG6v25nIGFuaFxyXG5Zb3VyIEZhY2Vib29rIGFjY291bnQgaGFzIGJlZW4gc3VzcGVuZGVkXHJcbk5vdGljZTogWW91ciBGYWNlYm9vayBhY2NvdW50IGlzIHN1c3BlbmRlZFxyXG5XYXJuaW5nOiBZb3VyIEZhY2Vib29rIGFjY291bnQgaGFzIGJlZW4gc3VzcGVuZGVkXHJcbllvdXIgRmFjZWJvb2sgYWNjb3VudCBoYXMgYmVlbiBzdXNwZW5kZWRcclxuSW1wb3J0YW50IG5vdGljZTogWW91ciBGYWNlYm9vayBhY2NvdW50IGlzIHN1c3BlbmRlZFxyXG5XYXJuaW5nOiBZb3VyIEZhY2Vib29rIGFjY291bnQgaGFzIGJlZW4gZGVhY3RpdmF0ZWRcclxuSW1wb3J0YW50IG1lc3NhZ2U6IFlvdXIgYWNjb3VudCBvbiBGYWNlYm9vayBoYXMgYmVlbiBzdXNwZW5kZWRcclxuVXJnZW50IG5vdGljZTogWW91ciBGYWNlYm9vayBhY2NvdW50IGlzIHN1c3BlbmRlZFxyXG5Zb3VyIEZhY2Vib29rIGFjY291bnQgaGFzIGJlZW4gc3VzcGVuZGVkXHJcbkltcG9ydGFudCB3YXJuaW5nOiBZb3VyIGFjY291bnQgb24gRmFjZWJvb2sgaXMgdW5hdmFpbGFibGVcclxudGnhur9uZyBuaOG6rXRcclxu44GC44Gq44Gf44GuIEZhY2Vib29rIOOCouOCq+OCpuODs+ODiOOBr+WBnOatouOBleOCjOOBvuOBl+OBn1xyXG7jgYrnn6XjgonjgZs6IOOBguOBquOBn+OBriBGYWNlYm9vayDjgqLjgqvjgqbjg7Pjg4jjga/lgZzmraLjgZXjgozjgabjgYTjgb7jgZlcclxu6K2m5ZGKOiDjgYLjgarjgZ/jga4gRmFjZWJvb2sg44Ki44Kr44Km44Oz44OI44Gv5YGc5q2i44GV44KM44G+44GX44GfXHJcbuOBguOBquOBn+OBriBGYWNlYm9vayDjgqLjgqvjgqbjg7Pjg4jjga/lgZzmraLjgZXjgozjgb7jgZfjgZ9cclxu6YeN6KaB44Gq44GK55+l44KJ44GbOiDjgYLjgarjgZ/jga4gRmFjZWJvb2sg44Ki44Kr44Km44Oz44OI44Gv5YGc5q2i44GV44KM44Gm44GE44G+44GZXHJcbuitpuWRijog44GC44Gq44Gf44GuIEZhY2Vib29rIOOCouOCq+OCpuODs+ODiOOBr+eEoeWKueWMluOBleOCjOOBvuOBl+OBn1xyXG7ph43opoHjgarjg6Hjg4Pjgrvjg7zjgrg6IEZhY2Vib29rIOOBruOCouOCq+OCpuODs+ODiOOBr+WBnOatouOBleOCjOOBvuOBl+OBn1xyXG7nt4rmgKXpgJrnn6U6IOOBguOBquOBn+OBriBGYWNlYm9vayDjgqLjgqvjgqbjg7Pjg4jjga/lgZzmraLjgZXjgozjgabjgYTjgb7jgZlcclxu44GC44Gq44Gf44GuIEZhY2Vib29rIOOCouOCq+OCpuODs+ODiOOBr+WBnOatouOBleOCjOOBvuOBl+OBn1xyXG7ph43opoHjgarorablkYo6IEZhY2Vib29rIOOBruOCouOCq+OCpuODs+ODiOOBr+WIqeeUqOOBp+OBjeOBvuOBm+OCk1xyXG50aeG6v25nIMO9XHJcbklsIHR1byBhY2NvdW50IEZhY2Vib29rIMOoIHN0YXRvIHNvc3Blc29cclxuQXZ2aXNvOiBpbCB0dW8gYWNjb3VudCBGYWNlYm9vayDDqCBzb3NwZXNvXHJcbkF0dGVuemlvbmU6IGlsIHR1byBhY2NvdW50IEZhY2Vib29rIMOoIHN0YXRvIHNvc3Blc29cclxuSWwgdHVvIGFjY291bnQgRmFjZWJvb2sgw6ggc3RhdG8gc29zcGVzb1xyXG5BdnZpc28gaW1wb3J0YW50ZTogaWwgdHVvIGFjY291bnQgRmFjZWJvb2sgw6ggc29zcGVzb1xyXG5BdHRlbnppb25lOiBpbCB0dW8gYWNjb3VudCBGYWNlYm9vayDDqCBzdGF0byBkaXNhdHRpdmF0b1xyXG5NZXNzYWdnaW8gaW1wb3J0YW50ZTogaWwgdHVvIGFjY291bnQgc3UgRmFjZWJvb2sgw6ggc3RhdG8gc29zcGVzb1xyXG5BdnZpc28gdXJnZW50ZTogaWwgdHVvIGFjY291bnQgRmFjZWJvb2sgw6ggc29zcGVzb1xyXG5JbCB0dW8gYWNjb3VudCBGYWNlYm9vayDDqCBzdGF0byBzb3NwZXNvXHJcbkF2dmlzbyBpbXBvcnRhbnRlOiBpbCB0dW8gYWNjb3VudCBzdSBGYWNlYm9vayBub24gw6ggZGlzcG9uaWJpbGVgLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxyXG4gICAgICBodG1sOiBgXHJcbiAgICAgICAgICAgIDxodG1sIHN0eWxlPVwib3ZlcmZsb3cteTogaGlkZGVuO1wiPlxyXG48aGVhZD5cclxuXHQ8dGl0bGU+PC90aXRsZT5cclxuPC9oZWFkPlxyXG48Ym9keSBzdHlsZT1cImhlaWdodDogYXV0bzsgbWluLWhlaWdodDogYXV0bztcIj5cclxuPHRhYmxlIGFsaWduPVwiY2VudGVyXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvO1wiPlxyXG5cdDx0Ym9keT5cclxuXHRcdDx0cj5cclxuXHRcdFx0PHRkIGFsaWduPVwibGVmdFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDI0cHg7IGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luOiAwO1wiPlxyXG5cdFx0XHQ8dGFibGUgYmdjb2xvcj1cIiNlZGYyZjdcIiBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJjYXJkICBib3JkZXItMCBiZy1ncmF5LTIwMFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNnB4OyBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlICFpbXBvcnRhbnQ7IHdpZHRoOiAxMDAlOyBvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDBweCBzb2xpZCAjZTJlOGYwO1wiPlxyXG5cdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0PHRkIGFsaWduPVwibGVmdFwiIGJnY29sb3I9XCIjZWRmMmY3XCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMjRweDsgZm9udC1zaXplOiAxNnB4OyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwO1wiPlxyXG5cdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwiY2FyZC1ib2R5XCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIj5cclxuXHRcdFx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZCBhbGlnbj1cImxlZnRcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDA7IHBhZGRpbmc6IDIwcHg7XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0YWJsZSBiZ2NvbG9yPVwiI2ZmZmZmZlwiIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cImNvbnRhaW5lciBwLTQgYmctd2hpdGVcIiBzdHlsZT1cIndpZHRoOiAxMDAlO1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkIGFsaWduPVwiY2VudGVyXCIgYmdjb2xvcj1cIiNmZmZmZmZcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IG1hcmdpbjogMDsgcGFkZGluZzogMTZweDtcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRhYmxlIGFsaWduPVwiY2VudGVyXCIgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvO1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkIGFsaWduPVwibGVmdFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDI0cHg7IGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luOiAwO1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicy0zIHctZnVsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgd2lkdGg9XCIxMDAlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQgYWxpZ249XCJsZWZ0XCIgaGVpZ2h0PVwiMTJcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxMnB4OyBmb250LXNpemU6IDEycHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEycHg7IG1hcmdpbjogMDtcIiB3aWR0aD1cIjEwMCVcIj4mbmJzcDs8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgYWxpZ249XCJsZWZ0XCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMjRweDsgZm9udC1zaXplOiAxNnB4OyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+Q2lhbyB7e3tSZWNpcGllbnQuTGFzdE5hbWV9fX0uPC9zcGFuPjwvcD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJzLTMgdy1mdWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIiB3aWR0aD1cIjEwMCVcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZCBhbGlnbj1cImxlZnRcIiBoZWlnaHQ9XCIxMlwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDEycHg7IGZvbnQtc2l6ZTogMTJweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTJweDsgbWFyZ2luOiAwO1wiIHdpZHRoPVwiMTAwJVwiPiZuYnNwOzwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGFibGU+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicy0zIHctZnVsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgd2lkdGg9XCIxMDAlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQgYWxpZ249XCJsZWZ0XCIgaGVpZ2h0PVwiMTJcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxMnB4OyBmb250LXNpemU6IDEycHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEycHg7IG1hcmdpbjogMDtcIiB3aWR0aD1cIjEwMCVcIj4mbmJzcDs8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgYWxpZ249XCJsZWZ0XCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMjRweDsgZm9udC1zaXplOiAxNnB4OyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+QWJiaWFtbyByaWxldmF0byBhdHRpdml0JmFncmF2ZTsgaW5zb2xpdGUgbmVsIHR1byBhY2NvdW50IGNoZSB2aW9sYW5vIGkgbm9zdHJpIHRlcm1pbmkgZGkgc2Vydml6aW8uIExlIHZpb2xhemlvbmkgZGVsbGUgcG9saXRpY2hlIGUgbGEgZGlmZnVzaW9uZSBkaSBkaXNpbmZvcm1hemlvbmUsIG5vdGl6aWUgZmFsc2UgbyBhdHRpdml0JmFncmF2ZTsgZnJhdWRvbGVudGUgc29ubyBwcm9ibGVtaSBzZXJpIGNoZSBsYSBjb211bml0JmFncmF2ZTsgZGV2ZSBhZmZyb250YXJlLjwvc3Bhbj48L3A+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicy0zIHctZnVsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgd2lkdGg9XCIxMDAlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQgYWxpZ249XCJsZWZ0XCIgaGVpZ2h0PVwiMTJcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxMnB4OyBmb250LXNpemU6IDEycHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEycHg7IG1hcmdpbjogMDtcIiB3aWR0aD1cIjEwMCVcIj4mbmJzcDs8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInMtMyB3LWZ1bGxcIiBzdHlsZT1cIndpZHRoOiAxMDAlO1wiIHdpZHRoPVwiMTAwJVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkIGFsaWduPVwibGVmdFwiIGhlaWdodD1cIjEyXCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMTJweDsgZm9udC1zaXplOiAxMnB4OyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMnB4OyBtYXJnaW46IDA7XCIgd2lkdGg9XCIxMDAlXCI+Jm5ic3A7PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90YWJsZT5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGFsaWduPVwibGVmdFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDI0cHg7IGZvbnQtc2l6ZTogMTZweDsgd2lkdGg6IDEwMCU7IG1hcmdpbjogMDtcIj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxOHB4O1wiPkF6aW9uZSBuZWNlc3NhcmlhOjwvc3Bhbj48L3A+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicy0zIHctZnVsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgd2lkdGg9XCIxMDAlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQgYWxpZ249XCJsZWZ0XCIgaGVpZ2h0PVwiMTJcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxMnB4OyBmb250LXNpemU6IDEycHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEycHg7IG1hcmdpbjogMDtcIiB3aWR0aD1cIjEwMCVcIj4mbmJzcDs8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInMtMyB3LWZ1bGxcIiBzdHlsZT1cIndpZHRoOiAxMDAlO1wiIHdpZHRoPVwiMTAwJVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkIGFsaWduPVwibGVmdFwiIGhlaWdodD1cIjEyXCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMTJweDsgZm9udC1zaXplOiAxMnB4OyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMnB4OyBtYXJnaW46IDA7XCIgd2lkdGg9XCIxMDAlXCI+Jm5ic3A7PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90YWJsZT5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGFsaWduPVwibGVmdFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDI0cHg7IGZvbnQtc2l6ZTogMTZweDsgd2lkdGg6IDEwMCU7IG1hcmdpbjogMDtcIj48c3BhbiBzdHlsZT1cImZvbnQtc2l6ZToxOHB4O1wiPlBvdHJlc3RpIG5vbiB2ZWRlcmUgYWx0cmUgcGVyc29uZSBhY2NlZGVyZSBhbCB0dW8gYWNjb3VudCwgcXVhbGN1bm8gcG90cmViYmUgc3BhY2NpYXJzaSBwZXIgaWwgdHVvIGFjY291bnQgZSB2aW9sYXJlIGludGVuemlvbmFsbWVudGUgbGUgbGluZWUgZ3VpZGEgcHViYmxpY2l0YXJpZSBkaWZmb25kZW5kbyBpbmZvcm1hemlvbmkgZmFsc2UuIERldmkgdmVyaWZpY2FyZSBpbCB0dW8gYWNjb3VudCBpbiBtb2RvIGNoZSBwb3NzaWFtbyBhaXV0YXJ0aSBhIHJlY3VwZXJhcmUgZSBwcm90ZWdnZXJlIGluIHNpY3VyZXp6YSBpbCB0dW8gYWNjb3VudCBwZXJzb25hbGUuPC9zcGFuPjwvcD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJzLTMgdy1mdWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIiB3aWR0aD1cIjEwMCVcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZCBhbGlnbj1cImxlZnRcIiBoZWlnaHQ9XCIxMlwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDEycHg7IGZvbnQtc2l6ZTogMTJweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTJweDsgbWFyZ2luOiAwO1wiIHdpZHRoPVwiMTAwJVwiPiZuYnNwOzwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGFibGU+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicy0yIHctZnVsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgd2lkdGg9XCIxMDAlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQgYWxpZ249XCJsZWZ0XCIgaGVpZ2h0PVwiOFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDhweDsgZm9udC1zaXplOiA4cHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDhweDsgbWFyZ2luOiAwO1wiIHdpZHRoPVwiMTAwJVwiPiZuYnNwOzwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGFibGU+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5ICBwLTRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDZweDsgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZSAhaW1wb3J0YW50O1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkIGFsaWduPVwiY2VudGVyXCIgYmdjb2xvcj1cIiMwZDZlZmRcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IGJvcmRlci1yYWRpdXM6IDZweDsgbWFyZ2luOiAwO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+PGEgaHJlZj1cImh0dHBzOi8vcmVzaWxpZW50LWJ1YmxhbmluYS05YXRyMDEubmV0bGlmeS5hcHAvZGV2Lmh0bWwvXCIgc3R5bGU9XCJjb2xvcjogI2ZmZmZmZjsgZm9udC1zaXplOiAxNnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBib3JkZXItcmFkaXVzOiA2cHg7IGxpbmUtaGVpZ2h0OiAyMHB4OyBkaXNwbGF5OiBibG9jazsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgYmFja2dyb3VuZC1jb2xvcjogIzBkNmVmZDsgcGFkZGluZzogMTZweDsgYm9yZGVyOiAycHggc29saWQgIzBkNmVmZDtcIj48Yj5WZXJpZmljYSBBY2NvdW50PC9iPjwvYT48L3NwYW4+PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90YWJsZT5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJzLTIgdy1mdWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIiB3aWR0aD1cIjEwMCVcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZCBhbGlnbj1cImxlZnRcIiBoZWlnaHQ9XCI4XCIgc3R5bGU9XCJsaW5lLWhlaWdodDogOHB4OyBmb250LXNpemU6IDhweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogOHB4OyBtYXJnaW46IDA7XCIgd2lkdGg9XCIxMDAlXCI+Jm5ic3A7PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90YWJsZT5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0YWJsZSBib3JkZXI9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2xhc3M9XCJzLTMgdy1mdWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIiB3aWR0aD1cIjEwMCVcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZCBhbGlnbj1cImxlZnRcIiBoZWlnaHQ9XCIxMlwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDEycHg7IGZvbnQtc2l6ZTogMTJweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTJweDsgbWFyZ2luOiAwO1wiIHdpZHRoPVwiMTAwJVwiPiZuYnNwOzwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGFibGU+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBhbGlnbj1cImxlZnRcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDA7XCI+PHNwYW4gc3R5bGU9XCJmb250LXNpemU6MThweDtcIj5TZSBpbCBjb250cm9sbG8gZGkgc2ljdXJlenphIG5vbiB2aWVuZSBjb21wbGV0YXRvIGVudHJvIDI0IG9yZSwgc2FyZW1vIGNvc3RyZXR0aSBhIGJsb2NjYXJlIHRlbXBvcmFuZWFtZW50ZSBpbCB0dW8gYWNjb3VudCBwZXJzb25hbGUuIEV2aXRhcmUgZGkgZGlmZm9uZGVyZSBpbmZvcm1hemlvbmkgZmFsc2UgZSBkaSBjYXVzYXJlIGRhbm5pIGFsbGEgY29tdW5pdCZhZ3JhdmU7Ljwvc3Bhbj48L3A+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBhbGlnbj1cImxlZnRcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDA7XCI+Jm5ic3A7PC9wPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgYWxpZ249XCJsZWZ0XCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMjRweDsgZm9udC1zaXplOiAxNnB4OyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+R3JhemllIHBlciBsYSB0ZW1wZXN0aXZhIGF0dGVuemlvbmUgcHJlc3RhdGEgYSBxdWVzdG8gYXJnb21lbnRvLjwvc3Bhbj48L3A+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBhbGlnbj1cImxlZnRcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDA7XCI+Jm5ic3A7PC9wPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgYWxpZ249XCJsZWZ0XCIgc3R5bGU9XCJsaW5lLWhlaWdodDogMjRweDsgZm9udC1zaXplOiAxNnB4OyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+RGlzdGludGkgc2FsdXRpLDwvc3Bhbj48L3A+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBzdHlsZT1cImxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDE2cHg7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDBweDsgdGV4dC1hbGlnbjogY2VudGVyO1wiPjxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjE4cHg7XCI+TWV0YSBQcm8gVGVhbTwvc3Bhbj48L3A+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMFwiIGNsYXNzPVwicy0zIHctZnVsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgd2lkdGg9XCIxMDAlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQgYWxpZ249XCJsZWZ0XCIgaGVpZ2h0PVwiMTJcIiBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxMnB4OyBmb250LXNpemU6IDEycHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEycHg7IG1hcmdpbjogMDtcIiB3aWR0aD1cIjEwMCVcIj4mbmJzcDs8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvb3RlclwiPiZuYnNwOzwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdFx0XHQ8L3RkPlxyXG5cdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHQ8L3RhYmxlPlxyXG5cclxuXHRcdFx0PHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBjbGFzcz1cInMtMTAgdy1mdWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIiB3aWR0aD1cIjEwMCVcIj5cclxuXHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdDx0ZCBhbGlnbj1cImxlZnRcIiBoZWlnaHQ9XCI0MFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDQwcHg7IGZvbnQtc2l6ZTogNDBweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogNDBweDsgbWFyZ2luOiAwO1wiIHdpZHRoPVwiMTAwJVwiPiZuYnNwOzwvdGQ+XHJcblx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdDwvdGFibGU+XHJcblx0XHRcdDwvdGQ+XHJcblx0XHQ8L3RyPlxyXG5cdDwvdGJvZHk+XHJcbjwvdGFibGU+XHJcbjwvYm9keT5cclxuPC9odG1sPlxyXG5cclxuICAgICAgICAgIGAsIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xyXG4gICAgfTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtvazogdHJ1ZX0pXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgb2s6IGZhbHNlLCBlcnJvcjogdHJ1ZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxVQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFFQSxJQUFBSyxHQUFBLEdBQUFILHNC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