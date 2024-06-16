import express from "express";
import postController from "../controllers/post.controller";
import { verifyUserToken } from "./middleware";

const router = express.Router();

router.get("/me", verifyUserToken, postController.getUserPosts);

router.get("/all", postController.getPosts);

router.post("/create", verifyUserToken, postController.createPost);
router.get("/search", postController.searchPosts);

router.get("/:id", postController.getPostById);
router.put("/:id/edit", verifyUserToken, postController.editPost);
router.delete("/:id/delete", verifyUserToken, postController.deletePost);

router.post("/like", postController.likePost);
router.post("/view", postController.updatePostViews);

router.get("/:id/comments", postController.getComments);
router.post("/:id/comments/create", postController.createComment);

export default router;
