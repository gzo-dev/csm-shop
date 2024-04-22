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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJub3RlIiwidXNlcl9pZCIsImF2YXRhciIsInVzZXJfbWFuYWdlciIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZmluZEFsbCIsImhpZGRlbiIsImluY2x1ZGUiLCJtb2RlbCIsImFzIiwiYXR0cmlidXRlcyIsImRhdGEiLCJnZXRBbGxMZWFkZXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJwYXJzZUludCIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiZGV2aWNlQ29kZSIsImZpbmRVc2VyIiwiX2ZpbmRVc2VyJGRldmljZSIsIl9maW5kVXNlciRkZXZpY2UyIiwiX2ZpbmRVc2VyJGRldmljZTMiLCJfZmluZFVzZXIkZGV2aWNlNCIsIl9maW5kVXNlciRkZXZpY2U1IiwiX2ZpbmRVc2VyJGRldmljZTYiLCJfZmluZFVzZXIkZGV2aWNlNyIsIl9maW5kVXNlciRkZXZpY2U4IiwiZGV2aWNlMUNvZGUiLCJkZXZpY2UyQ29kZSIsIl90b2tlbiIsIl9kZXZpY2UxQ29kZSIsIl90b2tlbjIiLCJmaW5kVXNlcmRldmljZTEiLCJmaW5kVXNlcmRldmljZTIiLCJfdG9rZW4zIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsImFicnVwdCIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJ0aGlyZCIsIl9jYWxsZWU3IiwiX3JlcSRxdWVyeSIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsInF1ZXJ5IiwiX3JlZiIsIl9jYWxsZWU2IiwiX3VzZXIkZGF0YVZhbHVlcyIsInVzZXJNYW5hZ2VyIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGF0YU1hbmFnZXIiLCJvayIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkZWxldGVVc2VyTGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZGVzdHJveSIsInIiLCJyZSIsInZlcmlmeU1haWwiLCJfY2FsbGVlOSIsIl9yZXEkYm9keTQiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5Iiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwiTUFJTF9VU0VSTkFNRSIsInBhc3MiLCJNQUlMX1BBU1NXT1JEIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJjb25jYXQiLCJVUkxfRlJPTlRFTkQiLCJzZW5kTWFpbCIsInQwIiwiZXJyb3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5pbXBvcnQgSldUIGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBtYWlsZXIgZnJvbSBcIi4uLy4uLy4uL21haWxlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vY29uZmlnXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHQtbm9kZWpzXCI7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gXCJzcGVha2Vhc3lcIjtcbi8vIGltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiO1xuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICByZXR1cm4gSldULnNpZ24oXG4gICAge1xuICAgICAgaXNzOiBjb25maWcuYXBwLm5hbWUsXG4gICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICBpYW06IHVzZXIudHlwZSxcbiAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcbiAgICB9LFxuICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcbiAgKTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gIGxldCByZXN1bHQgPSBcIlwiO1xuICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgIGVuY29kaW5nOiBcImJhc2UzMlwiLFxuICAgIHN0ZXA6IDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApICUgMzApLFxuICB9KTtcbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlPdHAodG9rZW4pIHtcbiAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgIGVuY29kaW5nOiBcImJhc2UzMlwiLFxuICAgIHRva2VuOiB0b2tlbixcbiAgICBzdGVwOiAzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKSAlIDMwKSxcbiAgICB3aW5kb3c6IDAsXG4gIH0pO1xuICByZXR1cm4gZXhwaXJ5O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB7XG4gICAgICBmaXJzdE5hbWUsXG4gICAgICBsYXN0TmFtZSxcbiAgICAgIHBob25lLFxuICAgICAgZW1haWwsXG4gICAgICBhZGRyZXNzLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByb2xlLFxuICAgICAgdmVyaWZ5LFxuICAgICAgbm90ZSxcbiAgICAgIHVzZXJfaWQsXG4gICAgICBhdmF0YXIsXG4gICAgICB1c2VyX21hbmFnZXIsXG4gICAgfSA9IHJlcS5ib2R5O1xuICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkSGFzaCk7XG4gICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICBkYi51c2VyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgIC50aGVuKChmaW5kKSA9PiB7XG4gICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXG4gICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9pZDogdXNlcl9pZCA/IHVzZXJfaWQgOiBcIlwiLFxuICAgICAgICAgIGF2YXRhcjogYXZhdGFyID8gYXZhdGFyIDogXCJcIixcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIGtleTogb3RwLFxuICAgICAgICAgICAgICBtc2c6XG4gICAgICAgICAgICAgICAgXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICtcbiAgICAgICAgICAgICAgICBlbWFpbCArXG4gICAgICAgICAgICAgICAgXCIgLlwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtoaWRkZW46IDB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgbW9kZWw6IGRiLnVzZXIsIC8vIEluY2x1ZGUgdGjDtG5nIHRpbiBj4bunYSBuZ8aw4budaSBxdeG6o24gbMO9ICh1c2VyIG1hbmFnZXIpIHThu6sgY8O5bmcgYuG6o25nIFVzZXJcbiAgICAgICAgICBhczogXCJ1c2VyTWFuYWdlclwiLCAvLyBBbGlhcyBjaG8gbeG7kWkgcXVhbiBo4buHXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIl0sIC8vIENo4buJIGzhuqV5IGPDoWMgdGh14buZYyB0w61uaCBpZCB2w6AgbmFtZSBj4bunYSBuZ8aw4budaSBxdeG6o24gbMO9XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB1c2VyIH0pO1xuICAgICAgICB9IGVsc2UgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgZ2V0QWxsTGVhZGVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIudXNlclxuICAgICAgLmZpbmRBbGwoeyB3aGVyZTogeyByb2xlOiBcImxlYWRlclwiIH0gfSlcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciB9KTtcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgdXNlclVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgZmlyc3ROYW1lLFxuICAgICAgbGFzdE5hbWUsXG4gICAgICBlbWFpbCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIHJvbGUsXG4gICAgICB2ZXJpZnksXG4gICAgICBwaG9uZSxcbiAgICAgIHN0YXR1cyxcbiAgICAgIG5vdGUsXG4gICAgICB1c2VyX2lkLFxuICAgICAgYXZhdGFyLFxuICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgIH0gPSByZXEuYm9keTtcbiAgICB2YXIgcGFzc3dvcmRIYXNoID0gbWQ1KHBhc3N3b3JkID8gcGFzc3dvcmQgOiBcIlwiKTtcbiAgICBkYi51c2VyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJVc2VyIGlzIG5vdCBmb3VuZFwiLCA0MDkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSA/IGZpcnN0TmFtZSA6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lID8gbGFzdE5hbWUgOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkID8gcGFzc3dvcmRIYXNoIDogdXNlci5wYXNzd29yZCxcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogdXNlci5hZGRyZXNzLFxuICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGUgOiB1c2VyLnJvbGUsXG4gICAgICAgICAgICBlbWFpbDogZW1haWwgPyBlbWFpbCA6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICAvLyB2ZXJpZnkgOiBzdGF0dXM/IHN0YXR1czogdXNlci52ZXJpZnksXG4gICAgICAgICAgICBwaG9uZTogcGhvbmUgPyBwaG9uZSA6IHVzZXIucGhvbmUsXG4gICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VyX2lkID8gdXNlcl9pZCA6IFwiXCIsXG4gICAgICAgICAgICBhdmF0YXI6IGF2YXRhciA/IGF2YXRhciA6IFwiXCIsXG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyA/IHBhcnNlSW50KHN0YXR1cykgOiAwLFxuICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyB3aGVyZTogeyBpZDogaWQgfSB9XG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVzZXIgdXBkYXRlIHN1Y2Nlc3NzZnVsbHlcIiB9KTtcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgLy8gICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcbiAgLy8gICAgICAgICBleHBpcmU6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcbiAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gIC8vIH0sXG4gIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGRldmljZUNvZGUgfSA9IHJlcS5ib2R5O1xuICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwYXNzd29yZClcbiAgICAvLyBjb25zb2xlLmxvZyhiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpKVxuICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcbiAgICAgIHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSxcbiAgICB9KTtcbiAgICBpZiAoZmluZFVzZXI/LnZlcmlmeSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgfSBlbHNlIGlmIChmaW5kVXNlcj8udmVyaWZ5KSB7XG4gICAgICBpZiAoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGRldmljZTFDb2RlID0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApO1xuICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZShcbiAgICAgICAgICB7IGRldmljZTE6IGRldmljZTFDb2RlIH0sXG4gICAgICAgICAgeyB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0gfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxuICAgICAgICAgIHsgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCB9LFxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXG4gICAgICAgICAgICBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSxcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCAmJlxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGRldmljZTJDb2RlID0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApO1xuICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZShcbiAgICAgICAgICB7IGRldmljZTI6IGRldmljZTJDb2RlIH0sXG4gICAgICAgICAgeyB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0gfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxuICAgICAgICAgIHsgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCB9LFxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXG4gICAgICAgICAgICBkZXZpY2VDb2RlOiBkZXZpY2UyQ29kZSxcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJlxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDBcbiAgICAgICkge1xuICAgICAgICBjb25zdCBkZXZpY2UxQ29kZSA9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKTtcbiAgICAgICAgY29uc29sZS5sb2coZGV2aWNlMUNvZGUpO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGIudXNlci51cGRhdGUoXG4gICAgICAgICAgeyBkZXZpY2UxOiBkZXZpY2UxQ29kZSB9LFxuICAgICAgICAgIHsgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSB9IH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gSldULnNpZ24oXG4gICAgICAgICAgeyB1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkIH0sXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSxcbiAgICAgICAgICAgIGRldmljZUNvZGU6IGRldmljZTFDb2RlLFxuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTEgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTE6IGRldmljZUNvZGUgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMiA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMjogZGV2aWNlQ29kZSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcbiAgICAgICAgICB7IHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQgfSxcbiAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUXG4gICAgICAgICk7XG4gICAgICAgIGlmIChmaW5kVXNlcmRldmljZTE/LmVtYWlsIHx8IGZpbmRVc2VyZGV2aWNlMj8uZW1haWwpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyg1KTtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSxcbiAgICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLFxuICAgICAgICAgICAgICBkZXZpY2VDb2RlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coNik7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBsb2dpbjogZmFsc2UsIHRoaXJkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZmluZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi51c2VyXG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICBcImZpcnN0TmFtZVwiLFxuICAgICAgICAgIFwibGFzdE5hbWVcIixcbiAgICAgICAgICBcImVtYWlsXCIsXG4gICAgICAgICAgXCJhdmF0YXJcIixcbiAgICAgICAgICBcInBob25lXCIsXG4gICAgICAgICAgXCJhZGRyZXNzXCIsXG4gICAgICAgICAgXCJyb2xlXCIsXG4gICAgICAgICAgXCJ1c2VyX21hbmFnZXJcIixcbiAgICAgICAgXSxcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeT8udXNlcl9pZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKGFzeW5jICh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgaWYgKHVzZXIuZGF0YVZhbHVlcz8udXNlcl9tYW5hZ2VyKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyTWFuYWdlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiB1c2VyLmRhdGFWYWx1ZXMudXNlcl9tYW5hZ2VyIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGE6IHVzZXIsXG4gICAgICAgICAgICAgICAgZGF0YU1hbmFnZXI6IHVzZXJNYW5hZ2VyLFxuICAgICAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHVzZXIsIG9rOiB0cnVlLCBkYXRhTWFuYWdlcjogbnVsbCB9KTtcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGRlbGV0ZVVzZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIudXNlclxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZGIudXNlclxuICAgICAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KVxuICAgICAgICAgICAgLnRoZW4oKHIpID0+IFtyLCBkYXRhXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlVzZXIgaXMgbm90IGZvdW5kXCIsIDQwOSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAuanNvbih7IHN0YXR1czogXCJkZWxldGVkIHVzZXJsaXN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyB2ZXJpZnlNYWlsKHJlcSwgcmVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIC8vIFThuqFvIG3hu5l0IG3DoyB4w6FjIHRo4buxYyBuZ+G6q3Ugbmhpw6puXG5cbiAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgc2VydmljZTogXCJnbWFpbFwiLFxuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCwgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgLy8gQ+G6pXUgaMOsbmggbuG7mWkgZHVuZyBlbWFpbFxuICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgIGZyb206IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICBzdWJqZWN0OiBcIkVtYWlsIFZlcmlmaWNhdGlvblwiLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICBodG1sOiBgXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Byb2Nlc3MuZW52LlVSTF9GUk9OVEVORH0vc2lnbnVwL3N1Y2Nlc3NcIiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJhY2tncm91bmQtY29sb3I6ICMyZTg5ZmY7IGNvbG9yOiAjZmZmOyB3aWR0aDogMTAwJVwiPkNsaWNrIGhlcmUgdG8gY29tcGxldGUgc2luZ3VwIHByb2Nlc3M8L2E+XG4gICAgICAgICAgICAgICAgYCwgLy8gTuG7mWkgZHVuZyBlbWFpbCBjaOG7qWEgbcOjIHjDoWMgdGjhu7FjXG4gICAgICB9O1xuXG4gICAgICAvLyBH4butaSBlbWFpbFxuICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xuICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcbiAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gWOG7rSBsw70gbOG7l2kgbuG6v3UgY8OzXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWw6XCIsIGVycm9yKTtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDUwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWxcIiB9KTtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxhQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxPQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSyxhQUFBLEdBQUFILHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBTSxVQUFBLEdBQUFKLHNCQUFBLENBQUFG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