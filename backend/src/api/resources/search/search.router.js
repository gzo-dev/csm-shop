import express from 'express';
import searchController from './search.controller';

export const searchRouter = express.Router();

searchRouter.get("/", searchController.searchProduct)
searchRouter.get("/p/text", searchController.searchProductText)