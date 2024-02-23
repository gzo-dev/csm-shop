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
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow, rating;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow, rating = _req$body.rating;
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
              rating: rating ? rating : 0
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
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow, rating = _req$body2.rating;
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
                  rating: rating ? rating : 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJpbmRleCIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInN1cHBsaWVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJvcmRlciIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJpbmNsdWRlIiwibW9kZWwiLCJTdWJDYXRlZ29yeSIsImF0dHJpYnV0ZXMiLCJjYXRlZ29yeSIsInVwZGF0ZSIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MiIsImltYWdlcyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImZpbmRPbmUiLCJsb2NhdGlvbiIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwic2VudCIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTExIiwiX3JlcSRib2R5MyIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJQcm9kdWN0T2ZmZXIiLCJnZXRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTIiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsInNlYXJjaFByb2R1Y3RCeVN1YkNhdCIsIl9jYWxsZWUxMyIsIl9jYWxsZWUxMyQiLCJfY29udGV4dDEzIiwic3ViX25hbWUiLCJzdWJDYXQiLCJzdHJpbmdpZnkiLCJwcm9kdWN0RGVsZXRlIiwiX2NhbGxlZTE0IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJyZSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyYW1zIiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUxNiIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTE2JCIsIl9jb250ZXh0MTYiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9yIiwiZXJyb3JzIiwiZ2V0QWxsUGhvdG8iLCJfY2FsbGVlMTciLCJfY2FsbGVlMTckIiwiX2NvbnRleHQxNyIsImRlbGV0ZVNsaWRlclBob3RvIiwiX2NhbGxlZTE4IiwiX2NhbGxlZTE4JCIsIl9jb250ZXh0MTgiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJfY2FsbGVlMTkiLCJfY2FsbGVlMTkkIiwiX2NvbnRleHQxOSIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJfY2FsbGVlMjAiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsImdldEZpbHRlcmJ5UHJvZHVjdCIsIl9jYWxsZWUyMSIsInNlYXJjaCIsIl9jYWxsZWUyMSQiLCJfY29udGV4dDIxIiwicmVxdWlyZWQiLCJvciIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTIyIiwiX2NhbGxlZTIyJCIsIl9jb250ZXh0MjIiLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTIzIiwiX3JlcSRib2R5NCIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTI0IiwiX3JlcSRib2R5NSIsIl9jYWxsZWUyNCQiLCJfY29udGV4dDI0IiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMjUiLCJfY2FsbGVlMjUkIiwiX2NvbnRleHQyNSIsImxpdGVyYWwiLCJnZXRTaXplUHJvZHVjdCIsIl9jYWxsZWUyNiIsIl9jYWxsZWUyNiQiLCJfY29udGV4dDI2IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuY29uc3QgeyBPcCwgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuLy8gaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuLi8uLi8uLi9rdWUnO1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cbiAgYXN5bmMgZ2V0UGhvdG9Qcm9kdWN0KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIHNvcnREZXNjLFxuICAgICAgICBkZXNjLFxuICAgICAgICBidXllclByaWNlLFxuICAgICAgICBwcmljZSxcbiAgICAgICAgcXR5LFxuICAgICAgICBkaXNjb3VudCxcbiAgICAgICAgZGlzY291bnRQZXIsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZXRQcmljZSxcbiAgICAgICAgaW1hZ2UsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgcHJvdmluY2UsIFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBwcm92aW5jZVRleHQsXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcbiAgICAgICAgd2FyZFRleHQsXG4gICAgICAgIGJ1ZGdldCxcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBlbmRvdyxcbiAgICAgICAgcmF0aW5nXG4gICAgICB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXG4gICAgICAgICAgd2FyZDogd2FyZCxcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5wYXRoLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBKU09OLnBhcnNlKHNpemUpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICBzaXplOiBpdGVtPy5zaXplLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgYW1vdW50OiBpdGVtPy5hbW91bnQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBwcm9kdWN0XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBkZXNjLFxuICAgICAgICBidXllclByaWNlLFxuICAgICAgICBwcmljZSxcbiAgICAgICAgcXR5LFxuICAgICAgICBkaXNjb3VudCxcbiAgICAgICAgZGlzY291bnRQZXIsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZXRQcmljZSxcbiAgICAgICAgaW1hZ2VzLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBlbmRvdyxcbiAgICAgICAgcmF0aW5nXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBwcm9kdWN0LnBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMFxuXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSkubWFwKCh7IHNpemUsIGFtb3VudCB9KSA9PiAoe1xuICAgICAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW1hZ2VzKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKGltYWdlcykubWFwKChpdGVtKSA9PiAoeyAuLi5pdGVtLCBwcm9kdWN0SWQgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVcGRhdGVkIFN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMixcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnByb2R1Y3RzaXplLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgfSk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QsIGRhdGFzaXplOiBzaXplIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHF0eSwgZGlzY291bnRfcGVyLCBkaXNjb3VudF9wcmljZSwgdG90YWwsIG5ldF9wcmljZSB9ID1cbiAgICAgICAgcmVxLmJvZHk7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGlmICghbGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5jcmVhdGUoe1xuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgaW1hZ2U6IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBcIlwiLFxuICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IGxpc3QuaWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgIFwiaWRcIixcbiAgICAgICAgICAgICAgXCJjYXRlZ29yeUlkXCIsXG4gICAgICAgICAgICAgIFwicHJpY2VcIixcbiAgICAgICAgICAgICAgXCJpdGVtX25hbWVcIixcbiAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICBcImJyYW5kXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHNlYXJjaFByb2R1Y3RCeVN1YkNhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5LnN1YkNhdCB9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgbGV0IGF0dGFjaG1lbnRFbnRyaWVzID0gW107XG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICBuYW1lOiByZXEuZmlsZXNbaV0uZmlsZW5hbWUsXG4gICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcbiAgICAgICAgaW1nVXJsOiByZXEuZmlsZXNbaV0ucGF0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3ROYW1lOiByLml0ZW1fbmFtZSxcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxuICAgICAgICAgIC8vIH0pLnNhdmUoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLmZpbGVzIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogW1wiRXJyb3IgaW5zZXJ0IHBob3RvXCJdIH0pO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJicmFuZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICAvL0FsbCBHcm9jZXJ5U3RhbXBsZSBwcm9kdWN0XG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XG4gIGFzeW5jIGdldEFsbEdyb2NlcnJ5U3RhcGxlcyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInNsdWdcIl0sXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImRpc2NvdW50UGVyXCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IHx8IFtdIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuY2F0ZWdvcnlcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGZpbHRlciBwcm9kdWN0XG5cbiAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XG4gICAgICBpZiAocmVxLnF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBzZWFyY2ggPSBcIiVcIiArIHJlcS5xdWVyeS5zZWFyY2ggKyBcIiVcIjtcbiAgICAgIH1cbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBbT3Aub3JdOiBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHNsdWc6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcblxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBHZXRBbGxCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkubmFtZSB9LFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gYXdzIGltYWdlIGRlbGV0ZVxuICBhc3luYyBhd3NQcm9kdWN0UGhvdG9EZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcbiAgICAgIC8vIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHt3aGVyZToge2ltZ1VybCwgaWR9fSlcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxuXG4gICAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgIC50aGVuKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgbXNnOiBcIlN1Y2Nlc3NmbGx5IGRlbGV0ZWQgaW1hZ2UgZnJvbSBzMyBCdWNrZXRcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RTdWJDaGlsZENhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIHdoZXJlOiB7IGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfSxcbiAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoXCJSQU5EKClcIiksXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRTaXplUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdHNpemVcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtc2c6IGVyciB9KTtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQXFDLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FB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