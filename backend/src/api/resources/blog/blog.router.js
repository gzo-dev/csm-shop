import express from "express"
import blogController from "./blog.controller";
import authenticateJWT from "../../../middleware/verify_token";


export const blogRouter = express.Router();

blogRouter.post("/", authenticateJWT, blogController.addBlog)
blogRouter.put("/", authenticateJWT, blogController.updateBlog)
blogRouter.get("/s/t", blogController.getListSuggestTour)
blogRouter.get("/", blogController.getListBlog)
blogRouter.get("/t", blogController.getListBlogCategory)
blogRouter.get("/t/d", blogController.getDetailBlogCategory)
blogRouter.get("/d", blogController.getBlogDetail)
blogRouter.delete("/", blogController.deleteTour)
blogRouter.get("/admin", authenticateJWT, blogController.getListBlogAdmin)