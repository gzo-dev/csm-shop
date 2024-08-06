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
var _moment = _interopRequireDefault(require("moment"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _require = require("sequelize"),
  Op = _require.Op,
  Sequelize = _require.Sequelize,
  where = _require.where;
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
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var uid, _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow, rating, note, user_manager, author_phone, address, product_id, rent, meta_description;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            uid = req.user.uid;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow, rating = _req$body.rating, note = _req$body.note, user_manager = _req$body.user_manager, author_phone = _req$body.author_phone, address = _req$body.address, product_id = _req$body.product_id, rent = _req$body.rent, meta_description = _req$body.meta_description;
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
              user_manager: uid,
              author_phone: author_phone ? author_phone : "",
              address: address ? address : "",
              product_id: product_id ? product_id : "",
              rent: rent ? rent : 0,
              meta_description: meta_description
            }).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(product) {
                var _JSON$parse, _JSON$parse3;
                var _JSON$parse2;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return _models.db.user_manager_product.create({
                        user_owner: uid,
                        user_manager: uid,
                        product_id: product.dataValues.id
                      });
                    case 3:
                      _context3.next = 8;
                      break;
                    case 5:
                      _context3.prev = 5;
                      _context3.t0 = _context3["catch"](0);
                      console.log(_context3.t0);
                    case 8:
                      (_JSON$parse = JSON.parse(image)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.map( /*#__PURE__*/function () {
                        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(item) {
                          var _item$path;
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) switch (_context2.prev = _context2.next) {
                              case 0:
                                _models.db.productphoto.create({
                                  imgUrl: req.protocol + "://" + req.get("host") + "/" + (item === null || item === void 0 ? void 0 : (_item$path = item.path) === null || _item$path === void 0 ? void 0 : _item$path.replace(".watermark/", "")),
                                  productId: product.dataValues.id
                                });
                              case 1:
                              case "end":
                                return _context2.stop();
                            }
                          }, _callee2);
                        }));
                        return function (_x2) {
                          return _ref2.apply(this, arguments);
                        };
                      }());
                      if (newaddimage) {
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
                        msg: "Successfully inserted product",
                        d: product
                      });
                    case 12:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3, null, [[0, 5]]);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context4.next = 9;
            break;
          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json(_context4.t0));
          case 9:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 6]]);
    }))();
  },
  getAllProductCategory: function getAllProductCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _req$query, _req$query$searchText, searchText, id, subid, _req$query$page, page, _req$query$pageSize, pageSize, typeRoom, rent, square, price, province, district, ward, star, whereConditions, _yield$db$product$fin, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _req$query = req.query, _req$query$searchText = _req$query.searchText, searchText = _req$query$searchText === void 0 ? "" : _req$query$searchText, id = _req$query.id, subid = _req$query.subid, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === void 0 ? 10 : _req$query$pageSize, typeRoom = _req$query.typeRoom, rent = _req$query.rent, square = _req$query.square, price = _req$query.price, province = _req$query.province, district = _req$query.district, ward = _req$query.ward, star = _req$query.star;
            if (typeRoom == 0) {
              typeRoom = undefined;
            }
            if (square == 0) {
              square = undefined;
            }
            if (price == 0) {
              price = undefined;
            }
            if (rent == -1) {
              rent = undefined;
            }
            if (province == -1) {
              province = undefined;
            }
            if (district == -1) {
              district = undefined;
            }
            if (ward == -1) {
              ward = undefined;
            }
            whereConditions = (0, _defineProperty2["default"])({
              categoryId: id,
              subCategoryId: subid
            }, Op.or, [{
              product_id: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              name: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              address: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              wardText: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              districtText: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              provinceText: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              price: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              updatedAt: (0, _defineProperty2["default"])({}, Op.substring, (0, _moment["default"])(searchText, "DD-MM-YYYY HH:mm:ss"))
            }, {
              createdAt: (0, _defineProperty2["default"])({}, Op.substring, (0, _moment["default"])(searchText, "DD-MM-YYYY HH:mm:ss"))
            }
            // { "$user.firstName$": { [Op.substring]: searchText } },
            ]);
            if (!(id == 13)) {
              _context5.next = 50;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined && rent.toString().length > 0)) {
              _context5.next = 21;
              break;
            }
            _context5.t0 = parseInt(rent);
            _context5.next = _context5.t0 === 0 ? 15 : _context5.t0 === 1 ? 17 : _context5.t0 === 2 ? 19 : 21;
            break;
          case 15:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [0, false]);
            return _context5.abrupt("break", 21);
          case 17:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [1, true]);
            return _context5.abrupt("break", 21);
          case 19:
            whereConditions.rent = 2;
            return _context5.abrupt("break", 21);
          case 21:
            if (!square) {
              _context5.next = 31;
              break;
            }
            _context5.t1 = parseInt(square);
            _context5.next = _context5.t1 === 1 ? 25 : _context5.t1 === 2 ? 27 : _context5.t1 === 3 ? 29 : 31;
            break;
          case 25:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [0, 20]);
            return _context5.abrupt("break", 31);
          case 27:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context5.abrupt("break", 31);
          case 29:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context5.abrupt("break", 31);
          case 31:
            if (!price) {
              _context5.next = 45;
              break;
            }
            _context5.t2 = parseInt(price);
            _context5.next = _context5.t2 === 1 ? 35 : _context5.t2 === 2 ? 37 : _context5.t2 === 3 ? 39 : _context5.t2 === 4 ? 41 : _context5.t2 === 5 ? 43 : 45;
            break;
          case 35:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context5.abrupt("break", 45);
          case 37:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context5.abrupt("break", 45);
          case 39:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context5.abrupt("break", 45);
          case 41:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context5.abrupt("break", 45);
          case 43:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context5.abrupt("break", 45);
          case 45:
            if (province) {
              whereConditions.province = province;
            }
            if (district) {
              whereConditions.district = district;
            }
            if (ward) {
              whereConditions.ward = ward;
            }
            _context5.next = 51;
            break;
          case 50:
            if (id == 12) {
              if (typeRoom) {
                whereConditions.typeRoom = typeRoom;
              }
              if (star) {
                whereConditions.rating = star;
              }
              if (province) {
                whereConditions.province = province;
              }
              if (district) {
                whereConditions.district = district;
              }
              if (ward) {
                whereConditions.ward = ward;
              }
            }
          case 51:
            _context5.prev = 51;
            _context5.next = 54;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["id", "DESC"]],
              include: [{
                model: _models.db.user_manager_product,
                // attributes: ["id", "firstName", "lastName"],
                required: false
              }, {
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"],
                required: false
              }],
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 54:
            _yield$db$product$fin = _context5.sent;
            count = _yield$db$product$fin.count;
            filteredList = _yield$db$product$fin.rows;
            // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
            totalPages = Math.ceil(count / pageSize); // Trả về kết quả với thông tin phân trang
            res.status(200).json({
              success: true,
              data: filteredList,
              pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            });
            _context5.next = 65;
            break;
          case 61:
            _context5.prev = 61;
            _context5.t3 = _context5["catch"](51);
            console.error("Error searching products:", _context5.t3);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 65:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[51, 61]]);
    }))();
  },
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
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
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var uid, _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating, note, user_manager, rent, author_phone, address, photo, province, district, ward, product_id, provinceText, districtText, wardText, meta_description;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            // const {user }
            uid = req.user.uid;
            _context9.prev = 1;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow, rating = _req$body2.rating, note = _req$body2.note, user_manager = _req$body2.user_manager, rent = _req$body2.rent, author_phone = _req$body2.author_phone, address = _req$body2.address, photo = _req$body2.photo, province = _req$body2.province, district = _req$body2.district, ward = _req$body2.ward, product_id = _req$body2.product_id, provinceText = _req$body2.provinceText, districtText = _req$body2.districtText, wardText = _req$body2.wardText, meta_description = _req$body2.meta_description;
            _models.db.product.findOne({
              where: {
                id: productId
              }
            }).then( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(product) {
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!product) {
                        _context7.next = 4;
                        break;
                      }
                      _context7.next = 3;
                      return _models.db.history_edit_product.create({
                        product_id: productId,
                        user_id: uid,
                        time_updated: new Date().toString()
                      });
                    case 3:
                      return _context7.abrupt("return", _models.db.product.update({
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
                        product_id: product_id ? product_id : "",
                        provinceText: provinceText ? provinceText : "",
                        districtText: districtText ? districtText : "",
                        wardText: wardText ? wardText : "",
                        meta_description: meta_description
                      }, {
                        where: {
                          id: productId
                        }
                      }));
                    case 4:
                      throw new RequestError("Not Found Product", 409);
                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }()).then( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(p) {
                var _JSON$parse4;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
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
                        _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref5) {
                          var size = _ref5.size,
                            amount = _ref5.amount;
                          return {
                            size: size,
                            amount: amount,
                            productId: productId
                          };
                        }));
                      }
                      if (!images) {
                        _context8.next = 6;
                        break;
                      }
                      _context8.next = 5;
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
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }())["catch"](function (err) {
              next(err);
            });
            _context9.next = 9;
            break;
          case 6:
            _context9.prev = 6;
            _context9.t0 = _context9["catch"](1);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[1, 6]]);
    }))();
  },
  getProductListByCategoryClient: function getProductListByCategoryClient(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var _req$query2, categoryId, _req$query2$pageSize, pageSize, whereConditions, _yield$db$product$fin2, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _req$query2 = req.query, categoryId = _req$query2.categoryId, _req$query2$pageSize = _req$query2.pageSize, pageSize = _req$query2$pageSize === void 0 ? 10 : _req$query2$pageSize;
            whereConditions = {
              categoryId: categoryId
            };
            _context10.prev = 2;
            _context10.next = 5;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }]
              // limit: pageSize,
              // offset: (page - 1) * pageSize,
            });
          case 5:
            _yield$db$product$fin2 = _context10.sent;
            count = _yield$db$product$fin2.count;
            filteredList = _yield$db$product$fin2.rows;
            // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
            totalPages = Math.ceil(count / pageSize); // Trả về kết quả với thông tin phân trang
            res.status(200).json({
              success: true,
              results: filteredList,
              pagination: {
                // currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            });
            _context10.next = 16;
            break;
          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](2);
            console.error("Error searching products:", _context10.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 16:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[2, 12]]);
    }))();
  },
  getProductListByCategoryClientWeb: function getProductListByCategoryClientWeb(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _req$query3, categoryId, subCategoryId, _req$query3$page, page, _req$query3$pageSize, pageSize, currentPage, size, whereConditions, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$query3 = req.query, categoryId = _req$query3.categoryId, subCategoryId = _req$query3.subCategoryId, _req$query3$page = _req$query3.page, page = _req$query3$page === void 0 ? 1 : _req$query3$page, _req$query3$pageSize = _req$query3.pageSize, pageSize = _req$query3$pageSize === void 0 ? 12 : _req$query3$pageSize;
            currentPage = parseInt(page);
            size = parseInt(pageSize);
            whereConditions = {};
            if (categoryId) whereConditions.categoryId = categoryId;
            if (subCategoryId) whereConditions.subCategoryId = subCategoryId;
            // Đếm số lượng bản ghi
            _context11.next = 9;
            return _models.db.product.count({
              where: whereConditions
            });
          case 9:
            count = _context11.sent;
            _context11.next = 12;
            return _models.db.product.findAll({
              where: whereConditions,
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }, {
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              attributes: {
                exclude: ["desc", "slug", "updatedAt", "phoneNumber", "author_phone", "sortDesc", "interior", "note"]
              },
              limit: size,
              offset: (currentPage - 1) * size
            });
          case 12:
            filteredList = _context11.sent;
            // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
            totalPages = Math.ceil(count / size); // Trả về kết quả với thông tin phân trang
            res.status(200).json({
              success: true,
              results: filteredList,
              pagination: {
                currentPage: currentPage,
                pageSize: size,
                totalItems: count,
                totalPages: totalPages
              }
            });
            _context11.next = 21;
            break;
          case 17:
            _context11.prev = 17;
            _context11.t0 = _context11["catch"](0);
            console.error("Error searching products:", _context11.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 21:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 17]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _req$query4, _req$query4$searchTex, searchText, id, subid, _req$query4$page, page, _req$query4$pageSize, pageSize, typeRoom, rent, square, price, province, district, ward, star, reset, searchTextValid, whereConditions, _yield$db$product$fin3, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _req$query4 = req.query, _req$query4$searchTex = _req$query4.searchText, searchText = _req$query4$searchTex === void 0 ? "" : _req$query4$searchTex, id = _req$query4.id, subid = _req$query4.subid, _req$query4$page = _req$query4.page, page = _req$query4$page === void 0 ? 1 : _req$query4$page, _req$query4$pageSize = _req$query4.pageSize, pageSize = _req$query4$pageSize === void 0 ? 10 : _req$query4$pageSize, typeRoom = _req$query4.typeRoom, rent = _req$query4.rent, square = _req$query4.square, price = _req$query4.price, province = _req$query4.province, district = _req$query4.district, ward = _req$query4.ward, star = _req$query4.star, reset = _req$query4.reset;
            if (typeRoom == 0) {
              typeRoom = undefined;
            }
            if (square == 0) {
              square = undefined;
            }
            if (price == 0) {
              price = undefined;
            }
            if (rent == -1) {
              rent = undefined;
            }
            if (province == -1) {
              province = undefined;
            }
            if (district == -1) {
              district = undefined;
            }
            if (ward == -1) {
              ward = undefined;
            }
            if (searchText === undefined || searchText == null) {
              searchTextValid = "";
            } else {
              searchTextValid = searchText;
            }
            whereConditions = (0, _defineProperty2["default"])({
              categoryId: id,
              subCategoryId: subid
            }, Op.or, [{
              product_id: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              name: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              address: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              wardText: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              districtText: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              provinceText: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              price: (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }, {
              updatedAt: (0, _defineProperty2["default"])({}, Op.substring, (0, _moment["default"])(searchTextValid, "DD-MM-YYYY HH:mm:ss"))
            }, {
              createdAt: (0, _defineProperty2["default"])({}, Op.substring, (0, _moment["default"])(searchTextValid, "DD-MM-YYYY HH:mm:ss"))
            }, {
              "$user.firstName$": (0, _defineProperty2["default"])({}, Op.substring, searchTextValid)
            }]);
            if (!(id == 13)) {
              _context12.next = 51;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined && rent.toString().length > 0)) {
              _context12.next = 22;
              break;
            }
            _context12.t0 = parseInt(rent);
            _context12.next = _context12.t0 === 0 ? 16 : _context12.t0 === 1 ? 18 : _context12.t0 === 2 ? 20 : 22;
            break;
          case 16:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [0, false]);
            return _context12.abrupt("break", 22);
          case 18:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [1, true]);
            return _context12.abrupt("break", 22);
          case 20:
            whereConditions.rent = 2;
            return _context12.abrupt("break", 22);
          case 22:
            if (!square) {
              _context12.next = 32;
              break;
            }
            _context12.t1 = parseInt(square);
            _context12.next = _context12.t1 === 1 ? 26 : _context12.t1 === 2 ? 28 : _context12.t1 === 3 ? 30 : 32;
            break;
          case 26:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [0, 20]);
            return _context12.abrupt("break", 32);
          case 28:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context12.abrupt("break", 32);
          case 30:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context12.abrupt("break", 32);
          case 32:
            if (!price) {
              _context12.next = 46;
              break;
            }
            _context12.t2 = parseInt(price);
            _context12.next = _context12.t2 === 1 ? 36 : _context12.t2 === 2 ? 38 : _context12.t2 === 3 ? 40 : _context12.t2 === 4 ? 42 : _context12.t2 === 5 ? 44 : 46;
            break;
          case 36:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context12.abrupt("break", 46);
          case 38:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context12.abrupt("break", 46);
          case 40:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context12.abrupt("break", 46);
          case 42:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context12.abrupt("break", 46);
          case 44:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context12.abrupt("break", 46);
          case 46:
            if (province) {
              whereConditions.province = province;
            }
            if (district) {
              whereConditions.district = district;
            }
            if (ward) {
              whereConditions.ward = ward;
            }
            _context12.next = 52;
            break;
          case 51:
            if (id == 12) {
              if (typeRoom) {
                whereConditions.typeRoom = typeRoom;
              }
              if (star) {
                whereConditions.rating = star;
              }
              if (province) {
                whereConditions.province = province;
              }
              if (district) {
                whereConditions.district = district;
              }
              if (ward) {
                whereConditions.ward = ward;
              }
            }
          case 52:
            _context12.prev = 52;
            _context12.next = 55;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["createdAt", "DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }, {
                model: _models.db.user_manager_product,
                // attributes: ["id", "firstName", "lastName"],
                required: false
              }],
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 55:
            _yield$db$product$fin3 = _context12.sent;
            count = _yield$db$product$fin3.count;
            filteredList = _yield$db$product$fin3.rows;
            // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
            totalPages = Math.ceil(count / pageSize); // Trả về kết quả với thông tin phân trang
            res.status(200).json({
              success: true,
              data: filteredList,
              pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            });
            _context12.next = 66;
            break;
          case 62:
            _context12.prev = 62;
            _context12.t3 = _context12["catch"](52);
            console.error("Error searching products:", _context12.t3);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 66:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[52, 62]]);
    }))();
  },
  getProductListByFilter: function getProductListByFilter(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var _req$query5, id, subid, typeRoom, rent, square, price, province, district, ward, star, _req$query5$pageSize, pageSize, page, _req$query5$searchTex, searchText, userId, sort, whereConditions, subWhere, filter, order, _yield$db$product$fin4, count, productList, totalPages;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _req$query5 = req.query, id = _req$query5.id, subid = _req$query5.subid, typeRoom = _req$query5.typeRoom, rent = _req$query5.rent, square = _req$query5.square, price = _req$query5.price, province = _req$query5.province, district = _req$query5.district, ward = _req$query5.ward, star = _req$query5.star, _req$query5$pageSize = _req$query5.pageSize, pageSize = _req$query5$pageSize === void 0 ? 10 : _req$query5$pageSize, page = _req$query5.page, _req$query5$searchTex = _req$query5.searchText, searchText = _req$query5$searchTex === void 0 ? "" : _req$query5$searchTex, userId = _req$query5.userId;
            if (square === "asc" || square === "desc") {
              sort = square;
            }
            if (userId == -1) {
              userId = undefined;
            }
            if (typeRoom == 0) {
              typeRoom = undefined;
            }
            if (square == 0 || square == "asc" || square == "desc") {
              square = undefined;
            }
            if (price == 0) {
              price = undefined;
            }
            if (rent == -1) {
              rent = undefined;
            }
            if (province == -1) {
              province = undefined;
            }
            if (district == -1) {
              district = undefined;
            }
            if (ward == -1) {
              ward = undefined;
            }
            whereConditions = (0, _defineProperty2["default"])({
              categoryId: parseInt(id),
              subCategoryId: parseInt(subid)
            }, Op.or, [{
              product_id: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              name: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              address: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              wardText: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              districtText: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              provinceText: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              price: (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }, {
              updatedAt: (0, _defineProperty2["default"])({}, Op.substring, (0, _moment["default"])(searchText, "DD-MM-YYYY HH:mm:ss"))
            }, {
              createdAt: (0, _defineProperty2["default"])({}, Op.substring, (0, _moment["default"])(searchText, "DD-MM-YYYY HH:mm:ss"))
            }
            // { "$user.firstName$": { [Op.substring]: searchText } },
            ]);
            if (!(id == 13)) {
              _context13.next = 53;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined)) {
              _context13.next = 24;
              break;
            }
            _context13.t0 = parseInt(rent);
            _context13.next = _context13.t0 === 0 ? 18 : _context13.t0 === 1 ? 20 : _context13.t0 === 2 ? 22 : 24;
            break;
          case 18:
            whereConditions.rent = 0;
            return _context13.abrupt("break", 24);
          case 20:
            whereConditions.rent = 1;
            return _context13.abrupt("break", 24);
          case 22:
            whereConditions.rent = 2;
            return _context13.abrupt("break", 24);
          case 24:
            if (!square) {
              _context13.next = 34;
              break;
            }
            _context13.t1 = parseInt(square);
            _context13.next = _context13.t1 === 1 ? 28 : _context13.t1 === 2 ? 30 : _context13.t1 === 3 ? 32 : 34;
            break;
          case 28:
            whereConditions.square = Sequelize.literal("CAST(square AS INT) BETWEEN 0 AND 20");
            return _context13.abrupt("break", 34);
          case 30:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context13.abrupt("break", 34);
          case 32:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context13.abrupt("break", 34);
          case 34:
            if (!price) {
              _context13.next = 48;
              break;
            }
            _context13.t2 = parseInt(price);
            _context13.next = _context13.t2 === 1 ? 38 : _context13.t2 === 2 ? 40 : _context13.t2 === 3 ? 42 : _context13.t2 === 4 ? 44 : _context13.t2 === 5 ? 46 : 48;
            break;
          case 38:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context13.abrupt("break", 48);
          case 40:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context13.abrupt("break", 48);
          case 42:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context13.abrupt("break", 48);
          case 44:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context13.abrupt("break", 48);
          case 46:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context13.abrupt("break", 48);
          case 48:
            if (province) {
              whereConditions.province = province;
            }
            if (district) {
              whereConditions.district = district;
            }
            if (ward) {
              whereConditions.ward = ward;
            }
            _context13.next = 54;
            break;
          case 53:
            if (id == 12) {
              if (typeRoom) {
                whereConditions.typeRoom = typeRoom;
              }
              if (star) {
                whereConditions.rating = star;
              }
              if (province) {
                whereConditions.province = province;
              }
              if (district) {
                whereConditions.district = district;
              }
              if (ward) {
                whereConditions.ward = ward;
              }
            }
          case 54:
            subWhere = {};
            filter = {};
            if (userId) {
              subWhere.id = userId;
              filter["boolean"] = true;
            } else {
              filter["boolean"] = false;
            }
            if (sort) {
              order = [["square", sort]];
            } else {
              order = [["id", "desc"]];
            }
            console.log(order);
            _context13.next = 61;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: order,
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"],
                required: false
              }, {
                model: _models.db.user_manager_product,
                required: false,
                include: [{
                  model: _models.db.user,
                  attributes: ["id", "firstName", "lastName"],
                  required: filter["boolean"],
                  as: "managerUser",
                  where: subWhere
                }]
              }],
              attributes: {
                exclude: ["desc"]
              },
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 61:
            _yield$db$product$fin4 = _context13.sent;
            count = _yield$db$product$fin4.count;
            productList = _yield$db$product$fin4.rows;
            // console.log(productList)
            // if(userId) {
            //   productList= productList?.filter(item=> item?.user_manager_products?.filter(item2=> item2?.userManager?.id== userId)?.length > 0)
            //   // count= productList.length
            // }
            totalPages = Math.ceil(count / pageSize);
            return _context13.abrupt("return", res.status(200).json({
              success: true,
              data: productList,
              filterManager: userId && userId != -1 ? true : false,
              pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            }));
          case 68:
            _context13.prev = 68;
            _context13.t3 = _context13["catch"](0);
            console.log(_context13.t3);
            // throw new RequestError("Error");
            return _context13.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 72:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 68]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                categoryId: 12
                // subCategoryId: req.query.subCategoryId,
              },

              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              attributes: {
                exclude: ["desc"]
              },
              limit: 4
            }).then(function (list) {
              res.status(200).json({
                success: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
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
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                categoryId: 13
                // subCategoryId: req.query.subCategoryId,
              },

              include: [{
                model: _models.db.productphoto,
                attributes: ["id", "imgUrl"]
              }],
              attributes: {
                exclude: ["desc"]
              },
              limit: 4
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
  getProductSuggest2: function getProductSuggest2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _models.db.product.findAll({
              order: [["createdAt", "DESC"]],
              where: {
                endow: 1
              },
              // include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
              attributes: {
                exclude: ["desc"]
              },
              limit: 4
            }).then(function (list) {
              res.status(200).json({
                ok: true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _models.db.product.findOne({
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
                data: [list]
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
  getProductUserManage: function getProductUserManage(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var uid, rows;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            uid = req.query.uid;
            _context18.next = 4;
            return _models.db.user_manager_product.findAll({
              where: {
                user_manager: uid
              }
            });
          case 4:
            rows = _context18.sent;
            return _context18.abrupt("return", res.status(200).json({
              data: rows,
              ok: true
            }));
          case 8:
            _context18.prev = 8;
            _context18.t0 = _context18["catch"](0);
            console.log(_context18.t0);
            return _context18.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 12:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 8]]);
    }))();
  },
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var size;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context19.sent;
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
            _context19.next = 10;
            break;
          case 7:
            _context19.prev = 7;
            _context19.t0 = _context19["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
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
            _context20.next = 8;
            break;
          case 5:
            _context20.prev = 5;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
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
              // console.log(JSON.stringify(list));
              res.status(200).json({
                success: true,
                data: list
              });
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
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
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
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  productDeleteBulk: function productDeleteBulk(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
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
            return _context24.stop();
        }
      }, _callee24);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
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
            return _context25.stop();
        }
      }, _callee25);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var attachmentEntries, productId, i, _req$files$i$path;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            attachmentEntries = [];
            productId = req.body.productId;
            console.log("req.files", req.files);
            for (i = 0; i < req.files.length; i++) {
              attachmentEntries.push({
                productId: productId,
                name: req.files[i].filename,
                mime: req.files[i].mimetype,
                imgUrl: req.protocol + "://" + req.get("host") + "/" + ((_req$files$i$path = req.files[i].path) === null || _req$files$i$path === void 0 ? void 0 : _req$files$i$path.replace(".watermark/", ""))
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
                data: req.files.map(function (item) {
                  var _item$path2;
                  return _objectSpread(_objectSpread({}, item), {}, {
                    path: item === null || item === void 0 ? void 0 : (_item$path2 = item.path) === null || _item$path2 === void 0 ? void 0 : _item$path2.replace("./watermark/", "")
                  });
                }),
                ok: true
              });
            })["catch"](function (error) {
              console.log(error);
              res.status(500).json({
                errors: ["Error insert photo"]
              });
            });
          case 5:
          case "end":
            return _context26.stop();
        }
      }, _callee26);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
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
            _context27.next = 7;
            break;
          case 4:
            _context27.prev = 4;
            _context27.t0 = _context27["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context27.stop();
        }
      }, _callee27, null, [[0, 4]]);
    }))();
  },
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
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
            return _context28.stop();
        }
      }, _callee28);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
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
            _context29.next = 7;
            break;
          case 4:
            _context29.prev = 4;
            _context29.t0 = _context29["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context29.stop();
        }
      }, _callee29, null, [[0, 4]]);
    }))();
  },
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
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
            _context30.next = 7;
            break;
          case 4:
            _context30.prev = 4;
            _context30.t0 = _context30["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context30.stop();
        }
      }, _callee30, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      var search;
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
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
            _context31.next = 9;
            break;
          case 6:
            _context31.prev = 6;
            _context31.t0 = _context31["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context31.stop();
        }
      }, _callee31, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) switch (_context32.prev = _context32.next) {
          case 0:
            _context32.prev = 0;
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
            _context32.next = 7;
            break;
          case 4:
            _context32.prev = 4;
            _context32.t0 = _context32["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context32.stop();
        }
      }, _callee32, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) switch (_context33.prev = _context33.next) {
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
            return _context33.stop();
        }
      }, _callee33);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) switch (_context34.prev = _context34.next) {
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
            return _context34.stop();
        }
      }, _callee34);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
      return _regenerator["default"].wrap(function _callee35$(_context35) {
        while (1) switch (_context35.prev = _context35.next) {
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
            return _context35.stop();
        }
      }, _callee35);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
      var productId;
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) switch (_context36.prev = _context36.next) {
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
            return _context36.stop();
        }
      }, _callee36);
    }))();
  },
  getHistoryEditProduct: function getHistoryEditProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
      var product_id, rows;
      return _regenerator["default"].wrap(function _callee37$(_context37) {
        while (1) switch (_context37.prev = _context37.next) {
          case 0:
            _context37.prev = 0;
            product_id = req.query.product_id;
            _context37.next = 4;
            return _models.db.history_edit_product.findAll({
              where: {
                product_id: product_id
              },
              order: [["time_updated", "DESC"]],
              include: [{
                model: _models.db.user,
                required: false
              }, {
                model: _models.db.product,
                required: false
              }]
            });
          case 4:
            rows = _context37.sent;
            return _context37.abrupt("return", res.status(200).json({
              data: rows,
              ok: true
            }));
          case 8:
            _context37.prev = 8;
            _context37.t0 = _context37["catch"](0);
            console.log(_context37.t0);
            return _context37.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 12:
          case "end":
            return _context37.stop();
        }
      }, _callee37, null, [[0, 8]]);
    }))();
  },
  getProductManageByUser: function getProductManageByUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
      var rows;
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) switch (_context38.prev = _context38.next) {
          case 0:
            _context38.prev = 0;
            _context38.next = 3;
            return _models.db.user_manager_product.findAll({
              order: [["createdAt", "DESC"]],
              attributes: ["product_id", "user_manager", "user_owner"],
              include: [{
                model: _models.db.user,
                required: true,
                as: "managerUser",
                attributes: ["id", "firstName", "lastName", "address", "email"]
              }, {
                model: _models.db.product,
                required: true,
                as: "product",
                attributes: ["id"]
              }]
            });
          case 3:
            rows = _context38.sent;
            return _context38.abrupt("return", res.status(200).json({
              data: rows,
              ok: true
            }));
          case 7:
            _context38.prev = 7;
            _context38.t0 = _context38["catch"](0);
            console.log(_context38.t0);
            return _context38.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 11:
          case "end":
            return _context38.stop();
        }
      }, _callee38, null, [[0, 7]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9tb21lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVxdWlyZSIsIk9wIiwiU2VxdWVsaXplIiwid2hlcmUiLCJfZGVmYXVsdCIsImdldFBob3RvUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwicHJvZHVjdElkIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInF1ZXJ5IiwiZGIiLCJwcm9kdWN0cGhvdG8iLCJmaW5kQWxsIiwidGhlbiIsInByb2R1Y3QiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImFkZFByb2R1Y3QiLCJfY2FsbGVlNCIsInVpZCIsIl9yZXEkYm9keSIsImNhdGVnb3J5SWQiLCJzdWJDYXRlZ29yeUlkIiwiY2hpbGRDYXRlZ29yeUlkIiwibmFtZSIsInNsdWciLCJicmFuZCIsInVuaXRTaXplIiwic29ydERlc2MiLCJkZXNjIiwiYnV5ZXJQcmljZSIsInByaWNlIiwicXR5IiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsInRvdGFsIiwibmV0UHJpY2UiLCJpbWFnZSIsInNpemUiLCJuZXdhZGRpbWFnZSIsInBob25lTnVtYmVyIiwicHJvdmluY2UiLCJkaXN0cmljdCIsIndhcmQiLCJzcXVhcmUiLCJwcm92aW5jZVRleHQiLCJkaXN0cmljdFRleHQiLCJ3YXJkVGV4dCIsImJ1ZGdldCIsInR5cGVSb29tIiwiaW50ZXJpb3IiLCJlbmRvdyIsInJhdGluZyIsIm5vdGUiLCJ1c2VyX21hbmFnZXIiLCJhdXRob3JfcGhvbmUiLCJhZGRyZXNzIiwicHJvZHVjdF9pZCIsInJlbnQiLCJtZXRhX2Rlc2NyaXB0aW9uIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwidXNlciIsImJvZHkiLCJjcmVhdGUiLCJwYXJzZUludCIsInBob3RvIiwiZmlsZSIsInBhdGgiLCJfcmVmIiwiX2NhbGxlZTMiLCJfSlNPTiRwYXJzZSIsIl9KU09OJHBhcnNlMyIsIl9KU09OJHBhcnNlMiIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJfbWFuYWdlcl9wcm9kdWN0IiwidXNlcl9vd25lciIsImRhdGFWYWx1ZXMiLCJpZCIsInQwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIl9yZWYyIiwiX2NhbGxlZTIiLCJpdGVtIiwiX2l0ZW0kcGF0aCIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImltZ1VybCIsInByb3RvY29sIiwiZ2V0IiwicmVwbGFjZSIsIl94MiIsImltYWdlVXJsIiwicHJvZHVjdHNpemUiLCJhbW91bnQiLCJzdWNjZXNzIiwibXNnIiwiZCIsIl94IiwiZXJyIiwiYWJydXB0IiwiZ2V0QWxsUHJvZHVjdENhdGVnb3J5IiwiX2NhbGxlZTUiLCJfcmVxJHF1ZXJ5IiwiX3JlcSRxdWVyeSRzZWFyY2hUZXh0Iiwic2VhcmNoVGV4dCIsInN1YmlkIiwiX3JlcSRxdWVyeSRwYWdlIiwicGFnZSIsIl9yZXEkcXVlcnkkcGFnZVNpemUiLCJwYWdlU2l6ZSIsInN0YXIiLCJ3aGVyZUNvbmRpdGlvbnMiLCJfeWllbGQkZGIkcHJvZHVjdCRmaW4iLCJjb3VudCIsImZpbHRlcmVkTGlzdCIsInRvdGFsUGFnZXMiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJ1bmRlZmluZWQiLCJvciIsInN1YnN0cmluZyIsInVwZGF0ZWRBdCIsIm1vbWVudCIsImNyZWF0ZWRBdCIsInRvU3RyaW5nIiwidDEiLCJiZXR3ZWVuIiwiZ3RlIiwidDIiLCJmaW5kQW5kQ291bnRBbGwiLCJvcmRlciIsImluY2x1ZGUiLCJtb2RlbCIsInJlcXVpcmVkIiwiYXR0cmlidXRlcyIsImxpbWl0Iiwib2Zmc2V0Iiwic2VudCIsInJvd3MiLCJNYXRoIiwiY2VpbCIsInBhZ2luYXRpb24iLCJjdXJyZW50UGFnZSIsInRvdGFsSXRlbXMiLCJ0MyIsImVycm9yIiwiZ2V0QWxsUHJvZHVjdExpc3QiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsIlN1YkNhdGVnb3J5IiwiY2F0ZWdvcnkiLCJSZXF1ZXN0RXJyb3IiLCJ1cGRhdGUiLCJfY2FsbGVlOSIsIl9yZXEkYm9keTIiLCJpbWFnZXMiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJmaW5kT25lIiwiX3JlZjMiLCJfY2FsbGVlNyIsIl9jYWxsZWU3JCIsIl9jb250ZXh0NyIsImhpc3RvcnlfZWRpdF9wcm9kdWN0IiwidXNlcl9pZCIsInRpbWVfdXBkYXRlZCIsIkRhdGUiLCJfeDMiLCJfcmVmNCIsIl9jYWxsZWU4IiwicCIsIl9KU09OJHBhcnNlNCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsImRlc3Ryb3kiLCJidWxrQ3JlYXRlIiwiX3JlZjUiLCJfeDQiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnQiLCJfY2FsbGVlMTAiLCJfcmVxJHF1ZXJ5MiIsIl9yZXEkcXVlcnkyJHBhZ2VTaXplIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluMiIsIl9jYWxsZWUxMCQiLCJfY29udGV4dDEwIiwicmVzdWx0cyIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudFdlYiIsIl9jYWxsZWUxMSIsIl9yZXEkcXVlcnkzIiwiX3JlcSRxdWVyeTMkcGFnZSIsIl9yZXEkcXVlcnkzJHBhZ2VTaXplIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJleGNsdWRlIiwiZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5IiwiX2NhbGxlZTEyIiwiX3JlcSRxdWVyeTQiLCJfcmVxJHF1ZXJ5NCRzZWFyY2hUZXgiLCJfcmVxJHF1ZXJ5NCRwYWdlIiwiX3JlcSRxdWVyeTQkcGFnZVNpemUiLCJyZXNldCIsInNlYXJjaFRleHRWYWxpZCIsIl95aWVsZCRkYiRwcm9kdWN0JGZpbjMiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsImdldFByb2R1Y3RMaXN0QnlGaWx0ZXIiLCJfY2FsbGVlMTMiLCJfcmVxJHF1ZXJ5NSIsIl9yZXEkcXVlcnk1JHBhZ2VTaXplIiwiX3JlcSRxdWVyeTUkc2VhcmNoVGV4IiwidXNlcklkIiwic29ydCIsInN1YldoZXJlIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluNCIsInByb2R1Y3RMaXN0IiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJsaXRlcmFsIiwiYXMiLCJmaWx0ZXJNYW5hZ2VyIiwiZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbCIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwibGlzdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTE1IiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJnZXRQcm9kdWN0U3VnZ2VzdDIiLCJfY2FsbGVlMTYiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwiZ2V0UHJvZHVjdFVzZXJNYW5hZ2UiLCJfY2FsbGVlMTgiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMjAiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInN1Yl9uYW1lIiwic3ViQ2F0IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUyMyIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwicmUiLCJwcm9kdWN0RGVsZXRlQnVsayIsIl9jYWxsZWUyNCIsIl9jYWxsZWUyNCQiLCJfY29udGV4dDI0IiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTI1IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTI2IiwiYXR0YWNobWVudEVudHJpZXMiLCJfcmVxJGZpbGVzJGkkcGF0aCIsIl9jYWxsZWUyNiQiLCJfY29udGV4dDI2IiwiZmlsZXMiLCJmaWxlbmFtZSIsIm1pbWUiLCJtaW1ldHlwZSIsInIiLCJfaXRlbSRwYXRoMiIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTI3IiwiX2NhbGxlZTI3JCIsIl9jb250ZXh0MjciLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUyOCIsIl9jYWxsZWUyOCQiLCJfY29udGV4dDI4IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTI5IiwiX2NhbGxlZTI5JCIsIl9jb250ZXh0MjkiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTMwIiwiX2NhbGxlZTMwJCIsIl9jb250ZXh0MzAiLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMzEiLCJzZWFyY2giLCJfY2FsbGVlMzEkIiwiX2NvbnRleHQzMSIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTMyIiwiX2NhbGxlZTMyJCIsIl9jb250ZXh0MzIiLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTMzIiwiX3JlcSRib2R5NCIsIl9jYWxsZWUzMyQiLCJfY29udGV4dDMzIiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTM0IiwiX3JlcSRib2R5NSIsIl9jYWxsZWUzNCQiLCJfY29udGV4dDM0IiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMzUiLCJfY2FsbGVlMzUkIiwiX2NvbnRleHQzNSIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTM2IiwiX2NhbGxlZTM2JCIsIl9jb250ZXh0MzYiLCJnZXRIaXN0b3J5RWRpdFByb2R1Y3QiLCJfY2FsbGVlMzciLCJfY2FsbGVlMzckIiwiX2NvbnRleHQzNyIsImdldFByb2R1Y3RNYW5hZ2VCeVVzZXIiLCJfY2FsbGVlMzgiLCJfY2FsbGVlMzgkIiwiX2NvbnRleHQzOCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHNcIjtcclxuY29uc3QgeyBPcCwgU2VxdWVsaXplLCB3aGVyZSB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbi8vIGltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xyXG4gIGFzeW5jIGdldFBob3RvUHJvZHVjdChyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcclxuICAgIGRiLnByb2R1Y3RwaG90b1xyXG4gICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIHByb2R1Y3RJZCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGFzeW5jIGFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgdWlkIH0gPSByZXEudXNlcjtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNhdGVnb3J5SWQsXHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzbHVnLFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICB1bml0U2l6ZSxcclxuICAgICAgICBzb3J0RGVzYyxcclxuICAgICAgICBkZXNjLFxyXG4gICAgICAgIGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgcHJpY2UsXHJcbiAgICAgICAgcXR5LFxyXG4gICAgICAgIGRpc2NvdW50LFxyXG4gICAgICAgIGRpc2NvdW50UGVyLFxyXG4gICAgICAgIHRvdGFsLFxyXG4gICAgICAgIG5ldFByaWNlLFxyXG4gICAgICAgIGltYWdlLFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgbmV3YWRkaW1hZ2UsXHJcbiAgICAgICAgcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgcHJvdmluY2UsXHJcbiAgICAgICAgZGlzdHJpY3QsXHJcbiAgICAgICAgd2FyZCxcclxuICAgICAgICBzcXVhcmUsXHJcbiAgICAgICAgcHJvdmluY2VUZXh0LFxyXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcclxuICAgICAgICB3YXJkVGV4dCxcclxuICAgICAgICBidWRnZXQsXHJcbiAgICAgICAgdHlwZVJvb20sXHJcbiAgICAgICAgaW50ZXJpb3IsXHJcbiAgICAgICAgZW5kb3csXHJcbiAgICAgICAgcmF0aW5nLFxyXG4gICAgICAgIG5vdGUsXHJcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxyXG4gICAgICAgIGF1dGhvcl9waG9uZSxcclxuICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgIHByb2R1Y3RfaWQsXHJcbiAgICAgICAgcmVudCxcclxuICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uXHJcbiAgICAgIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuY3JlYXRlKHtcclxuICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXHJcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQgfHwgMCxcclxuICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICBzbHVnOiBzbHVnLFxyXG4gICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcclxuICAgICAgICAgIGJyYW5kOiBicmFuZCxcclxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcclxuICAgICAgICAgIHNvcnREZXNjOiBzb3J0RGVzYyxcclxuICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxyXG4gICAgICAgICAgcHJpY2U6IHByaWNlLFxyXG4gICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXHJcbiAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXHJcbiAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXHJcbiAgICAgICAgICBwaG90bzogcmVxLmZpbGUgPyByZXEuZmlsZS5wYXRoIDogXCJcIixcclxuICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcclxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcclxuICAgICAgICAgIGRpc3RyaWN0OiBkaXN0cmljdCxcclxuICAgICAgICAgIHdhcmQ6IHdhcmQsXHJcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXHJcbiAgICAgICAgICBkaXN0cmljdFRleHQ6IGRpc3RyaWN0VGV4dCA/IGRpc3RyaWN0VGV4dCA6IFwiXCIsXHJcbiAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXHJcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXHJcbiAgICAgICAgICBidWRnZXQ6IGJ1ZGdldCA/IGJ1ZGdldCA6IDAsXHJcbiAgICAgICAgICB0eXBlUm9vbTogdHlwZVJvb20gPyB0eXBlUm9vbSA6IFwiXCIsXHJcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXHJcbiAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXHJcbiAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXHJcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXHJcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVpZCxcclxuICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcclxuICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogXCJcIixcclxuICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RfaWQgPyBwcm9kdWN0X2lkIDogXCJcIixcclxuICAgICAgICAgIHJlbnQ6IHJlbnQgPyByZW50IDogMCxcclxuICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb25cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGFzeW5jIChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi51c2VyX21hbmFnZXJfcHJvZHVjdC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgIHVzZXJfb3duZXI6IHVpZCxcclxuICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVpZCxcclxuICAgICAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgSlNPTi5wYXJzZShpbWFnZSk/Lm1hcChhc3luYyAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcclxuICAgICAgICAgICAgICBpbWdVcmw6IHJlcS5wcm90b2NvbCArIFwiOi8vXCIgKyByZXEuZ2V0KFwiaG9zdFwiKSArIFwiL1wiICsgaXRlbT8ucGF0aD8ucmVwbGFjZShcIi53YXRlcm1hcmsvXCIsIFwiXCIpLFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xyXG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBKU09OLnBhcnNlKHNpemUpPy5tYXAoKGl0ZW0pID0+XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgcmVzXHJcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiLCBkOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdENhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBsZXQge1xyXG4gICAgICBzZWFyY2hUZXh0ID0gXCJcIixcclxuICAgICAgaWQsXHJcbiAgICAgIHN1YmlkLFxyXG4gICAgICBwYWdlID0gMSxcclxuICAgICAgcGFnZVNpemUgPSAxMCxcclxuICAgICAgdHlwZVJvb20sXHJcbiAgICAgIHJlbnQsXHJcbiAgICAgIHNxdWFyZSxcclxuICAgICAgcHJpY2UsXHJcbiAgICAgIHByb3ZpbmNlLFxyXG4gICAgICBkaXN0cmljdCxcclxuICAgICAgd2FyZCxcclxuICAgICAgc3RhcixcclxuICAgIH0gPSByZXEucXVlcnk7XHJcbiAgICBpZiAodHlwZVJvb20gPT0gMCkge1xyXG4gICAgICB0eXBlUm9vbSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChzcXVhcmUgPT0gMCkge1xyXG4gICAgICBzcXVhcmUgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAocHJpY2UgPT0gMCkge1xyXG4gICAgICBwcmljZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChyZW50ID09IC0xKSB7XHJcbiAgICAgIHJlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvdmluY2UgPT0gLTEpIHtcclxuICAgICAgcHJvdmluY2UgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlzdHJpY3QgPT0gLTEpIHtcclxuICAgICAgZGlzdHJpY3QgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAod2FyZCA9PSAtMSkge1xyXG4gICAgICB3YXJkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xyXG4gICAgICBjYXRlZ29yeUlkOiBpZCxcclxuICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViaWQsXHJcbiAgICAgIFtPcC5vcl06IFtcclxuICAgICAgICB7IHByb2R1Y3RfaWQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgIHsgbmFtZTogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgeyBhZGRyZXNzOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICB7IHdhcmRUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICB7IGRpc3RyaWN0VGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgeyBwcm92aW5jZVRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgIHsgcHJpY2U6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHVwZGF0ZWRBdDoge1xyXG4gICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjcmVhdGVkQXQ6IHtcclxuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8geyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgIF0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGlkID09IDEzKSB7XHJcbiAgICAgIGlmICh0eXBlUm9vbSkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlUm9vbSA9IHR5cGVSb29tO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVudCAhPT0gdW5kZWZpbmVkICYmIHJlbnQudG9TdHJpbmcoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXJzZUludChyZW50KSkge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IHsgW09wLm9yXTogWzAsIGZhbHNlXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSB7IFtPcC5vcl06IFsxLCB0cnVlXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzcXVhcmUpIHtcclxuICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHNxdWFyZSkpIHtcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmJldHdlZW5dOiBbMCwgMjBdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuYmV0d2Vlbl06IFsyMCwgNDBdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuZ3RlXTogNDAgfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHByaWNlKSkge1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzAsIDEwMDAwMDBdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzEwMDAwMDAsIDMwMDAwMDBdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzMwMDAwMDAsIDUwMDAwMDBdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzUwMDAwMDAsIDEwMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuZ3RlXTogMTAwMDAwMDAgfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJvdmluY2UpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRpc3RyaWN0KSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh3YXJkKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGlkID09IDEyKSB7XHJcbiAgICAgIGlmICh0eXBlUm9vbSkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlUm9vbSA9IHR5cGVSb29tO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3Rhcikge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yYXRpbmcgPSBzdGFyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJvdmluY2UpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRpc3RyaWN0KSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh3YXJkKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gVGjhu7FjIGhp4buHbiB0cnV5IHbhuqVuIGThu68gbGnhu4d1IHbhu5tpIFNlcXVlbGl6ZVxyXG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBmaWx0ZXJlZExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxyXG4gICAgICAgIG9yZGVyOiBbW1wiaWRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyX21hbmFnZXJfcHJvZHVjdCxcclxuICAgICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXHJcbiAgICAgICAgb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gVMOtbmggdG/DoW4gdOG7lW5nIHPhu5EgdHJhbmcgZOG7sWEgdHLDqm4gc+G7kSBsxrDhu6NuZyBk4buvIGxp4buHdSB2w6Aga8OtY2ggdGjGsOG7m2MgdHJhbmdcclxuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChjb3VudCAvIHBhZ2VTaXplKTtcclxuXHJcbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBmaWx0ZXJlZExpc3QsXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxyXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcclxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxyXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdExpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXHJcbiAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyB1cGRhdGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgIC8vIGNvbnN0IHt1c2VyIH1cclxuICAgIGNvbnN0IHsgdWlkIH0gPSByZXEudXNlcjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHtcclxuICAgICAgICBwcm9kdWN0SWQsXHJcbiAgICAgICAgY2F0ZWdvcnlJZCxcclxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHNsdWcsXHJcbiAgICAgICAgYnJhbmQsXHJcbiAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgIHVuaXRTaXplLFxyXG4gICAgICAgIGRlc2MsXHJcbiAgICAgICAgYnV5ZXJQcmljZSxcclxuICAgICAgICBwcmljZSxcclxuICAgICAgICBxdHksXHJcbiAgICAgICAgZGlzY291bnQsXHJcbiAgICAgICAgZGlzY291bnRQZXIsXHJcbiAgICAgICAgdG90YWwsXHJcbiAgICAgICAgbmV0UHJpY2UsXHJcbiAgICAgICAgaW1hZ2VzLFxyXG4gICAgICAgIHNpemUsXHJcbiAgICAgICAgbmV3YWRkaW1hZ2UsXHJcbiAgICAgICAgcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgdHlwZVJvb20sXHJcbiAgICAgICAgaW50ZXJpb3IsXHJcbiAgICAgICAgc3F1YXJlLFxyXG4gICAgICAgIGVuZG93LFxyXG4gICAgICAgIHJhdGluZyxcclxuICAgICAgICBub3RlLFxyXG4gICAgICAgIHVzZXJfbWFuYWdlcixcclxuICAgICAgICByZW50LFxyXG4gICAgICAgIGF1dGhvcl9waG9uZSxcclxuICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgIHBob3RvLFxyXG4gICAgICAgIHByb3ZpbmNlLFxyXG4gICAgICAgIGRpc3RyaWN0LFxyXG4gICAgICAgIHdhcmQsXHJcbiAgICAgICAgcHJvZHVjdF9pZCxcclxuICAgICAgICBwcm92aW5jZVRleHQsXHJcbiAgICAgICAgZGlzdHJpY3RUZXh0LFxyXG4gICAgICAgIHdhcmRUZXh0LFxyXG4gICAgICAgIG1ldGFfZGVzY3JpcHRpb25cclxuICAgICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcclxuICAgICAgICAudGhlbihhc3luYyAocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIuaGlzdG9yeV9lZGl0X3Byb2R1Y3QuY3JlYXRlKHtcclxuICAgICAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgICAgICAgdXNlcl9pZDogdWlkLFxyXG4gICAgICAgICAgICAgIHRpbWVfdXBkYXRlZDogbmV3IERhdGUoKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQgPyBjYXRlZ29yeUlkIDogcHJvZHVjdC5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA/IHN1YkNhdGVnb3J5SWRcclxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LnN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA/IGNoaWxkQ2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3QuY2hpbGRDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHNsdWc6IHNsdWcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxyXG4gICAgICAgICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgICAgICAgICBwcmljZTogcHJpY2UsXHJcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcclxuICAgICAgICAgICAgICAgIHBob3RvOiBwaG90byxcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcclxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxyXG4gICAgICAgICAgICAgICAgaW50ZXJpb3IsXHJcbiAgICAgICAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXHJcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXHJcbiAgICAgICAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXHJcbiAgICAgICAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICByZW50OiByZW50ID8gcmVudCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBwcm92aW5jZSxcclxuICAgICAgICAgICAgICAgIGRpc3RyaWN0LFxyXG4gICAgICAgICAgICAgICAgd2FyZCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RfaWQgPyBwcm9kdWN0X2lkIDogXCJcIixcclxuICAgICAgICAgICAgICAgIHByb3ZpbmNlVGV4dDogcHJvdmluY2VUZXh0ID8gcHJvdmluY2VUZXh0IDogXCJcIixcclxuICAgICAgICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcclxuICAgICAgICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcclxuICAgICAgICAgICAgICAgIG1ldGFfZGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oYXN5bmMgKHApID0+IHtcclxuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xyXG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2l6ZSkge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXHJcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XHJcbiAgICAgICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICAgICAgYW1vdW50LFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGltYWdlcykge1xyXG4gICAgICAgICAgICBhd2FpdCBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XHJcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxyXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgY29uc3QgeyBjYXRlZ29yeUlkLCBwYWdlU2l6ZSA9IDEwIH0gPSByZXEucXVlcnk7XHJcblxyXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xyXG4gICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBUaOG7sWMgaGnhu4duIHRydXkgduG6pW4gZOG7ryBsaeG7h3UgduG7m2kgU2VxdWVsaXplXHJcbiAgICAgIGNvbnN0IHsgY291bnQsIHJvd3M6IGZpbHRlcmVkTGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXHJcbiAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIC8vIGxpbWl0OiBwYWdlU2l6ZSxcclxuICAgICAgICAvLyBvZmZzZXQ6IChwYWdlIC0gMSkgKiBwYWdlU2l6ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBUw61uaCB0b8OhbiB04buVbmcgc+G7kSB0cmFuZyBk4buxYSB0csOqbiBz4buRIGzGsOG7o25nIGThu68gbGnhu4d1IHbDoCBrw61jaCB0aMaw4bubYyB0cmFuZ1xyXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xyXG5cclxuICAgICAgLy8gVHLhuqMgduG7gSBr4bq/dCBxdeG6oyB24bubaSB0aMO0bmcgdGluIHBow6JuIHRyYW5nXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIHJlc3VsdHM6IGZpbHRlcmVkTGlzdCxcclxuICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAvLyBjdXJyZW50UGFnZTogcGFyc2VJbnQocGFnZSksXHJcbiAgICAgICAgICBwYWdlU2l6ZTogcGFyc2VJbnQocGFnZVNpemUpLFxyXG4gICAgICAgICAgdG90YWxJdGVtczogY291bnQsXHJcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xyXG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudFdlYihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBjYXRlZ29yeUlkLCBzdWJDYXRlZ29yeUlkLCBwYWdlID0gMSwgcGFnZVNpemUgPSAxMiB9ID0gcmVxLnF1ZXJ5O1xyXG5cclxuICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBwYXJzZUludChwYWdlKTtcclxuICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHBhZ2VTaXplKTtcclxuXHJcbiAgICAgIGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9IHt9O1xyXG4gICAgICBpZiAoY2F0ZWdvcnlJZCkgd2hlcmVDb25kaXRpb25zLmNhdGVnb3J5SWQgPSBjYXRlZ29yeUlkO1xyXG4gICAgICBpZiAoc3ViQ2F0ZWdvcnlJZCkgd2hlcmVDb25kaXRpb25zLnN1YkNhdGVnb3J5SWQgPSBzdWJDYXRlZ29yeUlkO1xyXG4gICAgICAvLyDEkOG6v20gc+G7kSBsxrDhu6NuZyBi4bqjbiBnaGlcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBkYi5wcm9kdWN0LmNvdW50KHtcclxuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEzhuqV5IGRhbmggc8OhY2ggYuG6o24gZ2hpIHbhu5tpIHBow6JuIHRyYW5nXHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICAgICBcImRlc2NcIixcclxuICAgICAgICAgICAgXCJzbHVnXCIsXHJcbiAgICAgICAgICAgIFwidXBkYXRlZEF0XCIsXHJcbiAgICAgICAgICAgIFwicGhvbmVOdW1iZXJcIixcclxuICAgICAgICAgICAgXCJhdXRob3JfcGhvbmVcIixcclxuICAgICAgICAgICAgXCJzb3J0RGVzY1wiLFxyXG4gICAgICAgICAgICBcImludGVyaW9yXCIsXHJcbiAgICAgICAgICAgIFwibm90ZVwiLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbWl0OiBzaXplLFxyXG4gICAgICAgIG9mZnNldDogKGN1cnJlbnRQYWdlIC0gMSkgKiBzaXplLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBzaXplKTtcclxuXHJcbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICByZXN1bHRzOiBmaWx0ZXJlZExpc3QsXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxyXG4gICAgICAgICAgcGFnZVNpemU6IHNpemUsXHJcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcclxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XHJcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBsZXQge1xyXG4gICAgICBzZWFyY2hUZXh0ID0gXCJcIixcclxuICAgICAgaWQsXHJcbiAgICAgIHN1YmlkLFxyXG4gICAgICBwYWdlID0gMSxcclxuICAgICAgcGFnZVNpemUgPSAxMCxcclxuICAgICAgdHlwZVJvb20sXHJcbiAgICAgIHJlbnQsXHJcbiAgICAgIHNxdWFyZSxcclxuICAgICAgcHJpY2UsXHJcbiAgICAgIHByb3ZpbmNlLFxyXG4gICAgICBkaXN0cmljdCxcclxuICAgICAgd2FyZCxcclxuICAgICAgc3RhcixcclxuICAgICAgcmVzZXQsXHJcbiAgICB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgaWYgKHR5cGVSb29tID09IDApIHtcclxuICAgICAgdHlwZVJvb20gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoc3F1YXJlID09IDApIHtcclxuICAgICAgc3F1YXJlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHByaWNlID09IDApIHtcclxuICAgICAgcHJpY2UgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAocmVudCA9PSAtMSkge1xyXG4gICAgICByZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3ZpbmNlID09IC0xKSB7XHJcbiAgICAgIHByb3ZpbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc3RyaWN0ID09IC0xKSB7XHJcbiAgICAgIGRpc3RyaWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHdhcmQgPT0gLTEpIHtcclxuICAgICAgd2FyZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGxldCBzZWFyY2hUZXh0VmFsaWQ7XHJcbiAgICBpZiAoc2VhcmNoVGV4dCA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRleHQgPT0gbnVsbCkge1xyXG4gICAgICBzZWFyY2hUZXh0VmFsaWQgPSBcIlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VhcmNoVGV4dFZhbGlkID0gc2VhcmNoVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSB7XHJcbiAgICAgIGNhdGVnb3J5SWQ6IGlkLFxyXG4gICAgICBzdWJDYXRlZ29yeUlkOiBzdWJpZCxcclxuICAgICAgW09wLm9yXTogW1xyXG4gICAgICAgIHsgcHJvZHVjdF9pZDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcclxuICAgICAgICB7IG5hbWU6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXHJcbiAgICAgICAgeyBhZGRyZXNzOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxyXG4gICAgICAgIHsgd2FyZFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXHJcbiAgICAgICAgeyBkaXN0cmljdFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXHJcbiAgICAgICAgeyBwcm92aW5jZVRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXHJcbiAgICAgICAgeyBwcmljZTogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cGRhdGVkQXQ6IHtcclxuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0VmFsaWQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjcmVhdGVkQXQ6IHtcclxuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0VmFsaWQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IFwiJHVzZXIuZmlyc3ROYW1lJFwiOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICAgIGlmIChpZCA9PSAxMykge1xyXG4gICAgICBpZiAodHlwZVJvb20pIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlbnQgIT09IHVuZGVmaW5lZCAmJiByZW50LnRvU3RyaW5nKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHN3aXRjaCAocGFyc2VJbnQocmVudCkpIHtcclxuICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSB7IFtPcC5vcl06IFswLCBmYWxzZV0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0geyBbT3Aub3JdOiBbMSwgdHJ1ZV0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3F1YXJlKSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXJzZUludChzcXVhcmUpKSB7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5iZXR3ZWVuXTogWzAsIDIwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmJldHdlZW5dOiBbMjAsIDQwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmd0ZV06IDQwIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXJzZUludChwcmljZSkpIHtcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFswLCAxMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFsxMDAwMDAwLCAzMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFszMDAwMDAwLCA1MDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFs1MDAwMDAwLCAxMDAwMDAwMF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmd0ZV06IDEwMDAwMDAwIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb3ZpbmNlKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaXN0cmljdCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAod2FyZCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpZCA9PSAxMikge1xyXG4gICAgICBpZiAodHlwZVJvb20pIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN0YXIpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmF0aW5nID0gc3RhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb3ZpbmNlKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaXN0cmljdCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAod2FyZCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIFRo4buxYyBoaeG7h24gdHJ1eSB24bqlbiBk4buvIGxp4buHdSB24bubaSBTZXF1ZWxpemVcclxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogZmlsdGVyZWRMaXN0IH0gPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3QsXHJcbiAgICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXHJcbiAgICAgICAgb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gVMOtbmggdG/DoW4gdOG7lW5nIHPhu5EgdHJhbmcgZOG7sWEgdHLDqm4gc+G7kSBsxrDhu6NuZyBk4buvIGxp4buHdSB2w6Aga8OtY2ggdGjGsOG7m2MgdHJhbmdcclxuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChjb3VudCAvIHBhZ2VTaXplKTtcclxuXHJcbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBmaWx0ZXJlZExpc3QsXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxyXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcclxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxyXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5RmlsdGVyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQge1xyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHN1YmlkLFxyXG4gICAgICAgIHR5cGVSb29tLFxyXG4gICAgICAgIHJlbnQsXHJcbiAgICAgICAgc3F1YXJlLFxyXG4gICAgICAgIHByaWNlLFxyXG4gICAgICAgIHByb3ZpbmNlLFxyXG4gICAgICAgIGRpc3RyaWN0LFxyXG4gICAgICAgIHdhcmQsXHJcbiAgICAgICAgc3RhcixcclxuICAgICAgICBwYWdlU2l6ZSA9IDEwLFxyXG4gICAgICAgIHBhZ2UsXHJcbiAgICAgICAgc2VhcmNoVGV4dCA9IFwiXCIsXHJcbiAgICAgICAgdXNlcklkXHJcbiAgICAgICAgLy8gcmVudFxyXG4gICAgICB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBsZXQgc29ydFxyXG4gICAgICBpZihzcXVhcmUgPT09IFwiYXNjXCIgfHwgc3F1YXJlPT09IFwiZGVzY1wiKSB7XHJcbiAgICAgICAgc29ydD0gc3F1YXJlXHJcbiAgICAgIH1cclxuICAgICAgaWYodXNlcklkID09IC0xKSB7XHJcbiAgICAgICAgdXNlcklkPSB1bmRlZmluZWRcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZVJvb20gPT0gMCkge1xyXG4gICAgICAgIHR5cGVSb29tID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzcXVhcmUgPT0gMCB8fCBzcXVhcmU9PSBcImFzY1wiIHx8IHNxdWFyZT09IFwiZGVzY1wiKSB7XHJcbiAgICAgICAgc3F1YXJlID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcmljZSA9PSAwKSB7XHJcbiAgICAgICAgcHJpY2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlbnQgPT0gLTEpIHtcclxuICAgICAgICByZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcm92aW5jZSA9PSAtMSkge1xyXG4gICAgICAgIHByb3ZpbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkaXN0cmljdCA9PSAtMSkge1xyXG4gICAgICAgIGRpc3RyaWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh3YXJkID09IC0xKSB7XHJcbiAgICAgICAgd2FyZCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHtcclxuICAgICAgICBjYXRlZ29yeUlkOiBwYXJzZUludChpZCksXHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZDogcGFyc2VJbnQoc3ViaWQpLFxyXG4gICAgICAgIFtPcC5vcl06IFtcclxuICAgICAgICAgIHsgcHJvZHVjdF9pZDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgICB7IG5hbWU6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgICAgeyBhZGRyZXNzOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICAgIHsgd2FyZFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgICAgeyBkaXN0cmljdFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgICAgeyBwcm92aW5jZVRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgICAgeyBwcmljZTogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHVwZGF0ZWRBdDoge1xyXG4gICAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dCwgXCJERC1NTS1ZWVlZIEhIOm1tOnNzXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY3JlYXRlZEF0OiB7XHJcbiAgICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8geyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKGlkID09IDEzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVSb29tKSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHN3aXRjaCAocGFyc2VJbnQocmVudCkpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0gMDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0gMTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0gMjtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzcXVhcmUpIHtcclxuICAgICAgICAgIHN3aXRjaCAocGFyc2VJbnQoc3F1YXJlKSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IFNlcXVlbGl6ZS5saXRlcmFsKFxyXG4gICAgICAgICAgICAgICAgXCJDQVNUKHNxdWFyZSBBUyBJTlQpIEJFVFdFRU4gMCBBTkQgMjBcIlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuYmV0d2Vlbl06IFsyMCwgNDBdIH07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuZ3RlXTogNDAgfTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgc3dpdGNoIChwYXJzZUludChwcmljZSkpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbMCwgMTAwMDAwMF0gfTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbMTAwMDAwMCwgMzAwMDAwMF0gfTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbMzAwMDAwMCwgNTAwMDAwMF0gfTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbNTAwMDAwMCwgMTAwMDAwMDBdIH07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5ndGVdOiAxMDAwMDAwMCB9O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb3ZpbmNlKSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkaXN0cmljdCkge1xyXG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAod2FyZCkge1xyXG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpZCA9PSAxMikge1xyXG4gICAgICAgIGlmICh0eXBlUm9vbSkge1xyXG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnR5cGVSb29tID0gdHlwZVJvb207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3Rhcikge1xyXG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJhdGluZyA9IHN0YXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvdmluY2UpIHtcclxuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpc3RyaWN0KSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3YXJkKSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHN1YldoZXJlPSB7fVxyXG4gICAgICBjb25zdCBmaWx0ZXI9IHt9XHJcbiAgICAgIGlmKHVzZXJJZCkge1xyXG4gICAgICAgIHN1YldoZXJlLmlkPSB1c2VySWRcclxuICAgICAgICBmaWx0ZXIuYm9vbGVhbj0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGZpbHRlci5ib29sZWFuPSBmYWxzZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgb3JkZXJcclxuICAgICAgaWYoc29ydCkge1xyXG4gICAgICAgIG9yZGVyPSBbW1wic3F1YXJlXCIsIHNvcnRdXVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIG9yZGVyPSBbW1wiaWRcIiwgXCJkZXNjXCJdXVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKG9yZGVyKVxyXG4gICAgICAgIGxldCB7IGNvdW50LCByb3dzOiBwcm9kdWN0TGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xyXG4gICAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcclxuICAgICAgICAgIG9yZGVyOiBvcmRlcixcclxuICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXJfbWFuYWdlcl9wcm9kdWN0LFxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZDogZmlsdGVyLmJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgIGFzOiBcIm1hbmFnZXJVc2VyXCIsIFxyXG4gICAgICAgICAgICAgICAgICB3aGVyZTogc3ViV2hlcmUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgYXR0cmlidXRlczogeyBleGNsdWRlOiBbXCJkZXNjXCJdIH0sXHJcbiAgICAgICAgICBsaW1pdDogcGFnZVNpemUsXHJcbiAgICAgICAgICBvZmZzZXQ6IChwYWdlIC0gMSkgKiBwYWdlU2l6ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0TGlzdClcclxuICAgICAgLy8gaWYodXNlcklkKSB7XHJcbiAgICAgIC8vICAgcHJvZHVjdExpc3Q9IHByb2R1Y3RMaXN0Py5maWx0ZXIoaXRlbT0+IGl0ZW0/LnVzZXJfbWFuYWdlcl9wcm9kdWN0cz8uZmlsdGVyKGl0ZW0yPT4gaXRlbTI/LnVzZXJNYW5hZ2VyPy5pZD09IHVzZXJJZCk/Lmxlbmd0aCA+IDApXHJcbiAgICAgIC8vICAgLy8gY291bnQ9IHByb2R1Y3RMaXN0Lmxlbmd0aFxyXG4gICAgICAvLyB9XHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBwcm9kdWN0TGlzdCxcclxuICAgICAgICBmaWx0ZXJNYW5hZ2VyOiAodXNlcklkICYmIHVzZXJJZCAhPSAtMSkgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxyXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcclxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxyXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtvazogZmFsc2V9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiAxMixcclxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGV4Y2x1ZGU6IFtcImRlc2NcIl0gfSxcclxuICAgICAgICAgIGxpbWl0OiA0LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTMsXHJcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxyXG4gICAgICAgICAgYXR0cmlidXRlczogeyBleGNsdWRlOiBbXCJkZXNjXCJdIH0sXHJcbiAgICAgICAgICBsaW1pdDogNCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0MihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICBlbmRvdzogMSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiZGVzY1wiXSB9LFxyXG4gICAgICAgICAgbGltaXQ6IDQsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBbbGlzdF0gfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RVc2VyTWFuYWdlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHVpZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBjb25zdCByb3dzID0gYXdhaXQgZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3QuZmluZEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdWlkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhyb3dzKVxyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiByb3dzLCBvazogdHJ1ZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgb2s6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnByb2R1Y3RzaXplLmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHF0eSwgZGlzY291bnRfcGVyLCBkaXNjb3VudF9wcmljZSwgdG90YWwsIG5ldF9wcmljZSB9ID1cclxuICAgICAgICByZXEuYm9keTtcclxuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXHJcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxyXG4gICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLnVwZGF0ZShcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdHk6IHF0eSxcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxyXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxyXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHApID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdE9mZmVyKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1xyXG4gICAgICAgICAgICAgIFwiaWRcIixcclxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcclxuICAgICAgICAgICAgICBcInByaWNlXCIsXHJcbiAgICAgICAgICAgICAgXCJpdGVtX25hbWVcIixcclxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJicmFuZFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWQgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBkYi5wcm9kdWN0XHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmUpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBhc3luYyBwcm9kdWN0RGVsZXRlQnVsayhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIucHJvZHVjdFxyXG4gICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5saXN0IH0gfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgICAuanNvbih7IG9rOiB0cnVlLCBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXHJcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGxldCBhdHRhY2htZW50RW50cmllcyA9IFtdO1xyXG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcclxuICAgIGNvbnNvbGUubG9nKFwicmVxLmZpbGVzXCIsIHJlcS5maWxlcylcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGF0dGFjaG1lbnRFbnRyaWVzLnB1c2goe1xyXG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcclxuICAgICAgICBtaW1lOiByZXEuZmlsZXNbaV0ubWltZXR5cGUsXHJcbiAgICAgICAgaW1nVXJsOiByZXEucHJvdG9jb2wgKyBcIjovL1wiICsgcmVxLmdldChcImhvc3RcIikgKyBcIi9cIiArIHJlcS5maWxlc1tpXS5wYXRoPy5yZXBsYWNlKFwiLndhdGVybWFyay9cIiwgXCJcIiksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRiLnByb2R1Y3RcclxuICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcclxuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICAgIC8vICAgICBwcm9kdWN0TmFtZTogci5pdGVtX25hbWUsXHJcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxyXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS5maWxlcy5tYXAoaXRlbT0+ICh7Li4uaXRlbSwgcGF0aDogaXRlbT8ucGF0aD8ucmVwbGFjZShcIi4vd2F0ZXJtYXJrL1wiLCBcIlwiKX0pKSwgb2s6IHRydWUgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxyXG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XHJcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxyXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcclxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGxpbWl0OiA4LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLmNhdGVnb3J5XHJcbiAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBmaWx0ZXIgcHJvZHVjdFxyXG5cclxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XHJcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XHJcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XHJcbiAgICAgIH1cclxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XHJcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxyXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICBbT3Aub3JdOiBbXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXHJcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXHJcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxyXG5cclxuICAgICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG5cclxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWJDaGlsZENhdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXHJcbiAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoXCJSQU5EKClcIiksXHJcbiAgICAgICAgICBsaW1pdDogOCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRTaXplUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgZGIucHJvZHVjdHNpemVcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0SGlzdG9yeUVkaXRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHByb2R1Y3RfaWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IGRiLmhpc3RvcnlfZWRpdF9wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICBwcm9kdWN0X2lkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3JkZXI6IFtbXCJ0aW1lX3VwZGF0ZWRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcm93cywgb2s6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RNYW5hZ2VCeVVzZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCBkYi51c2VyX21hbmFnZXJfcHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcInByb2R1Y3RfaWRcIiwgXCJ1c2VyX21hbmFnZXJcIiwgXCJ1c2VyX293bmVyXCJdLFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBhczogXCJtYW5hZ2VyVXNlclwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCIsIFwiYWRkcmVzc1wiLCBcImVtYWlsXCJdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFzOiBcInByb2R1Y3RcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJvd3MsIG9rOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFFQSxJQUFBQyxPQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFBNEIsU0FBQUcsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFHLE1BQUEsV0FBQUYsU0FBQSxDQUFBRCxDQUFBLElBQUFDLFNBQUEsQ0FBQUQsQ0FBQSxRQUFBQSxDQUFBLE9BQUFmLE9BQUEsQ0FBQUksTUFBQSxDQUFBYyxNQUFBLE9BQUFDLE9BQUEsV0FBQUMsR0FBQSxRQUFBQyxnQkFBQSxhQUFBUCxNQUFBLEVBQUFNLEdBQUEsRUFBQUYsTUFBQSxDQUFBRSxH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