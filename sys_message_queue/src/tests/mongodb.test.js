"use strict";

const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/shoppeDEV";

const testSchema = new mongoose.Schema({ name: String });

const Test = mongoose.model("Test", testSchema);

describe("Mongoose Connecttion", () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(connectString);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should connect to mongoose", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
