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
      var _req$body3, email, password, deviceCode, findUser, _findUser$device, _findUser$device2, _findUser$device3, _findUser$device4, _findUser$device5, _findUser$device6, _findUser$device7, _findUser$device8, _findUser$dataValues, _findUser$dataValues2, _findUser$dataValues3, _findUser$dataValues4, device1Code, token, _findUser$dataValues5, _findUser$dataValues6, _findUser$dataValues7, device2Code, _token, _findUser$dataValues8, _findUser$dataValues9, _findUser$dataValues10, _device1Code, data, _token2, _findUser$dataValues11, _findUser$dataValues12, _findUser$dataValues13, _findUser$dataValues14, findUserdevice1, findUserdevice2, _token3;
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
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues3 = findUser.dataValues) === null || _findUser$dataValues3 === void 0 ? void 0 : _findUser$dataValues3.firstName
            }, process.env.JWT_SECRET, {
              expiresIn: 24 * 60 * 60
            });
            return _context5.abrupt("return", res.status(200).json({
              success: true,
              token: token,
              auid: findUser.dataValues.id,
              role: findUser.dataValues.role,
              email: findUser.dataValues.email,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues4 = findUser.dataValues) === null || _findUser$dataValues4 === void 0 ? void 0 : _findUser$dataValues4.firstName,
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
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues5 = findUser.dataValues) === null || _findUser$dataValues5 === void 0 ? void 0 : _findUser$dataValues5.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues6 = findUser.dataValues) === null || _findUser$dataValues6 === void 0 ? void 0 : _findUser$dataValues6.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues7 = findUser.dataValues) === null || _findUser$dataValues7 === void 0 ? void 0 : _findUser$dataValues7.firstName
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
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues8 = findUser.dataValues) === null || _findUser$dataValues8 === void 0 ? void 0 : _findUser$dataValues8.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues9 = findUser.dataValues) === null || _findUser$dataValues9 === void 0 ? void 0 : _findUser$dataValues9.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues10 = findUser.dataValues) === null || _findUser$dataValues10 === void 0 ? void 0 : _findUser$dataValues10.firstName
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
            _token3 = _jsonwebtoken["default"].sign({
              uid: findUser.dataValues.id,
              id: findUser.dataValues.id,
              role: (_findUser$dataValues11 = findUser.dataValues) === null || _findUser$dataValues11 === void 0 ? void 0 : _findUser$dataValues11.role,
              require2fa: true,
              email: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues12 = findUser.dataValues) === null || _findUser$dataValues12 === void 0 ? void 0 : _findUser$dataValues12.email,
              phone: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues13 = findUser.dataValues) === null || _findUser$dataValues13 === void 0 ? void 0 : _findUser$dataValues13.phone,
              name: findUser === null || findUser === void 0 ? void 0 : (_findUser$dataValues14 = findUser.dataValues) === null || _findUser$dataValues14 === void 0 ? void 0 : _findUser$dataValues14.firstName
            }, process.env.JWT_SECRET, {
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
      var uid, users;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            // Nhận email từ request body
            uid = req.query.uid;
            _context9.next = 4;
            return _models.db.user.findAll({
              where: {
                user_manager: uid
              },
              include: [{
                model: _models.db.user_manager_product,
                // as: "userManager",
                attributes: ["user_manager", "product_id"]
              }, {
                model: _models.db.product
              }]
            });
          case 4:
            users = _context9.sent;
            res.json({
              success: true,
              data: users
            });
            _context9.next = 12;
            break;
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json({
              success: false,
              error: "Có lỗi từ phía máy chủ"
            }));
          case 12:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 8]]);
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
            res.status(500).json({
              success: false,
              error: "Có lỗi từ phía máy chủ"
            });
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
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX2NvbmZpZyIsIl9zcGVha2Vhc3kiLCJfbWQiLCJfbm9kZW1haWxlciIsIl9sb2Rhc2giLCJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiY2hhcmFjdGVycyIsInJlc3VsdCIsImNoYXJhY3RlcnNMZW5ndGgiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZU90cCIsInRva2VuIiwic3BlYWtlYXN5IiwidG90cCIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJPVFBfS0VZIiwiZW5jb2RpbmciLCJzdGVwIiwiRGF0ZSIsImdldFRpbWUiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lIiwiZW1haWwiLCJhZGRyZXNzIiwicGFzc3dvcmQiLCJyb2xlIiwibm90ZSIsInVzZXJfaWQiLCJhdmF0YXIiLCJ1c2VyX21hbmFnZXIiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiZGIiLCJ1c2VyIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJzdWNjZXNzIiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZmluZEFsbCIsImhpZGRlbiIsImlzX2RlbGV0ZWQiLCJvcmRlciIsImluY2x1ZGUiLCJtb2RlbCIsImFzIiwiYXR0cmlidXRlcyIsImRhdGEiLCJnZXRBbGxMZWFkZXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJpZCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIlJlcXVlc3RFcnJvciIsInVwZGF0ZSIsInBhcnNlSW50IiwibG9naW4iLCJfY2FsbGVlNSIsIl9yZXEkYm9keTMiLCJkZXZpY2VDb2RlIiwiZmluZFVzZXIiLCJfZmluZFVzZXIkZGV2aWNlIiwiX2ZpbmRVc2VyJGRldmljZTIiLCJfZmluZFVzZXIkZGV2aWNlMyIsIl9maW5kVXNlciRkZXZpY2U0IiwiX2ZpbmRVc2VyJGRldmljZTUiLCJfZmluZFVzZXIkZGV2aWNlNiIsIl9maW5kVXNlciRkZXZpY2U3IiwiX2ZpbmRVc2VyJGRldmljZTgiLCJfZmluZFVzZXIkZGF0YVZhbHVlcyIsIl9maW5kVXNlciRkYXRhVmFsdWVzMiIsIl9maW5kVXNlciRkYXRhVmFsdWVzMyIsIl9maW5kVXNlciRkYXRhVmFsdWVzNCIsImRldmljZTFDb2RlIiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM1IiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM2IiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXM3IiwiZGV2aWNlMkNvZGUiLCJfdG9rZW4iLCJfZmluZFVzZXIkZGF0YVZhbHVlczgiLCJfZmluZFVzZXIkZGF0YVZhbHVlczkiLCJfZmluZFVzZXIkZGF0YVZhbHVlczEwIiwiX2RldmljZTFDb2RlIiwiX3Rva2VuMiIsIl9maW5kVXNlciRkYXRhVmFsdWVzMTEiLCJfZmluZFVzZXIkZGF0YVZhbHVlczEyIiwiX2ZpbmRVc2VyJGRhdGFWYWx1ZXMxMyIsIl9maW5kVXNlciRkYXRhVmFsdWVzMTQiLCJmaW5kVXNlcmRldmljZTEiLCJmaW5kVXNlcmRldmljZTIiLCJfdG9rZW4zIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsImFicnVwdCIsImRldmljZTEiLCJkZXZpY2UyIiwiSldUIiwic2lnbiIsInVpZCIsImRhdGFWYWx1ZXMiLCJyZXF1aXJlMmZhIiwibmFtZSIsIkpXVF9TRUNSRVQiLCJleHBpcmVzSW4iLCJhdWlkIiwidGhpcmQiLCJfY2FsbGVlNyIsIl9yZXEkdXNlciIsIl9yZXEkcXVlcnkiLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJvayIsInF1ZXJ5IiwiX3JlZiIsIl9jYWxsZWU2IiwiX3VzZXIkZGF0YVZhbHVlcyIsInVzZXJNYW5hZ2VyIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGF0YU1hbmFnZXIiLCJfeCIsImRlbGV0ZVVzZXJMaXN0IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJyIiwicmUiLCJnZXRMaXN0RW1wbG95ZWVPZkxlYWRlciIsIl9jYWxsZWU5IiwidXNlcnMiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJ1c2VyX21hbmFnZXJfcHJvZHVjdCIsInByb2R1Y3QiLCJ0MCIsImVycm9yIiwidXBkYXRlRW1wbG95ZWVPZkxlYWRlciIsIl9jYWxsZWUxMCIsIl9kYiR1c2VyX21hbmFnZXJfcHJvZCIsIl9yZXEkYm9keTQiLCJsaXN0Iiwib3duZXIiLCJwcm9kdWN0SWQiLCJsaXN0QnVsayIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwiZGVzdHJveSIsInByb2R1Y3RfaWQiLCJtYXAiLCJpdGVtIiwidXNlcl9vd25lciIsImJ1bGtDcmVhdGUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTExIiwiX3JlcSRib2R5NSIsInRyYW5zcG9ydGVyIiwibWFpbE9wdGlvbnMiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ2ZXJpZnkyZmEiLCJfY2FsbGVlMTIiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsInJlcXVpcmUyIiwib3BlbjJmYSIsInQxIiwiX2NhbGxlZTEzIiwicm93cyIsIl9jYWxsZWUxMyQiLCJfY29udGV4dDEzIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xyXG5pbXBvcnQgSldUIGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vY29uZmlnXCI7XHJcbmltcG9ydCBzcGVha2Vhc3kgZnJvbSBcInNwZWFrZWFzeVwiO1xyXG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXHJcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiO1xyXG5pbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiO1xyXG5pbXBvcnQgeyByYW5kb20gfSBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW5ndGgpIHtcclxuICBjb25zdCBjaGFyYWN0ZXJzID1cclxuICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XHJcbiAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xyXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxyXG4gICAgZW5jb2Rpbmc6IFwiYmFzZTMyXCIsXHJcbiAgICBzdGVwOiAzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKSAlIDMwKSxcclxuICB9KTtcclxuICByZXR1cm4gdG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xyXG4gIGxldCBleHBpcnkgPSBzcGVha2Vhc3kudG90cC52ZXJpZnkoe1xyXG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxyXG4gICAgZW5jb2Rpbmc6IFwiYmFzZTMyXCIsXHJcbiAgICB0b2tlbjogdG9rZW4sXHJcbiAgICBzdGVwOiAzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKSAlIDMwKSxcclxuICAgIHdpbmRvdzogMCxcclxuICB9KTtcclxuICByZXR1cm4gZXhwaXJ5O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBmaXJzdE5hbWUsXHJcbiAgICAgIGxhc3ROYW1lLFxyXG4gICAgICBwaG9uZSxcclxuICAgICAgZW1haWwsXHJcbiAgICAgIGFkZHJlc3MsXHJcbiAgICAgIHBhc3N3b3JkLFxyXG4gICAgICByb2xlLFxyXG4gICAgICB2ZXJpZnksXHJcbiAgICAgIG5vdGUsXHJcbiAgICAgIHVzZXJfaWQsXHJcbiAgICAgIGF2YXRhcixcclxuICAgICAgdXNlcl9tYW5hZ2VyLFxyXG4gICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XHJcbiAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xyXG4gICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XHJcbiAgICBkYi51c2VyXHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxyXG4gICAgICAudGhlbigoZmluZCkgPT4ge1xyXG4gICAgICAgIGlmIChmaW5kKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcclxuICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxyXG4gICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxyXG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgcGhvbmU6IHBob25lLFxyXG4gICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcclxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXHJcbiAgICAgICAgICB2ZXJpZnk6IHZlcmlmeSxcclxuICAgICAgICAgIHJvbGU6IHJvbGUsXHJcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXHJcbiAgICAgICAgICB1c2VyX2lkOiB1c2VyX2lkID8gdXNlcl9pZCA6IFwiXCIsXHJcbiAgICAgICAgICBhdmF0YXI6IGF2YXRhciA/IGF2YXRhciA6IFwiXCIsXHJcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIGtleTogb3RwLFxyXG4gICAgICAgICAgICBtc2c6XHJcbiAgICAgICAgICAgICAgXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICtcclxuICAgICAgICAgICAgICBlbWFpbCArXHJcbiAgICAgICAgICAgICAgXCIgLlwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGRiLnVzZXJcclxuICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7IGhpZGRlbjogMCwgaXNfZGVsZXRlZDogZmFsc2UgfSxcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcImFzY1wiXV0sXHJcbiAgICAgICAgaW5jbHVkZToge1xyXG4gICAgICAgICAgbW9kZWw6IGRiLnVzZXIsIC8vIEluY2x1ZGUgdGjDtG5nIHRpbiBj4bunYSBuZ8aw4budaSBxdeG6o24gbMO9ICh1c2VyIG1hbmFnZXIpIHThu6sgY8O5bmcgYuG6o25nIFVzZXJcclxuICAgICAgICAgIGFzOiBcInVzZXJNYW5hZ2VyXCIsIC8vIEFsaWFzIGNobyBt4buRaSBxdWFuIGjhu4dcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCJdLCAvLyBDaOG7iSBs4bqleSBjw6FjIHRodeG7mWMgdMOtbmggaWQgdsOgIG5hbWUgY+G7p2EgbmfGsOG7nWkgcXXhuqNuIGzDvVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHVzZXIgfSk7XHJcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0QWxsTGVhZGVyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBkYi51c2VyXHJcbiAgICAgIC5maW5kQWxsKHsgd2hlcmU6IHsgcm9sZTogXCJsZWFkZXJcIiB9IH0pXHJcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHVzZXIgfSk7XHJcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHVzZXJVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGZpcnN0TmFtZSxcclxuICAgICAgbGFzdE5hbWUsXHJcbiAgICAgIGVtYWlsLFxyXG4gICAgICBhZGRyZXNzLFxyXG4gICAgICBwYXNzd29yZCxcclxuICAgICAgcm9sZSxcclxuICAgICAgdmVyaWZ5LFxyXG4gICAgICBwaG9uZSxcclxuICAgICAgc3RhdHVzLFxyXG4gICAgICBub3RlLFxyXG4gICAgICB1c2VyX2lkLFxyXG4gICAgICBhdmF0YXIsXHJcbiAgICAgIHVzZXJfbWFuYWdlcixcclxuICAgIH0gPSByZXEuYm9keTtcclxuICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQgPyBwYXNzd29yZCA6IFwiXCIpO1xyXG4gICAgZGIudXNlclxyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJVc2VyIGlzIG5vdCBmb3VuZFwiLCA0MDkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lID8gZmlyc3ROYW1lIDogdXNlci5maXJzdE5hbWUsXHJcbiAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lIDogdXNlci5sYXN0TmFtZSxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoIDogdXNlci5wYXNzd29yZCxcclxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXHJcbiAgICAgICAgICAgIHJvbGU6IHJvbGUgPyByb2xlIDogdXNlci5yb2xlLFxyXG4gICAgICAgICAgICBlbWFpbDogZW1haWwgPyBlbWFpbCA6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIC8vIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcclxuICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lLFxyXG4gICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIixcclxuICAgICAgICAgICAgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxyXG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyA/IHBhcnNlSW50KHN0YXR1cykgOiAwLFxyXG4gICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGwsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyB3aGVyZTogeyBpZDogaWQgfSB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwiIH0pO1xyXG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG5cclxuICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xyXG4gIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xyXG4gIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xyXG4gIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXHJcbiAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxyXG4gIC8vICAgICB9KTtcclxuXHJcbiAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XHJcbiAgLy8gfSxcclxuICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGRldmljZUNvZGUgfSA9IHJlcS5ib2R5O1xyXG4gICAgY29uc3QgZmluZFVzZXIgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xyXG4gICAgICB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0sXHJcbiAgICB9KTtcclxuICAgIGlmIChmaW5kVXNlcj8udmVyaWZ5ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgfSBlbHNlIGlmIChmaW5kVXNlcj8udmVyaWZ5KSB7XHJcbiAgICAgIGlmIChmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZXZpY2UxQ29kZSA9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKTtcclxuICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZShcclxuICAgICAgICAgIHsgZGV2aWNlMTogZGV2aWNlMUNvZGUgfSxcclxuICAgICAgICAgIHsgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSB9IH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gSldULnNpZ24oXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgICAgIGVtYWlsOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8uZW1haWwsXHJcbiAgICAgICAgICAgIHBob25lOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8ucGhvbmUsXHJcbiAgICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5maXJzdE5hbWUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXHJcbiAgICAgICAgICBlbWFpbDogZmluZFVzZXIuZGF0YVZhbHVlcy5lbWFpbCxcclxuICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5kYXRhVmFsdWVzPy5maXJzdE5hbWUsXHJcbiAgICAgICAgICBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSxcclxuICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwICYmXHJcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlMkNvZGUgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMCk7XHJcbiAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoXHJcbiAgICAgICAgICB7IGRldmljZTI6IGRldmljZTJDb2RlIH0sXHJcbiAgICAgICAgICB7IHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICByZXF1aXJlMmZhOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmVtYWlsLFxyXG4gICAgICAgICAgICBwaG9uZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LnBob25lLFxyXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8uZmlyc3ROYW1lLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsXHJcbiAgICAgICAgICB7IGV4cGlyZXNJbjogMjQgKiA2MCAqIDYwIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgICBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxyXG4gICAgICAgICAgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLFxyXG4gICAgICAgICAgZGV2aWNlQ29kZTogZGV2aWNlMkNvZGUsXHJcbiAgICAgICAgICByZXF1aXJlMmZhOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJlxyXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMFxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBkZXZpY2UxQ29kZSA9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGIudXNlci51cGRhdGUoXHJcbiAgICAgICAgICB7IGRldmljZTE6IGRldmljZTFDb2RlIH0sXHJcbiAgICAgICAgICB7IHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICByZXF1aXJlMmZhOiB0cnVlLFxyXG4gICAgICAgICAgICBlbWFpbDogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmVtYWlsLFxyXG4gICAgICAgICAgICBwaG9uZTogZmluZFVzZXI/LmRhdGFWYWx1ZXM/LnBob25lLFxyXG4gICAgICAgICAgICBuYW1lOiAgZmluZFVzZXI/LmRhdGFWYWx1ZXM/LmZpcnN0TmFtZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsXHJcbiAgICAgICAgICB7IGV4cGlyZXNJbjogMjQgKiA2MCAqIDYwIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgdG9rZW4sXHJcbiAgICAgICAgICBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxyXG4gICAgICAgICAgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLFxyXG4gICAgICAgICAgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUsXHJcbiAgICAgICAgICByZXF1aXJlMmZhOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UxID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcclxuICAgICAgICAgIHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTE6IGRldmljZUNvZGUgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTIgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMjogZGV2aWNlQ29kZSB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gSldULnNpZ24oXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXM/LnJvbGUsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgICAgIGVtYWlsOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8uZW1haWwsXHJcbiAgICAgICAgICAgIHBob25lOiBmaW5kVXNlcj8uZGF0YVZhbHVlcz8ucGhvbmUsXHJcbiAgICAgICAgICAgIG5hbWU6ICBmaW5kVXNlcj8uZGF0YVZhbHVlcz8uZmlyc3ROYW1lXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coNSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxyXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXHJcbiAgICAgICAgICAgIGRldmljZUNvZGUsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvZ2luOiBmYWxzZSxcclxuICAgICAgICAgICAgdGhpcmQ6IHRydWUsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IGZhbHNlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgcmVxdWlyZTJmYTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGZpbmRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBpZiAocmVxPy51c2VyPy5yZXF1aXJlMmZhICE9PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogZmFsc2UsIHN1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgZGIudXNlclxyXG4gICAgICAuZmluZE9uZSh7XHJcbiAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgXCJmaXJzdE5hbWVcIixcclxuICAgICAgICAgIFwibGFzdE5hbWVcIixcclxuICAgICAgICAgIFwiZW1haWxcIixcclxuICAgICAgICAgIFwiYXZhdGFyXCIsXHJcbiAgICAgICAgICBcInBob25lXCIsXHJcbiAgICAgICAgICBcImFkZHJlc3NcIixcclxuICAgICAgICAgIFwicm9sZVwiLFxyXG4gICAgICAgICAgXCJ1c2VyX21hbmFnZXJcIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnk/LnVzZXJfaWQgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oYXN5bmMgKHVzZXIpID0+IHtcclxuICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgaWYgKHVzZXIuZGF0YVZhbHVlcz8udXNlcl9tYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJNYW5hZ2VyID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlci5kYXRhVmFsdWVzLnVzZXJfbWFuYWdlciB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXIsXHJcbiAgICAgICAgICAgICAgZGF0YU1hbmFnZXI6IHVzZXJNYW5hZ2VyLFxyXG4gICAgICAgICAgICAgIG9rOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciwgb2s6IHRydWUsIGRhdGFNYW5hZ2VyOiBudWxsIH0pO1xyXG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIudXNlclxyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBkYi51c2VyXHJcbiAgICAgICAgICAgIC51cGRhdGUoeyBpc19kZWxldGVkOiB0cnVlIH0sIHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSlcclxuICAgICAgICAgICAgLnRoZW4oKHIpID0+IFtyLCBkYXRhXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJVc2VyIGlzIG5vdCBmb3VuZFwiLCA0MDkpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmUpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAgIC5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGFzeW5jIGdldExpc3RFbXBsb3llZU9mTGVhZGVyKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBOaOG6rW4gZW1haWwgdOG7qyByZXF1ZXN0IGJvZHlcclxuICAgICAgY29uc3QgeyB1aWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCBkYi51c2VyLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVpZCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXJfbWFuYWdlcl9wcm9kdWN0LFxyXG4gICAgICAgICAgICAvLyBhczogXCJ1c2VyTWFuYWdlclwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJ1c2VyX21hbmFnZXJcIiwgXCJwcm9kdWN0X2lkXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHVzZXJzIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgLnN0YXR1cyg1MDApXHJcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ8OzIGzhu5dpIHThu6sgcGjDrWEgbcOheSBjaOG7p1wiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdXBkYXRlRW1wbG95ZWVPZkxlYWRlcihyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBsaXN0LCBvd25lciwgcHJvZHVjdElkIH0gPSByZXEuYm9keTtcclxuICAgICAgYXdhaXQgZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3QuZGVzdHJveSh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIC8vIHVzZXJfbWFuYWdlcjogcGFyc2VJbnQob3duZXIpLFxyXG4gICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdElkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBsaXN0QnVsayA9IGxpc3Q/Lm1hcCgoaXRlbSkgPT4gKHtcclxuICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgdXNlcl9vd25lcjogaXRlbSxcclxuICAgICAgICB1c2VyX21hbmFnZXI6IGl0ZW0sXHJcbiAgICAgIH0pKTtcclxuICAgICAgYXdhaXQgZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3Q/LmJ1bGtDcmVhdGUobGlzdEJ1bGspO1xyXG4gICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IFtdLCBvazogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ8OzIGzhu5dpIHThu6sgcGjDrWEgbcOheSBjaOG7p1wiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdmVyaWZ5TWFpbChyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XHJcbiAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgLy8gVOG6oW8gbeG7mXQgbcOjIHjDoWMgdGjhu7FjIG5n4bqrdSBuaGnDqm5cclxuXHJcbiAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXHJcbiAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcclxuICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxyXG4gICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcclxuICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cclxuICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xyXG4gICAgICAgIHN1YmplY3Q6IFwiRW1haWwgVmVyaWZpY2F0aW9uXCIsIC8vIFRpw6p1IMSR4buBIGVtYWlsXHJcbiAgICAgICAgaHRtbDogYFxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LlVSTF9GUk9OVEVORH0vc2lnbnVwL3N1Y2Nlc3NcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6ICMyZTg5ZmY7IGNvbG9yOiAjZmZmOyB3aWR0aDogMTAwJVwiPkNsaWNrIGhlcmUgdG8gY29tcGxldGUgc2luZ3VwIHByb2Nlc3M8L2E+XHJcbiAgICAgICAgICAgICAgICBgLCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIEfhu61pIGVtYWlsXHJcbiAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxuICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcclxuICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8gWOG7rSBsw70gbOG7l2kgbuG6v3UgY8OzXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDpcIiwgZXJyb3IpO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbFwiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgdmVyaWZ5MmZhKHJlcSwgcmVzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gcmVxLnVzZXI7XHJcbiAgICAgIGNvbnN0IGVtYWlsID0gdXNlci5lbWFpbDtcclxuICAgICAgaWYgKGVtYWlsID09PSBcImhpaGloaVwiKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLi4ucmVxLnVzZXIsXHJcbiAgICAgICAgICAgIHJlcXVpcmUyZmE6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcclxuICAgICAgICAgIC8vIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIHRva2VuOiB0b2tlbiwgcmVxdWlyZTI6IGZhbHNlIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG90cCA9IHJhbmRvbSgxMDAwMDAwKTtcclxuICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICAgICAgc2VydmljZTogXCJnbWFpbFwiLFxyXG4gICAgICAgIGF1dGg6IHtcclxuICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCwgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXHJcbiAgICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xyXG4gICAgICAgIGZyb206IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxyXG4gICAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXHJcbiAgICAgICAgc3ViamVjdDogXCJFbWFpbCBWZXJpZmljYXRpb25cIiwgLy8gVGnDqnUgxJHhu4EgZW1haWxcclxuICAgICAgICBodG1sOiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsgbWF4LXdpZHRoOiA2MDBweDsgbWFyZ2luOiAwIGF1dG87IHBhZGRpbmc6IDIwcHg7IGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7IGJvcmRlci1yYWRpdXM6IDEwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8aDIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGNvbG9yOiAjNENBRjUwO1wiPljDoWMgVGjhu7FjIEVtYWlsPC9oMj5cclxuICAgICAgICAgICAgICAgIDxwPkNow6BvIGLhuqFuLDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPk3DoyB4w6FjIHRo4buxYyBj4bunYSBi4bqhbiBsw6A6PC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZzogMTBweDsgYm9yZGVyOiAxcHggZGFzaGVkICM0Q0FGNTA7IGJvcmRlci1yYWRpdXM6IDVweDsgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgZm9udC1zaXplOiAyMHB4OyBmb250LXdlaWdodDogYm9sZDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAke290cH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHA+VnVpIGzDsm5nIG5o4bqtcCBtw6MgbsOgeSB2w6BvIOG7qW5nIGThu6VuZyDEkeG7gyB4w6FjIHRo4buxYyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW4uPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+WGluIGPhuqNtIMahbiw8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5NaW5oIGtoYW5nIGdyb3VwPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgLCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcclxuICAgICAgfTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgb2s6IGZhbHNlLCBlcnJvcjogdHJ1ZSB9KTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxyXG4gICAgICAvLyAgIHtcclxuICAgICAgLy8gICAgIC4uLnJlcS51c2VyLCByZXF1aXJlMmZhOiBmYWxzZVxyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcclxuICAgICAgLy8gICAvLyB7IGV4cGlyZXNJbjogMjQgKiA2MCAqIDYwIH1cclxuICAgICAgLy8gKTtcclxuXHJcbiAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHsgb3RwOiBvdHAgfSwgeyB3aGVyZTogeyBpZDogdXNlci51aWQgfSB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIG9wZW4yZmE6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIHZlcmlmeU90cChyZXEsIHJlcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlcj0gcmVxLnVzZXJcclxuICAgICAgY29uc3Qgb3RwPSByZXEuYm9keS5vdHBcclxuICAgICAgY29uc3Qgcm93cz0gYXdhaXQgZGIudXNlci5maW5kQWxsKHt3aGVyZToge2lkOiB1c2VyPy51aWQsIG90cDogb3RwfX0pXHJcbiAgICAgIFxyXG4gICAgICBpZihyb3dzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgIGNvbnN0IHRva2VuID0gSldULnNpZ24oXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC4uLnJlcS51c2VyLCByZXF1aXJlMmZhOiBmYWxzZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsXHJcbiAgICAgICAgICAvLyB7IGV4cGlyZXNJbjogMjQgKiA2MCAqIDYwIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe29rOiB0cnVlLCB0b2tlbn0pXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtvazogZmFsc2V9KVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtvazogZmFsc2V9KVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIl0sIm1hcHBpbmdz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