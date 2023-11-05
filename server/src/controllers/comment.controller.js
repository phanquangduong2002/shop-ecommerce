"use strict";

const CommentService = require("../services/comment.service");

const { SuccessResponse } = require("../core/success.response");

class CommentController {
  createComment = async (req, res, next) => {
    new SuccessResponse({
      message: "Create comment success!",
      metaData: await CommentService.createComment(req.body),
    }).send(res);
  };

  deleteComment = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete comment success!",
      metaData: await CommentService.deleteComment(req.body),
    }).send(res);
  };

  getCommentByParentId = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list comments success!",
      metaData: await CommentService.getCommentByParentId(req.query),
    }).send(res);
  };
}

module.exports = new CommentController();
