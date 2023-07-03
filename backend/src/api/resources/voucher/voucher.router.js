import express from "express"
import voucherController from "./voucher.controller";

export const voucherRouter = express.Router();

voucherRouter.route("/").get(voucherController.getAllVoucher)
voucherRouter.route("/").post(voucherController.createVoucher)
voucherRouter.route("/").delete(voucherController.deleteVoucher)
voucherRouter.route("/detail").get(voucherController.detailVoucher)
voucherRouter.route("/apply").post(voucherController.applyVoucher)