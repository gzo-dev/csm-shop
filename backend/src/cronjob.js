import { db } from "./models";

const cron = require("node-cron");

// Định nghĩa cron job
const checkExpiredVouchers = cron.schedule("* * * * *", async () => {
  try {
    // Lấy tất cả các voucher từ cơ sở dữ liệu
    const vouchers = await db.voucher.findAll();

    // Lặp qua từng voucher và kiểm tra ngày hết hạn
    vouchers.forEach(async (v) => {
      const expireDate = new Date(v.expire);
      const currentDate = new Date();

      // So sánh ngày hết hạn với ngày hiện tại
      if (expireDate < currentDate) {
        // Nếu voucher đã hết hạn, xóa voucher khỏi cơ sở dữ liệu
        await db.voucher.destroy({
          where: {
            id: v.id,
          },
        });
      }
    });

    console.log("Cron job completed");
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

checkExpiredVouchers.start();

export default checkExpiredVouchers;