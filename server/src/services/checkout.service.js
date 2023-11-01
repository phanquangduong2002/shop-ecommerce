"use strict";

const { NotFoundError } = require("../core/error.response");

class CheckoutService {
  // login and without login
  /*
        {
            cartId,
            userId,
            shop_order_ids: [
                {
                    shopId,
                    shop_discount: [],
                    item_products: [
                        {
                            price,
                            quantity,
                            productId
                        }
                    ]
                },
                {
                    shopId,
                    shop_discount: [
                        {
                            shopId,
                            discountId,
                            codeId
                        }
                    ],
                    item_products: [
                        {
                            price,
                            quantity,
                            productId
                        }
                    ]
                }
            ]
        }
     */

  static async checkoutReview({ cartId, userId, shop_order_ids }) {}
}

module.exports = CheckoutService;
