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
  getProductListByCategoryClientWeb: function getProductListByCategoryClientWeb(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var _req$query4, categoryId, _req$query4$pageSize, pageSize, subCategoryId, whereConditions, _yield$db$product$fin3, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _req$query4 = req.query, categoryId = _req$query4.categoryId, _req$query4$pageSize = _req$query4.pageSize, pageSize = _req$query4$pageSize === void 0 ? 10 : _req$query4$pageSize, subCategoryId = _req$query4.subCategoryId;
            whereConditions = {
              categoryId: categoryId,
              subCategoryId: subCategoryId
            };
            _context9.prev = 2;
            _context9.next = 5;
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
            _yield$db$product$fin3 = _context9.sent;
            count = _yield$db$product$fin3.count;
            filteredList = _yield$db$product$fin3.rows;
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
            _context9.next = 16;
            break;
          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](2);
            console.error("Error searching products:", _context9.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 16:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[2, 12]]);
    }))();
  },
  getProductListByCategory: function getProductListByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var _req$query5, searchText, id, subid, _req$query5$page, page, _req$query5$pageSize, pageSize, searchTextValid, whereConditions, _yield$db$product$fin4, count, filteredList, totalPages;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _req$query5 = req.query, searchText = _req$query5.searchText, id = _req$query5.id, subid = _req$query5.subid, _req$query5$page = _req$query5.page, page = _req$query5$page === void 0 ? 1 : _req$query5$page, _req$query5$pageSize = _req$query5.pageSize, pageSize = _req$query5$pageSize === void 0 ? 10 : _req$query5$pageSize;
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
            _context10.prev = 3;
            _context10.next = 6;
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
            _yield$db$product$fin4 = _context10.sent;
            count = _yield$db$product$fin4.count;
            filteredList = _yield$db$product$fin4.rows;
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
            _context10.next = 17;
            break;
          case 13:
            _context10.prev = 13;
            _context10.t0 = _context10["catch"](3);
            console.error("Error searching products:", _context10.t0);
            res.status(500).json({
              success: false,
              error: "Internal Server Error"
            });
          case 17:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[3, 13]]);
    }))();
  },
  getProductListByFilter: function getProductListByFilter(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var _req$query6, id, subid, typeRoom, rent, square, price, province, district, ward, star, _req$query6$pageSize, pageSize, page, whereConditions, _yield$db$product$fin5, count, productList, totalPages;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$query6 = req.query, id = _req$query6.id, subid = _req$query6.subid, typeRoom = _req$query6.typeRoom, rent = _req$query6.rent, square = _req$query6.square, price = _req$query6.price, province = _req$query6.province, district = _req$query6.district, ward = _req$query6.ward, star = _req$query6.star, _req$query6$pageSize = _req$query6.pageSize, pageSize = _req$query6$pageSize === void 0 ? 10 : _req$query6$pageSize, page = _req$query6.page;
            whereConditions = {
              categoryId: id,
              subCategoryId: subid
            };
            if (!(id == 13)) {
              _context11.next = 44;
              break;
            }
            if (typeRoom) {
              whereConditions.typeRoom = typeRoom;
            }
            if (!(rent !== undefined && rent.toString().length > 0)) {
              _context11.next = 15;
              break;
            }
            _context11.t0 = parseInt(rent);
            _context11.next = _context11.t0 === 0 ? 9 : _context11.t0 === 1 ? 11 : _context11.t0 === 2 ? 13 : 15;
            break;
          case 9:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [0, false]);
            return _context11.abrupt("break", 15);
          case 11:
            whereConditions.rent = (0, _defineProperty2["default"])({}, Op.or, [1, true]);
            return _context11.abrupt("break", 15);
          case 13:
            whereConditions.rent = 2;
            return _context11.abrupt("break", 15);
          case 15:
            if (!square) {
              _context11.next = 25;
              break;
            }
            _context11.t1 = parseInt(square);
            _context11.next = _context11.t1 === 1 ? 19 : _context11.t1 === 2 ? 21 : _context11.t1 === 3 ? 23 : 25;
            break;
          case 19:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [0, 20]);
            return _context11.abrupt("break", 25);
          case 21:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.between, [20, 40]);
            return _context11.abrupt("break", 25);
          case 23:
            whereConditions.square = (0, _defineProperty2["default"])({}, Op.gte, 40);
            return _context11.abrupt("break", 25);
          case 25:
            if (!price) {
              _context11.next = 39;
              break;
            }
            _context11.t2 = parseInt(price);
            _context11.next = _context11.t2 === 1 ? 29 : _context11.t2 === 2 ? 31 : _context11.t2 === 3 ? 33 : _context11.t2 === 4 ? 35 : _context11.t2 === 5 ? 37 : 39;
            break;
          case 29:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [0, 1000000]);
            return _context11.abrupt("break", 39);
          case 31:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [1000000, 3000000]);
            return _context11.abrupt("break", 39);
          case 33:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [3000000, 5000000]);
            return _context11.abrupt("break", 39);
          case 35:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.between, [5000000, 10000000]);
            return _context11.abrupt("break", 39);
          case 37:
            whereConditions.price = (0, _defineProperty2["default"])({}, Op.gte, 10000000);
            return _context11.abrupt("break", 39);
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
            _context11.next = 45;
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
            _context11.next = 48;
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
            _yield$db$product$fin5 = _context11.sent;
            count = _yield$db$product$fin5.count;
            productList = _yield$db$product$fin5.rows;
            totalPages = Math.ceil(count / pageSize);
            return _context11.abrupt("return", res.status(200).json({
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
            _context11.prev = 55;
            _context11.t3 = _context11["catch"](0);
            console.log(_context11.t3);
            throw new RequestError("Error");
          case 59:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 55]]);
    }))();
  },
  getProductSuggestHotel: function getProductSuggestHotel(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
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
  getProductSuggestApartment: function getProductSuggestApartment(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
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
  getProductSuggest2: function getProductSuggest2(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
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
  getProductListById: function getProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
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
  getWebProductListById: function getWebProductListById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var size;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _models.db.productsize.findAll({
              where: {
                productId: req.query.id
              }
            });
          case 3:
            size = _context16.sent;
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
            _context16.next = 10;
            break;
          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            throw new RequestError("Error");
          case 10:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 7]]);
    }))();
  },
  addProductOffer: function addProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var _req$body3, productId, qty, discount_per, discount_price, total, net_price;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
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
            _context17.next = 8;
            break;
          case 5:
            _context17.prev = 5;
            _context17.t0 = _context17["catch"](0);
            throw new RequestError("Error");
          case 8:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 5]]);
    }))();
  },
  getProductOffer: function getProductOffer(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
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
  searchProductBySubCat: function searchProductBySubCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
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
  productDelete: function productDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
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
            return _context20.stop();
        }
      }, _callee20);
    }))();
  },
  productDeleteBulk: function productDeleteBulk(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
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
            return _context21.stop();
        }
      }, _callee21);
    }))();
  },
  productOfferDelete: function productOfferDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
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
            return _context22.stop();
        }
      }, _callee22);
    }))();
  },
  multiplePhotoUpload: function multiplePhotoUpload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var attachmentEntries, productId, i;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
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
            return _context23.stop();
        }
      }, _callee23);
    }))();
  },
  getAllPhoto: function getAllPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
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
  deleteSliderPhoto: function deleteSliderPhoto(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
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
            return _context25.stop();
        }
      }, _callee25);
    }))();
  },
  //All GroceryStample product
  // edit to sale product
  getAllGrocerryStaples: function getAllGrocerryStaples(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
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
  getAllProductBySlug: function getAllProductBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
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
  // filter product
  getFilterbyProduct: function getFilterbyProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
      var search;
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
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
            _context28.next = 9;
            break;
          case 6:
            _context28.prev = 6;
            _context28.t0 = _context28["catch"](0);
            throw new RequestError("Error");
          case 9:
          case "end":
            return _context28.stop();
        }
      }, _callee28, null, [[0, 6]]);
    }))();
  },
  GetAllByCategory: function GetAllByCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
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
  // aws image delete
  awsProductPhotoDelete: function awsProductPhotoDelete(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
      var _req$body4, id, imgUrl;
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
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
            return _context30.stop();
        }
      }, _callee30);
    }))();
  },
  getProductSubChildCat: function getProductSubChildCat(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
      var _req$body5, subCategoryId, childCategoryId;
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) switch (_context31.prev = _context31.next) {
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
            return _context31.stop();
        }
      }, _callee31);
    }))();
  },
  getProductSuggest: function getProductSuggest(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) switch (_context32.prev = _context32.next) {
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
            return _context32.stop();
        }
      }, _callee32);
    }))();
  },
  getSizeProduct: function getSizeProduct(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
      var productId;
      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) switch (_context33.prev = _context33.next) {
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
            return _context33.stop();
        }
      }, _callee33);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9tb21lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib3duS2V5cyIsIm9iamVjdCIsImVudW1lcmFibGVPbmx5Iiwia2V5cyIsIk9iamVjdCIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bWJvbHMiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwicHVzaCIsImFwcGx5IiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJmb3JFYWNoIiwia2V5IiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVxdWlyZSIsIk9wIiwiU2VxdWVsaXplIiwiX2RlZmF1bHQiLCJnZXRQaG90b1Byb2R1Y3QiLCJyZXEiLCJyZXMiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInByb2R1Y3RJZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJxdWVyeSIsImRiIiwicHJvZHVjdHBob3RvIiwiZmluZEFsbCIsIndoZXJlIiwidGhlbiIsInByb2R1Y3QiLCJzdGF0dXMiLCJqc29uIiwib2siLCJkYXRhIiwic3RvcCIsImFkZFByb2R1Y3QiLCJfY2FsbGVlMiIsIl9yZXEkYm9keSIsImNhdGVnb3J5SWQiLCJzdWJDYXRlZ29yeUlkIiwiY2hpbGRDYXRlZ29yeUlkIiwibmFtZSIsInNsdWciLCJicmFuZCIsInVuaXRTaXplIiwic29ydERlc2MiLCJkZXNjIiwiYnV5ZXJQcmljZSIsInByaWNlIiwicXR5IiwiZGlzY291bnQiLCJkaXNjb3VudFBlciIsInRvdGFsIiwibmV0UHJpY2UiLCJpbWFnZSIsInNpemUiLCJuZXdhZGRpbWFnZSIsInBob25lTnVtYmVyIiwicHJvdmluY2UiLCJkaXN0cmljdCIsIndhcmQiLCJzcXVhcmUiLCJwcm92aW5jZVRleHQiLCJkaXN0cmljdFRleHQiLCJ3YXJkVGV4dCIsImJ1ZGdldCIsInR5cGVSb29tIiwiaW50ZXJpb3IiLCJlbmRvdyIsInJhdGluZyIsIm5vdGUiLCJ1c2VyX21hbmFnZXIiLCJhdXRob3JfcGhvbmUiLCJhZGRyZXNzIiwicHJvZHVjdF9pZCIsInJlbnQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJib2R5IiwiY3JlYXRlIiwicGFyc2VJbnQiLCJwaG90byIsImZpbGUiLCJwYXRoIiwiX0pTT04kcGFyc2UiLCJfSlNPTiRwYXJzZTMiLCJKU09OIiwicGFyc2UiLCJtYXAiLCJpdGVtIiwiaW1nVXJsIiwiZGF0YVZhbHVlcyIsImlkIiwiX0pTT04kcGFyc2UyIiwiaW1hZ2VVcmwiLCJwcm9kdWN0c2l6ZSIsImFtb3VudCIsInN1Y2Nlc3MiLCJtc2ciLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJhYnJ1cHQiLCJnZXRBbGxQcm9kdWN0Q2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkcXVlcnkiLCJzZWFyY2hUZXh0Iiwic3ViaWQiLCJfcmVxJHF1ZXJ5JHBhZ2UiLCJwYWdlIiwiX3JlcSRxdWVyeSRwYWdlU2l6ZSIsInBhZ2VTaXplIiwid2hlcmVDb25kaXRpb25zIiwiX3lpZWxkJGRiJHByb2R1Y3QkZmluIiwiY291bnQiLCJmaWx0ZXJlZExpc3QiLCJ0b3RhbFBhZ2VzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwib3IiLCJzdWJzdHJpbmciLCJ1cGRhdGVkQXQiLCJtb21lbnQiLCJjcmVhdGVkQXQiLCJmaW5kQW5kQ291bnRBbGwiLCJpbmNsdWRlIiwibW9kZWwiLCJ1c2VyIiwiYXR0cmlidXRlcyIsImxpbWl0Iiwib2Zmc2V0Iiwic2VudCIsInJvd3MiLCJNYXRoIiwiY2VpbCIsInBhZ2luYXRpb24iLCJjdXJyZW50UGFnZSIsInRvdGFsSXRlbXMiLCJlcnJvciIsImluZGV4IiwiX2NhbGxlZTQiLCJfcmVxJHF1ZXJ5MiIsInN1cHBsaWVySWQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJvcmRlciIsIlJlcXVlc3RFcnJvciIsImdldEFsbFByb2R1Y3RMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJTdWJDYXRlZ29yeSIsImNhdGVnb3J5IiwidXBkYXRlIiwiX2NhbGxlZTciLCJfcmVxJGJvZHkyIiwiaW1hZ2VzIiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZmluZE9uZSIsIl9yZWYiLCJfY2FsbGVlNiIsInAiLCJfSlNPTiRwYXJzZTQiLCJfY2FsbGVlNiQiLCJfY29udGV4dDYiLCJkZXN0cm95IiwiYnVsa0NyZWF0ZSIsIl9yZWYyIiwiX3giLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnQiLCJfY2FsbGVlOCIsIl9yZXEkcXVlcnkzIiwiX3JlcSRxdWVyeTMkcGFnZVNpemUiLCJfeWllbGQkZGIkcHJvZHVjdCRmaW4yIiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwicmVzdWx0cyIsImdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudFdlYiIsIl9jYWxsZWU5IiwiX3JlcSRxdWVyeTQiLCJfcmVxJHF1ZXJ5NCRwYWdlU2l6ZSIsIl95aWVsZCRkYiRwcm9kdWN0JGZpbjMiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMTAiLCJfcmVxJHF1ZXJ5NSIsIl9yZXEkcXVlcnk1JHBhZ2UiLCJfcmVxJHF1ZXJ5NSRwYWdlU2l6ZSIsInNlYXJjaFRleHRWYWxpZCIsIl95aWVsZCRkYiRwcm9kdWN0JGZpbjQiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsInVuZGVmaW5lZCIsImdldFByb2R1Y3RMaXN0QnlGaWx0ZXIiLCJfY2FsbGVlMTEiLCJfcmVxJHF1ZXJ5NiIsInN0YXIiLCJfcmVxJHF1ZXJ5NiRwYWdlU2l6ZSIsIl95aWVsZCRkYiRwcm9kdWN0JGZpbjUiLCJwcm9kdWN0TGlzdCIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwidG9TdHJpbmciLCJ0MSIsImJldHdlZW4iLCJndGUiLCJ0MiIsInJlcXVpcmVkIiwidDMiLCJnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsIiwiX2NhbGxlZTEyIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJsaXN0IiwiZ2V0UHJvZHVjdFN1Z2dlc3RBcGFydG1lbnQiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImdldFByb2R1Y3RTdWdnZXN0MiIsIl9jYWxsZWUxNCIsIl9jYWxsZWUxNCQiLCJfY29udGV4dDE0IiwiZ2V0UHJvZHVjdExpc3RCeUlkIiwiX2NhbGxlZTE1IiwiX2NhbGxlZTE1JCIsIl9jb250ZXh0MTUiLCJnZXRXZWJQcm9kdWN0TGlzdEJ5SWQiLCJfY2FsbGVlMTYiLCJfY2FsbGVlMTYkIiwiX2NvbnRleHQxNiIsImRhdGFzaXplIiwiYWRkUHJvZHVjdE9mZmVyIiwiX2NhbGxlZTE3IiwiX3JlcSRib2R5MyIsImRpc2NvdW50X3BlciIsImRpc2NvdW50X3ByaWNlIiwibmV0X3ByaWNlIiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJQcm9kdWN0T2ZmZXIiLCJsb2NhdGlvbiIsImdldFByb2R1Y3RPZmZlciIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4Iiwic2VhcmNoUHJvZHVjdEJ5U3ViQ2F0IiwiX2NhbGxlZTE5IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJzdWJfbmFtZSIsInN1YkNhdCIsInN0cmluZ2lmeSIsInByb2R1Y3REZWxldGUiLCJfY2FsbGVlMjAiLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsInJlIiwicHJvZHVjdERlbGV0ZUJ1bGsiLCJfY2FsbGVlMjEiLCJfY2FsbGVlMjEkIiwiX2NvbnRleHQyMSIsInByb2R1Y3RPZmZlckRlbGV0ZSIsIl9jYWxsZWUyMiIsIl9jYWxsZWUyMiQiLCJfY29udGV4dDIyIiwicGFyYW1zIiwibXVsdGlwbGVQaG90b1VwbG9hZCIsIl9jYWxsZWUyMyIsImF0dGFjaG1lbnRFbnRyaWVzIiwiX2NhbGxlZTIzJCIsIl9jb250ZXh0MjMiLCJmaWxlcyIsImZpbGVuYW1lIiwibWltZSIsIm1pbWV0eXBlIiwiciIsImVycm9ycyIsImdldEFsbFBob3RvIiwiX2NhbGxlZTI0IiwiX2NhbGxlZTI0JCIsIl9jb250ZXh0MjQiLCJkZWxldGVTbGlkZXJQaG90byIsIl9jYWxsZWUyNSIsIl9jYWxsZWUyNSQiLCJfY29udGV4dDI1IiwiZ2V0QWxsR3JvY2VycnlTdGFwbGVzIiwiX2NhbGxlZTI2IiwiX2NhbGxlZTI2JCIsIl9jb250ZXh0MjYiLCJnZXRBbGxQcm9kdWN0QnlTbHVnIiwiX2NhbGxlZTI3IiwiX2NhbGxlZTI3JCIsIl9jb250ZXh0MjciLCJnZXRGaWx0ZXJieVByb2R1Y3QiLCJfY2FsbGVlMjgiLCJzZWFyY2giLCJfY2FsbGVlMjgkIiwiX2NvbnRleHQyOCIsImxpa2UiLCJHZXRBbGxCeUNhdGVnb3J5IiwiX2NhbGxlZTI5IiwiX2NhbGxlZTI5JCIsIl9jb250ZXh0MjkiLCJTdWJDaGlsZENhdGVnb3J5IiwiYXdzUHJvZHVjdFBob3RvRGVsZXRlIiwiX2NhbGxlZTMwIiwiX3JlcSRib2R5NCIsIl9jYWxsZWUzMCQiLCJfY29udGV4dDMwIiwiZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0IiwiX2NhbGxlZTMxIiwiX3JlcSRib2R5NSIsIl9jYWxsZWUzMSQiLCJfY29udGV4dDMxIiwiZ2V0UHJvZHVjdFN1Z2dlc3QiLCJfY2FsbGVlMzIiLCJfY2FsbGVlMzIkIiwiX2NvbnRleHQzMiIsImxpdGVyYWwiLCJnZXRTaXplUHJvZHVjdCIsIl9jYWxsZWUzMyIsIl9jYWxsZWUzMyQiLCJfY29udGV4dDMzIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5jb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRiIH0gZnJvbSBcIi4uLy4uLy4uL21vZGVsc1wiO1xuY29uc3QgeyBPcCwgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG4vLyBpbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4uLy4uLy4uL2t1ZSc7XG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xuICBhc3luYyBnZXRQaG90b1Byb2R1Y3QocmVxLCByZXMpIHtcbiAgICBjb25zdCB7IHByb2R1Y3RJZCB9ID0gcmVxLnF1ZXJ5O1xuICAgIGRiLnByb2R1Y3RwaG90b1xuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBvazogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgIH0pO1xuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgc29ydERlc2MsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGJ1eWVyUHJpY2UsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBxdHksXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBkaXNjb3VudFBlcixcbiAgICAgICAgdG90YWwsXG4gICAgICAgIG5ldFByaWNlLFxuICAgICAgICBpbWFnZSxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgcHJvdmluY2VUZXh0LFxuICAgICAgICBkaXN0cmljdFRleHQsXG4gICAgICAgIHdhcmRUZXh0LFxuICAgICAgICBidWRnZXQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICBpbnRlcmlvcixcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHByb2R1Y3RfaWQsXG4gICAgICAgIHJlbnQsXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5jcmVhdGUoe1xuICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB8fCAwLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgc2x1Zzogc2x1ZyxcbiAgICAgICAgICBzdGF0dXM6IHBhcnNlSW50KHN0YXR1cykgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwiLFxuICAgICAgICAgIGJyYW5kOiBicmFuZCxcbiAgICAgICAgICB1bml0U2l6ZTogdW5pdFNpemUsXG4gICAgICAgICAgc29ydERlc2M6IHNvcnREZXNjLFxuICAgICAgICAgIGRlc2M6IGRlc2MsXG4gICAgICAgICAgYnV5ZXJQcmljZTogYnV5ZXJQcmljZSxcbiAgICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgICAgcXR5OiBxdHksXG4gICAgICAgICAgZGlzY291bnQ6IGRpc2NvdW50LFxuICAgICAgICAgIGRpc2NvdW50UGVyOiBkaXNjb3VudFBlcixcbiAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgbmV0UHJpY2U6IG5ldFByaWNlLFxuICAgICAgICAgIHBob3RvOiByZXEuZmlsZSA/IHJlcS5maWxlLnBhdGggOiBcIlwiLFxuICAgICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlcixcbiAgICAgICAgICBwcm92aW5jZTogcHJvdmluY2UsXG4gICAgICAgICAgZGlzdHJpY3Q6IGRpc3RyaWN0LFxuICAgICAgICAgIHdhcmQ6IHdhcmQsXG4gICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxuICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcbiAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXG4gICAgICAgICAgc3F1YXJlOiBzcXVhcmUgPyBzcXVhcmUgOiAwLFxuICAgICAgICAgIGJ1ZGdldDogYnVkZ2V0ID8gYnVkZ2V0IDogMCxcbiAgICAgICAgICB0eXBlUm9vbTogdHlwZVJvb20gPyB0eXBlUm9vbSA6IFwiXCIsXG4gICAgICAgICAgaW50ZXJpb3I6IGludGVyaW9yID8gaW50ZXJpb3IgOiBcIlwiLFxuICAgICAgICAgIGVuZG93OiBlbmRvdyA/IGVuZG93IDogMCxcbiAgICAgICAgICByYXRpbmc6IHJhdGluZyA/IHJhdGluZyA6IDAsXG4gICAgICAgICAgbm90ZTogbm90ZSA/IG5vdGUgOiBcIlwiLFxuICAgICAgICAgIHVzZXJfbWFuYWdlcjogdXNlcl9tYW5hZ2VyID8gdXNlcl9tYW5hZ2VyIDogXCJcIixcbiAgICAgICAgICBhdXRob3JfcGhvbmU6IGF1dGhvcl9waG9uZSA/IGF1dGhvcl9waG9uZSA6IFwiXCIsXG4gICAgICAgICAgYWRkcmVzczogYWRkcmVzcyA/IGFkZHJlc3MgOiBcIlwiLFxuICAgICAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3RfaWQgPyBwcm9kdWN0X2lkIDogXCJcIixcbiAgICAgICAgICByZW50OiByZW50ID8gcmVudCA6IDAsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgSlNPTi5wYXJzZShpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5jcmVhdGUoe1xuICAgICAgICAgICAgICBpbWdVcmw6IGl0ZW0/LnBhdGgsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3QuZGF0YVZhbHVlcy5pZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIHNpemU6IGl0ZW0/LnNpemUsXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdC5kYXRhVmFsdWVzLmlkLFxuICAgICAgICAgICAgICBhbW91bnQ6IGl0ZW0/LmFtb3VudCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNcbiAgICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIHByb2R1Y3RcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHsgc2VhcmNoVGV4dCwgaWQsIHN1YmlkLCBwYWdlID0gMSwgcGFnZVNpemUgPSAxMCB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgY2F0ZWdvcnlJZDogaWQsXG4gICAgICBzdWJDYXRlZ29yeUlkOiBzdWJpZCxcbiAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgeyBwcm9kdWN0X2lkOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBuYW1lOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBhZGRyZXNzOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyB3YXJkVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXG4gICAgICAgIHsgZGlzdHJpY3RUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAgeyBwcm92aW5jZVRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHQgfSB9LFxuICAgICAgICB7IHByaWNlOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0IH0gfSxcbiAgICAgICAge1xuICAgICAgICAgIHVwZGF0ZWRBdDoge1xuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZWRBdDoge1xuICAgICAgICAgICAgW09wLnN1YnN0cmluZ106IG1vbWVudChzZWFyY2hUZXh0LCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dCB9IH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgLy8gVGjhu7FjIGhp4buHbiB0cnV5IHbhuqVuIGThu68gbGnhu4d1IHbhu5tpIFNlcXVlbGl6ZVxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogZmlsdGVyZWRMaXN0IH0gPSBhd2FpdCBkYi5wcm9kdWN0LmZpbmRBbmRDb3VudEFsbCh7XG4gICAgICAgIHdoZXJlOiB3aGVyZUNvbmRpdGlvbnMsXG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbGltaXQ6IHBhZ2VTaXplLFxuICAgICAgICBvZmZzZXQ6IChwYWdlIC0gMSkgKiBwYWdlU2l6ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUw61uaCB0b8OhbiB04buVbmcgc+G7kSB0cmFuZyBk4buxYSB0csOqbiBz4buRIGzGsOG7o25nIGThu68gbGnhu4d1IHbDoCBrw61jaCB0aMaw4bubYyB0cmFuZ1xuICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChjb3VudCAvIHBhZ2VTaXplKTtcblxuICAgICAgLy8gVHLhuqMgduG7gSBr4bq/dCBxdeG6oyB24bubaSB0aMO0bmcgdGluIHBow6JuIHRyYW5nXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIGRhdGE6IGZpbHRlcmVkTGlzdCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYXJzZUludChwYWdlKSxcbiAgICAgICAgICBwYWdlU2l6ZTogcGFyc2VJbnQocGFnZVNpemUpLFxuICAgICAgICAgIHRvdGFsSXRlbXM6IGNvdW50LFxuICAgICAgICAgIHRvdGFsUGFnZXM6IHRvdGFsUGFnZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSk7XG4gICAgfVxuICB9LFxuICBhc3luYyBpbmRleChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN1cHBsaWVySWQsIGNhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQgfSA9IHJlcS5xdWVyeTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgc3VwcGxpZXJJZDogc3VwcGxpZXJJZCxcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICAgICAgICBzdWJDYXRlZ29yeUlkOiBzdWJDYXRlZ29yeUlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgY2F0ZWdvcnlJZCxcbiAgICAgICAgc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgY2hpbGRDYXRlZ29yeUlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzbHVnLFxuICAgICAgICBicmFuZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB1bml0U2l6ZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgYnV5ZXJQcmljZSxcbiAgICAgICAgcHJpY2UsXG4gICAgICAgIHF0eSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIGRpc2NvdW50UGVyLFxuICAgICAgICB0b3RhbCxcbiAgICAgICAgbmV0UHJpY2UsXG4gICAgICAgIGltYWdlcyxcbiAgICAgICAgc2l6ZSxcbiAgICAgICAgbmV3YWRkaW1hZ2UsXG4gICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICB0eXBlUm9vbSxcbiAgICAgICAgaW50ZXJpb3IsXG4gICAgICAgIHNxdWFyZSxcbiAgICAgICAgZW5kb3csXG4gICAgICAgIHJhdGluZyxcbiAgICAgICAgbm90ZSxcbiAgICAgICAgdXNlcl9tYW5hZ2VyLFxuICAgICAgICByZW50LFxuICAgICAgICBhdXRob3JfcGhvbmUsXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHBob3RvLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHByb2R1Y3RfaWQsXG4gICAgICAgIHByb3ZpbmNlVGV4dCxcbiAgICAgICAgZGlzdHJpY3RUZXh0LFxuICAgICAgICB3YXJkVGV4dCxcbiAgICAgIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcHJvZHVjdElkIH0gfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QudXBkYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCA/IGNhdGVnb3J5SWQgOiBwcm9kdWN0LmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgc3ViQ2F0ZWdvcnlJZDogc3ViQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBzdWJDYXRlZ29yeUlkXG4gICAgICAgICAgICAgICAgICA6IHByb2R1Y3Quc3ViQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZFxuICAgICAgICAgICAgICAgICAgPyBjaGlsZENhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5jaGlsZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBzbHVnOiBzbHVnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcGFyc2VJbnQoc3RhdHVzKSA/IFwiYWN0aXZlXCIgOiBcImluYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgYnJhbmQ6IGJyYW5kLFxuICAgICAgICAgICAgICAgIHVuaXRTaXplOiB1bml0U2l6ZSxcbiAgICAgICAgICAgICAgICBkZXNjOiBkZXNjLFxuICAgICAgICAgICAgICAgIGJ1eWVyUHJpY2U6IGJ1eWVyUHJpY2UsXG4gICAgICAgICAgICAgICAgcHJpY2U6IHByaWNlLFxuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50OiBkaXNjb3VudCxcbiAgICAgICAgICAgICAgICBkaXNjb3VudFBlcjogZGlzY291bnRQZXIsXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICAgIG5ldFByaWNlOiBuZXRQcmljZSxcbiAgICAgICAgICAgICAgICBwaG90bzogcGhvdG8sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgIHR5cGVSb29tLFxuICAgICAgICAgICAgICAgIGludGVyaW9yLFxuICAgICAgICAgICAgICAgIHNxdWFyZTogc3F1YXJlID8gc3F1YXJlIDogMCxcbiAgICAgICAgICAgICAgICBlbmRvdzogZW5kb3cgPyBlbmRvdyA6IDAsXG4gICAgICAgICAgICAgICAgcmF0aW5nOiByYXRpbmcgPyByYXRpbmcgOiAwLFxuICAgICAgICAgICAgICAgIG5vdGU6IG5vdGUgPyBub3RlIDogXCJcIixcbiAgICAgICAgICAgICAgICB1c2VyX21hbmFnZXI6IHVzZXJfbWFuYWdlciA/IHVzZXJfbWFuYWdlciA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcmVudDogcmVudCA/IHJlbnQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGF1dGhvcl9waG9uZTogYXV0aG9yX3Bob25lID8gYXV0aG9yX3Bob25lIDogXCJcIixcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzID8gYWRkcmVzcyA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJvdmluY2UsXG4gICAgICAgICAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgICAgICAgICAgd2FyZCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0X2lkOiBwcm9kdWN0X2lkID8gcHJvZHVjdF9pZCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJvdmluY2VUZXh0OiBwcm92aW5jZVRleHQgPyBwcm92aW5jZVRleHQgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGRpc3RyaWN0VGV4dDogZGlzdHJpY3RUZXh0ID8gZGlzdHJpY3RUZXh0IDogXCJcIixcbiAgICAgICAgICAgICAgICB3YXJkVGV4dDogd2FyZFRleHQgPyB3YXJkVGV4dCA6IFwiXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJOb3QgRm91bmQgUHJvZHVjdFwiLCA0MDkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihhc3luYyAocCkgPT4ge1xuICAgICAgICAgIGlmIChuZXdhZGRpbWFnZSkge1xuICAgICAgICAgICAgSlNPTi5wYXJzZShuZXdhZGRpbWFnZSk/Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaW1nVXJsOiBpdGVtPy5pbWFnZVVybCxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0c2l6ZS5kZXN0cm95KHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RzaXplLmJ1bGtDcmVhdGUoXG4gICAgICAgICAgICAgIEpTT04ucGFyc2Uoc2l6ZSkubWFwKCh7IHNpemUsIGFtb3VudCB9KSA9PiAoe1xuICAgICAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW1hZ2VzKSB7XG4gICAgICAgICAgICBhd2FpdCBkYi5wcm9kdWN0cGhvdG8uZGVzdHJveSh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHByb2R1Y3RJZDogcHJvZHVjdElkIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRiLnByb2R1Y3RwaG90by5idWxrQ3JlYXRlKFxuICAgICAgICAgICAgICBKU09OLnBhcnNlKGltYWdlcykubWFwKChpdGVtKSA9PiAoeyAuLi5pdGVtLCBwcm9kdWN0SWQgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJVcGRhdGVkIFN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlDbGllbnQocmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zdCB7ICBjYXRlZ29yeUlkLCBwYWdlU2l6ZT0gMTAgfSA9IHJlcS5xdWVyeTtcblxuICAgIGNvbnN0IHdoZXJlQ29uZGl0aW9ucyA9IHtcbiAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaOG7sWMgaGnhu4duIHRydXkgduG6pW4gZOG7ryBsaeG7h3UgduG7m2kgU2VxdWVsaXplXG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBmaWx0ZXJlZExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICAvLyBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIC8vIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xuXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgcmVzdWx0czogZmlsdGVyZWRMaXN0LFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgLy8gY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXG4gICAgICAgICAgdG90YWxJdGVtczogY291bnQsXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeUNsaWVudFdlYihyZXEsIHJlcywgbmV4dCkge1xuICAgIGNvbnN0IHsgIGNhdGVnb3J5SWQsIHBhZ2VTaXplPSAxMCwgc3ViQ2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcbiAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YkNhdGVnb3J5SWRcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRo4buxYyBoaeG7h24gdHJ1eSB24bqlbiBk4buvIGxp4buHdSB24bubaSBTZXF1ZWxpemVcbiAgICAgIGNvbnN0IHsgY291bnQsIHJvd3M6IGZpbHRlcmVkTGlzdCB9ID0gYXdhaXQgZGIucHJvZHVjdC5maW5kQW5kQ291bnRBbGwoe1xuICAgICAgICB3aGVyZTogd2hlcmVDb25kaXRpb25zLFxuICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnVzZXIsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImZpcnN0TmFtZVwiLCBcImxhc3ROYW1lXCJdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIC8vIGxpbWl0OiBwYWdlU2l6ZSxcbiAgICAgICAgLy8gb2Zmc2V0OiAocGFnZSAtIDEpICogcGFnZVNpemUsXG4gICAgICB9KTtcblxuICAgICAgLy8gVMOtbmggdG/DoW4gdOG7lW5nIHPhu5EgdHJhbmcgZOG7sWEgdHLDqm4gc+G7kSBsxrDhu6NuZyBk4buvIGxp4buHdSB2w6Aga8OtY2ggdGjGsOG7m2MgdHJhbmdcbiAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoY291bnQgLyBwYWdlU2l6ZSk7XG5cbiAgICAgIC8vIFRy4bqjIHbhu4Ega+G6v3QgcXXhuqMgduG7m2kgdGjDtG5nIHRpbiBwaMOibiB0cmFuZ1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICByZXN1bHRzOiBmaWx0ZXJlZExpc3QsXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAvLyBjdXJyZW50UGFnZTogcGFyc2VJbnQocGFnZSksXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgcHJvZHVjdHM6XCIsIGVycm9yKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0UHJvZHVjdExpc3RCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgY29uc3QgeyBzZWFyY2hUZXh0LCBpZCwgc3ViaWQsIHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDEwIH0gPSByZXEucXVlcnk7XG4gICAgbGV0IHNlYXJjaFRleHRWYWxpZFxuICAgIGlmKHNlYXJjaFRleHQ9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRleHQ9PSBudWxsKSB7XG4gICAgICAgIHNlYXJjaFRleHRWYWxpZD0gXCJcIlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VhcmNoVGV4dFZhbGlkPSBzZWFyY2hUZXh0XG4gICAgfVxuXG4gICAgY29uc3Qgd2hlcmVDb25kaXRpb25zID0ge1xuICAgICAgY2F0ZWdvcnlJZDogaWQsXG4gICAgICBzdWJDYXRlZ29yeUlkOiBzdWJpZCxcbiAgICAgIFtPcC5vcl06IFtcbiAgICAgICAgeyBwcm9kdWN0X2lkOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IG5hbWU6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgYWRkcmVzczogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyB3YXJkVGV4dDogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgICAgeyBkaXN0cmljdFRleHQ6IHsgW09wLnN1YnN0cmluZ106IHNlYXJjaFRleHRWYWxpZCB9IH0sXG4gICAgICAgIHsgcHJvdmluY2VUZXh0OiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7IHByaWNlOiB7IFtPcC5zdWJzdHJpbmddOiBzZWFyY2hUZXh0VmFsaWQgfSB9LFxuICAgICAgICB7XG4gICAgICAgICAgdXBkYXRlZEF0OiB7XG4gICAgICAgICAgICBbT3Auc3Vic3RyaW5nXTogbW9tZW50KHNlYXJjaFRleHRWYWxpZCwgXCJERC1NTS1ZWVlZIEhIOm1tOnNzXCIpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICAgIFtPcC5zdWJzdHJpbmddOiBtb21lbnQoc2VhcmNoVGV4dFZhbGlkLCBcIkRELU1NLVlZWVkgSEg6bW06c3NcIiksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBcIiR1c2VyLmZpcnN0TmFtZSRcIjogeyBbT3Auc3Vic3RyaW5nXTogc2VhcmNoVGV4dFZhbGlkIH0gfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaOG7sWMgaGnhu4duIHRydXkgduG6pW4gZOG7ryBsaeG7h3UgduG7m2kgU2VxdWVsaXplXG4gICAgICBjb25zdCB7IGNvdW50LCByb3dzOiBmaWx0ZXJlZExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFTDrW5oIHRvw6FuIHThu5VuZyBz4buRIHRyYW5nIGThu7FhIHRyw6puIHPhu5EgbMaw4bujbmcgZOG7ryBsaeG7h3UgdsOgIGvDrWNoIHRoxrDhu5tjIHRyYW5nXG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xuXG4gICAgICAvLyBUcuG6oyB24buBIGvhur90IHF14bqjIHbhu5tpIHRow7RuZyB0aW4gcGjDom4gdHJhbmdcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgZGF0YTogZmlsdGVyZWRMaXN0LFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhcnNlSW50KHBhZ2UpLFxuICAgICAgICAgIHBhZ2VTaXplOiBwYXJzZUludChwYWdlU2l6ZSksXG4gICAgICAgICAgdG90YWxJdGVtczogY291bnQsXG4gICAgICAgICAgdG90YWxQYWdlczogdG90YWxQYWdlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIiB9KTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlGaWx0ZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBpZCxcbiAgICAgICAgc3ViaWQsXG4gICAgICAgIHR5cGVSb29tLFxuICAgICAgICByZW50LFxuICAgICAgICBzcXVhcmUsXG4gICAgICAgIHByaWNlLFxuICAgICAgICBwcm92aW5jZSxcbiAgICAgICAgZGlzdHJpY3QsXG4gICAgICAgIHdhcmQsXG4gICAgICAgIHN0YXIsXG4gICAgICAgIHBhZ2VTaXplID0gMTAsXG4gICAgICAgIHBhZ2UsXG4gICAgICB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgbGV0IHdoZXJlQ29uZGl0aW9ucyA9IHtcbiAgICAgICAgY2F0ZWdvcnlJZDogaWQsXG4gICAgICAgIHN1YkNhdGVnb3J5SWQ6IHN1YmlkLFxuICAgICAgfTtcbiAgICAgIGlmIChpZCA9PSAxMykge1xuICAgICAgICBpZiAodHlwZVJvb20pIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZW50ICE9PSB1bmRlZmluZWQgJiYgcmVudC50b1N0cmluZygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHJlbnQpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5yZW50ID0geyBbT3Aub3JdOiBbMCwgZmFsc2VdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IHsgW09wLm9yXTogWzEsIHRydWVdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucmVudCA9IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcXVhcmUpIHtcbiAgICAgICAgICBzd2l0Y2ggKHBhcnNlSW50KHNxdWFyZSkpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnNxdWFyZSA9IHsgW09wLmJldHdlZW5dOiBbMCwgMjBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuYmV0d2Vlbl06IFsyMCwgNDBdIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuc3F1YXJlID0geyBbT3AuZ3RlXTogNDAgfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlKSB7XG4gICAgICAgICAgc3dpdGNoIChwYXJzZUludChwcmljZSkpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFswLCAxMDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFsxMDAwMDAwLCAzMDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFszMDAwMDAwLCA1MDAwMDAwXSB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgd2hlcmVDb25kaXRpb25zLnByaWNlID0geyBbT3AuYmV0d2Vlbl06IFs1MDAwMDAwLCAxMDAwMDAwMF0gfTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcmljZSA9IHsgW09wLmd0ZV06IDEwMDAwMDAwIH07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm92aW5jZSkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5wcm92aW5jZSA9IHByb3ZpbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc3RyaWN0KSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLmRpc3RyaWN0ID0gZGlzdHJpY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpZCA9PSAxMikge1xuICAgICAgICBpZiAodHlwZVJvb20pIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFyKSB7XG4gICAgICAgICAgd2hlcmVDb25kaXRpb25zLnJhdGluZyA9IHN0YXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvdmluY2UpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXN0cmljdCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5kaXN0cmljdCA9IGRpc3RyaWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdhcmQpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMud2FyZCA9IHdhcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpZCA9PSAxMikge1xuICAgICAgICBpZiAodHlwZVJvb20pIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMudHlwZVJvb20gPSB0eXBlUm9vbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3Rhcikge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy5zdGFyID0gc3RhcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvdmluY2UpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMucHJvdmluY2UgPSBwcm92aW5jZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzdHJpY3QpIHtcbiAgICAgICAgICB3aGVyZUNvbmRpdGlvbnMuZGlzdHJpY3QgPSBkaXN0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2FyZCkge1xuICAgICAgICAgIHdoZXJlQ29uZGl0aW9ucy53YXJkID0gd2FyZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgeyBjb3VudCwgcm93czogcHJvZHVjdExpc3QgfSA9IGF3YWl0IGRiLnByb2R1Y3QuZmluZEFuZENvdW50QWxsKHtcbiAgICAgICAgd2hlcmU6IHdoZXJlQ29uZGl0aW9ucyxcbiAgICAgICAgb3JkZXI6IFtbXCJERVNDXCJdXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYi51c2VyLFxuICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBsaW1pdDogcGFnZVNpemUsXG4gICAgICAgIG9mZnNldDogKHBhZ2UgLSAxKSAqIHBhZ2VTaXplLFxuICAgICAgfSk7XG4gICAgICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKGNvdW50IC8gcGFnZVNpemUpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgZGF0YTogcHJvZHVjdExpc3QsXG4gICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICBjdXJyZW50UGFnZTogcGFyc2VJbnQocGFnZSksXG4gICAgICAgICAgcGFnZVNpemU6IHBhcnNlSW50KHBhZ2VTaXplKSxcbiAgICAgICAgICB0b3RhbEl0ZW1zOiBjb3VudCxcbiAgICAgICAgICB0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBnZXRQcm9kdWN0U3VnZ2VzdEhvdGVsKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEyLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0QXBhcnRtZW50KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIG9yZGVyOiBbW1wiREVTQ1wiXV0sXG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IDEzLFxuICAgICAgICAgICAgLy8gc3ViQ2F0ZWdvcnlJZDogcmVxLnF1ZXJ5LnN1YkNhdGVnb3J5SWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgICBsaW1pdDogNCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0MihyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICBvcmRlcjogW1tcIkRFU0NcIl1dLFxuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBlbmRvdzogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH1dLFxuICAgICAgICAgIGxpbWl0OiA0LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgb2s6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RMaXN0QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtb2RlbDogZGIudXNlcixcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJmaXJzdE5hbWVcIiwgXCJsYXN0TmFtZVwiXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRXZWJQcm9kdWN0TGlzdEJ5SWQocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2l6ZSA9IGF3YWl0IGRiLnByb2R1Y3RzaXplLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IHJlcS5xdWVyeS5pZCB9LFxuICAgICAgfSk7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0sXG4gICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfV0sXG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGxpc3QsIGRhdGFzaXplOiBzaXplIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuICBhc3luYyBhZGRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBwcm9kdWN0SWQsIHF0eSwgZGlzY291bnRfcGVyLCBkaXNjb3VudF9wcmljZSwgdG90YWwsIG5ldF9wcmljZSB9ID1cbiAgICAgICAgcmVxLmJvZHk7XG4gICAgICBkYi5Qcm9kdWN0T2ZmZXIuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSB9KVxuICAgICAgICAudGhlbigobGlzdCkgPT4ge1xuICAgICAgICAgIGlmICghbGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLlByb2R1Y3RPZmZlci5jcmVhdGUoe1xuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcbiAgICAgICAgICAgICAgaW1hZ2U6IHJlcS5maWxlID8gcmVxLmZpbGUubG9jYXRpb24gOiBcIlwiLFxuICAgICAgICAgICAgICBxdHk6IHF0eSxcbiAgICAgICAgICAgICAgZGlzY291bnRfcGVyOiBkaXNjb3VudF9wZXIsXG4gICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgICBuZXRfcHJpY2U6IG5ldF9wcmljZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLnVwZGF0ZShcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHF0eTogcXR5LFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3BlcjogZGlzY291bnRfcGVyLFxuICAgICAgICAgICAgICAgIGRpc2NvdW50X3ByaWNlOiBkaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICAgICAgbmV0X3ByaWNlOiBuZXRfcHJpY2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgd2hlcmU6IHsgaWQ6IGxpc3QuaWQgfSB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHApID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBnZXRQcm9kdWN0T2ZmZXIocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRBbGwoe1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgIFwiaWRcIixcbiAgICAgICAgICAgICAgXCJjYXRlZ29yeUlkXCIsXG4gICAgICAgICAgICAgIFwicHJpY2VcIixcbiAgICAgICAgICAgICAgXCJpdGVtX25hbWVcIixcbiAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgICAgICBcImJyYW5kXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKChsaXN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIHNlYXJjaFByb2R1Y3RCeVN1YkNhdChyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgc3ViX25hbWU6IHJlcS5ib2R5LnN1YkNhdCB9LFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRiLnByb2R1Y3QuZmluZEFsbCh7XG4gICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IGRhdGEuaWQgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdERlbGV0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IHByb2R1Y3QuaWQgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiUHJvZHVjdCBpcyBub3QgZm91bmRcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG4gIGFzeW5jIHByb2R1Y3REZWxldGVCdWxrKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIucHJvZHVjdFxuICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLmJvZHkubGlzdCB9IH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAgIC5qc29uKHsgb2s6IHRydWUsIHN0YXR1czogXCJkZWxldGVkIFByb2R1Y3QgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbmV4dChlcnIpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgcHJvZHVjdE9mZmVyRGVsZXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgZGIuUHJvZHVjdE9mZmVyLmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnBhcmFtcy5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIuUHJvZHVjdE9mZmVyLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcHJvZHVjdC5pZCB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJQcm9kdWN0IGlzIG5vdCBmb3VuZFwiKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigocmUpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiBcImRlbGV0ZWQgUHJvZHVjdCBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBuZXh0KGVycik7XG4gICAgICB9KTtcbiAgfSxcblxuICBhc3luYyBtdWx0aXBsZVBob3RvVXBsb2FkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgbGV0IGF0dGFjaG1lbnRFbnRyaWVzID0gW107XG4gICAgdmFyIHByb2R1Y3RJZCA9IHJlcS5ib2R5LnByb2R1Y3RJZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0YWNobWVudEVudHJpZXMucHVzaCh7XG4gICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxuICAgICAgICBuYW1lOiByZXEuZmlsZXNbaV0uZmlsZW5hbWUsXG4gICAgICAgIG1pbWU6IHJlcS5maWxlc1tpXS5taW1ldHlwZSxcbiAgICAgICAgaW1nVXJsOiByZXEuZmlsZXNbaV0ucGF0aCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRiLnByb2R1Y3RcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgLy8gcmV0dXJuIHF1ZXVlLmNyZWF0ZSgnaW1nLXVwbG9hZCcsIHtcbiAgICAgICAgICAvLyAgICAgcHJvZHVjdElkOiBwcm9kdWN0SWQsXG4gICAgICAgICAgLy8gICAgIHByb2R1Y3ROYW1lOiByLml0ZW1fbmFtZSxcbiAgICAgICAgICAvLyAgICAgYXR0YWNobWVudEVudHJpZXM6IGF0dGFjaG1lbnRFbnRyaWVzLFxuICAgICAgICAgIC8vIH0pLnNhdmUoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcS5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGIucHJvZHVjdHBob3RvLmNyZWF0ZSh7IC4uLmF0dGFjaG1lbnRFbnRyaWVzW2ldIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVxLmZpbGVzIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yczogW1wiRXJyb3IgaW5zZXJ0IHBob3RvXCJdIH0pO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgYXN5bmMgZ2V0QWxsUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgb3JkZXI6IFtbXCJjcmVhdGVkQXRcIiwgXCJERVNDXCJdXSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIiwgXCJicmFuZFwiXSxcbiAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIucHJvZHVjdHBob3RvLCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcImltZ1VybFwiXSB9XSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZGVsZXRlU2xpZGVyUGhvdG8ocmVxLCByZXMsIG5leHQpIHtcbiAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgIC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gZGIucHJvZHVjdHBob3RvLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogcmVxLnF1ZXJ5LmlkIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIlByb2R1Y3QgaXMgbm90IGZvdW5kXCIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChyZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdGF0dXM6IFwiZGVsZXRlZCBQcm9kdWN0IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIG5leHQoZXJyKTtcbiAgICAgIH0pO1xuICB9LFxuICAvL0FsbCBHcm9jZXJ5U3RhbXBsZSBwcm9kdWN0XG4gIC8vIGVkaXQgdG8gc2FsZSBwcm9kdWN0XG4gIGFzeW5jIGdldEFsbEdyb2NlcnJ5U3RhcGxlcyhyZXEsIHJlcywgbmV4dCkge1xuICAgIHRyeSB7XG4gICAgICBkYi5wcm9kdWN0XG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICAvLyBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInNsdWdcIl0sXG4gICAgICAgICAgLy8gd2hlcmU6IHsgZGlzY291bnQ6ICdncm9jZXJ5LXN0YXBsZScgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImRpc2NvdW50UGVyXCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgbGltaXQ6IDgsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IHx8IFtdIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIGFzeW5jIGdldEFsbFByb2R1Y3RCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgZGIuY2F0ZWdvcnlcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCJdLFxuICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICAgIG9yZGVyOiBbW1wiY3JlYXRlZEF0XCIsIFwiREVTQ1wiXV0sXG4gICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICB7IG1vZGVsOiBkYi5wcm9kdWN0cGhvdG8sIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwiaW1nVXJsXCJdIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIGZpbHRlciBwcm9kdWN0XG5cbiAgYXN5bmMgZ2V0RmlsdGVyYnlQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZWFyY2ggPSBcIiUlXCI7XG4gICAgICBpZiAocmVxLnF1ZXJ5LnNlYXJjaCkge1xuICAgICAgICBzZWFyY2ggPSBcIiVcIiArIHJlcS5xdWVyeS5zZWFyY2ggKyBcIiVcIjtcbiAgICAgIH1cbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsXG4gICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgICBbT3Aub3JdOiBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHNsdWc6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcblxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpO1xuICAgIH1cbiAgfSxcblxuICBhc3luYyBHZXRBbGxCeUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICB3aGVyZTogeyBzdWJfbmFtZTogcmVxLmJvZHkubmFtZSB9LFxuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnksXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCxcbiAgICAgICAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IGRiLnByb2R1Y3RwaG90bywgYXR0cmlidXRlczogW1wiaWRcIiwgXCJpbWdVcmxcIl0gfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoXCJFcnJvclwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gYXdzIGltYWdlIGRlbGV0ZVxuICBhc3luYyBhd3NQcm9kdWN0UGhvdG9EZWxldGUocmVxLCByZXMsIG5leHQpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCwgaW1nVXJsIH0gPSByZXEuYm9keTtcbiAgICAgIC8vIGRiLnByb2R1Y3RwaG90by5kZXN0cm95KHt3aGVyZToge2ltZ1VybCwgaWR9fSlcbiAgICAgIC8vIGRlbGV0ZUZpbGVGcm9tUzMoaW1nVXJsKVxuXG4gICAgICBkYi5wcm9kdWN0cGhvdG9cbiAgICAgICAgLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuXG4gICAgICAgIC50aGVuKChzdWNjZXNzKSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIG1zZzogXCJTdWNjZXNzZmxseSBkZWxldGVkIGltYWdlIGZyb20gczMgQnVja2V0XCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgZ2V0UHJvZHVjdFN1YkNoaWxkQ2F0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgc3ViQ2F0ZWdvcnlJZCwgY2hpbGRDYXRlZ29yeUlkIH0gPSByZXEuYm9keTtcbiAgICAgIGRiLnByb2R1Y3RcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBjaGlsZENhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICAgIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFByb2R1Y3RTdWdnZXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0eyBzdWJDYXRlZ29yeUlkLCBjaGlsZENhdGVnb3J5SWQgfSA9IHJlcS5ib2R5O1xuICAgICAgZGIucHJvZHVjdFxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgLy8gd2hlcmU6IHsgY2hpbGRDYXRlZ29yeUlkOiBjaGlsZENhdGVnb3J5SWQsIHN1YkNhdGVnb3J5SWQ6IGNoaWxkQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgIG9yZGVyOiBTZXF1ZWxpemUubGl0ZXJhbChcIlJBTkQoKVwiKSxcbiAgICAgICAgICBsaW1pdDogOCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgICAgLy8gcmVzLnN0YXR1cyg1MDApLmpzb24oeyAnc3VjY2Vzcyc6ZmFsc2UsIG1zZzogZXJyfSlcbiAgICB9XG4gIH0sXG4gIGFzeW5jIGdldFNpemVQcm9kdWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvZHVjdElkIH0gPSByZXEucXVlcnk7XG4gICAgICBkYi5wcm9kdWN0c2l6ZVxuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcHJvZHVjdElkIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgbmV4dChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIG5leHQoZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1zZzogZXJyIH0pO1xuICAgIH1cbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFFQSxJQUFBQyxPQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFBNEIsU0FBQUcsUUFBQUMsTUFBQSxFQUFBQyxjQUFBLFFBQUFDLElBQUEsR0FBQUMsTUFBQSxDQUFBRCxJQUFBLENBQUFGLE1BQUEsT0FBQUcsTUFBQSxDQUFBQyxxQkFBQSxRQUFBQyxPQUFBLEdBQUFGLE1BQUEsQ0FBQUMscUJBQUEsQ0FBQUosTUFBQSxHQUFBQyxjQUFBLEtBQUFJLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxNQUFBLFdBQUFDLEdBQUEsV0FBQUosTUFBQSxDQUFBSyx3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