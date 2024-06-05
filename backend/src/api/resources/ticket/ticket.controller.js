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
  async addTicket(req, res) {
    try {
      await db.ticket.create({
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
  async updateTicket(req, res) {
    try {
      await db.ticket.update(
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
  async getListTicket(req, res) {
    const ticketList = await db.ticket.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["content"] },
    });
    return res.status(200).json({ ok: true, data: ticketList });
  },
  async getListSuggestTicket(req, res) {
    const ticketList = await db.ticket.findAll({
      limit: 4,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ success: true, data: ticketList });
  },
  async getListTicketCategory(req, res) {
    try {
      const ticketList = await db.ticket.findAll({
        where: {
          type: req.query.type,
        },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({ ok: true, data: ticketList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async getTicketDetail(req, res) {
    try {
      const ticketList = await db.ticket.findAll({
        where: {
          id: req.query.id,
        },
      });
      return res.status(200).json({ ok: true, data: ticketList });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async deleteTicket(req, res) {
    const { id } = req.body;
    db.ticket.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ ok: true });
  },
};
