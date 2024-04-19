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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJub3RlIiwidXNlcl9pZCIsImF2YXRhciIsInVzZXJfbWFuYWdlciIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiZmluZEFsbCIsImluY2x1ZGUiLCJtb2RlbCIsImFzIiwiYXR0cmlidXRlcyIsImRhdGEiLCJnZXRBbGxMZWFkZXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJwYXJzZUludCIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiZGV2aWNlQ29kZSIsImZpbmRVc2VyIiwiX2ZpbmRVc2VyJGRldmljZSIsIl9maW5kVXNlciRkZXZpY2UyIiwiX2ZpbmRVc2VyJGRldmljZTMiLCJfZmluZFVzZXIkZGV2aWNlNCIsIl9maW5kVXNlciRkZXZpY2U1IiwiX2ZpbmRVc2VyJGRldmljZTYiLCJfZmluZFVzZXIkZGV2aWNlNyIsIl9maW5kVXNlciRkZXZpY2U4IiwiZGV2aWNlMUNvZGUiLCJkZXZpY2UyQ29kZSIsIl90b2tlbiIsIl9kZXZpY2UxQ29kZSIsIl90b2tlbjIiLCJmaW5kVXNlcmRldmljZTEiLCJmaW5kVXNlcmRldmljZTIiLCJfdG9rZW4zIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1Iiwic2VudCIsImFicnVwdCIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImF1aWQiLCJ0aGlyZCIsIl9jYWxsZWU3IiwiX3JlcSRxdWVyeSIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsInF1ZXJ5IiwiX3JlZiIsIl9jYWxsZWU2IiwiX3VzZXIkZGF0YVZhbHVlcyIsInVzZXJNYW5hZ2VyIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGF0YU1hbmFnZXIiLCJvayIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkZWxldGVVc2VyTGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZGVzdHJveSIsInIiLCJyZSIsInZlcmlmeU1haWwiLCJfY2FsbGVlOSIsIl9yZXEkYm9keTQiLCJ0cmFuc3BvcnRlciIsIm1haWxPcHRpb25zIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5Iiwibm9kZW1haWxlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwiTUFJTF9VU0VSTkFNRSIsInBhc3MiLCJNQUlMX1BBU1NXT1JEIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJjb25jYXQiLCJVUkxfRlJPTlRFTkQiLCJzZW5kTWFpbCIsInQwIiwiZXJyb3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5pbXBvcnQgSldUIGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBtYWlsZXIgZnJvbSBcIi4uLy4uLy4uL21haWxlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vY29uZmlnXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHQtbm9kZWpzXCI7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gXCJzcGVha2Vhc3lcIjtcbi8vIGltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICcuLy4uLy4uLy4uL2Z1bmN0aW9ucydcbmltcG9ydCBtZDUgZnJvbSBcIm1kNVwiO1xuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICByZXR1cm4gSldULnNpZ24oXG4gICAge1xuICAgICAgaXNzOiBjb25maWcuYXBwLm5hbWUsXG4gICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICBpYW06IHVzZXIudHlwZSxcbiAgICAgIGlhdDogZGF0ZS5nZXRUaW1lKCksXG4gICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKSxcbiAgICB9LFxuICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcbiAgKTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICBjb25zdCBjaGFyYWN0ZXJzID1cbiAgICBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG4gIGxldCByZXN1bHQgPSBcIlwiO1xuICBjb25zdCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlT3RwKCkge1xuICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgIGVuY29kaW5nOiBcImJhc2UzMlwiLFxuICAgIHN0ZXA6IDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApICUgMzApLFxuICB9KTtcbiAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlPdHAodG9rZW4pIHtcbiAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgIGVuY29kaW5nOiBcImJhc2UzMlwiLFxuICAgIHRva2VuOiB0b2tlbixcbiAgICBzdGVwOiAzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKSAlIDMwKSxcbiAgICB3aW5kb3c6IDAsXG4gIH0pO1xuICByZXR1cm4gZXhwaXJ5O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzeW5jIGFkZFVzZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB7XG4gICAgICBmaXJzdE5hbWUsXG4gICAgICBsYXN0TmFtZSxcbiAgICAgIHBob25lLFxuICAgICAgZW1haWwsXG4gICAgICBhZGRyZXNzLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByb2xlLFxuICAgICAgdmVyaWZ5LFxuICAgICAgbm90ZSxcbiAgICAgIHVzZXJfaWQsXG4gICAgICBhdmF0YXIsXG4gICAgICB1c2VyX21hbmFnZXIsXG4gICAgfSA9IHJlcS5ib2R5O1xuICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkSGFzaCk7XG4gICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICB2YXIgb3RwID0gdmVyaWZ5T3RwKHRva2VuKTtcbiAgICBkYi51c2VyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgIC50aGVuKChmaW5kKSA9PiB7XG4gICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRiLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUsXG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXG4gICAgICAgICAgcm9sZTogcm9sZSxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9pZDogdXNlcl9pZCA/IHVzZXJfaWQgOiBcIlwiLFxuICAgICAgICAgIGF2YXRhcjogYXZhdGFyID8gYXZhdGFyIDogXCJcIixcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIGtleTogb3RwLFxuICAgICAgICAgICAgICBtc2c6XG4gICAgICAgICAgICAgICAgXCJOZXcgUmVnaXN0cmF0aW9uIGFkZGVkIGFuZCBwYXNzd29yZCBoYXMgYmVlbiBzZW50IHRvIFwiICtcbiAgICAgICAgICAgICAgICBlbWFpbCArXG4gICAgICAgICAgICAgICAgXCIgLlwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBnZXRBbGxVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgIG1vZGVsOiBkYi51c2VyLCAvLyBJbmNsdWRlIHRow7RuZyB0aW4gY+G7p2EgbmfGsOG7nWkgcXXhuqNuIGzDvSAodXNlciBtYW5hZ2VyKSB04burIGPDuW5nIGLhuqNuZyBVc2VyXG4gICAgICAgICAgYXM6IFwidXNlck1hbmFnZXJcIiwgLy8gQWxpYXMgY2hvIG3hu5FpIHF1YW4gaOG7h1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCJdLCAvLyBDaOG7iSBs4bqleSBjw6FjIHRodeG7mWMgdMOtbmggaWQgdsOgIG5hbWUgY+G7p2EgbmfGsOG7nWkgcXXhuqNuIGzDvVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdXNlciB9KTtcbiAgICAgICAgfSBlbHNlIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGdldEFsbExlYWRlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kQWxsKHsgd2hlcmU6IHsgcm9sZTogXCJsZWFkZXJcIiB9IH0pXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHVzZXIgfSk7XG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIHVzZXJVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGZpcnN0TmFtZSxcbiAgICAgIGxhc3ROYW1lLFxuICAgICAgZW1haWwsXG4gICAgICBhZGRyZXNzLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByb2xlLFxuICAgICAgdmVyaWZ5LFxuICAgICAgcGhvbmUsXG4gICAgICBzdGF0dXMsXG4gICAgICBub3RlLFxuICAgICAgdXNlcl9pZCxcbiAgICAgIGF2YXRhcixcbiAgICAgIHVzZXJfbWFuYWdlcixcbiAgICB9ID0gcmVxLmJvZHk7XG4gICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCA/IHBhc3N3b3JkIDogXCJcIik7XG4gICAgZGIudXNlclxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAudGhlbigodXNlcikgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiVXNlciBpcyBub3QgZm91bmRcIiwgNDA5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmlyc3ROYW1lOiBmaXJzdE5hbWUgPyBmaXJzdE5hbWUgOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lIDogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCA/IHBhc3N3b3JkSGFzaCA6IHVzZXIucGFzc3dvcmQsXG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICAgIHJvbGU6IHJvbGUgPyByb2xlIDogdXNlci5yb2xlLFxuICAgICAgICAgICAgZW1haWw6IGVtYWlsID8gZW1haWwgOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgLy8gdmVyaWZ5IDogc3RhdHVzPyBzdGF0dXM6IHVzZXIudmVyaWZ5LFxuICAgICAgICAgICAgcGhvbmU6IHBob25lID8gcGhvbmUgOiB1c2VyLnBob25lLFxuICAgICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxuICAgICAgICAgICAgdXNlcl9pZDogdXNlcl9pZCA/IHVzZXJfaWQgOiBcIlwiLFxuICAgICAgICAgICAgYXZhdGFyOiBhdmF0YXIgPyBhdmF0YXIgOiBcIlwiLFxuICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMgPyBwYXJzZUludChzdGF0dXMpIDogMCxcbiAgICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IGlkIH0gfVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVc2VyIHVwZGF0ZSBzdWNjZXNzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIC8vIGFzeW5jIGxvZ2luKHJlcSwgcmVzLCBuZXh0KSB7XG4gIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gIC8vICAgICB2YXIgdG9rZW4gPSBKV1RTaWduKHJlcS51c2VyLCBkYXRlKTtcbiAgLy8gICAgIHJlcy5jb29raWUoJ1hTUkYtdG9rZW4nLHRva2VuLCB7XG4gIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gIC8vICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgLy8gICAgIH0pO1xuXG4gIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbiwgcm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAvLyB9LFxuICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBkZXZpY2VDb2RlIH0gPSByZXEuYm9keTtcbiAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgLy8gY29uc29sZS5sb2coYmNyeXB0Lmhhc2hTeW5jKHBhc3N3b3JkKSlcbiAgICBjb25zdCBmaW5kVXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7XG4gICAgICB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpIH0sXG4gICAgfSk7XG4gICAgaWYgKGZpbmRVc2VyPy52ZXJpZnkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgIH0gZWxzZSBpZiAoZmluZFVzZXI/LnZlcmlmeSkge1xuICAgICAgaWYgKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBkZXZpY2UxQ29kZSA9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKTtcbiAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoXG4gICAgICAgICAgeyBkZXZpY2UxOiBkZXZpY2UxQ29kZSB9LFxuICAgICAgICAgIHsgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSB9IH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcbiAgICAgICAgICB7IHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQgfSxcbiAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxuICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLFxuICAgICAgICAgICAgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUsXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoIDw9IDAgJiZcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBjb25zdCBkZXZpY2UyQ29kZSA9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKTtcbiAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoXG4gICAgICAgICAgeyBkZXZpY2UyOiBkZXZpY2UyQ29kZSB9LFxuICAgICAgICAgIHsgd2hlcmU6IHsgcGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSB9IH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKV1Quc2lnbihcbiAgICAgICAgICB7IHVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQgfSxcbiAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLFxuICAgICAgICAgICAgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLFxuICAgICAgICAgICAgZGV2aWNlQ29kZTogZGV2aWNlMkNvZGUsXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiZcbiAgICAgICAgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZGV2aWNlMUNvZGUgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRldmljZTFDb2RlKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRiLnVzZXIudXBkYXRlKFxuICAgICAgICAgIHsgZGV2aWNlMTogZGV2aWNlMUNvZGUgfSxcbiAgICAgICAgICB7IHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCkgfSB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IEpXVC5zaWduKFxuICAgICAgICAgIHsgdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCB9LFxuICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXG4gICAgICAgICAgICBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsXG4gICAgICAgICAgICBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSxcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwICYmXG4gICAgICAgIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UxID0gYXdhaXQgZGIudXNlci5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogeyBwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UxOiBkZXZpY2VDb2RlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTIgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IHBob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTI6IGRldmljZUNvZGUgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gSldULnNpZ24oXG4gICAgICAgICAgeyB1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkIH0sXG4gICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVFxuICAgICAgICApO1xuICAgICAgICBpZiAoZmluZFVzZXJkZXZpY2UxPy5lbWFpbCB8fCBmaW5kVXNlcmRldmljZTI/LmVtYWlsKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coNSk7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgICBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsXG4gICAgICAgICAgICAgIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgZGV2aWNlQ29kZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKDYpO1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbG9naW46IGZhbHNlLCB0aGlyZDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGZpbmRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIudXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgXCJmaXJzdE5hbWVcIixcbiAgICAgICAgICBcImxhc3ROYW1lXCIsXG4gICAgICAgICAgXCJlbWFpbFwiLFxuICAgICAgICAgIFwiYXZhdGFyXCIsXG4gICAgICAgICAgXCJwaG9uZVwiLFxuICAgICAgICAgIFwiYWRkcmVzc1wiLFxuICAgICAgICAgIFwicm9sZVwiLFxuICAgICAgICAgIFwidXNlcl9tYW5hZ2VyXCIsXG4gICAgICAgIF0sXG4gICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnk/LnVzZXJfaWQgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihhc3luYyAodXNlcikgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgIGlmICh1c2VyLmRhdGFWYWx1ZXM/LnVzZXJfbWFuYWdlcikge1xuICAgICAgICAgICAgY29uc3QgdXNlck1hbmFnZXIgPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgICB3aGVyZTogeyBpZDogdXNlci5kYXRhVmFsdWVzLnVzZXJfbWFuYWdlciB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkYXRhOiB1c2VyLFxuICAgICAgICAgICAgICAgIGRhdGFNYW5hZ2VyOiB1c2VyTWFuYWdlcixcbiAgICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB1c2VyLCBvazogdHJ1ZSwgZGF0YU1hbmFnZXI6IG51bGwgfSk7XG4gICAgICAgIH0gZWxzZSByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnVzZXJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnVzZXJcbiAgICAgICAgICAgIC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSlcbiAgICAgICAgICAgIC50aGVuKChyKSA9PiBbciwgZGF0YV0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJVc2VyIGlzIG5vdCBmb3VuZFwiLCA0MDkpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCB1c2VybGlzdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgdmVyaWZ5TWFpbChyZXEsIHJlcykge1xuICAgIHRyeSB7XG4gICAgICAvLyBOaOG6rW4gZW1haWwgdOG7qyByZXF1ZXN0IGJvZHlcbiAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBmaXJzdE5hbWUgfSA9IHJlcS5ib2R5O1xuXG4gICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuXG4gICAgICAvLyBD4bqldSBow6xuaCB0aMO0bmcgdGluIG1haWwgc2VydmVyIChkw7luZyBHbWFpbCBsw6BtIHbDrSBk4bulKVxuICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gICAgICAgIHNlcnZpY2U6IFwiZ21haWxcIixcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgIHVzZXI6IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQsIC8vIFRoYXkgYuG6sW5nIG3huq10IGto4bqpdSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEPhuqV1IGjDrG5oIG7hu5lpIGR1bmcgZW1haWxcbiAgICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgdG86IGVtYWlsLCAvLyDEkOG7i2EgY2jhu4kgZW1haWwgbmfGsOG7nWkgZMO5bmcgY+G6p24geMOhYyB0aOG7sWNcbiAgICAgICAgc3ViamVjdDogXCJFbWFpbCBWZXJpZmljYXRpb25cIiwgLy8gVGnDqnUgxJHhu4EgZW1haWxcbiAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5VUkxfRlJPTlRFTkR9L3NpZ251cC9zdWNjZXNzXCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU4OWZmOyBjb2xvcjogI2ZmZjsgd2lkdGg6IDEwMCVcIj5DbGljayBoZXJlIHRvIGNvbXBsZXRlIHNpbmd1cCBwcm9jZXNzPC9hPlxuICAgICAgICAgICAgICAgIGAsIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgfTtcblxuICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFjhu60gbMO9IGzhu5dpIG7hur91IGPDs1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOlwiLCBlcnJvcik7XG4gICAgICByZXNcbiAgICAgICAgLnN0YXR1cyg1MDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkVycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsXCIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBQyxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUcsT0FBQSxHQUFBRCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUksT0FBQSxHQUFBRixzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQUssYUFBQSxHQUFBSCxzQkFBQSxDQUFBRixPQUFBO0FBQ0EsSUFBQU0sVUFBQSxHQUFBSixzQkFBQSxDQUFBRixPQUFBO0FBRUEsSUFBQU8sR0FBQSxHQUFBTCxzQkFBQSxDQUFB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