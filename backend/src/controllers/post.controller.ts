import { Request, Response } from "express";
import db from "../config/db";
import { APIResponse } from "../config/response";
import { APIRequest } from "../types";

async function getPosts(req: Request, res: Response) {
  const posts = await db.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: 20,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!posts) {
    return APIResponse("Failed to Fetch Posts", 500, res);
  }

  return APIResponse("Success", 200, res, posts);
}

async function getUserPosts(req: APIRequest, res: Response) {
  if (!req.user) {
    return APIResponse("Unauthorized", 400, res);
  }

  const { id } = req.user;

  try {
    const posts = await db.post.findMany({
      where: {
        user_id: id,
      },
    });

    if (!posts) {
      throw Error("unable to find posts");
    }

    return APIResponse("success", 200, res, posts);
  } catch (error: any) {
    return APIResponse(error.message, 500, res);
  }
}

async function createPost(req: APIRequest, res: Response) {
  if (!req.user) {
    return APIResponse("Unauthorized", 401, res);
  }

  const { id } = req.user;
  const { title, content } = req.body;

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return APIResponse("Unauthorized", 401, res);
  }

  const newPost = await db.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  if (!newPost) {
    return APIResponse("Failed to create post", 500, res);
  }

  return APIResponse("Post created Successfully", 201, res, { id: newPost.id });
}

async function editPost(req: APIRequest, res: Response) {
  if (!req.user) {
    return APIResponse("Unauthorized", 401, res);
  }

  const { id: post_id } = req.params;
  const { title, content } = req.body;

  const editPost = await db.post.update({
    where: {
      id: post_id,
    },
    data: {
      title: title,
      content: content,
    },
  });

  if (!editPost) {
    return APIResponse("Failed to update post", 500, res);
  }

  return APIResponse("Successfully Edited Post", 200, res);
}

async function deletePost(req: APIRequest, res: Response) {
  if (!req.user) {
    return APIResponse("Unauthorized", 401, res);
  }

  const { id: post_id } = req.params;

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return APIResponse("Unauthorized", 401, res);
  }

  const deletePost = await db.post.delete({
    where: {
      id: post_id,
    },
  });

  if (!deletePost) {
    return APIResponse("Failed to delete post", 500, res);
  }

  return APIResponse("Post Deleted Successfully", 200, res);
}

async function getPostById(req: APIRequest, res: Response) {
  const { id } = req.params;

  const post = await db.post.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        orderBy: {
          updatedAt: "desc",
        },
      },
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  if (!post) {
    return APIResponse("Post not found", 404, res);
  }

  return APIResponse("Post Found", 200, res, post);
}

async function searchPosts(req: Request, res: Response) {
  const searchTerm = req.query.term;

  if (!searchTerm) {
    return APIResponse("Bad Request", 400, res);
  }

  const posts = await db.post.findMany({
    where: {
      title: {
        contains: searchTerm.toString(),
      },
    },
  });

  if (!posts) {
    return APIResponse("No Posts Found", 404, res);
  }

  return APIResponse("Posts Found", 200, res, { posts });
}

async function createComment(req: APIRequest, res: Response) {
  const { comment, commenter_name } = req.body;
  const { id: post_id } = req.params;

  if (!post_id || !comment) {
    return APIResponse("Bad Request", 400, res);
  }

  const newComment = await db.comment.create({
    data: {
      comment: comment,
      commenter_name: commenter_name,
      post_id: post_id,
    },
  });

  if (!newComment) {
    return APIResponse("Failed to create comment", 500, res);
  }

  return APIResponse("Comment Added Successfully", 201, res);
}

async function getComments(req: Request, res: Response) {
  const { id: post_id } = req.params;

  if (!post_id) {
    return APIResponse("Bad Request", 400, res);
  }

  const comments = await db.comment.findMany({
    where: {
      post_id: post_id,
    },
  });

  if (!comments) {
    return APIResponse("Comments Not Found", 404, res);
  }

  return APIResponse("Comments Found", 200, res, { comments });
}

async function likePost(req: Request, res: Response) {}

async function updatePostViews(req: Request, res: Response) {}

export default {
  getPosts,
  getUserPosts,
  createPost,
  editPost,
  deletePost,
  getPostById,
  searchPosts,
  createComment,
  getComments,
  likePost,
  updatePostViews,
};
