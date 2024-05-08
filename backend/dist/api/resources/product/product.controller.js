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
      var _req$body, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, sortDesc, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, image, size, newaddimage, phoneNumber, province, district, ward, square, provinceText, districtText, wardText, budget, typeRoom, interior, endow, rating, note, user_manager, author_phone, address, product_id, rent;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, categoryId = _req$body.categoryId, subCategoryId = _req$body.subCategoryId, childCategoryId = _req$body.childCategoryId, name = _req$body.name, slug = _req$body.slug, brand = _req$body.brand, status = _req$body.status, unitSize = _req$body.unitSize, sortDesc = _req$body.sortDesc, desc = _req$body.desc, buyerPrice = _req$body.buyerPrice, price = _req$body.price, qty = _req$body.qty, discount = _req$body.discount, discountPer = _req$body.discountPer, total = _req$body.total, netPrice = _req$body.netPrice, image = _req$body.image, size = _req$body.size, newaddimage = _req$body.newaddimage, phoneNumber = _req$body.phoneNumber, province = _req$body.province, district = _req$body.district, ward = _req$body.ward, square = _req$body.square, provinceText = _req$body.provinceText, districtText = _req$body.districtText, wardText = _req$body.wardText, budget = _req$body.budget, typeRoom = _req$body.typeRoom, interior = _req$body.interior, endow = _req$body.endow, rating = _req$body.rating, note = _req$body.note, user_manager = _req$body.user_manager, author_phone = _req$body.author_phone, address = _req$body.address, product_id = _req$body.product_id, rent = _req$body.rent;
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
              product_id: product_id ? product_id : "",
              rent: rent ? rent : 0
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
  getAllProductCategory: function getAllProductCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$query, searchText, id, subid, _req$query$page, page, _req$query$pageSize, pageSize, whereConditions, _yield$db$product$fin, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$query = req.query, searchText = _req$query.searchText, id = _req$query.id, subid = _req$query.subid, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === void 0 ? 10 : _req$query$pageSize;
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
            }, {
              "$user.firstName$": (0, _defineProperty2["default"])({}, Op.substring, searchText)
            }]);
            _context3.prev = 2;
            _context3.next = 5;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }],
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 5:
            _yield$db$product$fin = _context3.sent;
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
            _context3.next = 16;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](2);
            console.error("Error searching products:", _context3.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[2, 12]]);
    }))();
  },
  index: function index(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$query2, supplierId, categoryId, subCategoryId;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$query2 = req.query, supplierId = _req$query2.supplierId, categoryId = _req$query2.categoryId, subCategoryId = _req$query2.subCategoryId;
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
            _context4.next = 8;
            break;
          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 5]]);
    }))();
  },
  getAllProductList: function getAllProductList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
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
            _context5.next = 7;
            break;
          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 4]]);
    }))();
  },
  update: function update(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var _req$body2, productId, categoryId, subCategoryId, childCategoryId, name, slug, brand, status, unitSize, desc, buyerPrice, price, qty, discount, discountPer, total, netPrice, images, size, newaddimage, phoneNumber, typeRoom, interior, square, endow, rating, note, user_manager, rent, author_phone, address, photo, province, district, ward, product_id, provinceText, districtText, wardText;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$body2 = req.body, productId = _req$body2.productId, categoryId = _req$body2.categoryId, subCategoryId = _req$body2.subCategoryId, childCategoryId = _req$body2.childCategoryId, name = _req$body2.name, slug = _req$body2.slug, brand = _req$body2.brand, status = _req$body2.status, unitSize = _req$body2.unitSize, desc = _req$body2.desc, buyerPrice = _req$body2.buyerPrice, price = _req$body2.price, qty = _req$body2.qty, discount = _req$body2.discount, discountPer = _req$body2.discountPer, total = _req$body2.total, netPrice = _req$body2.netPrice, images = _req$body2.images, size = _req$body2.size, newaddimage = _req$body2.newaddimage, phoneNumber = _req$body2.phoneNumber, typeRoom = _req$body2.typeRoom, interior = _req$body2.interior, square = _req$body2.square, endow = _req$body2.endow, rating = _req$body2.rating, note = _req$body2.note, user_manager = _req$body2.user_manager, rent = _req$body2.rent, author_phone = _req$body2.author_phone, address = _req$body2.address, photo = _req$body2.photo, province = _req$body2.province, district = _req$body2.district, ward = _req$body2.ward, product_id = _req$body2.product_id, provinceText = _req$body2.provinceText, districtText = _req$body2.districtText, wardText = _req$body2.wardText;
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
                  product_id: product_id ? product_id : "",
                  provinceText: provinceText ? provinceText : "",
                  districtText: districtText ? districtText : "",
                  wardText: wardText ? wardText : ""
                }, {
                  where: {
                    id: productId
                  }
                });
              }
              throw new RequestError("Not Found Product", 409);
            }).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(p) {
                var _JSON$parse4;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
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
                        _models.db.productsize.bulkCreate(JSON.parse(size).map(function (_ref2) {
                          var size = _ref2.size,
                            amount = _ref2.amount;
                          return {
                            size: size,
                            amount: amount,
                            productId: productId
                          };
                        }));
                      }
                      if (!images) {
                        _context6.next = 6;
                        break;
                      }
                      _context6.next = 5;
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
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (err) {
              next(err);
            });
            _context7.next = 8;
            break;
          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 5]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var _req$query3, searchText, id, subid, _req$query3$page, page, _req$query3$pageSize, pageSize, searchTextValid, whereConditions, _yield$db$product$fin2, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _req$query3 = req.query, searchText = _req$query3.searchText, id = _req$query3.id, subid = _req$query3.subid, _req$query3$page = _req$query3.page, page = _req$query3$page === void 0 ? 1 : _req$query3$page, _req$query3$pageSize = _req$query3.pageSize, pageSize = _req$query3$pageSize === void 0 ? 10 : _req$query3$pageSize;
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
            _context8.prev = 3;
            _context8.next = 6;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }],
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 6:
            _yield$db$product$fin2 = _context8.sent;
            count = _yield$db$product$fin2.count;
            filteredList = _yield$db$product$fin2.rows;
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
            _context8.next = 17;
            break;
          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](3);
            console.error("Error searching products:", _context8.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 17:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[3, 13]]);
    }))();
  },
  getProductListByFilter: function getProductListByFilter(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$query4, id, subid, typeRoom, rent, square, price, province, district, ward, star, _req$query4$pageSize, pageSize, page, whereConditions, _yield$db$product$fin3, count, productList, totalPages;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _req$query4 = req.query, id = _req$query4.id, subid = _req$query4.subid, typeRoom = _req$query4.typeRoom, rent = _req$query4.rent, square = _req$query4.square, price = _req$query4.price, province = _req$query4.province, district = _req$query4.district, ward = _req$query4.ward, star = _req$query4.star, _req$query4$pageSize = _req$query4.pageSize, pageSize = _req$query4$pageSize === void 0 ? 10 : _req$query4$pageSize, page = _req$query4.page;
            whereConditions = {
              categoryId: id,
              subCategoryId: subid
            };
            if (!(id == 13)) {
              _context9.next = 44;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined && rent.toString().length > 0)) {
              _context9.next = 15;
              break;
            }
            _context9.t0 = parseInt(rent);
            _context9.next = _context9.t0 === 0 ? 9 : _context9.t0 === 1 ? 11 : _context9.t0 === 2 ? 13 : 15;
            break;
          case 9:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [0, false]);
            return _context9.abrupt("break", 15);
          case 11:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [1, true]);
            return _context9.abrupt("break", 15);
          case 13:
            whereConditions.rent = 2;
            return _context9.abrupt("break", 15);
          case 15:
            if (!square) {
              _context9.next = 25;
              break;
            }
            _context9.t1 = parseInt(square);
            _context9.next = _context9.t1 === 1 ? 19 : _context9.t1 === 2 ? 21 : _context9.t1 === 3 ? 23 : 25;
            break;
          case 19:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [0, 20]);
            return _context9.abrupt("break", 25);
          case 21:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context9.abrupt("break", 25);
          case 23:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context9.abrupt("break", 25);
          case 25:
            if (!price) {
              _context9.next = 39;
              break;
            }
            _context9.t2 = parseInt(price);
            _context9.next = _context9.t2 === 1 ? 29 : _context9.t2 === 2 ? 31 : _context9.t2 === 3 ? 33 : _context9.t2 === 4 ? 35 : _context9.t2 === 5 ? 37 : 39;
            break;
          case 29:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context9.abrupt("break", 39);
          case 31:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context9.abrupt("break", 39);
          case 33:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context9.abrupt("break", 39);
          case 35:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context9.abrupt("break", 39);
          case 37:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context9.abrupt("break", 39);
          case 39:
            if (province) {
              whereConditions.province = province;
            }
            if (district) {
              whereConditions.district = district;
            }
            if (ward) {
              whereConditions.ward = ward;
            }
            _context9.next = 45;
            break;
          case 44:
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
          case 45:
            if (id == 12) {
              if (typeRoom) {
                whereConditions.typeRoom = typeRoom;
              }
              if (star) {
                whereConditions.star = star;
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
            _context9.next = 48;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"],
                required: false
              }],
              limit: pageSize,
              offset: (page - 1) * pageSize
            });
          case 48:
            _yield$db$product$fin3 = _context9.sent;
            count = _yield$db$product$fin3.count;
            productList = _yield$db$product$fin3.rows;
            totalPages = Math.ceil(count / pageSize);
            return _context9.abrupt("return", res.status(200).json({
              success: true,
              data: productList,
              pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalItems: count,
                totalPages: totalPages
              }
            }));
          case 55:
            _context9.prev = 55;
            _context9.t3 = _context9["catch"](0);
            console.log(_context9.t3);
            throw new RequestError("Error");
          case 59:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 55]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
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
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
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
            _context11.next = 7;
            break;
          case 4:
            _context11.prev = 4;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 4]]);
    }))();
  },
  getProductSuggest2: function getProductSuggest2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
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
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var size;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context14.sent;
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
            _context14.next = 10;
            break;
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
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
            _context15.next = 8;
            break;
          case 5:
            _context15.prev = 5;
            _context15.t0 = _context15["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
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
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
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
            return _context18.stop();
        }
      }, _callee18);
    }))();
  },
  productDeleteBulk: function productDeleteBulk(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
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
            return _context19.stop();
        }
      }, _callee19);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
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
            return _context20.stop();
        }
      }, _callee20);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
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
            return _context21.stop();
        }
      }, _callee21);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
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
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
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
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
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
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
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
            _context25.next = 7;
            break;
          case 4:
            _context25.prev = 4;
            _context25.t0 = _context25["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context25.stop();
        }
      }, _callee25, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var search;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
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
            _context26.next = 9;
            break;
          case 6:
            _context26.prev = 6;
            _context26.t0 = _context26["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context26.stop();
        }
      }, _callee26, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
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
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
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
            return _context28.stop();
        }
      }, _callee28);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
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
            return _context29.stop();
        }
      }, _callee29);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
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
            return _context30.stop();
        }
      }, _callee30);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      var productId;
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
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
            return _context31.stop();
        }
      }, _callee31);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9tb21lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVxdWlyZSIsIk9wIiwiU2VxdWVsaXplIiwiX2RlZmF1bHQiLCJnZXRQaG90b1Byb2R1Y3QiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInByb2R1Y3RJZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJxdWVyeSIsImRiIiwicHJvZHVjdHBob3RvIiwiZmluZEFsbCIsIndoZXJlIiwidGhlbiIsInByb2R1Y3QiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImFkZFByb2R1Y3QiLCJfY2FsbGVlMiIsIl9yZXEkYm9keSIsImNhdGVnb3J5SWQiLCJzdWJDYXRlZ29yeUlkIiwiY2hpbGRDYXRlZ29yeUlkIiwibmFtZSIsInNsdWciLCJicmFuZCIsInVuaXRTaXplIiwic29ydERlc2MiLCJkZXNjIiwiYnV5ZXJQcmljZSIsInByaWNlIiwicXR5IiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsInRvdGFsIiwibmV0UHJpY2UiLCJpbWFnZSIsInNpemUiLCJuZXdhZGRpbWFnZSIsInBob25lTnVtYmVyIiwicHJvdmluY2UiLCJkaXN0cmljdCIsIndhcmQiLCJzcXVhcmUiLCJwcm92aW5jZVRleHQiLCJkaXN0cmljdFRleHQiLCJ3YXJkVGV4dCIsImJ1ZGdldCIsInR5cGVSb29tIiwiaW50ZXJpb3IiLCJlbmRvdyIsInJhdGluZyIsIm5vdGUiLCJ1c2VyX21hbmFnZXIiLCJhdXRob3JfcGhvbmUiLCJhZGRyZXNzIiwicHJvZHVjdF9pZCIsInJlbnQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJnZXRBbGxQcm9kdWN0Q2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzZWFyY2hUZXh0Iiwic3ViaWQiLCJfcmVxJHF1ZXJ5JHBhZ2UiLCJwYWdlIiwiX3JlcSRxdWVyeSRwYWdlU2l6ZSIsInBhZ2VTaXplIiwid2hlcmVDb25kaXRpb25zIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluIiwiY291bnQiLCJmaWx0ZXJlZExpc3QiLCJ0b3RhbFBhZ2VzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3IiLCJzdWJzdHJpbmciLCJ1cGRhdGVkQXQiLCJtb21lbnQiLCJjcmVhdGVkQXQiLCJmaW5kQW5kQ291bnRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJ1c2VyIiwiYXR0cmlidXRlcyIsImxpbWl0Iiwib2Zmc2V0Iiwic2VudCIsInJvd3MiLCJNYXRoIiwiY2VpbCIsInBhZ2luYXRpb24iLCJjdXJyZW50UGFnZSIsInRvdGFsSXRlbXMiLCJlcnJvciIsImluZGV4IiwiX2NhbGxlZTQiLCJfcmVxJHF1ZXJ5MiIsInN1cHBsaWVySWQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJvcmRlciIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJTdWJDYXRlZ29yeSIsImNhdGVnb3J5IiwidXBkYXRlIiwiX2NhbGxlZTciLCJfcmVxJGJvZHkyIiwiaW1hZ2VzIiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZmluZE9uZSIsIl9yZWYiLCJfY2FsbGVlNiIsInAiLCJfSlNPTiRwYXJzZTQiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYyIiwiX3giLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlOCIsIl9yZXEkcXVlcnkzIiwiX3JlcSRxdWVyeTMkcGFnZSIsIl9yZXEkcXVlcnkzJHBhZ2VTaXplIiwic2VhcmNoVGV4dFZhbGlkIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluMiIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsInVuZGVmaW5lZCIsImdldFByb2R1Y3RMaXN0QnlGaWx0ZXIiLCJfY2FsbGVlOSIsIl9yZXEkcXVlcnk0Iiwic3RhciIsIl9yZXEkcXVlcnk0JHBhZ2VTaXplIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluMyIsInByb2R1Y3RMaXN0IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwidG9TdHJpbmciLCJ0MSIsImJldHdlZW4iLCJndGUiLCJ0MiIsInJlcXVpcmVkIiwidDMiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJsaXN0IiwiZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQiLCJfY2FsbGVlMTEiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsImdldFByb2R1Y3RTdWdnZXN0MiIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0UHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlMTQiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTE1IiwiX3JlcSRib2R5MyIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJQcm9kdWN0T2ZmZXIiLCJsb2NhdGlvbiIsImdldFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2Iiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0IiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJzdWJfbmFtZSIsInN1YkNhdCIsInN0cmluZ2lmeSIsInByb2R1Y3REZWxldGUiLCJfY2FsbGVlMTgiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsInJlIiwicHJvZHVjdERlbGV0ZUJ1bGsiLCJfY2FsbGVlMTkiLCJfY2FsbGVlMTkkIiwiX2NvbnRleHQxOSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUyMCIsIl9jYWxsZWUyMCQiLCJfY29udGV4dDIwIiwicGFyYW1zIiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUyMSIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTIyIiwiX2NhbGxlZTIyJCIsIl9jb250ZXh0MjIiLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUyMyIsIl9jYWxsZWUyMyQiLCJfY29udGV4dDIzIiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTI0IiwiX2NhbGxlZTI0JCIsIl9jb250ZXh0MjQiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTI1IiwiX2NhbGxlZTI1JCIsIl9jb250ZXh0MjUiLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMjYiLCJzZWFyY2giLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTI3IiwiX2NhbGxlZTI3JCIsIl9jb250ZXh0MjciLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTI4IiwiX3JlcSRib2R5NCIsIl9jYWxsZWUyOCQiLCJfY29udGV4dDI4IiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTI5IiwiX3JlcSRib2R5NSIsIl9jYWxsZWUyOSQiLCJfY29udGV4dDI5IiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMzAiLCJfY2FsbGVlMzAkIiwiX2NvbnRleHQzMCIsImxpdGVyYWwiLCJnZXRTaXplUHJvZHVjdCIsIl9jYWxsZWUzMSIsIl9jYWxsZWUzMSQiLCJfY29udGV4dDMxIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuY29uc3QgeyBPcCwgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG4vLyBpbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4uLy4uLy4uL2t1ZSc7XG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICBhc3luYyBnZXRQaG90b1Byb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgc29ydERlc2MsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgICBidWRnZXQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHByb2R1Y3RfaWQsXG4gICAgICAgIHJlbnQsXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5jcmVhdGUoe1xuICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB8fCAwLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgc29ydERlc2M6IHNvcnREZXNjLFxuICAgICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcbiAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxuICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcbiAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxuICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLnBhdGggOiBcIlwiLFxuICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2UsXG4gICAgICAgICAgZGlzdHJpY3Q6IGRpc3RyaWN0LFxuICAgICAgICAgIHdhcmQ6IHdhcmQsXG4gICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxuICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcbiAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXG4gICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxuICAgICAgICAgIGJ1ZGdldDogYnVkZ2V0ID8gYnVkZ2V0IDogMCxcbiAgICAgICAgICB0eXBlUm9vbTogdHlwZVJvb20gPyB0eXBlUm9vbSA6IFwiXCIsXG4gICAgICAgICAgaW50ZXJpb3I6IGludGVyaW9yID8gaW50ZXJpb3IgOiBcIlwiLFxuICAgICAgICAgIGVuZG93OiBlbmRvdyA/IGVuZG93IDogMCxcbiAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXG4gICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogXCJcIixcbiAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXG4gICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxuICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RfaWQgPyBwcm9kdWN0X2lkIDogXCJcIixcbiAgICAgICAgICByZW50OiByZW50ID8gcmVudCA6IDAsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgSlNPTi5wYXJzZShpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LnBhdGgsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHsgc2VhcmNoVGV4dCwgaWQsIHN1YmlkLCBwYWdlID0gMSwgcGFnZVNpemUgPSAxMCB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgY2F0ZWdvcnlJZDogaWQsXG4gICAgICBzdWJDYXRlZ29yeUlkOiBzdWJpZCxcbiAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgeyBwcm9kdWN0X2lkOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBuYW1lOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBhZGRyZXNzOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyB3YXJkVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXG4gICAgICAgIHsgZGlzdHJpY3RUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBwcm92aW5jZVRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7IHByaWNlOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAge1xuICAgICAgICAgIHVwZGF0ZWRBdDoge1xuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZWRBdDoge1xuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgLy8gVGjhu7FjIGhp4buHbiB0cnV5IHbhuqVuIGThu68gbGnhu4d1IHbhu5tpIFNlcXVlbGl6ZVxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogZmlsdGVyZWRMaXN0IH0gPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICBvZmZzZXQ6IChwYWdlIC0gMSkgKiBwYWdlU2l6ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUw61uaCB0b8OhbiB04buVbmcgc+G7kSB0cmFuZyBk4buxYSB0csOqbiBz4buRIGzGsOG7o25nIGThu68gbGnhu4d1IHbDoCBrw61jaCB0aMaw4bubYyB0cmFuZ1xuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChjb3VudCAvIHBhZ2VTaXplKTtcblxuICAgICAgLy8gVHLhuqMgduG7gSBr4bq/dCBxdeG6oyB24bubaSB0aMO0bmcgdGluIHBow6JuIHRyYW5nXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIGRhdGE6IGZpbHRlcmVkTGlzdCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcbiAgICAgICAgICBwYWdlU2l6ZTogcGFyc2VJbnQocGFnZVNpemUpLFxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XG4gICAgfVxuICB9LFxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlcyxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICByZW50LFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHBob3RvLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHByb2R1Y3RfaWQsXG4gICAgICAgIHByb3ZpbmNlVGV4dCxcbiAgICAgICAgZGlzdHJpY3RUZXh0LFxuICAgICAgICB3YXJkVGV4dCxcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCA/IGNhdGVnb3J5SWQgOiBwcm9kdWN0LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3Quc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5jaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICBwaG90bzogcGhvdG8sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxuICAgICAgICAgICAgICAgIGludGVyaW9yLFxuICAgICAgICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXG4gICAgICAgICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxuICAgICAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcmVudDogcmVudCA/IHJlbnQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJvdmluY2UsXG4gICAgICAgICAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgICAgICAgICAgd2FyZCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0X2lkID8gcHJvZHVjdF9pZCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcbiAgICAgICAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihhc3luYyAocCkgPT4ge1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSkubWFwKCh7IHNpemUsIGFtb3VudCB9KSA9PiAoe1xuICAgICAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW1hZ2VzKSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKGltYWdlcykubWFwKChpdGVtKSA9PiAoeyAuLi5pdGVtLCBwcm9kdWN0SWQgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVcGRhdGVkIFN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB7IHNlYXJjaFRleHQsIGlkLCBzdWJpZCwgcGFnZSA9IDEsIHBhZ2VTaXplID0gMTAgfSA9IHJlcS5xdWVyeTtcbiAgICBsZXQgc2VhcmNoVGV4dFZhbGlkXG4gICAgaWYoc2VhcmNoVGV4dD09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGV4dD09IG51bGwpIHtcbiAgICAgICAgc2VhcmNoVGV4dFZhbGlkPSBcIlwiXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZWFyY2hUZXh0VmFsaWQ9IHNlYXJjaFRleHRcbiAgICB9XG5cbiAgICBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICBjYXRlZ29yeUlkOiBpZCxcbiAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YmlkLFxuICAgICAgW09wLm9yXTogW1xuICAgICAgICB7IHByb2R1Y3RfaWQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgbmFtZTogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyBhZGRyZXNzOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IHdhcmRUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IGRpc3RyaWN0VGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyBwcm92aW5jZVRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgcHJpY2U6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHtcbiAgICAgICAgICB1cGRhdGVkQXQ6IHtcbiAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dFZhbGlkLCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZWRBdDoge1xuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0VmFsaWQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7IFwiJHVzZXIuZmlyc3ROYW1lJFwiOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgXSxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRo4buxYyBoaeG7h24gdHJ1eSB24bqlbiBk4buvIGxp4buHdSB24bubaSBTZXF1ZWxpemVcbiAgICAgIGNvbnN0IHsgY291bnQsIHJvd3M6IGZpbHRlcmVkTGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgICAgb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXG4gICAgICB9KTtcblxuICAgICAgLy8gVMOtbmggdG/DoW4gdOG7lW5nIHPhu5EgdHJhbmcgZOG7sWEgdHLDqm4gc+G7kSBsxrDhu6NuZyBk4buvIGxp4buHdSB2w6Aga8OtY2ggdGjGsOG7m2MgdHJhbmdcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XG5cbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkYXRhOiBmaWx0ZXJlZExpc3QsXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogcGFyc2VJbnQocGFnZSksXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUZpbHRlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGlkLFxuICAgICAgICBzdWJpZCxcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIHJlbnQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHByb3ZpbmNlLFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgc3RhcixcbiAgICAgICAgcGFnZVNpemUgPSAxMCxcbiAgICAgICAgcGFnZSxcbiAgICAgIH0gPSByZXEucXVlcnk7XG4gICAgICBsZXQgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgICBjYXRlZ29yeUlkOiBpZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViaWQsXG4gICAgICB9O1xuICAgICAgaWYgKGlkID09IDEzKSB7XG4gICAgICAgIGlmICh0eXBlUm9vbSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlUm9vbSA9IHR5cGVSb29tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbnQgIT09IHVuZGVmaW5lZCAmJiByZW50LnRvU3RyaW5nKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHN3aXRjaCAocGFyc2VJbnQocmVudCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJlbnQgPSB7IFtPcC5vcl06IFswLCBmYWxzZV0gfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0geyBbT3Aub3JdOiBbMSwgdHJ1ZV0gfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNxdWFyZSkge1xuICAgICAgICAgIHN3aXRjaCAocGFyc2VJbnQoc3F1YXJlKSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuYmV0d2Vlbl06IFswLCAyMF0gfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5iZXR3ZWVuXTogWzIwLCA0MF0gfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zcXVhcmUgPSB7IFtPcC5ndGVdOiA0MCB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2UpIHtcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHByaWNlKSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzAsIDEwMDAwMDBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzEwMDAwMDAsIDMwMDAwMDBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzMwMDAwMDAsIDUwMDAwMDBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJpY2UgPSB7IFtPcC5iZXR3ZWVuXTogWzUwMDAwMDAsIDEwMDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuZ3RlXTogMTAwMDAwMDAgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3ZpbmNlKSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByb3ZpbmNlID0gcHJvdmluY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3YXJkKSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlkID09IDEyKSB7XG4gICAgICAgIGlmICh0eXBlUm9vbSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlUm9vbSA9IHR5cGVSb29tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXIpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmF0aW5nID0gc3RhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc3RyaWN0KSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlkID09IDEyKSB7XG4gICAgICAgIGlmICh0eXBlUm9vbSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy50eXBlUm9vbSA9IHR5cGVSb29tO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFyKSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnN0YXIgPSBzdGFyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3YXJkKSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLndhcmQgPSB3YXJkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBwcm9kdWN0TGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgICAgb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBkYXRhOiBwcm9kdWN0TGlzdCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcbiAgICAgICAgICBwYWdlU2l6ZTogcGFyc2VJbnQocGFnZVNpemUpLFxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0SG90ZWwocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTIsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogMTMsXG4gICAgICAgICAgICAvLyBzdWJDYXRlZ29yeUlkOiByZXEucXVlcnkuc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGVuZG93OiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgbGltaXQ6IDQsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFdlYlByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzaXplID0gYXdhaXQgZGIucHJvZHVjdHNpemUuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICB9KTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCwgZGF0YXNpemU6IHNpemUgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHByb2R1Y3RJZCwgcXR5LCBkaXNjb3VudF9wZXIsIGRpc2NvdW50X3ByaWNlLCB0b3RhbCwgbmV0X3ByaWNlIH0gPVxuICAgICAgICByZXEuYm9keTtcbiAgICAgIGRiLlByb2R1Y3RPZmZlci5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5sb2NhdGlvbiA6IFwiXCIsXG4gICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICBkaXNjb3VudF9wZXI6IGRpc2NvdW50X3BlcixcbiAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgIG5ldF9wcmljZTogbmV0X3ByaWNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgICAgZGlzY291bnRfcHJpY2U6IGRpc2NvdW50X3ByaWNlLFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldFByb2R1Y3RPZmZlcihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZEFsbCh7XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgXCJpZFwiLFxuICAgICAgICAgICAgICBcImNhdGVnb3J5SWRcIixcbiAgICAgICAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICAgICAgICBcIml0ZW1fbmFtZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgIFwiYnJhbmRcIixcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgc2VhcmNoUHJvZHVjdEJ5U3ViQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkuc3ViQ2F0IH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogZGF0YS5pZCB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBwcm9kdWN0RGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcbiAgYXN5bmMgcHJvZHVjdERlbGV0ZUJ1bGsocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0XG4gICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEuYm9keS5saXN0IH0gfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgLmpzb24oeyBvazogdHJ1ZSwgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBwcm9kdWN0T2ZmZXJEZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucGFyYW1zLmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5Qcm9kdWN0T2ZmZXIuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIGFzeW5jIG11bHRpcGxlUGhvdG9VcGxvYWQocmVxLCByZXMsIG5leHQpIHtcbiAgICBsZXQgYXR0YWNobWVudEVudHJpZXMgPSBbXTtcbiAgICB2YXIgcHJvZHVjdElkID0gcmVxLmJvZHkucHJvZHVjdElkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRhY2htZW50RW50cmllcy5wdXNoKHtcbiAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgIG5hbWU6IHJlcS5maWxlc1tpXS5maWxlbmFtZSxcbiAgICAgICAgbWltZTogcmVxLmZpbGVzW2ldLm1pbWV0eXBlLFxuICAgICAgICBpbWdVcmw6IHJlcS5maWxlc1tpXS5wYXRoLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGIucHJvZHVjdFxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAvLyByZXR1cm4gcXVldWUuY3JlYXRlKCdpbWctdXBsb2FkJywge1xuICAgICAgICAgIC8vICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdE5hbWU6IHIuaXRlbV9uYW1lLFxuICAgICAgICAgIC8vICAgICBhdHRhY2htZW50RW50cmllczogYXR0YWNobWVudEVudHJpZXMsXG4gICAgICAgICAgLy8gfSkuc2F2ZSgpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVxLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHsgLi4uYXR0YWNobWVudEVudHJpZXNbaV0gfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEuZmlsZXMgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3JzOiBbXCJFcnJvciBpbnNlcnQgcGhvdG9cIl0gfSk7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBnZXRBbGxQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiLCBcImJyYW5kXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBkZWxldGVTbGlkZXJQaG90byhyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7IHdoZXJlOiB7IGlkOiByZXEucXVlcnkuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIC8vQWxsIEdyb2NlcnlTdGFtcGxlIHByb2R1Y3RcbiAgLy8gZWRpdCB0byBzYWxlIHByb2R1Y3RcbiAgYXN5bmMgZ2V0QWxsR3JvY2VycnlTdGFwbGVzKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIC8vIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic2x1Z1wiXSxcbiAgICAgICAgICAvLyB3aGVyZTogeyBkaXNjb3VudDogJ2dyb2Nlcnktc3RhcGxlJyB9LFxuICAgICAgICAgIG9yZGVyOiBbW1wiZGlzY291bnRQZXJcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfHwgW10gfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdEJ5U2x1ZyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5jYXRlZ29yeVxuICAgICAgICAuZmluZE9uZSh7XG4gICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIl0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gZmlsdGVyIHByb2R1Y3RcblxuICBhc3luYyBnZXRGaWx0ZXJieVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHNlYXJjaCA9IFwiJSVcIjtcbiAgICAgIGlmIChyZXEucXVlcnkuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaCA9IFwiJVwiICsgcmVxLnF1ZXJ5LnNlYXJjaCArIFwiJVwiO1xuICAgICAgfVxuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc2x1ZzogeyBbT3AubGlrZV06IHNlYXJjaCB9IH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIEdldEFsbEJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IHN1Yl9uYW1lOiByZXEuYm9keS5uYW1lIH0sXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSxcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LFxuICAgICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBhd3MgaW1hZ2UgZGVsZXRlXG4gIGFzeW5jIGF3c1Byb2R1Y3RQaG90b0RlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkLCBpbWdVcmwgfSA9IHJlcS5ib2R5O1xuICAgICAgLy8gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koe3doZXJlOiB7aW1nVXJsLCBpZH19KVxuICAgICAgLy8gZGVsZXRlRmlsZUZyb21TMyhpbWdVcmwpXG5cbiAgICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgICAuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG5cbiAgICAgICAgLnRoZW4oKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgbXNnOiBcIlN1Y2Nlc3NmbGx5IGRlbGV0ZWQgaW1hZ2UgZnJvbSBzMyBCdWNrZXRcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0U3ViQ2hpbGRDYXQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdFN1Z2dlc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgLy8gY29uc3R7IHN1YkNhdGVnb3J5SWQsIGNoaWxkQ2F0ZWdvcnlJZCB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFNlcXVlbGl6ZS5saXRlcmFsKFwiUkFORCgpXCIpLFxuICAgICAgICAgIGxpbWl0OiA4LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgICAvLyByZXMuc3RhdHVzKDUwMCkuanNvbih7ICdzdWNjZXNzJzpmYWxzZSwgbXNnOiBlcnJ9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0U2l6ZVByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RzaXplXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbXNnOiBlcnIgfSk7XG4gICAgfVxuICB9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUVBLElBQUFDLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUE0QixTQUFBRyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBQyxNQUFBLENBQUFELElBQUEsQ0FBQUYsTUFBQSxPQUFBRyxNQUFBLENBQUFDLHFCQUFBLFFBQUFDLE9BQUEsR0FBQUYsTUFBQSxDQUFBQyxxQkFBQSxDQUFBSixNQUFBLEdBQUFDLGNBQUEsS0FBQUksT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBSixNQUFBLENBQUFLLHdCQUFBLENBQUFSLE1BQUEsRUFBQU8sR0FBQSxFQUFBRSxVQUFBLE9BQUFQLElBQUEsQ0FBQVEsSUFBQSxDQUFBQyxLQUFBLENBQUFULElBQUEsRUFBQUcsT0FBQSxZQUFBSCxJQUFBO0FBQUEsU0FBQVUsY0FBQUMsTUFBQSxhQUFBQyxDQUFBLE1BQUFBLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFGLENBQUEsVUFBQUcsTUFBQSxXQUFBRixTQUFBLENBQUFELENBQUEsSUFBQUMsU0FBQSxDQUFBRCxDQUFBLFFBQUFBLENBQUEsT0FBQWYsT0FBQSxDQUFBSSxNQUFBLENBQUFjLE1B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