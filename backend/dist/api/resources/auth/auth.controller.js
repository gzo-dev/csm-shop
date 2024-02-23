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
      var _req$body, firstName, lastName, phone, email, address, password, role, verify, passwordHash, token, otp;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, verify = _req$body.verify;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9qc29ud2VidG9rZW4iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX21haWxlciIsIl9jb25maWciLCJfYmNyeXB0Tm9kZWpzIiwiX3NwZWFrZWFzeSIsIl9tZCIsIl9ub2RlbWFpbGVyIiwiSldUU2lnbiIsInVzZXIiLCJkYXRlIiwiSldUIiwic2lnbiIsImlzcyIsImNvbmZpZyIsImFwcCIsIm5hbWUiLCJzdWIiLCJpZCIsImlhbSIsInR5cGUiLCJpYXQiLCJnZXRUaW1lIiwiZXhwIiwiRGF0ZSIsInNldE1pbnV0ZXMiLCJnZXRNaW51dGVzIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImxlbmd0aCIsImNoYXJhY3RlcnMiLCJyZXN1bHQiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlT3RwIiwidG9rZW4iLCJzcGVha2Vhc3kiLCJ0b3RwIiwic2VjcmV0IiwiT1RQX0tFWSIsImVuY29kaW5nIiwic3RlcCIsInZlcmlmeU90cCIsImV4cGlyeSIsInZlcmlmeSIsIndpbmRvdyIsIl9kZWZhdWx0IiwiYWRkVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIl9yZXEkYm9keSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmUiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJwYXNzd29yZEhhc2giLCJvdHAiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwibWQ1IiwiY29uc29sZSIsImxvZyIsImRiIiwiZmluZE9uZSIsIndoZXJlIiwicGFyYW5vaWQiLCJ0aGVuIiwiZmluZCIsInN0YXR1cyIsImpzb24iLCJjcmVhdGUiLCJtYWlsZXIiLCJzZW5kRW1wbG95ZWVQYXNzd29yZCIsInN1Y2Nlc3MiLCJrZXkiLCJtc2ciLCJlcnIiLCJzdG9wIiwiZmluZFVzZXIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImF0dHJpYnV0ZXMiLCJxdWVyeSIsInVzZXJfaWQiLCJkYXRhIiwib2siLCJnZXRBbGxVc2VyTGlzdCIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZEFsbCIsInVzZXJVcGRhdGUiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJsb2dpbiIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MyIsImRldmljZUNvZGUiLCJfZmluZFVzZXIkZGV2aWNlIiwiX2ZpbmRVc2VyJGRldmljZTIiLCJfZmluZFVzZXIkZGV2aWNlMyIsIl9maW5kVXNlciRkZXZpY2U0IiwiX2ZpbmRVc2VyJGRldmljZTUiLCJfZmluZFVzZXIkZGV2aWNlNiIsIl9maW5kVXNlciRkZXZpY2U3IiwiX2ZpbmRVc2VyJGRldmljZTgiLCJkZXZpY2UxQ29kZSIsImRldmljZTJDb2RlIiwiX3Rva2VuIiwiX2RldmljZTFDb2RlIiwiX3Rva2VuMiIsImZpbmRVc2VyZGV2aWNlMSIsImZpbmRVc2VyZGV2aWNlMiIsIl90b2tlbjMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJzZW50IiwiZGV2aWNlMSIsImRldmljZTIiLCJ1aWQiLCJkYXRhVmFsdWVzIiwiYWJydXB0IiwiYXVpZCIsInRoaXJkIiwiZGVsZXRlVXNlckxpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImRlc3Ryb3kiLCJyIiwicmUiLCJ2ZXJpZnlNYWlsIiwiX2NhbGxlZTciLCJfcmVxJGJvZHk0IiwidHJhbnNwb3J0ZXIiLCJtYWlsT3B0aW9ucyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsIk1BSUxfVVNFUk5BTUUiLCJwYXNzIiwiTUFJTF9QQVNTV09SRCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwiY29uY2F0IiwiVVJMX0ZST05URU5EIiwic2VuZE1haWwiLCJ0MCIsImVycm9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2F1dGgvYXV0aC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzJztcbmltcG9ydCBKV1QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBtYWlsZXIgZnJvbSAnLi4vLi4vLi4vbWFpbGVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vY29uZmlnJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0LW5vZGVqcyc7XG5pbXBvcnQgc3BlYWtlYXN5IGZyb20gJ3NwZWFrZWFzeSc7XG4vLyBpbXBvcnQgeyB2YWxpZGF0ZUVtYWlsIH0gZnJvbSAnLi8uLi8uLi8uLi9mdW5jdGlvbnMnXG5pbXBvcnQgbWQ1IGZyb20gXCJtZDVcIlxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIlxuXG52YXIgSldUU2lnbiA9IGZ1bmN0aW9uICh1c2VyLCBkYXRlKSB7XG4gICAgcmV0dXJuIEpXVC5zaWduKHtcbiAgICAgICAgaXNzOiBjb25maWcuYXBwLm5hbWUsXG4gICAgICAgIHN1YjogdXNlci5pZCxcbiAgICAgICAgaWFtIDogdXNlci50eXBlLFxuICAgICAgICBpYXQ6IGRhdGUuZ2V0VGltZSgpLFxuICAgICAgICBleHA6IG5ldyBEYXRlKCkuc2V0TWludXRlcyhkYXRlLmdldE1pbnV0ZXMoKSArIDMwKVxuICAgIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW5ndGgpIHtcbiAgICBjb25zdCBjaGFyYWN0ZXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZU90cCgpIHtcbiAgICBsZXQgdG9rZW4gPSBzcGVha2Vhc3kudG90cCh7XG4gICAgICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuT1RQX0tFWSxcbiAgICAgICAgZW5jb2Rpbmc6ICdiYXNlMzInLFxuICAgICAgICBzdGVwOiAoMzAgLSBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCAlIDMwKSkpXG4gICAgfSk7XG4gICAgcmV0dXJuIHRva2VuO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlPdHAodG9rZW4pIHtcbiAgICBsZXQgZXhwaXJ5ID0gc3BlYWtlYXN5LnRvdHAudmVyaWZ5KHtcbiAgICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5PVFBfS0VZLFxuICAgICAgICBlbmNvZGluZzogJ2Jhc2UzMicsXG4gICAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgICAgc3RlcDogKDMwIC0gTWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjAgJSAzMCkpKSxcbiAgICAgICAgd2luZG93OiAwXG4gICAgfSk7XG4gICAgcmV0dXJuIGV4cGlyeVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBhZGRVc2VyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgcGhvbmUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhc3N3b3JkSGFzaClcbiAgICAgICAgdmFyIHRva2VuID0gZ2VuZXJhdGVPdHAoKTtcbiAgICAgICAgdmFyIG90cCA9IHZlcmlmeU90cCh0b2tlbik7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKGZpbmQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwOSkuanNvbihcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGIudXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiB2ZXJpZnksXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHJvbGVcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbGVyLnNlbmRFbXBsb3llZVBhc3N3b3JkKGVtYWlsLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGtleTogb3RwLCBtc2c6IFwiTmV3IFJlZ2lzdHJhdGlvbiBhZGRlZCBhbmQgcGFzc3dvcmQgaGFzIGJlZW4gc2VudCB0byBcIiArIGVtYWlsICsgXCIgLlwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZmluZFVzZXIocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kT25lKHsgYXR0cmlidXRlczpbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCIsIFwiZW1haWxcIl0sIHdoZXJlOiB7IGlkOiByZXEucXVlcnkudXNlcl9pZCB9fSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlciwgb2s6IHRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAgYXN5bmMgZ2V0QWxsVXNlckxpc3QocmVxLHJlcyxuZXh0KXtcbiAgICAgICAgZGIudXNlci5maW5kQWxsKClcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6dXNlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgICBhc3luYyB1c2VyVXBkYXRlKHJlcSxyZXMsbmV4dCl7XG4gICAgICAgIGNvbnN0IHsgaWQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBhZGRyZXNzLCBwYXNzd29yZCwgcm9sZSwgdmVyaWZ5IH0gPSByZXEuYm9keTtcbiAgICAgICAgdmFyIHBhc3N3b3JkSGFzaCA9IG1kNShwYXNzd29yZCk7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGVtYWlsOiBlbWFpbCB9LCBwYXJhbm9pZDogZmFsc2UgfSlcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZmlyc3ROYW1lID8gZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lID8gbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCA/IHBhc3N3b3JkSGFzaDogdXNlci5wYXNzd29yZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogdXNlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiByb2xlID8gcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgICAgICAgICB2ZXJpZnkgOiB2ZXJpZnk/IHZlcmlmeTogdXNlci52ZXJpZnlcbiAgICAgICAgICAgICAgICB9LCB7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXNlciB1cGRhdGUgc3VjY2Vzc3NmdWxseVwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICAvLyBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgIC8vICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgLy8gICAgIHZhciB0b2tlbiA9IEpXVFNpZ24ocmVxLnVzZXIsIGRhdGUpO1xuICAgIC8vICAgICByZXMuY29va2llKCdYU1JGLXRva2VuJyx0b2tlbiwge1xuICAgIC8vICAgICAgICAgZXhwaXJlOiBuZXcgRGF0ZSgpLnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkgKyAzMCksXG4gICAgLy8gICAgICAgICBodHRwT25seTogdHJ1ZSwgc2VjdXJlOiBjb25maWcuYXBwLnNlY3VyZVxuICAgIC8vICAgICB9KTtcbiAgICAgICAgXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUgLHRva2VuLCByb2xlOiByZXEudXNlci5yb2xlfSk7XG4gICAgLy8gfSxcbiAgICBhc3luYyBsb2dpbihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBjb25zdCB7ZW1haWwsIHBhc3N3b3JkLCBkZXZpY2VDb2RlIH09IHJlcS5ib2R5XG4gICAgICAgIC8vIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCkpXG4gICAgICAgIGNvbnN0IGZpbmRVc2VyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICBpZihmaW5kVXNlcikge1xuICAgICAgICAgICAgaWYoZmluZFVzZXI/LmRldmljZTE/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coMSlcbiAgICAgICAgICAgICAgICBjb25zdCBkZXZpY2UxQ29kZT0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTApXG4gICAgICAgICAgICAgICAgYXdhaXQgZGIudXNlci51cGRhdGUoe2RldmljZTE6IGRldmljZTFDb2RlfSwge3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgdG9rZW4sIGF1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIHJvbGU6IGZpbmRVc2VyLmRhdGFWYWx1ZXMucm9sZSwgbmFtZTogZmluZFVzZXI/LmZpcnN0TmFtZSArIFwiIFwiICsgZmluZFVzZXI/Lmxhc3ROYW1lLCBkZXZpY2VDb2RlOiBkZXZpY2UxQ29kZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coMilcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTJDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMjogZGV2aWNlMkNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW49IEpXVC5zaWduKHt1aWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWQsIGlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCB0b2tlbiwgYXVpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgcm9sZTogZmluZFVzZXIuZGF0YVZhbHVlcy5yb2xlLCBuYW1lOiBmaW5kVXNlcj8uZmlyc3ROYW1lICsgXCIgXCIgKyBmaW5kVXNlcj8ubGFzdE5hbWUsIGRldmljZUNvZGU6IGRldmljZTJDb2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihmaW5kVXNlcj8uZGV2aWNlMT8ubGVuZ3RoIDw9IDAgJiYgZmluZFVzZXI/LmRldmljZTI/Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coMylcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRldmljZTFDb2RlPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygxMClcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UxQ29kZSlcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhPSBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7ZGV2aWNlMTogZGV2aWNlMUNvZGV9LCB7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpfX0pXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbj0gSldULnNpZ24oe3VpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZCwgaWQ6IGZpbmRVc2VyLmRhdGFWYWx1ZXMuaWR9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZTogZGV2aWNlMUNvZGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGZpbmRVc2VyPy5kZXZpY2UyPy5sZW5ndGggPiAwICYmIGZpbmRVc2VyPy5kZXZpY2UxPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coNClcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5kVXNlcmRldmljZTE9IGF3YWl0IGRiLnVzZXIuZmluZE9uZSh7d2hlcmU6IHtwaG9uZTogZW1haWwsIHBhc3N3b3JkOiBtZDUocGFzc3dvcmQpLCBkZXZpY2UxOiBkZXZpY2VDb2RlfX0pXG4gICAgICAgICAgICAgICAgY29uc3QgZmluZFVzZXJkZXZpY2UyPSBhd2FpdCBkYi51c2VyLmZpbmRPbmUoe3doZXJlOiB7cGhvbmU6IGVtYWlsLCBwYXNzd29yZDogbWQ1KHBhc3N3b3JkKSwgZGV2aWNlMjogZGV2aWNlQ29kZX19KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuPSBKV1Quc2lnbih7dWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCBpZDogZmluZFVzZXIuZGF0YVZhbHVlcy5pZH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpXG4gICAgICAgICAgICAgICAgaWYoZmluZFVzZXJkZXZpY2UxPy5lbWFpbCB8fCBmaW5kVXNlcmRldmljZTI/LmVtYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHRva2VuLCBhdWlkOiBmaW5kVXNlci5kYXRhVmFsdWVzLmlkLCByb2xlOiBmaW5kVXNlci5kYXRhVmFsdWVzLnJvbGUsIG5hbWU6IGZpbmRVc2VyPy5maXJzdE5hbWUgKyBcIiBcIiArIGZpbmRVc2VyPy5sYXN0TmFtZSwgZGV2aWNlQ29kZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKDYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIGxvZ2luOiBmYWxzZSwgdGhpcmQ6IHRydWV9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgIGFzeW5jIGRlbGV0ZVVzZXJMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIGRiLnVzZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5pZH0gfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi51c2VyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkuaWQgfSB9KS50aGVuKHIgPT4gW3IsIGRhdGFdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdVc2VyIGlzIG5vdCBmb3VuZCcsIDQwOSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N0YXR1cyc6IFwiZGVsZXRlZCB1c2VybGlzdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KVxuICAgIH0sXG4gICAgYXN5bmMgdmVyaWZ5TWFpbChyZXEsIHJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTmjhuq1uIGVtYWlsIHThu6sgcmVxdWVzdCBib2R5XG4gICAgICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgZmlyc3ROYW1lIH0gPSByZXEuYm9keTtcbiAgICBcbiAgICAgICAgICAgIC8vIFThuqFvIG3hu5l0IG3DoyB4w6FjIHRo4buxYyBuZ+G6q3Ugbmhpw6puXG4gICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgLy8gQ+G6pXUgaMOsbmggdGjDtG5nIHRpbiBtYWlsIHNlcnZlciAoZMO5bmcgR21haWwgbMOgbSB2w60gZOG7pSlcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIHNlcnZpY2U6ICdnbWFpbCcsXG4gICAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5NQUlMX1VTRVJOQU1FLCAvLyBUaGF5IGLhurFuZyDEkeG7i2EgY2jhu4kgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICAgICAgcGFzczogcHJvY2Vzcy5lbnYuTUFJTF9QQVNTV09SRCAvLyBUaGF5IGLhurFuZyBt4bqtdCBraOG6qXUgZW1haWwgY+G7p2EgYuG6oW5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIC8vIEPhuqV1IGjDrG5oIG7hu5lpIGR1bmcgZW1haWxcbiAgICAgICAgICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZyb206IHByb2Nlc3MuZW52Lk1BSUxfVVNFUk5BTUUsIC8vIFRoYXkgYuG6sW5nIMSR4buLYSBjaOG7iSBlbWFpbCBj4bunYSBi4bqhblxuICAgICAgICAgICAgICAgIHRvOiBlbWFpbCwgLy8gxJDhu4thIGNo4buJIGVtYWlsIG5nxrDhu51pIGTDuW5nIGPhuqduIHjDoWMgdGjhu7FjXG4gICAgICAgICAgICAgICAgc3ViamVjdDogJ0VtYWlsIFZlcmlmaWNhdGlvbicsIC8vIFRpw6p1IMSR4buBIGVtYWlsXG4gICAgICAgICAgICAgICAgaHRtbDogYFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtwcm9jZXNzLmVudi5VUkxfRlJPTlRFTkR9L3NpZ251cC9zdWNjZXNzXCIgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMmU4OWZmOyBjb2xvcjogI2ZmZjsgd2lkdGg6IDEwMCVcIj5DbGljayBoZXJlIHRvIGNvbXBsZXRlIHNpbmd1cCBwcm9jZXNzPC9hPlxuICAgICAgICAgICAgICAgIGAgLy8gTuG7mWkgZHVuZyBlbWFpbCBjaOG7qWEgbcOjIHjDoWMgdGjhu7FjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBH4butaSBlbWFpbFxuICAgICAgICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xuICAgICAgICAgICAgLy8gVHLhuqMgduG7gSBtw6MgeMOhYyB0aOG7sWMgxJHhu4Mgc+G7rSBk4bulbmcgc2F1IG7DoHkgKHbDrSBk4bulIMSR4buDIGtp4buDbSB0cmEgbcOjIGtoaSBuZ8aw4budaSBkw7luZyBuaOG6rXAgdsOgbylcbiAgICAgICAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFjhu60gbMO9IGzhu5dpIG7hur91IGPDs1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyB2ZXJpZmljYXRpb24gZW1haWw6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdFcnJvciBzZW5kaW5nIHZlcmlmaWNhdGlvbiBlbWFpbCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7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