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
  getProductListByCategoryClient: function getProductListByCategoryClient(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var _req$query3, categoryId, _req$query3$pageSize, pageSize, whereConditions, _yield$db$product$fin2, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _req$query3 = req.query, categoryId = _req$query3.categoryId, _req$query3$pageSize = _req$query3.pageSize, pageSize = _req$query3$pageSize === void 0 ? 10 : _req$query3$pageSize;
            whereConditions = {
              categoryId: categoryId
            };
            _context8.prev = 2;
            _context8.next = 5;
            return _models.db.product.findAndCountAll({
              where: whereConditions,
              order: [["DESC"]],
              include: [{
                model: _models.db.user,
                attributes: ["id", "firstName", "lastName"]
              }]
              // limit: pageSize,
              // offset: (page - 1) * pageSize,
            });
          case 5:
            _yield$db$product$fin2 = _context8.sent;
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
            _context8.next = 16;
            break;
          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](2);
            console.error("Error searching products:", _context8.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 16:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[2, 12]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$query4, searchText, id, subid, _req$query4$page, page, _req$query4$pageSize, pageSize, searchTextValid, whereConditions, _yield$db$product$fin3, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _req$query4 = req.query, searchText = _req$query4.searchText, id = _req$query4.id, subid = _req$query4.subid, _req$query4$page = _req$query4.page, page = _req$query4$page === void 0 ? 1 : _req$query4$page, _req$query4$pageSize = _req$query4.pageSize, pageSize = _req$query4$pageSize === void 0 ? 10 : _req$query4$pageSize;
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
            _context9.prev = 3;
            _context9.next = 6;
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
            _yield$db$product$fin3 = _context9.sent;
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
            _context9.next = 17;
            break;
          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](3);
            console.error("Error searching products:", _context9.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 17:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[3, 13]]);
    }))();
  },
  getProductListByFilter: function getProductListByFilter(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var _req$query5, id, subid, typeRoom, rent, square, price, province, district, ward, star, _req$query5$pageSize, pageSize, page, whereConditions, _yield$db$product$fin4, count, productList, totalPages;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$query5 = req.query, id = _req$query5.id, subid = _req$query5.subid, typeRoom = _req$query5.typeRoom, rent = _req$query5.rent, square = _req$query5.square, price = _req$query5.price, province = _req$query5.province, district = _req$query5.district, ward = _req$query5.ward, star = _req$query5.star, _req$query5$pageSize = _req$query5.pageSize, pageSize = _req$query5$pageSize === void 0 ? 10 : _req$query5$pageSize, page = _req$query5.page;
            whereConditions = {
              categoryId: id,
              subCategoryId: subid
            };
            if (!(id == 13)) {
              _context10.next = 44;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined && rent.toString().length > 0)) {
              _context10.next = 15;
              break;
            }
            _context10.t0 = parseInt(rent);
            _context10.next = _context10.t0 === 0 ? 9 : _context10.t0 === 1 ? 11 : _context10.t0 === 2 ? 13 : 15;
            break;
          case 9:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [0, false]);
            return _context10.abrupt("break", 15);
          case 11:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [1, true]);
            return _context10.abrupt("break", 15);
          case 13:
            whereConditions.rent = 2;
            return _context10.abrupt("break", 15);
          case 15:
            if (!square) {
              _context10.next = 25;
              break;
            }
            _context10.t1 = parseInt(square);
            _context10.next = _context10.t1 === 1 ? 19 : _context10.t1 === 2 ? 21 : _context10.t1 === 3 ? 23 : 25;
            break;
          case 19:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [0, 20]);
            return _context10.abrupt("break", 25);
          case 21:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context10.abrupt("break", 25);
          case 23:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context10.abrupt("break", 25);
          case 25:
            if (!price) {
              _context10.next = 39;
              break;
            }
            _context10.t2 = parseInt(price);
            _context10.next = _context10.t2 === 1 ? 29 : _context10.t2 === 2 ? 31 : _context10.t2 === 3 ? 33 : _context10.t2 === 4 ? 35 : _context10.t2 === 5 ? 37 : 39;
            break;
          case 29:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context10.abrupt("break", 39);
          case 31:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context10.abrupt("break", 39);
          case 33:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context10.abrupt("break", 39);
          case 35:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context10.abrupt("break", 39);
          case 37:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context10.abrupt("break", 39);
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
            _context10.next = 45;
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
            _context10.next = 48;
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
            _yield$db$product$fin4 = _context10.sent;
            count = _yield$db$product$fin4.count;
            productList = _yield$db$product$fin4.rows;
            totalPages = Math.ceil(count / pageSize);
            return _context10.abrupt("return", res.status(200).json({
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
            _context10.prev = 55;
            _context10.t3 = _context10["catch"](0);
            console.log(_context10.t3);
            throw new RequestError("Error");
          case 59:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 55]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
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
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
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
  getProductSuggest2: function getProductSuggest2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
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
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      var size;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context15.sent;
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
            _context15.next = 10;
            break;
          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
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
            _context16.next = 8;
            break;
          case 5:
            _context16.prev = 5;
            _context16.t0 = _context16["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
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
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
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
            return _context19.stop();
        }
      }, _callee19);
    }))();
  },
  productDeleteBulk: function productDeleteBulk(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
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
            return _context20.stop();
        }
      }, _callee20);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
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
            return _context21.stop();
        }
      }, _callee21);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
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
            return _context22.stop();
        }
      }, _callee22);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
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
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
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
            return _context24.stop();
        }
      }, _callee24);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
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
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
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
            _context26.next = 7;
            break;
          case 4:
            _context26.prev = 4;
            _context26.t0 = _context26["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context26.stop();
        }
      }, _callee26, null, [[0, 4]]);
    }))();
  },
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      var search;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
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
            _context27.next = 9;
            break;
          case 6:
            _context27.prev = 6;
            _context27.t0 = _context27["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context27.stop();
        }
      }, _callee27, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
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
            _context28.next = 7;
            break;
          case 4:
            _context28.prev = 4;
            _context28.t0 = _context28["catch"](0);
            throw new RequestError("Error");
          case 7:
          case "end":
            return _context28.stop();
        }
      }, _callee28, null, [[0, 4]]);
    }))();
  },
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
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
            return _context29.stop();
        }
      }, _callee29);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
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
            return _context30.stop();
        }
      }, _callee30);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
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
            return _context31.stop();
        }
      }, _callee31);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
      var productId;
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) switch (_context32.prev = _context32.next) {
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
            return _context32.stop();
        }
      }, _callee32);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9tb21lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVxdWlyZSIsIk9wIiwiU2VxdWVsaXplIiwiX2RlZmF1bHQiLCJnZXRQaG90b1Byb2R1Y3QiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInByb2R1Y3RJZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJxdWVyeSIsImRiIiwicHJvZHVjdHBob3RvIiwiZmluZEFsbCIsIndoZXJlIiwidGhlbiIsInByb2R1Y3QiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImFkZFByb2R1Y3QiLCJfY2FsbGVlMiIsIl9yZXEkYm9keSIsImNhdGVnb3J5SWQiLCJzdWJDYXRlZ29yeUlkIiwiY2hpbGRDYXRlZ29yeUlkIiwibmFtZSIsInNsdWciLCJicmFuZCIsInVuaXRTaXplIiwic29ydERlc2MiLCJkZXNjIiwiYnV5ZXJQcmljZSIsInByaWNlIiwicXR5IiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsInRvdGFsIiwibmV0UHJpY2UiLCJpbWFnZSIsInNpemUiLCJuZXdhZGRpbWFnZSIsInBob25lTnVtYmVyIiwicHJvdmluY2UiLCJkaXN0cmljdCIsIndhcmQiLCJzcXVhcmUiLCJwcm92aW5jZVRleHQiLCJkaXN0cmljdFRleHQiLCJ3YXJkVGV4dCIsImJ1ZGdldCIsInR5cGVSb29tIiwiaW50ZXJpb3IiLCJlbmRvdyIsInJhdGluZyIsIm5vdGUiLCJ1c2VyX21hbmFnZXIiLCJhdXRob3JfcGhvbmUiLCJhZGRyZXNzIiwicHJvZHVjdF9pZCIsInJlbnQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJnZXRBbGxQcm9kdWN0Q2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzZWFyY2hUZXh0Iiwic3ViaWQiLCJfcmVxJHF1ZXJ5JHBhZ2UiLCJwYWdlIiwiX3JlcSRxdWVyeSRwYWdlU2l6ZSIsInBhZ2VTaXplIiwid2hlcmVDb25kaXRpb25zIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluIiwiY291bnQiLCJmaWx0ZXJlZExpc3QiLCJ0b3RhbFBhZ2VzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3IiLCJzdWJzdHJpbmciLCJ1cGRhdGVkQXQiLCJtb21lbnQiLCJjcmVhdGVkQXQiLCJmaW5kQW5kQ291bnRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJ1c2VyIiwiYXR0cmlidXRlcyIsImxpbWl0Iiwib2Zmc2V0Iiwic2VudCIsInJvd3MiLCJNYXRoIiwiY2VpbCIsInBhZ2luYXRpb24iLCJjdXJyZW50UGFnZSIsInRvdGFsSXRlbXMiLCJlcnJvciIsImluZGV4IiwiX2NhbGxlZTQiLCJfcmVxJHF1ZXJ5MiIsInN1cHBsaWVySWQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJvcmRlciIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJTdWJDYXRlZ29yeSIsImNhdGVnb3J5IiwidXBkYXRlIiwiX2NhbGxlZTciLCJfcmVxJGJvZHkyIiwiaW1hZ2VzIiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZmluZE9uZSIsIl9yZWYiLCJfY2FsbGVlNiIsInAiLCJfSlNPTiRwYXJzZTQiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYyIiwiX3giLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnQiLCJfY2FsbGVlOCIsIl9yZXEkcXVlcnkzIiwiX3JlcSRxdWVyeTMkcGFnZVNpemUiLCJfeWllbGQkZGIkcHJvZHVjdCRmaW4yIiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwicmVzdWx0cyIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSIsIl9jYWxsZWU5IiwiX3JlcSRxdWVyeTQiLCJfcmVxJHF1ZXJ5NCRwYWdlIiwiX3JlcSRxdWVyeTQkcGFnZVNpemUiLCJzZWFyY2hUZXh0VmFsaWQiLCJfeWllbGQkZGIkcHJvZHVjdCRmaW4zIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwidW5kZWZpbmVkIiwiZ2V0UHJvZHVjdExpc3RCeUZpbHRlciIsIl9jYWxsZWUxMCIsIl9yZXEkcXVlcnk1Iiwic3RhciIsIl9yZXEkcXVlcnk1JHBhZ2VTaXplIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluNCIsInByb2R1Y3RMaXN0IiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJ0b1N0cmluZyIsInQxIiwiYmV0d2VlbiIsImd0ZSIsInQyIiwicmVxdWlyZWQiLCJ0MyIsImdldFByb2R1Y3RTdWdnZXN0SG90ZWwiLCJfY2FsbGVlMTEiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsImxpc3QiLCJnZXRQcm9kdWN0U3VnZ2VzdEFwYXJ0bWVudCIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0UHJvZHVjdFN1Z2dlc3QyIiwiX2NhbGxlZTEzIiwiX2NhbGxlZTEzJCIsIl9jb250ZXh0MTMiLCJnZXRQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlMTQiLCJfY2FsbGVlMTQkIiwiX2NvbnRleHQxNCIsImdldFdlYlByb2R1Y3RMaXN0QnlJZCIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwiZGF0YXNpemUiLCJhZGRQcm9kdWN0T2ZmZXIiLCJfY2FsbGVlMTYiLCJfcmVxJGJvZHkzIiwiZGlzY291bnRfcGVyIiwiZGlzY291bnRfcHJpY2UiLCJuZXRfcHJpY2UiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsIlByb2R1Y3RPZmZlciIsImxvY2F0aW9uIiwiZ2V0UHJvZHVjdE9mZmVyIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJzZWFyY2hQcm9kdWN0QnlTdWJDYXQiLCJfY2FsbGVlMTgiLCJfY2FsbGVlMTgkIiwiX2NvbnRleHQxOCIsInN1Yl9uYW1lIiwic3ViQ2F0Iiwic3RyaW5naWZ5IiwicHJvZHVjdERlbGV0ZSIsIl9jYWxsZWUxOSIsIl9jYWxsZWUxOSQiLCJfY29udGV4dDE5IiwicmUiLCJwcm9kdWN0RGVsZXRlQnVsayIsIl9jYWxsZWUyMCIsIl9jYWxsZWUyMCQiLCJfY29udGV4dDIwIiwicHJvZHVjdE9mZmVyRGVsZXRlIiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJwYXJhbXMiLCJtdWx0aXBsZVBob3RvVXBsb2FkIiwiX2NhbGxlZTIyIiwiYXR0YWNobWVudEVudHJpZXMiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsImZpbGVzIiwiZmlsZW5hbWUiLCJtaW1lIiwibWltZXR5cGUiLCJyIiwiZXJyb3JzIiwiZ2V0QWxsUGhvdG8iLCJfY2FsbGVlMjMiLCJfY2FsbGVlMjMkIiwiX2NvbnRleHQyMyIsImRlbGV0ZVNsaWRlclBob3RvIiwiX2NhbGxlZTI0IiwiX2NhbGxlZTI0JCIsIl9jb250ZXh0MjQiLCJnZXRBbGxHcm9jZXJyeVN0YXBsZXMiLCJfY2FsbGVlMjUiLCJfY2FsbGVlMjUkIiwiX2NvbnRleHQyNSIsImdldEFsbFByb2R1Y3RCeVNsdWciLCJfY2FsbGVlMjYiLCJfY2FsbGVlMjYkIiwiX2NvbnRleHQyNiIsImdldEZpbHRlcmJ5UHJvZHVjdCIsIl9jYWxsZWUyNyIsInNlYXJjaCIsIl9jYWxsZWUyNyQiLCJfY29udGV4dDI3IiwibGlrZSIsIkdldEFsbEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMjgiLCJfY2FsbGVlMjgkIiwiX2NvbnRleHQyOCIsIlN1YkNoaWxkQ2F0ZWdvcnkiLCJhd3NQcm9kdWN0UGhvdG9EZWxldGUiLCJfY2FsbGVlMjkiLCJfcmVxJGJvZHk0IiwiX2NhbGxlZTI5JCIsIl9jb250ZXh0MjkiLCJnZXRQcm9kdWN0U3ViQ2hpbGRDYXQiLCJfY2FsbGVlMzAiLCJfcmVxJGJvZHk1IiwiX2NhbGxlZTMwJCIsIl9jb250ZXh0MzAiLCJnZXRQcm9kdWN0U3VnZ2VzdCIsIl9jYWxsZWUzMSIsIl9jYWxsZWUzMSQiLCJfY29udGV4dDMxIiwibGl0ZXJhbCIsImdldFNpemVQcm9kdWN0IiwiX2NhbGxlZTMyIiwiX2NhbGxlZTMyJCIsIl9jb250ZXh0MzIiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwaS9yZXNvdXJjZXMvcHJvZHVjdC9wcm9kdWN0LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzXCI7XG5jb25zdCB7IE9wLCBTZXF1ZWxpemUgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbi8vIGltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi4vLi4vLi4va3VlJztcbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG4gIGFzeW5jIGdldFBob3RvUHJvZHVjdChyZXEsIHJlcykge1xuICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgZGIucHJvZHVjdHBob3RvXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG9rOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIGFkZFByb2R1Y3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBzb3J0RGVzYyxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHByb3ZpbmNlLFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBwcm92aW5jZVRleHQsXG4gICAgICAgIGRpc3RyaWN0VGV4dCxcbiAgICAgICAgd2FyZFRleHQsXG4gICAgICAgIGJ1ZGdldCxcbiAgICAgICAgdHlwZVJvb20sXG4gICAgICAgIGludGVyaW9yLFxuICAgICAgICBlbmRvdyxcbiAgICAgICAgcmF0aW5nLFxuICAgICAgICBub3RlLFxuICAgICAgICB1c2VyX21hbmFnZXIsXG4gICAgICAgIGF1dGhvcl9waG9uZSxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgcHJvZHVjdF9pZCxcbiAgICAgICAgcmVudCxcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmNyZWF0ZSh7XG4gICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkIHx8IDAsXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICBzb3J0RGVzYzogc29ydERlc2MsXG4gICAgICAgICAgZGVzYzogZGVzYyxcbiAgICAgICAgICBidXllclByaWNlOiBidXllclByaWNlLFxuICAgICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICBkaXNjb3VudDogZGlzY291bnQsXG4gICAgICAgICAgZGlzY291bnRQZXI6IGRpc2NvdW50UGVyLFxuICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICBuZXRQcmljZTogbmV0UHJpY2UsXG4gICAgICAgICAgcGhvdG86IHJlcS5maWxlID8gcmVxLmZpbGUucGF0aCA6IFwiXCIsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgIHByb3ZpbmNlOiBwcm92aW5jZSxcbiAgICAgICAgICBkaXN0cmljdDogZGlzdHJpY3QsXG4gICAgICAgICAgd2FyZDogd2FyZCxcbiAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICBzcXVhcmU6IHNxdWFyZSA/IHNxdWFyZSA6IDAsXG4gICAgICAgICAgYnVkZ2V0OiBidWRnZXQgPyBidWRnZXQgOiAwLFxuICAgICAgICAgIHR5cGVSb29tOiB0eXBlUm9vbSA/IHR5cGVSb29tIDogXCJcIixcbiAgICAgICAgICBpbnRlcmlvcjogaW50ZXJpb3IgPyBpbnRlcmlvciA6IFwiXCIsXG4gICAgICAgICAgZW5kb3c6IGVuZG93ID8gZW5kb3cgOiAwLFxuICAgICAgICAgIHJhdGluZzogcmF0aW5nID8gcmF0aW5nIDogMCxcbiAgICAgICAgICBub3RlOiBub3RlID8gbm90ZSA6IFwiXCIsXG4gICAgICAgICAgdXNlcl9tYW5hZ2VyOiB1c2VyX21hbmFnZXIgPyB1c2VyX21hbmFnZXIgOiBcIlwiLFxuICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXG4gICAgICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdF9pZCA/IHByb2R1Y3RfaWQgOiBcIlwiLFxuICAgICAgICAgIHJlbnQ6IHJlbnQgPyByZW50IDogMCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBKU09OLnBhcnNlKGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGltZ1VybDogaXRlbT8ucGF0aCxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgSlNPTi5wYXJzZShzaXplKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgc2l6ZTogaXRlbT8uc2l6ZSxcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiBwcm9kdWN0LmRhdGFWYWx1ZXMuaWQsXG4gICAgICAgICAgICAgIGFtb3VudDogaXRlbT8uYW1vdW50LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc1xuICAgICAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgcHJvZHVjdFwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdENhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3QgeyBzZWFyY2hUZXh0LCBpZCwgc3ViaWQsIHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDEwIH0gPSByZXEucXVlcnk7XG5cbiAgICBjb25zdCB3aGVyZUNvbmRpdGlvbnMgPSB7XG4gICAgICBjYXRlZ29yeUlkOiBpZCxcbiAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YmlkLFxuICAgICAgW09wLm9yXTogW1xuICAgICAgICB7IHByb2R1Y3RfaWQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7IG5hbWU6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7IGFkZHJlc3M6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7IHdhcmRUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBkaXN0cmljdFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7IHByb3ZpbmNlVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXG4gICAgICAgIHsgcHJpY2U6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7XG4gICAgICAgICAgdXBkYXRlZEF0OiB7XG4gICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlZEF0OiB7XG4gICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHQsIFwiREQtTU0tWVlZWSBISDptbTpzc1wiKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7IFwiJHVzZXIuZmlyc3ROYW1lJFwiOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaOG7sWMgaGnhu4duIHRydXkgduG6pW4gZOG7ryBsaeG7h3UgduG7m2kgU2VxdWVsaXplXG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBmaWx0ZXJlZExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xuXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgZGF0YTogZmlsdGVyZWRMaXN0LFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXG4gICAgICAgICAgdG90YWxJdGVtczogY291bnQsXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGluZGV4KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3VwcGxpZXJJZCwgY2F0ZWdvcnlJZCwgc3ViQ2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBzdXBwbGllcklkOiBzdXBwbGllcklkLFxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUHJvZHVjdExpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1vZGVsOiBkYi5TdWJDYXRlZ29yeSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgdXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICBjYXRlZ29yeUlkLFxuICAgICAgICBzdWJDYXRlZ29yeUlkLFxuICAgICAgICBjaGlsZENhdGVnb3J5SWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHNsdWcsXG4gICAgICAgIGJyYW5kLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHVuaXRTaXplLFxuICAgICAgICBkZXNjLFxuICAgICAgICBidXllclByaWNlLFxuICAgICAgICBwcmljZSxcbiAgICAgICAgcXR5LFxuICAgICAgICBkaXNjb3VudCxcbiAgICAgICAgZGlzY291bnRQZXIsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZXRQcmljZSxcbiAgICAgICAgaW1hZ2VzLFxuICAgICAgICBzaXplLFxuICAgICAgICBuZXdhZGRpbWFnZSxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgc3F1YXJlLFxuICAgICAgICBlbmRvdyxcbiAgICAgICAgcmF0aW5nLFxuICAgICAgICBub3RlLFxuICAgICAgICB1c2VyX21hbmFnZXIsXG4gICAgICAgIHJlbnQsXG4gICAgICAgIGF1dGhvcl9waG9uZSxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgcGhvdG8sXG4gICAgICAgIHByb3ZpbmNlLFxuICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgd2FyZCxcbiAgICAgICAgcHJvZHVjdF9pZCxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC51cGRhdGUoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkID8gY2F0ZWdvcnlJZCA6IHByb2R1Y3QuY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA/IHN1YkNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5zdWJDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIGNoaWxkQ2F0ZWdvcnlJZDogY2hpbGRDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA/IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgOiBwcm9kdWN0LmNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHNsdWc6IHNsdWcsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBwYXJzZUludChzdGF0dXMpID8gXCJhY3RpdmVcIiA6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgICAgICAgICBicmFuZDogYnJhbmQsXG4gICAgICAgICAgICAgICAgdW5pdFNpemU6IHVuaXRTaXplLFxuICAgICAgICAgICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcbiAgICAgICAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxuICAgICAgICAgICAgICAgIHBob3RvOiBwaG90byxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgdHlwZVJvb20sXG4gICAgICAgICAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxuICAgICAgICAgICAgICAgIGVuZG93OiBlbmRvdyA/IGVuZG93IDogMCxcbiAgICAgICAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXG4gICAgICAgICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogXCJcIixcbiAgICAgICAgICAgICAgICByZW50OiByZW50ID8gcmVudCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgYXV0aG9yX3Bob25lOiBhdXRob3JfcGhvbmUgPyBhdXRob3JfcGhvbmUgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MgPyBhZGRyZXNzIDogXCJcIixcbiAgICAgICAgICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgICAgICAgICBkaXN0cmljdCxcbiAgICAgICAgICAgICAgICB3YXJkLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RfaWQgPyBwcm9kdWN0X2lkIDogXCJcIixcbiAgICAgICAgICAgICAgICBwcm92aW5jZVRleHQ6IHByb3ZpbmNlVGV4dCA/IHByb3ZpbmNlVGV4dCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgZGlzdHJpY3RUZXh0OiBkaXN0cmljdFRleHQgPyBkaXN0cmljdFRleHQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHdhcmRUZXh0OiB3YXJkVGV4dCA/IHdhcmRUZXh0IDogXCJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIk5vdCBGb3VuZCBQcm9kdWN0XCIsIDQwOSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGFzeW5jIChwKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld2FkZGltYWdlKSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKG5ld2FkZGltYWdlKT8ubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICBkYi5wcm9kdWN0cGhvdG8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LmltYWdlVXJsLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmRlc3Ryb3koe1xuICAgICAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHNpemUuYnVsa0NyZWF0ZShcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZShzaXplKS5tYXAoKHsgc2l6ZSwgYW1vdW50IH0pID0+ICh7XG4gICAgICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgcHJvZHVjdElkLFxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbWFnZXMpIHtcbiAgICAgICAgICAgIGF3YWl0IGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2UoaW1hZ2VzKS5tYXAoKGl0ZW0pID0+ICh7IC4uLml0ZW0sIHByb2R1Y3RJZCB9KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgbXNnOiBcIlVwZGF0ZWQgU3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudChyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHsgIGNhdGVnb3J5SWQsIHBhZ2VTaXplPSAxMCB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRo4buxYyBoaeG7h24gdHJ1eSB24bqlbiBk4buvIGxp4buHdSB24bubaSBTZXF1ZWxpemVcbiAgICAgIGNvbnN0IHsgY291bnQsIHJvd3M6IGZpbHRlcmVkTGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgICAgLy8gb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXG4gICAgICB9KTtcblxuICAgICAgLy8gVMOtbmggdG/DoW4gdOG7lW5nIHPhu5EgdHJhbmcgZOG7sWEgdHLDqm4gc+G7kSBsxrDhu6NuZyBk4buvIGxp4buHdSB2w6Aga8OtY2ggdGjGsOG7m2MgdHJhbmdcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XG5cbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICByZXN1bHRzOiBmaWx0ZXJlZExpc3QsXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAvLyBjdXJyZW50UGFnZTogcGFyc2VJbnQocGFnZSksXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3QgeyBzZWFyY2hUZXh0LCBpZCwgc3ViaWQsIHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDEwIH0gPSByZXEucXVlcnk7XG4gICAgbGV0IHNlYXJjaFRleHRWYWxpZFxuICAgIGlmKHNlYXJjaFRleHQ9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRleHQ9PSBudWxsKSB7XG4gICAgICAgIHNlYXJjaFRleHRWYWxpZD0gXCJcIlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VhcmNoVGV4dFZhbGlkPSBzZWFyY2hUZXh0XG4gICAgfVxuXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgY2F0ZWdvcnlJZDogaWQsXG4gICAgICBzdWJDYXRlZ29yeUlkOiBzdWJpZCxcbiAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgeyBwcm9kdWN0X2lkOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IG5hbWU6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgYWRkcmVzczogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyB3YXJkVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyBkaXN0cmljdFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgcHJvdmluY2VUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IHByaWNlOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7XG4gICAgICAgICAgdXBkYXRlZEF0OiB7XG4gICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHRWYWxpZCwgXCJERC1NTS1ZWVlZIEhIOm1tOnNzXCIpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dFZhbGlkLCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaOG7sWMgaGnhu4duIHRydXkgduG6pW4gZOG7ryBsaeG7h3UgduG7m2kgU2VxdWVsaXplXG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBmaWx0ZXJlZExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xuXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgZGF0YTogZmlsdGVyZWRMaXN0LFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXG4gICAgICAgICAgdG90YWxJdGVtczogY291bnQsXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlGaWx0ZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpZCxcbiAgICAgICAgc3ViaWQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICByZW50LFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHN0YXIsXG4gICAgICAgIHBhZ2VTaXplID0gMTAsXG4gICAgICAgIHBhZ2UsXG4gICAgICB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHtcbiAgICAgICAgY2F0ZWdvcnlJZDogaWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YmlkLFxuICAgICAgfTtcbiAgICAgIGlmIChpZCA9PSAxMykge1xuICAgICAgICBpZiAodHlwZVJvb20pIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZW50ICE9PSB1bmRlZmluZWQgJiYgcmVudC50b1N0cmluZygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHJlbnQpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0geyBbT3Aub3JdOiBbMCwgZmFsc2VdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IHsgW09wLm9yXTogWzEsIHRydWVdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmUpIHtcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHNxdWFyZSkpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmJldHdlZW5dOiBbMCwgMjBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuYmV0d2Vlbl06IFsyMCwgNDBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuZ3RlXTogNDAgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlKSB7XG4gICAgICAgICAgc3dpdGNoIChwYXJzZUludChwcmljZSkpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFswLCAxMDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFsxMDAwMDAwLCAzMDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFszMDAwMDAwLCA1MDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFs1MDAwMDAwLCAxMDAwMDAwMF0gfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmd0ZV06IDEwMDAwMDAwIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc3RyaWN0KSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpZCA9PSAxMikge1xuICAgICAgICBpZiAodHlwZVJvb20pIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFyKSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJhdGluZyA9IHN0YXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmluY2UpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdhcmQpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpZCA9PSAxMikge1xuICAgICAgICBpZiAodHlwZVJvb20pIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3Rhcikge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdGFyID0gc3RhcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvdmluY2UpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogcHJvZHVjdExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxuICAgICAgfSk7XG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgZGF0YTogcHJvZHVjdExpc3QsXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogcGFyc2VJbnQocGFnZSksXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0MihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBlbmRvdzogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnByb2R1Y3RzaXplLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgfSk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QsIGRhdGFzaXplOiBzaXplIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHF0eSwgZGlzY291bnRfcGVyLCBkaXNjb3VudF9wcmljZSwgdG90YWwsIG5ldF9wcmljZSB9ID1cbiAgICAgICAgcmVxLmJvZHk7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGlmICghbGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5jcmVhdGUoe1xuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgaW1hZ2U6IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBcIlwiLFxuICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IGxpc3QuaWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgIFwiaWRcIixcbiAgICAgICAgICAgICAgXCJjYXRlZ29yeUlkXCIsXG4gICAgICAgICAgICAgIFwicHJpY2VcIixcbiAgICAgICAgICAgICAgXCJpdGVtX25hbWVcIixcbiAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICBcImJyYW5kXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHNlYXJjaFByb2R1Y3RCeVN1YkNhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5LnN1YkNhdCB9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIHByb2R1Y3REZWxldGVCdWxrKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkubGlzdCB9IH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHsgb2s6IHRydWUsIHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgbGV0IGF0dGFjaG1lbnRFbnRyaWVzID0gW107XG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICBuYW1lOiByZXEuZmlsZXNbaV0uZmlsZW5hbWUsXG4gICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcbiAgICAgICAgaW1nVXJsOiByZXEuZmlsZXNbaV0ucGF0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3ROYW1lOiByLml0ZW1fbmFtZSxcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxuICAgICAgICAgIC8vIH0pLnNhdmUoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLmZpbGVzIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogW1wiRXJyb3IgaW5zZXJ0IHBob3RvXCJdIH0pO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJicmFuZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICAvL0FsbCBHcm9jZXJ5U3RhbXBsZSBwcm9kdWN0XG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XG4gIGFzeW5jIGdldEFsbEdyb2NlcnJ5U3RhcGxlcyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInNsdWdcIl0sXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImRpc2NvdW50UGVyXCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IHx8IFtdIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuY2F0ZWdvcnlcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGZpbHRlciBwcm9kdWN0XG5cbiAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XG4gICAgICBpZiAocmVxLnF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBzZWFyY2ggPSBcIiVcIiArIHJlcS5xdWVyeS5zZWFyY2ggKyBcIiVcIjtcbiAgICAgIH1cbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBbT3Aub3JdOiBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHNsdWc6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcblxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBHZXRBbGxCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkubmFtZSB9LFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gYXdzIGltYWdlIGRlbGV0ZVxuICBhc3luYyBhd3NQcm9kdWN0UGhvdG9EZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcbiAgICAgIC8vIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHt3aGVyZToge2ltZ1VybCwgaWR9fSlcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxuXG4gICAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgIC50aGVuKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0c2l6ZVxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7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