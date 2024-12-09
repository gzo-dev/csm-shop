import { isNumber } from "lodash";
import { db } from "../../../models";
const { Op, Sequelize, where } = require("sequelize");
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
          is_draft: false,
        },
      })
      .then((product) => {
        return res.status(200).json({ ok: true, data: product });
      });
  },
  async addProduct(req, res, next) {
    try {
      const { uid } = req.user;
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
        meta_description,
        is_draft
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
          rating: isNumber(rating) ? rating : 0,
          note: note ? note : "",
          user_manager: uid,
          author_phone: author_phone ? author_phone : "",
          address: address ? address : "",
          product_id: product_id ? product_id : "",
          rent: isNumber(rent) ? rent : 0,
          meta_description,
          is_draft: is_draft,
        })
        .then(async (product) => {
          try {
            await db.user_manager_product.create({
              user_owner: uid,
              user_manager: uid,
              product_id: product.dataValues.id,
            });
          } catch (error) {
            console.log(error);
          }
          JSON.parse(image)?.map(async (item) => {
            db.productphoto.create({
              imgUrl:
                req.protocol +
                "://" +
                req.get("host") +
                "/" +
                item?.path?.replace(".watermark/", ""),
              productId: product.dataValues.id,
            });
          });

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
            .json({
              success: true,
              msg: "Successfully inserted product",
              d: product,
            });
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
      searchText = "",
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
        // { "$user.firstName$": { [Op.substring]: searchText } },
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
        whereConditions.rating = star || 5;
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
        order: [["id", "DESC"]],
        include: [
          {
            model: db.user_manager_product,
            // attributes: ["id", "firstName", "lastName"],
            required: false,
          },
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
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

  async getAllProductList(req, res, next) {
    try {
      db.product
        .findAll({
          where: {
            // is_draft: false,
          },
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
    // const {user }
    const { uid } = req.user;
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
        meta_description,
        is_draft
      } = req.body;
      db.product
        .findOne({ where: { id: productId } })
        .then(async (product) => {
          if (product) {
            await db.history_edit_product.create({
              product_id: productId,
              user_id: uid,
              time_updated: new Date().toString(),
            });
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
                rating: isNumber(rating) ? rating : 0,
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
                meta_description,
                is_draft
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
        order: [["createdAt", "DESC"]],
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
    try {
      const { categoryId, subCategoryId, page = 1, pageSize = 12 } = req.query;

      const currentPage = parseInt(page);
      const size = parseInt(pageSize);

      const whereConditions = {};
      if (categoryId) whereConditions.categoryId = categoryId;
      if (subCategoryId) whereConditions.subCategoryId = subCategoryId;
      // Đếm số lượng bản ghi
      const count = await db.product.count({
        where: whereConditions,
      });

      // Lấy danh sách bản ghi với phân trang
      const filteredList = await db.product.findAll({
        where: {...whereConditions, is_draft: false,},
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
          },
          { model: db.productphoto, attributes: ["id", "imgUrl"] },
        ],
        attributes: {
          exclude: [
            "desc",
            "slug",
            "updatedAt",
            "phoneNumber",
            "author_phone",
            "sortDesc",
            "interior",
            "note",
          ],
        },
        limit: size,
        offset: (currentPage - 1) * size,
      });

      // Tính toán tổng số trang dựa trên số lượng dữ liệu và kích thước trang
      const totalPages = Math.ceil(count / size);

      // Trả về kết quả với thông tin phân trang
      res.status(200).json({
        success: true,
        results: filteredList,
        pagination: {
          currentPage: currentPage,
          pageSize: size,
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
      searchText = "",
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
        whereConditions.rating = star || 5;
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
        order: [["createdAt", "DESC"]],
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
        searchText = "",
        userId,
        isFrom,
        is_draft,
        minPrice, 
        maxPrice,
        minSquare,
        maxSquare
        // rent
      } = req.query;
      let sort;
      let sortPrice
      if (square === "asc" || square === "desc") {
        sort = square;
      }
      if (price=== "asc" || price=== "desc") {
        sortPrice= price
      }
      if (userId == -1) {
        userId = undefined;
      }
      if (typeRoom == 0) {
        typeRoom = undefined;
      }
      if (is_draft== -1 || !is_draft) {
        is_draft= undefined
      }
      if (square == 0 || square == "asc" || square == "desc") {
        square = undefined;
      }
      if (price == 0 || price == "asc" || price == "desc") {
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
        categoryId: parseInt(id),
        subCategoryId: parseInt(subid),
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
          // { "$user.firstName$": { [Op.substring]: searchText } },
        ],
      };
      if (id == 13) {
        if (typeRoom) {
          whereConditions.typeRoom = typeRoom;
        }

        if (rent !== undefined) {
          switch (parseInt(rent)) {
            case 0:
              whereConditions.rent = 0;
              break;
            case 1:
              whereConditions.rent = 1;
              break;
            case 2:
              whereConditions.rent = 2;
              break;
          }
        }
        if(isFrom== "client") {
          if(minPrice && maxPrice) {
            whereConditions.price= { [Op.between]: [parseInt(minPrice), parseInt(maxPrice)]}
          }
          if(minSquare && maxSquare) {
            whereConditions.square= { [Op.between] : [parseInt(minSquare), parseInt(maxSquare)]}
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
            // apply for client wed
            case 4: 
              whereConditions.square = { [Op.lte]: 50 };
              break
            case 5: 
              whereConditions.square = {  [Op.between]: [50, 70] };
              break
            case 6: 
              whereConditions.square = { [Op.between]: [70, 100] };
              break
            case 7: 
              whereConditions.square = { [Op.gte]: 100 };
              break
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
          whereConditions.rating = star || 5;
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
      if(isFrom=== "client") {
        whereConditions.is_draft= false
      }
      // console.log("is_draft", is_draft)
      if(is_draft== 0) {
        whereConditions.is_draft= false
      }
      if(is_draft== 1) {
        whereConditions.is_draft= true
      }
      // console.log(whereConditions)
      
      const subWhere = {};
      const filter = {};
      if (userId) {
        subWhere.id = userId;
        filter.boolean = true;
      } else {
        filter.boolean = false;
      }

      let order= [];
      if (sort) {
        order.push(["square", sort]);
      }
      if (sortPrice) {
        order.push(["price", sortPrice])
      }
      else {
        order = [["id", "desc"]];
      }
      let { count, rows: productList } = await db.product.findAndCountAll({
        where: {...whereConditions},
        order: order,
        
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
            required: false,
            where: {
                  is_deleted: false,
                },
          },
          {
            model: db.user_manager_product,
            // where: {
            //       is_deleted: false,
            //     },
            required: false,
            include: [
              {
                model: db.user,
                where: {
                  is_deleted: false,
                },
                attributes: ["id", "firstName", "lastName"],
                required: filter.boolean,
                as: "managerUser",
                where: subWhere,
              },
            ],
          },
          { model: db.productphoto, attributes: ["id", "imgUrl"] }
        ],
        attributes: { exclude: ["desc"] },
        limit: parseInt(pageSize),
        offset: (page - 1) * parseInt(pageSize),
      });
      // console.log(productList)
      // if(userId) {
      //   productList= productList?.filter(item=> item?.user_manager_products?.filter(item2=> item2?.userManager?.id== userId)?.length > 0)
      //   // count= productList.length
      // }
      const totalPages = Math.ceil(count / pageSize);
      return res.status(200).json({
        success: true,
        data: productList,
        filterManager: userId && userId != -1 ? true : false,
        pagination: {
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
          totalItems: count,
          totalPages: totalPages,
        },
      });
    } catch (err) {
      console.log(err);
      // throw new RequestError("Error");
      return res.status(500).json({ ok: false });
    }
  },
  async getProductSuggestHotel(req, res, next) {
    try {
      db.product
        .findAll({
          order: [["createdAt", "DESC"]],
          where: {
            categoryId: 12,
            is_draft: false,
            // subCategoryId: req.query.subCategoryId,
          },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          attributes: { exclude: ["desc"] },
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
            is_draft: false,
            // subCategoryId: req.query.subCategoryId,
          },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          attributes: { exclude: ["desc"] },
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
            is_draft: false,
          },
          // include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          attributes: { exclude: ["desc"] },
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
        .findOne({
          where: { id: req.query.id },
          include: [
            { model: db.productphoto, attributes: ["id", "imgUrl"] },
            {
              model: db.user_manager_product,
              required: false,
              include: [
                {
                  model: db.user,
                  attributes: ["id", "firstName", "lastName"],
                  as: "managerUser",
                },
              ],
            },
            {
              model: db.user,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
          order: [["createdAt", "DESC"]],
        })
        .then((list) => {
          res.status(200).json({ success: true, data: [list] });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductListByIdMeta(req, res, next) {
    try {
      db.product
        .findOne({
          where: { id: req.query.id },
          attributes: ["photo", "name", "meta_description"]
        })
        .then((p) => {
          res.status(200).json({ success: true, data: p });
        })
        .catch(function (err) {
          next(err);
        });
    } catch (err) {
      throw new RequestError("Error");
    }
  },
  async getProductUserManage(req, res, next) {
    try {
      const { uid } = req.query;
      const rows = await db.user_manager_product.findAll({
        where: {
          user_manager: uid,
        },
      });
      // console.log(rows)
      return res.status(200).json({ data: rows, ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
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
          // console.log(JSON.stringify(list));
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
    // console.log("req.files", req.files);
    for (var i = 0; i < req.files.length; i++) {
      attachmentEntries.push({
        productId: productId,
        name: req.files[i].filename,
        mime: req.files[i].mimetype,
        imgUrl:
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          req.files[i].path?.replace(".watermark/", ""),
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
        return res
          .status(200)
          .json({
            success: true,
            data: req.files.map((item) => ({
              ...item,
              path: item?.path?.replace("./watermark/", ""),
            })),
            ok: true,
          });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).json({ errors: ["Error insert photo"] });
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
  async getHistoryEditProduct(req, res, next) {
    try {
      const { product_id } = req.query;
      const rows = await db.history_edit_product.findAll({
        where: {
          product_id,
        },
        order: [["time_updated", "DESC"]],
        include: [
          {
            model: db.user,
            required: false,
          },
          {
            model: db.product,
            required: false,
          },
        ],
      });
      return res.status(200).json({ data: rows, ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getProductManageByUser(req, res, next) {
    try {
      const rows = await db.user_manager_product.findAll({
        where: {},
        order: [["createdAt", "DESC"]],
        attributes: ["product_id", "user_manager", "user_owner"],
        include: [
          {
            model: db.user,
            required: true,
            as: "managerUser",
            attributes: ["id", "firstName", "lastName", "address", "email"],
            where: {
              is_deleted: 0,
              hidden: 0
            },
          },
          {
            model: db.product,
            required: true,
            as: "product",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json({ data: rows, ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
};
