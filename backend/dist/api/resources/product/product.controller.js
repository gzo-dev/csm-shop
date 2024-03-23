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
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating, note, user_manager, rent, author_phone, address, photo, province, district, ward, product_id;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
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
  getProductSuggest2: function getProductSuggest2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
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
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var size;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context11.sent;
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
            _context11.next = 10;
            break;
          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
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
            _context12.next = 8;
            break;
          case 5:
            _context12.prev = 5;
            _context12.t0 = _context12["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
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
            _context14.next = 7;
            break;
          case 4:
            _context14.prev = 4;
            _context14.t0 = _context14["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 4]]);
    }))();
  },
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
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
            return _context15.stop();
        }
      }, _callee15);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
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
            return _context16.stop();
        }
      }, _callee16);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
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
            return _context17.stop();
        }
      }, _callee17);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
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
            _context18.next = 7;
            break;
          case 4:
            _context18.prev = 4;
            _context18.t0 = _context18["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
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
            return _context19.stop();
        }
      }, _callee19);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
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
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
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
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var search;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
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
            _context22.next = 9;
            break;
          case 6:
            _context22.prev = 6;
            _context22.t0 = _context22["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
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
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
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
            return _context24.stop();
        }
      }, _callee24);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
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
            return _context25.stop();
        }
      }, _callee25);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
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
            return _context26.stop();
        }
      }, _callee26);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var productId;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
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
            return _context27.stop();
        }
      }, _callee27);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiYWRkcmVzcyIsInByb2R1Y3RfaWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJpbmRleCIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInN1cHBsaWVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJvcmRlciIsImluY2x1ZGUiLCJtb2RlbCIsInVzZXIiLCJhdHRyaWJ1dGVzIiwiUmVxdWVzdEVycm9yIiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIlN1YkNhdGVnb3J5IiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJyZW50IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwiZmluZE9uZSIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRQcm9kdWN0U3VnZ2VzdDIiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwiZ2V0V2ViUHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTExIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJzZW50IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTIiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTQiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicmUiLCJwcm9kdWN0T2ZmZXJEZWxldGUiLCJfY2FsbGVlMTYiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsInBhcmFtcyIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJfY2FsbGVlMTciLCJhdHRhY2htZW50RW50cmllcyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwiZmlsZXMiLCJmaWxlbmFtZSIsIm1pbWUiLCJtaW1ldHlwZSIsInIiLCJlcnJvciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTE4IiwiX2NhbGxlZTE4JCIsIl9jb250ZXh0MTgiLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTIwIiwiX2NhbGxlZTIwJCIsIl9jb250ZXh0MjAiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMjIiLCJzZWFyY2giLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInJlcXVpcmVkIiwib3IiLCJsaWtlIiwiR2V0QWxsQnlDYXRlZ29yeSIsIl9jYWxsZWUyMyIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiU3ViQ2hpbGRDYXRlZ29yeSIsImF3c1Byb2R1Y3RQaG90b0RlbGV0ZSIsIl9jYWxsZWUyNCIsIl9yZXEkYm9keTQiLCJfY2FsbGVlMjQkIiwiX2NvbnRleHQyNCIsImdldFByb2R1Y3RTdWJDaGlsZENhdCIsIl9jYWxsZWUyNSIsIl9yZXEkYm9keTUiLCJfY2FsbGVlMjUkIiwiX2NvbnRleHQyNSIsImdldFByb2R1Y3RTdWdnZXN0IiwiX2NhbGxlZTI2IiwiX2NhbGxlZTI2JCIsIl9jb250ZXh0MjYiLCJsaXRlcmFsIiwiZ2V0U2l6ZVByb2R1Y3QiLCJfY2FsbGVlMjciLCJfY2FsbGVlMjckIiwiX2NvbnRleHQyNyIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcbi8vIGltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG4gIGFzeW5jIGdldFBob3RvUHJvZHVjdChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBzb3J0RGVzYyxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHByb3ZpbmNlLFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBwcm92aW5jZVRleHQsXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcbiAgICAgICAgd2FyZFRleHQsXG4gICAgICAgIGJ1ZGdldCxcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBlbmRvdyxcbiAgICAgICAgcmF0aW5nLFxuICAgICAgICBub3RlLFxuICAgICAgICB1c2VyX21hbmFnZXIsXG4gICAgICAgIGF1dGhvcl9waG9uZSxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgcHJvZHVjdF9pZFxuICAgICAgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuY3JlYXRlKHtcbiAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfHwgMCxcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIHNsdWc6IHNsdWcsXG4gICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgICBicmFuZDogYnJhbmQsXG4gICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxuICAgICAgICAgIHNvcnREZXNjOiBzb3J0RGVzYyxcbiAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5wYXRoIDogXCJcIixcbiAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXG4gICAgICAgICAgcHJvdmluY2U6IHByb3ZpbmNlLFxuICAgICAgICAgIGRpc3RyaWN0OiBkaXN0cmljdCxcbiAgICAgICAgICB3YXJkOiB3YXJkLFxuICAgICAgICAgIHByb3ZpbmNlVGV4dDogcHJvdmluY2VUZXh0ID8gcHJvdmluY2VUZXh0IDogXCJcIixcbiAgICAgICAgICBkaXN0cmljdFRleHQ6IGRpc3RyaWN0VGV4dCA/IGRpc3RyaWN0VGV4dCA6IFwiXCIsXG4gICAgICAgICAgd2FyZFRleHQ6IHdhcmRUZXh0ID8gd2FyZFRleHQgOiBcIlwiLFxuICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICBidWRnZXQ6IGJ1ZGdldCA/IGJ1ZGdldCA6IDAsXG4gICAgICAgICAgdHlwZVJvb206IHR5cGVSb29tID8gdHlwZVJvb20gOiBcIlwiLFxuICAgICAgICAgIGludGVyaW9yOiBpbnRlcmlvciA/IGludGVyaW9yIDogXCJcIixcbiAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXG4gICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxuICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXG4gICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgPyBhdXRob3JfcGhvbmUgOiBcIlwiLFxuICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogXCJcIixcbiAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0X2lkID8gcHJvZHVjdF9pZCA6IFwiXCJcblxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5wYXRoLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcbiAgICAgICAgICAgIEpTT04ucGFyc2UobmV3YWRkaW1hZ2UpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBKU09OLnBhcnNlKHNpemUpPy5tYXAoKGl0ZW0pID0+XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICBzaXplOiBpdGVtPy5zaXplLFxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgYW1vdW50OiBpdGVtPy5hbW91bnQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBwcm9kdWN0XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlcyxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICByZW50LFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHBob3RvLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHByb2R1Y3RfaWRcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCA/IGNhdGVnb3J5SWQgOiBwcm9kdWN0LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3Quc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5jaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICBwaG90bzogcGhvdG8sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxuICAgICAgICAgICAgICAgIGludGVyaW9yLFxuICAgICAgICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXG4gICAgICAgICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxuICAgICAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcmVudDogcmVudCA/IHJlbnQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJvdmluY2UsXG4gICAgICAgICAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgICAgICAgICAgd2FyZCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0X2lkID8gcHJvZHVjdF9pZCA6IFwiXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTMsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdDIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgZW5kb3c6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LCB7XG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0V2ViUHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCBkYi5wcm9kdWN0c2l6ZS5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgIH0pO1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0LCBkYXRhc2l6ZTogc2l6ZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkLCBxdHksIGRpc2NvdW50X3BlciwgZGlzY291bnRfcHJpY2UsIHRvdGFsLCBuZXRfcHJpY2UgfSA9XG4gICAgICAgIHJlcS5ib2R5O1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogXCJcIixcbiAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci51cGRhdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kQWxsKHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICBcImlkXCIsXG4gICAgICAgICAgICAgIFwiY2F0ZWdvcnlJZFwiLFxuICAgICAgICAgICAgICBcInByaWNlXCIsXG4gICAgICAgICAgICAgIFwiaXRlbV9uYW1lXCIsXG4gICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgXCJicmFuZFwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBzZWFyY2hQcm9kdWN0QnlTdWJDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5zdWJDYXQgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiBkYXRhLmlkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3REZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3RPZmZlckRlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5wYXJhbXMuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgbXVsdGlwbGVQaG90b1VwbG9hZChyZXEsIHJlcywgbmV4dCkge1xuICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xuICAgIHZhciBwcm9kdWN0SWQgPSByZXEuYm9keS5wcm9kdWN0SWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dGFjaG1lbnRFbnRyaWVzLnB1c2goe1xuICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgbmFtZTogcmVxLmZpbGVzW2ldLmZpbGVuYW1lLFxuICAgICAgICBtaW1lOiByZXEuZmlsZXNbaV0ubWltZXR5cGUsXG4gICAgICAgIGltZ1VybDogcmVxLmZpbGVzW2ldLnBhdGgsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgIC8vIHJldHVybiBxdWV1ZS5jcmVhdGUoJ2ltZy11cGxvYWQnLCB7XG4gICAgICAgICAgLy8gICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgIC8vICAgICBwcm9kdWN0TmFtZTogci5pdGVtX25hbWUsXG4gICAgICAgICAgLy8gICAgIGF0dGFjaG1lbnRFbnRyaWVzOiBhdHRhY2htZW50RW50cmllcyxcbiAgICAgICAgICAvLyB9KS5zYXZlKCk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoeyAuLi5hdHRhY2htZW50RW50cmllc1tpXSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS5maWxlcyB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGdldEFsbFBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGRlbGV0ZVNsaWRlclBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxuICAvLyBlZGl0IHRvIHNhbGUgcHJvZHVjdFxuICBhc3luYyBnZXRBbGxHcm9jZXJyeVN0YXBsZXMocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxuICAgICAgICAgIC8vIHdoZXJlOiB7IGRpc2NvdW50OiAnZ3JvY2VyeS1zdGFwbGUnIH0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJkaXNjb3VudFBlclwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLmNhdGVnb3J5XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBmaWx0ZXIgcHJvZHVjdFxuXG4gIGFzeW5jIGdldEZpbHRlcmJ5UHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VhcmNoID0gXCIlJVwiO1xuICAgICAgaWYgKHJlcS5xdWVyeS5zZWFyY2gpIHtcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XG4gICAgICB9XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgW09wLm9yXTogW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogeyBbT3AubGlrZV06IHNlYXJjaCB9LCBzbHVnOiB7IFtPcC5saWtlXTogc2VhcmNoIH0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgR2V0QWxsQnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5Lm5hbWUgfSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5LFxuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGF3cyBpbWFnZSBkZWxldGVcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQsIGltZ1VybCB9ID0gcmVxLmJvZHk7XG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXG4gICAgICAvLyBkZWxldGVGaWxlRnJvbVMzKGltZ1VybClcblxuICAgICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAgIC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcblxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0U3ViQ2hpbGRDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFNlcXVlbGl6ZS5saXRlcmFsKFwiUkFORCgpXCIpLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0U2l6ZVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RzaXplXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFxQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1BQUEsT0FBQUMsT0FBQSxXQUFBQyxHQUFBLFFBQUFDLGdCQUFBLGFBQUFQLE1BQUEsRUFBQU0sR0FBQSxFQUFBRixNQUFBLENBQUFFLEdBQUEsU0FBQWhCLE1BQUEsQ0FBQWtCLHlCQUFBLEdBQUFsQixNQUFBLENBQUFtQixnQkFBQSxDQUFBVCxNQUFBLEVBQUFWLE1BQUEsQ0FBQWtCLHlCQUFBLENBQUFKLE1BQUEsS0FBQWxCLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLEdBQUFDLE9BQUEsV0FBQUMsR0FBQSxJQUFBaEIsTUFBQSxDQUFBb0IsY0FBQSxDQUFBVixNQUFBLEVBQUFNLEdBQUEsRUFBQWhCLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVMsTUFBQSxFQUFBRSxHQUFBLGlCQUFBTixNQUFBO0FBQ3JDLElBQUFXLFFBQUEsR0FBMEIxQixPQUFPLENBQUMsV0FBVyxDQUFDO0VBQXRDMkIsRUFBRSxHQUFBRCxRQUFBLENBQUZDLEVBQUU7RUFBRUMsU0FBUyxHQUFBRixRQUFBLENBQVRFLFNBQVM7QUFDckI7QUFBQSxJQUFBQyxRQUFBLEdBQ2U7RUFDYiw0REFDTUMsZUFBZSxXQUFBQSxnQkFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxTQUFBO01BQUEsT0FBQUgsWUFBQSxZQUFBSSxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtVQUFBO1lBQ3RCTCxTQUFTLEdBQUtOLEdBQUcsQ0FBQ1ksS0FBSyxDQUF2Qk4sU0FBUztZQUNqQk8sVUFBRSxDQUFDQyxZQUFZLENBQ1pDLE9BQU8sQ0FBQztjQUNQQyxLQUFLLEVBQUU7Z0JBQ0xWLFNBQVMsRUFBVEE7Y0FDRjtZQUNGLENBQUMsQ0FBQyxDQUNEVyxJQUFJLENBQUMsVUFBQ0MsT0FBTyxFQUFLO2NBQ2pCLE9BQU9qQixHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRUMsRUFBRSxFQUFFLElBQUk7Z0JBQUVDLElBQUksRUFBRUo7Y0FBUSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDO1VBQUM7VUFBQTtZQUFBLE9BQUFULFFBQUEsQ0FBQWMsSUFBQTtRQUFBO01BQUEsR0FBQWxCLE9BQUE7SUFBQTtFQUNQLENBQUM7RUFDS21CLFVBQVUsV0FBQUEsV0FBQ3hCLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFxQixTQUFBO01BQUEsSUFBQUMsU0FBQSxFQUFBQyxVQUFBLEVBQUFDLGFBQUEsRUFBQUMsZUFBQSxFQUFBQyxJQUFBLEVBQUFDLElBQUEsRUFBQUMsS0FBQSxFQUFBYixNQUFBLEVBQUFjLFFBQUEsRUFBQUMsUUFBQSxFQUFBQyxJQUFBLEVBQUFDLFVBQUEsRUFBQUMsS0FBQSxFQUFBQyxHQUFBLEVBQUFDLFFBQUEsRUFBQUMsV0FBQSxFQUFBQyxLQUFBLEVBQUFDLFFBQUEsRUFBQUMsS0FBQSxFQUFBQyxJQUFBLEVBQUFDLFdBQUEsRUFBQUMsV0FBQSxFQUFBQyxRQUFBLEVBQUFDLFFBQUEsRUFBQUMsSUFBQSxFQUFBQyxNQUFBLEVBQUFDLFlBQUEsRUFBQUMsWUFBQSxFQUFBQyxRQUFBLEVBQUFDLE1BQUEsRUFBQUMsUUFBQSxFQUFBQyxRQUFBLEVBQUFDLEtBQUEsRUFBQUMsTUFBQSxFQUFBQyxJQUFBLEVBQUFDLFlBQUEsRUFBQUMsWUFBQSxFQUFBQyxPQUFBLEVBQUFDLFVBQUE7TUFBQSxPQUFBNUQsWUFBQSxZQUFBSSxJQUFBLFVBQUF5RCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXZELElBQUEsR0FBQXVELFNBQUEsQ0FBQXRELElBQUE7VUFBQTtZQUFBc0QsU0FBQSxDQUFBdkQsSUFBQTtZQUFBZ0IsU0FBQSxHQXlDekIxQixHQUFHLENBQUNrRSxJQUFJLEVBdENWdkMsVUFBVSxHQUFBRCxTQUFBLENBQVZDLFVBQVUsRUFDVkMsYUFBYSxHQUFBRixTQUFBLENBQWJFLGFBQWEsRUFDYkMsZUFBZSxHQUFBSCxTQUFBLENBQWZHLGVBQWUsRUFDZkMsSUFBSSxHQUFBSixTQUFBLENBQUpJLElBQUksRUFDSkMsSUFBSSxHQUFBTCxTQUFBLENBQUpLLElBQUksRUFDSkMsS0FBSyxHQUFBTixTQUFBLENBQUxNLEtBQUssRUFDTGIsTUFBTSxHQUFBTyxTQUFBLENBQU5QLE1BQU0sRUFDTmMsUUFBUSxHQUFBUCxTQUFBLENBQVJPLFFBQVEsRUFDUkMsUUFBUSxHQUFBUixTQUFBLENBQVJRLFFBQVEsRUFDUkMsSUFBSSxHQUFBVCxTQUFBLENBQUpTLElBQUksRUFDSkMsVUFBVSxHQUFBVixTQUFBLENBQVZVLFVBQVUsRUFDVkMsS0FBSyxHQUFBWCxTQUFBLENBQUxXLEtBQUssRUFDTEMsR0FBRyxHQUFBWixTQUFBLENBQUhZLEdBQUcsRUFDSEMsUUFBUSxHQUFBYixTQUFBLENBQVJhLFFBQVEsRUFDUkMsV0FBVyxHQUFBZCxTQUFBLENBQVhjLFdBQVcsRUFDWEMsS0FBSyxHQUFBZixTQUFBLENBQUxlLEtBQUssRUFDTEMsUUFBUSxHQUFBaEIsU0FBQSxDQUFSZ0IsUUFBUSxFQUNSQyxLQUFLLEdBQUFqQixTQUFBLENBQUxpQixLQUFLLEVBQ0xDLElBQUksR0FBQWxCLFNBQUEsQ0FBSmtCLElBQUksRUFDSkMsV0FBVyxHQUFBbkIsU0FBQSxDQUFYbUIsV0FBVyxFQUNYQyxXQUFXLEdBQUFwQixTQUFBLENBQVhvQixXQUFXLEVBQ1hDLFFBQVEsR0FBQXJCLFNBQUEsQ0FBUnFCLFFBQVEsRUFDUkMsUUFBUSxHQUFBdEIsU0FBQSxDQUFSc0IsUUFBUSxFQUNSQyxJQUFJLEdBQUF2QixTQUFBLENBQUp1QixJQUFJLEVBQ0pDLE1BQU0sR0FBQXhCLFNBQUEsQ0FBTndCLE1BQU0sRUFDTkMsWUFBWSxHQUFBekIsU0FBQSxDQUFaeUIsWUFBWSxFQUNaQyxZQUFZLEdBQUExQixTQUFBLENBQVowQixZQUFZLEVBQ1pDLFFBQVEsR0FBQTNCLFNBQUEsQ0FBUjJCLFFBQVEsRUFDUkMsTUFBTSxHQUFBNUIsU0FBQSxDQUFONEIsTUFBTSxFQUNOQyxRQUFRLEdBQUE3QixTQUFBLENBQVI2QixRQUFRLEVBQ1JDLFFBQVEsR0FBQTlCLFNBQUEsQ0FBUjhCLFFBQVEsRUFDUkMsS0FBSyxHQUFBL0IsU0FBQSxDQUFMK0IsS0FBSyxFQUNMQyxNQUFNLEdBQUFoQyxTQUFBLENBQU5nQyxNQUFNLEVBQ05DLElBQUksR0FBQWpDLFNBQUEsQ0FBSmlDLElBQUksRUFDSkMsWUFBWSxHQUFBbEMsU0FBQSxDQUFaa0MsWUFBWSxFQUNaQyxZQUFZLEdBQUFuQyxTQUFBLENBQVptQyxZQUFZLEVBQ1pDLE9BQU8sR0FBQXBDLFNBQUEsQ0FBUG9DLE9BQU8sRUFDUEMsVUFBVSxHQUFBckMsU0FBQSxDQUFWcUMsVUFBVTtZQUVabEQsVUFBRSxDQUFDSyxPQUFPLENBQ1BpRCxNQUFNLENBQUM7Y0FDTnhDLFVBQVUsRUFBRUEsVUFBVTtjQUN0QkMsYUFBYSxFQUFFQSxhQUFhO2NBQzVCQyxlQUFlLEVBQUVBLGVBQWUsSUFBSSxDQUFDO2NBQ3JDQyxJQUFJLEVBQUVBLElBQUk7Y0FDVkMsSUFBSSxFQUFFQSxJQUFJO2NBQ1ZaLE1BQU0sRUFBRWlELFFBQVEsQ0FBQ2pELE1BQU0sQ0FBQyxHQUFHLFFBQVEsR0FBRyxVQUFVO2NBQ2hEYSxLQUFLLEVBQUVBLEtBQUs7Y0FDWkMsUUFBUSxFQUFFQSxRQUFRO2NBQ2xCQyxRQUFRLEVBQUVBLFFBQVE7Y0FDbEJDLElBQUksRUFBRUEsSUFBSTtjQUNWQyxVQUFVLEVBQUVBLFVBQVU7Y0FDdEJDLEtBQUssRUFBRUEsS0FBSztjQUNaQyxHQUFHLEVBQUVBLEdBQUc7Y0FDUkMsUUFBUSxFQUFFQSxRQUFRO2NBQ2xCQyxXQUFXLEVBQUVBLFdBQVc7Y0FDeEJDLEtBQUssRUFBRUEsS0FBSztjQUNaQyxRQUFRLEVBQUVBLFFBQVE7Y0FDbEIyQixLQUFLLEVBQUVyRSxHQUFHLENBQUNzRSxJQUFJLEdBQUd0RSxHQUFHLENBQUNzRSxJQUFJLENBQUNDLElBQUksR0FBRyxFQUFFO2NBQ3BDekIsV0FBVyxFQUFFQSxXQUFXO2NBQ3hCQyxRQUFRLEVBQUVBLFFBQVE7Y0FDbEJDLFFBQVEsRUFBRUEsUUFBUTtjQUNsQkMsSUFBSSxFQUFFQSxJQUFJO2NBQ1ZFLFlBQVksRUFBRUEsWUFBWSxHQUFHQSxZQUFZLEdBQUcsRUFBRTtjQUM5Q0MsWUFBWSxFQUFFQSxZQUFZLEdBQUdBLFlBQVksR0FBRyxFQUFFO2NBQzlDQyxRQUFRLEVBQUVBLFFBQVEsR0FBR0EsUUFBUSxHQUFHLEVBQUU7Y0FDbENILE1BQU0sRUFBRUEsTUFBTSxHQUFHQSxNQUFNLEdBQUcsQ0FBQztjQUMzQkksTUFBTSxFQUFFQSxNQUFNLEdBQUdBLE1BQU0sR0FBRyxDQUFDO2NBQzNCQyxRQUFRLEVBQUVBLFFBQVEsR0FBR0EsUUFBUSxHQUFHLEVBQUU7Y0FDbENDLFFBQVEsRUFBRUEsUUFBUSxHQUFHQSxRQUFRLEdBQUcsRUFBRTtjQUNsQ0MsS0FBSyxFQUFFQSxLQUFLLEdBQUdBLEtBQUssR0FBRyxDQUFDO2NBQ3hCQyxNQUFNLEVBQUVBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLENBQUM7Y0FDM0JDLElBQUksRUFBRUEsSUFBSSxHQUFHQSxJQUFJLEdBQUcsRUFBRTtjQUN0QkMsWUFBWSxFQUFFQSxZQUFZLEdBQUdBLFlBQVksR0FBRyxFQUFFO2NBQzlDQyxZQUFZLEVBQUVBLFlBQVksR0FBR0EsWUFBWSxHQUFHLEVBQUU7Y0FDOUNDLE9BQU8sRUFBRUEsT0FBTyxHQUFHQSxPQUFPLEdBQUcsRUFBRTtjQUMvQkMsVUFBVSxFQUFFQSxVQUFVLEdBQUdBLFVBQVUsR0FBRztZQUV4QyxDQUFDLENBQUMsQ0FDRDlDLElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Y0FBQSxJQUFBc0QsV0FBQSxFQUFBQyxZQUFBO2NBQ2pCLENBQUFELFdBQUEsR0FBQUUsSUFBSSxDQUFDQyxLQUFLLENBQUNoQyxLQUFLLENBQUMsY0FBQTZCLFdBQUEsdUJBQWpCQSxXQUFBLENBQW1CSSxHQUFHLENBQUMsVUFBQ0MsSUFBSTtnQkFBQSxPQUMxQmhFLFVBQUUsQ0FBQ0MsWUFBWSxDQUFDcUQsTUFBTSxDQUFDO2tCQUNyQlcsTUFBTSxFQUFFRCxJQUFJLGFBQUpBLElBQUksdUJBQUpBLElBQUksQ0FBRU4sSUFBSTtrQkFDbEJqRSxTQUFTLEVBQUVZLE9BQU8sQ0FBQzZELFVBQVUsQ0FBQ0M7Z0JBQ2hDLENBQUMsQ0FBQztjQUFBLENBQ0osQ0FBQztjQUNELElBQUluQyxXQUFXLEVBQUU7Z0JBQUEsSUFBQW9DLFlBQUE7Z0JBQ2YsQ0FBQUEsWUFBQSxHQUFBUCxJQUFJLENBQUNDLEtBQUssQ0FBQzlCLFdBQVcsQ0FBQyxjQUFBb0MsWUFBQSx1QkFBdkJBLFlBQUEsQ0FBeUJMLEdBQUcsQ0FBQyxVQUFDQyxJQUFJO2tCQUFBLE9BQ2hDaEUsVUFBRSxDQUFDQyxZQUFZLENBQUNxRCxNQUFNLENBQUM7b0JBQ3JCVyxNQUFNLEVBQUVELElBQUksYUFBSkEsSUFBSSx1QkFBSkEsSUFBSSxDQUFFSyxRQUFRO29CQUN0QjVFLFNBQVMsRUFBRVksT0FBTyxDQUFDNkQsVUFBVSxDQUFDQztrQkFDaEMsQ0FBQyxDQUFDO2dCQUFBLENBQ0osQ0FBQztjQUNIO2NBQ0EsQ0FBQVAsWUFBQSxHQUFBQyxJQUFJLENBQUNDLEtBQUssQ0FBQy9CLElBQUksQ0FBQyxjQUFBNkIsWUFBQSx1QkFBaEJBLFlBQUEsQ0FBa0JHLEdBQUcsQ0FBQyxVQUFDQyxJQUFJO2dCQUFBLE9BQ3pCaEUsVUFBRSxDQUFDc0UsV0FBVyxDQUFDaEIsTUFBTSxDQUFDO2tCQUNwQnZCLElBQUksRUFBRWlDLElBQUksYUFBSkEsSUFBSSx1QkFBSkEsSUFBSSxDQUFFakMsSUFBSTtrQkFDaEJ0QyxTQUFTLEVBQUVZLE9BQU8sQ0FBQzZELFVBQVUsQ0FBQ0MsRUFBRTtrQkFDaENJLE1BQU0sRUFBRVAsSUFBSSxhQUFKQSxJQUFJLHVCQUFKQSxJQUFJLENBQUVPO2dCQUNoQixDQUFDLENBQUM7Y0FBQSxDQUNKLENBQUM7Y0FDRG5GLEdBQUcsQ0FDQWtCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWEMsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUVDLEdBQUcsRUFBRTtjQUFnQyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVQyxHQUFHLEVBQUU7Y0FDcEJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7Y0FDaEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7WUFDWCxDQUFDLENBQUM7WUFBQ3RCLFNBQUEsQ0FBQXRELElBQUE7WUFBQTtVQUFBO1lBQUFzRCxTQUFBLENBQUF2RCxJQUFBO1lBQUF1RCxTQUFBLENBQUF5QixFQUFBLEdBQUF6QixTQUFBO1lBQUEsT0FBQUEsU0FBQSxDQUFBMEIsTUFBQSxXQUdFMUYsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUE2QyxTQUFBLENBQUF5QixFQUFJLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXpCLFNBQUEsQ0FBQTFDLElBQUE7UUFBQTtNQUFBLEdBQUFFLFFBQUE7SUFBQTtFQUVwQyxDQUFDO0VBRUttRSxLQUFLLFdBQUFBLE1BQUM1RixHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBeUYsU0FBQTtNQUFBLElBQUFDLFVBQUEsRUFBQUMsVUFBQSxFQUFBcEUsVUFBQSxFQUFBQyxhQUFBO01BQUEsT0FBQXpCLFlBQUEsWUFBQUksSUFBQSxVQUFBeUYsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUF2RixJQUFBLEdBQUF1RixTQUFBLENBQUF0RixJQUFBO1VBQUE7WUFBQXNGLFNBQUEsQ0FBQXZGLElBQUE7WUFBQW9GLFVBQUEsR0FFMEI5RixHQUFHLENBQUNZLEtBQUssRUFBbkRtRixVQUFVLEdBQUFELFVBQUEsQ0FBVkMsVUFBVSxFQUFFcEUsVUFBVSxHQUFBbUUsVUFBQSxDQUFWbkUsVUFBVSxFQUFFQyxhQUFhLEdBQUFrRSxVQUFBLENBQWJsRSxhQUFhO1lBQzdDZixVQUFFLENBQUNLLE9BQU8sQ0FDUEgsT0FBTyxDQUFDO2NBQ1BtRixLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztjQUM5QkMsT0FBTyxFQUFFLENBQ1A7Z0JBQ0VDLEtBQUssRUFBRXZGLFVBQUUsQ0FBQ3dGLElBQUk7Z0JBQ2RDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVTtjQUM1QyxDQUFDLENBQ0Y7Y0FDRHRGLEtBQUssRUFBRTtnQkFDTCtFLFVBQVUsRUFBRUEsVUFBVTtnQkFDdEJwRSxVQUFVLEVBQUVBLFVBQVU7Z0JBQ3RCQyxhQUFhLEVBQUVBO2NBQ2pCO1lBQ0YsQ0FBQyxDQUFDLENBQ0RYLElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Y0FDakJqQixHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFbkUsT0FBTyxFQUFQQTtjQUFRLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVxRSxHQUFHLEVBQUU7Y0FDcEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7WUFDWCxDQUFDLENBQUM7WUFBQ1UsU0FBQSxDQUFBdEYsSUFBQTtZQUFBO1VBQUE7WUFBQXNGLFNBQUEsQ0FBQXZGLElBQUE7WUFBQXVGLFNBQUEsQ0FBQVAsRUFBQSxHQUFBTyxTQUFBO1lBQUEsTUFFQyxJQUFJTSxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFOLFNBQUEsQ0FBQTFFLElBQUE7UUFBQTtNQUFBLEdBQUFzRSxRQUFBO0lBQUE7RUFFbkMsQ0FBQztFQUVLVyxpQkFBaUIsV0FBQUEsa0JBQUN4RyxHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBcUcsU0FBQTtNQUFBLE9BQUF0RyxZQUFBLFlBQUFJLElBQUEsVUFBQW1HLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBakcsSUFBQSxHQUFBaUcsU0FBQSxDQUFBaEcsSUFBQTtVQUFBO1lBQUFnRyxTQUFBLENBQUFqRyxJQUFBO1lBRXBDRyxVQUFFLENBQUNLLE9BQU8sQ0FDUEgsT0FBTyxDQUFDO2NBQ1BtRixLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztjQUM5QkMsT0FBTyxFQUFFLENBQ1A7Z0JBQ0VDLEtBQUssRUFBRXZGLFVBQUUsQ0FBQytGLFdBQVc7Z0JBQ3JCTixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2dCQUM5QkgsT0FBTyxFQUFFLENBQUM7a0JBQUVDLEtBQUssRUFBRXZGLFVBQUUsQ0FBQ2dHLFFBQVE7a0JBQUVQLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNO2dCQUFFLENBQUM7Y0FDOUQsQ0FBQyxFQUNEO2dCQUNFRixLQUFLLEVBQUV2RixVQUFFLENBQUN3RixJQUFJO2dCQUNkQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVU7Y0FDNUMsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUNEckYsSUFBSSxDQUFDLFVBQUNDLE9BQU8sRUFBSztjQUNqQmpCLEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUVuRSxPQUFPLEVBQVBBO2NBQVEsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtjQUNwQjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUFDb0IsU0FBQSxDQUFBaEcsSUFBQTtZQUFBO1VBQUE7WUFBQWdHLFNBQUEsQ0FBQWpHLElBQUE7WUFBQWlHLFNBQUEsQ0FBQWpCLEVBQUEsR0FBQWlCLFNBQUE7WUFBQSxNQUVDLElBQUlKLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQUksU0FBQSxDQUFBcEYsSUFBQTtRQUFBO01BQUEsR0FBQWtGLFFBQUE7SUFBQTtFQUVuQyxDQUFDO0VBRUtLLE1BQU0sV0FBQUEsT0FBQzlHLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUEyRyxTQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBMUcsU0FBQSxFQUFBcUIsVUFBQSxFQUFBQyxhQUFBLEVBQUFDLGVBQUEsRUFBQUMsSUFBQSxFQUFBQyxJQUFBLEVBQUFDLEtBQUEsRUFBQWIsTUFBQSxFQUFBYyxRQUFBLEVBQUFFLElBQUEsRUFBQUMsVUFBQSxFQUFBQyxLQUFBLEVBQUFDLEdBQUEsRUFBQUMsUUFBQSxFQUFBQyxXQUFBLEVBQUFDLEtBQUEsRUFBQUMsUUFBQSxFQUFBdUUsTUFBQSxFQUFBckUsSUFBQSxFQUFBQyxXQUFBLEVBQUFDLFdBQUEsRUFBQVMsUUFBQSxFQUFBQyxRQUFBLEVBQUFOLE1BQUEsRUFBQU8sS0FBQSxFQUFBQyxNQUFBLEVBQUFDLElBQUEsRUFBQUMsWUFBQSxFQUFBc0QsSUFBQSxFQUFBckQsWUFBQSxFQUFBQyxPQUFBLEVBQUFPLEtBQUEsRUFBQXRCLFFBQUEsRUFBQUMsUUFBQSxFQUFBQyxJQUFBLEVBQUFjLFVBQUE7TUFBQSxPQUFBNUQsWUFBQSxZQUFBSSxJQUFBLFVBQUE0RyxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQTFHLElBQUEsR0FBQTBHLFNBQUEsQ0FBQXpHLElBQUE7VUFBQTtZQUFBeUcsU0FBQSxDQUFBMUcsSUFBQTtZQUFBc0csVUFBQSxHQXVDckJoSCxHQUFHLENBQUNrRSxJQUFJLEVBcENWNUQsU0FBUyxHQUFBMEcsVUFBQSxDQUFUMUcsU0FBUyxFQUNUcUIsVUFBVSxHQUFBcUYsVUFBQSxDQUFWckYsVUFBVSxFQUNWQyxhQUFhLEdBQUFvRixVQUFBLENBQWJwRixhQUFhLEVBQ2JDLGVBQWUsR0FBQW1GLFVBQUEsQ0FBZm5GLGVBQWUsRUFDZkMsSUFBSSxHQUFBa0YsVUFBQSxDQUFKbEYsSUFBSSxFQUNKQyxJQUFJLEdBQUFpRixVQUFBLENBQUpqRixJQUFJLEVBQ0pDLEtBQUssR0FBQWdGLFVBQUEsQ0FBTGhGLEtBQUssRUFDTGIsTUFBTSxHQUFBNkYsVUFBQSxDQUFON0YsTUFBTSxFQUNOYyxRQUFRLEdBQUErRSxVQUFBLENBQVIvRSxRQUFRLEVBQ1JFLElBQUksR0FBQTZFLFVBQUEsQ0FBSjdFLElBQUksRUFDSkMsVUFBVSxHQUFBNEUsVUFBQSxDQUFWNUUsVUFBVSxFQUNWQyxLQUFLLEdBQUEyRSxVQUFBLENBQUwzRSxLQUFLLEVBQ0xDLEdBQUcsR0FBQTBFLFVBQUEsQ0FBSDFFLEdBQUcsRUFDSEMsUUFBUSxHQUFBeUUsVUFBQSxDQUFSekUsUUFBUSxFQUNSQyxXQUFXLEdBQUF3RSxVQUFBLENBQVh4RSxXQUFXLEVBQ1hDLEtBQUssR0FBQXVFLFVBQUEsQ0FBTHZFLEtBQUssRUFDTEMsUUFBUSxHQUFBc0UsVUFBQSxDQUFSdEUsUUFBUSxFQUNSdUUsTUFBTSxHQUFBRCxVQUFBLENBQU5DLE1BQU0sRUFDTnJFLElBQUksR0FBQW9FLFVBQUEsQ0FBSnBFLElBQUksRUFDSkMsV0FBVyxHQUFBbUUsVUFBQSxDQUFYbkUsV0FBVyxFQUNYQyxXQUFXLEdBQUFrRSxVQUFBLENBQVhsRSxXQUFXLEVBQ1hTLFFBQVEsR0FBQXlELFVBQUEsQ0FBUnpELFFBQVEsRUFDUkMsUUFBUSxHQUFBd0QsVUFBQSxDQUFSeEQsUUFBUSxFQUNSTixNQUFNLEdBQUE4RCxVQUFBLENBQU45RCxNQUFNLEVBQ05PLEtBQUssR0FBQXVELFVBQUEsQ0FBTHZELEtBQUssRUFDTEMsTUFBTSxHQUFBc0QsVUFBQSxDQUFOdEQsTUFBTSxFQUNOQyxJQUFJLEdBQUFxRCxVQUFBLENBQUpyRCxJQUFJLEVBQ0pDLFlBQVksR0FBQW9ELFVBQUEsQ0FBWnBELFlBQVksRUFDWnNELElBQUksR0FBQUYsVUFBQSxDQUFKRSxJQUFJLEVBQ0pyRCxZQUFZLEdBQUFtRCxVQUFBLENBQVpuRCxZQUFZLEVBQ1pDLE9BQU8sR0FBQWtELFVBQUEsQ0FBUGxELE9BQU8sRUFDUE8sS0FBSyxHQUFBMkMsVUFBQSxDQUFMM0MsS0FBSyxFQUNMdEIsUUFBUSxHQUFBaUUsVUFBQSxDQUFSakUsUUFBUSxFQUNSQyxRQUFRLEdBQUFnRSxVQUFBLENBQVJoRSxRQUFRLEVBQ1JDLElBQUksR0FBQStELFVBQUEsQ0FBSi9ELElBQUksRUFDSmMsVUFBVSxHQUFBaUQsVUFBQSxDQUFWakQsVUFBVTtZQUVabEQsVUFBRSxDQUFDSyxPQUFPLENBQ1BtRyxPQUFPLENBQUM7Y0FBRXJHLEtBQUssRUFBRTtnQkFBRWdFLEVBQUUsRUFBRTFFO2NBQVU7WUFBRSxDQUFDLENBQUMsQ0FDckNXLElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Y0FDakIsSUFBSUEsT0FBTyxFQUFFO2dCQUNYLE9BQU9MLFVBQUUsQ0FBQ0ssT0FBTyxDQUFDNEYsTUFBTSxDQUN0QjtrQkFDRW5GLFVBQVUsRUFBRUEsVUFBVSxHQUFHQSxVQUFVLEdBQUdULE9BQU8sQ0FBQ1MsVUFBVTtrQkFDeERDLGFBQWEsRUFBRUEsYUFBYSxHQUN4QkEsYUFBYSxHQUNiVixPQUFPLENBQUNVLGFBQWE7a0JBQ3pCQyxlQUFlLEVBQUVBLGVBQWUsR0FDNUJBLGVBQWUsR0FDZlgsT0FBTyxDQUFDVyxlQUFlO2tCQUMzQkMsSUFBSSxFQUFFQSxJQUFJO2tCQUNWQyxJQUFJLEVBQUVBLElBQUk7a0JBQ1ZaLE1BQU0sRUFBRWlELFFBQVEsQ0FBQ2pELE1BQU0sQ0FBQyxHQUFHLFFBQVEsR0FBRyxVQUFVO2tCQUNoRGEsS0FBSyxFQUFFQSxLQUFLO2tCQUNaQyxRQUFRLEVBQUVBLFFBQVE7a0JBQ2xCRSxJQUFJLEVBQUVBLElBQUk7a0JBQ1ZDLFVBQVUsRUFBRUEsVUFBVTtrQkFDdEJDLEtBQUssRUFBRUEsS0FBSztrQkFDWkMsR0FBRyxFQUFFQSxHQUFHO2tCQUNSQyxRQUFRLEVBQUVBLFFBQVE7a0JBQ2xCQyxXQUFXLEVBQUVBLFdBQVc7a0JBQ3hCQyxLQUFLLEVBQUVBLEtBQUs7a0JBQ1pDLFFBQVEsRUFBRUEsUUFBUTtrQkFDbEIyQixLQUFLLEVBQUVBLEtBQUs7a0JBQ1p2QixXQUFXLEVBQUVBLFdBQVc7a0JBQ3hCUyxRQUFRLEVBQVJBLFFBQVE7a0JBQ1JDLFFBQVEsRUFBUkEsUUFBUTtrQkFDUk4sTUFBTSxFQUFFQSxNQUFNLEdBQUdBLE1BQU0sR0FBRyxDQUFDO2tCQUMzQk8sS0FBSyxFQUFFQSxLQUFLLEdBQUdBLEtBQUssR0FBRyxDQUFDO2tCQUN4QkMsTUFBTSxFQUFFQSxNQUFNLEdBQUdBLE1BQU0sR0FBRyxDQUFDO2tCQUMzQkMsSUFBSSxFQUFFQSxJQUFJLEdBQUdBLElBQUksR0FBRyxFQUFFO2tCQUN0QkMsWUFBWSxFQUFFQSxZQUFZLEdBQUdBLFlBQVksR0FBRyxFQUFFO2tCQUM5Q3NELElBQUksRUFBRUEsSUFBSSxHQUFHQSxJQUFJLEdBQUcsRUFBRTtrQkFDdEJyRCxZQUFZLEVBQUVBLFlBQVksR0FBR0EsWUFBWSxHQUFHLEVBQUU7a0JBQzlDQyxPQUFPLEVBQUVBLE9BQU8sR0FBR0EsT0FBTyxHQUFHLEVBQUU7a0JBQy9CZixRQUFRLEVBQVJBLFFBQVE7a0JBQ1JDLFFBQVEsRUFBUkEsUUFBUTtrQkFDUkMsSUFBSSxFQUFKQSxJQUFJO2tCQUNKYyxVQUFVLEVBQUVBLFVBQVUsR0FBR0EsVUFBVSxHQUFHO2dCQUN4QyxDQUFDLEVBQ0Q7a0JBQUUvQyxLQUFLLEVBQUU7b0JBQUVnRSxFQUFFLEVBQUUxRTtrQkFBVTtnQkFBRSxDQUM3QixDQUFDO2NBQ0g7Y0FDQSxNQUFNLElBQUlpRyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUNEdEYsSUFBSSxDQUFDLFVBQUNxRyxDQUFDLEVBQUs7Y0FDWCxJQUFJekUsV0FBVyxFQUFFO2dCQUFBLElBQUEwRSxZQUFBO2dCQUNmLENBQUFBLFlBQUEsR0FBQTdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDOUIsV0FBVyxDQUFDLGNBQUEwRSxZQUFBLHVCQUF2QkEsWUFBQSxDQUF5QjNDLEdBQUcsQ0FBQyxVQUFDQyxJQUFJO2tCQUFBLE9BQ2hDaEUsVUFBRSxDQUFDQyxZQUFZLENBQUNxRCxNQUFNLENBQUM7b0JBQ3JCVyxNQUFNLEVBQUVELElBQUksYUFBSkEsSUFBSSx1QkFBSkEsSUFBSSxDQUFFSyxRQUFRO29CQUN0QjVFLFNBQVMsRUFBRUE7a0JBQ2IsQ0FBQyxDQUFDO2dCQUFBLENBQ0osQ0FBQztjQUNIO2NBQ0EsSUFBSXNDLElBQUksRUFBRTtnQkFDUi9CLFVBQUUsQ0FBQ3NFLFdBQVcsQ0FBQ3FDLE9BQU8sQ0FBQztrQkFDckJ4RyxLQUFLLEVBQUU7b0JBQUVWLFNBQVMsRUFBVEE7a0JBQVU7Z0JBQ3JCLENBQUMsQ0FBQztnQkFDRk8sVUFBRSxDQUFDc0UsV0FBVyxDQUFDc0MsVUFBVSxDQUN2Qi9DLElBQUksQ0FBQ0MsS0FBSyxDQUFDL0IsSUFBSSxDQUFDLENBQUNnQyxHQUFHLENBQUMsVUFBQThDLElBQUE7a0JBQUEsSUFBRzlFLElBQUksR0FBQThFLElBQUEsQ0FBSjlFLElBQUk7b0JBQUV3QyxNQUFNLEdBQUFzQyxJQUFBLENBQU50QyxNQUFNO2tCQUFBLE9BQVE7b0JBQzFDeEMsSUFBSSxFQUFKQSxJQUFJO29CQUNKd0MsTUFBTSxFQUFOQSxNQUFNO29CQUNOOUUsU0FBUyxFQUFUQTtrQkFDRixDQUFDO2dCQUFBLENBQUMsQ0FDSixDQUFDO2NBQ0g7Y0FDQSxJQUFJMkcsTUFBTSxFQUFFO2dCQUNWcEcsVUFBRSxDQUFDQyxZQUFZLENBQUMwRyxPQUFPLENBQUM7a0JBQ3RCeEcsS0FBSyxFQUFFO29CQUFFVixTQUFTLEVBQUVBO2tCQUFVO2dCQUNoQyxDQUFDLENBQUM7Z0JBQ0ZPLFVBQUUsQ0FBQ0MsWUFBWSxDQUFDMkcsVUFBVSxDQUN4Qi9DLElBQUksQ0FBQ0MsS0FBSyxDQUFDc0MsTUFBTSxDQUFDLENBQUNyQyxHQUFHLENBQUMsVUFBQ0MsSUFBSTtrQkFBQSxPQUFBOUYsYUFBQSxDQUFBQSxhQUFBLEtBQVc4RixJQUFJO29CQUFFdkUsU0FBUyxFQUFUQTtrQkFBUztnQkFBQSxDQUFHLENBQzNELENBQUM7Y0FDSDtjQUNBTCxHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFQyxHQUFHLEVBQUU7Y0FBdUIsQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVUMsR0FBRyxFQUFFO2NBQ3BCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1lBQUM2QixTQUFBLENBQUF6RyxJQUFBO1lBQUE7VUFBQTtZQUFBeUcsU0FBQSxDQUFBMUcsSUFBQTtZQUFBMEcsU0FBQSxDQUFBMUIsRUFBQSxHQUFBMEIsU0FBQTtZQUFBLE1BRUMsSUFBSWIsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBYSxTQUFBLENBQUE3RixJQUFBO1FBQUE7TUFBQSxHQUFBd0YsUUFBQTtJQUFBO0VBRW5DLENBQUM7RUFDS1ksd0JBQXdCLFdBQUFBLHlCQUFDM0gsR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXdILFNBQUE7TUFBQSxPQUFBekgsWUFBQSxZQUFBSSxJQUFBLFVBQUFzSCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXBILElBQUEsR0FBQW9ILFNBQUEsQ0FBQW5ILElBQUE7VUFBQTtZQUFBbUgsU0FBQSxDQUFBcEgsSUFBQTtZQUUzQ0csVUFBRSxDQUFDSyxPQUFPLENBQ1BILE9BQU8sQ0FBQztjQUNQbUYsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztjQUNqQmxGLEtBQUssRUFBRTtnQkFDTFcsVUFBVSxFQUFFM0IsR0FBRyxDQUFDWSxLQUFLLENBQUNlLFVBQVU7Z0JBQ2hDQyxhQUFhLEVBQUU1QixHQUFHLENBQUNZLEtBQUssQ0FBQ2dCO2NBQzNCLENBQUM7Y0FDRHVFLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNDLFlBQVk7Z0JBQUV3RixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQ0RyRixJQUFJLENBQUMsVUFBQzhHLElBQUksRUFBSztjQUNkOUgsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtnQkFBRS9ELElBQUksRUFBRXlHO2NBQUssQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXhDLEdBQUcsRUFBRTtjQUNwQjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUFDdUMsU0FBQSxDQUFBbkgsSUFBQTtZQUFBO1VBQUE7WUFBQW1ILFNBQUEsQ0FBQXBILElBQUE7WUFBQW9ILFNBQUEsQ0FBQXBDLEVBQUEsR0FBQW9DLFNBQUE7WUFBQSxNQUVDLElBQUl2QixZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUF1QixTQUFBLENBQUF2RyxJQUFBO1FBQUE7TUFBQSxHQUFBcUcsUUFBQTtJQUFBO0VBRW5DLENBQUM7RUFDS0ksc0JBQXNCLFdBQUFBLHVCQUFDaEksR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTZILFNBQUE7TUFBQSxPQUFBOUgsWUFBQSxZQUFBSSxJQUFBLFVBQUEySCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXpILElBQUEsR0FBQXlILFNBQUEsQ0FBQXhILElBQUE7VUFBQTtZQUFBd0gsU0FBQSxDQUFBekgsSUFBQTtZQUV6Q0csVUFBRSxDQUFDSyxPQUFPLENBQ1BILE9BQU8sQ0FBQztjQUNQbUYsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztjQUNqQmxGLEtBQUssRUFBRTtnQkFDTFcsVUFBVSxFQUFFO2dCQUNaO2NBQ0YsQ0FBQzs7Y0FDRHdFLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNDLFlBQVk7Z0JBQUV3RixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUMsQ0FBQztjQUNuRThCLEtBQUssRUFBRTtZQUNULENBQUMsQ0FBQyxDQUNEbkgsSUFBSSxDQUFDLFVBQUM4RyxJQUFJLEVBQUs7Y0FDZDlILEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUUvRCxJQUFJLEVBQUV5RztjQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVV4QyxHQUFHLEVBQUU7Y0FDcEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7WUFDWCxDQUFDLENBQUM7WUFBQzRDLFNBQUEsQ0FBQXhILElBQUE7WUFBQTtVQUFBO1lBQUF3SCxTQUFBLENBQUF6SCxJQUFBO1lBQUF5SCxTQUFBLENBQUF6QyxFQUFBLEdBQUF5QyxTQUFBO1lBQUEsTUFFQyxJQUFJNUIsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBNEIsU0FBQSxDQUFBNUcsSUFBQTtRQUFBO01BQUEsR0FBQTBHLFFBQUE7SUFBQTtFQUVuQyxDQUFDO0VBQ0tJLDBCQUEwQixXQUFBQSwyQkFBQ3JJLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFrSSxTQUFBO01BQUEsT0FBQW5JLFlBQUEsWUFBQUksSUFBQSxVQUFBZ0ksVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUE5SCxJQUFBLEdBQUE4SCxTQUFBLENBQUE3SCxJQUFBO1VBQUE7WUFBQTZILFNBQUEsQ0FBQTlILElBQUE7WUFFN0NHLFVBQUUsQ0FBQ0ssT0FBTyxDQUNQSCxPQUFPLENBQUM7Y0FDUG1GLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Y0FDakJsRixLQUFLLEVBQUU7Z0JBQ0xXLFVBQVUsRUFBRTtnQkFDWjtjQUNGLENBQUM7O2NBQ0R3RSxPQUFPLEVBQUUsQ0FBQztnQkFBRUMsS0FBSyxFQUFFdkYsVUFBRSxDQUFDQyxZQUFZO2dCQUFFd0YsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDLENBQUM7Y0FDbkU4QixLQUFLLEVBQUU7WUFDVCxDQUFDLENBQUMsQ0FDRG5ILElBQUksQ0FBQyxVQUFDOEcsSUFBSSxFQUFLO2NBQ2Q5SCxHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFL0QsSUFBSSxFQUFFeUc7Y0FBSyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVeEMsR0FBRyxFQUFFO2NBQ3BCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1lBQUNpRCxTQUFBLENBQUE3SCxJQUFBO1lBQUE7VUFBQTtZQUFBNkgsU0FBQSxDQUFBOUgsSUFBQTtZQUFBOEgsU0FBQSxDQUFBOUMsRUFBQSxHQUFBOEMsU0FBQTtZQUFBLE1BRUMsSUFBSWpDLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWlDLFNBQUEsQ0FBQWpILElBQUE7UUFBQTtNQUFBLEdBQUErRyxRQUFBO0lBQUE7RUFFbkMsQ0FBQztFQUNLRyxrQkFBa0IsV0FBQUEsbUJBQUN6SSxHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBc0ksU0FBQTtNQUFBLE9BQUF2SSxZQUFBLFlBQUFJLElBQUEsVUFBQW9JLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBbEksSUFBQSxHQUFBa0ksU0FBQSxDQUFBakksSUFBQTtVQUFBO1lBQUFpSSxTQUFBLENBQUFsSSxJQUFBO1lBRXJDRyxVQUFFLENBQUNLLE9BQU8sQ0FDUEgsT0FBTyxDQUFDO2NBQ1BtRixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2NBQ2pCbEYsS0FBSyxFQUFFO2dCQUNMeUMsS0FBSyxFQUFFO2NBQ1QsQ0FBQztjQUNEMEMsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRXZGLFVBQUUsQ0FBQ0MsWUFBWTtnQkFBRXdGLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRO2NBQUUsQ0FBQyxDQUFDO2NBQ25FOEIsS0FBSyxFQUFFO1lBQ1QsQ0FBQyxDQUFDLENBQ0RuSCxJQUFJLENBQUMsVUFBQzhHLElBQUksRUFBSztjQUNkOUgsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVDLEVBQUUsRUFBRSxJQUFJO2dCQUFFQyxJQUFJLEVBQUV5RztjQUFLLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVV4QyxHQUFHLEVBQUU7Y0FDcEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7WUFDWCxDQUFDLENBQUM7WUFBQ3FELFNBQUEsQ0FBQWpJLElBQUE7WUFBQTtVQUFBO1lBQUFpSSxTQUFBLENBQUFsSSxJQUFBO1lBQUFrSSxTQUFBLENBQUFsRCxFQUFBLEdBQUFrRCxTQUFBO1lBQUEsTUFFQyxJQUFJckMsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBcUMsU0FBQSxDQUFBckgsSUFBQTtRQUFBO01BQUEsR0FBQW1ILFFBQUE7SUFBQTtFQUVuQyxDQUFDO0VBQ0tHLGtCQUFrQixXQUFBQSxtQkFBQzdJLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUEwSSxVQUFBO01BQUEsT0FBQTNJLFlBQUEsWUFBQUksSUFBQSxVQUFBd0ksV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUF0SSxJQUFBLEdBQUFzSSxVQUFBLENBQUFySSxJQUFBO1VBQUE7WUFBQXFJLFVBQUEsQ0FBQXRJLElBQUE7WUFFckNHLFVBQUUsQ0FBQ0ssT0FBTyxDQUNQSCxPQUFPLENBQUM7Y0FDUEMsS0FBSyxFQUFFO2dCQUFFZ0UsRUFBRSxFQUFFaEYsR0FBRyxDQUFDWSxLQUFLLENBQUNvRTtjQUFHLENBQUM7Y0FDM0JtQixPQUFPLEVBQUUsQ0FBQztnQkFBRUMsS0FBSyxFQUFFdkYsVUFBRSxDQUFDQyxZQUFZO2dCQUFFd0YsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVE7Y0FBRSxDQUFDLEVBQUU7Z0JBQ2xFRixLQUFLLEVBQUV2RixVQUFFLENBQUN3RixJQUFJO2dCQUNkQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFVBQVU7Y0FDNUMsQ0FBQyxDQUFDO2NBQ0ZKLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FDRGpGLElBQUksQ0FBQyxVQUFDOEcsSUFBSSxFQUFLO2NBQ2Q5SCxHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFL0QsSUFBSSxFQUFFeUc7Y0FBSyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVeEMsR0FBRyxFQUFFO2NBQ3BCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1lBQUN5RCxVQUFBLENBQUFySSxJQUFBO1lBQUE7VUFBQTtZQUFBcUksVUFBQSxDQUFBdEksSUFBQTtZQUFBc0ksVUFBQSxDQUFBdEQsRUFBQSxHQUFBc0QsVUFBQTtZQUFBLE1BRUMsSUFBSXpDLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXlDLFVBQUEsQ0FBQXpILElBQUE7UUFBQTtNQUFBLEdBQUF1SCxTQUFBO0lBQUE7RUFFbkMsQ0FBQztFQUVLRyxxQkFBcUIsV0FBQUEsc0JBQUNqSixHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBOEksVUFBQTtNQUFBLElBQUF0RyxJQUFBO01BQUEsT0FBQXpDLFlBQUEsWUFBQUksSUFBQSxVQUFBNEksV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUExSSxJQUFBLEdBQUEwSSxVQUFBLENBQUF6SSxJQUFBO1VBQUE7WUFBQXlJLFVBQUEsQ0FBQTFJLElBQUE7WUFBQTBJLFVBQUEsQ0FBQXpJLElBQUE7WUFBQSxPQUVyQkUsVUFBRSxDQUFDc0UsV0FBVyxDQUFDcEUsT0FBTyxDQUFDO2NBQ3hDQyxLQUFLLEVBQUU7Z0JBQUVWLFNBQVMsRUFBRU4sR0FBRyxDQUFDWSxLQUFLLENBQUNvRTtjQUFHO1lBQ25DLENBQUMsQ0FBQztVQUFBO1lBRklwQyxJQUFJLEdBQUF3RyxVQUFBLENBQUFDLElBQUE7WUFHVnhJLFVBQUUsQ0FBQ0ssT0FBTyxDQUNQbUcsT0FBTyxDQUFDO2NBQ1ByRyxLQUFLLEVBQUU7Z0JBQUVnRSxFQUFFLEVBQUVoRixHQUFHLENBQUNZLEtBQUssQ0FBQ29FO2NBQUcsQ0FBQztjQUMzQm1CLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNDLFlBQVk7Z0JBQUV3RixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUMsQ0FBQztjQUNuRUosS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUNEakYsSUFBSSxDQUFDLFVBQUM4RyxJQUFJLEVBQUs7Y0FDZDlILEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUUvRCxJQUFJLEVBQUV5RyxJQUFJO2dCQUFFdUIsUUFBUSxFQUFFMUc7Y0FBSyxDQUFDLENBQUM7WUFDckUsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVMkMsR0FBRyxFQUFFO2NBQ3BCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1lBQUM2RCxVQUFBLENBQUF6SSxJQUFBO1lBQUE7VUFBQTtZQUFBeUksVUFBQSxDQUFBMUksSUFBQTtZQUFBMEksVUFBQSxDQUFBMUQsRUFBQSxHQUFBMEQsVUFBQTtZQUFBLE1BRUMsSUFBSTdDLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQTZDLFVBQUEsQ0FBQTdILElBQUE7UUFBQTtNQUFBLEdBQUEySCxTQUFBO0lBQUE7RUFFbkMsQ0FBQztFQUNLSyxlQUFlLFdBQUFBLGdCQUFDdkosR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQW9KLFVBQUE7TUFBQSxJQUFBQyxVQUFBLEVBQUFuSixTQUFBLEVBQUFnQyxHQUFBLEVBQUFvSCxZQUFBLEVBQUFDLGNBQUEsRUFBQWxILEtBQUEsRUFBQW1ILFNBQUE7TUFBQSxPQUFBekosWUFBQSxZQUFBSSxJQUFBLFVBQUFzSixXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQXBKLElBQUEsR0FBQW9KLFVBQUEsQ0FBQW5KLElBQUE7VUFBQTtZQUFBbUosVUFBQSxDQUFBcEosSUFBQTtZQUFBK0ksVUFBQSxHQUdoQ3pKLEdBQUcsQ0FBQ2tFLElBQUksRUFERjVELFNBQVMsR0FBQW1KLFVBQUEsQ0FBVG5KLFNBQVMsRUFBRWdDLEdBQUcsR0FBQW1ILFVBQUEsQ0FBSG5ILEdBQUcsRUFBRW9ILFlBQVksR0FBQUQsVUFBQSxDQUFaQyxZQUFZLEVBQUVDLGNBQWMsR0FBQUYsVUFBQSxDQUFkRSxjQUFjLEVBQUVsSCxLQUFLLEdBQUFnSCxVQUFBLENBQUxoSCxLQUFLLEVBQUVtSCxTQUFTLEdBQUFILFVBQUEsQ0FBVEcsU0FBUztZQUV0RS9JLFVBQUUsQ0FBQ2tKLFlBQVksQ0FBQzFDLE9BQU8sQ0FBQztjQUFFckcsS0FBSyxFQUFFO2dCQUFFZ0UsRUFBRSxFQUFFMUU7Y0FBVTtZQUFFLENBQUMsQ0FBQyxDQUNsRFcsSUFBSSxDQUFDLFVBQUM4RyxJQUFJLEVBQUs7Y0FDZCxJQUFJLENBQUNBLElBQUksRUFBRTtnQkFDVCxPQUFPbEgsVUFBRSxDQUFDa0osWUFBWSxDQUFDNUYsTUFBTSxDQUFDO2tCQUM1QjdELFNBQVMsRUFBRUEsU0FBUztrQkFDcEJxQyxLQUFLLEVBQUUzQyxHQUFHLENBQUNzRSxJQUFJLEdBQUd0RSxHQUFHLENBQUNzRSxJQUFJLENBQUMwRixRQUFRLEdBQUcsRUFBRTtrQkFDeEMxSCxHQUFHLEVBQUVBLEdBQUc7a0JBQ1JvSCxZQUFZLEVBQUVBLFlBQVk7a0JBQzFCQyxjQUFjLEVBQUVBLGNBQWM7a0JBQzlCbEgsS0FBSyxFQUFFQSxLQUFLO2tCQUNabUgsU0FBUyxFQUFFQTtnQkFDYixDQUFDLENBQUM7Y0FDSixDQUFDLE1BQU07Z0JBQ0wsT0FBTy9JLFVBQUUsQ0FBQ2tKLFlBQVksQ0FBQ2pELE1BQU0sQ0FDM0I7a0JBQ0V4RSxHQUFHLEVBQUVBLEdBQUc7a0JBQ1JvSCxZQUFZLEVBQUVBLFlBQVk7a0JBQzFCQyxjQUFjLEVBQUVBLGNBQWM7a0JBQzlCbEgsS0FBSyxFQUFFQSxLQUFLO2tCQUNabUgsU0FBUyxFQUFFQTtnQkFDYixDQUFDLEVBQ0Q7a0JBQUU1SSxLQUFLLEVBQUU7b0JBQUVnRSxFQUFFLEVBQUUrQyxJQUFJLENBQUMvQztrQkFBRztnQkFBRSxDQUMzQixDQUFDO2NBQ0g7WUFDRixDQUFDLENBQUMsQ0FDRC9ELElBQUksQ0FBQyxVQUFDcUcsQ0FBQyxFQUFLO2NBQ1hySCxHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFQyxHQUFHLEVBQUU7Y0FBZSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVQyxHQUFHLEVBQUU7Y0FDcEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7WUFDWCxDQUFDLENBQUM7WUFBQ3VFLFVBQUEsQ0FBQW5KLElBQUE7WUFBQTtVQUFBO1lBQUFtSixVQUFBLENBQUFwSixJQUFBO1lBQUFvSixVQUFBLENBQUFwRSxFQUFBLEdBQUFvRSxVQUFBO1lBQUEsTUFFQyxJQUFJdkQsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBdUQsVUFBQSxDQUFBdkksSUFBQTtRQUFBO01BQUEsR0FBQWlJLFNBQUE7SUFBQTtFQUVuQyxDQUFDO0VBRUtTLGVBQWUsV0FBQUEsZ0JBQUNqSyxHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBOEosVUFBQTtNQUFBLE9BQUEvSixZQUFBLFlBQUFJLElBQUEsVUFBQTRKLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBMUosSUFBQSxHQUFBMEosVUFBQSxDQUFBekosSUFBQTtVQUFBO1lBQUF5SixVQUFBLENBQUExSixJQUFBO1lBRWxDRyxVQUFFLENBQUNrSixZQUFZLENBQUNoSixPQUFPLENBQUM7Y0FDdEJvRixPQUFPLEVBQUUsQ0FDUDtnQkFDRUMsS0FBSyxFQUFFdkYsVUFBRSxDQUFDSyxPQUFPO2dCQUNqQm9GLFVBQVUsRUFBRSxDQUNWLElBQUksRUFDSixZQUFZLEVBQ1osT0FBTyxFQUNQLFdBQVcsRUFDWCxhQUFhLEVBQ2IsT0FBTyxDQUNSO2dCQUNESCxPQUFPLEVBQUUsQ0FBQztrQkFBRUMsS0FBSyxFQUFFdkYsVUFBRSxDQUFDZ0csUUFBUTtrQkFBRVAsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU07Z0JBQUUsQ0FBQztjQUM5RCxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQ0NyRixJQUFJLENBQUMsVUFBQzhHLElBQUksRUFBSztjQUNkOUgsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtnQkFBRS9ELElBQUksRUFBRXlHO2NBQUssQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXhDLEdBQUcsRUFBRTtjQUNwQjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUFDNkUsVUFBQSxDQUFBekosSUFBQTtZQUFBO1VBQUE7WUFBQXlKLFVBQUEsQ0FBQTFKLElBQUE7WUFBQTBKLFVBQUEsQ0FBQTFFLEVBQUEsR0FBQTBFLFVBQUE7WUFBQSxNQUVDLElBQUk3RCxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUE2RCxVQUFBLENBQUE3SSxJQUFBO1FBQUE7TUFBQSxHQUFBMkksU0FBQTtJQUFBO0VBRW5DLENBQUM7RUFFS0cscUJBQXFCLFdBQUFBLHNCQUFDckssR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWtLLFVBQUE7TUFBQSxPQUFBbkssWUFBQSxZQUFBSSxJQUFBLFVBQUFnSyxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQTlKLElBQUEsR0FBQThKLFVBQUEsQ0FBQTdKLElBQUE7VUFBQTtZQUFBNkosVUFBQSxDQUFBOUosSUFBQTtZQUV4Q0csVUFBRSxDQUFDK0YsV0FBVyxDQUFDUyxPQUFPLENBQUM7Y0FDckJyRyxLQUFLLEVBQUU7Z0JBQUV5SixRQUFRLEVBQUV6SyxHQUFHLENBQUNrRSxJQUFJLENBQUN3RztjQUFPO1lBQ3JDLENBQUMsQ0FBQyxDQUNDekosSUFBSSxDQUFDLFVBQUNLLElBQUksRUFBSztjQUNkLElBQUlBLElBQUksRUFBRTtnQkFDUixPQUFPVCxVQUFFLENBQUNLLE9BQU8sQ0FBQ0gsT0FBTyxDQUFDO2tCQUN4QkMsS0FBSyxFQUFFO29CQUFFWSxhQUFhLEVBQUVOLElBQUksQ0FBQzBEO2tCQUFHO2dCQUNsQyxDQUFDLENBQUM7Y0FDSjtZQUNGLENBQUMsQ0FBQyxDQUNEL0QsSUFBSSxDQUFDLFVBQUM4RyxJQUFJLEVBQUs7Y0FDZHZDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDZixJQUFJLENBQUNpRyxTQUFTLENBQUM1QyxJQUFJLENBQUMsQ0FBQztjQUNqQzlILEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUUvRCxJQUFJLEVBQUV5RztjQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUM7WUFBQ3lDLFVBQUEsQ0FBQTdKLElBQUE7WUFBQTtVQUFBO1lBQUE2SixVQUFBLENBQUE5SixJQUFBO1lBQUE4SixVQUFBLENBQUE5RSxFQUFBLEdBQUE4RSxVQUFBO1lBQUEsTUFFQyxJQUFJakUsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBaUUsVUFBQSxDQUFBakosSUFBQTtRQUFBO01BQUEsR0FBQStJLFNBQUE7SUFBQTtFQUVuQyxDQUFDO0VBRUtNLGFBQWEsV0FBQUEsY0FBQzVLLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUF5SyxVQUFBO01BQUEsT0FBQTFLLFlBQUEsWUFBQUksSUFBQSxVQUFBdUssV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUFySyxJQUFBLEdBQUFxSyxVQUFBLENBQUFwSyxJQUFBO1VBQUE7WUFDbENFLFVBQUUsQ0FBQ0ssT0FBTyxDQUNQbUcsT0FBTyxDQUFDO2NBQUVyRyxLQUFLLEVBQUU7Z0JBQUVnRSxFQUFFLEVBQUVaLFFBQVEsQ0FBQ3BFLEdBQUcsQ0FBQ1ksS0FBSyxDQUFDb0UsRUFBRTtjQUFFO1lBQUUsQ0FBQyxDQUFDLENBQ2xEL0QsSUFBSSxDQUFDLFVBQUNDLE9BQU8sRUFBSztjQUNqQixJQUFJQSxPQUFPLEVBQUU7Z0JBQ1gsT0FBT0wsVUFBRSxDQUFDSyxPQUFPLENBQUNzRyxPQUFPLENBQUM7a0JBQUV4RyxLQUFLLEVBQUU7b0JBQUVnRSxFQUFFLEVBQUU5RCxPQUFPLENBQUM4RDtrQkFBRztnQkFBRSxDQUFDLENBQUM7Y0FDMUQ7Y0FDQSxNQUFNLElBQUl1QixZQUFZLENBQUMsc0JBQXNCLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQ0R0RixJQUFJLENBQUMsVUFBQytKLEVBQUUsRUFBSztjQUNaLE9BQU8vSyxHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRUQsTUFBTSxFQUFFO2NBQStCLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUNvRSxHQUFHLEVBQUs7Y0FDZDVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBd0YsVUFBQSxDQUFBeEosSUFBQTtRQUFBO01BQUEsR0FBQXNKLFNBQUE7SUFBQTtFQUNQLENBQUM7RUFFS0ksa0JBQWtCLFdBQUFBLG1CQUFDakwsR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQThLLFVBQUE7TUFBQSxPQUFBL0ssWUFBQSxZQUFBSSxJQUFBLFVBQUE0SyxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQTFLLElBQUEsR0FBQTBLLFVBQUEsQ0FBQXpLLElBQUE7VUFBQTtZQUN2Q0UsVUFBRSxDQUFDa0osWUFBWSxDQUFDMUMsT0FBTyxDQUFDO2NBQUVyRyxLQUFLLEVBQUU7Z0JBQUVnRSxFQUFFLEVBQUVaLFFBQVEsQ0FBQ3BFLEdBQUcsQ0FBQ3FMLE1BQU0sQ0FBQ3JHLEVBQUU7Y0FBRTtZQUFFLENBQUMsQ0FBQyxDQUNoRS9ELElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Y0FDakIsSUFBSUEsT0FBTyxFQUFFO2dCQUNYLE9BQU9MLFVBQUUsQ0FBQ2tKLFlBQVksQ0FBQ3ZDLE9BQU8sQ0FBQztrQkFBRXhHLEtBQUssRUFBRTtvQkFBRWdFLEVBQUUsRUFBRTlELE9BQU8sQ0FBQzhEO2tCQUFHO2dCQUFFLENBQUMsQ0FBQztjQUMvRDtjQUNBLE1BQU0sSUFBSXVCLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FDRHRGLElBQUksQ0FBQyxVQUFDK0osRUFBRSxFQUFLO2NBQ1osT0FBTy9LLEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFRCxNQUFNLEVBQUU7Y0FBK0IsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQ29FLEdBQUcsRUFBSztjQUNkNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1VBQUM7VUFBQTtZQUFBLE9BQUE2RixVQUFBLENBQUE3SixJQUFBO1FBQUE7TUFBQSxHQUFBMkosU0FBQTtJQUFBO0VBQ1AsQ0FBQztFQUVLSSxtQkFBbUIsV0FBQUEsb0JBQUN0TCxHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBbUwsVUFBQTtNQUFBLElBQUFDLGlCQUFBLEVBQUFsTCxTQUFBLEVBQUFyQixDQUFBO01BQUEsT0FBQWtCLFlBQUEsWUFBQUksSUFBQSxVQUFBa0wsV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUFoTCxJQUFBLEdBQUFnTCxVQUFBLENBQUEvSyxJQUFBO1VBQUE7WUFDcEM2SyxpQkFBaUIsR0FBRyxFQUFFO1lBQ3RCbEwsU0FBUyxHQUFHTixHQUFHLENBQUNrRSxJQUFJLENBQUM1RCxTQUFTO1lBQ2xDLEtBQVNyQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdlLEdBQUcsQ0FBQzJMLEtBQUssQ0FBQ3hNLE1BQU0sRUFBRUYsQ0FBQyxFQUFFLEVBQUU7Y0FDekN1TSxpQkFBaUIsQ0FBQzNNLElBQUksQ0FBQztnQkFDckJ5QixTQUFTLEVBQUVBLFNBQVM7Z0JBQ3BCd0IsSUFBSSxFQUFFOUIsR0FBRyxDQUFDMkwsS0FBSyxDQUFDMU0sQ0FBQyxDQUFDLENBQUMyTSxRQUFRO2dCQUMzQkMsSUFBSSxFQUFFN0wsR0FBRyxDQUFDMkwsS0FBSyxDQUFDMU0sQ0FBQyxDQUFDLENBQUM2TSxRQUFRO2dCQUMzQmhILE1BQU0sRUFBRTlFLEdBQUcsQ0FBQzJMLEtBQUssQ0FBQzFNLENBQUMsQ0FBQyxDQUFDc0Y7Y0FDdkIsQ0FBQyxDQUFDO1lBQ0o7WUFFQTFELFVBQUUsQ0FBQ0ssT0FBTyxDQUNQbUcsT0FBTyxDQUFDO2NBQ1ByRyxLQUFLLEVBQUU7Z0JBQUVnRSxFQUFFLEVBQUUxRTtjQUFVO1lBQ3pCLENBQUMsQ0FBQyxDQUNEVyxJQUFJLENBQUMsVUFBQzhLLENBQUMsRUFBSztjQUNYLElBQUlBLENBQUMsRUFBRTtnQkFDTDtnQkFDQTtnQkFDQTtnQkFDQTtnQkFDQTtnQkFDQSxLQUFLLElBQUk5TSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdlLEdBQUcsQ0FBQzJMLEtBQUssQ0FBQ3hNLE1BQU0sRUFBRUYsQ0FBQyxFQUFFLEVBQUU7a0JBQ3pDNEIsVUFBRSxDQUFDQyxZQUFZLENBQUNxRCxNQUFNLENBQUFwRixhQUFBLEtBQU15TSxpQkFBaUIsQ0FBQ3ZNLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ3JEO2NBQ0Y7WUFDRixDQUFDLENBQUMsQ0FDRGdDLElBQUksQ0FBQyxVQUFDOEssQ0FBQyxFQUFLO2NBQ1g5TCxHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFL0QsSUFBSSxFQUFFdEIsR0FBRyxDQUFDMkw7Y0FBTSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVSyxLQUFLLEVBQUU7Y0FDdEJ4RyxPQUFPLENBQUNDLEdBQUcsQ0FBQ3VHLEtBQUssQ0FBQztjQUNsQi9MLEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFNkssTUFBTSxFQUFFLENBQUMsb0JBQW9CO2NBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBUCxVQUFBLENBQUFuSyxJQUFBO1FBQUE7TUFBQSxHQUFBZ0ssU0FBQTtJQUFBO0VBQ1AsQ0FBQztFQUVLVyxXQUFXLFdBQUFBLFlBQUNsTSxHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBK0wsVUFBQTtNQUFBLE9BQUFoTSxZQUFBLFlBQUFJLElBQUEsVUFBQTZMLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBM0wsSUFBQSxHQUFBMkwsVUFBQSxDQUFBMUwsSUFBQTtVQUFBO1lBQUEwTCxVQUFBLENBQUEzTCxJQUFBO1lBRTlCRyxVQUFFLENBQUNLLE9BQU8sQ0FDUEgsT0FBTyxDQUFDO2NBQ1BtRixLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztjQUM5QkksVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Y0FDbkNILE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNDLFlBQVk7Z0JBQUV3RixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtjQUFFLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQ0RyRixJQUFJLENBQUMsVUFBQ0ssSUFBSSxFQUFLO2NBQ2RyQixHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxJQUFJO2dCQUFFL0QsSUFBSSxFQUFKQTtjQUFLLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVpRSxHQUFHLEVBQUU7Y0FDcEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7WUFDWCxDQUFDLENBQUM7WUFBQzhHLFVBQUEsQ0FBQTFMLElBQUE7WUFBQTtVQUFBO1lBQUEwTCxVQUFBLENBQUEzTCxJQUFBO1lBQUEyTCxVQUFBLENBQUEzRyxFQUFBLEdBQUEyRyxVQUFBO1lBQUEsTUFFQyxJQUFJOUYsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBOEYsVUFBQSxDQUFBOUssSUFBQTtRQUFBO01BQUEsR0FBQTRLLFNBQUE7SUFBQTtFQUVuQyxDQUFDO0VBRUtHLGlCQUFpQixXQUFBQSxrQkFBQ3RNLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFtTSxVQUFBO01BQUEsT0FBQXBNLFlBQUEsWUFBQUksSUFBQSxVQUFBaU0sV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUEvTCxJQUFBLEdBQUErTCxVQUFBLENBQUE5TCxJQUFBO1VBQUE7WUFDdENFLFVBQUUsQ0FBQ0MsWUFBWSxDQUNadUcsT0FBTyxDQUFDO2NBQUVyRyxLQUFLLEVBQUU7Z0JBQUVnRSxFQUFFLEVBQUVaLFFBQVEsQ0FBQ3BFLEdBQUcsQ0FBQ1ksS0FBSyxDQUFDb0UsRUFBRTtjQUFFO1lBQUUsQ0FBQyxDQUFDLENBQ2xEL0QsSUFBSSxDQUFDLFVBQUNDLE9BQU8sRUFBSztjQUNqQixJQUFJQSxPQUFPLEVBQUU7Z0JBQ1gsT0FBT0wsVUFBRSxDQUFDQyxZQUFZLENBQUMwRyxPQUFPLENBQUM7a0JBQUV4RyxLQUFLLEVBQUU7b0JBQUVnRSxFQUFFLEVBQUVoRixHQUFHLENBQUNZLEtBQUssQ0FBQ29FO2tCQUFHO2dCQUFFLENBQUMsQ0FBQztjQUNqRTtjQUNBLE1BQU0sSUFBSXVCLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FDRHRGLElBQUksQ0FBQyxVQUFDK0osRUFBRSxFQUFLO2NBQ1osT0FBTy9LLEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFRCxNQUFNLEVBQUU7Y0FBK0IsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQ29FLEdBQUcsRUFBSztjQUNkNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1VBQUM7VUFBQTtZQUFBLE9BQUFrSCxVQUFBLENBQUFsTCxJQUFBO1FBQUE7TUFBQSxHQUFBZ0wsU0FBQTtJQUFBO0VBQ1AsQ0FBQztFQUNEO0VBQ0E7RUFDTUcscUJBQXFCLFdBQUFBLHNCQUFDMU0sR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXVNLFVBQUE7TUFBQSxPQUFBeE0sWUFBQSxZQUFBSSxJQUFBLFVBQUFxTSxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQW5NLElBQUEsR0FBQW1NLFVBQUEsQ0FBQWxNLElBQUE7VUFBQTtZQUFBa00sVUFBQSxDQUFBbk0sSUFBQTtZQUV4Q0csVUFBRSxDQUFDSyxPQUFPLENBQ1BILE9BQU8sQ0FBQztjQUNQO2NBQ0E7Y0FDQW1GLEtBQUssRUFBRSxDQUFDLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2NBQ2hDa0MsS0FBSyxFQUFFO1lBQ1QsQ0FBQyxDQUFDLENBQ0RuSCxJQUFJLENBQUMsVUFBQ0MsT0FBTyxFQUFLO2NBQ2pCakIsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtnQkFBRS9ELElBQUksRUFBRUosT0FBTyxJQUFJO2NBQUcsQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtjQUNwQjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUFDc0gsVUFBQSxDQUFBbE0sSUFBQTtZQUFBO1VBQUE7WUFBQWtNLFVBQUEsQ0FBQW5NLElBQUE7WUFBQW1NLFVBQUEsQ0FBQW5ILEVBQUEsR0FBQW1ILFVBQUE7WUFBQSxNQUVDLElBQUl0RyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFzRyxVQUFBLENBQUF0TCxJQUFBO1FBQUE7TUFBQSxHQUFBb0wsU0FBQTtJQUFBO0VBRW5DLENBQUM7RUFFS0csbUJBQW1CLFdBQUFBLG9CQUFDOU0sR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTJNLFVBQUE7TUFBQSxPQUFBNU0sWUFBQSxZQUFBSSxJQUFBLFVBQUF5TSxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQXZNLElBQUEsR0FBQXVNLFVBQUEsQ0FBQXRNLElBQUE7VUFBQTtZQUFBc00sVUFBQSxDQUFBdk0sSUFBQTtZQUV0Q0csVUFBRSxDQUFDZ0csUUFBUSxDQUNSUSxPQUFPLENBQUM7Y0FDUGYsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO2NBQ2xCSCxPQUFPLEVBQUUsQ0FDUDtnQkFDRUMsS0FBSyxFQUFFdkYsVUFBRSxDQUFDSyxPQUFPO2dCQUNqQmdGLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QkMsT0FBTyxFQUFFLENBQ1A7a0JBQUVDLEtBQUssRUFBRXZGLFVBQUUsQ0FBQ0MsWUFBWTtrQkFBRXdGLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRO2dCQUFFLENBQUM7Y0FFNUQsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUNEckYsSUFBSSxDQUFDLFVBQUNDLE9BQU8sRUFBSztjQUNqQmpCLEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUUvRCxJQUFJLEVBQUVKO2NBQVEsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtjQUNwQjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUFDMEgsVUFBQSxDQUFBdE0sSUFBQTtZQUFBO1VBQUE7WUFBQXNNLFVBQUEsQ0FBQXZNLElBQUE7WUFBQXVNLFVBQUEsQ0FBQXZILEVBQUEsR0FBQXVILFVBQUE7WUFBQSxNQUVDLElBQUkxRyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUEwRyxVQUFBLENBQUExTCxJQUFBO1FBQUE7TUFBQSxHQUFBd0wsU0FBQTtJQUFBO0VBRW5DLENBQUM7RUFFRDtFQUVNRyxrQkFBa0IsV0FBQUEsbUJBQUNsTixHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBK00sVUFBQTtNQUFBLElBQUFDLE1BQUE7TUFBQSxPQUFBak4sWUFBQSxZQUFBSSxJQUFBLFVBQUE4TSxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQTVNLElBQUEsR0FBQTRNLFVBQUEsQ0FBQTNNLElBQUE7VUFBQTtZQUFBMk0sVUFBQSxDQUFBNU0sSUFBQTtZQUVqQzBNLE1BQU0sR0FBRyxJQUFJO1lBQ2pCLElBQUlwTixHQUFHLENBQUNZLEtBQUssQ0FBQ3dNLE1BQU0sRUFBRTtjQUNwQkEsTUFBTSxHQUFHLEdBQUcsR0FBR3BOLEdBQUcsQ0FBQ1ksS0FBSyxDQUFDd00sTUFBTSxHQUFHLEdBQUc7WUFDdkM7WUFDQXZNLFVBQUUsQ0FBQytGLFdBQVcsQ0FBQzdGLE9BQU8sQ0FBQztjQUNyQnVGLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7Y0FDOUJILE9BQU8sRUFBRSxDQUNQO2dCQUNFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNLLE9BQU87Z0JBQ2pCZ0YsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlCcUgsUUFBUSxFQUFFLElBQUk7Z0JBQ2R2TSxLQUFLLE1BQUF6QixnQkFBQSxpQkFDRkssRUFBRSxDQUFDNE4sRUFBRSxFQUFHLENBQ1A7a0JBQUUxTCxJQUFJLE1BQUF2QyxnQkFBQSxpQkFBS0ssRUFBRSxDQUFDNk4sSUFBSSxFQUFHTCxNQUFNLENBQUU7a0JBQUVyTCxJQUFJLE1BQUF4QyxnQkFBQSxpQkFBS0ssRUFBRSxDQUFDNk4sSUFBSSxFQUFHTCxNQUFNO2dCQUFHLENBQUMsQ0FDN0Q7Y0FFTCxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBRUNuTSxJQUFJLENBQUMsVUFBQ0MsT0FBTyxFQUFLO2NBQ2pCakIsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtnQkFBRS9ELElBQUksRUFBRUo7Y0FBUSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVcUUsR0FBRyxFQUFFO2NBQ3BCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1lBQUMrSCxVQUFBLENBQUEzTSxJQUFBO1lBQUE7VUFBQTtZQUFBMk0sVUFBQSxDQUFBNU0sSUFBQTtZQUFBNE0sVUFBQSxDQUFBNUgsRUFBQSxHQUFBNEgsVUFBQTtZQUFBLE1BRUMsSUFBSS9HLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQStHLFVBQUEsQ0FBQS9MLElBQUE7UUFBQTtNQUFBLEdBQUE0TCxTQUFBO0lBQUE7RUFFbkMsQ0FBQztFQUVLTyxnQkFBZ0IsV0FBQUEsaUJBQUMxTixHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBdU4sVUFBQTtNQUFBLE9BQUF4TixZQUFBLFlBQUFJLElBQUEsVUFBQXFOLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBbk4sSUFBQSxHQUFBbU4sVUFBQSxDQUFBbE4sSUFBQTtVQUFBO1lBQUFrTixVQUFBLENBQUFuTixJQUFBO1lBRW5DRyxVQUFFLENBQUMrRixXQUFXLENBQUNTLE9BQU8sQ0FBQztjQUNyQnJHLEtBQUssRUFBRTtnQkFBRXlKLFFBQVEsRUFBRXpLLEdBQUcsQ0FBQ2tFLElBQUksQ0FBQ3BDO2NBQUssQ0FBQztjQUNsQ3FFLE9BQU8sRUFBRSxDQUNQO2dCQUNFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNpTixnQkFBZ0I7Z0JBQzFCM0gsT0FBTyxFQUFFLENBQ1A7a0JBQ0VDLEtBQUssRUFBRXZGLFVBQUUsQ0FBQ0ssT0FBTztrQkFDakJnRixLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztrQkFDOUJDLE9BQU8sRUFBRSxDQUNQO29CQUFFQyxLQUFLLEVBQUV2RixVQUFFLENBQUNDLFlBQVk7b0JBQUV3RixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUTtrQkFBRSxDQUFDO2dCQUU1RCxDQUFDO2NBRUwsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUNDckYsSUFBSSxDQUFDLFVBQUNDLE9BQU8sRUFBSztjQUNqQmpCLEdBQUcsQ0FBQ2tCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFaUUsT0FBTyxFQUFFLElBQUk7Z0JBQUUvRCxJQUFJLEVBQUVKO2NBQVEsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtjQUNwQjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztZQUNYLENBQUMsQ0FBQztZQUFDc0ksVUFBQSxDQUFBbE4sSUFBQTtZQUFBO1VBQUE7WUFBQWtOLFVBQUEsQ0FBQW5OLElBQUE7WUFBQW1OLFVBQUEsQ0FBQW5JLEVBQUEsR0FBQW1JLFVBQUE7WUFBQSxNQUVDLElBQUl0SCxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFzSCxVQUFBLENBQUF0TSxJQUFBO1FBQUE7TUFBQSxHQUFBb00sU0FBQTtJQUFBO0VBRW5DLENBQUM7RUFFRDtFQUNNSSxxQkFBcUIsV0FBQUEsc0JBQUMvTixHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBNE4sVUFBQTtNQUFBLElBQUFDLFVBQUEsRUFBQWpKLEVBQUEsRUFBQUYsTUFBQTtNQUFBLE9BQUEzRSxZQUFBLFlBQUFJLElBQUEsVUFBQTJOLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBek4sSUFBQSxHQUFBeU4sVUFBQSxDQUFBeE4sSUFBQTtVQUFBO1lBQzFDLElBQUk7Y0FBQXNOLFVBQUEsR0FDcUJqTyxHQUFHLENBQUNrRSxJQUFJLEVBQXZCYyxFQUFFLEdBQUFpSixVQUFBLENBQUZqSixFQUFFLEVBQUVGLE1BQU0sR0FBQW1KLFVBQUEsQ0FBTm5KLE1BQU0sRUFDbEI7Y0FDQTtjQUVBakUsVUFBRSxDQUFDQyxZQUFZLENBQ1owRyxPQUFPLENBQUM7Z0JBQUV4RyxLQUFLLEVBQUU7a0JBQUVnRSxFQUFFLEVBQUVBO2dCQUFHO2NBQUUsQ0FBQyxDQUFDLENBRTlCL0QsSUFBSSxDQUFDLFVBQUNvRSxPQUFPLEVBQUs7Z0JBQ2pCcEYsR0FBRyxDQUNBa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNYQyxJQUFJLENBQUM7a0JBQ0ppRSxPQUFPLEVBQUUsSUFBSTtrQkFDYkMsR0FBRyxFQUFFO2dCQUNQLENBQUMsQ0FBQztjQUNOLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxPQUFPQyxHQUFHLEVBQUU7Y0FDWjVFLElBQUksQ0FBQzRFLEdBQUcsQ0FBQztjQUNUO1lBQ0Y7VUFBQztVQUFBO1lBQUEsT0FBQTRJLFVBQUEsQ0FBQTVNLElBQUE7UUFBQTtNQUFBLEdBQUF5TSxTQUFBO0lBQUE7RUFDSCxDQUFDO0VBRUtJLHFCQUFxQixXQUFBQSxzQkFBQ3BPLEdBQUcsRUFBRUMsR0FBRyxFQUFFVSxJQUFJLEVBQUU7SUFBQSxXQUFBVCxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFpTyxVQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBMU0sYUFBQSxFQUFBQyxlQUFBO01BQUEsT0FBQTFCLFlBQUEsWUFBQUksSUFBQSxVQUFBZ08sV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUE5TixJQUFBLEdBQUE4TixVQUFBLENBQUE3TixJQUFBO1VBQUE7WUFDMUMsSUFBSTtjQUFBMk4sVUFBQSxHQUN5Q3RPLEdBQUcsQ0FBQ2tFLElBQUksRUFBM0N0QyxhQUFhLEdBQUEwTSxVQUFBLENBQWIxTSxhQUFhLEVBQUVDLGVBQWUsR0FBQXlNLFVBQUEsQ0FBZnpNLGVBQWU7Y0FDdENoQixVQUFFLENBQUNLLE9BQU8sQ0FDUEgsT0FBTyxDQUFDO2dCQUNQQyxLQUFLLEVBQUU7a0JBQ0xhLGVBQWUsRUFBRUEsZUFBZTtrQkFDaENELGFBQWEsRUFBRUM7Z0JBQ2pCO2NBQ0YsQ0FBQyxDQUFDLENBQ0RaLElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Z0JBQ2pCakIsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtrQkFBRS9ELElBQUksRUFBRUo7Z0JBQVEsQ0FBQyxDQUFDO2NBQ3hELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtnQkFDcEI1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7Y0FDWCxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsT0FBT0EsR0FBRyxFQUFFO2NBQ1o1RSxJQUFJLENBQUM0RSxHQUFHLENBQUM7Y0FDVDtZQUNGO1VBQUM7VUFBQTtZQUFBLE9BQUFpSixVQUFBLENBQUFqTixJQUFBO1FBQUE7TUFBQSxHQUFBOE0sU0FBQTtJQUFBO0VBQ0gsQ0FBQztFQUNLSSxpQkFBaUIsV0FBQUEsa0JBQUN6TyxHQUFHLEVBQUVDLEdBQUcsRUFBRVUsSUFBSSxFQUFFO0lBQUEsV0FBQVQsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBc08sVUFBQTtNQUFBLE9BQUF2TyxZQUFBLFlBQUFJLElBQUEsVUFBQW9PLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBbE8sSUFBQSxHQUFBa08sVUFBQSxDQUFBak8sSUFBQTtVQUFBO1lBQ3RDLElBQUk7Y0FDRjtjQUNBRSxVQUFFLENBQUNLLE9BQU8sQ0FDUEgsT0FBTyxDQUFDO2dCQUNQO2dCQUNBbUYsS0FBSyxFQUFFckcsU0FBUyxDQUFDZ1AsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDbEN6RyxLQUFLLEVBQUU7Y0FDVCxDQUFDLENBQUMsQ0FDRG5ILElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Z0JBQ2pCakIsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtrQkFBRS9ELElBQUksRUFBRUo7Z0JBQVEsQ0FBQyxDQUFDO2NBQ3hELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtnQkFDcEJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7Z0JBQ2hCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO2NBQ1gsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLE9BQU9BLEdBQUcsRUFBRTtjQUNaNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO2NBQ1Q7WUFDRjtVQUFDO1VBQUE7WUFBQSxPQUFBcUosVUFBQSxDQUFBck4sSUFBQTtRQUFBO01BQUEsR0FBQW1OLFNBQUE7SUFBQTtFQUNILENBQUM7RUFDS0ksY0FBYyxXQUFBQSxlQUFDOU8sR0FBRyxFQUFFQyxHQUFHLEVBQUVVLElBQUksRUFBRTtJQUFBLFdBQUFULGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTJPLFVBQUE7TUFBQSxJQUFBek8sU0FBQTtNQUFBLE9BQUFILFlBQUEsWUFBQUksSUFBQSxVQUFBeU8sV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUF2TyxJQUFBLEdBQUF1TyxVQUFBLENBQUF0TyxJQUFBO1VBQUE7WUFDbkMsSUFBSTtjQUNNTCxTQUFTLEdBQUtOLEdBQUcsQ0FBQ1ksS0FBSyxDQUF2Qk4sU0FBUztjQUNqQk8sVUFBRSxDQUFDc0UsV0FBVyxDQUNYcEUsT0FBTyxDQUFDO2dCQUNQQyxLQUFLLEVBQUU7a0JBQUVWLFNBQVMsRUFBVEE7Z0JBQVU7Y0FDckIsQ0FBQyxDQUFDLENBQ0RXLElBQUksQ0FBQyxVQUFDQyxPQUFPLEVBQUs7Z0JBQ2pCakIsR0FBRyxDQUFDa0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7a0JBQUVpRSxPQUFPLEVBQUUsSUFBSTtrQkFBRS9ELElBQUksRUFBRUo7Z0JBQVEsQ0FBQyxDQUFDO2NBQ3hELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVXFFLEdBQUcsRUFBRTtnQkFDcEJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUM7Z0JBQ2hCNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO2NBQ1gsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLE9BQU9BLEdBQUcsRUFBRTtjQUNaNUUsSUFBSSxDQUFDNEUsR0FBRyxDQUFDO2NBQ1R0RixHQUFHLENBQUNrQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRWlFLE9BQU8sRUFBRSxLQUFLO2dCQUFFQyxHQUFHLEVBQUVDO2NBQUksQ0FBQyxDQUFDO1lBQ3BEO1VBQUM7VUFBQTtZQUFBLE9BQUEwSixVQUFBLENBQUExTixJQUFBO1FBQUE7TUFBQSxHQUFBd04sU0FBQTtJQUFBO0VBQ0g7QUFDRixDQUFDO0FBQUFHLE9BQUEsY0FBQXBQLFFBQUEifQ==