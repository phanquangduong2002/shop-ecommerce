"use strict";

const { NotFoundError } = require("../core/error.response");
const comment = require("../models/comment.model");

const { findProduct } = require("../models/repositories/product.repo");

const { convertToObjectIdMongodb } = require("../utils/index");

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
  }) {
    const newComment = new comment({
      comment_productId: productId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentCommentId,
    });
    let rightValue;
    if (parentCommentId) {
      // reply comment
      const parentComment = await comment.findById(parentCommentId);
      if (!parentComment) throw new NotFoundError("Comment not found!");
      rightValue = parentComment.comment_right;
      // updateMany
      await comment.updateMany(
        {
          comment_productId: convertToObjectIdMongodb(productId),
          comment_right: { $gte: rightValue },
        },
        {
          $inc: {
            comment_right: 2,
          },
        }
      );
      await comment.updateMany(
        {
          comment_productId: convertToObjectIdMongodb(productId),
          comment_left: { $gte: rightValue },
        },
        {
          $inc: {
            comment_left: 2,
          },
        }
      );
    } else {
      const maxRightValue = await comment.findOne(
        {
          comment_productId: convertToObjectIdMongodb(productId),
        },
        "comment_right",
        { sort: { comment_right: -1 } }
      );

      if (maxRightValue) {
        rightValue = maxRightValue + 1;
      } else {
        rightValue = 1;
      }
    }

    // insert to comment
    newComment.comment_left = rightValue;
    newComment.comment_right = rightValue + 1;

    await newComment.save();

    return newComment;
  }

  static async getCommentByParentId({
    productId,
    parentCommentId = null,
    limit = 50,
    offset = 0,
  }) {
    // if (parentCommentId) {
    //   const parent = await comment.findById(parentCommentId);
    //   if (!parent) throw new NotFoundError("Not found comment for product");

    //   const comments = await comment
    //     .find({
    //       comment_productId: convertToObjectIdMongodb(productId),
    //       comment_left: { $gt: parent.comment_left },
    //       comment_right: { $lte: parent.comment_right },
    //     })
    //     .select({
    //       comment_left: 1,
    //       comment_right: 1,
    //       comment_content: 1,
    //       comment_parentId: 1,
    //     })
    //     .sort({
    //       comment_left: 1,
    //     });

    //   return comments;
    // }

    const comments = await comment
      .find({
        comment_productId: convertToObjectIdMongodb(productId),
        comment_parentId:
          parentCommentId === null
            ? parentCommentId
            : convertToObjectIdMongodb(parentCommentId),
      })
      .select({
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parentId: 1,
      })
      .sort({
        comment_left: 1,
      });

    return comments;
  }

  static async deleteComment({ commentId, productId }) {
    // check product exists in te database
    const foundProduct = await findProduct({
      product_id: productId,
    });

    if (!foundProduct) throw new NotFoundError("Product not found!");

    // 1. Xac dinh gia tri left vs right of CommentId

    const foundComment = await comment.findById(commentId);

    if (!foundComment) throw new NotFoundError("Comment not found!");

    const leftValue = foundComment.comment_left;
    const rightValue = foundComment.comment_right;

    // 2. Tính width
    const width = rightValue - leftValue + 1;

    // 3. xoa tat ca commentId con
    await comment.deleteMany({
      comment_productId: convertToObjectIdMongodb(productId),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });

    // 4. Cap nhat left va right con lai
    await comment.updateMany(
      {
        comment_productId: convertToObjectIdMongodb(productId),
        comment_right: {
          $gt: rightValue,
        },
      },
      {
        $inc: {
          comment_right: -width,
        },
      }
    );

    await comment.updateMany(
      {
        comment_productId: convertToObjectIdMongodb(productId),
        comment_left: {
          $gt: rightValue,
        },
      },
      {
        $inc: {
          comment_left: -width,
        },
      }
    );

    return true;
  }
}

module.exports = CommentService;
