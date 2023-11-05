"use strict";

const comment = require("../models/comment.model");

/*
   key features: Comment service
   + add comment [User || Shop]
   + get a list of comments [User || Shop]
   + delete a comment [User || Shop || Admin]
 */

class CommentService {
  static async createComment({
    productId,
    userId,
    content,
    parentCommentId = null,
  }) {}
}

module.exports = CommentService;
