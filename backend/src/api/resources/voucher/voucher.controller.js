import { db } from "../../../models"

export default {
    async getAllVoucher(req, res) {
        const voucherList= await db.voucher.findAll({
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json({ok: true, data: voucherList})
    },
    async createVoucher(req, res) {
        await db.voucher.create({
            ...req.body
        })
        return res.status(200).json({ok: true})
    },
    async deleteVoucher(req, res) {
        const {voucherId }= req.body
        await db.voucher.destroy({
            where: {
                id: voucherId
            }
        })

        return res.status(200).json({ok: true})
    },
    async detailVoucher(req, res) {
        const {voucherId }= req.query
        const data= await db.voucher.findOne({
            where: {
                id: voucherId
            }
        })
        return res.status(200).json({ok: true, data})
    },
    async applyVoucher(req, res) {
        const {code }= req.body
        const data= await db.voucher.findOne({
            where: {
                code
            }
        })
        if(data) {
            return res.status(200).json({ok: true, data: {id: data.id}})
        }
        else {
            return res.status(200).json({ok: false, data})
        }
    }
}