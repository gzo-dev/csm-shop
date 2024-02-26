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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiYm9keSIsImNyZWF0ZSIsInBhcnNlSW50IiwicGhvdG8iLCJmaWxlIiwicGF0aCIsIl9KU09OJHBhcnNlIiwiX0pTT04kcGFyc2UzIiwiSlNPTiIsInBhcnNlIiwibWFwIiwiaXRlbSIsImltZ1VybCIsImRhdGFWYWx1ZXMiLCJpZCIsIl9KU09OJHBhcnNlMiIsImltYWdlVXJsIiwicHJvZHVjdHNpemUiLCJhbW91bnQiLCJzdWNjZXNzIiwibXNnIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInQwIiwiYWJydXB0IiwiaW5kZXgiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzdXBwbGllcklkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3JkZXIiLCJSZXF1ZXN0RXJyb3IiLCJnZXRBbGxQcm9kdWN0TGlzdCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiaW5jbHVkZSIsIm1vZGVsIiwiU3ViQ2F0ZWdvcnkiLCJhdHRyaWJ1dGVzIiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJyZW50IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwiZmluZE9uZSIsImxvY2F0aW9uIiwicCIsIl9KU09OJHBhcnNlNCIsImRlc3Ryb3kiLCJidWxrQ3JlYXRlIiwiX3JlZiIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwibGlzdCIsImdldFByb2R1Y3RTdWdnZXN0SG90ZWwiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImxpbWl0IiwiZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZ2V0V2ViUHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJzZW50IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTEiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsIlByb2R1Y3RPZmZlciIsImdldFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0IiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJzdWJfbmFtZSIsInN1YkNhdCIsInN0cmluZ2lmeSIsInByb2R1Y3REZWxldGUiLCJfY2FsbGVlMTQiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsInJlIiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTE1IiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTE2IiwiYXR0YWNobWVudEVudHJpZXMiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsImZpbGVzIiwiZmlsZW5hbWUiLCJtaW1lIiwibWltZXR5cGUiLCJyIiwiZXJyb3IiLCJlcnJvcnMiLCJnZXRBbGxQaG90byIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwiZGVsZXRlU2xpZGVyUGhvdG8iLCJfY2FsbGVlMTgiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsImdldEFsbEdyb2NlcnJ5U3RhcGxlcyIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwiZ2V0QWxsUHJvZHVjdEJ5U2x1ZyIsIl9jYWxsZWUyMCIsIl9jYWxsZWUyMCQiLCJfY29udGV4dDIwIiwiZ2V0RmlsdGVyYnlQcm9kdWN0IiwiX2NhbGxlZTIxIiwic2VhcmNoIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJyZXF1aXJlZCIsIm9yIiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMjMiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTIzJCIsIl9jb250ZXh0MjMiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMjQiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTI0JCIsIl9jb250ZXh0MjQiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUyNSIsIl9jYWxsZWUyNSQiLCJfY29udGV4dDI1IiwibGl0ZXJhbCIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTI2IiwiX2NhbGxlZTI2JCIsIl9jb250ZXh0MjYiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5jb25zdCB7IE9wLCBTZXF1ZWxpemUgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG4vLyBpbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4uLy4uLy4uL2t1ZSc7XG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICBhc3luYyBnZXRQaG90b1Byb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgc29ydERlc2MsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBwcm92aW5jZSwgXG4gICAgICAgIGRpc3RyaWN0LFxuICAgICAgICB3YXJkLFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIHByb3ZpbmNlVGV4dCxcbiAgICAgICAgZGlzdHJpY3RUZXh0LFxuICAgICAgICB3YXJkVGV4dCxcbiAgICAgICAgYnVkZ2V0LFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIGVuZG93LFxuICAgICAgICByYXRpbmcsXG4gICAgICAgIG5vdGUsIFxuICAgICAgICB1c2VyX21hbmFnZXIsXG4gICAgICAgIGF1dGhvcl9waG9uZVxuICAgICAgfSA9IHJlcS5ib2R5O1xuXG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5jcmVhdGUoe1xuICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB8fCAwLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgc29ydERlc2M6IHNvcnREZXNjLFxuICAgICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcbiAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxuICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcbiAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxuICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLnBhdGggOiBcIlwiLFxuICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2UsXG4gICAgICAgICAgZGlzdHJpY3Q6IGRpc3RyaWN0LFxuICAgICAgICAgIHdhcmQ6IHdhcmQsXG4gICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxuICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcbiAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXG4gICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxuICAgICAgICAgIGJ1ZGdldDogYnVkZ2V0ID8gYnVkZ2V0IDogMCxcbiAgICAgICAgICB0eXBlUm9vbTogdHlwZVJvb20gPyB0eXBlUm9vbSA6IFwiXCIsXG4gICAgICAgICAgaW50ZXJpb3I6IGludGVyaW9yID8gaW50ZXJpb3IgOiBcIlwiLFxuICAgICAgICAgIGVuZG93OiBlbmRvdyA/IGVuZG93IDogMCxcbiAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXG4gICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgIDogXCJcIixcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXG4gICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgPyBhdXRob3JfcGhvbmUgOiBcIlwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgSlNPTi5wYXJzZShpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LnBhdGgsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3VwcGxpZXJJZCwgY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIGVuZG93LFxuICAgICAgICByYXRpbmcsXG4gICAgICAgIG5vdGUsXG4gICAgICAgIHVzZXJfbWFuYWdlcixcbiAgICAgICAgcmVudCxcbiAgICAgICAgYXV0aG9yX3Bob25lXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBwcm9kdWN0LnBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSAgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogXCJcIixcbiAgICAgICAgICAgICAgICByZW50OiByZW50ID8gcmVudCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgID8gYXV0aG9yX3Bob25lIDogXCJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiTm90IEZvdW5kIFByb2R1Y3RcIiwgNDA5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKHNpemUpLm1hcCgoeyBzaXplLCBhbW91bnQgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGltYWdlcykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShpbWFnZXMpLm1hcCgoaXRlbSkgPT4gKHsgLi4uaXRlbSwgcHJvZHVjdElkIH0pKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiVXBkYXRlZCBTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0SG90ZWwocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTIsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMyxcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0V2ViUHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCBkYi5wcm9kdWN0c2l6ZS5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgIH0pO1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0LCBkYXRhc2l6ZTogc2l6ZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkLCBxdHksIGRpc2NvdW50X3BlciwgZGlzY291bnRfcHJpY2UsIHRvdGFsLCBuZXRfcHJpY2UgfSA9XG4gICAgICAgIHJlcS5ib2R5O1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogXCJcIixcbiAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci51cGRhdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kQWxsKHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICBcImlkXCIsXG4gICAgICAgICAgICAgIFwiY2F0ZWdvcnlJZFwiLFxuICAgICAgICAgICAgICBcInByaWNlXCIsXG4gICAgICAgICAgICAgIFwiaXRlbV9uYW1lXCIsXG4gICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgXCJicmFuZFwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBzZWFyY2hQcm9kdWN0QnlTdWJDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5zdWJDYXQgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiBkYXRhLmlkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3REZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3RPZmZlckRlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5wYXJhbXMuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgbXVsdGlwbGVQaG90b1VwbG9hZChyZXEsIHJlcywgbmV4dCkge1xuICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xuICAgIHZhciBwcm9kdWN0SWQgPSByZXEuYm9keS5wcm9kdWN0SWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dGFjaG1lbnRFbnRyaWVzLnB1c2goe1xuICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgbmFtZTogcmVxLmZpbGVzW2ldLmZpbGVuYW1lLFxuICAgICAgICBtaW1lOiByZXEuZmlsZXNbaV0ubWltZXR5cGUsXG4gICAgICAgIGltZ1VybDogcmVxLmZpbGVzW2ldLnBhdGgsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgIC8vIHJldHVybiBxdWV1ZS5jcmVhdGUoJ2ltZy11cGxvYWQnLCB7XG4gICAgICAgICAgLy8gICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgIC8vICAgICBwcm9kdWN0TmFtZTogci5pdGVtX25hbWUsXG4gICAgICAgICAgLy8gICAgIGF0dGFjaG1lbnRFbnRyaWVzOiBhdHRhY2htZW50RW50cmllcyxcbiAgICAgICAgICAvLyB9KS5zYXZlKCk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoeyAuLi5hdHRhY2htZW50RW50cmllc1tpXSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS5maWxlcyB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGdldEFsbFBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGRlbGV0ZVNsaWRlclBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxuICAvLyBlZGl0IHRvIHNhbGUgcHJvZHVjdFxuICBhc3luYyBnZXRBbGxHcm9jZXJyeVN0YXBsZXMocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxuICAgICAgICAgIC8vIHdoZXJlOiB7IGRpc2NvdW50OiAnZ3JvY2VyeS1zdGFwbGUnIH0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJkaXNjb3VudFBlclwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLmNhdGVnb3J5XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBmaWx0ZXIgcHJvZHVjdFxuXG4gIGFzeW5jIGdldEZpbHRlcmJ5UHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VhcmNoID0gXCIlJVwiO1xuICAgICAgaWYgKHJlcS5xdWVyeS5zZWFyY2gpIHtcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XG4gICAgICB9XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgW09wLm9yXTogW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogeyBbT3AubGlrZV06IHNlYXJjaCB9LCBzbHVnOiB7IFtPcC5saWtlXTogc2VhcmNoIH0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgR2V0QWxsQnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5Lm5hbWUgfSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5LFxuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGF3cyBpbWFnZSBkZWxldGVcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQsIGltZ1VybCB9ID0gcmVxLmJvZHk7XG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXG4gICAgICAvLyBkZWxldGVGaWxlRnJvbVMzKGltZ1VybClcblxuICAgICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAgIC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcblxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0U3ViQ2hpbGRDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFNlcXVlbGl6ZS5saXRlcmFsKFwiUkFORCgpXCIpLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0U2l6ZVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RzaXplXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFxQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENB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