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
      var _req$body, firstName, lastName, phoneNo, email, address, password, role, verify, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNo = _req$body.phoneNo, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify;
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
                phoneNo: phoneNo,
                address: address,
                password: passwordHash,
                verify: verify,
                role: role
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
      var _req$body2, id, firstName, lastName, email, address, password, role, verify, passwordHash;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, address = _req$body2.address, password = _req$body2.password, role = _req$body2.role, verify = _req$body2.verify;
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
                verify: verify ? verify : user.verify
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
            if (!findUser) {
              _context5.next = 53;
              break;
            }
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device = findUser.device1) === null || _findUser$device === void 0 ? void 0 : _findUser$device.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device2 = findUser.device2) === null || _findUser$device2 === void 0 ? void 0 : _findUser$device2.length) > 0)) {
              _context5.next = 14;
              break;
            }
            console.log(1);
            device1Code = generateRandomString(10);
            _context5.next = 10;
            return _models.db.user.update({
              device1: device1Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 10:
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
          case 14:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device3 = findUser.device2) === null || _findUser$device3 === void 0 ? void 0 : _findUser$device3.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device4 = findUser.device1) === null || _findUser$device4 === void 0 ? void 0 : _findUser$device4.length) > 0)) {
              _context5.next = 23;
              break;
            }
            console.log(2);
            device2Code = generateRandomString(10);
            _context5.next = 19;
            return _models.db.user.update({
              device2: device2Code
            }, {
              where: {
                phone: email,
                password: (0, _md["default"])(password)
              }
            });
          case 19:
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
          case 23:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device5 = findUser.device1) === null || _findUser$device5 === void 0 ? void 0 : _findUser$device5.length) <= 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device6 = findUser.device2) === null || _findUser$device6 === void 0 ? void 0 : _findUser$device6.length) <= 0)) {
              _context5.next = 35;
              break;
            }
            console.log(3);
            _device1Code = generateRandomString(10);
            console.log(_device1Code);
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
          case 35:
            if (!((findUser === null || findUser === void 0 ? void 0 : (_findUser$device7 = findUser.device2) === null || _findUser$device7 === void 0 ? void 0 : _findUser$device7.length) > 0 && (findUser === null || findUser === void 0 ? void 0 : (_findUser$device8 = findUser.device1) === null || _findUser$device8 === void 0 ? void 0 : _findUser$device8.length) > 0)) {
              _context5.next = 51;
              break;
            }
            console.log(4);
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
  deleteUserList: function deleteUserList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
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
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  verifyMail: function verifyMail(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body4, email, password, firstName, transporter, mailOptions;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
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
            _context7.next = 6;
            return transporter.sendMail(mailOptions);
          case 6:
            // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
            res.json({
              success: true
            });
            _context7.next = 13;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            // Xử lý lỗi nếu có
            console.error('Error sending verification email:', _context7.t0);
            res.status(500).json({
              success: false,
              error: 'Error sending verification email'
            });
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 9]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmVObyIsImVtYWlsIiwiYWRkcmVzcyIsInBhc3N3b3JkIiwicm9sZSIsInBhc3N3b3JkSGFzaCIsIm90cCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImJvZHkiLCJtZDUiLCJjb25zb2xlIiwibG9nIiwiZGIiLCJmaW5kT25lIiwid2hlcmUiLCJwYXJhbm9pZCIsInRoZW4iLCJmaW5kIiwic3RhdHVzIiwianNvbiIsImNyZWF0ZSIsIm1haWxlciIsInNlbmRFbXBsb3llZVBhc3N3b3JkIiwic3VjY2VzcyIsImtleSIsIm1zZyIsImVyciIsInN0b3AiLCJmaW5kVXNlciIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYXR0cmlidXRlcyIsInF1ZXJ5IiwidXNlcl9pZCIsImRhdGEiLCJvayIsImdldEFsbFVzZXJMaXN0IiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kQWxsIiwidXNlclVwZGF0ZSIsIl9jYWxsZWU0IiwiX3JlcSRib2R5MiIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIlJlcXVlc3RFcnJvciIsInVwZGF0ZSIsImxvZ2luIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkzIiwiZGV2aWNlQ29kZSIsIl9maW5kVXNlciRkZXZpY2UiLCJfZmluZFVzZXIkZGV2aWNlMiIsIl9maW5kVXNlciRkZXZpY2UzIiwiX2ZpbmRVc2VyJGRldmljZTQiLCJfZmluZFVzZXIkZGV2aWNlNSIsIl9maW5kVXNlciRkZXZpY2U2IiwiX2ZpbmRVc2VyJGRldmljZTciLCJfZmluZFVzZXIkZGV2aWNlOCIsImRldmljZTFDb2RlIiwiZGV2aWNlMkNvZGUiLCJfdG9rZW4iLCJfZGV2aWNlMUNvZGUiLCJfdG9rZW4yIiwiZmluZFVzZXJkZXZpY2UxIiwiZmluZFVzZXJkZXZpY2UyIiwiX3Rva2VuMyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInBob25lIiwic2VudCIsImRldmljZTEiLCJkZXZpY2UyIiwidWlkIiwiZGF0YVZhbHVlcyIsImFicnVwdCIsImF1aWQiLCJ0aGlyZCIsImRlbGV0ZVVzZXJMaXN0IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZXN0cm95IiwiciIsInJlIiwidmVyaWZ5TWFpbCIsIl9jYWxsZWU3IiwiX3JlcSRib2R5NCIsInRyYW5zcG9ydGVyIiwibWFpbE9wdGlvbnMiLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJub2RlbWFpbGVyIiwiY3JlYXRlVHJhbnNwb3J0Iiwic2VydmljZSIsImF1dGgiLCJNQUlMX1VTRVJOQU1FIiwicGFzcyIsIk1BSUxfUEFTU1dPUkQiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsImNvbmNhdCIsIlVSTF9GUk9OVEVORCIsInNlbmRNYWlsIiwidDAiLCJlcnJvciIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9hdXRoL2F1dGguY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gJy4uLy4uLy4uL21vZGVscyc7XG5pbXBvcnQgSldUIGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgbWFpbGVyIGZyb20gJy4uLy4uLy4uL21haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdC1ub2RlanMnO1xuaW1wb3J0IHNwZWFrZWFzeSBmcm9tICdzcGVha2Vhc3knO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGVFbWFpbCB9IGZyb20gJy4vLi4vLi4vLi4vZnVuY3Rpb25zJ1xuaW1wb3J0IG1kNSBmcm9tIFwibWQ1XCJcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCJcblxudmFyIEpXVFNpZ24gPSBmdW5jdGlvbiAodXNlciwgZGF0ZSkge1xuICAgIHJldHVybiBKV1Quc2lnbih7XG4gICAgICAgIGlzczogY29uZmlnLmFwcC5uYW1lLFxuICAgICAgICBzdWI6IHVzZXIuaWQsXG4gICAgICAgIGlhbSA6IHVzZXIudHlwZSxcbiAgICAgICAgaWF0OiBkYXRlLmdldFRpbWUoKSxcbiAgICAgICAgZXhwOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMClcbiAgICB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21TdHJpbmcobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVPdHAoKSB7XG4gICAgbGV0IHRva2VuID0gc3BlYWtlYXN5LnRvdHAoe1xuICAgICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk9UUF9LRVksXG4gICAgICAgIGVuY29kaW5nOiAnYmFzZTMyJyxcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKVxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5T3RwKHRva2VuKSB7XG4gICAgbGV0IGV4cGlyeSA9IHNwZWFrZWFzeS50b3RwLnZlcmlmeSh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHN0ZXA6ICgzMCAtIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wICUgMzApKSksXG4gICAgICAgIHdpbmRvdzogMFxuICAgIH0pO1xuICAgIHJldHVybiBleHBpcnlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXN5bmMgYWRkVXNlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIHBob25lTm8sIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkSGFzaClcbiAgICAgICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICAgICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKGZpbmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuanNvbihcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBob25lTm86IHBob25lTm8sXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeTogdmVyaWZ5LFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWxlci5zZW5kRW1wbG95ZWVQYXNzd29yZChlbWFpbCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBrZXk6IG90cCwgbXNnOiBcIk5ldyBSZWdpc3RyYXRpb24gYWRkZWQgYW5kIHBhc3N3b3JkIGhhcyBiZWVuIHNlbnQgdG8gXCIgKyBlbWFpbCArIFwiIC5cIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFzeW5jIGZpbmRVc2VyKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IGF0dHJpYnV0ZXM6W1wiZmlyc3ROYW1lXCIsXCJsYXN0TmFtZVwiLCBcImVtYWlsXCJdLCB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LnVzZXJfaWQgfX0pXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXIsIG9rOiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgIGFzeW5jIGdldEFsbFVzZXJMaXN0KHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGRiLnVzZXIuZmluZEFsbCgpXG4gICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOnVzZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgdXNlclVwZGF0ZShyZXEscmVzLG5leHQpe1xuICAgICAgICBjb25zdCB7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgYWRkcmVzcywgcGFzc3dvcmQsIHJvbGUsIHZlcmlmeSB9ID0gcmVxLmJvZHk7XG4gICAgICAgIHZhciBwYXNzd29yZEhhc2ggPSBtZDUocGFzc3dvcmQpO1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbDogZW1haWwgfSwgcGFyYW5vaWQ6IGZhbHNlIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSA/IGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZSA/IGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQgPyBwYXNzd29yZEhhc2g6IHVzZXIucGFzc3dvcmRIYXNoLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcm9sZSA/IHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5IDogdmVyaWZ5PyB2ZXJpZnk6IHVzZXIudmVyaWZ5XG4gICAgICAgICAgICAgICAgfSwgeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVzZXIgdXBkYXRlIHN1Y2Nlc3NzZnVsbHlcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgLy8gYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIC8vICAgICB2YXIgdG9rZW4gPSBKV1RTaWduKHJlcS51c2VyLCBkYXRlKTtcbiAgICAvLyAgICAgcmVzLmNvb2tpZSgnWFNSRi10b2tlbicsdG9rZW4sIHtcbiAgICAvLyAgICAgICAgIGV4cGlyZTogbmV3IERhdGUoKS5zZXRNaW51dGVzKGRhdGUuZ2V0TWludXRlcygpICsgMzApLFxuICAgIC8vICAgICAgICAgaHR0cE9ubHk6IHRydWUsIHNlY3VyZTogY29uZmlnLmFwcC5zZWN1cmVcbiAgICAvLyAgICAgfSk7XG4gICAgICAgIFxuICAgIC8vICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlICx0b2tlbiwgcm9sZTogcmVxLnVzZXIucm9sZX0pO1xuICAgIC8vIH0sXG4gICAgYXN5bmMgbG9naW4ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCwgZGV2aWNlQ29kZSB9PSByZXEuYm9keVxuICAgICAgICAvLyB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQpKVxuICAgICAgICBjb25zdCBmaW5kVXNlcj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgaWYoZmluZFVzZXIpIHtcbiAgICAgICAgICAgIGlmKGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgICAgICAgY29uc3QgZGV2aWNlMUNvZGU9IGdlbmVyYXRlUmFuZG9tU3RyaW5nKDEwKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRiLnVzZXIudXBkYXRlKHtkZXZpY2UxOiBkZXZpY2UxQ29kZX0sIHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCl9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDIpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UyQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTI6IGRldmljZTJDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UyQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDMpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UxQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlMUNvZGUpXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YT0gYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTE6IGRldmljZTFDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTFDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMj8ubGVuZ3RoID4gMCAmJiBmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDQpXG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UxPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMTogZGV2aWNlQ29kZX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRVc2VyZGV2aWNlMj0gYXdhaXQgZGIudXNlci5maW5kT25lKHt3aGVyZToge3Bob25lOiBlbWFpbCwgcGFzc3dvcmQ6IG1kNShwYXNzd29yZCksIGRldmljZTI6IGRldmljZUNvZGV9fSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIGlmKGZpbmRVc2VyZGV2aWNlMT8uZW1haWwgfHwgZmluZFVzZXJkZXZpY2UyPy5lbWFpbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg1KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyg2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBsb2dpbjogZmFsc2UsIHRoaXJkOiB0cnVlfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICBhc3luYyBkZWxldGVVc2VyTGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi51c2VyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWR9IH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5ib2R5LmlkIH0gfSkudGhlbihyID0+IFtyLCBkYXRhXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignVXNlciBpcyBub3QgZm91bmQnLCA0MDkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgdXNlcmxpc3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIHZlcmlmeU1haWwocmVxLCByZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIE5o4bqtbiBlbWFpbCB04burIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIGZpcnN0TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgXG4gICAgICAgICAgICAvLyBU4bqhbyBt4buZdCBtw6MgeMOhYyB0aOG7sWMgbmfhuqt1IG5oacOqblxuICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIHRow7RuZyB0aW4gbWFpbCBzZXJ2ZXIgKGTDuW5nIEdtYWlsIGzDoG0gdsOtIGThu6UpXG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnZ21haWwnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuTUFJTF9VU0VSTkFNRSwgLy8gVGhheSBi4bqxbmcgxJHhu4thIGNo4buJIGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52Lk1BSUxfUEFTU1dPUkQgLy8gVGhheSBi4bqxbmcgbeG6rXQga2jhuql1IGVtYWlsIGPhu6dhIGLhuqFuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAvLyBD4bqldSBow6xuaCBu4buZaSBkdW5nIGVtYWlsXG4gICAgICAgICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmcm9tOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB0bzogZW1haWwsIC8vIMSQ4buLYSBjaOG7iSBlbWFpbCBuZ8aw4budaSBkw7luZyBj4bqnbiB4w6FjIHRo4buxY1xuICAgICAgICAgICAgICAgIHN1YmplY3Q6ICdFbWFpbCBWZXJpZmljYXRpb24nLCAvLyBUacOqdSDEkeG7gSBlbWFpbFxuICAgICAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cHJvY2Vzcy5lbnYuVVJMX0ZST05URU5EfS9zaWdudXAvc3VjY2Vzc1wiIHN0eWxlPVwicGFkZGluZzogMTBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogIzJlODlmZjsgY29sb3I6ICNmZmY7IHdpZHRoOiAxMDAlXCI+Q2xpY2sgaGVyZSB0byBjb21wbGV0ZSBzaW5ndXAgcHJvY2VzczwvYT5cbiAgICAgICAgICAgICAgICBgIC8vIE7hu5lpIGR1bmcgZW1haWwgY2jhu6lhIG3DoyB4w6FjIHRo4buxY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gR+G7rWkgZW1haWxcbiAgICAgICAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIFRy4bqjIHbhu4EgbcOjIHjDoWMgdGjhu7FjIMSR4buDIHPhu60gZOG7pW5nIHNhdSBuw6B5ICh2w60gZOG7pSDEkeG7gyBraeG7g20gdHJhIG3DoyBraGkgbmfGsOG7nWkgZMO5bmcgbmjhuq1wIHbDoG8pXG4gICAgICAgICAgICByZXMuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBY4butIGzDvSBs4buXaSBu4bq/dSBjw7NcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgdmVyaWZpY2F0aW9uIGVtYWlsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWwnIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iXSwi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