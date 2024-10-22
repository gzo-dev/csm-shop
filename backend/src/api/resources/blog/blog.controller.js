import { Op } from "sequelize";
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
  async addBlog(req, res) {
    try {
      db.blog.create({
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
  async updateBlog(req, res) {
    try {
      await db.blog.update(
        { ...req.body },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },

  async getListBlog(req, res) {
    const type = req.query?.type;
    const whereCondition = {};
    if (type) {
      whereCondition.type = type;
  }
    const blogList = await db.blog.findAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["content"] },
    });
    return res.status(200).json({ ok: true, data: blogList });
  },
  async getListSuggestTour(req, res) {
    const blogList = await db.blog.findAll({
      limit: 4,
    });
    return res.status(200).json({ success: true, data: blogList });
  },
  async getListBlogCategory(req, res) {
    try {
      const {isFrom }= req.query
      const whereConditions= {type: req.query.type}
      if(isFrom== "client") {
        whereConditions.is_draft= false
      }
      const blogList = await db.blog.findAll({
        where: whereConditions,
        attributes: isFrom === "client" ? undefined : { exclude: ["content"] },
      });
      return res.status(200).json({ ok: true, data: blogList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getDetailBlogCategory(req, res) {
    try {
      if (req.query.type == 15) {
        const blogList = await db.blog.findAll({
          where: {
            type: {
              [Op.or]: [5, 14],
            },
          },
          attributes: { exclude: ["content"] },
        });
        return res.status(200).json({ ok: true, data: blogList });
      }
      const blogList = await db.blog.findAll({
        where: {
          type: req.query.type,
        },
        // attributes: {exclude: ['content']}
      });
      return res.status(200).json({ ok: true, data: blogList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getBlogDetail(req, res) {
    try {
      const blogList = await db.blog.findAll({
        where: {
          id: req.query.id,
        },
        include: [
          {
            model: db.user,
            attributes: ["id", "firstName", "lastName"],
            required: false,
          },
        ],
      });
      return res.status(200).json({ ok: true, data: blogList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async deleteTour(req, res) {
    const { id } = req.body;
    db.blog.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ ok: true });
  },
  async getListBlogAdmin(req, res) {
    const {type, is_draft}= req.query
    const whereCondition = {};
    if (type) {
        whereCondition.type = type;
    }
    if(is_draft== 0) {
      whereCondition.is_draft= false
    }
    if(is_draft== 1) {
      whereCondition.is_draft= true
    }

    const blogList = await db.blog.findAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["content"] },
      include: [
        {
          model: db.user,
          attributes: ["id", "firstName", "lastName"],
          required: false,
        },
      ],
    });
    return res.status(200).json({ ok: true, data: blogList });
  },
};
