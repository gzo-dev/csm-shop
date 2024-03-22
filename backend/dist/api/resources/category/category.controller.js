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
            _models.db.SubCategory.findAll({
              where: {
                categoryId: categoryId
              }
            }).then(function (list) {
              res.status(200).json({
                'success': true,
                data: list
              });
            })["catch"](function (err) {
              next(err);
            });
            _context10.next = 9;
            break;
          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            res.status(200).json({
              'success': false,
              data: []
            });
            throw new RequestError('Error');
          case 9:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9yZXF1aXJlIiwiT3AiLCJfZGVmYXVsdCIsImFkZENhdGVnb3J5IiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwibmFtZSIsInNsdWciLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwiZGIiLCJjYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJkYXRhIiwidXBkYXRlIiwiaWQiLCJjcmVhdGUiLCJzdGF0dXMiLCJqc29uIiwibXNnIiwiZXJyIiwidDAiLCJSZXF1ZXN0RXJyb3IiLCJzdG9wIiwiYWRkU3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMiIsIl9yZXEkYm9keTIiLCJjYXRlZ29yeUlkIiwic3ViX25hbWUiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJTdWJDYXRlZ29yeSIsImFkZFN1YkNoaWxkQ2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkYm9keTMiLCJzdWJjYXRlZ29yeUlkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiU3ViQ2hpbGRDYXRlZ29yeSIsInVwZGF0ZUNhdGVnb3J5IiwiX2NhbGxlZTQiLCJfcmVxJGJvZHk0IiwiY2hpbGRjYXRlZ29yeUlkIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZ2V0Q2F0ZWdvcnlMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImluY2x1ZGUiLCJtb2RlbCIsImxpc3QiLCJnZXRDYXRlZ29yeUxpc3RIZWFkZXIiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpbWl0IiwiZSIsImdldFN1YkNhdGVnb3J5TGlzdCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwicXVlcnkiLCJnZXRTdWJDaGlsZENhdGVnb3J5TGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0TGlzdCIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZ2V0Q2F0ZWdvcnlCeUlkIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJnZXRNYWluTGlzdCIsIl9jYWxsZWUxMSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiY29uc29sZSIsImxvZyIsImdldE1haW5MaXN0VXBkYXRlIiwiX2NhbGxlZTEyIiwiX3JlcSRib2R5NSIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0U3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImdldFN1YkNhdExpc3RVcGRhdGUiLCJfY2FsbGVlMTQiLCJfcmVxJGJvZHk2IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJnZXREZWxldGVkU3ViQ2F0TGlzdCIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyc2VJbnQiLCJkZXN0cm95IiwicmUiLCJkZWxldGVDYXRlZ29yeSIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiciIsImdldEFsbENhdGVnb3J5QnlTbHVnIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJmaWx0ZXJCeUNhdGVnb3J5TGlzdCIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwicHJvZHVjdCIsImNoaWxkQ2F0ZWdvcnlJZCIsInBhcmFtcyIsImdldEZpbHRlcmJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMTkiLCJfcmVxJGJvZHk3IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRQcm9kdWN0QnlTdWJjYXRlZ29yeSIsIl9jYWxsZWUyMCIsIl9yZXEkYm9keTgiLCJzZWFyY2giLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIm9yZGVyIiwicmVxdWlyZWQiLCJfZGVmaW5lUHJvcGVydHkyIiwib3IiLCJsaWtlIiwic3ViQ2F0ZWdvcnlJZCIsImdldEFsbE1vYmlsZUNhdGVnb3J5IiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJnZXRBbGxTdWJDYXRlZ29yeUJ5SWQiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInN1YklkIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2NhdGVnb3J5L2NhdGVnb3J5LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xuY29uc3QgeyBPcCB9ID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgLyogQWRkIHVzZXIgYXBpIHN0YXJ0IGhlcmUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiovXG5cbiAgICBhc3luYyBhZGRDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBzbHVnIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS51cGRhdGUoeyBzbHVnOiBzbHVnIH0sIHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS5jcmVhdGUoeyBuYW1lOiBuYW1lLCBzbHVnOiBzbHVnIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgYXN5bmMgYWRkU3ViQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViX25hbWUgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBhbHJlYWR5IGV4aXN0JywgNDA5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkuY3JlYXRlKHsgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCwgc3ViX25hbWU6IHN1Yl9uYW1lIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGFkZFN1YkNoaWxkQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViY2F0ZWdvcnlJZCwgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBuYW1lOiBuYW1lIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IGFscmVhZHkgZXhpc3QnLCA0MDkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDaGlsZENhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQ6IHN1YmNhdGVnb3J5SWQsIG5hbWU6IG5hbWUgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGNhdGVnb3J5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgY2F0ZWdvcnlcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyB1cGRhdGVDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBjaGlsZGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQsIHN1Yl9uYW1lLCBuYW1lIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogc3ViY2F0ZWdvcnlJZCB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkudXBkYXRlKHsgc3ViX25hbWU6IHN1Yl9uYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IHN1YmNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IE5vdCBGb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRiLlN1YkNoaWxkQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBjaGlsZGNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNoaWxkQ2F0ZWdvcnkudXBkYXRlKHsgbmFtZTogbmFtZSB9LCB7IHdoZXJlOiB7IGlkOiBjaGlsZGNhdGVnb3J5SWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IE5vdCBGb3VuZCcsIDQwOSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWRcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnkgfV0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldENhdGVnb3J5TGlzdEhlYWRlcihyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgbGltaXQ6IDNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihsaXN0PT4gcmVzLnN0YXR1cygyMDApLmpzb24oeydzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdH0pKVxuICAgICAgICAgICAgLmNhdGNoKGU9PiBuZXh0KGUpKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcihcIkVycm9yXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRTdWJDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkIH0sXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLmNhdGVnb3J5LCBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcIm5hbWVcIl0gfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRTdWJDaGlsZENhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBzdWJjYXRlZ29yeUlkIH0gPSByZXEucXVlcnk7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHN1YmNhdGVnb3J5SWQ6IHN1YmNhdGVnb3J5SWQgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0Q2F0ZWdvcnlCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlJZCA9IHJlcS5xdWVyeS5jYXRlZ29yeUlkO1xuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogZmFsc2UsIGRhdGE6IFtdIH0pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBjYXRlZ29yeSBsaXN0XG4gICAgYXN5bmMgZ2V0TWFpbkxpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoKVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyBnZXRNYWluTGlzdFVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBpZCwgbmFtZSwgc2x1ZyB9ID0gcmVxLmJvZHk7XG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS51cGRhdGUoeyBuYW1lOiBuYW1lLCBzbHVnOiBzbHVnIH0sIHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWQgY2F0ZWdvcnlcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIFN1YiBjYXRlZ29yeSBsaXN0XG4gICAgYXN5bmMgZ2V0U3ViQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGdldFN1YkNhdExpc3RVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIHN1Yl9uYW1lIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LnVwZGF0ZSh7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdTdWJfQ2F0ZWdvcnkgaXMgbm90IGZvdW5kJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGNhdGVnb3J5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgVXBkYXRlZCBTdWJfQ2F0ZWdvcnlcIiB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0RGVsZXRlZFN1YkNhdExpc3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocmVxLnF1ZXJ5LmlkKSB9IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBsaXN0LmlkIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdJZCBpcyBub3QgZm91bmQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnbXNnJzogJ3N1Y2Nlc3MnLCAnc3RhdHVzJzogXCJkZWxldGVkIFN1Yl9DYXRlZ29yeSBTZWNjZXNzZnVsbHlcIiB9KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy9jaGlsZCBjYXRlZ29yeSBcbiAgICBhc3luYyBkZWxldGVDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xuICAgICAgICBkYi5jYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmNhdGVnb3J5LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pLnRoZW4ociA9PiBbciwgZGF0YV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ2NoaWxkX2NhdGVnb3J5IGlzIG5vdCBmb3VuZCcpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdGF0dXMnOiBcImRlbGV0ZWQgY2F0ZWdvcnkgU2VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QWxsQ2F0ZWdvcnlCeVNsdWcocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDYXRlZ29yeSwgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnkgfV0gfV1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGZpbHRlckJ5Q2F0ZWdvcnlMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGNoaWxkQ2F0ZWdvcnlJZDogcmVxLnBhcmFtcy5pZCB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEZpbHRlcmJ5Q2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB7IGlkLCBuYW1lIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGlkLCBzdWJfbmFtZTogbmFtZSB9LFxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5IH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0UHJvZHVjdEJ5U3ViY2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB7IGlkLCBuYW1lIH0gPSByZXEuYm9keTtcbiAgICAgICAgICAgIGxldCBzZWFyY2ggPSAnJSUnO1xuICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2ggPSAnJScgKyBuYW1lICsgJyUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZEFsbCh7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJzdWJfbmFtZVwiXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbe1xuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZGIucHJvZHVjdCwgb3JkZXI6IFtbJ2NyZWF0ZWRBdCcsICdERVNDJ11dLCByZXF1aXJlZDogdHJ1ZSwgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtPcC5vcl06IFt7IG5hbWU6IHsgW09wLmxpa2VdOiBzZWFyY2ggfSwgc3ViQ2F0ZWdvcnlJZDogaWQgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IHByb2R1Y3QgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vbW9iaWxlXG4gICAgYXN5bmMgZ2V0QWxsTW9iaWxlQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5IH1dIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBuZXh0KGVycilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZ2V0QWxsU3ViQ2F0ZWdvcnlCeUlkKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYi5wcm9kdWN0LmZpbmRBbGwoe1xuICAgICAgICAgICAgICAgIHdoZXJlOiB7IHN1YkNhdGVnb3J5SWQ6IHJlcS5ib2R5LnN1YklkIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cblxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsUUFBQSxHQUFlRCxPQUFPLENBQUMsV0FBVyxDQUFDO0VBQTNCRSxFQUFFLEdBQUFELFFBQUEsQ0FBRkMsRUFBRTtBQUEwQixJQUFBQyxRQUFBLEdBRXJCO0VBRVgsNERBRU1DLFdBQVcsV0FBQUEsWUFBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRTtJQUFBLFdBQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsVUFBQUMsUUFBQTtNQUFBLElBQUFDLFNBQUEsRUFBQUMsSUFBQSxFQUFBQyxJQUFB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