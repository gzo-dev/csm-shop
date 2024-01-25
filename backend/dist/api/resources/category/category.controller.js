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
var _require = require("sequelize"),
  Op = _require.Op;
var _default = {
  /* Add user api start here................................*/addCategory: function addCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _req$body, name, slug;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, slug = _req$body.slug;
            _models.db.category.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                return _models.db.category.update({
                  slug: slug
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              return _models.db.category.create({
                name: name,
                slug: slug
              });
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context.next = 8;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5]]);
    }))();
  },
  addSubCategory: function addSubCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body2, categoryId, sub_name;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, categoryId = _req$body2.categoryId, sub_name = _req$body2.sub_name;
            _models.db.SubCategory.findOne({
              where: {
                sub_name: sub_name
              }
            }).then(function (data) {
              if (data) {
                throw new RequestError('Category already exist', 409);
              }
              return _models.db.SubCategory.create({
                categoryId: categoryId,
                sub_name: sub_name
              });
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context2.next = 8;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 5]]);
    }))();
  },
  addSubChildCategory: function addSubChildCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _req$body3, categoryId, subcategoryId, name;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, categoryId = _req$body3.categoryId, subcategoryId = _req$body3.subcategoryId, name = _req$body3.name;
            _models.db.SubChildCategory.findOne({
              where: {
                name: name
              }
            }).then(function (data) {
              if (data) {
                throw new RequestError('Category already exist', 409);
              }
              return _models.db.SubChildCategory.create({
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                name: name
              });
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully inserted category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context3.next = 8;
            break;
          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 5]]);
    }))();
  },
  updateCategory: function updateCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _req$body4, childcategoryId, subcategoryId, sub_name, name;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body4 = req.body, childcategoryId = _req$body4.childcategoryId, subcategoryId = _req$body4.subcategoryId, sub_name = _req$body4.sub_name, name = _req$body4.name;
            _models.db.SubCategory.findOne({
              where: {
                id: subcategoryId
              }
            }).then(function (data) {
              if (data) {
                return _models.db.SubCategory.update({
                  sub_name: sub_name
                }, {
                  where: {
                    id: subcategoryId
                  }
                });
              }
              throw new RequestError('Category Not Found', 409);
            });
            _models.db.SubChildCategory.findOne({
              where: {
                id: childcategoryId
              }
            }).then(function (data) {
              if (data) {
                return _models.db.SubChildCategory.update({
                  name: name
                }, {
                  where: {
                    id: childcategoryId
                  }
                });
              }
              throw new RequestError('Category Not Found', 409);
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully Updated"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context4.next = 9;
            break;
          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            throw new RequestError('Error');
          case 9:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 6]]);
    }))();
  },
  getCategoryList: function getCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _models.db.category.findAll({
              attributes: ["id", "name"],
              include: [{
                model: _models.db.SubCategory
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context5.next = 7;
            break;
          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 4]]);
    }))();
  },
  getCategoryListHeader: function getCategoryListHeader(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _models.db.category.findAll({
              limit: 3
            }).then(function (list) {
              return res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (e) {
              return next(e);
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
  getSubCategoryList: function getSubCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _models.db.SubCategory.findAll({
              where: {
                categoryId: req.query.categoryId
              },
              include: [{
                model: _models.db.category,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
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
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 4]]);
    }))();
  },
  getSubChildCategoryList: function getSubChildCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var subcategoryId;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            subcategoryId = req.query.subcategoryId;
            _models.db.SubChildCategory.findAll({
              where: {
                subcategoryId: subcategoryId
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context8.next = 8;
            break;
          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 5]]);
    }))();
  },
  getList: function getList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _models.db.SubChildCategory.findAll({
              include: [{
                model: _models.db.category,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
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
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 4]]);
    }))();
  },
  getCategoryById: function getCategoryById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var categoryId;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            categoryId = req.query.categoryId;
            _models.db.SubChildCategory.findAll({
              where: {
                categoryId: categoryId
              },
              include: [{
                model: _models.db.SubCategory,
                attributes: ['id', 'sub_name'],
                include: [{
                  model: _models.db.category,
                  attributes: ["id", "name"]
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 8;
            break;
          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 5]]);
    }))();
  },
  // category list
  getMainList: function getMainList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _models.db.category.findAll().then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              console.log(err);
              next(err);
            });
            _context11.next = 7;
            break;
          case 4:
            _context11.prev = 4;
            _context11.t0 = _context11["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 4]]);
    }))();
  },
  getMainListUpdate: function getMainListUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var _req$body5, id, name, slug;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _req$body5 = req.body, id = _req$body5.id, name = _req$body5.name, slug = _req$body5.slug;
            _models.db.category.findOne({
              where: {
                id: id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.category.update({
                  name: name,
                  slug: slug
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              throw new RequestError('Category is not found');
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully Updated category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context12.next = 8;
            break;
          case 5:
            _context12.prev = 5;
            _context12.t0 = _context12["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 5]]);
    }))();
  },
  // Sub category list
  getSubCategory: function getSubCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _models.db.SubCategory.findAll({
              include: [{
                model: _models.db.category,
                attributes: ["id", "name"]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
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
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 4]]);
    }))();
  },
  getSubCatListUpdate: function getSubCatListUpdate(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
      var _req$body6, id, sub_name;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _req$body6 = req.body, id = _req$body6.id, sub_name = _req$body6.sub_name;
            _models.db.SubCategory.findOne({
              where: {
                id: id
              }
            }).then(function (data) {
              if (data) {
                return _models.db.SubCategory.update({
                  sub_name: sub_name
                }, {
                  where: {
                    id: data.id
                  }
                });
              }
              throw new RequestError('Sub_Category is not found');
            }).then(function (category) {
              res.status(200).json({
                'success': true,
                msg: "Successfully Updated Sub_Category"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context14.next = 8;
            break;
          case 5:
            _context14.prev = 5;
            _context14.t0 = _context14["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 5]]);
    }))();
  },
  getDeletedSubCatList: function getDeletedSubCatList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _models.db.SubCategory.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (list) {
              if (list) {
                return _models.db.SubCategory.destroy({
                  where: {
                    id: list.id
                  }
                });
              }
              throw new RequestError('Id is not found');
            }).then(function (re) {
              return res.status(200).json({
                'msg': 'success',
                'status': "deleted Sub_Category Seccessfully"
              });
            })["catch"](function (err) {
              next(err);
            });
            _context15.next = 7;
            break;
          case 4:
            _context15.prev = 4;
            _context15.t0 = _context15["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 4]]);
    }))();
  },
  //child category 
  deleteCategory: function deleteCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _models.db.category.findOne({
              where: {
                id: parseInt(req.query.id)
              }
            }).then(function (data) {
              if (data) {
                return _models.db.category.destroy({
                  where: {
                    id: data.id
                  }
                }).then(function (r) {
                  return [r, data];
                });
              }
              throw new RequestError('child_category is not found');
            }).then(function (re) {
              return res.status(200).json({
                'status': "deleted category Seccessfully"
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
  getAllCategoryBySlug: function getAllCategoryBySlug(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _models.db.category.findOne({
              include: [{
                model: _models.db.SubCategory,
                include: [{
                  model: _models.db.SubChildCategory
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
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
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 4]]);
    }))();
  },
  filterByCategoryList: function filterByCategoryList(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _models.db.product.findAll({
              where: {
                childCategoryId: req.params.id
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
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
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 4]]);
    }))();
  },
  getFilterbyCategory: function getFilterbyCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var _req$body7, id, name;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _req$body7 = req.body, id = _req$body7.id, name = _req$body7.name;
            _models.db.SubCategory.findOne({
              attributes: ["id", "sub_name"],
              where: {
                id: id,
                sub_name: name
              },
              include: [{
                model: _models.db.SubChildCategory
              }]
            }).then(function (product) {
              res.status(200).json({
                'success': true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context19.next = 8;
            break;
          case 5:
            _context19.prev = 5;
            _context19.t0 = _context19["catch"](0);
            throw new RequestError('Error');
          case 8:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 5]]);
    }))();
  },
  getProductBySubcategory: function getProductBySubcategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var _req$body8, id, name, search;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _req$body8 = req.body, id = _req$body8.id, name = _req$body8.name;
            search = '%%';
            if (name) {
              search = '%' + name + '%';
            }
            _models.db.SubCategory.findAll({
              attributes: ["id", "sub_name"],
              include: [{
                model: _models.db.product,
                order: [['createdAt', 'DESC']],
                required: true,
                where: (0, _defineProperty2["default"])({}, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, search),
                  subCategoryId: id
                }])
              }]
            }).then(function (product) {
              res.status(200).json({
                'success': true,
                data: product
              });
            })["catch"](function (err) {
              next(err);
            });
            _context20.next = 10;
            break;
          case 7:
            _context20.prev = 7;
            _context20.t0 = _context20["catch"](0);
            throw new RequestError('Error');
          case 10:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 7]]);
    }))();
  },
  //mobile
  getAllMobileCategory: function getAllMobileCategory(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _models.db.category.findAll({
              attributes: ["id", "name"],
              include: [{
                model: _models.db.SubCategory,
                include: [{
                  model: _models.db.SubChildCategory
                }]
              }]
            }).then(function (list) {
              res.status(200).json({
                'success': true,
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
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 4]]);
    }))();
  },
  getAllSubCategoryById: function getAllSubCategoryById(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            _models.db.product.findAll({
              where: {
                subCategoryId: req.body.subId
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context22.next = 7;
            break;
          case 4:
            _context22.prev = 4;
            _context22.t0 = _context22["catch"](0);
            throw new RequestError('Error');
          case 7:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 4]]);
    }))();
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9yZXF1aXJlIiwiT3AiLCJfZGVmYXVsdCIsImFkZENhdGVnb3J5IiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwibmFtZSIsInNsdWciLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwiZGIiLCJjYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJkYXRhIiwidXBkYXRlIiwiaWQiLCJjcmVhdGUiLCJzdGF0dXMiLCJqc29uIiwibXNnIiwiZXJyIiwidDAiLCJSZXF1ZXN0RXJyb3IiLCJzdG9wIiwiYWRkU3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMiIsIl9yZXEkYm9keTIiLCJjYXRlZ29yeUlkIiwic3ViX25hbWUiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJTdWJDYXRlZ29yeSIsImFkZFN1YkNoaWxkQ2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkYm9keTMiLCJzdWJjYXRlZ29yeUlkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiU3ViQ2hpbGRDYXRlZ29yeSIsInVwZGF0ZUNhdGVnb3J5IiwiX2NhbGxlZTQiLCJfcmVxJGJvZHk0IiwiY2hpbGRjYXRlZ29yeUlkIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZ2V0Q2F0ZWdvcnlMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImluY2x1ZGUiLCJtb2RlbCIsImxpc3QiLCJnZXRDYXRlZ29yeUxpc3RIZWFkZXIiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpbWl0IiwiZSIsImdldFN1YkNhdGVnb3J5TGlzdCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwicXVlcnkiLCJnZXRTdWJDaGlsZENhdGVnb3J5TGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0TGlzdCIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZ2V0Q2F0ZWdvcnlCeUlkIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJnZXRNYWluTGlzdCIsIl9jYWxsZWUxMSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiY29uc29sZSIsImxvZyIsImdldE1haW5MaXN0VXBkYXRlIiwiX2NhbGxlZTEyIiwiX3JlcSRib2R5NSIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0U3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImdldFN1YkNhdExpc3RVcGRhdGUiLCJfY2FsbGVlMTQiLCJfcmVxJGJvZHk2IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJnZXREZWxldGVkU3ViQ2F0TGlzdCIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyc2VJbnQiLCJkZXN0cm95IiwicmUiLCJkZWxldGVDYXRlZ29yeSIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiciIsImdldEFsbENhdGVnb3J5QnlTbHVnIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJmaWx0ZXJCeUNhdGVnb3J5TGlzdCIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwicHJvZHVjdCIsImNoaWxkQ2F0ZWdvcnlJZCIsInBhcmFtcyIsImdldEZpbHRlcmJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMTkiLCJfcmVxJGJvZHk3IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRQcm9kdWN0QnlTdWJjYXRlZ29yeSIsIl9jYWxsZWUyMCIsIl9yZXEkYm9keTgiLCJzZWFyY2giLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIm9yZGVyIiwicmVxdWlyZWQiLCJfZGVmaW5lUHJvcGVydHkyIiwib3IiLCJsaWtlIiwic3ViQ2F0ZWdvcnlJZCIsImdldEFsbE1vYmlsZUNhdGVnb3J5IiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJnZXRBbGxTdWJDYXRlZ29yeUJ5SWQiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInN1YklkIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2NhdGVnb3J5L2NhdGVnb3J5LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuY29uc3QgeyBPcCB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG5cbiAgICBhc3luYyBhZGRDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBzbHVnIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS51cGRhdGUoeyBzbHVnOiBzbHVnIH0sIHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS5jcmVhdGUoeyBuYW1lOiBuYW1lLCBzbHVnOiBzbHVnIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgYXN5bmMgYWRkU3ViQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViX25hbWUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBhbHJlYWR5IGV4aXN0JywgNDA5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkuY3JlYXRlKHsgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCwgc3ViX25hbWU6IHN1Yl9uYW1lIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGFkZFN1YkNoaWxkQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViY2F0ZWdvcnlJZCwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IGFscmVhZHkgZXhpc3QnLCA0MDkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDaGlsZENhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQ6IHN1YmNhdGVnb3J5SWQsIG5hbWU6IG5hbWUgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGNhdGVnb3J5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgY2F0ZWdvcnlcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyB1cGRhdGVDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQsIHN1Yl9uYW1lLCBuYW1lIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogc3ViY2F0ZWdvcnlJZCB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkudXBkYXRlKHsgc3ViX25hbWU6IHN1Yl9uYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IHN1YmNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IE5vdCBGb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRiLlN1YkNoaWxkQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBjaGlsZGNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNoaWxkQ2F0ZWdvcnkudXBkYXRlKHsgbmFtZTogbmFtZSB9LCB7IHdoZXJlOiB7IGlkOiBjaGlsZGNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IE5vdCBGb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWRcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnkgfV0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldENhdGVnb3J5TGlzdEhlYWRlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgbGltaXQ6IDNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihsaXN0PT4gcmVzLnN0YXR1cygyMDApLmpzb24oeydzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdH0pKVxuICAgICAgICAgICAgLmNhdGNoKGU9PiBuZXh0KGUpKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRTdWJDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRTdWJDaGlsZENhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBzdWJjYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHN1YmNhdGVnb3J5SWQ6IHN1YmNhdGVnb3J5SWQgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0Q2F0ZWdvcnlCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlJZCA9IHJlcS5xdWVyeS5jYXRlZ29yeUlkO1xuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbJ2lkJywgJ3N1Yl9uYW1lJ10sIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gY2F0ZWdvcnkgbGlzdFxuICAgIGFzeW5jIGdldE1haW5MaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKClcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0TWFpbkxpc3RVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIG5hbWUsIHNsdWcgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY2F0ZWdvcnkudXBkYXRlKHsgbmFtZTogbmFtZSwgc2x1Zzogc2x1ZyB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBVcGRhdGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBTdWIgY2F0ZWdvcnkgbGlzdFxuICAgIGFzeW5jIGdldFN1YkNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnZXRTdWJDYXRMaXN0VXBkYXRlKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCBzdWJfbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDYXRlZ29yeS51cGRhdGUoeyBzdWJfbmFtZTogc3ViX25hbWUgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignU3ViX0NhdGVnb3J5IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWQgU3ViX0NhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldERlbGV0ZWRTdWJDYXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogbGlzdC5pZCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignSWQgaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ21zZyc6ICdzdWNjZXNzJywgJ3N0YXR1cyc6IFwiZGVsZXRlZCBTdWJfQ2F0ZWdvcnkgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vY2hpbGQgY2F0ZWdvcnkgXG4gICAgYXN5bmMgZGVsZXRlQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KS50aGVuKHIgPT4gW3IsIGRhdGFdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdjaGlsZF9jYXRlZ29yeSBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIGNhdGVnb3J5IFNlY2Nlc3NmdWxseVwiIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFzeW5jIGdldEFsbENhdGVnb3J5QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5IH1dIH1dXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBmaWx0ZXJCeUNhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IHJlcS5wYXJhbXMuaWQgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRGaWx0ZXJieUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgeyBpZCwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kT25lKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBpZCwgc3ViX25hbWU6IG5hbWUgfSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldFByb2R1Y3RCeVN1YmNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgeyBpZCwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBsZXQgc2VhcmNoID0gJyUlJztcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoID0gJyUnICsgbmFtZSArICclJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3tcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGRiLnByb2R1Y3QsIG9yZGVyOiBbWydjcmVhdGVkQXQnLCAnREVTQyddXSwgcmVxdWlyZWQ6IHRydWUsIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBbT3Aub3JdOiBbeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHN1YkNhdGVnb3J5SWQ6IGlkIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL21vYmlsZVxuICAgIGFzeW5jIGdldEFsbE1vYmlsZUNhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LCBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSB9XSB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEFsbFN1YkNhdGVnb3J5QnlJZChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIucHJvZHVjdC5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBzdWJDYXRlZ29yeUlkOiByZXEuYm9keS5zdWJJZCB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxufVxuXG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLFFBQUEsR0FBZUQsT0FBTyxDQUFDLFdBQVcsQ0FBQztFQUEzQkUsRUFBRSxHQUFBRCxRQUFBLENBQUZDLEVBQUU7QUFBMEIsSUFBQUMsUUFBQSxHQUVyQjtFQUVYLDREQUVNQyxXQUFXLFdBQUFBLFlBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxTQUFBLEVBQUFDLElBQUEsRUFBQUMsSUFBQTtNQUFBLE9BQUFMLFlBQUEsWUFBQU0sSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFWLElBQUE7VUFBQTtZQUFBVSxRQUFBLENBQUFDLElBQUE7WUFBQU4sU0FBQSxHQUVIUCxHQUFHLENBQUNjLElBQUksRUFBdkJOLElBQUksR0FBQUQsU0FBQSxDQUFKQyxJQUFJLEVBQUVDLElBQUksR0FBQUYsU0FBQSxDQUFKRSxJQUFJO1lBQ2xCTSxVQUFFLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDO2NBQUVDLEtBQUssRUFBRTtnQkFBRVYsSUFBSSxFQUFFQTtjQUFLO1lBQUUsQ0FBQyxDQUFDLENBQ3pDVyxJQUFJLENBQUMsVUFBQUMsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU9MLFVBQUUsQ0FBQ0MsUUFBUSxDQUFDSyxNQUFNLENBQUM7a0JBQUVaLElBQUksRUFBRUE7Z0JBQUssQ0FBQyxFQUFFO2tCQUFFUyxLQUFLLEVBQUU7b0JBQUVJLEVBQUUsRUFBRUYsSUFBSSxDQUFDRTtrQkFBRztnQkFBRSxDQUFDLENBQUM7Y0FDekU7Y0FDQSxPQUFPUCxVQUFFLENBQUNDLFFBQVEsQ0FBQ08sTUFBTSxDQUFDO2dCQUFFZixJQUFJLEVBQUVBLElBQUk7Z0JBQUVDLElBQUksRUFBRUE7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQ0RVLElBQUksQ0FBQyxVQUFBSCxRQUFRLEVBQUk7Y0FDZGYsR0FBRyxDQUFDdUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVDLEdBQUcsRUFBRTtjQUFpQyxDQUFDLENBQUM7WUFDcEYsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVQyxHQUFHLEVBQUU7Y0FDbEJ6QixJQUFJLENBQUN5QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFBQ2YsUUFBQSxDQUFBVixJQUFBO1lBQUE7VUFBQTtZQUFBVSxRQUFBLENBQUFDLElBQUE7WUFBQUQsUUFBQSxDQUFBZ0IsRUFBQSxHQUFBaEIsUUFBQTtZQUFBLE1BR0QsSUFBSWlCLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWpCLFFBQUEsQ0FBQWtCLElBQUE7UUFBQTtNQUFBLEdBQUF4QixPQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUdLeUIsY0FBYyxXQUFBQSxlQUFDL0IsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTJCLFNBQUE7TUFBQSxJQUFBQyxVQUFBLEVBQUFDLFVBQUEsRUFBQUMsUUFBQTtNQUFBLE9BQUEvQixZQUFBLFlBQUFNLElBQUEsVUFBQTBCLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBeEIsSUFBQSxHQUFBd0IsU0FBQSxDQUFBbkMsSUFBQTtVQUFBO1lBQUFtQyxTQUFBLENBQUF4QixJQUFBO1lBQUFvQixVQUFBLEdBRUlqQyxHQUFHLENBQUNjLElBQUksRUFBakNvQixVQUFVLEdBQUFELFVBQUEsQ0FBVkMsVUFBVSxFQUFFQyxRQUFRLEdBQUFGLFVBQUEsQ0FBUkUsUUFBUTtZQUM1QnBCLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ3JCLE9BQU8sQ0FBQztjQUFFQyxLQUFLLEVBQUU7Z0JBQUVpQixRQUFRLEVBQUVBO2NBQVM7WUFBRSxDQUFDLENBQUMsQ0FDcERoQixJQUFJLENBQUMsVUFBQUMsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE1BQU0sSUFBSVMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQztjQUN6RDtjQUNBLE9BQU9kLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ2YsTUFBTSxDQUFDO2dCQUFFVyxVQUFVLEVBQUVBLFVBQVU7Z0JBQUVDLFFBQVEsRUFBRUE7Y0FBUyxDQUFDLENBQUM7WUFDaEYsQ0FBQyxDQUFDLENBQ0RoQixJQUFJLENBQUMsVUFBQUgsUUFBUSxFQUFJO2NBQ2RmLEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRSxJQUFJO2dCQUFFQyxHQUFHLEVBQUU7Y0FBaUMsQ0FBQyxDQUFDO1lBQ3BGLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVUMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUNVLFNBQUEsQ0FBQW5DLElBQUE7WUFBQTtVQUFBO1lBQUFtQyxTQUFBLENBQUF4QixJQUFBO1lBQUF3QixTQUFBLENBQUFULEVBQUEsR0FBQVMsU0FBQTtZQUFBLE1BR0QsSUFBSVIsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBUSxTQUFBLENBQUFQLElBQUE7UUFBQTtNQUFBLEdBQUFFLFFBQUE7SUFBQTtFQUV2QyxDQUFDO0VBRUtPLG1CQUFtQixXQUFBQSxvQkFBQ3ZDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFtQyxTQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBUCxVQUFBLEVBQUFRLGFBQUEsRUFBQWxDLElBQUE7TUFBQSxPQUFBSixZQUFBLFlBQUFNLElBQUEsVUFBQWlDLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBL0IsSUFBQSxHQUFBK0IsU0FBQSxDQUFBMUMsSUFBQTtVQUFBO1lBQUEwQyxTQUFBLENBQUEvQixJQUFBO1lBQUE0QixVQUFBLEdBRVV6QyxHQUFHLENBQUNjLElBQUksRUFBNUNvQixVQUFVLEdBQUFPLFVBQUEsQ0FBVlAsVUFBVSxFQUFFUSxhQUFhLEdBQUFELFVBQUEsQ0FBYkMsYUFBYSxFQUFFbEMsSUFBSSxHQUFBaUMsVUFBQSxDQUFKakMsSUFBSTtZQUN2Q08sVUFBRSxDQUFDOEIsZ0JBQWdCLENBQUM1QixPQUFPLENBQUM7Y0FBRUMsS0FBSyxFQUFFO2dCQUFFVixJQUFJLEVBQUVBO2NBQUs7WUFBRSxDQUFDLENBQUMsQ0FDakRXLElBQUksQ0FBQyxVQUFBQyxJQUFJLEVBQUk7Y0FDVixJQUFJQSxJQUFJLEVBQUU7Z0JBQ04sTUFBTSxJQUFJUyxZQUFZLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDO2NBQ3pEO2NBQ0EsT0FBT2QsVUFBRSxDQUFDOEIsZ0JBQWdCLENBQUN0QixNQUFNLENBQUM7Z0JBQUVXLFVBQVUsRUFBRUEsVUFBVTtnQkFBRVEsYUFBYSxFQUFFQSxhQUFhO2dCQUFFbEMsSUFBSSxFQUFFQTtjQUFLLENBQUMsQ0FBQztZQUMzRyxDQUFDLENBQUMsQ0FDRFcsSUFBSSxDQUFDLFVBQUFILFFBQVEsRUFBSTtjQUNkZixHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUMsR0FBRyxFQUFFO2NBQWlDLENBQUMsQ0FBQztZQUNwRixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVDLEdBQUcsRUFBRTtjQUNsQnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFDaUIsU0FBQSxDQUFBMUMsSUFBQTtZQUFBO1VBQUE7WUFBQTBDLFNBQUEsQ0FBQS9CLElBQUE7WUFBQStCLFNBQUEsQ0FBQWhCLEVBQUEsR0FBQWdCLFNBQUE7WUFBQSxNQUlELElBQUlmLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWUsU0FBQSxDQUFBZCxJQUFBO1FBQUE7TUFBQSxHQUFBVSxRQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVLTSxjQUFjLFdBQUFBLGVBQUM5QyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBMEMsU0FBQTtNQUFBLElBQUFDLFVBQUEsRUFBQUMsZUFBQSxFQUFBUCxhQUFBLEVBQUFQLFFBQUEsRUFBQTNCLElBQUE7TUFBQSxPQUFBSixZQUFBLFlBQUFNLElBQUEsVUFBQXdDLFVBQUFDLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBdEMsSUFBQSxHQUFBc0MsU0FBQSxDQUFBakQsSUFBQTtVQUFBO1lBQUFpRCxTQUFBLENBQUF0QyxJQUFBO1lBQUFtQyxVQUFBLEdBRThCaEQsR0FBRyxDQUFDYyxJQUFJLEVBQTNEbUMsZUFBZSxHQUFBRCxVQUFBLENBQWZDLGVBQWUsRUFBRVAsYUFBYSxHQUFBTSxVQUFBLENBQWJOLGFBQWEsRUFBRVAsUUFBUSxHQUFBYSxVQUFBLENBQVJiLFFBQVEsRUFBRTNCLElBQUksR0FBQXdDLFVBQUEsQ0FBSnhDLElBQUk7WUFDdERPLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ3JCLE9BQU8sQ0FBQztjQUFFQyxLQUFLLEVBQUU7Z0JBQUVJLEVBQUUsRUFBRW9CO2NBQWM7WUFBRSxDQUFDLENBQUMsQ0FDbkR2QixJQUFJLENBQUMsVUFBQUMsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU9MLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ2pCLE1BQU0sQ0FBQztrQkFBRWMsUUFBUSxFQUFFQTtnQkFBUyxDQUFDLEVBQUU7a0JBQUVqQixLQUFLLEVBQUU7b0JBQUVJLEVBQUUsRUFBRW9CO2tCQUFjO2dCQUFFLENBQUMsQ0FBQztjQUMxRjtjQUNBLE1BQU0sSUFBSWIsWUFBWSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQztZQUNyRCxDQUFDLENBQUM7WUFDTmQsVUFBRSxDQUFDOEIsZ0JBQWdCLENBQUM1QixPQUFPLENBQUM7Y0FBRUMsS0FBSyxFQUFFO2dCQUFFSSxFQUFFLEVBQUUyQjtjQUFnQjtZQUFFLENBQUMsQ0FBQyxDQUMxRDlCLElBQUksQ0FBQyxVQUFBQyxJQUFJLEVBQUk7Y0FDVixJQUFJQSxJQUFJLEVBQUU7Z0JBQ04sT0FBT0wsVUFBRSxDQUFDOEIsZ0JBQWdCLENBQUN4QixNQUFNLENBQUM7a0JBQUViLElBQUksRUFBRUE7Z0JBQUssQ0FBQyxFQUFFO2tCQUFFVSxLQUFLLEVBQUU7b0JBQUVJLEVBQUUsRUFBRTJCO2tCQUFnQjtnQkFBRSxDQUFDLENBQUM7Y0FDekY7Y0FDQSxNQUFNLElBQUlwQixZQUFZLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUNEVixJQUFJLENBQUMsVUFBQUgsUUFBUSxFQUFJO2NBQ2RmLEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRSxJQUFJO2dCQUFFQyxHQUFHLEVBQUU7Y0FBdUIsQ0FBQyxDQUFDO1lBQzFFLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVUMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUN3QixTQUFBLENBQUFqRCxJQUFBO1lBQUE7VUFBQTtZQUFBaUQsU0FBQSxDQUFBdEMsSUFBQTtZQUFBc0MsU0FBQSxDQUFBdkIsRUFBQSxHQUFBdUIsU0FBQTtZQUFBLE1BSUQsSUFBSXRCLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXNCLFNBQUEsQ0FBQXJCLElBQUE7UUFBQTtNQUFBLEdBQUFpQixRQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVLSyxlQUFlLFdBQUFBLGdCQUFDcEQsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWdELFNBQUE7TUFBQSxPQUFBakQsWUFBQSxZQUFBTSxJQUFBLFVBQUE0QyxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQTFDLElBQUEsR0FBQTBDLFNBQUEsQ0FBQXJELElBQUE7VUFBQTtZQUFBcUQsU0FBQSxDQUFBMUMsSUFBQTtZQUU5QkUsVUFBRSxDQUFDQyxRQUFRLENBQUN3QyxPQUFPLENBQUM7Y0FDaEJDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7Y0FDMUJDLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUU1QyxVQUFFLENBQUN1QjtjQUFZLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQ0duQixJQUFJLENBQUMsVUFBQXlDLElBQUksRUFBSTtjQUNWM0QsR0FBRyxDQUFDdUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVMLElBQUksRUFBRXdDO2NBQUssQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVWpDLEdBQUcsRUFBRTtjQUNsQnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFDNEIsU0FBQSxDQUFBckQsSUFBQTtZQUFBO1VBQUE7WUFBQXFELFNBQUEsQ0FBQTFDLElBQUE7WUFBQTBDLFNBQUEsQ0FBQTNCLEVBQUEsR0FBQTJCLFNBQUE7WUFBQSxNQUdELElBQUkxQixZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUEwQixTQUFBLENBQUF6QixJQUFBO1FBQUE7TUFBQSxHQUFBdUIsUUFBQTtJQUFBO0VBRXZDLENBQUM7RUFDS1EscUJBQXFCLFdBQUFBLHNCQUFDN0QsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXlELFNBQUE7TUFBQSxPQUFBMUQsWUFBQSxZQUFBTSxJQUFBLFVBQUFxRCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQW5ELElBQUEsR0FBQW1ELFNBQUEsQ0FBQTlELElBQUE7VUFBQTtZQUFBOEQsU0FBQSxDQUFBbkQsSUFBQTtZQUVwQ0UsVUFBRSxDQUFDQyxRQUFRLENBQUN3QyxPQUFPLENBQUM7Y0FDaEJTLEtBQUssRUFBRTtZQUNYLENBQUMsQ0FBQyxDQUNEOUMsSUFBSSxDQUFDLFVBQUF5QyxJQUFJO2NBQUEsT0FBRzNELEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFDLFNBQVMsRUFBRSxJQUFJO2dCQUFFTCxJQUFJLEVBQUV3QztjQUFJLENBQUMsQ0FBQztZQUFBLEVBQUMsU0FDM0QsQ0FBQyxVQUFBTSxDQUFDO2NBQUEsT0FBR2hFLElBQUksQ0FBQ2dFLENBQUMsQ0FBQztZQUFBLEVBQUM7WUFBQUYsU0FBQSxDQUFBOUQsSUFBQTtZQUFBO1VBQUE7WUFBQThELFNBQUEsQ0FBQW5ELElBQUE7WUFBQW1ELFNBQUEsQ0FBQXBDLEVBQUEsR0FBQW9DLFNBQUE7WUFBQSxNQUViLElBQUluQyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFtQyxTQUFBLENBQUFsQyxJQUFBO1FBQUE7TUFBQSxHQUFBZ0MsUUFBQTtJQUFBO0VBR3ZDLENBQUM7RUFFS0ssa0JBQWtCLFdBQUFBLG1CQUFDbkUsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQStELFNBQUE7TUFBQSxPQUFBaEUsWUFBQSxZQUFBTSxJQUFBLFVBQUEyRCxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXpELElBQUEsR0FBQXlELFNBQUEsQ0FBQXBFLElBQUE7VUFBQTtZQUFBb0UsU0FBQSxDQUFBekQsSUFBQTtZQUVqQ0UsVUFBRSxDQUFDdUIsV0FBVyxDQUFDa0IsT0FBTyxDQUFDO2NBQ25CdEMsS0FBSyxFQUFFO2dCQUFFZ0IsVUFBVSxFQUFFbEMsR0FBRyxDQUFDdUUsS0FBSyxDQUFDckM7Y0FBVyxDQUFDO2NBQzNDd0IsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQ0MsUUFBUTtnQkFBRXlDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNO2NBQUUsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FDR3RDLElBQUksQ0FBQyxVQUFBeUMsSUFBSSxFQUFJO2NBQ1YzRCxHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUwsSUFBSSxFQUFFd0M7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVakMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUMyQyxTQUFBLENBQUFwRSxJQUFBO1lBQUE7VUFBQTtZQUFBb0UsU0FBQSxDQUFBekQsSUFBQTtZQUFBeUQsU0FBQSxDQUFBMUMsRUFBQSxHQUFBMEMsU0FBQTtZQUFBLE1BR0QsSUFBSXpDLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXlDLFNBQUEsQ0FBQXhDLElBQUE7UUFBQTtNQUFBLEdBQUFzQyxRQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVLSSx1QkFBdUIsV0FBQUEsd0JBQUN4RSxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBb0UsU0FBQTtNQUFBLElBQUEvQixhQUFBO01BQUEsT0FBQXRDLFlBQUEsWUFBQU0sSUFBQSxVQUFBZ0UsVUFBQUMsU0FBQTtRQUFBLGtCQUFBQSxTQUFBLENBQUE5RCxJQUFBLEdBQUE4RCxTQUFBLENBQUF6RSxJQUFBO1VBQUE7WUFBQXlFLFNBQUEsQ0FBQTlELElBQUE7WUFFOUI2QixhQUFhLEdBQUsxQyxHQUFHLENBQUN1RSxLQUFLLENBQTNCN0IsYUFBYTtZQUNyQjNCLFVBQUUsQ0FBQzhCLGdCQUFnQixDQUFDVyxPQUFPLENBQUM7Y0FDeEJ0QyxLQUFLLEVBQUU7Z0JBQUV3QixhQUFhLEVBQUVBO2NBQWM7WUFDMUMsQ0FBQyxDQUFDLENBQ0d2QixJQUFJLENBQUMsVUFBQXlDLElBQUksRUFBSTtjQUNWM0QsR0FBRyxDQUFDdUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVMLElBQUksRUFBRXdDO2NBQUssQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVWpDLEdBQUcsRUFBRTtjQUNsQnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFDZ0QsU0FBQSxDQUFBekUsSUFBQTtZQUFBO1VBQUE7WUFBQXlFLFNBQUEsQ0FBQTlELElBQUE7WUFBQThELFNBQUEsQ0FBQS9DLEVBQUEsR0FBQStDLFNBQUE7WUFBQSxNQUdELElBQUk5QyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUE4QyxTQUFBLENBQUE3QyxJQUFBO1FBQUE7TUFBQSxHQUFBMkMsUUFBQTtJQUFBO0VBRXZDLENBQUM7RUFFS0csT0FBTyxXQUFBQSxRQUFDNUUsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQXdFLFNBQUE7TUFBQSxPQUFBekUsWUFBQSxZQUFBTSxJQUFBLFVBQUFvRSxVQUFBQyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQWxFLElBQUEsR0FBQWtFLFNBQUEsQ0FBQTdFLElBQUE7VUFBQTtZQUFBNkUsU0FBQSxDQUFBbEUsSUFBQTtZQUV0QkUsVUFBRSxDQUFDOEIsZ0JBQWdCLENBQUNXLE9BQU8sQ0FBQztjQUN4QkUsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQ0MsUUFBUTtnQkFBRXlDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNO2NBQUUsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FDR3RDLElBQUksQ0FBQyxVQUFBeUMsSUFBSSxFQUFJO2NBQ1YzRCxHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUwsSUFBSSxFQUFFd0M7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVakMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUNvRCxTQUFBLENBQUE3RSxJQUFBO1lBQUE7VUFBQTtZQUFBNkUsU0FBQSxDQUFBbEUsSUFBQTtZQUFBa0UsU0FBQSxDQUFBbkQsRUFBQSxHQUFBbUQsU0FBQTtZQUFBLE1BR0QsSUFBSWxELFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWtELFNBQUEsQ0FBQWpELElBQUE7UUFBQTtNQUFBLEdBQUErQyxRQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVLRyxlQUFlLFdBQUFBLGdCQUFDaEYsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQTRFLFVBQUE7TUFBQSxJQUFBL0MsVUFBQTtNQUFBLE9BQUE5QixZQUFBLFlBQUFNLElBQUEsVUFBQXdFLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBdEUsSUFBQSxHQUFBc0UsVUFBQSxDQUFBakYsSUFBQTtVQUFBO1lBQUFpRixVQUFBLENBQUF0RSxJQUFBO1lBRTFCcUIsVUFBVSxHQUFHbEMsR0FBRyxDQUFDdUUsS0FBSyxDQUFDckMsVUFBVTtZQUNyQ25CLFVBQUUsQ0FBQzhCLGdCQUFnQixDQUFDVyxPQUFPLENBQUM7Y0FDeEJ0QyxLQUFLLEVBQUU7Z0JBQUVnQixVQUFVLEVBQUVBO2NBQVcsQ0FBQztjQUNqQ3dCLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUU1QyxVQUFFLENBQUN1QixXQUFXO2dCQUFFbUIsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQztnQkFBRUMsT0FBTyxFQUFFLENBQUM7a0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQ0MsUUFBUTtrQkFBRXlDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNO2dCQUFFLENBQUM7Y0FBRSxDQUFDO1lBQ3RJLENBQUMsQ0FBQyxDQUNHdEMsSUFBSSxDQUFDLFVBQUF5QyxJQUFJLEVBQUk7Y0FDVjNELEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRSxJQUFJO2dCQUFFTCxJQUFJLEVBQUV3QztjQUFLLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVqQyxHQUFHLEVBQUU7Y0FDbEJ6QixJQUFJLENBQUN5QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFBQ3dELFVBQUEsQ0FBQWpGLElBQUE7WUFBQTtVQUFBO1lBQUFpRixVQUFBLENBQUF0RSxJQUFBO1lBQUFzRSxVQUFBLENBQUF2RCxFQUFBLEdBQUF1RCxVQUFBO1lBQUEsTUFHRCxJQUFJdEQsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBc0QsVUFBQSxDQUFBckQsSUFBQTtRQUFBO01BQUEsR0FBQW1ELFNBQUE7SUFBQTtFQUV2QyxDQUFDO0VBRUQ7RUFDTUcsV0FBVyxXQUFBQSxZQUFDcEYsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWdGLFVBQUE7TUFBQSxPQUFBakYsWUFBQSxZQUFBTSxJQUFBLFVBQUE0RSxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQTFFLElBQUEsR0FBQTBFLFVBQUEsQ0FBQXJGLElBQUE7VUFBQTtZQUFBcUYsVUFBQSxDQUFBMUUsSUFBQTtZQUUxQkUsVUFBRSxDQUFDQyxRQUFRLENBQUN3QyxPQUFPLENBQUMsQ0FBQyxDQUNoQnJDLElBQUksQ0FBQyxVQUFBeUMsSUFBSSxFQUFJO2NBQ1YzRCxHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUwsSUFBSSxFQUFFd0M7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVakMsR0FBRyxFQUFFO2NBQ2xCNkQsT0FBTyxDQUFDQyxHQUFHLENBQUM5RCxHQUFHLENBQUM7Y0FDaEJ6QixJQUFJLENBQUN5QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFBQzRELFVBQUEsQ0FBQXJGLElBQUE7WUFBQTtVQUFBO1lBQUFxRixVQUFBLENBQUExRSxJQUFBO1lBQUEwRSxVQUFBLENBQUEzRCxFQUFBLEdBQUEyRCxVQUFBO1lBQUEsTUFHRCxJQUFJMUQsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBMEQsVUFBQSxDQUFBekQsSUFBQTtRQUFBO01BQUEsR0FBQXVELFNBQUE7SUFBQTtFQUV2QyxDQUFDO0VBRUtLLGlCQUFpQixXQUFBQSxrQkFBQzFGLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFzRixVQUFBO01BQUEsSUFBQUMsVUFBQSxFQUFBdEUsRUFBQSxFQUFBZCxJQUFBLEVBQUFDLElBQUE7TUFBQSxPQUFBTCxZQUFBLFlBQUFNLElBQUEsVUFBQW1GLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBakYsSUFBQSxHQUFBaUYsVUFBQSxDQUFBNUYsSUFBQTtVQUFBO1lBQUE0RixVQUFBLENBQUFqRixJQUFBO1lBQUErRSxVQUFBLEdBRUw1RixHQUFHLENBQUNjLElBQUksRUFBM0JRLEVBQUUsR0FBQXNFLFVBQUEsQ0FBRnRFLEVBQUUsRUFBRWQsSUFBSSxHQUFBb0YsVUFBQSxDQUFKcEYsSUFBSSxFQUFFQyxJQUFJLEdBQUFtRixVQUFBLENBQUpuRixJQUFJO1lBQ3RCTSxVQUFFLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDO2NBQUVDLEtBQUssRUFBRTtnQkFBRUksRUFBRSxFQUFFQTtjQUFHO1lBQUUsQ0FBQyxDQUFDLENBQ3JDSCxJQUFJLENBQUMsVUFBQUMsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU9MLFVBQUUsQ0FBQ0MsUUFBUSxDQUFDSyxNQUFNLENBQUM7a0JBQUViLElBQUksRUFBRUEsSUFBSTtrQkFBRUMsSUFBSSxFQUFFQTtnQkFBSyxDQUFDLEVBQUU7a0JBQUVTLEtBQUssRUFBRTtvQkFBRUksRUFBRSxFQUFFRixJQUFJLENBQUNFO2tCQUFHO2dCQUFFLENBQUMsQ0FBQztjQUNyRjtjQUNBLE1BQU0sSUFBSU8sWUFBWSxDQUFDLHVCQUF1QixDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUNEVixJQUFJLENBQUMsVUFBQUgsUUFBUSxFQUFJO2NBQ2RmLEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRSxJQUFJO2dCQUFFQyxHQUFHLEVBQUU7Y0FBZ0MsQ0FBQyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVUMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUNtRSxVQUFBLENBQUE1RixJQUFBO1lBQUE7VUFBQTtZQUFBNEYsVUFBQSxDQUFBakYsSUFBQTtZQUFBaUYsVUFBQSxDQUFBbEUsRUFBQSxHQUFBa0UsVUFBQTtZQUFBLE1BR0QsSUFBSWpFLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQWlFLFVBQUEsQ0FBQWhFLElBQUE7UUFBQTtNQUFBLEdBQUE2RCxTQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUNEO0VBQ01JLGNBQWMsV0FBQUEsZUFBQy9GLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUEyRixVQUFBO01BQUEsT0FBQTVGLFlBQUEsWUFBQU0sSUFBQSxVQUFBdUYsV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUFyRixJQUFBLEdBQUFxRixVQUFBLENBQUFoRyxJQUFBO1VBQUE7WUFBQWdHLFVBQUEsQ0FBQXJGLElBQUE7WUFFN0JFLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ2tCLE9BQU8sQ0FBQztjQUNuQkUsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQ0MsUUFBUTtnQkFBRXlDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNO2NBQUUsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FDR3RDLElBQUksQ0FBQyxVQUFBeUMsSUFBSSxFQUFJO2NBQ1YzRCxHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUwsSUFBSSxFQUFFd0M7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVakMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUN1RSxVQUFBLENBQUFoRyxJQUFBO1lBQUE7VUFBQTtZQUFBZ0csVUFBQSxDQUFBckYsSUFBQTtZQUFBcUYsVUFBQSxDQUFBdEUsRUFBQSxHQUFBc0UsVUFBQTtZQUFBLE1BR0QsSUFBSXJFLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQXFFLFVBQUEsQ0FBQXBFLElBQUE7UUFBQTtNQUFBLEdBQUFrRSxTQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUNLRyxtQkFBbUIsV0FBQUEsb0JBQUNuRyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBK0YsVUFBQTtNQUFBLElBQUFDLFVBQUEsRUFBQS9FLEVBQUEsRUFBQWEsUUFBQTtNQUFBLE9BQUEvQixZQUFBLFlBQUFNLElBQUEsVUFBQTRGLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBMUYsSUFBQSxHQUFBMEYsVUFBQSxDQUFBckcsSUFBQTtVQUFBO1lBQUFxRyxVQUFBLENBQUExRixJQUFBO1lBQUF3RixVQUFBLEdBRVRyRyxHQUFHLENBQUNjLElBQUksRUFBekJRLEVBQUUsR0FBQStFLFVBQUEsQ0FBRi9FLEVBQUUsRUFBRWEsUUFBUSxHQUFBa0UsVUFBQSxDQUFSbEUsUUFBUTtZQUNwQnBCLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ3JCLE9BQU8sQ0FBQztjQUFFQyxLQUFLLEVBQUU7Z0JBQUVJLEVBQUUsRUFBRUE7Y0FBRztZQUFFLENBQUMsQ0FBQyxDQUN4Q0gsSUFBSSxDQUFDLFVBQUFDLElBQUksRUFBSTtjQUNWLElBQUlBLElBQUksRUFBRTtnQkFDTixPQUFPTCxVQUFFLENBQUN1QixXQUFXLENBQUNqQixNQUFNLENBQUM7a0JBQUVjLFFBQVEsRUFBRUE7Z0JBQVMsQ0FBQyxFQUFFO2tCQUFFakIsS0FBSyxFQUFFO29CQUFFSSxFQUFFLEVBQUVGLElBQUksQ0FBQ0U7a0JBQUc7Z0JBQUUsQ0FBQyxDQUFDO2NBQ3BGO2NBQ0EsTUFBTSxJQUFJTyxZQUFZLENBQUMsMkJBQTJCLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQ0RWLElBQUksQ0FBQyxVQUFBSCxRQUFRLEVBQUk7Y0FDZGYsR0FBRyxDQUFDdUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVDLEdBQUcsRUFBRTtjQUFvQyxDQUFDLENBQUM7WUFDdkYsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVQyxHQUFHLEVBQUU7Y0FDbEJ6QixJQUFJLENBQUN5QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFBQzRFLFVBQUEsQ0FBQXJHLElBQUE7WUFBQTtVQUFBO1lBQUFxRyxVQUFBLENBQUExRixJQUFBO1lBQUEwRixVQUFBLENBQUEzRSxFQUFBLEdBQUEyRSxVQUFBO1lBQUEsTUFHRCxJQUFJMUUsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBMEUsVUFBQSxDQUFBekUsSUFBQTtRQUFBO01BQUEsR0FBQXNFLFNBQUE7SUFBQTtFQUV2QyxDQUFDO0VBRUtJLG9CQUFvQixXQUFBQSxxQkFBQ3hHLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFvRyxVQUFBO01BQUEsT0FBQXJHLFlBQUEsWUFBQU0sSUFBQSxVQUFBZ0csV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUE5RixJQUFBLEdBQUE4RixVQUFBLENBQUF6RyxJQUFBO1VBQUE7WUFBQXlHLFVBQUEsQ0FBQTlGLElBQUE7WUFFbkNFLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ3JCLE9BQU8sQ0FBQztjQUFFQyxLQUFLLEVBQUU7Z0JBQUVJLEVBQUUsRUFBRXNGLFFBQVEsQ0FBQzVHLEdBQUcsQ0FBQ3VFLEtBQUssQ0FBQ2pELEVBQUU7Y0FBRTtZQUFFLENBQUMsQ0FBQyxDQUM1REgsSUFBSSxDQUFDLFVBQUF5QyxJQUFJLEVBQUk7Y0FDVixJQUFJQSxJQUFJLEVBQUU7Z0JBQ04sT0FBTzdDLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ3VFLE9BQU8sQ0FBQztrQkFBRTNGLEtBQUssRUFBRTtvQkFBRUksRUFBRSxFQUFFc0MsSUFBSSxDQUFDdEM7a0JBQUc7Z0JBQUUsQ0FBQyxDQUFDO2NBQzdEO2NBQ0EsTUFBTSxJQUFJTyxZQUFZLENBQUMsaUJBQWlCLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQ0RWLElBQUksQ0FBQyxVQUFBMkYsRUFBRSxFQUFJO2NBQ1IsT0FBTzdHLEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLEtBQUssRUFBRSxTQUFTO2dCQUFFLFFBQVEsRUFBRTtjQUFvQyxDQUFDLENBQUM7WUFDcEcsQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFBRSxHQUFHLEVBQUk7Y0FDWnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFBZ0YsVUFBQSxDQUFBekcsSUFBQTtZQUFBO1VBQUE7WUFBQXlHLFVBQUEsQ0FBQTlGLElBQUE7WUFBQThGLFVBQUEsQ0FBQS9FLEVBQUEsR0FBQStFLFVBQUE7WUFBQSxNQUdBLElBQUk5RSxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUE4RSxVQUFBLENBQUE3RSxJQUFBO1FBQUE7TUFBQSxHQUFBMkUsU0FBQTtJQUFBO0VBRXZDLENBQUM7RUFFRDtFQUNNTSxjQUFjLFdBQUFBLGVBQUMvRyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBMkcsVUFBQTtNQUFBLE9BQUE1RyxZQUFBLFlBQUFNLElBQUEsVUFBQXVHLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBckcsSUFBQSxHQUFBcUcsVUFBQSxDQUFBaEgsSUFBQTtVQUFBO1lBQ2pDYSxVQUFFLENBQUNDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDO2NBQUVDLEtBQUssRUFBRTtnQkFBRUksRUFBRSxFQUFFc0YsUUFBUSxDQUFDNUcsR0FBRyxDQUFDdUUsS0FBSyxDQUFDakQsRUFBRTtjQUFFO1lBQUUsQ0FBQyxDQUFDLENBQ3pESCxJQUFJLENBQUMsVUFBQUMsSUFBSSxFQUFJO2NBQ1YsSUFBSUEsSUFBSSxFQUFFO2dCQUNOLE9BQU9MLFVBQUUsQ0FBQ0MsUUFBUSxDQUFDNkYsT0FBTyxDQUFDO2tCQUFFM0YsS0FBSyxFQUFFO29CQUFFSSxFQUFFLEVBQUVGLElBQUksQ0FBQ0U7a0JBQUc7Z0JBQUUsQ0FBQyxDQUFDLENBQUNILElBQUksQ0FBQyxVQUFBZ0csQ0FBQztrQkFBQSxPQUFJLENBQUNBLENBQUMsRUFBRS9GLElBQUksQ0FBQztnQkFBQSxFQUFDO2NBQy9FO2NBQ0EsTUFBTSxJQUFJUyxZQUFZLENBQUMsNkJBQTZCLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQ0RWLElBQUksQ0FBQyxVQUFBMkYsRUFBRSxFQUFJO2NBQ1IsT0FBTzdHLEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFFBQVEsRUFBRTtjQUFnQyxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFBRSxHQUFHLEVBQUk7Y0FDWnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBdUYsVUFBQSxDQUFBcEYsSUFBQTtRQUFBO01BQUEsR0FBQWtGLFNBQUE7SUFBQTtFQUNWLENBQUM7RUFFS0ksb0JBQW9CLFdBQUFBLHFCQUFDcEgsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWdILFVBQUE7TUFBQSxPQUFBakgsWUFBQSxZQUFBTSxJQUFBLFVBQUE0RyxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQTFHLElBQUEsR0FBQTBHLFVBQUEsQ0FBQXJILElBQUE7VUFBQTtZQUFBcUgsVUFBQSxDQUFBMUcsSUFBQTtZQUVuQ0UsVUFBRSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sQ0FBQztjQUNoQnlDLE9BQU8sRUFBRSxDQUFDO2dCQUFFQyxLQUFLLEVBQUU1QyxVQUFFLENBQUN1QixXQUFXO2dCQUFFb0IsT0FBTyxFQUFFLENBQUM7a0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQzhCO2dCQUFpQixDQUFDO2NBQUUsQ0FBQztZQUVsRixDQUFDLENBQUMsQ0FDRzFCLElBQUksQ0FBQyxVQUFBeUMsSUFBSSxFQUFJO2NBQ1YzRCxHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUwsSUFBSSxFQUFFd0M7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVakMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUM0RixVQUFBLENBQUFySCxJQUFBO1lBQUE7VUFBQTtZQUFBcUgsVUFBQSxDQUFBMUcsSUFBQTtZQUFBMEcsVUFBQSxDQUFBM0YsRUFBQSxHQUFBMkYsVUFBQTtZQUFBLE1BR0QsSUFBSTFGLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQTBGLFVBQUEsQ0FBQXpGLElBQUE7UUFBQTtNQUFBLEdBQUF1RixTQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVLRyxvQkFBb0IsV0FBQUEscUJBQUN4SCxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBb0gsVUFBQTtNQUFBLE9BQUFySCxZQUFBLFlBQUFNLElBQUEsVUFBQWdILFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBOUcsSUFBQSxHQUFBOEcsVUFBQSxDQUFBekgsSUFBQTtVQUFBO1lBQUF5SCxVQUFBLENBQUE5RyxJQUFBO1lBRW5DRSxVQUFFLENBQUM2RyxPQUFPLENBQUNwRSxPQUFPLENBQUM7Y0FDZnRDLEtBQUssRUFBRTtnQkFBRTJHLGVBQWUsRUFBRTdILEdBQUcsQ0FBQzhILE1BQU0sQ0FBQ3hHO2NBQUc7WUFDNUMsQ0FBQyxDQUFDLENBQ0dILElBQUksQ0FBQyxVQUFBeUMsSUFBSSxFQUFJO2NBQ1YzRCxHQUFHLENBQUN1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRSxTQUFTLEVBQUUsSUFBSTtnQkFBRUwsSUFBSSxFQUFFd0M7Y0FBSyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxVQUFVakMsR0FBRyxFQUFFO2NBQ2xCekIsSUFBSSxDQUFDeUIsR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBQUNnRyxVQUFBLENBQUF6SCxJQUFBO1lBQUE7VUFBQTtZQUFBeUgsVUFBQSxDQUFBOUcsSUFBQTtZQUFBOEcsVUFBQSxDQUFBL0YsRUFBQSxHQUFBK0YsVUFBQTtZQUFBLE1BR0QsSUFBSTlGLFlBQVksQ0FBQyxPQUFPLENBQUM7VUFBQTtVQUFBO1lBQUEsT0FBQThGLFVBQUEsQ0FBQTdGLElBQUE7UUFBQTtNQUFBLEdBQUEyRixTQUFBO0lBQUE7RUFFdkMsQ0FBQztFQUVLTSxtQkFBbUIsV0FBQUEsb0JBQUMvSCxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBMkgsVUFBQTtNQUFBLElBQUFDLFVBQUEsRUFBQTNHLEVBQUEsRUFBQWQsSUFBQTtNQUFBLE9BQUFKLFlBQUEsWUFBQU0sSUFBQSxVQUFBd0gsV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUF0SCxJQUFBLEdBQUFzSCxVQUFBLENBQUFqSSxJQUFBO1VBQUE7WUFBQWlJLFVBQUEsQ0FBQXRILElBQUE7WUFBQW9ILFVBQUEsR0FFZmpJLEdBQUcsQ0FBQ2MsSUFBSSxFQUFyQlEsRUFBRSxHQUFBMkcsVUFBQSxDQUFGM0csRUFBRSxFQUFFZCxJQUFJLEdBQUF5SCxVQUFBLENBQUp6SCxJQUFJO1lBQ2RPLFVBQUUsQ0FBQ3VCLFdBQVcsQ0FBQ3JCLE9BQU8sQ0FBQztjQUNuQndDLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7Y0FDOUJ2QyxLQUFLLEVBQUU7Z0JBQUVJLEVBQUUsRUFBRUEsRUFBRTtnQkFBRWEsUUFBUSxFQUFFM0I7Y0FBSyxDQUFDO2NBQ2pDa0QsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQzhCO2NBQWlCLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQ0cxQixJQUFJLENBQUMsVUFBQXlHLE9BQU8sRUFBSTtjQUNiM0gsR0FBRyxDQUFDdUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVMLElBQUksRUFBRXdHO2NBQVEsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVWpHLEdBQUcsRUFBRTtjQUNsQnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFDd0csVUFBQSxDQUFBakksSUFBQTtZQUFBO1VBQUE7WUFBQWlJLFVBQUEsQ0FBQXRILElBQUE7WUFBQXNILFVBQUEsQ0FBQXZHLEVBQUEsR0FBQXVHLFVBQUE7WUFBQSxNQUdELElBQUl0RyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUFzRyxVQUFBLENBQUFyRyxJQUFBO1FBQUE7TUFBQSxHQUFBa0csU0FBQTtJQUFBO0VBRXZDLENBQUM7RUFFS0ksdUJBQXVCLFdBQUFBLHdCQUFDcEksR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQWdJLFVBQUE7TUFBQSxJQUFBQyxVQUFBLEVBQUFoSCxFQUFBLEVBQUFkLElBQUEsRUFBQStILE1BQUE7TUFBQSxPQUFBbkksWUFBQSxZQUFBTSxJQUFBLFVBQUE4SCxXQUFBQyxVQUFBO1FBQUEsa0JBQUFBLFVBQUEsQ0FBQTVILElBQUEsR0FBQTRILFVBQUEsQ0FBQXZJLElBQUE7VUFBQTtZQUFBdUksVUFBQSxDQUFBNUgsSUFBQTtZQUFBeUgsVUFBQSxHQUVuQnRJLEdBQUcsQ0FBQ2MsSUFBSSxFQUFyQlEsRUFBRSxHQUFBZ0gsVUFBQSxDQUFGaEgsRUFBRSxFQUFFZCxJQUFJLEdBQUE4SCxVQUFBLENBQUo5SCxJQUFJO1lBQ1YrSCxNQUFNLEdBQUcsSUFBSTtZQUNqQixJQUFJL0gsSUFBSSxFQUFFO2NBQ04rSCxNQUFNLEdBQUcsR0FBRyxHQUFHL0gsSUFBSSxHQUFHLEdBQUc7WUFDN0I7WUFDQU8sVUFBRSxDQUFDdUIsV0FBVyxDQUFDa0IsT0FBTyxDQUFDO2NBQ25CQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2NBQzlCQyxPQUFPLEVBQUUsQ0FBQztnQkFDTkMsS0FBSyxFQUFFNUMsVUFBRSxDQUFDNkcsT0FBTztnQkFBRWMsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQUVDLFFBQVEsRUFBRSxJQUFJO2dCQUFFekgsS0FBSyxNQUFBMEgsZ0JBQUEsaUJBQ25FL0ksRUFBRSxDQUFDZ0osRUFBRSxFQUFHLENBQUM7a0JBQUVySSxJQUFJLE1BQUFvSSxnQkFBQSxpQkFBSy9JLEVBQUUsQ0FBQ2lKLElBQUksRUFBR1AsTUFBTSxDQUFFO2tCQUFFUSxhQUFhLEVBQUV6SDtnQkFBRyxDQUFDLENBQUM7Y0FFckUsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUNHSCxJQUFJLENBQUMsVUFBQXlHLE9BQU8sRUFBSTtjQUNiM0gsR0FBRyxDQUFDdUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUUsU0FBUyxFQUFFLElBQUk7Z0JBQUVMLElBQUksRUFBRXdHO2NBQVEsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBVWpHLEdBQUcsRUFBRTtjQUNsQnpCLElBQUksQ0FBQ3lCLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUFDOEcsVUFBQSxDQUFBdkksSUFBQTtZQUFBO1VBQUE7WUFBQXVJLFVBQUEsQ0FBQTVILElBQUE7WUFBQTRILFVBQUEsQ0FBQTdHLEVBQUEsR0FBQTZHLFVBQUE7WUFBQSxNQUdELElBQUk1RyxZQUFZLENBQUMsT0FBTyxDQUFDO1VBQUE7VUFBQTtZQUFBLE9BQUE0RyxVQUFBLENBQUEzRyxJQUFBO1FBQUE7TUFBQSxHQUFBdUcsU0FBQTtJQUFBO0VBRXZDLENBQUM7RUFFRDtFQUNNVyxvQkFBb0IsV0FBQUEscUJBQUNoSixHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO0lBQUEsV0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxVQUFBNEksVUFBQTtNQUFBLE9BQUE3SSxZQUFBLFlBQUFNLElBQUEsVUFBQXdJLFdBQUFDLFVBQUE7UUFBQSxrQkFBQUEsVUFBQSxDQUFBdEksSUFBQSxHQUFBc0ksVUFBQSxDQUFBakosSUFBQTtVQUFBO1lBQUFpSixVQUFBLENBQUF0SSxJQUFBO1lBRW5DRSxVQUFFLENBQUNDLFFBQVEsQ0FBQ3dDLE9BQU8sQ0FBQztjQUNoQkMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztjQUMxQkMsT0FBTyxFQUFFLENBQUM7Z0JBQUVDLEtBQUssRUFBRTVDLFVBQUUsQ0FBQ3VCLFdBQVc7Z0JBQUVvQixPQUFPLEVBQUUsQ0FBQztrQkFBRUMsS0FBSyxFQUFFNUMsVUFBRSxDQUFDOEI7Z0JBQWlCLENBQUM7Y0FBRSxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUNEMUIsSUFBSSxDQUFDLFVBQUF5QyxJQUFJLEVBQUk7Y0FDVjNELEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRSxJQUFJO2dCQUFFTCxJQUFJLEVBQUV3QztjQUFLLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVqQyxHQUFHLEVBQUU7Y0FDbEJ6QixJQUFJLENBQUN5QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFBQ3dILFVBQUEsQ0FBQWpKLElBQUE7WUFBQTtVQUFBO1lBQUFpSixVQUFBLENBQUF0SSxJQUFBO1lBQUFzSSxVQUFBLENBQUF2SCxFQUFBLEdBQUF1SCxVQUFBO1lBQUEsTUFHRyxJQUFJdEgsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBc0gsVUFBQSxDQUFBckgsSUFBQTtRQUFBO01BQUEsR0FBQW1ILFNBQUE7SUFBQTtFQUV2QyxDQUFDO0VBRUtHLHFCQUFxQixXQUFBQSxzQkFBQ3BKLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFnSixVQUFBO01BQUEsT0FBQWpKLFlBQUEsWUFBQU0sSUFBQSxVQUFBNEksV0FBQUMsVUFBQTtRQUFBLGtCQUFBQSxVQUFBLENBQUExSSxJQUFBLEdBQUEwSSxVQUFBLENBQUFySixJQUFBO1VBQUE7WUFBQXFKLFVBQUEsQ0FBQTFJLElBQUE7WUFFcENFLFVBQUUsQ0FBQzZHLE9BQU8sQ0FBQ3BFLE9BQU8sQ0FBQztjQUNmdEMsS0FBSyxFQUFFO2dCQUFFNkgsYUFBYSxFQUFFL0ksR0FBRyxDQUFDYyxJQUFJLENBQUMwSTtjQUFNO1lBQzNDLENBQUMsQ0FBQyxDQUNHckksSUFBSSxDQUFDLFVBQUF5QyxJQUFJLEVBQUk7Y0FDVjNELEdBQUcsQ0FBQ3VCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFLFNBQVMsRUFBRSxJQUFJO2dCQUFFTCxJQUFJLEVBQUV3QztjQUFLLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQVVqQyxHQUFHLEVBQUU7Y0FDbEJ6QixJQUFJLENBQUN5QixHQUFHLENBQUM7WUFDYixDQUFDLENBQUM7WUFBQzRILFVBQUEsQ0FBQXJKLElBQUE7WUFBQTtVQUFBO1lBQUFxSixVQUFBLENBQUExSSxJQUFBO1lBQUEwSSxVQUFBLENBQUEzSCxFQUFBLEdBQUEySCxVQUFBO1lBQUEsTUFHRCxJQUFJMUgsWUFBWSxDQUFDLE9BQU8sQ0FBQztVQUFBO1VBQUE7WUFBQSxPQUFBMEgsVUFBQSxDQUFBekgsSUFBQTtRQUFBO01BQUEsR0FBQXVILFNBQUE7SUFBQTtFQUV2QztBQUNKLENBQUM7QUFBQUksT0FBQSxjQUFBM0osUUFBQSJ9