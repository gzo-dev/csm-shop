import express from "express"
import blogController from "./blog.controller";


export const blogRouter = express.Router();

blogRouter.post("/", blogController.addBlog)
blogRouter.put("/", blogController.updateBlog)
blogRouter.get("/s/t", blogController.getListSuggestTour)
blogRouter.get("/", blogController.getListBlog)
blogRouter.get("/t", blogController.getListBlogCategory)
blogRouter.get("/d", blogController.getBlogDetail)
blogRouter.delete("/", blogController.deleteTour)
blogRouter.get("/admin", blogController.getListBlogAdmin)