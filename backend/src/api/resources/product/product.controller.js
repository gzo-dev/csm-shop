import { db } from "../../../models";
const { Op, Sequelize } = require("sequelize");
import moment from "moment";
// import { queue } from '../../../kue';
export default {
  /* Add user api start here................................*/
  async getPhotoProduct(req, res) {
    const { productId } = req.query;
    db.productphoto
      .findAll({
        where: {
          productId,
        },
      })
      .then((product) => {
        return res.status(200).json({ ok: true, data: product });
      });
  },
  async addProduct(req, res, next) {
    try {
      const {
        categoryId,
        subCategoryId,
        childCategoryId,
        name,
        slug,
        brand,
        status,
        unitSize,
        sortDesc,
        desc,
        buyerPrice,
        price,
        qty,
        discount,
        discountPer,
        total,
        netPrice,
        image,
        size,
        newaddimage,
        phoneNumber,
        province,
        district,
        ward,
        square,
        provinceText,
        districtText,
        wardText,
        budget,
        typeRoom,
        interior,
        endow,
        rating,
        note,
        user_manager,
        author_phone,
        address,
        product_id,
        rent,
      } = req.body;
      db.product
        .create({
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
          rent: rent ? rent : 0,
        })
        .then((product) => {
          JSON.parse(image)?.map((item) =>
            db.productphoto.create({
              imgUrl: item?.path,
              productId: product.dataValues.id,
            })
          );
          if (newaddimage) {
            JSON.parse(newaddimage)?.map((item) =>
              db.productphoto.create({
                imgUrl: item?.imageUrl,
                productId: product.dataValues.id,
              })
            );
          }
          JSON.parse(size)?.map((item) =>
            db.productsize.create({
              size: item?.size,
              productId: product.dataValues.id,
              amount: item?.amount,
            })
          );
          res
            .status(200)
            .json({ success: true, msg: "Successfully inserted product" });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      // throw new RequestError('Error');
      return res.status(500).json(err);
    }
  },

  async getAllProductCategory(req, res, next) {
    let {
      searchText,
      id,
      subid,
      page = 1,
      pageSize = 10,
      typeRoom,
      rent,
      square,
      price,
      province,
      district,
      ward,
      star,
      reset,
    } = req.query;
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
    const whereConditions = {
      categoryId: id,
      subCategoryId: subid,
      [Op.or]: [
        { product_id: { [Op.substring]: searchText } },
        { name: { [Op.substring]: searchText } },
        { address: { [Op.substring]: searchText } },
        { wardText: { [Op.substring]: searchText } },
        { districtText: { [Op.substring]: searchText } },
        { provinceText: { [Op.substring]: searchText } },
        { price: { [Op.substring]: searchText } },
        {
          updatedAt: {
            [Op.substring]: moment(searchText, "DD-MM-YYYY HH:mm:ss"),
          },
        },
        {
          createdAt: {
            [Op.substring]: moment(searchText, "DD-MM-YYYY HH:mm:ss"),
          },
        },
        { "$user.firstName$": { [Op.substring]: searchText } },
      ],
    };
    if (id == 13) {
      if (typeRoom) {
        whereConditions.typeRoom = typeRoom;
      }

      if (rent !== undefined && rent.toString().length > 0) {
        switch (parseInt(rent)) {
          case 0:
            whereConditions.rent = { [Op.or]: [0, false] };
            break;
          case 1:
            whereConditions.rent = { [Op.or]: [1, true] };
            break;
          case 2:
            whereConditions.rent = 2;
            break;
        }
      }

      if (square) {
        console.log(square);
        switch (parseInt(square)) {
          case 1:
            whereConditions.square = { [Op.between]: [0, 20] };
            break;
          case 2:
            whereConditions.square = { [Op.between]: [20, 40] };
            break;
          case 3:
            whereConditions.square = { [Op.gte]: 40 };
            break;
        }
      }

      if (price) {
        switch (parseInt(price)) {
          case 1:
            whereConditions.price = { [Op.between]: [0, 1000000] };
            break;
          case 2:
            whereConditions.price = { [Op.between]: [1000000, 3000000] };
            break;
          case 3:
            whereConditions.price = { [Op.between]: [3000000, 5000000] };
            break;
          case 4:
            whereConditions.price = { [Op.between]: [5000000, 10000000] };
            break;
          case 5:
            whereConditions.price = { [Op.gte]: 10000000 };
            break;
        }
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
    } else if (id == 12) {
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

    try {
      // Thực hiện truy vấn dữ liệu với Sequelize
      const { count, rows: filteredList } = await db.product.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
      const totalPages = Math.ceil(count / pageSize);

      // Trả về kết quả với thông tin phân trang
      res.status(200).json({
        success: true,
        data: filteredList,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalItems: count,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  async index(req, res, next) {
    try {
      const { supplierId, categoryId, subCategoryId } = req.query;
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.user,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
          where: {
            supplierId: supplierId,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
          },
        })
        .then((product) => {
          res.status(200).json({ success: true, product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getAllProductList(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.SubCategory,
              attributes: ["id", "sub_name"],
              include: [{ model: db.category, attributes: ["id", "name"] }],
            },
            {
              model: db.user,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        })
        .then((product) => {
          res.status(200).json({ success: true, product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async update(req, res, next) {
    try {
      const {
        productId,
        categoryId,
        subCategoryId,
        childCategoryId,
        name,
        slug,
        brand,
        status,
        unitSize,
        desc,
        buyerPrice,
        price,
        qty,
        discount,
        discountPer,
        total,
        netPrice,
        images,
        size,
        newaddimage,
        phoneNumber,
        typeRoom,
        interior,
        square,
        endow,
        rating,
        note,
        user_manager,
        rent,
        author_phone,
        address,
        photo,
        province,
        district,
        ward,
        product_id,
        provinceText,
        districtText,
        wardText,
      } = req.body;
      db.product
        .findOne({ where: { id: productId } })
        .then((product) => {
          if (product) {
            return db.product.update(
              {
                categoryId: categoryId ? categoryId : product.categoryId,
                subCategoryId: subCategoryId
                  ? subCategoryId
                  : product.subCategoryId,
                childCategoryId: childCategoryId
                  ? childCategoryId
                  : product.childCategoryId,
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
                typeRoom,
                interior,
                square: square ? square : 0,
                endow: endow ? endow : 0,
                rating: rating ? rating : 0,
                note: note ? note : "",
                user_manager: user_manager ? user_manager : "",
                rent: rent ? rent : "",
                author_phone: author_phone ? author_phone : "",
                address: address ? address : "",
                province,
                district,
                ward,
                product_id: product_id ? product_id : "",
                provinceText: provinceText ? provinceText : "",
                districtText: districtText ? districtText : "",
                wardText: wardText ? wardText : "",
              },
              { where: { id: productId } }
            );
          }
          throw new RequestError("Not Found Product", 409);
        })
        .then(async (p) => {
          if (newaddimage) {
            JSON.parse(newaddimage)?.map((item) =>
              db.productphoto.create({
                imgUrl: item?.imageUrl,
                productId: productId,
              })
            );
          }
          if (size) {
            db.productsize.destroy({
              where: { productId },
            });
            db.productsize.bulkCreate(
              JSON.parse(size).map(({ size, amount }) => ({
                size,
                amount,
                productId,
              }))
            );
          }
          if (images) {
            await db.productphoto.destroy({
              where: { productId: productId },
            });
            db.productphoto.bulkCreate(
              JSON.parse(images).map((item) => ({ ...item, productId }))
            );
          }
          res.status(200).json({ success: true, msg: "Updated Successfully" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductListByCategoryClient(req, res, next) {
    const { categoryId, pageSize = 10 } = req.query;

    const whereConditions = {
      categoryId: categoryId,
    };

    try {
      // Thực hiện truy vấn dữ liệu với Sequelize
      const { count, rows: filteredList } = await db.product.findAndCountAll({
        where: whereConditions,
        order: [["DESC"]],
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
        // limit: pageSize,
        // offset: (page - 1) * pageSize,
      });

      // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
      const totalPages = Math.ceil(count / pageSize);

      // Trả về kết quả với thông tin phân trang
      res.status(200).json({
        success: true,
        results: filteredList,
        pagination: {
          // currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalItems: count,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  async getProductListByCategoryClientWeb(req, res, next) {
    const { categoryId, pageSize = 10, subCategoryId } = req.query;

    const whereConditions = {
      categoryId: categoryId,
      subCategoryId: subCategoryId,
    };

    try {
      // Thực hiện truy vấn dữ liệu với Sequelize
      const { count, rows: filteredList } = await db.product.findAndCountAll({
        where: whereConditions,
        order: [["DESC"]],
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
        // limit: pageSize,
        // offset: (page - 1) * pageSize,
      });

      // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
      const totalPages = Math.ceil(count / pageSize);

      // Trả về kết quả với thông tin phân trang
      res.status(200).json({
        success: true,
        results: filteredList,
        pagination: {
          // currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalItems: count,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  async getProductListByCategory(req, res, next) {
    let {
      searchText,
      id,
      subid,
      page = 1,
      pageSize = 10,
      typeRoom,
      rent,
      square,
      price,
      province,
      district,
      ward,
      star,
      reset,
    } = req.query;
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
    let searchTextValid;
    if (searchText === undefined || searchText == null) {
      searchTextValid = "";
    } else {
      searchTextValid = searchText;
    }

    const whereConditions = {
      categoryId: id,
      subCategoryId: subid,
      [Op.or]: [
        { product_id: { [Op.substring]: searchTextValid } },
        { name: { [Op.substring]: searchTextValid } },
        { address: { [Op.substring]: searchTextValid } },
        { wardText: { [Op.substring]: searchTextValid } },
        { districtText: { [Op.substring]: searchTextValid } },
        { provinceText: { [Op.substring]: searchTextValid } },
        { price: { [Op.substring]: searchTextValid } },
        {
          updatedAt: {
            [Op.substring]: moment(searchTextValid, "DD-MM-YYYY HH:mm:ss"),
          },
        },
        {
          createdAt: {
            [Op.substring]: moment(searchTextValid, "DD-MM-YYYY HH:mm:ss"),
          },
        },
        { "$user.firstName$": { [Op.substring]: searchTextValid } },
      ],
    };
    if (id == 13) {
      if (typeRoom) {
        whereConditions.typeRoom = typeRoom;
      }

      if (rent !== undefined && rent.toString().length > 0) {
        switch (parseInt(rent)) {
          case 0:
            whereConditions.rent = { [Op.or]: [0, false] };
            break;
          case 1:
            whereConditions.rent = { [Op.or]: [1, true] };
            break;
          case 2:
            whereConditions.rent = 2;
            break;
        }
      }

      if (square) {
        switch (parseInt(square)) {
          case 1:
            whereConditions.square = { [Op.between]: [0, 20] };
            break;
          case 2:
            whereConditions.square = { [Op.between]: [20, 40] };
            break;
          case 3:
            whereConditions.square = { [Op.gte]: 40 };
            break;
        }
      }

      if (price) {
        switch (parseInt(price)) {
          case 1:
            whereConditions.price = { [Op.between]: [0, 1000000] };
            break;
          case 2:
            whereConditions.price = { [Op.between]: [1000000, 3000000] };
            break;
          case 3:
            whereConditions.price = { [Op.between]: [3000000, 5000000] };
            break;
          case 4:
            whereConditions.price = { [Op.between]: [5000000, 10000000] };
            break;
          case 5:
            whereConditions.price = { [Op.gte]: 10000000 };
            break;
        }
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
    } else if (id == 12) {
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

    try {
      // Thực hiện truy vấn dữ liệu với Sequelize
      const { count, rows: filteredList } = await db.product.findAndCountAll({
        where: whereConditions,
        order: [["DESC"]],
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
          },
          {
            model: db.user_manager_product,
            // attributes: ["id", "firstName", "lastName"],
            required: false,
          },
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
      const totalPages = Math.ceil(count / pageSize);

      // Trả về kết quả với thông tin phân trang
      res.status(200).json({
        success: true,
        data: filteredList,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalItems: count,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  async getProductListByFilter(req, res, next) {
    try {
      let {
        id,
        subid,
        typeRoom,
        rent,
        square,
        price,
        province,
        district,
        ward,
        star,
        pageSize = 10,
        page,
        reset,
      } = req.query;
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
      let whereConditions = {
        categoryId: id,
        subCategoryId: subid,
      };
      if (id == 13) {
        if (typeRoom) {
          whereConditions.typeRoom = typeRoom;
        }

        if (rent !== undefined && rent.toString().length > 0) {
          switch (parseInt(rent)) {
            case 0:
              whereConditions.rent = { [Op.or]: [0, false] };
              break;
            case 1:
              whereConditions.rent = { [Op.or]: [1, true] };
              break;
            case 2:
              whereConditions.rent = 2;
              break;
          }
        }

        if (square) {
          switch (parseInt(square)) {
            case 1:
              whereConditions.square = Sequelize.literal(
                "CAST(square AS INT) BETWEEN 0 AND 20"
              );
              break;
            case 2:
              whereConditions.square = { [Op.between]: [20, 40] };
              break;
            case 3:
              whereConditions.square = { [Op.gte]: 40 };
              break;
          }
        }

        if (price) {
          switch (parseInt(price)) {
            case 1:
              whereConditions.price = { [Op.between]: [0, 1000000] };
              break;
            case 2:
              whereConditions.price = { [Op.between]: [1000000, 3000000] };
              break;
            case 3:
              whereConditions.price = { [Op.between]: [3000000, 5000000] };
              break;
            case 4:
              whereConditions.price = { [Op.between]: [5000000, 10000000] };
              break;
            case 5:
              whereConditions.price = { [Op.gte]: 10000000 };
              break;
          }
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
      } else if (id == 12) {
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

      const { count, rows: productList } = await db.product.findAndCountAll({
        where: whereConditions,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
            required: false,
          },
          {
            model: db.user_manager_product,
            // attributes: ["id", "firstName", "lastName"],
            required: false,
          },
        ],
        attributes: { exclude: ["desc"] },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      const totalPages = Math.ceil(count / pageSize);
      return res.status(200).json({
        success: true,
        data: productList,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalItems: count,
          totalPages: totalPages,
        },
      });
    } catch (err) {
      console.log(err);
      throw new RequestError("Error");
    }
  },
  async getProductSuggestHotel(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt","DESC"]],
          where: {
            categoryId: 12,
            // subCategoryId: req.query.subCategoryId,
          },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          attributes: {exclude: ["desc"]},
          limit: 4,
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductSuggestApartment(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          where: {
            categoryId: 13,
            // subCategoryId: req.query.subCategoryId,
          },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          attributes: {exclude: ["desc"]},
          limit: 4,
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductSuggest2(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          where: {
            endow: 1,
          },
          // include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          attributes: {exclude: ["desc"]},
          limit: 4,
        })
        .then((list) => {
          res.status(200).json({ ok: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductListById(req, res, next) {
    try {
      db.product
        .findAll({
          where: { id: req.query.id },
          include: [
            { model: db.productphoto, attributes: ["id", "imgUrl"] },
            {
              model: db.user,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
          order: [["createdAt", "DESC"]],
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getWebProductListById(req, res, next) {
    try {
      const size = await db.productsize.findAll({
        where: { productId: req.query.id },
      });
      db.product
        .findOne({
          where: { id: req.query.id },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          order: [["createdAt", "DESC"]],
        })
        .then((list) => {
          res.status(200).json({ success: true, data: list, datasize: size });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async addProductOffer(req, res, next) {
    try {
      const { productId, qty, discount_per, discount_price, total, net_price } =
        req.body;
      db.ProductOffer.findOne({ where: { id: productId } })
        .then((list) => {
          if (!list) {
            return db.ProductOffer.create({
              productId: productId,
              image: req.file ? req.file.location : "",
              qty: qty,
              discount_per: discount_per,
              discount_price: discount_price,
              total: total,
              net_price: net_price,
            });
          } else {
            return db.ProductOffer.update(
              {
                qty: qty,
                discount_per: discount_per,
                discount_price: discount_price,
                total: total,
                net_price: net_price,
              },
              { where: { id: list.id } }
            );
          }
        })
        .then((p) => {
          res.status(200).json({ success: true, msg: "Successfully" });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getProductOffer(req, res, next) {
    try {
      db.ProductOffer.findAll({
        include: [
          {
            model: db.product,
            attributes: [
              "id",
              "categoryId",
              "price",
              "item_name",
              "description",
              "brand",
            ],
            include: [{ model: db.category, attributes: ["id", "name"] }],
          },
        ],
      })
        .then((list) => {
          res.status(200).json({ success: true, data: list });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async searchProductBySubCat(req, res, next) {
    try {
      db.SubCategory.findOne({
        where: { sub_name: req.body.subCat },
      })
        .then((data) => {
          if (data) {
            return db.product.findAll({
              where: { subCategoryId: data.id },
            });
          }
        })
        .then((list) => {
          console.log(JSON.stringify(list));
          res.status(200).json({ success: true, data: list });
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async productDelete(req, res, next) {
    db.product
      .findOne({ where: { id: parseInt(req.query.id) } })
      .then((product) => {
        if (product) {
          return db.product.destroy({ where: { id: product.id } });
        }
        throw new RequestError("Product is not found");
      })
      .then((re) => {
        return res.status(200).json({ status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },
  async productDeleteBulk(req, res, next) {
    db.product
      .destroy({ where: { id: req.body.list } })
      .then((re) => {
        return res
          .status(200)
          .json({ ok: true, status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },

  async productOfferDelete(req, res, next) {
    db.ProductOffer.findOne({ where: { id: parseInt(req.params.id) } })
      .then((product) => {
        if (product) {
          return db.ProductOffer.destroy({ where: { id: product.id } });
        }
        throw new RequestError("Product is not found");
      })
      .then((re) => {
        return res.status(200).json({ status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },

  async multiplePhotoUpload(req, res, next) {
    let attachmentEntries = [];
    var productId = req.body.productId;
    for (var i = 0; i < req.files.length; i++) {
      attachmentEntries.push({
        productId: productId,
        name: req.files[i].filename,
        mime: req.files[i].mimetype,
        imgUrl: req.files[i].path,
      });
    }

    db.product
      .findOne({
        where: { id: productId },
      })
      .then((r) => {
        if (r) {
          // return queue.create('img-upload', {
          //     productId: productId,
          //     productName: r.item_name,
          //     attachmentEntries: attachmentEntries,
          // }).save();
          for (var i = 0; i < req.files.length; i++) {
            db.productphoto.create({ ...attachmentEntries[i] });
          }
        }
      })
      .then((r) => {
        res.status(200).json({ success: true, data: req.files });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ errors: ["Error insert photo"] });
      });
  },

  async getAllPhoto(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          attributes: ["id", "name", "brand"],
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
        })
        .then((data) => {
          res.status(200).json({ success: true, data });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async deleteSliderPhoto(req, res, next) {
    db.productphoto
      .findOne({ where: { id: parseInt(req.query.id) } })
      .then((product) => {
        if (product) {
          return db.productphoto.destroy({ where: { id: req.query.id } });
        }
        throw new RequestError("Product is not found");
      })
      .then((re) => {
        return res.status(200).json({ status: "deleted Product Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },
  //All GroceryStample product
  // edit to sale product
  async getAllGrocerryStaples(req, res, next) {
    try {
      db.product
        .findAll({
          // attributes: ["id", "slug"],
          // where: { discount: 'grocery-staple' },
          order: [["discountPer", "DESC"]],
          limit: 8,
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product || [] });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async getAllProductBySlug(req, res, next) {
    try {
      db.category
        .findOne({
          attributes: ["id"],
          include: [
            {
              model: db.product,
              order: [["createdAt", "DESC"]],
              include: [
                { model: db.productphoto, attributes: ["id", "imgUrl"] },
              ],
            },
          ],
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  // filter product

  async getFilterbyProduct(req, res, next) {
    try {
      let search = "%%";
      if (req.query.search) {
        search = "%" + req.query.search + "%";
      }
      db.SubCategory.findAll({
        attributes: ["id", "sub_name"],
        include: [
          {
            model: db.product,
            order: [["createdAt", "DESC"]],
            required: true,
            where: {
              [Op.or]: [
                { name: { [Op.like]: search }, slug: { [Op.like]: search } },
              ],
            },
          },
        ],
      })

        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  async GetAllByCategory(req, res, next) {
    try {
      db.SubCategory.findOne({
        where: { sub_name: req.body.name },
        include: [
          {
            model: db.SubChildCategory,
            include: [
              {
                model: db.product,
                order: [["createdAt", "DESC"]],
                include: [
                  { model: db.productphoto, attributes: ["id", "imgUrl"] },
                ],
              },
            ],
          },
        ],
      })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },

  // aws image delete
  async awsProductPhotoDelete(req, res, next) {
    try {
      const { id, imgUrl } = req.body;
      // db.productphoto.destroy({where: {imgUrl, id}})
      // deleteFileFromS3(imgUrl)

      db.productphoto
        .destroy({ where: { id: id } })

        .then((success) => {
          res.status(200).json({
            success: true,
            msg: "Successflly deleted image from s3 Bucket",
          });
        });
    } catch (err) {
      next(err);
      // res.status(500).json({ 'success':false, msg: err})
    }
  },

  async getProductSubChildCat(req, res, next) {
    try {
      const { subCategoryId, childCategoryId } = req.body;
      db.product
        .findAll({
          where: {
            childCategoryId: childCategoryId,
            subCategoryId: childCategoryId,
          },
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      next(err);
      // res.status(500).json({ 'success':false, msg: err})
    }
  },
  async getProductSuggest(req, res, next) {
    try {
      // const{ subCategoryId, childCategoryId } = req.body;
      db.product
        .findAll({
          // where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
          order: Sequelize.literal("RAND()"),
          limit: 8,
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      next(err);
      // res.status(500).json({ 'success':false, msg: err})
    }
  },
  async getSizeProduct(req, res, next) {
    try {
      const { productId } = req.query;
      db.productsize
        .findAll({
          where: { productId },
        })
        .then((product) => {
          res.status(200).json({ success: true, data: product });
        })
        .catch(function (err) {
          console.log(err);
          next(err);
        });
    } catch (err) {
      next(err);
      res.status(500).json({ success: false, msg: err });
    }
  },
};
