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
    exp: "24h"
  }, process.env.JWT_SECRET);
};
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
                success: false
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
            _models.db.user.findAll({
              where: {
                hidden: 0
              },
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
              name: findUser === null || findUser === void 0 ? void 0 : findUser.firstName,
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
            }, process.env.JWT_SECRET, {
              expiresIn: 24 * 60 * 60
            });
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
            console.error("Error sending verification email:", _context9.t0);
            res.status(500).json({
              success: false,
              error: "Error sending verification email"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsIkRhdGUiLCJ2ZXJpZnlPdHAiLCJleHBpcnkiLCJ2ZXJpZnkiLCJ3aW5kb3ciLCJfZGVmYXVsdCIsImFkZFVzZXIiLCJyZXEiLCJyZXMiLCJuZXh0IiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJfcmVxJGJvZHkiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lIiwiZW1haWwiLCJhZGRyZXNzIiwicGFzc3dvcmQiLCJyb2xlIiwibm90ZSIsInVzZXJfaWQiLCJhdmF0YXIiLCJ1c2VyX21hbmFnZXIiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZ2V0QWxsVXNlckxpc3QiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImZpbmRBbGwiLCJoaWRkZW4iLCJpbmNsdWRlIiwibW9kZWwiLCJhcyIsImF0dHJpYnV0ZXMiLCJkYXRhIiwiZ2V0QWxsTGVhZGVyIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJ1c2VyVXBkYXRlIiwiX2NhbGxlZTQiLCJfcmVxJGJvZHkyIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiUmVxdWVzdEVycm9yIiwidXBkYXRlIiwicGFyc2VJbnQiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsImRldmljZUNvZGUiLCJmaW5kVXNlciIsIl9maW5kVXNlciRkZXZpY2UiLCJfZmluZFVzZXIkZGV2aWNlMiIsIl9maW5kVXNlciRkZXZpY2UzIiwiX2ZpbmRVc2VyJGRldmljZTQiLCJfZmluZFVzZXIkZGV2aWNlNSIsIl9maW5kVXNlciRkZXZpY2U2IiwiX2ZpbmRVc2VyJGRldmljZTciLCJfZmluZFVzZXIkZGV2aWNlOCIsImRldmljZTFDb2RlIiwiZGV2aWNlMkNvZGUiLCJfdG9rZW4iLCJfZGV2aWNlMUNvZGUiLCJfdG9rZW4yIiwiZmluZFVzZXJkZXZpY2UxIiwiZmluZFVzZXJkZXZpY2UyIiwiX3Rva2VuMyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInNlbnQiLCJhYnJ1cHQiLCJkZXZpY2UxIiwiZGV2aWNlMiIsInVpZCIsImRhdGFWYWx1ZXMiLCJhdWlkIiwiZXhwaXJlc0luIiwidGhpcmQiLCJfY2FsbGVlNyIsIl9yZXEkcXVlcnkiLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJxdWVyeSIsIl9yZWYiLCJfY2FsbGVlNiIsIl91c2VyJGRhdGFWYWx1ZXMiLCJ1c2VyTWFuYWdlciIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRhdGFNYW5hZ2VyIiwib2siLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTkiLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuaW1wb3J0IEpXVCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5pbXBvcnQgbWFpbGVyIGZyb20gXCIuLi8uLi8uLi9tYWlsZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uLy4uL2NvbmZpZ1wiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0LW5vZGVqc1wiO1xuaW1wb3J0IHNwZWFrZWFzeSBmcm9tIFwic3BlYWtlYXN5XCI7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIjtcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCI7XG5cbnZhciBKV1RTaWduID0gZnVuY3Rpb24gKHVzZXIsIGRhdGUpIHtcbiAgcmV0dXJuIEpXVC5zaWduKFxuICAgIHtcbiAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxuICAgICAgc3ViOiB1c2VyLmlkLFxuICAgICAgaWFtOiB1c2VyLnR5cGUsXG4gICAgICBpYXQ6IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgZXhwOiBcIjI0aFwiLFxuICAgIH0sXG4gICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVFxuICApO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21TdHJpbmcobGVuZ3RoKSB7XG4gIGNvbnN0IGNoYXJhY3RlcnMgPVxuICAgIFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcbiAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XG4gIGxldCB0b2tlbiA9IHNwZWFrZWFzeS50b3RwKHtcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgZW5jb2Rpbmc6IFwiYmFzZTMyXCIsXG4gICAgc3RlcDogMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCkgJSAzMCksXG4gIH0pO1xuICByZXR1cm4gdG9rZW47XG59XG5cbmZ1bmN0aW9uIHZlcmlmeU90cCh0b2tlbikge1xuICBsZXQgZXhwaXJ5ID0gc3BlYWtlYXN5LnRvdHAudmVyaWZ5KHtcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgZW5jb2Rpbmc6IFwiYmFzZTMyXCIsXG4gICAgdG9rZW46IHRva2VuLFxuICAgIHN0ZXA6IDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApICUgMzApLFxuICAgIHdpbmRvdzogMCxcbiAgfSk7XG4gIHJldHVybiBleHBpcnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGZpcnN0TmFtZSxcbiAgICAgIGxhc3ROYW1lLFxuICAgICAgcGhvbmUsXG4gICAgICBlbWFpbCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIHJvbGUsXG4gICAgICB2ZXJpZnksXG4gICAgICBub3RlLFxuICAgICAgdXNlcl9pZCxcbiAgICAgIGF2YXRhcixcbiAgICAgIHVzZXJfbWFuYWdlcixcbiAgICB9ID0gcmVxLmJvZHk7XG4gICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XG4gICAgY29uc29sZS5sb2cocGFzc3dvcmRIYXNoKTtcbiAgICB2YXIgdG9rZW4gPSBnZW5lcmF0ZU90cCgpO1xuICAgIHZhciBvdHAgPSB2ZXJpZnlPdHAodG9rZW4pO1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgZW1haWw6IGVtYWlsIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgLnRoZW4oKGZpbmQpID0+IHtcbiAgICAgICAgaWYgKGZpbmQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDkpLmpzb24oXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xuICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lLFxuICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSxcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgcGhvbmU6IHBob25lLFxuICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICB2ZXJpZnk6IHZlcmlmeSxcbiAgICAgICAgICByb2xlOiByb2xlLFxuICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICB1c2VyX2lkOiB1c2VyX2lkID8gdXNlcl9pZCA6IFwiXCIsXG4gICAgICAgICAgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBtYWlsZXIuc2VuZEVtcGxveWVlUGFzc3dvcmQoZW1haWwsIHRva2VuKTtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAga2V5OiBvdHAsXG4gICAgICAgICAgICAgIG1zZzpcbiAgICAgICAgICAgICAgICBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgK1xuICAgICAgICAgICAgICAgIGVtYWlsICtcbiAgICAgICAgICAgICAgICBcIiAuXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGdldEFsbFVzZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIudXNlclxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge2hpZGRlbjogMH0sXG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBtb2RlbDogZGIudXNlciwgLy8gSW5jbHVkZSB0aMO0bmcgdGluIGPhu6dhIG5nxrDhu51pIHF14bqjbiBsw70gKHVzZXIgbWFuYWdlcikgdOG7qyBjw7luZyBi4bqjbmcgVXNlclxuICAgICAgICAgIGFzOiBcInVzZXJNYW5hZ2VyXCIsIC8vIEFsaWFzIGNobyBt4buRaSBxdWFuIGjhu4dcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiXSwgLy8gQ2jhu4kgbOG6pXkgY8OhYyB0aHXhu5ljIHTDrW5oIGlkIHbDoCBuYW1lIGPhu6dhIG5nxrDhu51pIHF14bqjbiBsw71cbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHVzZXIgfSk7XG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBnZXRBbGxMZWFkZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi51c2VyXG4gICAgICAuZmluZEFsbCh7IHdoZXJlOiB7IHJvbGU6IFwibGVhZGVyXCIgfSB9KVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB1c2VyIH0pO1xuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyB1c2VyVXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBmaXJzdE5hbWUsXG4gICAgICBsYXN0TmFtZSxcbiAgICAgIGVtYWlsLFxuICAgICAgYWRkcmVzcyxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgcm9sZSxcbiAgICAgIHZlcmlmeSxcbiAgICAgIHBob25lLFxuICAgICAgc3RhdHVzLFxuICAgICAgbm90ZSxcbiAgICAgIHVzZXJfaWQsXG4gICAgICBhdmF0YXIsXG4gICAgICB1c2VyX21hbmFnZXIsXG4gICAgfSA9IHJlcS5ib2R5O1xuICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQgPyBwYXNzd29yZCA6IFwiXCIpO1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0sIHBhcmFub2lkOiBmYWxzZSB9KVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlVzZXIgaXMgbm90IGZvdW5kXCIsIDQwOSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRiLnVzZXIudXBkYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lID8gZmlyc3ROYW1lIDogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUgPyBsYXN0TmFtZSA6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2ggOiB1c2VyLnBhc3N3b3JkLFxuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgICAgICByb2xlOiByb2xlID8gcm9sZSA6IHVzZXIucm9sZSxcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCA/IGVtYWlsIDogdXNlci5lbWFpbCxcbiAgICAgICAgICAgIC8vIHZlcmlmeSA6IHN0YXR1cz8gc3RhdHVzOiB1c2VyLnZlcmlmeSxcbiAgICAgICAgICAgIHBob25lOiBwaG9uZSA/IHBob25lIDogdXNlci5waG9uZSxcbiAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJfaWQgPyB1c2VyX2lkIDogXCJcIixcbiAgICAgICAgICAgIGF2YXRhcjogYXZhdGFyID8gYXZhdGFyIDogXCJcIixcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzID8gcGFyc2VJbnQoc3RhdHVzKSA6IDAsXG4gICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBpZCB9IH1cbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwiIH0pO1xuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAvLyAgICAgdmFyIHRva2VuID0gSldUU2lnbihyZXEudXNlciwgZGF0ZSk7XG4gIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAvLyAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAvLyAgICAgICAgIGh0dHBPbmx5OiB0cnVlLCBzZWN1cmU6IGNvbmZpZy5hcHAuc2VjdXJlXG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSAsdG9rZW4sIHJvbGU6IHJlcS51c2VyLnJvbGV9KTtcbiAgLy8gfSxcbiAgYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgZGV2aWNlQ29kZSB9ID0gcmVxLmJvZHk7XG4gICAgLy8gdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgY29uc3QgZmluZFVzZXIgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSB9LFxuICAgIH0pO1xuICAgIGlmIChmaW5kVXNlcj8udmVyaWZ5ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICB9IGVsc2UgaWYgKGZpbmRVc2VyPy52ZXJpZnkpIHtcbiAgICAgIGlmIChmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZGV2aWNlMUNvZGUgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMCk7XG4gICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKFxuICAgICAgICAgIHsgZGV2aWNlMTogZGV2aWNlMUNvZGUgfSxcbiAgICAgICAgICB7IHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gSldULnNpZ24oXG4gICAgICAgICAgeyB1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkIH0sXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCxcbiAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lLFxuICAgICAgICAgICAgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUsXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDAgJiZcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBjb25zdCBkZXZpY2UyQ29kZSA9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKTtcbiAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoXG4gICAgICAgICAgeyBkZXZpY2UyOiBkZXZpY2UyQ29kZSB9LFxuICAgICAgICAgIHsgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSB9IH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcbiAgICAgICAgICB7IHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQgfSxcbiAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVULFxuICAgICAgICAgIHsgZXhwaXJlc0luOiAyNCAqIDYwICogNjAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSxcbiAgICAgICAgICAgIGRldmljZUNvZGU6IGRldmljZTJDb2RlLFxuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGRldmljZTFDb2RlID0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApO1xuICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UxQ29kZSk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi51c2VyLnVwZGF0ZShcbiAgICAgICAgICB7IGRldmljZTE6IGRldmljZTFDb2RlIH0sXG4gICAgICAgICAgeyB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0gfVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcbiAgICAgICAgICB7IHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQgfSxcbiAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxuICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLFxuICAgICAgICAgICAgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUsXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCAmJlxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMSA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMTogZGV2aWNlQ29kZSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UyID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UyOiBkZXZpY2VDb2RlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxuICAgICAgICAgIHsgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCB9LFxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKDUpO1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgICAgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxuICAgICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXG4gICAgICAgICAgICAgIGRldmljZUNvZGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyg2KTtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIGxvZ2luOiBmYWxzZSwgdGhpcmQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgfVxuICB9LFxuICBhc3luYyBmaW5kVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAgIFwiZmlyc3ROYW1lXCIsXG4gICAgICAgICAgXCJsYXN0TmFtZVwiLFxuICAgICAgICAgIFwiZW1haWxcIixcbiAgICAgICAgICBcImF2YXRhclwiLFxuICAgICAgICAgIFwicGhvbmVcIixcbiAgICAgICAgICBcImFkZHJlc3NcIixcbiAgICAgICAgICBcInJvbGVcIixcbiAgICAgICAgICBcInVzZXJfbWFuYWdlclwiLFxuICAgICAgICBdLFxuICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5Py51c2VyX2lkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oYXN5bmMgKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICBpZiAodXNlci5kYXRhVmFsdWVzPy51c2VyX21hbmFnZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJNYW5hZ2VyID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IHVzZXIuZGF0YVZhbHVlcy51c2VyX21hbmFnZXIgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZGF0YTogdXNlcixcbiAgICAgICAgICAgICAgICBkYXRhTWFuYWdlcjogdXNlck1hbmFnZXIsXG4gICAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciwgb2s6IHRydWUsIGRhdGFNYW5hZ2VyOiBudWxsIH0pO1xuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlVXNlckxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi51c2VyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgIHJldHVybiBkYi51c2VyXG4gICAgICAgICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZCB9IH0pXG4gICAgICAgICAgICAudGhlbigocikgPT4gW3IsIGRhdGFdKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiVXNlciBpcyBub3QgZm91bmRcIiwgNDA5KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICB0cnkge1xuICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XG4gICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgZmlyc3ROYW1lIH0gPSByZXEuYm9keTtcblxuICAgICAgLy8gVOG6oW8gbeG7mXQgbcOjIHjDoWMgdGjhu7FjIG5n4bqrdSBuaGnDqm5cblxuICAgICAgLy8gQ+G6pXUgaMOsbmggdGjDtG5nIHRpbiBtYWlsIHNlcnZlciAoZMO5bmcgR21haWwgbMOgbSB2w60gZOG7pSlcbiAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICBzZXJ2aWNlOiBcImdtYWlsXCIsXG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICBwYXNzOiBwcm9jZXNzLmVudi5NQUlMX1BBU1NXT1JELCAvLyBUaGF5IGLhurFuZyBt4bqtdCBraOG6qXUgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXG4gICAgICAgIHN1YmplY3Q6IFwiRW1haWwgVmVyaWZpY2F0aW9uXCIsIC8vIFRpw6p1IMSR4buBIGVtYWlsXG4gICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgLCAvLyBO4buZaSBkdW5nIGVtYWlsIGNo4bupYSBtw6MgeMOhYyB0aOG7sWNcbiAgICAgIH07XG5cbiAgICAgIC8vIEfhu61pIGVtYWlsXG4gICAgICBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgICAvLyBUcuG6oyB24buBIG3DoyB4w6FjIHRo4buxYyDEkeG7gyBz4butIGThu6VuZyBzYXUgbsOgeSAodsOtIGThu6UgxJHhu4Mga2nhu4NtIHRyYSBtw6Mga2hpIG5nxrDhu51pIGTDuW5nIG5o4bqtcCB2w6BvKVxuICAgICAgcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbDpcIiwgZXJyb3IpO1xuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbFwiIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFHLE9BQUEsR0FBQUQsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFJLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFLLGFBQUEsR0FBQUgsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFNLFVBQUEsR0FBQUosc0JBQUEsQ0FBQUYsT0FBQTtBQUVBLElBQUFPLEdBQUEsR0FBQUws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