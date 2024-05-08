import { Op } from "sequelize";
import { db } from "../../../models";
import moment from "moment";

export default {
  async searchProduct(req, res) {
    const data = req.query;
    const {
      typeBooking,
      realEstateType,
      province,
      district,
      ward,
      budget,
      subCategoryId,
      minBudget,
      maxBudget,
      departurePoint,
      destinationPoint,
      type,
      page,
    } = data;
    if (parseInt(typeBooking) == 1) {
      let whereConditions = {
        categoryId: 13,
      };
      if (realEstateType) {
        whereConditions.subCategoryId = realEstateType;
      }
      if (parseInt(province) > 0) {
        whereConditions.province = province;
      }
      if (district) {
        whereConditions.district = district;
      }
      if (ward) {
        whereConditions.ward = ward;
      }
      if (budget) {
        whereConditions.budget = budget;
      }
      if (subCategoryId) {
        whereConditions.subCategoryId = subCategoryId;
      }
      if (minBudget && maxBudget) {
        const result = await db.product.findAndCountAll({
          where: {
            ...whereConditions,
            price: {
              [Op.between]: [minBudget, maxBudget],
            },
          },
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          order: [["createdAt", "DESC"]],
        });
        return res
          .status(200)
          .json({ data: result?.rows, count: result?.count, success: true });
      } else {
        const result = await db.product.findAndCountAll({
          where: whereConditions,
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          order: [["createdAt", "DESC"]],
        });
        const count = await db.product.count({
          where: whereConditions,
        });
        return res
          .status(200)
          .json({ data: result?.rows, count: count, success: true });
      }
    }
    //
    if (parseInt(typeBooking) == 2) {
      let whereConditions = {
        categoryId: 12,
      };
      if (realEstateType) {
        whereConditions.subCategoryId = realEstateType;
      }
      if (province) {
        // whereConditions.province= province
      }
      if (district) {
        whereConditions.district = district.toString();
      }
      if (ward) {
        whereConditions.ward = ward.toString();
      }
      if (budget) {
        whereConditions.budget = budget;
      }
      if (subCategoryId) {
        whereConditions.subCategoryId = parseInt(subCategoryId);
      }

      if (minBudget && maxBudget) {
        const result = await db.product.findAndCountAll({
          where: {
            ...whereConditions,
            price: {
              [Op.between]: [minBudget, maxBudget],
            },
          },
          order: [["createdAt", "DESC"]],
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
        });
        return res.status(200).json({
          data: result?.rows,
          count: result?.rows?.length,
          success: true,
        });
      } else {
        const result = await db.product.findAndCountAll({
          where: whereConditions,
          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({
          data: result?.rows,
          count: result?.rows?.length,
          success: true,
        });
      }
    }
    if (parseInt(typeBooking) === 3) {
      let whereConditions = {};
      if (departurePoint) {
        whereConditions.departure = departurePoint;
      }
      if (destinationPoint) {
        whereConditions.destination = destinationPoint;
      }
      if (type) {
        whereConditions.type = parseInt(type);
      }
      if (minBudget && maxBudget) {
        const result = await db.tour.findAndCountAll({
          where: {
            ...whereConditions,
            price: {
              [Op.between]: [minBudget, maxBudget],
            },
          },

          attributes: { exclude: ["content"] },
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({
          data: result?.rows,
          count: result?.rows?.length,
          success: true,
        });
      } else {
        const result = await db.tour.findAndCountAll({
          where: whereConditions,
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({
          data: result?.rows,
          count: result?.rows?.length,
          success: true,
        });
      }
    }
    if (parseInt(typeBooking) === 4) {
    } else {
      return res.status(200).json([]);
    }
  },

  async searchProductText(req, res) {
    const { search, id, subid, page = 1, pageSize = 10 } = req.query;
    let searchTextValid
    if(search=== undefined || search== null) {
        searchTextValid= ""
    }
    else {
        searchTextValid= search
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
};
