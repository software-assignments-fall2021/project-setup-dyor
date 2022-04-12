const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const coinLabelTest = require("./coinLabelTest");
const coinPredictTest = require("./coinPredictTest");
const coinPresentPriceTest = require("./coinPresentPriceTest");
const coinPriceTimerSeriesTest = require("./coinPriceTimeSeriesTest");
const getNewsTest = require("./getNewsTest");
const getSocialsTest = require("./getSocialsTest");
const sentimentTest = require("./sentimentTest");
const userAssetTest = require("./userAssetTest");
const wordcloudTest = require("./wordcloudTest");
const UsersRouteTest = require("./usersTest");

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority&ssl=true`;
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

describe("TESTING ALL ROUTES INVOLVING DB", () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("Should refresh the news in the database", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
  });

  coinLabelTest();
  coinPredictTest();
  coinPresentPriceTest();
  getNewsTest();
  getSocialsTest();
  sentimentTest();
  userAssetTest();
  wordcloudTest();
  UsersRouteTest();
});

describe("TESTING ALL ROUTES NOT INVOLVING DB", () => {
  coinPriceTimerSeriesTest();
});
