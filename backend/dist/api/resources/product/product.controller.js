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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize;
// import { queue } from '../../../kue';
var _default = {
  /* Add user api start here................................*/getPhotoProduct: function getPhotoProduct(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var productId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            productId = req.query.productId;
            _models.db.productphoto.findAll({
              where: {
                productId: productId
              }
            }).then(function (product) {
              return res.status(200).json({
                ok: true,
                data: product
              });
            });
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  addProduct: function addProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow, rating, note, user_manager, author_phone, address, product_id;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow, rating = _req$body.rating, note = _req$body.note, user_manager = _req$body.user_manager, author_phone = _req$body.author_phone, address = _req$body.address, product_id = _req$body.product_id;
            _models.db.product.create({
              categoryId: categoryId,
              subCategoryId: subCategoryId,
              childCategoryId: childCategoryId || 0,
              name: name,
              slug: slug,
              status: parseInt(status) ? "active" : "inactive",
              brand: brand,
              unitSize: unitSize,
              sortDesc: sortDesc,
              desc: desc,
              buyerPrice: buyerPrice,
              price: price,
              qty: qty,
              discount: discount,
              discountPer: discountPer,
              total: total,
              netPrice: netPrice,
              photo: req.file ? req.file.path : "",
              phoneNumber: phoneNumber,
              province: province,
              district: district,
              ward: ward,
              provinceText: provinceText ? provinceText : "",
              districtText: districtText ? districtText : "",
              wardText: wardText ? wardText : "",
              square: square ? square : 0,
              budget: budget ? budget : 0,
              typeRoom: typeRoom ? typeRoom : "",
              interior: interior ? interior : "",
              endow: endow ? endow : 0,
              rating: rating ? rating : 0,
              note: note ? note : "",
              user_manager: user_manager ? user_manager : "",
              author_phone: author_phone ? author_phone : "",
              address: address ? address : "",
              product_id: product_id ? product_id : ""
            }).then(function (product) {
              var _JSON$parse, _JSON$parse3;
              (_JSON$parse = JSON.parse(image)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.map(function (item) {
                return _models.db.productphoto.create({
                  imgUrl: item === null || item === void 0 ? void 0 : item.path,
                  productId: product.dataValues.id
                });
              });
              if (newaddimage) {
                var _JSON$parse2;
                (_JSON$parse2 = JSON.parse(newaddimage)) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.map(function (item) {
                  return _models.db.productphoto.create({
                    imgUrl: item === null || item === void 0 ? void 0 : item.imageUrl,
                    productId: product.dataValues.id
                  });
                });
              }
              (_JSON$parse3 = JSON.parse(size)) === null || _JSON$parse3 === void 0 ? void 0 : _JSON$parse3.map(function (item) {
                return _models.db.productsize.create({
                  size: item === null || item === void 0 ? void 0 : item.size,
                  productId: product.dataValues.id,
                  amount: item === null || item === void 0 ? void 0 : item.amount
                });
              });
              res.status(200).json({
                success: true,
                msg: "Successfully inserted product"
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context2.next = 8;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0));
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 5]]);
    }))();
  },
  getAllProductCategory: function getAllProductCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$query, subid, id;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query = req.query, subid = _req$query.subid, id = _req$query.id;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }],
              where: {
                categoryId: id,
                subCategoryId: subid
              }
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  },
  index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$query2, supplierId, categoryId, subCategoryId;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$query2 = req.query, supplierId = _req$query2.supplierId, categoryId = _req$query2.categoryId, subCategoryId = _req$query2.subCategoryId;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }],
              where: {
                supplierId: supplierId,
                categoryId: categoryId,
                subCategoryId: subCategoryId
              }
            }).then(function (product) {
              res.status(200).json({
                success: true,
                product: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 8;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 5]]);
    }))();
  },
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.SubCategory,
                attributes: ["id", "sub_name"],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }, {
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                product: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 7;
            break;
          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 4]]);
    }))();
  },
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating, note, user_manager, rent, author_phone, address, photo, province, district, ward, product_id;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow, rating = _req$body2.rating, note = _req$body2.note, user_manager = _req$body2.user_manager, rent = _req$body2.rent, author_phone = _req$body2.author_phone, address = _req$body2.address, photo = _req$body2.photo, province = _req$body2.province, district = _req$body2.district, ward = _req$body2.ward, product_id = _req$body2.product_id;
            _models.db.product.findOne({
              where: {
                id: productId
              }
            }).then(function (product) {
              if (product) {
                return _models.db.product.update({
                  categoryId: categoryId ? categoryId : product.categoryId,
                  subCategoryId: subCategoryId ? subCategoryId : product.subCategoryId,
                  childCategoryId: childCategoryId ? childCategoryId : product.childCategoryId,
                  name: name,
                  slug: slug,
                  status: parseInt(status) ? "active" : "inactive",
                  brand: brand,
                  unitSize: unitSize,
                  desc: desc,
                  buyerPrice: buyerPrice,
                  price: price,
                  qty: qty,
                  discount: discount,
                  discountPer: discountPer,
                  total: total,
                  netPrice: netPrice,
                  photo: photo,
                  phoneNumber: phoneNumber,
                  typeRoom: typeRoom,
                  interior: interior,
                  square: square ? square : 0,
                  endow: endow ? endow : 0,
                  rating: rating ? rating : 0,
                  note: note ? note : "",
                  user_manager: user_manager ? user_manager : "",
                  rent: rent ? rent : "",
                  author_phone: author_phone ? author_phone : "",
                  address: address ? address : "",
                  province: province,
                  district: district,
                  ward: ward,
                  product_id: product_id ? product_id : ""
                }, {
                  where: {
                    id: productId
                  }
                });
              }
              throw new RequestError("Not Found Product", 409);
            }).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(p) {
                var _JSON$parse4;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      if (newaddimage) {
                        (_JSON$parse4 = JSON.parse(newaddimage)) === null || _JSON$parse4 === void 0 ? void 0 : _JSON$parse4.map(function (item) {
                          return _models.db.productphoto.create({
                            imgUrl: item === null || item === void 0 ? void 0 : item.imageUrl,
                            productId: productId
                          });
                        });
                      }
                      if (size) {
                        _models.db.productsize.destroy({
                          where: {
                            productId: productId
                          }
                        });
                        _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref2) {
                          var size = _ref2.size,
                            amount = _ref2.amount;
                          return {
                            size: size,
                            amount: amount,
                            productId: productId
                          };
                        }));
                      }
                      if (!images) {
                        _context6.next = 6;
                        break;
                      }
                      _context6.next = 5;
                      return _models.db.productphoto.destroy({
                        where: {
                          productId: productId
                        }
                      });
                    case 5:
                      _models.db.productphoto.bulkCreate(JSON.parse(images).map(function (item) {
                        return _objectSpread(_objectSpread({}, item), {}, {
                          productId: productId
                        });
                      }));
                    case 6:
                      res.status(200).json({
                        success: true,
                        msg: "Updated Successfully"
                      });
                    case 7:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              next(err);
            });
            _context7.next = 8;
            break;
          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 5]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                categoryId: req.query.categoryId,
                subCategoryId: req.query.subCategoryId
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 7;
            break;
          case 4:
            _context8.prev = 4;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 4]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                categoryId: 12
                // subCategoryId: req.query.subCategoryId,
              },

              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              limit: 4
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context9.next = 7;
            break;
          case 4:
            _context9.prev = 4;
            _context9.t0 = _context9["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 4]]);
    }))();
  },
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                categoryId: 13
                // subCategoryId: req.query.subCategoryId,
              },

              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              limit: 4
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 7;
            break;
          case 4:
            _context10.prev = 4;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 4]]);
    }))();
  },
  getProductSuggest2: function getProductSuggest2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _models.db.product.findAll({
              order: [["DESC"]],
              where: {
                endow: 1
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              limit: 4
            }).then(function (list) {
              res.status(200).json({
                ok: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context11.next = 7;
            break;
          case 4:
            _context11.prev = 4;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 4]]);
    }))();
  },
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _models.db.product.findAll({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }, {
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }],
              order: [["createdAt", "DESC"]]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context12.next = 7;
            break;
          case 4:
            _context12.prev = 4;
            _context12.t0 = _context12["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 4]]);
    }))();
  },
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var size;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context13.sent;
            _models.db.product.findOne({
              where: {
                id: req.query.id
              },
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              order: [["createdAt", "DESC"]]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list,
                datasize: size
              });
            })["catch"](function (err) {
              next(err);
            });
            _context13.next = 10;
            break;
          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _req$body3 = req.body, productId = _req$body3.productId, qty = _req$body3.qty, discount_per = _req$body3.discount_per, discount_price = _req$body3.discount_price, total = _req$body3.total, net_price = _req$body3.net_price;
            _models.db.ProductOffer.findOne({
              where: {
                id: productId
              }
            }).then(function (list) {
              if (!list) {
                return _models.db.ProductOffer.create({
                  productId: productId,
                  image: req.file ? req.file.location : "",
                  qty: qty,
                  discount_per: discount_per,
                  discount_price: discount_price,
                  total: total,
                  net_price: net_price
                });
              } else {
                return _models.db.ProductOffer.update({
                  qty: qty,
                  discount_per: discount_per,
                  discount_price: discount_price,
                  total: total,
                  net_price: net_price
                }, {
                  where: {
                    id: list.id
                  }
                });
              }
            }).then(function (p) {
              res.status(200).json({
                success: true,
                msg: "Successfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context14.next = 8;
            break;
          case 5:
            _context14.prev = 5;
            _context14.t0 = _context14["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _models.db.ProductOffer.findAll({
              include: [{
                model: _models.db.product,
                attributes: ["id", "categoryId", "price", "item_name", "description", "brand"],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context15.next = 7;
            break;
          case 4:
            _context15.prev = 4;
            _context15.t0 = _context15["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 4]]);
    }))();
  },
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: req.body.subCat
              }
            }).then(function (data) {
              if (data) {
                return _models.db.product.findAll({
                  where: {
                    subCategoryId: data.id
                  }
                });
              }
            }).then(function (list) {
              console.log(JSON.stringify(list));
              res.status(200).json({
                success: true,
                data: list
              });
            });
            _context16.next = 7;
            break;
          case 4:
            _context16.prev = 4;
            _context16.t0 = _context16["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 4]]);
    }))();
  },
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _models.db.product.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.product.destroy({
                  where: {
                    id: product.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }))();
  },
  productDeleteBulk: function productDeleteBulk(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _models.db.product.destroy({
              where: {
                id: req.body.list
              }
            }).then(function (re) {
              return res.status(200).json({
                ok: true,
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _models.db.ProductOffer.findOne({
              where: {
                id: parseInt(req.params.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.ProductOffer.destroy({
                  where: {
                    id: product.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            attachmentEntries = [];
            productId = req.body.productId;
            for (i = 0; i < req.files.length; i++) {
              attachmentEntries.push({
                productId: productId,
                name: req.files[i].filename,
                mime: req.files[i].mimetype,
                imgUrl: req.files[i].path
              });
            }
            _models.db.product.findOne({
              where: {
                id: productId
              }
            }).then(function (r) {
              if (r) {
                // return queue.create('img-upload', {
                //     productId: productId,
                //     productName: r.item_name,
                //     attachmentEntries: attachmentEntries,
                // }).save();
                for (var i = 0; i < req.files.length; i++) {
                  _models.db.productphoto.create(_objectSpread({}, attachmentEntries[i]));
                }
              }
            }).then(function (r) {
              res.status(200).json({
                success: true,
                data: req.files
              });
            })["catch"](function (error) {
              console.log(error);
              res.status(500).json({
                errors: ["Error insert photo"]
              });
            });
          case 4:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              attributes: ["id", "name", "brand"],
              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }]
            }).then(function (data) {
              res.status(200).json({
                success: true,
                data: data
              });
            })["catch"](function (err) {
              next(err);
            });
            _context21.next = 7;
            break;
          case 4:
            _context21.prev = 4;
            _context21.t0 = _context21["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _models.db.productphoto.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (product) {
              if (product) {
                return _models.db.productphoto.destroy({
                  where: {
                    id: req.query.id
                  }
                });
              }
              throw new RequestError("Product is not found");
            }).then(function (re) {
              return res.status(200).json({
                status: "deleted Product Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
          case 1:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _models.db.product.findAll({
              // attributes: ["id", "slug"],
              // where: { discount: 'grocery-staple' },
              order: [["discountPer", "DESC"]],
              limit: 8
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product || []
              });
            })["catch"](function (err) {
              next(err);
            });
            _context23.next = 7;
            break;
          case 4:
            _context23.prev = 4;
            _context23.t0 = _context23["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context23.stop();
        }
      }, _callee23, null, [[0, 4]]);
    }))();
  },
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _models.db.category.findOne({
              attributes: ["id"],
              include: [{
                model: _models.db.product,
                order: [["createdAt", "DESC"]],
                include: [{
                  model: _models.db.productphoto,
                  attributes: ["id", "imgUrl"]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context24.next = 7;
            break;
          case 4:
            _context24.prev = 4;
            _context24.t0 = _context24["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context24.stop();
        }
      }, _callee24, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var search;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            search = "%%";
            if (req.query.search) {
              search = "%" + req.query.search + "%";
            }
            _models.db.SubCategory.findAll({
              attributes: ["id", "sub_name"],
              include: [{
                model: _models.db.product,
                order: [["createdAt", "DESC"]],
                required: true,
                where: (0, _defineProperty2["default"])({}, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, search),
                  slug: (0, _defineProperty2["default"])({}, Op.like, search)
                }])
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context25.next = 9;
            break;
          case 6:
            _context25.prev = 6;
            _context25.t0 = _context25["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context25.stop();
        }
      }, _callee25, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: req.body.name
              },
              include: [{
                model: _models.db.SubChildCategory,
                include: [{
                  model: _models.db.product,
                  order: [["createdAt", "DESC"]],
                  include: [{
                    model: _models.db.productphoto,
                    attributes: ["id", "imgUrl"]
                  }]
                }]
              }]
            }).then(function (product) {
              res.status(200).json({
                success: true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context26.next = 7;
            break;
          case 4:
            _context26.prev = 4;
            _context26.t0 = _context26["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context26.stop();
        }
      }, _callee26, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            try {
              _req$body4 = req.body, id = _req$body4.id, imgUrl = _req$body4.imgUrl; // db.productphoto.destroy({where: {imgUrl, id}})
              // deleteFileFromS3(imgUrl)
              _models.db.productphoto.destroy({
                where: {
                  id: id
                }
              }).then(function (success) {
                res.status(200).json({
                  success: true,
                  msg: "Successflly deleted image from s3 Bucket"
                });
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context27.stop();
        }
      }, _callee27);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            try {
              _req$body5 = req.body, subCategoryId = _req$body5.subCategoryId, childCategoryId = _req$body5.childCategoryId;
              _models.db.product.findAll({
                where: {
                  childCategoryId: childCategoryId,
                  subCategoryId: childCategoryId
                }
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                next(err);
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context28.stop();
        }
      }, _callee28);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            try {
              // const{ subCategoryId, childCategoryId } = req.body;
              _models.db.product.findAll({
                // where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
                order: Sequelize.literal("RAND()"),
                limit: 8
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });
            } catch (err) {
              next(err);
              // res.status(500).json({ 'success':false, msg: err})
            }
          case 1:
          case "end":
            return _context29.stop();
        }
      }, _callee29);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      var productId;
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            try {
              productId = req.query.productId;
              _models.db.productsize.findAll({
                where: {
                  productId: productId
                }
              }).then(function (product) {
                res.status(200).json({
                  success: true,
                  data: product
                });
              })["catch"](function (err) {
                console.log(err);
                next(err);
              });
            } catch (err) {
              next(err);
              res.status(500).json({
                success: false,
                msg: err
              });
            }
          case 1:
          case "end":
            return _context30.stop();
        }
      }, _callee30);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiYWRkcmVzcyIsInByb2R1Y3RfaWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJnZXRBbGxQcm9kdWN0Q2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzdWJpZCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIm9yZGVyIiwiaW5jbHVkZSIsIm1vZGVsIiwidXNlciIsImF0dHJpYnV0ZXMiLCJSZXF1ZXN0RXJyb3IiLCJpbmRleCIsIl9jYWxsZWU0IiwiX3JlcSRxdWVyeTIiLCJzdXBwbGllcklkIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsIlN1YkNhdGVnb3J5IiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNyIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJyZW50IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZmluZE9uZSIsIl9yZWYiLCJfY2FsbGVlNiIsInAiLCJfSlNPTiRwYXJzZTQiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYyIiwiX3giLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJnZXRQcm9kdWN0U3VnZ2VzdDIiLCJfY2FsbGVlMTEiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0V2ViUHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJzZW50IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTQiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTE1IiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTYiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwicmUiLCJwcm9kdWN0RGVsZXRlQnVsayIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTE5IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTIwIiwiYXR0YWNobWVudEVudHJpZXMiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsImZpbGVzIiwiZmlsZW5hbWUiLCJtaW1lIiwibWltZXR5cGUiLCJyIiwiZXJyb3IiLCJlcnJvcnMiLCJnZXRBbGxQaG90byIsIl9jYWxsZWUyMSIsIl9jYWxsZWUyMSQiLCJfY29udGV4dDIxIiwiZGVsZXRlU2xpZGVyUGhvdG8iLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsImdldEFsbEdyb2NlcnJ5U3RhcGxlcyIsIl9jYWxsZWUyMyIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiZ2V0QWxsUHJvZHVjdEJ5U2x1ZyIsIl9jYWxsZWUyNCIsIl9jYWxsZWUyNCQiLCJfY29udGV4dDI0IiwiZ2V0RmlsdGVyYnlQcm9kdWN0IiwiX2NhbGxlZTI1Iiwic2VhcmNoIiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJyZXF1aXJlZCIsIm9yIiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMjYiLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMjciLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTI3JCIsIl9jb250ZXh0MjciLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMjgiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTI4JCIsIl9jb250ZXh0MjgiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUyOSIsIl9jYWxsZWUyOSQiLCJfY29udGV4dDI5IiwibGl0ZXJhbCIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTMwIiwiX2NhbGxlZTMwJCIsIl9jb250ZXh0MzAiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XHJcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcclxuLy8gaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuLi8uLi8uLi9rdWUnO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXHJcbiAgYXN5bmMgZ2V0UGhvdG9Qcm9kdWN0KHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNhdGVnb3J5SWQsXHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzbHVnLFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICB1bml0U2l6ZSxcclxuICAgICAgICBzb3J0RGVzYyxcclxuICAgICAgICBkZXNjLFxyXG4gICAgICAgIGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgcHJpY2UsXHJcbiAgICAgICAgcXR5LFxyXG4gICAgICAgIGRpc2NvdW50LFxyXG4gICAgICAgIGRpc2NvdW50UGVyLFxyXG4gICAgICAgIHRvdGFsLFxyXG4gICAgICAgIG5ldFByaWNlLFxyXG4gICAgICAgIGltYWdlLFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgbmV3YWRkaW1hZ2UsXHJcbiAgICAgICAgcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgcHJvdmluY2UsXHJcbiAgICAgICAgZGlzdHJpY3QsXHJcbiAgICAgICAgd2FyZCxcclxuICAgICAgICBzcXVhcmUsXHJcbiAgICAgICAgcHJvdmluY2VUZXh0LFxyXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcclxuICAgICAgICB3YXJkVGV4dCxcclxuICAgICAgICBidWRnZXQsXHJcbiAgICAgICAgdHlwZVJvb20sXHJcbiAgICAgICAgaW50ZXJpb3IsXHJcbiAgICAgICAgZW5kb3csXHJcbiAgICAgICAgcmF0aW5nLFxyXG4gICAgICAgIG5vdGUsXHJcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxyXG4gICAgICAgIGF1dGhvcl9waG9uZSxcclxuICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgIHByb2R1Y3RfaWRcclxuICAgICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmNyZWF0ZSh7XHJcbiAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXHJcbiAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgc2x1Zzogc2x1ZyxcclxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXHJcbiAgICAgICAgICBicmFuZDogYnJhbmQsXHJcbiAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXHJcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXHJcbiAgICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcclxuICAgICAgICAgIHByaWNlOiBwcmljZSxcclxuICAgICAgICAgIHF0eTogcXR5LFxyXG4gICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxyXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxyXG4gICAgICAgICAgdG90YWw6IHRvdGFsLFxyXG4gICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxyXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXHJcbiAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2UsXHJcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXHJcbiAgICAgICAgICB3YXJkOiB3YXJkLFxyXG4gICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxyXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxyXG4gICAgICAgICAgd2FyZFRleHQ6IHdhcmRUZXh0ID8gd2FyZFRleHQgOiBcIlwiLFxyXG4gICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxyXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxyXG4gICAgICAgICAgdHlwZVJvb206IHR5cGVSb29tID8gdHlwZVJvb20gOiBcIlwiLFxyXG4gICAgICAgICAgaW50ZXJpb3I6IGludGVyaW9yID8gaW50ZXJpb3IgOiBcIlwiLFxyXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxyXG4gICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxyXG4gICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxyXG4gICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxyXG4gICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgPyBhdXRob3JfcGhvbmUgOiBcIlwiLFxyXG4gICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxyXG4gICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcclxuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgICAgYW1vdW50OiBpdGVtPy5hbW91bnQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmVzXHJcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdENhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHN1YmlkLCBpZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogaWQsXHJcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YmlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcblxyXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDYXRlZ29yeSxcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgdXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgIGNhdGVnb3J5SWQsXHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzbHVnLFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICB1bml0U2l6ZSxcclxuICAgICAgICBkZXNjLFxyXG4gICAgICAgIGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgcHJpY2UsXHJcbiAgICAgICAgcXR5LFxyXG4gICAgICAgIGRpc2NvdW50LFxyXG4gICAgICAgIGRpc2NvdW50UGVyLFxyXG4gICAgICAgIHRvdGFsLFxyXG4gICAgICAgIG5ldFByaWNlLFxyXG4gICAgICAgIGltYWdlcyxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIG5ld2FkZGltYWdlLFxyXG4gICAgICAgIHBob25lTnVtYmVyLFxyXG4gICAgICAgIHR5cGVSb29tLFxyXG4gICAgICAgIGludGVyaW9yLFxyXG4gICAgICAgIHNxdWFyZSxcclxuICAgICAgICBlbmRvdyxcclxuICAgICAgICByYXRpbmcsXHJcbiAgICAgICAgbm90ZSxcclxuICAgICAgICB1c2VyX21hbmFnZXIsXHJcbiAgICAgICAgcmVudCxcclxuICAgICAgICBhdXRob3JfcGhvbmUsXHJcbiAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICBwaG90byxcclxuICAgICAgICBwcm92aW5jZSxcclxuICAgICAgICBkaXN0cmljdCxcclxuICAgICAgICB3YXJkLFxyXG4gICAgICAgIHByb2R1Y3RfaWRcclxuICAgICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA/IHN1YkNhdGVnb3J5SWRcclxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA/IGNoaWxkQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHNsdWc6IHNsdWcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxyXG4gICAgICAgICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgICAgICAgICBwcmljZTogcHJpY2UsXHJcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcclxuICAgICAgICAgICAgICAgIHBob3RvOiBwaG90byxcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcclxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxyXG4gICAgICAgICAgICAgICAgaW50ZXJpb3IsXHJcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXHJcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXHJcbiAgICAgICAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXHJcbiAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICByZW50OiByZW50ID8gcmVudCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBwcm92aW5jZSxcclxuICAgICAgICAgICAgICAgIGRpc3RyaWN0LFxyXG4gICAgICAgICAgICAgICAgd2FyZCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RfaWQgPyBwcm9kdWN0X2lkIDogXCJcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihhc3luYyAocCkgPT4ge1xyXG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XHJcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzaXplKSB7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xyXG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcclxuICAgICAgICAgICAgICBKU09OLnBhcnNlKHNpemUpLm1hcCgoeyBzaXplLCBhbW91bnQgfSkgPT4gKHtcclxuICAgICAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgICAgICBhbW91bnQsXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQsXHJcbiAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHByb2R1Y3RJZCB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXHJcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShpbWFnZXMpLm1hcCgoaXRlbSkgPT4gKHsgLi4uaXRlbSwgcHJvZHVjdElkIH0pKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXBkYXRlZCBTdWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0SG90ZWwocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTIsXHJcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxyXG4gICAgICAgICAgbGltaXQ6IDRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxyXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICAgIGxpbWl0OiA0XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdDIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgZW5kb3c6IDFcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICAgIGxpbWl0OiA0XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSwge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCBkYi5wcm9kdWN0c2l6ZS5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kT25lKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QsIGRhdGFzaXplOiBzaXplIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBhZGRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkLCBxdHksIGRpc2NvdW50X3BlciwgZGlzY291bnRfcHJpY2UsIHRvdGFsLCBuZXRfcHJpY2UgfSA9XHJcbiAgICAgICAgcmVxLmJvZHk7XHJcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgICAgICAgaW1hZ2U6IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxyXG4gICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxyXG4gICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcclxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci51cGRhdGUoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwKSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICBcImlkXCIsXHJcbiAgICAgICAgICAgICAgXCJjYXRlZ29yeUlkXCIsXHJcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxyXG4gICAgICAgICAgICAgIFwiaXRlbV9uYW1lXCIsXHJcbiAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHNlYXJjaFByb2R1Y3RCeVN1YkNhdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5LnN1YkNhdCB9LFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiBkYXRhLmlkIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIucHJvZHVjdFxyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgcHJvZHVjdERlbGV0ZUJ1bGsocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5saXN0IH0gfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG5cclxuICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5wYXJhbXMuaWQpIH0gfSlcclxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmUpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgbXVsdGlwbGVQaG90b1VwbG9hZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgbGV0IGF0dGFjaG1lbnRFbnRyaWVzID0gW107XHJcbiAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XHJcbiAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgbmFtZTogcmVxLmZpbGVzW2ldLmZpbGVuYW1lLFxyXG4gICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcclxuICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5wYXRoLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkYi5wcm9kdWN0XHJcbiAgICAgIC5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgIC8vIHJldHVybiBxdWV1ZS5jcmVhdGUoJ2ltZy11cGxvYWQnLCB7XHJcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxyXG4gICAgICAgICAgLy8gICAgIGF0dGFjaG1lbnRFbnRyaWVzOiBhdHRhY2htZW50RW50cmllcyxcclxuICAgICAgICAgIC8vIH0pLnNhdmUoKTtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoeyAuLi5hdHRhY2htZW50RW50cmllc1tpXSB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEuZmlsZXMgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxyXG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XHJcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxyXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcclxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGxpbWl0OiA4LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLmNhdGVnb3J5XHJcbiAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBmaWx0ZXIgcHJvZHVjdFxyXG5cclxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XHJcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XHJcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XHJcbiAgICAgIH1cclxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XHJcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxyXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICBbT3Aub3JdOiBbXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXHJcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXHJcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxyXG5cclxuICAgICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG5cclxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgICAgcmVzXHJcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgICAuanNvbih7XHJcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIG5leHQoZXJyKTtcclxuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBjb25zdHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIC8vIHdoZXJlOiB7IGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfSxcclxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcclxuICAgICAgICAgIGxpbWl0OiA4LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIG5leHQoZXJyKTtcclxuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBkYi5wcm9kdWN0c2l6ZVxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIG5leHQoZXJyKTtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQXFDLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFB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