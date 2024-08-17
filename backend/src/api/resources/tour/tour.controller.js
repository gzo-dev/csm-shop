import { db } from "../../../models";

function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let code = "";

  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  code += "-";

  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      code += "-";
    } else {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
  }

  code += "-";

  for (let i = 0; i < 5; i++) {
    if (i === 3) {
      code += "-";
    } else {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }

  code += "-";

  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return code;
}

export default {
  async addTour(req, res) {
    try {
      await db.tour.create({
        ...req.body,
        slug: "",
        time_created: new Date().toString(),
        discount: 0,
        photo: req.body.image,
        content: req.body.content,
        desc: req.body.desc,
      });

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async updateTour(req, res) {
    try {
      const { uid } = req.user;

      await db.tour.update(
        { ...req.body, tour_id: req.body.tour_id },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      await db.history_edit_tour.create({
        tour_id: req.body.id,
        user_id: uid,
        time_updated: new Date().toString(),
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getListTour(req, res) {
    const type = req.query?.type;
    const { province, ward, district, is_draft, isFrom } = req.query;

    // Tạo đối tượng where condition, nếu có type thì thêm vào
    const whereCondition = {};
    if (type) {
      whereCondition.type = type;
    }
    if (province) {
      whereCondition.destination = province;
    }
    if(is_draft== 0) {
      whereCondition.is_draft= false
    }
    if(is_draft== 1) {
      whereCondition.is_draft= true
    }
    const whereConditions= {}
    if(isFrom== "client") {
      whereConditions.is_draft= false
    }
    // if (district) {
    //   whereCondition.district= district
    // }
    // if (ward) {
    //   whereCondition.ward= ward
    // }

    const tourList = await db.tour.findAll({
      order: [["createdAt", "DESC"]],
      where: whereCondition,
      attributes: {
        exclude: ["content"], // Thay 'field1', 'field2' bằng các trường bạn muốn loại bỏ
      },
    });
    return res.status(200).json({ ok: true, data: tourList });
  },
  async getListSuggestTour(req, res) {
    const tourList = await db.tour.findAll({
      is_draft: false,
      limit: 4,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["content"], // Thay 'field1', 'field2' bằng các trường bạn muốn loại bỏ
      },
    });
    return res.status(200).json({ success: true, data: tourList });
  },
  async getListTourCategory(req, res) {
    try {
      const {isFrom }= req.query
      const whereConditions= {type: req.query.type,}
      if(isFrom== "client") {
        whereConditions.is_draft= false
      }
      const tourList = await db.tour.findAll({
        where: whereConditions,
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({ ok: true, data: tourList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getTourDetail(req, res) {
    try {
      const tourList = await db.tour.findAll({
        where: {
          id: req.query.id,
        },
      });
      return res.status(200).json({ ok: true, data: tourList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getTourDetailClient(req, res) {
    try {
      const tourList = await db.tour.findOne({
        where: {
          id: req.query.id,
        },
      });
      return res.status(200).json({ ok: true, data: [tourList] });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async deleteTour(req, res) {
    const { id } = req.body;
    db.tour.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ ok: true });
  },
  async getHistoryEditProduct(req, res, next) {
    try {
      const { tour_id } = req.query;
      const rows = await db.history_edit_tour.findAll({
        where: {
          tour_id: tour_id
        },
        order: [["time_updated", "DESC"]],
        include: [
          {
            model: db.user,
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
};
