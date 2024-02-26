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
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow, rating, note, user_manager, author_phone;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow, rating = _req$body.rating, note = _req$body.note, user_manager = _req$body.user_manager, author_phone = _req$body.author_phone;
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
              author_phone: author_phone ? author_phone : ""
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
  index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$query, supplierId, categoryId, subCategoryId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query = req.query, supplierId = _req$query.supplierId, categoryId = _req$query.categoryId, subCategoryId = _req$query.subCategoryId;
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
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
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
            _context4.next = 7;
            break;
          case 4:
            _context4.prev = 4;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 4]]);
    }))();
  },
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating, note, user_manager, rent, author_phone;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow, rating = _req$body2.rating, note = _req$body2.note, user_manager = _req$body2.user_manager, rent = _req$body2.rent, author_phone = _req$body2.author_phone;
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
                  photo: req.file ? req.file.location : product.photo,
                  phoneNumber: phoneNumber,
                  typeRoom: typeRoom,
                  interior: interior,
                  square: square ? square : 0,
                  endow: endow ? endow : 0,
                  rating: rating ? rating : 0,
                  note: note ? note : "",
                  user_manager: user_manager ? user_manager : "",
                  rent: rent ? rent : "",
                  author_phone: author_phone ? author_phone : ""
                }, {
                  where: {
                    id: productId
                  }
                });
              }
              throw new RequestError("Not Found Product", 409);
            }).then(function (p) {
              if (newaddimage) {
                var _JSON$parse4;
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
                _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref) {
                  var size = _ref.size,
                    amount = _ref.amount;
                  return {
                    size: size,
                    amount: amount,
                    productId: productId
                  };
                }));
              }
              if (images) {
                _models.db.productphoto.destroy({
                  where: {
                    productId: productId
                  }
                });
                _models.db.productphoto.bulkCreate(JSON.parse(images).map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    productId: productId
                  });
                }));
              }
              res.status(200).json({
                success: true,
                msg: "Updated Successfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 8;
            break;
          case 5:
            _context5.prev = 5;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 5]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
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
            _context6.next = 7;
            break;
          case 4:
            _context6.prev = 4;
            _context6.t0 = _context6["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 4]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
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
            _context7.next = 7;
            break;
          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
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
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var size;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context10.sent;
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
            _context10.next = 10;
            break;
          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
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
            _context11.next = 8;
            break;
          case 5:
            _context11.prev = 5;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
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
            _context13.next = 7;
            break;
          case 4:
            _context13.prev = 4;
            _context13.t0 = _context13["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 4]]);
    }))();
  },
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
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
            return _context14.stop();
        }
      }, _callee14);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
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
            return _context15.stop();
        }
      }, _callee15);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
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
            return _context16.stop();
        }
      }, _callee16);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
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
            _context17.next = 7;
            break;
          case 4:
            _context17.prev = 4;
            _context17.t0 = _context17["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
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
            return _context18.stop();
        }
      }, _callee18);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
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
            _context19.next = 7;
            break;
          case 4:
            _context19.prev = 4;
            _context19.t0 = _context19["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 4]]);
    }))();
  },
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
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
            _context20.next = 7;
            break;
          case 4:
            _context20.prev = 4;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var search;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
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
            _context21.next = 9;
            break;
          case 6:
            _context21.prev = 6;
            _context21.t0 = _context21["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
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
            _context22.next = 7;
            break;
          case 4:
            _context22.prev = 4;
            _context22.t0 = _context22["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
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
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
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
            return _context24.stop();
        }
      }, _callee24);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
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
            return _context25.stop();
        }
      }, _callee25);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var productId;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
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
            return _context26.stop();
        }
      }, _callee26);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYm9keSIsImNyZWF0ZSIsInBhcnNlSW50IiwicGhvdG8iLCJmaWxlIiwicGF0aCIsIl9KU09OJHBhcnNlIiwiX0pTT04kcGFyc2UzIiwiSlNPTiIsInBhcnNlIiwibWFwIiwiaXRlbSIsImltZ1VybCIsImRhdGFWYWx1ZXMiLCJpZCIsIl9KU09OJHBhcnNlMiIsImltYWdlVXJsIiwicHJvZHVjdHNpemUiLCJhbW91bnQiLCJzdWNjZXNzIiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInQwIiwiYWJydXB0IiwiaW5kZXgiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzdXBwbGllcklkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3JkZXIiLCJpbmNsdWRlIiwibW9kZWwiLCJ1c2VyIiwiYXR0cmlidXRlcyIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJTdWJDYXRlZ29yeSIsImNhdGVnb3J5IiwidXBkYXRlIiwiX2NhbGxlZTUiLCJfcmVxJGJvZHkyIiwiaW1hZ2VzIiwicmVudCIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImZpbmRPbmUiLCJsb2NhdGlvbiIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwic2VudCIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTExIiwiX3JlcSRib2R5MyIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJQcm9kdWN0T2ZmZXIiLCJnZXRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTIiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsInNlYXJjaFByb2R1Y3RCeVN1YkNhdCIsIl9jYWxsZWUxMyIsIl9jYWxsZWUxMyQiLCJfY29udGV4dDEzIiwic3ViX25hbWUiLCJzdWJDYXQiLCJzdHJpbmdpZnkiLCJwcm9kdWN0RGVsZXRlIiwiX2NhbGxlZTE0IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJyZSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyYW1zIiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUxNiIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTE2JCIsIl9jb250ZXh0MTYiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9yIiwiZXJyb3JzIiwiZ2V0QWxsUGhvdG8iLCJfY2FsbGVlMTciLCJfY2FsbGVlMTckIiwiX2NvbnRleHQxNyIsImRlbGV0ZVNsaWRlclBob3RvIiwiX2NhbGxlZTE4IiwiX2NhbGxlZTE4JCIsIl9jb250ZXh0MTgiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJfY2FsbGVlMTkiLCJfY2FsbGVlMTkkIiwiX2NvbnRleHQxOSIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJfY2FsbGVlMjAiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsImdldEZpbHRlcmJ5UHJvZHVjdCIsIl9jYWxsZWUyMSIsInNlYXJjaCIsIl9jYWxsZWUyMSQiLCJfY29udGV4dDIxIiwicmVxdWlyZWQiLCJvciIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTIyIiwiX2NhbGxlZTIyJCIsIl9jb250ZXh0MjIiLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTIzIiwiX3JlcSRib2R5NCIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTI0IiwiX3JlcSRib2R5NSIsIl9jYWxsZWUyNCQiLCJfY29udGV4dDI0IiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMjUiLCJfY2FsbGVlMjUkIiwiX2NvbnRleHQyNSIsImxpdGVyYWwiLCJnZXRTaXplUHJvZHVjdCIsIl9jYWxsZWUyNiIsIl9jYWxsZWUyNiQiLCJfY29udGV4dDI2IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuY29uc3QgeyBPcCwgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuLy8gaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuLi8uLi8uLi9rdWUnO1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cbiAgYXN5bmMgZ2V0UGhvdG9Qcm9kdWN0KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIHNvcnREZXNjLFxuICAgICAgICBkZXNjLFxuICAgICAgICBidXllclByaWNlLFxuICAgICAgICBwcmljZSxcbiAgICAgICAgcXR5LFxuICAgICAgICBkaXNjb3VudCxcbiAgICAgICAgZGlzY291bnRQZXIsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZXRQcmljZSxcbiAgICAgICAgaW1hZ2UsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgcHJvdmluY2UsXG4gICAgICAgIGRpc3RyaWN0LFxuICAgICAgICB3YXJkLFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIHByb3ZpbmNlVGV4dCxcbiAgICAgICAgZGlzdHJpY3RUZXh0LFxuICAgICAgICB3YXJkVGV4dCxcbiAgICAgICAgYnVkZ2V0LFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIGVuZG93LFxuICAgICAgICByYXRpbmcsXG4gICAgICAgIG5vdGUsXG4gICAgICAgIHVzZXJfbWFuYWdlcixcbiAgICAgICAgYXV0aG9yX3Bob25lXG4gICAgICB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXG4gICAgICAgICAgd2FyZDogd2FyZCxcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIlxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5wYXRoLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBKU09OLnBhcnNlKHNpemUpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICBzaXplOiBpdGVtPy5zaXplLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgYW1vdW50OiBpdGVtPy5hbW91bnQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBwcm9kdWN0XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlcyxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICByZW50LFxuICAgICAgICBhdXRob3JfcGhvbmVcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCA/IGNhdGVnb3J5SWQgOiBwcm9kdWN0LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3Quc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5jaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IHByb2R1Y3QucGhvdG8sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxuICAgICAgICAgICAgICAgIGludGVyaW9yLFxuICAgICAgICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXG4gICAgICAgICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxuICAgICAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcmVudDogcmVudCA/IHJlbnQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiTm90IEZvdW5kIFByb2R1Y3RcIiwgNDA5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKHNpemUpLm1hcCgoeyBzaXplLCBhbW91bnQgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGltYWdlcykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShpbWFnZXMpLm1hcCgoaXRlbSkgPT4gKHsgLi4uaXRlbSwgcHJvZHVjdElkIH0pKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXBkYXRlZCBTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0SG90ZWwocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTIsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMyxcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSwge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzaXplID0gYXdhaXQgZGIucHJvZHVjdHNpemUuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICB9KTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPVxuICAgICAgICByZXEuYm9keTtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICAgICAgICBcIml0ZW1fbmFtZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogZGF0YS5pZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcbiAgICBsZXQgYXR0YWNobWVudEVudHJpZXMgPSBbXTtcbiAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRhY2htZW50RW50cmllcy5wdXNoKHtcbiAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcbiAgICAgICAgbWltZTogcmVxLmZpbGVzW2ldLm1pbWV0eXBlLFxuICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5wYXRoLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAvLyByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxuICAgICAgICAgIC8vICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHsgLi4uYXR0YWNobWVudEVudHJpZXNbaV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEuZmlsZXMgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbXCJFcnJvciBpbnNlcnQgcGhvdG9cIl0gfSk7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBnZXRBbGxQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcbiAgLy8gZWRpdCB0byBzYWxlIHByb2R1Y3RcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcbiAgICAgICAgICAvLyB3aGVyZTogeyBkaXNjb3VudDogJ2dyb2Nlcnktc3RhcGxlJyB9LFxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfHwgW10gfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdEJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5jYXRlZ29yeVxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gZmlsdGVyIHByb2R1Y3RcblxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaCA9IFwiJSVcIjtcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaCA9IFwiJVwiICsgcmVxLnF1ZXJ5LnNlYXJjaCArIFwiJVwiO1xuICAgICAgfVxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXG4gIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xuICAgICAgLy8gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe3doZXJlOiB7aW1nVXJsLCBpZH19KVxuICAgICAgLy8gZGVsZXRlRmlsZUZyb21TMyhpbWdVcmwpXG5cbiAgICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0c2l6ZVxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFD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