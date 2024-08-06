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
            categoryId = req.query.categoryId || -1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9kZWxzIiwicmVxdWlyZSIsIl9yZXF1aXJlIiwiT3AiLCJfZGVmYXVsdCIsImFkZENhdGVnb3J5IiwicmVxIiwicmVzIiwibmV4dCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwiX3JlcSRib2R5IiwibmFtZSIsInNsdWciLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJib2R5IiwiZGIiLCJjYXRlZ29yeSIsImZpbmRPbmUiLCJ3aGVyZSIsInRoZW4iLCJkYXRhIiwidXBkYXRlIiwiaWQiLCJjcmVhdGUiLCJzdGF0dXMiLCJqc29uIiwibXNnIiwiZXJyIiwidDAiLCJSZXF1ZXN0RXJyb3IiLCJzdG9wIiwiYWRkU3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMiIsIl9yZXEkYm9keTIiLCJjYXRlZ29yeUlkIiwic3ViX25hbWUiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJTdWJDYXRlZ29yeSIsImFkZFN1YkNoaWxkQ2F0ZWdvcnkiLCJfY2FsbGVlMyIsIl9yZXEkYm9keTMiLCJzdWJjYXRlZ29yeUlkIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiU3ViQ2hpbGRDYXRlZ29yeSIsInVwZGF0ZUNhdGVnb3J5IiwiX2NhbGxlZTQiLCJfcmVxJGJvZHk0IiwiY2hpbGRjYXRlZ29yeUlkIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZ2V0Q2F0ZWdvcnlMaXN0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsImluY2x1ZGUiLCJtb2RlbCIsImxpc3QiLCJnZXRDYXRlZ29yeUxpc3RIZWFkZXIiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsImxpbWl0IiwiZSIsImdldFN1YkNhdGVnb3J5TGlzdCIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwicXVlcnkiLCJnZXRTdWJDaGlsZENhdGVnb3J5TGlzdCIsIl9jYWxsZWU4IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiZ2V0TGlzdCIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiZ2V0Q2F0ZWdvcnlCeUlkIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJnZXRNYWluTGlzdCIsIl9jYWxsZWUxMSIsIl9jYWxsZWUxMSQiLCJfY29udGV4dDExIiwiY29uc29sZSIsImxvZyIsImdldE1haW5MaXN0VXBkYXRlIiwiX2NhbGxlZTEyIiwiX3JlcSRib2R5NSIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZ2V0U3ViQ2F0ZWdvcnkiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsImdldFN1YkNhdExpc3RVcGRhdGUiLCJfY2FsbGVlMTQiLCJfcmVxJGJvZHk2IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJnZXREZWxldGVkU3ViQ2F0TGlzdCIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1IiwicGFyc2VJbnQiLCJkZXN0cm95IiwicmUiLCJkZWxldGVDYXRlZ29yeSIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiciIsImdldEFsbENhdGVnb3J5QnlTbHVnIiwiX2NhbGxlZTE3IiwiX2NhbGxlZTE3JCIsIl9jb250ZXh0MTciLCJmaWx0ZXJCeUNhdGVnb3J5TGlzdCIsIl9jYWxsZWUxOCIsIl9jYWxsZWUxOCQiLCJfY29udGV4dDE4IiwicHJvZHVjdCIsImNoaWxkQ2F0ZWdvcnlJZCIsInBhcmFtcyIsImdldEZpbHRlcmJ5Q2F0ZWdvcnkiLCJfY2FsbGVlMTkiLCJfcmVxJGJvZHk3IiwiX2NhbGxlZTE5JCIsIl9jb250ZXh0MTkiLCJnZXRQcm9kdWN0QnlTdWJjYXRlZ29yeSIsIl9jYWxsZWUyMCIsIl9yZXEkYm9keTgiLCJzZWFyY2giLCJfY2FsbGVlMjAkIiwiX2NvbnRleHQyMCIsIm9yZGVyIiwicmVxdWlyZWQiLCJfZGVmaW5lUHJvcGVydHkyIiwib3IiLCJsaWtlIiwic3ViQ2F0ZWdvcnlJZCIsImdldEFsbE1vYmlsZUNhdGVnb3J5IiwiX2NhbGxlZTIxIiwiX2NhbGxlZTIxJCIsIl9jb250ZXh0MjEiLCJnZXRBbGxTdWJDYXRlZ29yeUJ5SWQiLCJfY2FsbGVlMjIiLCJfY2FsbGVlMjIkIiwiX2NvbnRleHQyMiIsInN1YklkIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcGkvcmVzb3VyY2VzL2NhdGVnb3J5L2NhdGVnb3J5LmNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMnO1xyXG5jb25zdCB7IE9wIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICAgIC8qIEFkZCB1c2VyIGFwaSBzdGFydCBoZXJlLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4qL1xyXG5cclxuICAgIGFzeW5jIGFkZENhdGVnb3J5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBzbHVnIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IG5hbWU6IG5hbWUgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmNhdGVnb3J5LnVwZGF0ZSh7IHNsdWc6IHNsdWcgfSwgeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5jYXRlZ29yeS5jcmVhdGUoeyBuYW1lOiBuYW1lLCBzbHVnOiBzbHVnIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IGluc2VydGVkIGNhdGVnb3J5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYXN5bmMgYWRkU3ViQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGNhdGVnb3J5SWQsIHN1Yl9uYW1lIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IHN1Yl9uYW1lOiBzdWJfbmFtZSB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBhbHJlYWR5IGV4aXN0JywgNDA5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLlN1YkNhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1Yl9uYW1lOiBzdWJfbmFtZSB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNhdGVnb3J5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgbXNnOiBcIlN1Y2Nlc3NmdWxseSBpbnNlcnRlZCBjYXRlZ29yeVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgYWRkU3ViQ2hpbGRDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlJZCwgc3ViY2F0ZWdvcnlJZCwgbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLlN1YkNoaWxkQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IG5hbWU6IG5hbWUgfSB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignQ2F0ZWdvcnkgYWxyZWFkeSBleGlzdCcsIDQwOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDaGlsZENhdGVnb3J5LmNyZWF0ZSh7IGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsIHN1YmNhdGVnb3J5SWQ6IHN1YmNhdGVnb3J5SWQsIG5hbWU6IG5hbWUgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgaW5zZXJ0ZWQgY2F0ZWdvcnlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyB1cGRhdGVDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY2hpbGRjYXRlZ29yeUlkLCBzdWJjYXRlZ29yeUlkLCBzdWJfbmFtZSwgbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogc3ViY2F0ZWdvcnlJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkudXBkYXRlKHsgc3ViX25hbWU6IHN1Yl9uYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IHN1YmNhdGVnb3J5SWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdDYXRlZ29yeSBOb3QgRm91bmQnLCA0MDkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGNoaWxkY2F0ZWdvcnlJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2hpbGRDYXRlZ29yeS51cGRhdGUoeyBuYW1lOiBuYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IGNoaWxkY2F0ZWdvcnlJZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0NhdGVnb3J5IE5vdCBGb3VuZCcsIDQwOSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBtc2c6IFwiU3VjY2Vzc2Z1bGx5IFVwZGF0ZWRcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDYXRlZ29yeSB9XSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRDYXRlZ29yeUxpc3RIZWFkZXIocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5jYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGxpbWl0OiAzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGxpc3Q9PiByZXMuc3RhdHVzKDIwMCkuanNvbih7J3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0fSkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlPT4gbmV4dChlKSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKFwiRXJyb3JcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRTdWJDYXRlZ29yeUxpc3QocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7IGNhdGVnb3J5SWQ6IHJlcS5xdWVyeS5jYXRlZ29yeUlkIH0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuY2F0ZWdvcnksIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwibmFtZVwiXSB9XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRTdWJDaGlsZENhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3ViY2F0ZWdvcnlJZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICAgICAgICBkYi5TdWJDaGlsZENhdGVnb3J5LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViY2F0ZWdvcnlJZDogc3ViY2F0ZWdvcnlJZCB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuU3ViQ2hpbGRDYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldENhdGVnb3J5QnlJZChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeUlkID0gcmVxLnF1ZXJ5LmNhdGVnb3J5SWQgfHwgLTE7XHJcbiAgICAgICAgICAgIGRiLlN1YkNhdGVnb3J5LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiBmYWxzZSwgZGF0YTogW10gfSk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYXRlZ29yeSBsaXN0XHJcbiAgICBhc3luYyBnZXRNYWluTGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0TWFpbkxpc3RVcGRhdGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkLCBuYW1lLCBzbHVnIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuY2F0ZWdvcnkudXBkYXRlKHsgbmFtZTogbmFtZSwgc2x1Zzogc2x1ZyB9LCB7IHdoZXJlOiB7IGlkOiBkYXRhLmlkIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignQ2F0ZWdvcnkgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgVXBkYXRlZCBjYXRlZ29yeVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTdWIgY2F0ZWdvcnkgbGlzdFxyXG4gICAgYXN5bmMgZ2V0U3ViQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5jYXRlZ29yeSwgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdIH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0U3ViQ2F0TGlzdFVwZGF0ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIHN1Yl9uYW1lIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIuU3ViQ2F0ZWdvcnkudXBkYXRlKHsgc3ViX25hbWU6IHN1Yl9uYW1lIH0sIHsgd2hlcmU6IHsgaWQ6IGRhdGEuaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdTdWJfQ2F0ZWdvcnkgaXMgbm90IGZvdW5kJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIG1zZzogXCJTdWNjZXNzZnVsbHkgVXBkYXRlZCBTdWJfQ2F0ZWdvcnlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldERlbGV0ZWRTdWJDYXRMaXN0KHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChyZXEucXVlcnkuaWQpIH0gfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5TdWJDYXRlZ29yeS5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGxpc3QuaWQgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdJZCBpcyBub3QgZm91bmQnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnbXNnJzogJ3N1Y2Nlc3MnLCAnc3RhdHVzJzogXCJkZWxldGVkIFN1Yl9DYXRlZ29yeSBTZWNjZXNzZnVsbHlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvL2NoaWxkIGNhdGVnb3J5IFxyXG4gICAgYXN5bmMgZGVsZXRlQ2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICBkYi5jYXRlZ29yeS5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHJlcS5xdWVyeS5pZCkgfSB9KVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLmNhdGVnb3J5LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogZGF0YS5pZCB9IH0pLnRoZW4ociA9PiBbciwgZGF0YV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdjaGlsZF9jYXRlZ29yeSBpcyBub3QgZm91bmQnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3RhdHVzJzogXCJkZWxldGVkIGNhdGVnb3J5IFNlY2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldEFsbENhdGVnb3J5QnlTbHVnKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGIuY2F0ZWdvcnkuZmluZE9uZSh7XHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2F0ZWdvcnksIGluY2x1ZGU6IFt7IG1vZGVsOiBkYi5TdWJDaGlsZENhdGVnb3J5IH1dIH1dXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBmaWx0ZXJCeUNhdGVnb3J5TGlzdChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLnByb2R1Y3QuZmluZEFsbCh7XHJcbiAgICAgICAgICAgICAgICB3aGVyZTogeyBjaGlsZENhdGVnb3J5SWQ6IHJlcS5wYXJhbXMuaWQgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0RmlsdGVyYnlDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB7IGlkLCBuYW1lIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgZGIuU3ViQ2F0ZWdvcnkuZmluZE9uZSh7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXCJpZFwiLCBcInN1Yl9uYW1lXCJdLFxyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGlkLCBzdWJfbmFtZTogbmFtZSB9LFxyXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNoaWxkQ2F0ZWdvcnkgfV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBwcm9kdWN0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVxdWVzdEVycm9yKCdFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0UHJvZHVjdEJ5U3ViY2F0ZWdvcnkocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgeyBpZCwgbmFtZSB9ID0gcmVxLmJvZHk7XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2ggPSAnJSUnO1xyXG4gICAgICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoID0gJyUnICsgbmFtZSArICclJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYi5TdWJDYXRlZ29yeS5maW5kQWxsKHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcImlkXCIsIFwic3ViX25hbWVcIl0sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBkYi5wcm9kdWN0LCBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sIHJlcXVpcmVkOiB0cnVlLCB3aGVyZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbT3Aub3JdOiBbeyBuYW1lOiB7IFtPcC5saWtlXTogc2VhcmNoIH0sIHN1YkNhdGVnb3J5SWQ6IGlkIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihwcm9kdWN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7ICdzdWNjZXNzJzogdHJ1ZSwgZGF0YTogcHJvZHVjdCB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQoZXJyKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlcXVlc3RFcnJvcignRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vbW9iaWxlXHJcbiAgICBhc3luYyBnZXRBbGxNb2JpbGVDYXRlZ29yeShyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRiLmNhdGVnb3J5LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wiaWRcIiwgXCJuYW1lXCJdLFxyXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IGRiLlN1YkNhdGVnb3J5LCBpbmNsdWRlOiBbeyBtb2RlbDogZGIuU3ViQ2hpbGRDYXRlZ29yeSB9XSB9XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihsaXN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgJ3N1Y2Nlc3MnOiB0cnVlLCBkYXRhOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgbmV4dChlcnIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRBbGxTdWJDYXRlZ29yeUJ5SWQocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYi5wcm9kdWN0LmZpbmRBbGwoe1xyXG4gICAgICAgICAgICAgICAgd2hlcmU6IHsgc3ViQ2F0ZWdvcnlJZDogcmVxLmJvZHkuc3ViSWQgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyAnc3VjY2Vzcyc6IHRydWUsIGRhdGE6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KGVycilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZXF1ZXN0RXJyb3IoJ0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufVxyXG5cclxuXHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLFFBQUEsR0FBZUQsT0FBTyxDQUFDLFdBQVcsQ0FBQztFQUEzQkUsRUFBRSxHQUFBRCxRQUFBLENBQUZDLEVBQUU7QUFBMEIsSUFBQUMsUUFBQSxHQUVyQjtFQUVYLDREQUVNQyxXQUFXLFdBQUFBLFlBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxJQUFJLEVBQUU7SUFBQSxXQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLFVBQUFDLFFBQUE7TUFBQSxJQUFBQyxTQUFBLEVBQUFDLElBQUEsRUFBQUMsSUFBQTtNQUFBLE9BQUFMLFlB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