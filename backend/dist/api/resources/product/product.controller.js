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
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow;
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
              endow: endow ? endow : 0
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
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow;
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
                  endow: endow ? endow : 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJpbmRleCIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInN1cHBsaWVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJvcmRlciIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJpbmNsdWRlIiwibW9kZWwiLCJTdWJDYXRlZ29yeSIsImF0dHJpYnV0ZXMiLCJjYXRlZ29yeSIsInVwZGF0ZSIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MiIsImltYWdlcyIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImZpbmRPbmUiLCJsb2NhdGlvbiIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwic2VudCIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTExIiwiX3JlcSRib2R5MyIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJQcm9kdWN0T2ZmZXIiLCJnZXRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTIiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsInNlYXJjaFByb2R1Y3RCeVN1YkNhdCIsIl9jYWxsZWUxMyIsIl9jYWxsZWUxMyQiLCJfY29udGV4dDEzIiwic3ViX25hbWUiLCJzdWJDYXQiLCJzdHJpbmdpZnkiLCJwcm9kdWN0RGVsZXRlIiwiX2NhbGxlZTE0IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJyZSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyYW1zIiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUxNiIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTE2JCIsIl9jb250ZXh0MTYiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9yIiwiZXJyb3JzIiwiZ2V0QWxsUGhvdG8iLCJfY2FsbGVlMTciLCJfY2FsbGVlMTckIiwiX2NvbnRleHQxNyIsImRlbGV0ZVNsaWRlclBob3RvIiwiX2NhbGxlZTE4IiwiX2NhbGxlZTE4JCIsIl9jb250ZXh0MTgiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJfY2FsbGVlMTkiLCJfY2FsbGVlMTkkIiwiX2NvbnRleHQxOSIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJfY2FsbGVlMjAiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsImdldEZpbHRlcmJ5UHJvZHVjdCIsIl9jYWxsZWUyMSIsInNlYXJjaCIsIl9jYWxsZWUyMSQiLCJfY29udGV4dDIxIiwicmVxdWlyZWQiLCJvciIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTIyIiwiX2NhbGxlZTIyJCIsIl9jb250ZXh0MjIiLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTIzIiwiX3JlcSRib2R5NCIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTI0IiwiX3JlcSRib2R5NSIsIl9jYWxsZWUyNCQiLCJfY29udGV4dDI0IiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMjUiLCJfY2FsbGVlMjUkIiwiX2NvbnRleHQyNSIsImxpdGVyYWwiLCJnZXRTaXplUHJvZHVjdCIsIl9jYWxsZWUyNiIsIl9jYWxsZWUyNiQiLCJfY29udGV4dDI2IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuY29uc3QgeyBPcCwgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuLy8gaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuLi8uLi8uLi9rdWUnO1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKiBBZGQgdXNlciBhcGkgc3RhcnQgaGVyZS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKi9cbiAgYXN5bmMgZ2V0UGhvdG9Qcm9kdWN0KHJlcSwgcmVzKSB7XG4gICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIHNvcnREZXNjLFxuICAgICAgICBkZXNjLFxuICAgICAgICBidXllclByaWNlLFxuICAgICAgICBwcmljZSxcbiAgICAgICAgcXR5LFxuICAgICAgICBkaXNjb3VudCxcbiAgICAgICAgZGlzY291bnRQZXIsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZXRQcmljZSxcbiAgICAgICAgaW1hZ2UsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgcHJvdmluY2UsIFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBwcm92aW5jZVRleHQsXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcbiAgICAgICAgd2FyZFRleHQsXG4gICAgICAgIGJ1ZGdldCxcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBlbmRvdyxcbiAgICAgIH0gPSByZXEuYm9keTtcblxuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuY3JlYXRlKHtcbiAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfHwgMCxcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIHNsdWc6IHNsdWcsXG4gICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgICBicmFuZDogYnJhbmQsXG4gICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxuICAgICAgICAgIHNvcnREZXNjOiBzb3J0RGVzYyxcbiAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5wYXRoIDogXCJcIixcbiAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXG4gICAgICAgICAgcHJvdmluY2U6IHByb3ZpbmNlLFxuICAgICAgICAgIGRpc3RyaWN0OiBkaXN0cmljdCxcbiAgICAgICAgICB3YXJkOiB3YXJkLFxuICAgICAgICAgIHByb3ZpbmNlVGV4dDogcHJvdmluY2VUZXh0ID8gcHJvdmluY2VUZXh0IDogXCJcIixcbiAgICAgICAgICBkaXN0cmljdFRleHQ6IGRpc3RyaWN0VGV4dCA/IGRpc3RyaWN0VGV4dCA6IFwiXCIsXG4gICAgICAgICAgd2FyZFRleHQ6IHdhcmRUZXh0ID8gd2FyZFRleHQgOiBcIlwiLFxuICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICBidWRnZXQ6IGJ1ZGdldCA/IGJ1ZGdldCA6IDAsXG4gICAgICAgICAgdHlwZVJvb206IHR5cGVSb29tID8gdHlwZVJvb20gOiBcIlwiLFxuICAgICAgICAgIGludGVyaW9yOiBpbnRlcmlvciA/IGludGVyaW9yIDogXCJcIixcbiAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDBcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIGFtb3VudDogaXRlbT8uYW1vdW50LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgaW5kZXgocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdXBwbGllcklkLCBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBzdXBwbGllcklkOiBzdXBwbGllcklkLFxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdExpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlcyxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgZW5kb3dcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCA/IGNhdGVnb3J5SWQgOiBwcm9kdWN0LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3Quc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5jaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IHByb2R1Y3QucGhvdG8sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxuICAgICAgICAgICAgICAgIGludGVyaW9yLFxuICAgICAgICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTMsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzaXplID0gYXdhaXQgZGIucHJvZHVjdHNpemUuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICB9KTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPVxuICAgICAgICByZXEuYm9keTtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICAgICAgICBcIml0ZW1fbmFtZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogZGF0YS5pZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcbiAgICBsZXQgYXR0YWNobWVudEVudHJpZXMgPSBbXTtcbiAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRhY2htZW50RW50cmllcy5wdXNoKHtcbiAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcbiAgICAgICAgbWltZTogcmVxLmZpbGVzW2ldLm1pbWV0eXBlLFxuICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5wYXRoLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAvLyByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxuICAgICAgICAgIC8vICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHsgLi4uYXR0YWNobWVudEVudHJpZXNbaV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEuZmlsZXMgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbXCJFcnJvciBpbnNlcnQgcGhvdG9cIl0gfSk7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBnZXRBbGxQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcbiAgLy8gZWRpdCB0byBzYWxlIHByb2R1Y3RcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcbiAgICAgICAgICAvLyB3aGVyZTogeyBkaXNjb3VudDogJ2dyb2Nlcnktc3RhcGxlJyB9LFxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfHwgW10gfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdEJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5jYXRlZ29yeVxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gZmlsdGVyIHByb2R1Y3RcblxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaCA9IFwiJSVcIjtcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaCA9IFwiJVwiICsgcmVxLnF1ZXJ5LnNlYXJjaCArIFwiJVwiO1xuICAgICAgfVxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXG4gIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xuICAgICAgLy8gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe3doZXJlOiB7aW1nVXJsLCBpZH19KVxuICAgICAgLy8gZGVsZXRlRmlsZUZyb21TMyhpbWdVcmwpXG5cbiAgICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oe1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0c2l6ZVxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFBcUMsU0FBQUMsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFB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