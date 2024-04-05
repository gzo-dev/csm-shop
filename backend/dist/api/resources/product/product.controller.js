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
  productDeleteBulk: function productDeleteBulk(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
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
            return _context16.stop();
        }
      }, _callee16);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
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
            return _context17.stop();
        }
      }, _callee17);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
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
            return _context18.stop();
        }
      }, _callee18);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
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
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
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
            return _context20.stop();
        }
      }, _callee20);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
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
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
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
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var search;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
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
            _context23.next = 9;
            break;
          case 6:
            _context23.prev = 6;
            _context23.t0 = _context23["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context23.stop();
        }
      }, _callee23, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
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
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
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
            return _context25.stop();
        }
      }, _callee25);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
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
            return _context26.stop();
        }
      }, _callee26);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
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
            return _context27.stop();
        }
      }, _callee27);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var productId;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
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
            return _context28.stop();
        }
      }, _callee28);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiYWRkcmVzcyIsInByb2R1Y3RfaWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJpbmRleCIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInN1cHBsaWVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJvcmRlciIsImluY2x1ZGUiLCJtb2RlbCIsInVzZXIiLCJhdHRyaWJ1dGVzIiwiUmVxdWVzdEVycm9yIiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIlN1YkNhdGVnb3J5IiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJyZW50IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwiZmluZE9uZSIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRQcm9kdWN0U3VnZ2VzdDIiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwiZ2V0V2ViUHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTExIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJzZW50IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTIiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTQiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicmUiLCJwcm9kdWN0RGVsZXRlQnVsayIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTE4IiwiYXR0YWNobWVudEVudHJpZXMiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsImZpbGVzIiwiZmlsZW5hbWUiLCJtaW1lIiwibWltZXR5cGUiLCJyIiwiZXJyb3IiLCJlcnJvcnMiLCJnZXRBbGxQaG90byIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwiZGVsZXRlU2xpZGVyUGhvdG8iLCJfY2FsbGVlMjAiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsImdldEFsbEdyb2NlcnJ5U3RhcGxlcyIsIl9jYWxsZWUyMSIsIl9jYWxsZWUyMSQiLCJfY29udGV4dDIxIiwiZ2V0QWxsUHJvZHVjdEJ5U2x1ZyIsIl9jYWxsZWUyMiIsIl9jYWxsZWUyMiQiLCJfY29udGV4dDIyIiwiZ2V0RmlsdGVyYnlQcm9kdWN0IiwiX2NhbGxlZTIzIiwic2VhcmNoIiwiX2NhbGxlZTIzJCIsIl9jb250ZXh0MjMiLCJyZXF1aXJlZCIsIm9yIiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMjQiLCJfY2FsbGVlMjQkIiwiX2NvbnRleHQyNCIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMjUiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMjYiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTI2JCIsIl9jb250ZXh0MjYiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUyNyIsIl9jYWxsZWUyNyQiLCJfY29udGV4dDI3IiwibGl0ZXJhbCIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTI4IiwiX2NhbGxlZTI4JCIsIl9jb250ZXh0MjgiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5jb25zdCB7IE9wLCBTZXF1ZWxpemUgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG4vLyBpbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4uLy4uLy4uL2t1ZSc7XG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICBhc3luYyBnZXRQaG90b1Byb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgc29ydERlc2MsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgICBidWRnZXQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHByb2R1Y3RfaWRcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXG4gICAgICAgICAgd2FyZDogd2FyZCxcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXG4gICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiXG5cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIGFtb3VudDogaXRlbT8uYW1vdW50LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgaW5kZXgocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdXBwbGllcklkLCBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIGVuZG93LFxuICAgICAgICByYXRpbmcsXG4gICAgICAgIG5vdGUsXG4gICAgICAgIHVzZXJfbWFuYWdlcixcbiAgICAgICAgcmVudCxcbiAgICAgICAgYXV0aG9yX3Bob25lLFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBwaG90byxcbiAgICAgICAgcHJvdmluY2UsXG4gICAgICAgIGRpc3RyaWN0LFxuICAgICAgICB3YXJkLFxuICAgICAgICBwcm9kdWN0X2lkXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHJlbnQ6IHJlbnQgPyByZW50IDogXCJcIixcbiAgICAgICAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlLFxuICAgICAgICAgICAgICAgIGRpc3RyaWN0LFxuICAgICAgICAgICAgICAgIHdhcmQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSkubWFwKCh7IHNpemUsIGFtb3VudCB9KSA9PiAoe1xuICAgICAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW1hZ2VzKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKGltYWdlcykubWFwKChpdGVtKSA9PiAoeyAuLi5pdGVtLCBwcm9kdWN0SWQgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVcGRhdGVkIFN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMixcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGVuZG93OiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSwge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzaXplID0gYXdhaXQgZGIucHJvZHVjdHNpemUuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICB9KTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPVxuICAgICAgICByZXEuYm9keTtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICAgICAgICBcIml0ZW1fbmFtZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogZGF0YS5pZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgcHJvZHVjdERlbGV0ZUJ1bGsocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkubGlzdCB9IH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgbGV0IGF0dGFjaG1lbnRFbnRyaWVzID0gW107XG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICBuYW1lOiByZXEuZmlsZXNbaV0uZmlsZW5hbWUsXG4gICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcbiAgICAgICAgaW1nVXJsOiByZXEuZmlsZXNbaV0ucGF0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3ROYW1lOiByLml0ZW1fbmFtZSxcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxuICAgICAgICAgIC8vIH0pLnNhdmUoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLmZpbGVzIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogW1wiRXJyb3IgaW5zZXJ0IHBob3RvXCJdIH0pO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJicmFuZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICAvL0FsbCBHcm9jZXJ5U3RhbXBsZSBwcm9kdWN0XG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XG4gIGFzeW5jIGdldEFsbEdyb2NlcnJ5U3RhcGxlcyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInNsdWdcIl0sXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImRpc2NvdW50UGVyXCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IHx8IFtdIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuY2F0ZWdvcnlcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGZpbHRlciBwcm9kdWN0XG5cbiAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XG4gICAgICBpZiAocmVxLnF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBzZWFyY2ggPSBcIiVcIiArIHJlcS5xdWVyeS5zZWFyY2ggKyBcIiVcIjtcbiAgICAgIH1cbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBbT3Aub3JdOiBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHNsdWc6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcblxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBHZXRBbGxCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkubmFtZSB9LFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gYXdzIGltYWdlIGRlbGV0ZVxuICBhc3luYyBhd3NQcm9kdWN0UGhvdG9EZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcbiAgICAgIC8vIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHt3aGVyZToge2ltZ1VybCwgaWR9fSlcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxuXG4gICAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgIC50aGVuKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgbXNnOiBcIlN1Y2Nlc3NmbGx5IGRlbGV0ZWQgaW1hZ2UgZnJvbSBzMyBCdWNrZXRcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RTdWJDaGlsZENhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIHdoZXJlOiB7IGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfSxcbiAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoXCJSQU5EKClcIiksXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRTaXplUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdHNpemVcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtc2c6IGVyciB9KTtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQXFDLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEs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