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
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow, rating, note, user_manager, author_phone, address;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow, rating = _req$body.rating, note = _req$body.note, user_manager = _req$body.user_manager, author_phone = _req$body.author_phone, address = _req$body.address;
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
              address: address ? address : ""
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
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating, note, user_manager, rent, author_phone, address, photo, province, district, ward;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow, rating = _req$body2.rating, note = _req$body2.note, user_manager = _req$body2.user_manager, rent = _req$body2.rent, author_phone = _req$body2.author_phone, address = _req$body2.address, photo = _req$body2.photo, province = _req$body2.province, district = _req$body2.district, ward = _req$body2.ward;
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
                  ward: ward
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwiZm9yRWFjaCIsImtleSIsIl9kZWZpbmVQcm9wZXJ0eTIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5IiwiX3JlcXVpcmUiLCJPcCIsIlNlcXVlbGl6ZSIsIl9kZWZhdWx0IiwiZ2V0UGhvdG9Qcm9kdWN0IiwicmVxIiwicmVzIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJwcm9kdWN0SWQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicXVlcnkiLCJkYiIsInByb2R1Y3RwaG90byIsImZpbmRBbGwiLCJ3aGVyZSIsInRoZW4iLCJwcm9kdWN0Iiwic3RhdHVzIiwianNvbiIsIm9rIiwiZGF0YSIsInN0b3AiLCJhZGRQcm9kdWN0IiwiX2NhbGxlZTIiLCJfcmVxJGJvZHkiLCJjYXRlZ29yeUlkIiwic3ViQ2F0ZWdvcnlJZCIsImNoaWxkQ2F0ZWdvcnlJZCIsIm5hbWUiLCJzbHVnIiwiYnJhbmQiLCJ1bml0U2l6ZSIsInNvcnREZXNjIiwiZGVzYyIsImJ1eWVyUHJpY2UiLCJwcmljZSIsInF0eSIsImRpc2NvdW50IiwiZGlzY291bnRQZXIiLCJ0b3RhbCIsIm5ldFByaWNlIiwiaW1hZ2UiLCJzaXplIiwibmV3YWRkaW1hZ2UiLCJwaG9uZU51bWJlciIsInByb3ZpbmNlIiwiZGlzdHJpY3QiLCJ3YXJkIiwic3F1YXJlIiwicHJvdmluY2VUZXh0IiwiZGlzdHJpY3RUZXh0Iiwid2FyZFRleHQiLCJidWRnZXQiLCJ0eXBlUm9vbSIsImludGVyaW9yIiwiZW5kb3ciLCJyYXRpbmciLCJub3RlIiwidXNlcl9tYW5hZ2VyIiwiYXV0aG9yX3Bob25lIiwiYWRkcmVzcyIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImJvZHkiLCJjcmVhdGUiLCJwYXJzZUludCIsInBob3RvIiwiZmlsZSIsInBhdGgiLCJfSlNPTiRwYXJzZSIsIl9KU09OJHBhcnNlMyIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIml0ZW0iLCJpbWdVcmwiLCJkYXRhVmFsdWVzIiwiaWQiLCJfSlNPTiRwYXJzZTIiLCJpbWFnZVVybCIsInByb2R1Y3RzaXplIiwiYW1vdW50Iiwic3VjY2VzcyIsIm1zZyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJ0MCIsImFicnVwdCIsImluZGV4IiwiX2NhbGxlZTMiLCJfcmVxJHF1ZXJ5Iiwic3VwcGxpZXJJZCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIm9yZGVyIiwiaW5jbHVkZSIsIm1vZGVsIiwidXNlciIsImF0dHJpYnV0ZXMiLCJSZXF1ZXN0RXJyb3IiLCJnZXRBbGxQcm9kdWN0TGlzdCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiU3ViQ2F0ZWdvcnkiLCJjYXRlZ29yeSIsInVwZGF0ZSIsIl9jYWxsZWU1IiwiX3JlcSRib2R5MiIsImltYWdlcyIsInJlbnQiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kT25lIiwicCIsIl9KU09OJHBhcnNlNCIsImRlc3Ryb3kiLCJidWxrQ3JlYXRlIiwiX3JlZiIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwibGlzdCIsImdldFByb2R1Y3RTdWdnZXN0SG90ZWwiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImxpbWl0IiwiZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZ2V0V2ViUHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJzZW50IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTEiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTEyIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwicmUiLCJwcm9kdWN0T2ZmZXJEZWxldGUiLCJfY2FsbGVlMTUiLCJfY2FsbGVlMTUkIiwiX2NvbnRleHQxNSIsInBhcmFtcyIsIm11bHRpcGxlUGhvdG9VcGxvYWQiLCJfY2FsbGVlMTYiLCJhdHRhY2htZW50RW50cmllcyIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiZmlsZXMiLCJmaWxlbmFtZSIsIm1pbWUiLCJtaW1ldHlwZSIsInIiLCJlcnJvciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTE5IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTIwIiwiX2NhbGxlZTIwJCIsIl9jb250ZXh0MjAiLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMjEiLCJzZWFyY2giLCJfY2FsbGVlMjEkIiwiX2NvbnRleHQyMSIsInJlcXVpcmVkIiwib3IiLCJsaWtlIiwiR2V0QWxsQnlDYXRlZ29yeSIsIl9jYWxsZWUyMiIsIl9jYWxsZWUyMiQiLCJfY29udGV4dDIyIiwiU3ViQ2hpbGRDYXRlZ29yeSIsImF3c1Byb2R1Y3RQaG90b0RlbGV0ZSIsIl9jYWxsZWUyMyIsIl9yZXEkYm9keTQiLCJfY2FsbGVlMjMkIiwiX2NvbnRleHQyMyIsImdldFByb2R1Y3RTdWJDaGlsZENhdCIsIl9jYWxsZWUyNCIsIl9yZXEkYm9keTUiLCJfY2FsbGVlMjQkIiwiX2NvbnRleHQyNCIsImdldFByb2R1Y3RTdWdnZXN0IiwiX2NhbGxlZTI1IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJsaXRlcmFsIiwiZ2V0U2l6ZVByb2R1Y3QiLCJfY2FsbGVlMjYiLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcbmNvbnN0IHsgT3AsIFNlcXVlbGl6ZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcbi8vIGltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG4gIGFzeW5jIGdldFBob3RvUHJvZHVjdChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBzb3J0RGVzYyxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHByb3ZpbmNlLFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBwcm92aW5jZVRleHQsXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcbiAgICAgICAgd2FyZFRleHQsXG4gICAgICAgIGJ1ZGdldCxcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBlbmRvdyxcbiAgICAgICAgcmF0aW5nLFxuICAgICAgICBub3RlLFxuICAgICAgICB1c2VyX21hbmFnZXIsXG4gICAgICAgIGF1dGhvcl9waG9uZSxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXG4gICAgICAgICAgd2FyZDogd2FyZCxcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCJcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIGFtb3VudDogaXRlbT8uYW1vdW50LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgaW5kZXgocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdXBwbGllcklkLCBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIHN1cHBsaWVySWQ6IHN1cHBsaWVySWQsXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRBbGxQcm9kdWN0TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9kdWN0SWQsXG4gICAgICAgIGNhdGVnb3J5SWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQsXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgc2x1ZyxcbiAgICAgICAgYnJhbmQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdW5pdFNpemUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZXMsXG4gICAgICAgIHNpemUsXG4gICAgICAgIG5ld2FkZGltYWdlLFxuICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIGVuZG93LFxuICAgICAgICByYXRpbmcsXG4gICAgICAgIG5vdGUsXG4gICAgICAgIHVzZXJfbWFuYWdlcixcbiAgICAgICAgcmVudCxcbiAgICAgICAgYXV0aG9yX3Bob25lLFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBwaG90byxcbiAgICAgICAgcHJvdmluY2UsXG4gICAgICAgIGRpc3RyaWN0LFxuICAgICAgICB3YXJkXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgID8gY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgICAgICAgcGhvdG86IHBob3RvLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHJlbnQ6IHJlbnQgPyByZW50IDogXCJcIixcbiAgICAgICAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHByb3ZpbmNlLFxuICAgICAgICAgICAgICAgIGRpc3RyaWN0LFxuICAgICAgICAgICAgICAgIHdhcmRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjYXRlZ29yeUlkOiByZXEucXVlcnkuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTMsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnByb2R1Y3RzaXplLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgfSk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QsIGRhdGFzaXplOiBzaXplIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHF0eSwgZGlzY291bnRfcGVyLCBkaXNjb3VudF9wcmljZSwgdG90YWwsIG5ldF9wcmljZSB9ID1cbiAgICAgICAgcmVxLmJvZHk7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGlmICghbGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5jcmVhdGUoe1xuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgaW1hZ2U6IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBcIlwiLFxuICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IGxpc3QuaWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgIFwiaWRcIixcbiAgICAgICAgICAgICAgXCJjYXRlZ29yeUlkXCIsXG4gICAgICAgICAgICAgIFwicHJpY2VcIixcbiAgICAgICAgICAgICAgXCJpdGVtX25hbWVcIixcbiAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICBcImJyYW5kXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHNlYXJjaFByb2R1Y3RCeVN1YkNhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5LnN1YkNhdCB9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgbGV0IGF0dGFjaG1lbnRFbnRyaWVzID0gW107XG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICBuYW1lOiByZXEuZmlsZXNbaV0uZmlsZW5hbWUsXG4gICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcbiAgICAgICAgaW1nVXJsOiByZXEuZmlsZXNbaV0ucGF0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3ROYW1lOiByLml0ZW1fbmFtZSxcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxuICAgICAgICAgIC8vIH0pLnNhdmUoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLmZpbGVzIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogW1wiRXJyb3IgaW5zZXJ0IHBob3RvXCJdIH0pO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJicmFuZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICAvL0FsbCBHcm9jZXJ5U3RhbXBsZSBwcm9kdWN0XG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XG4gIGFzeW5jIGdldEFsbEdyb2NlcnJ5U3RhcGxlcyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInNsdWdcIl0sXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImRpc2NvdW50UGVyXCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IHx8IFtdIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuY2F0ZWdvcnlcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGZpbHRlciBwcm9kdWN0XG5cbiAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XG4gICAgICBpZiAocmVxLnF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBzZWFyY2ggPSBcIiVcIiArIHJlcS5xdWVyeS5zZWFyY2ggKyBcIiVcIjtcbiAgICAgIH1cbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBbT3Aub3JdOiBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHNsdWc6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcblxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBHZXRBbGxCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkubmFtZSB9LFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gYXdzIGltYWdlIGRlbGV0ZVxuICBhc3luYyBhd3NQcm9kdWN0UGhvdG9EZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcbiAgICAgIC8vIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHt3aGVyZToge2ltZ1VybCwgaWR9fSlcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxuXG4gICAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgIC50aGVuKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgcmVzXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAgIC5qc29uKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgbXNnOiBcIlN1Y2Nlc3NmbGx5IGRlbGV0ZWQgaW1hZ2UgZnJvbSBzMyBCdWNrZXRcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RTdWJDaGlsZENhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBjb25zdHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIHdoZXJlOiB7IGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfSxcbiAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoXCJSQU5EKClcIiksXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRTaXplUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdHNpemVcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtc2c6IGVyciB9KTtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQXFDLFNBQUFDLFFBQUFDLE1BQUEsRUFBQUMsY0FBQSxRQUFBQyxJQUFBLEdBQUFDLE1BQUEsQ0FBQUQsSUFBQSxDQUFBRixNQUFBLE9BQUFHLE1BQUEsQ0FBQUMscUJBQUEsUUFBQUMsT0FBQSxHQUFBRixNQUFBLENBQUFDLHFCQUFBLENBQUFKLE1BQUEsR0FBQUMsY0FBQSxLQUFBSSxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsTUFBQSxXQUFBQyxHQUFBLFdBQUFKLE1BQUEsQ0FBQUssd0JBQUEsQ0FBQVIsTUFBQSxFQUFBTyxHQUFBLEVBQUFFLFVBQUEsT0FBQVAsSUFBQSxDQUFBUSxJQUFBLENBQUFDLEtBQUEsQ0FBQVQsSUFBQSxFQUFBRyxPQUFBLFlBQUFILElBQUE7QUFBQSxTQUFBVSxjQUFBQyxNQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUYsQ0FBQSxVQUFBRyxNQUFBLFdBQUFGLFNBQUEsQ0FBQUQsQ0FBQSxJQUFBQyxTQUFBLENBQUFELENBQUEsUUFBQUEsQ0FBQSxPQUFBZixPQUFBLENBQUFJLE1BQUEsQ0FBQWMsTUFBQSxPQUFBQyxPQUFBLFdBQUFDLEdBQUEsUUFBQUMsZ0JBQUEsYUFBQVAsTUFBQSxFQUFBTSxHQUFBLEVBQUFGLE1BQUEsQ0FBQUUsR0FBQSxTQUFBaEIsTUFBQSxDQUFBa0IseUJBQUEsR0FBQWxCLE1BQUEsQ0FBQW1CLGdCQUFBLENBQUFULE1BQUEsRUFBQVYs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