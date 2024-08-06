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
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) switch (_context2.prev = _context2.next) {
                              case 0:
                                _models.db.productphoto.create({
                                  imgUrl: item === null || item === void 0 ? void 0 : item.path,
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
                        msg: "Successfully inserted product"
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
      var _req$query5, id, subid, typeRoom, rent, square, price, province, district, ward, star, _req$query5$pageSize, pageSize, page, _req$query5$searchTex, searchText, userId, whereConditions, subWhere, filter, _yield$db$product$fin4, count, productList, totalPages;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _req$query5 = req.query, id = _req$query5.id, subid = _req$query5.subid, typeRoom = _req$query5.typeRoom, rent = _req$query5.rent, square = _req$query5.square, price = _req$query5.price, province = _req$query5.province, district = _req$query5.district, ward = _req$query5.ward, star = _req$query5.star, _req$query5$pageSize = _req$query5.pageSize, pageSize = _req$query5$pageSize === void 0 ? 10 : _req$query5$pageSize, page = _req$query5.page, _req$query5$searchTex = _req$query5.searchText, searchText = _req$query5$searchTex === void 0 ? "" : _req$query5$searchTex, userId = _req$query5.userId;
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
              _context13.next = 51;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined)) {
              _context13.next = 22;
              break;
            }
            _context13.t0 = parseInt(rent);
            _context13.next = _context13.t0 === 0 ? 16 : _context13.t0 === 1 ? 18 : _context13.t0 === 2 ? 20 : 22;
            break;
          case 16:
            whereConditions.rent = 0;
            return _context13.abrupt("break", 22);
          case 18:
            whereConditions.rent = 1;
            return _context13.abrupt("break", 22);
          case 20:
            whereConditions.rent = 2;
            return _context13.abrupt("break", 22);
          case 22:
            if (!square) {
              _context13.next = 32;
              break;
            }
            _context13.t1 = parseInt(square);
            _context13.next = _context13.t1 === 1 ? 26 : _context13.t1 === 2 ? 28 : _context13.t1 === 3 ? 30 : 32;
            break;
          case 26:
            whereConditions.square = Sequelize.literal("CAST(square AS INT) BETWEEN 0 AND 20");
            return _context13.abrupt("break", 32);
          case 28:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context13.abrupt("break", 32);
          case 30:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context13.abrupt("break", 32);
          case 32:
            if (!price) {
              _context13.next = 46;
              break;
            }
            _context13.t2 = parseInt(price);
            _context13.next = _context13.t2 === 1 ? 36 : _context13.t2 === 2 ? 38 : _context13.t2 === 3 ? 40 : _context13.t2 === 4 ? 42 : _context13.t2 === 5 ? 44 : 46;
            break;
          case 36:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context13.abrupt("break", 46);
          case 38:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context13.abrupt("break", 46);
          case 40:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context13.abrupt("break", 46);
          case 42:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context13.abrupt("break", 46);
          case 44:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context13.abrupt("break", 46);
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
            _context13.next = 52;
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
            subWhere = {};
            filter = {};
            if (userId) {
              subWhere.id = userId;
              filter["boolean"] = true;
            } else {
              filter["boolean"] = false;
            }
            _context13.next = 57;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["id", "DESC"]],
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
          case 57:
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
              filterManager: userId ? true : false,
              pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            }));
          case 64:
            _context13.prev = 64;
            _context13.t3 = _context13["catch"](0);
            console.log(_context13.t3);
            // throw new RequestError("Error");
            return _context13.abrupt("return", res.status(500).json({
              ok: false
            }));
          case 68:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 64]]);
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
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
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
                data: req.files,
                ok: true
              });
            })["catch"](function (error) {
              console.log(error);
              res.status(500).json({
                errors: ["Error insert photo"]
              });
            });
          case 4:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9tb21lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVxdWlyZSIsIk9wIiwiU2VxdWVsaXplIiwid2hlcmUiLCJfZGVmYXVsdCIsImdldFBob3RvUHJvZHVjdCIsInJlcSIsInJlcyIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwicHJvZHVjdElkIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInF1ZXJ5IiwiZGIiLCJwcm9kdWN0cGhvdG8iLCJmaW5kQWxsIiwidGhlbiIsInByb2R1Y3QiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImFkZFByb2R1Y3QiLCJfY2FsbGVlNCIsInVpZCIsIl9yZXEkYm9keSIsImNhdGVnb3J5SWQiLCJzdWJDYXRlZ29yeUlkIiwiY2hpbGRDYXRlZ29yeUlkIiwibmFtZSIsInNsdWciLCJicmFuZCIsInVuaXRTaXplIiwic29ydERlc2MiLCJkZXNjIiwiYnV5ZXJQcmljZSIsInByaWNlIiwicXR5IiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsInRvdGFsIiwibmV0UHJpY2UiLCJpbWFnZSIsInNpemUiLCJuZXdhZGRpbWFnZSIsInBob25lTnVtYmVyIiwicHJvdmluY2UiLCJkaXN0cmljdCIsIndhcmQiLCJzcXVhcmUiLCJwcm92aW5jZVRleHQiLCJkaXN0cmljdFRleHQiLCJ3YXJkVGV4dCIsImJ1ZGdldCIsInR5cGVSb29tIiwiaW50ZXJpb3IiLCJlbmRvdyIsInJhdGluZyIsIm5vdGUiLCJ1c2VyX21hbmFnZXIiLCJhdXRob3JfcGhvbmUiLCJhZGRyZXNzIiwicHJvZHVjdF9pZCIsInJlbnQiLCJtZXRhX2Rlc2NyaXB0aW9uIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwidXNlciIsImJvZHkiLCJjcmVhdGUiLCJwYXJzZUludCIsInBob3RvIiwiZmlsZSIsInBhdGgiLCJfcmVmIiwiX2NhbGxlZTMiLCJfSlNPTiRwYXJzZSIsIl9KU09OJHBhcnNlMyIsIl9KU09OJHBhcnNlMiIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsInVzZXJfbWFuYWdlcl9wcm9kdWN0IiwidXNlcl9vd25lciIsImRhdGFWYWx1ZXMiLCJpZCIsInQwIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJwYXJzZSIsIm1hcCIsIl9yZWYyIiwiX2NhbGxlZTIiLCJpdGVtIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiaW1nVXJsIiwiX3gyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJfeCIsImVyciIsImFicnVwdCIsImdldEFsbFByb2R1Y3RDYXRlZ29yeSIsIl9jYWxsZWU1IiwiX3JlcSRxdWVyeSIsIl9yZXEkcXVlcnkkc2VhcmNoVGV4dCIsInNlYXJjaFRleHQiLCJzdWJpZCIsIl9yZXEkcXVlcnkkcGFnZSIsInBhZ2UiLCJfcmVxJHF1ZXJ5JHBhZ2VTaXplIiwicGFnZVNpemUiLCJzdGFyIiwid2hlcmVDb25kaXRpb25zIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluIiwiY291bnQiLCJmaWx0ZXJlZExpc3QiLCJ0b3RhbFBhZ2VzIiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwidW5kZWZpbmVkIiwib3IiLCJzdWJzdHJpbmciLCJ1cGRhdGVkQXQiLCJtb21lbnQiLCJjcmVhdGVkQXQiLCJ0b1N0cmluZyIsInQxIiwiYmV0d2VlbiIsImd0ZSIsInQyIiwiZmluZEFuZENvdW50QWxsIiwib3JkZXIiLCJpbmNsdWRlIiwibW9kZWwiLCJyZXF1aXJlZCIsImF0dHJpYnV0ZXMiLCJsaW1pdCIsIm9mZnNldCIsInNlbnQiLCJyb3dzIiwiTWF0aCIsImNlaWwiLCJwYWdpbmF0aW9uIiwiY3VycmVudFBhZ2UiLCJ0b3RhbEl0ZW1zIiwidDMiLCJlcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTYiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJTdWJDYXRlZ29yeSIsImNhdGVnb3J5IiwiUmVxdWVzdEVycm9yIiwidXBkYXRlIiwiX2NhbGxlZTkiLCJfcmVxJGJvZHkyIiwiaW1hZ2VzIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZmluZE9uZSIsIl9yZWYzIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJoaXN0b3J5X2VkaXRfcHJvZHVjdCIsInVzZXJfaWQiLCJ0aW1lX3VwZGF0ZWQiLCJEYXRlIiwiX3gzIiwiX3JlZjQiLCJfY2FsbGVlOCIsInAiLCJfSlNPTiRwYXJzZTQiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWY1IiwiX3g0IiwiZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5Q2xpZW50IiwiX2NhbGxlZTEwIiwiX3JlcSRxdWVyeTIiLCJfcmVxJHF1ZXJ5MiRwYWdlU2l6ZSIsIl95aWVsZCRkYiRwcm9kdWN0JGZpbjIiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInJlc3VsdHMiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnRXZWIiLCJfY2FsbGVlMTEiLCJfcmVxJHF1ZXJ5MyIsIl9yZXEkcXVlcnkzJHBhZ2UiLCJfcmVxJHF1ZXJ5MyRwYWdlU2l6ZSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiZXhjbHVkZSIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsIl9jYWxsZWUxMiIsIl9yZXEkcXVlcnk0IiwiX3JlcSRxdWVyeTQkc2VhcmNoVGV4IiwiX3JlcSRxdWVyeTQkcGFnZSIsIl9yZXEkcXVlcnk0JHBhZ2VTaXplIiwicmVzZXQiLCJzZWFyY2hUZXh0VmFsaWQiLCJfeWllbGQkZGIkcHJvZHVjdCRmaW4zIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJnZXRQcm9kdWN0TGlzdEJ5RmlsdGVyIiwiX2NhbGxlZTEzIiwiX3JlcSRxdWVyeTUiLCJfcmVxJHF1ZXJ5NSRwYWdlU2l6ZSIsIl9yZXEkcXVlcnk1JHNlYXJjaFRleCIsInVzZXJJZCIsInN1YldoZXJlIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluNCIsInByb2R1Y3RMaXN0IiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJsaXRlcmFsIiwiYXMiLCJmaWx0ZXJNYW5hZ2VyIiwiZ2V0UHJvZHVjdFN1Z2dlc3RIb3RlbCIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwibGlzdCIsImdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50IiwiX2NhbGxlZTE1IiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJnZXRQcm9kdWN0U3VnZ2VzdDIiLCJfY2FsbGVlMTYiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsImdldFByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxNyIsIl9jYWxsZWUxNyQiLCJfY29udGV4dDE3IiwiZ2V0UHJvZHVjdFVzZXJNYW5hZ2UiLCJfY2FsbGVlMTgiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMjAiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInN1Yl9uYW1lIiwic3ViQ2F0IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUyMyIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwicmUiLCJwcm9kdWN0RGVsZXRlQnVsayIsIl9jYWxsZWUyNCIsIl9jYWxsZWUyNCQiLCJfY29udGV4dDI0IiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTI1IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTI2IiwiYXR0YWNobWVudEVudHJpZXMiLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsImZpbGVzIiwiZmlsZW5hbWUiLCJtaW1lIiwibWltZXR5cGUiLCJyIiwiZXJyb3JzIiwiZ2V0QWxsUGhvdG8iLCJfY2FsbGVlMjciLCJfY2FsbGVlMjckIiwiX2NvbnRleHQyNyIsImRlbGV0ZVNsaWRlclBob3RvIiwiX2NhbGxlZTI4IiwiX2NhbGxlZTI4JCIsIl9jb250ZXh0MjgiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJfY2FsbGVlMjkiLCJfY2FsbGVlMjkkIiwiX2NvbnRleHQyOSIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJfY2FsbGVlMzAiLCJfY2FsbGVlMzAkIiwiX2NvbnRleHQzMCIsImdldEZpbHRlcmJ5UHJvZHVjdCIsIl9jYWxsZWUzMSIsInNlYXJjaCIsIl9jYWxsZWUzMSQiLCJfY29udGV4dDMxIiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMzIiLCJfY2FsbGVlMzIkIiwiX2NvbnRleHQzMiIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMzMiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTMzJCIsIl9jb250ZXh0MzMiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMzQiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTM0JCIsIl9jb250ZXh0MzQiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUzNSIsIl9jYWxsZWUzNSQiLCJfY29udGV4dDM1IiwiZ2V0U2l6ZVByb2R1Y3QiLCJfY2FsbGVlMzYiLCJfY2FsbGVlMzYkIiwiX2NvbnRleHQzNiIsImdldEhpc3RvcnlFZGl0UHJvZHVjdCIsIl9jYWxsZWUzNyIsIl9jYWxsZWUzNyQiLCJfY29udGV4dDM3IiwiZ2V0UHJvZHVjdE1hbmFnZUJ5VXNlciIsIl9jYWxsZWUzOCIsIl9jYWxsZWUzOCQiLCJfY29udGV4dDM4IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xyXG5jb25zdCB7IE9wLCBTZXF1ZWxpemUsIHdoZXJlIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuLy8gaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuLi8uLi8uLi9rdWUnO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXHJcbiAgYXN5bmMgZ2V0UGhvdG9Qcm9kdWN0KHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgIC5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgYWRkUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyB1aWQgfSA9IHJlcS51c2VyO1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY2F0ZWdvcnlJZCxcclxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgIGNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHNsdWcsXHJcbiAgICAgICAgYnJhbmQsXHJcbiAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgIHVuaXRTaXplLFxyXG4gICAgICAgIHNvcnREZXNjLFxyXG4gICAgICAgIGRlc2MsXHJcbiAgICAgICAgYnV5ZXJQcmljZSxcclxuICAgICAgICBwcmljZSxcclxuICAgICAgICBxdHksXHJcbiAgICAgICAgZGlzY291bnQsXHJcbiAgICAgICAgZGlzY291bnRQZXIsXHJcbiAgICAgICAgdG90YWwsXHJcbiAgICAgICAgbmV0UHJpY2UsXHJcbiAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgc2l6ZSxcclxuICAgICAgICBuZXdhZGRpbWFnZSxcclxuICAgICAgICBwaG9uZU51bWJlcixcclxuICAgICAgICBwcm92aW5jZSxcclxuICAgICAgICBkaXN0cmljdCxcclxuICAgICAgICB3YXJkLFxyXG4gICAgICAgIHNxdWFyZSxcclxuICAgICAgICBwcm92aW5jZVRleHQsXHJcbiAgICAgICAgZGlzdHJpY3RUZXh0LFxyXG4gICAgICAgIHdhcmRUZXh0LFxyXG4gICAgICAgIGJ1ZGdldCxcclxuICAgICAgICB0eXBlUm9vbSxcclxuICAgICAgICBpbnRlcmlvcixcclxuICAgICAgICBlbmRvdyxcclxuICAgICAgICByYXRpbmcsXHJcbiAgICAgICAgbm90ZSxcclxuICAgICAgICB1c2VyX21hbmFnZXIsXHJcbiAgICAgICAgYXV0aG9yX3Bob25lLFxyXG4gICAgICAgIGFkZHJlc3MsXHJcbiAgICAgICAgcHJvZHVjdF9pZCxcclxuICAgICAgICByZW50LFxyXG4gICAgICAgIG1ldGFfZGVzY3JpcHRpb25cclxuICAgICAgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5jcmVhdGUoe1xyXG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcclxuICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXHJcbiAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB8fCAwLFxyXG4gICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgIHNsdWc6IHNsdWcsXHJcbiAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxyXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxyXG4gICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxyXG4gICAgICAgICAgc29ydERlc2M6IHNvcnREZXNjLFxyXG4gICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgICBwcmljZTogcHJpY2UsXHJcbiAgICAgICAgICBxdHk6IHF0eSxcclxuICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcclxuICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcclxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcclxuICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLnBhdGggOiBcIlwiLFxyXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxyXG4gICAgICAgICAgcHJvdmluY2U6IHByb3ZpbmNlLFxyXG4gICAgICAgICAgZGlzdHJpY3Q6IGRpc3RyaWN0LFxyXG4gICAgICAgICAgd2FyZDogd2FyZCxcclxuICAgICAgICAgIHByb3ZpbmNlVGV4dDogcHJvdmluY2VUZXh0ID8gcHJvdmluY2VUZXh0IDogXCJcIixcclxuICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcclxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcclxuICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcclxuICAgICAgICAgIGJ1ZGdldDogYnVkZ2V0ID8gYnVkZ2V0IDogMCxcclxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcclxuICAgICAgICAgIGludGVyaW9yOiBpbnRlcmlvciA/IGludGVyaW9yIDogXCJcIixcclxuICAgICAgICAgIGVuZG93OiBlbmRvdyA/IGVuZG93IDogMCxcclxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcclxuICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcclxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdWlkLFxyXG4gICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgPyBhdXRob3JfcGhvbmUgOiBcIlwiLFxyXG4gICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxyXG4gICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiLFxyXG4gICAgICAgICAgcmVudDogcmVudCA/IHJlbnQgOiAwLFxyXG4gICAgICAgICAgbWV0YV9kZXNjcmlwdGlvblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oYXN5bmMgKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLnVzZXJfbWFuYWdlcl9wcm9kdWN0LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgdXNlcl9vd25lcjogdWlkLFxyXG4gICAgICAgICAgICAgIHVzZXJfbWFuYWdlcjogdWlkLFxyXG4gICAgICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKGFzeW5jIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcclxuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXHJcbiAgICAgICAgICAgICAgYW1vdW50OiBpdGVtPy5hbW91bnQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIHJlc1xyXG4gICAgICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgbGV0IHtcclxuICAgICAgc2VhcmNoVGV4dCA9IFwiXCIsXHJcbiAgICAgIGlkLFxyXG4gICAgICBzdWJpZCxcclxuICAgICAgcGFnZSA9IDEsXHJcbiAgICAgIHBhZ2VTaXplID0gMTAsXHJcbiAgICAgIHR5cGVSb29tLFxyXG4gICAgICByZW50LFxyXG4gICAgICBzcXVhcmUsXHJcbiAgICAgIHByaWNlLFxyXG4gICAgICBwcm92aW5jZSxcclxuICAgICAgZGlzdHJpY3QsXHJcbiAgICAgIHdhcmQsXHJcbiAgICAgIHN0YXIsXHJcbiAgICB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgaWYgKHR5cGVSb29tID09IDApIHtcclxuICAgICAgdHlwZVJvb20gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoc3F1YXJlID09IDApIHtcclxuICAgICAgc3F1YXJlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHByaWNlID09IDApIHtcclxuICAgICAgcHJpY2UgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAocmVudCA9PSAtMSkge1xyXG4gICAgICByZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3ZpbmNlID09IC0xKSB7XHJcbiAgICAgIHByb3ZpbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc3RyaWN0ID09IC0xKSB7XHJcbiAgICAgIGRpc3RyaWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHdhcmQgPT0gLTEpIHtcclxuICAgICAgd2FyZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9IHtcclxuICAgICAgY2F0ZWdvcnlJZDogaWQsXHJcbiAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YmlkLFxyXG4gICAgICBbT3Aub3JdOiBbXHJcbiAgICAgICAgeyBwcm9kdWN0X2lkOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICB7IG5hbWU6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgIHsgYWRkcmVzczogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgeyB3YXJkVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgeyBkaXN0cmljdFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgIHsgcHJvdmluY2VUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICB7IHByaWNlOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB1cGRhdGVkQXQ6IHtcclxuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY3JlYXRlZEF0OiB7XHJcbiAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dCwgXCJERC1NTS1ZWVlZIEhIOm1tOnNzXCIpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHsgXCIkdXNlci5maXJzdE5hbWUkXCI6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICAgIGlmIChpZCA9PSAxMykge1xyXG4gICAgICBpZiAodHlwZVJvb20pIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlbnQgIT09IHVuZGVmaW5lZCAmJiByZW50LnRvU3RyaW5nKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHN3aXRjaCAocGFyc2VJbnQocmVudCkpIHtcclxuICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSB7IFtPcC5vcl06IFswLCBmYWxzZV0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0geyBbT3Aub3JdOiBbMSwgdHJ1ZV0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0gMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3F1YXJlKSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXJzZUludChzcXVhcmUpKSB7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5iZXR3ZWVuXTogWzAsIDIwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmJldHdlZW5dOiBbMjAsIDQwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmd0ZV06IDQwIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXJzZUludChwcmljZSkpIHtcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFswLCAxMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFsxMDAwMDAwLCAzMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFszMDAwMDAwLCA1MDAwMDAwXSB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFs1MDAwMDAwLCAxMDAwMDAwMF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmd0ZV06IDEwMDAwMDAwIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb3ZpbmNlKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaXN0cmljdCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAod2FyZCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpZCA9PSAxMikge1xyXG4gICAgICBpZiAodHlwZVJvb20pIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN0YXIpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmF0aW5nID0gc3RhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb3ZpbmNlKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkaXN0cmljdCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAod2FyZCkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIFRo4buxYyBoaeG7h24gdHJ1eSB24bqlbiBk4buvIGxp4buHdSB24bubaSBTZXF1ZWxpemVcclxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogZmlsdGVyZWRMaXN0IH0gPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XHJcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcclxuICAgICAgICBvcmRlcjogW1tcImlkXCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcl9tYW5hZ2VyX3Byb2R1Y3QsXHJcbiAgICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxyXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XHJcblxyXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgZGF0YTogZmlsdGVyZWRMaXN0LFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcclxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXHJcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcclxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XHJcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDYXRlZ29yeSxcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgdXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAvLyBjb25zdCB7dXNlciB9XHJcbiAgICBjb25zdCB7IHVpZCB9ID0gcmVxLnVzZXI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgIGNhdGVnb3J5SWQsXHJcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBzbHVnLFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICB1bml0U2l6ZSxcclxuICAgICAgICBkZXNjLFxyXG4gICAgICAgIGJ1eWVyUHJpY2UsXHJcbiAgICAgICAgcHJpY2UsXHJcbiAgICAgICAgcXR5LFxyXG4gICAgICAgIGRpc2NvdW50LFxyXG4gICAgICAgIGRpc2NvdW50UGVyLFxyXG4gICAgICAgIHRvdGFsLFxyXG4gICAgICAgIG5ldFByaWNlLFxyXG4gICAgICAgIGltYWdlcyxcclxuICAgICAgICBzaXplLFxyXG4gICAgICAgIG5ld2FkZGltYWdlLFxyXG4gICAgICAgIHBob25lTnVtYmVyLFxyXG4gICAgICAgIHR5cGVSb29tLFxyXG4gICAgICAgIGludGVyaW9yLFxyXG4gICAgICAgIHNxdWFyZSxcclxuICAgICAgICBlbmRvdyxcclxuICAgICAgICByYXRpbmcsXHJcbiAgICAgICAgbm90ZSxcclxuICAgICAgICB1c2VyX21hbmFnZXIsXHJcbiAgICAgICAgcmVudCxcclxuICAgICAgICBhdXRob3JfcGhvbmUsXHJcbiAgICAgICAgYWRkcmVzcyxcclxuICAgICAgICBwaG90byxcclxuICAgICAgICBwcm92aW5jZSxcclxuICAgICAgICBkaXN0cmljdCxcclxuICAgICAgICB3YXJkLFxyXG4gICAgICAgIHByb2R1Y3RfaWQsXHJcbiAgICAgICAgcHJvdmluY2VUZXh0LFxyXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcclxuICAgICAgICB3YXJkVGV4dCxcclxuICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uXHJcbiAgICAgIH0gPSByZXEuYm9keTtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXHJcbiAgICAgICAgLnRoZW4oYXN5bmMgKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGRiLmhpc3RvcnlfZWRpdF9wcm9kdWN0LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIHVzZXJfaWQ6IHVpZCxcclxuICAgICAgICAgICAgICB0aW1lX3VwZGF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LnVwZGF0ZShcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkID8gY2F0ZWdvcnlJZCA6IHByb2R1Y3QuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcclxuICAgICAgICAgICAgICAgICAgPyBzdWJDYXRlZ29yeUlkXHJcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5zdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWRcclxuICAgICAgICAgICAgICAgICAgPyBjaGlsZENhdGVnb3J5SWRcclxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LmNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcclxuICAgICAgICAgICAgICAgIGJyYW5kOiBicmFuZCxcclxuICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcclxuICAgICAgICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxyXG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXHJcbiAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXHJcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogcGhvdG8sXHJcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICB0eXBlUm9vbSxcclxuICAgICAgICAgICAgICAgIGludGVyaW9yLFxyXG4gICAgICAgICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxyXG4gICAgICAgICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxyXG4gICAgICAgICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxyXG4gICAgICAgICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcmVudDogcmVudCA/IHJlbnQgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgPyBhdXRob3JfcGhvbmUgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcHJvdmluY2UsXHJcbiAgICAgICAgICAgICAgICBkaXN0cmljdCxcclxuICAgICAgICAgICAgICAgIHdhcmQsXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0X2lkID8gcHJvZHVjdF9pZCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBkaXN0cmljdFRleHQ6IGRpc3RyaWN0VGV4dCA/IGRpc3RyaWN0VGV4dCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBtZXRhX2Rlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiTm90IEZvdW5kIFByb2R1Y3RcIiwgNDA5KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGFzeW5jIChwKSA9PiB7XHJcbiAgICAgICAgICBpZiAobmV3YWRkaW1hZ2UpIHtcclxuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIGltZ1VybDogaXRlbT8uaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNpemUpIHtcclxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuZGVzdHJveSh7XHJcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5idWxrQ3JlYXRlKFxyXG4gICAgICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSkubWFwKCh7IHNpemUsIGFtb3VudCB9KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgc2l6ZSxcclxuICAgICAgICAgICAgICAgIGFtb3VudCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcclxuICAgICAgICAgICAgYXdhaXQgZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe1xyXG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcHJvZHVjdElkIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uYnVsa0NyZWF0ZShcclxuICAgICAgICAgICAgICBKU09OLnBhcnNlKGltYWdlcykubWFwKChpdGVtKSA9PiAoeyAuLi5pdGVtLCBwcm9kdWN0SWQgfSkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVcGRhdGVkIFN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnQocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgcGFnZVNpemUgPSAxMCB9ID0gcmVxLnF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9IHtcclxuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gVGjhu7FjIGhp4buHbiB0cnV5IHbhuqVuIGThu68gbGnhu4d1IHbhu5tpIFNlcXVlbGl6ZVxyXG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBmaWx0ZXJlZExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxyXG4gICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBsaW1pdDogcGFnZVNpemUsXHJcbiAgICAgICAgLy8gb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gVMOtbmggdG/DoW4gdOG7lW5nIHPhu5EgdHJhbmcgZOG7sWEgdHLDqm4gc+G7kSBsxrDhu6NuZyBk4buvIGxp4buHdSB2w6Aga8OtY2ggdGjGsOG7m2MgdHJhbmdcclxuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChjb3VudCAvIHBhZ2VTaXplKTtcclxuXHJcbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICByZXN1bHRzOiBmaWx0ZXJlZExpc3QsXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgLy8gY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxyXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcclxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxyXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnRXZWIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZCwgcGFnZSA9IDEsIHBhZ2VTaXplID0gMTIgfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gcGFyc2VJbnQocGFnZSk7XHJcbiAgICAgIGNvbnN0IHNpemUgPSBwYXJzZUludChwYWdlU2l6ZSk7XHJcblxyXG4gICAgICBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSB7fTtcclxuICAgICAgaWYgKGNhdGVnb3J5SWQpIHdoZXJlQ29uZGl0aW9ucy5jYXRlZ29yeUlkID0gY2F0ZWdvcnlJZDtcclxuICAgICAgaWYgKHN1YkNhdGVnb3J5SWQpIHdoZXJlQ29uZGl0aW9ucy5zdWJDYXRlZ29yeUlkID0gc3ViQ2F0ZWdvcnlJZDtcclxuICAgICAgLy8gxJDhur9tIHPhu5EgbMaw4bujbmcgYuG6o24gZ2hpXHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZGIucHJvZHVjdC5jb3VudCh7XHJcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBM4bqleSBkYW5oIHPDoWNoIGLhuqNuIGdoaSB24bubaSBwaMOibiB0cmFuZ1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXHJcbiAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAgICAgXCJkZXNjXCIsXHJcbiAgICAgICAgICAgIFwic2x1Z1wiLFxyXG4gICAgICAgICAgICBcInVwZGF0ZWRBdFwiLFxyXG4gICAgICAgICAgICBcInBob25lTnVtYmVyXCIsXHJcbiAgICAgICAgICAgIFwiYXV0aG9yX3Bob25lXCIsXHJcbiAgICAgICAgICAgIFwic29ydERlc2NcIixcclxuICAgICAgICAgICAgXCJpbnRlcmlvclwiLFxyXG4gICAgICAgICAgICBcIm5vdGVcIixcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW1pdDogc2l6ZSxcclxuICAgICAgICBvZmZzZXQ6IChjdXJyZW50UGFnZSAtIDEpICogc2l6ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBUw61uaCB0b8OhbiB04buVbmcgc+G7kSB0cmFuZyBk4buxYSB0csOqbiBz4buRIGzGsOG7o25nIGThu68gbGnhu4d1IHbDoCBrw61jaCB0aMaw4bubYyB0cmFuZ1xyXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gc2l6ZSk7XHJcblxyXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgcmVzdWx0czogZmlsdGVyZWRMaXN0LFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSxcclxuICAgICAgICAgIHBhZ2VTaXplOiBzaXplLFxyXG4gICAgICAgICAgdG90YWxJdGVtczogY291bnQsXHJcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xyXG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgbGV0IHtcclxuICAgICAgc2VhcmNoVGV4dCA9IFwiXCIsXHJcbiAgICAgIGlkLFxyXG4gICAgICBzdWJpZCxcclxuICAgICAgcGFnZSA9IDEsXHJcbiAgICAgIHBhZ2VTaXplID0gMTAsXHJcbiAgICAgIHR5cGVSb29tLFxyXG4gICAgICByZW50LFxyXG4gICAgICBzcXVhcmUsXHJcbiAgICAgIHByaWNlLFxyXG4gICAgICBwcm92aW5jZSxcclxuICAgICAgZGlzdHJpY3QsXHJcbiAgICAgIHdhcmQsXHJcbiAgICAgIHN0YXIsXHJcbiAgICAgIHJlc2V0LFxyXG4gICAgfSA9IHJlcS5xdWVyeTtcclxuICAgIGlmICh0eXBlUm9vbSA9PSAwKSB7XHJcbiAgICAgIHR5cGVSb29tID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHNxdWFyZSA9PSAwKSB7XHJcbiAgICAgIHNxdWFyZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChwcmljZSA9PSAwKSB7XHJcbiAgICAgIHByaWNlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlbnQgPT0gLTEpIHtcclxuICAgICAgcmVudCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChwcm92aW5jZSA9PSAtMSkge1xyXG4gICAgICBwcm92aW5jZSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChkaXN0cmljdCA9PSAtMSkge1xyXG4gICAgICBkaXN0cmljdCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmICh3YXJkID09IC0xKSB7XHJcbiAgICAgIHdhcmQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBsZXQgc2VhcmNoVGV4dFZhbGlkO1xyXG4gICAgaWYgKHNlYXJjaFRleHQgPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXh0ID09IG51bGwpIHtcclxuICAgICAgc2VhcmNoVGV4dFZhbGlkID0gXCJcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlYXJjaFRleHRWYWxpZCA9IHNlYXJjaFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xyXG4gICAgICBjYXRlZ29yeUlkOiBpZCxcclxuICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViaWQsXHJcbiAgICAgIFtPcC5vcl06IFtcclxuICAgICAgICB7IHByb2R1Y3RfaWQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXHJcbiAgICAgICAgeyBuYW1lOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxyXG4gICAgICAgIHsgYWRkcmVzczogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcclxuICAgICAgICB7IHdhcmRUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxyXG4gICAgICAgIHsgZGlzdHJpY3RUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxyXG4gICAgICAgIHsgcHJvdmluY2VUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxyXG4gICAgICAgIHsgcHJpY2U6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdXBkYXRlZEF0OiB7XHJcbiAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dFZhbGlkLCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY3JlYXRlZEF0OiB7XHJcbiAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dFZhbGlkLCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcclxuICAgICAgXSxcclxuICAgIH07XHJcbiAgICBpZiAoaWQgPT0gMTMpIHtcclxuICAgICAgaWYgKHR5cGVSb29tKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnR5cGVSb29tID0gdHlwZVJvb207XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZW50ICE9PSB1bmRlZmluZWQgJiYgcmVudC50b1N0cmluZygpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHJlbnQpKSB7XHJcbiAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0geyBbT3Aub3JdOiBbMCwgZmFsc2VdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IHsgW09wLm9yXTogWzEsIHRydWVdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNxdWFyZSkge1xyXG4gICAgICAgIHN3aXRjaCAocGFyc2VJbnQoc3F1YXJlKSkge1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuYmV0d2Vlbl06IFswLCAyMF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5iZXR3ZWVuXTogWzIwLCA0MF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5ndGVdOiA0MCB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgIHN3aXRjaCAocGFyc2VJbnQocHJpY2UpKSB7XHJcbiAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbMCwgMTAwMDAwMF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbMTAwMDAwMCwgMzAwMDAwMF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbMzAwMDAwMCwgNTAwMDAwMF0gfTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmJldHdlZW5dOiBbNTAwMDAwMCwgMTAwMDAwMDBdIH07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5ndGVdOiAxMDAwMDAwMCB9O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm92aW5jZSkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlzdHJpY3QpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHdhcmQpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoaWQgPT0gMTIpIHtcclxuICAgICAgaWYgKHR5cGVSb29tKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnR5cGVSb29tID0gdHlwZVJvb207XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzdGFyKSB7XHJcbiAgICAgICAgd2hlcmVDb25kaXRpb25zLnJhdGluZyA9IHN0YXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm92aW5jZSkge1xyXG4gICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlzdHJpY3QpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHdhcmQpIHtcclxuICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBUaOG7sWMgaGnhu4duIHRydXkgduG6pW4gZOG7ryBsaeG7h3UgduG7m2kgU2VxdWVsaXplXHJcbiAgICAgIGNvbnN0IHsgY291bnQsIHJvd3M6IGZpbHRlcmVkTGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXHJcbiAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXJfbWFuYWdlcl9wcm9kdWN0LFxyXG4gICAgICAgICAgICAvLyBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxyXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XHJcblxyXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgZGF0YTogZmlsdGVyZWRMaXN0LFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcclxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXHJcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcclxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XHJcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUZpbHRlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHtcclxuICAgICAgICBpZCxcclxuICAgICAgICBzdWJpZCxcclxuICAgICAgICB0eXBlUm9vbSxcclxuICAgICAgICByZW50LFxyXG4gICAgICAgIHNxdWFyZSxcclxuICAgICAgICBwcmljZSxcclxuICAgICAgICBwcm92aW5jZSxcclxuICAgICAgICBkaXN0cmljdCxcclxuICAgICAgICB3YXJkLFxyXG4gICAgICAgIHN0YXIsXHJcbiAgICAgICAgcGFnZVNpemUgPSAxMCxcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIHNlYXJjaFRleHQgPSBcIlwiLFxyXG4gICAgICAgIHVzZXJJZFxyXG4gICAgICAgIC8vIHJlbnRcclxuICAgICAgfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgICAgIGlmICh0eXBlUm9vbSA9PSAwKSB7XHJcbiAgICAgICAgdHlwZVJvb20gPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNxdWFyZSA9PSAwKSB7XHJcbiAgICAgICAgc3F1YXJlID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcmljZSA9PSAwKSB7XHJcbiAgICAgICAgcHJpY2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlbnQgPT0gLTEpIHtcclxuICAgICAgICByZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwcm92aW5jZSA9PSAtMSkge1xyXG4gICAgICAgIHByb3ZpbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkaXN0cmljdCA9PSAtMSkge1xyXG4gICAgICAgIGRpc3RyaWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh3YXJkID09IC0xKSB7XHJcbiAgICAgICAgd2FyZCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xyXG4gICAgICAgIGNhdGVnb3J5SWQ6IHBhcnNlSW50KGlkKSxcclxuICAgICAgICBzdWJDYXRlZ29yeUlkOiBwYXJzZUludChzdWJpZCksXHJcbiAgICAgICAgW09wLm9yXTogW1xyXG4gICAgICAgICAgeyBwcm9kdWN0X2lkOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICAgIHsgbmFtZTogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgICB7IGFkZHJlc3M6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxyXG4gICAgICAgICAgeyB3YXJkVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgICB7IGRpc3RyaWN0VGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgICB7IHByb3ZpbmNlVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXHJcbiAgICAgICAgICB7IHByaWNlOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXBkYXRlZEF0OiB7XHJcbiAgICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IHtcclxuICAgICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyB7IFwiJHVzZXIuZmlyc3ROYW1lJFwiOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoaWQgPT0gMTMpIHtcclxuICAgICAgICBpZiAodHlwZVJvb20pIHtcclxuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlUm9vbSA9IHR5cGVSb29tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc3dpdGNoIChwYXJzZUludChyZW50KSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSAwO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSAxO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSAyO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNxdWFyZSkge1xyXG4gICAgICAgICAgc3dpdGNoIChwYXJzZUludChzcXVhcmUpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0gU2VxdWVsaXplLmxpdGVyYWwoXHJcbiAgICAgICAgICAgICAgICBcIkNBU1Qoc3F1YXJlIEFTIElOVCkgQkVUV0VFTiAwIEFORCAyMFwiXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5iZXR3ZWVuXTogWzIwLCA0MF0gfTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5ndGVdOiA0MCB9O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHByaWNlKSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFswLCAxMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFsxMDAwMDAwLCAzMDAwMDAwXSB9O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFszMDAwMDAwLCA1MDAwMDAwXSB9O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFs1MDAwMDAwLCAxMDAwMDAwMF0gfTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmd0ZV06IDEwMDAwMDAwIH07XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvdmluY2UpIHtcclxuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRpc3RyaWN0KSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3YXJkKSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGlkID09IDEyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVSb29tKSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGFyKSB7XHJcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmF0aW5nID0gc3RhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm92aW5jZSkge1xyXG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGlzdHJpY3QpIHtcclxuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdhcmQpIHtcclxuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3ViV2hlcmU9IHt9XHJcbiAgICAgIGNvbnN0IGZpbHRlcj0ge31cclxuICAgICAgaWYodXNlcklkKSB7XHJcbiAgICAgICAgc3ViV2hlcmUuaWQ9IHVzZXJJZFxyXG4gICAgICAgIGZpbHRlci5ib29sZWFuPSB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyLmJvb2xlYW49IGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgICBsZXQgeyBjb3VudCwgcm93czogcHJvZHVjdExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXHJcbiAgICAgICAgICBvcmRlcjogW1tcImlkXCIsIFwiREVTQ1wiXV0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyX21hbmFnZXJfcHJvZHVjdCxcclxuICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcclxuICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZpbHRlci5ib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICBhczogXCJtYW5hZ2VyVXNlclwiLCBcclxuICAgICAgICAgICAgICAgICAgd2hlcmU6IHN1YldoZXJlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiZGVzY1wiXSB9LFxyXG4gICAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxyXG4gICAgICAgICAgb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdExpc3QpXHJcbiAgICAgIC8vIGlmKHVzZXJJZCkge1xyXG4gICAgICAvLyAgIHByb2R1Y3RMaXN0PSBwcm9kdWN0TGlzdD8uZmlsdGVyKGl0ZW09PiBpdGVtPy51c2VyX21hbmFnZXJfcHJvZHVjdHM/LmZpbHRlcihpdGVtMj0+IGl0ZW0yPy51c2VyTWFuYWdlcj8uaWQ9PSB1c2VySWQpPy5sZW5ndGggPiAwKVxyXG4gICAgICAvLyAgIC8vIGNvdW50PSBwcm9kdWN0TGlzdC5sZW5ndGhcclxuICAgICAgLy8gfVxyXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgZGF0YTogcHJvZHVjdExpc3QsXHJcbiAgICAgICAgZmlsdGVyTWFuYWdlcjogdXNlcklkID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcclxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXHJcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcclxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7b2s6IGZhbHNlfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0SG90ZWwocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTIsXHJcbiAgICAgICAgICAgIC8vIHN1YkNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5zdWJDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxyXG4gICAgICAgICAgYXR0cmlidXRlczogeyBleGNsdWRlOiBbXCJkZXNjXCJdIH0sXHJcbiAgICAgICAgICBsaW1pdDogNCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxyXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgZXhjbHVkZTogW1wiZGVzY1wiXSB9LFxyXG4gICAgICAgICAgbGltaXQ6IDQsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdDIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgZW5kb3c6IDEsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXHJcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGV4Y2x1ZGU6IFtcImRlc2NcIl0gfSxcclxuICAgICAgICAgIGxpbWl0OiA0LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kT25lKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogW2xpc3RdIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0VXNlck1hbmFnZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyB1aWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IGRiLnVzZXJfbWFuYWdlcl9wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICB1c2VyX21hbmFnZXI6IHVpZCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgLy8gY29uc29sZS5sb2cocm93cylcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcm93cywgb2s6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNpemUgPSBhd2FpdCBkYi5wcm9kdWN0c2l6ZS5maW5kQWxsKHtcclxuICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHJlcS5xdWVyeS5pZCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgZGIucHJvZHVjdFxyXG4gICAgICAgIC5maW5kT25lKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxyXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QsIGRhdGFzaXplOiBzaXplIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBhZGRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkLCBxdHksIGRpc2NvdW50X3BlciwgZGlzY291bnRfcHJpY2UsIHRvdGFsLCBuZXRfcHJpY2UgfSA9XHJcbiAgICAgICAgcmVxLmJvZHk7XHJcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXHJcbiAgICAgICAgICAgICAgaW1hZ2U6IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBcIlwiLFxyXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxyXG4gICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxyXG4gICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcclxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXHJcbiAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci51cGRhdGUoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXHJcbiAgICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcclxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcclxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcclxuICAgICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwKSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcclxuICAgICAgICAgICAgICBcImlkXCIsXHJcbiAgICAgICAgICAgICAgXCJjYXRlZ29yeUlkXCIsXHJcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxyXG4gICAgICAgICAgICAgIFwiaXRlbV9uYW1lXCIsXHJcbiAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHNlYXJjaFByb2R1Y3RCeVN1YkNhdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5LnN1YkNhdCB9LFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiBkYXRhLmlkIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIucHJvZHVjdFxyXG4gICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYXN5bmMgcHJvZHVjdERlbGV0ZUJ1bGsocmVxLCByZXMsIG5leHQpIHtcclxuICAgIGRiLnByb2R1Y3RcclxuICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkubGlzdCB9IH0pXHJcbiAgICAgIC50aGVuKChyZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgICAgLmpzb24oeyBvazogdHJ1ZSwgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGFzeW5jIHByb2R1Y3RPZmZlckRlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChyZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG5cclxuICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICBsZXQgYXR0YWNobWVudEVudHJpZXMgPSBbXTtcclxuICAgIHZhciBwcm9kdWN0SWQgPSByZXEuYm9keS5wcm9kdWN0SWQ7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhdHRhY2htZW50RW50cmllcy5wdXNoKHtcclxuICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICBuYW1lOiByZXEuZmlsZXNbaV0uZmlsZW5hbWUsXHJcbiAgICAgICAgbWltZTogcmVxLmZpbGVzW2ldLm1pbWV0eXBlLFxyXG4gICAgICAgIGltZ1VybDogcmVxLmZpbGVzW2ldLnBhdGgsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRiLnByb2R1Y3RcclxuICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcclxuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICAgIC8vICAgICBwcm9kdWN0TmFtZTogci5pdGVtX25hbWUsXHJcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxyXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcS5maWxlcywgb2s6IHRydWUgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcnM6IFtcIkVycm9yIGluc2VydCBwaG90b1wiXSB9KTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCIsIFwiYnJhbmRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgLy9BbGwgR3JvY2VyeVN0YW1wbGUgcHJvZHVjdFxyXG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XHJcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgLy8gYXR0cmlidXRlczogW1wiaWRcIiwgXCJzbHVnXCJdLFxyXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcclxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgIGxpbWl0OiA4LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB8fCBbXSB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLmNhdGVnb3J5XHJcbiAgICAgICAgLmZpbmRPbmUoe1xyXG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXHJcbiAgICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBmaWx0ZXIgcHJvZHVjdFxyXG5cclxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XHJcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XHJcbiAgICAgICAgc2VhcmNoID0gXCIlXCIgKyByZXEucXVlcnkuc2VhcmNoICsgXCIlXCI7XHJcbiAgICAgIH1cclxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XHJcbiAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxyXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICBbT3Aub3JdOiBbXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcclxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBuZXh0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXHJcbiAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXHJcbiAgYXN5bmMgYXdzUHJvZHVjdFBob3RvRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAvLyBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7d2hlcmU6IHtpbWdVcmwsIGlkfX0pXHJcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxyXG5cclxuICAgICAgZGIucHJvZHVjdHBob3RvXHJcbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxyXG5cclxuICAgICAgICAudGhlbigoc3VjY2VzcykgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtc2c6IFwiU3VjY2Vzc2ZsbHkgZGVsZXRlZCBpbWFnZSBmcm9tIHMzIEJ1Y2tldFwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgbmV4dChlcnIpO1xyXG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFzeW5jIGdldFByb2R1Y3RTdWJDaGlsZENhdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICBkYi5wcm9kdWN0XHJcbiAgICAgICAgLmZpbmRBbGwoe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XHJcbiAgICAgIGRiLnByb2R1Y3RcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXHJcbiAgICAgICAgICBvcmRlcjogU2VxdWVsaXplLmxpdGVyYWwoXCJSQU5EKClcIiksXHJcbiAgICAgICAgICBsaW1pdDogOCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIC8vIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgJ3N1Y2Nlc3MnOmZhbHNlLCBtc2c6IGVycn0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyBnZXRTaXplUHJvZHVjdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgZGIucHJvZHVjdHNpemVcclxuICAgICAgICAuZmluZEFsbCh7XHJcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBuZXh0KGVycik7XHJcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXN5bmMgZ2V0SGlzdG9yeUVkaXRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHByb2R1Y3RfaWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IGRiLmhpc3RvcnlfZWRpdF9wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICBwcm9kdWN0X2lkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3JkZXI6IFtbXCJ0aW1lX3VwZGF0ZWRcIiwgXCJERVNDXCJdXSxcclxuICAgICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogcm93cywgb2s6IHRydWUgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG9rOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIGdldFByb2R1Y3RNYW5hZ2VCeVVzZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJvd3MgPSBhd2FpdCBkYi51c2VyX21hbmFnZXJfcHJvZHVjdC5maW5kQWxsKHtcclxuICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxyXG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcInByb2R1Y3RfaWRcIiwgXCJ1c2VyX21hbmFnZXJcIiwgXCJ1c2VyX293bmVyXCJdLFxyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBhczogXCJtYW5hZ2VyVXNlclwiLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCIsIFwiYWRkcmVzc1wiLCBcImVtYWlsXCJdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFzOiBcInByb2R1Y3RcIixcclxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHJvd3MsIG9rOiB0cnVlIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBvazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFFQSxJQUFBQyxPQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFBNEIsU0FBQUcsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3QkFBQSxDQUFBUixNQUFBLEVBQUFPLEdBQUEsRUFBQUUsVUFBQSxPQUFBUCxJQUFBLENBQUFRLElBQUEsQ0FBQUMsS0FBQSxDQUFBVCxJQUFBLEVBQUFHLE9BQUEsWUFBQUgsSUFBQTtBQUFBLFNBQUFVLGNBQUFDLE1BQUEsYUFBQUMsQ0FBQSxNQUFBQSxDQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRixDQUFBLFVBQUFHLE1BQUEsV0FBQUYsU0FBQSxDQUFBRCxDQUFBLElBQUFDLFNBQUEsQ0FBQUQsQ0FBQSxRQUFBQSxDQUFBLE9BQUFmLE9B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