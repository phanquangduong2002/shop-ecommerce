"use strict";

const notification = require("../models/notification.model");

const pushNotiToSystem = async ({
  type = "SHOP-001",
  receivedId = 1,
  senderId = 1,
  options = {},
}) => {
  let noti_content;
  if (type === "SHOP-001") {
    noti_content = `@@@ vừa mới thêm 1 sản phẩm: @@@@`;
  } else if (type === "PROMOTION-001") {
    noti_content = `@@@ vừa mới thêm 1 voucher mới: @@@@`;
  }

  const newNoti = await notification.create({
    noti_type: type,
    noti_content: noti_content,
    noti_senderId: senderId,
    noti_receivedId: receivedId,
    noti_options: options,
  });

  return newNoti;
};

module.exports = {
  pushNotiToSystem,
};
