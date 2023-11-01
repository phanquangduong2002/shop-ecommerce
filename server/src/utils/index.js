"use strict";

const _ = require("lodash");

const { Types } = require("mongoose");

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

// ["a", "b"] => {a: 1, b: 1}
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

// ["a", "b"] => {a: 0, b: 0}
const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] == null) {
      delete obj[k];
    }
  });
  return obj;
};

/*
  const a = {
    c: {
      d: 1,
      e, 2
    }
  }

  db.collection.updateOne({
    `c.d`: 1,
    `c.e`: 2
  })
 */

const updateNestedObjectParser = (obj, prefix = "") => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] === null || obj[key] === undefined) {
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      Object.assign(result, updateNestedObjectParser(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  });

  return result;
};
module.exports = {
  convertToObjectIdMongodb,
  getInfoData,
  getSelectData,
  unGetSelectData,
  removeUndefinedObject,
  updateNestedObjectParser,
};
