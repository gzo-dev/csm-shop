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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiYWRkcmVzcyIsInByb2R1Y3RfaWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJpbmRleCIsIl9jYWxsZWUzIiwiX3JlcSRxdWVyeSIsInN1cHBsaWVySWQiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJvcmRlciIsImluY2x1ZGUiLCJtb2RlbCIsInVzZXIiLCJhdHRyaWJ1dGVzIiwiUmVxdWVzdEVycm9yIiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJfY2FsbGVlNCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsIlN1YkNhdGVnb3J5IiwiY2F0ZWdvcnkiLCJ1cGRhdGUiLCJfY2FsbGVlNSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJyZW50IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwiZmluZE9uZSIsInAiLCJfSlNPTiRwYXJzZTQiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJsaW1pdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlOSIsIl9jYWxsZWU5JCIsIl9jb250ZXh0OSIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxMCIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwic2VudCIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTExIiwiX3JlcSRib2R5MyIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJQcm9kdWN0T2ZmZXIiLCJsb2NhdGlvbiIsImdldFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0IiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJzdWJfbmFtZSIsInN1YkNhdCIsInN0cmluZ2lmeSIsInByb2R1Y3REZWxldGUiLCJfY2FsbGVlMTQiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsInJlIiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTE1IiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTE2IiwiYXR0YWNobWVudEVudHJpZXMiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsImZpbGVzIiwiZmlsZW5hbWUiLCJtaW1lIiwibWltZXR5cGUiLCJyIiwiZXJyb3IiLCJlcnJvcnMiLCJnZXRBbGxQaG90byIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwiZGVsZXRlU2xpZGVyUGhvdG8iLCJfY2FsbGVlMTgiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsImdldEFsbEdyb2NlcnJ5U3RhcGxlcyIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwiZ2V0QWxsUHJvZHVjdEJ5U2x1ZyIsIl9jYWxsZWUyMCIsIl9jYWxsZWUyMCQiLCJfY29udGV4dDIwIiwiZ2V0RmlsdGVyYnlQcm9kdWN0IiwiX2NhbGxlZTIxIiwic2VhcmNoIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJyZXF1aXJlZCIsIm9yIiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMjMiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTIzJCIsIl9jb250ZXh0MjMiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMjQiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTI0JCIsIl9jb250ZXh0MjQiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUyNSIsIl9jYWxsZWUyNSQiLCJfY29udGV4dDI1IiwibGl0ZXJhbCIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTI2IiwiX2NhbGxlZTI2JCIsIl9jb250ZXh0MjYiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5jb25zdCB7IE9wLCBTZXF1ZWxpemUgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG4vLyBpbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4uLy4uLy4uL2t1ZSc7XG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICBhc3luYyBnZXRQaG90b1Byb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgc29ydERlc2MsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgICBidWRnZXQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHByb2R1Y3RfaWRcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXG4gICAgICAgICAgd2FyZDogd2FyZCxcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXG4gICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiXG5cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIGFtb3VudDogaXRlbT8uYW1vdW50LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgaW5kZXgocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdXBwbGllcklkLCBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIGVuZG93LFxuICAgICAgICByYXRpbmcsXG4gICAgICAgIG5vdGUsXG4gICAgICAgIHVzZXJfbWFuYWdlcixcbiAgICAgICAgcmVudCxcbiAgICAgICAgYXV0aG9yX3Bob25lLFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBwaG90byxcbiAgICAgICAgcHJvdmluY2UsXG4gICAgICAgIGRpc3RyaWN0LFxuICAgICAgICB3YXJkLFxuICAgICAgICBwcm9kdWN0X2lkXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHJlbnQ6IHJlbnQgPyByZW50IDogXCJcIixcbiAgICAgICAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlLFxuICAgICAgICAgICAgICAgIGRpc3RyaWN0LFxuICAgICAgICAgICAgICAgIHdhcmQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSkubWFwKCh7IHNpemUsIGFtb3VudCB9KSA9PiAoe1xuICAgICAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW1hZ2VzKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKGltYWdlcykubWFwKChpdGVtKSA9PiAoeyAuLi5pdGVtLCBwcm9kdWN0SWQgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVcGRhdGVkIFN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMixcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LCB7XG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0V2ViUHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCBkYi5wcm9kdWN0c2l6ZS5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgIH0pO1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0LCBkYXRhc2l6ZTogc2l6ZSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgYWRkUHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkLCBxdHksIGRpc2NvdW50X3BlciwgZGlzY291bnRfcHJpY2UsIHRvdGFsLCBuZXRfcHJpY2UgfSA9XG4gICAgICAgIHJlcS5ib2R5O1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmxvY2F0aW9uIDogXCJcIixcbiAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci51cGRhdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wcmljZTogZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kQWxsKHtcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICBcImlkXCIsXG4gICAgICAgICAgICAgIFwiY2F0ZWdvcnlJZFwiLFxuICAgICAgICAgICAgICBcInByaWNlXCIsXG4gICAgICAgICAgICAgIFwiaXRlbV9uYW1lXCIsXG4gICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgXCJicmFuZFwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBzZWFyY2hQcm9kdWN0QnlTdWJDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5zdWJDYXQgfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiBkYXRhLmlkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3REZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIHByb2R1Y3RPZmZlckRlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5wYXJhbXMuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgbXVsdGlwbGVQaG90b1VwbG9hZChyZXEsIHJlcywgbmV4dCkge1xuICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xuICAgIHZhciBwcm9kdWN0SWQgPSByZXEuYm9keS5wcm9kdWN0SWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dGFjaG1lbnRFbnRyaWVzLnB1c2goe1xuICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgbmFtZTogcmVxLmZpbGVzW2ldLmZpbGVuYW1lLFxuICAgICAgICBtaW1lOiByZXEuZmlsZXNbaV0ubWltZXR5cGUsXG4gICAgICAgIGltZ1VybDogcmVxLmZpbGVzW2ldLnBhdGgsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgIC8vIHJldHVybiBxdWV1ZS5jcmVhdGUoJ2ltZy11cGxvYWQnLCB7XG4gICAgICAgICAgLy8gICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgIC8vICAgICBwcm9kdWN0TmFtZTogci5pdGVtX25hbWUsXG4gICAgICAgICAgLy8gICAgIGF0dGFjaG1lbnRFbnRyaWVzOiBhdHRhY2htZW50RW50cmllcyxcbiAgICAgICAgICAvLyB9KS5zYXZlKCk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoeyAuLi5hdHRhY2htZW50RW50cmllc1tpXSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbigocikgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS5maWxlcyB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIGdldEFsbFBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGRlbGV0ZVNsaWRlclBob3RvKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxuICAvLyBlZGl0IHRvIHNhbGUgcHJvZHVjdFxuICBhc3luYyBnZXRBbGxHcm9jZXJyeVN0YXBsZXMocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxuICAgICAgICAgIC8vIHdoZXJlOiB7IGRpc2NvdW50OiAnZ3JvY2VyeS1zdGFwbGUnIH0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJkaXNjb3VudFBlclwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLmNhdGVnb3J5XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBmaWx0ZXIgcHJvZHVjdFxuXG4gIGFzeW5jIGdldEZpbHRlcmJ5UHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgc2VhcmNoID0gXCIlJVwiO1xuICAgICAgaWYgKHJlcS5xdWVyeS5zZWFyY2gpIHtcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XG4gICAgICB9XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgW09wLm9yXTogW1xuICAgICAgICAgICAgICAgIHsgbmFtZTogeyBbT3AubGlrZV06IHNlYXJjaCB9LCBzbHVnOiB7IFtPcC5saWtlXTogc2VhcmNoIH0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgR2V0QWxsQnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5Lm5hbWUgfSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5LFxuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGF3cyBpbWFnZSBkZWxldGVcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQsIGltZ1VybCB9ID0gcmVxLmJvZHk7XG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXG4gICAgICAvLyBkZWxldGVGaWxlRnJvbVMzKGltZ1VybClcblxuICAgICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAgIC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcblxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0U3ViQ2hpbGRDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFNlcXVlbGl6ZS5saXRlcmFsKFwiUkFORCgpXCIpLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0U2l6ZVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RzaXplXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUFxQyxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYs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