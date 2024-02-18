import { Op } from "sequelize"
import { db } from "../../../models"

export default {
    async searchProduct(req, res) {
        const data = req.query
        const { typeBooking, realEstateType, province, district, ward, budget, subCategoryId, minBudget, maxBudget } = data
        if (parseInt(typeBooking) == 1) {
            let whereConditions= {
                categoryId: 13
            }
            if(realEstateType) {
                whereConditions.subCategoryId= realEstateType
            }
            if(province) {
                // whereConditions.province= province
            }
            if(district) {
                whereConditions.district= district
            }
            if(ward) {
                whereConditions.ward= ward
            }
            if(budget) {
                whereConditions.budget= budget
            }
            if(minBudget && maxBudget ) {
                const result= await db.product
                .findAll({
                    where: {...whereConditions, price: {
                        [Op.between]: [minBudget, maxBudget]
                    }},
                    include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                })
                return res.status(200).json(result)
            }
            else {
                const result= await db.product
                    .findAll({
                        where: whereConditions,
                        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                    })
                return res.status(200).json(result)
            }
            
        }
        // 
        if (parseInt(typeBooking) == 2) {
            let whereConditions= {
                categoryId: 12
            }
            if(realEstateType) {
                whereConditions.subCategoryId= realEstateType
            }
            if(province) {
                // whereConditions.province= province
            }
            if(district) {
                whereConditions.district= district.toString()
            }
            if(ward) {
                whereConditions.ward= ward.toString()
            }
            if(budget) {
                whereConditions.budget= budget
            }
            if(subCategoryId) {
                whereConditions.subCategoryId= parseInt(subCategoryId)
            }
            if(minBudget && maxBudget ) {
                const result= await db.product
                .findAll({
                    where: {...whereConditions, price: {
                        [Op.between]: [minBudget, maxBudget]
                    }},
                    include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                })
                return res.status(200).json(result)
            }
            else {
                const result= await db.product
                    .findAll({
                        where: whereConditions,
                        include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                    })
                return res.status(200).json(result)
            }
        }
        if (parseInt(typeBooking) === 3) {

        }
        if (parseInt(typeBooking) === 4) {

        }
    }
}
