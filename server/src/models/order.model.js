"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

var orderSchema = new Schema(
  {
    order_userId: {
      type: Number,
      required: true,
    },
    order_checkout: {
      type: Object,
      default: {},
    },
    /*
       order_checkout: {
            totalPrice,
            totalApllyDiscount,
            feeShip
       }
     */
    order_shipping: {
      type: Object,
      default: {},
    },
    /*
        order_shipping: {
            street,
            city,
            state,
            country
        }
     */
    order_payment: {
      type: Object,
      default: {},
    },
    order_products: {
      type: Array,
      required: true,
    },
    /* 
       order_products: shop_order_ids_new
     */
    order_trackingNumber: {
      type: String,
      default: "#0000108112002",
    },
    order_status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "cancelled", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, orderSchema);
