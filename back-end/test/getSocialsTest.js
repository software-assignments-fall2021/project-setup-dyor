const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const Twitter = require("../schemas/tweetsModel");
const Reddit = require("../schemas/redditModel");
const { RedditOne, RedditTwo, TwitterOne, TwitterTwo } = require("./mockdata");

const getSocialsTest = () => {
  describe("GET /:media/:asset", () => {
    beforeEach(async () => {
      await Reddit.collection.dropIndexes();
      await Reddit.collection.drop();

      await Twitter.collection.dropIndexes();
      await Twitter.collection.drop();

      await Reddit.create(RedditOne);
      await Reddit.create(RedditTwo);

      await Twitter.create(TwitterOne);
      await Twitter.create(TwitterTwo);
    });

    it("Should return status=200 and appropiate data object for valid media and asset twitter", async () => {
      const media = "twitter";
      const coin = "btc";
      const res = await request(app).get(`/${media}/${coin}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("name");
      expect(res.body[0]).to.have.property("username");
      expect(res.body[0]).to.have.property("tweet");
      expect(res.body[0]).to.have.property("url");
    });

    it("Should return status=200 and appropiate data object for valid media and asset reddit", async () => {
      const media = "reddit";
      const coin = "bitcoin";
      const res = await request(app).get(`/${media}/${coin}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("data");
      expect(res.body[0]).to.have.property("kind");
      expect(res.body[0].data).to.have.property("author");
      expect(res.body[0].data).to.have.property("url");
    });

    it("Should return status=404 and appropiate error message for invalid media", async () => {
      const media = "google";
      const res = await request(app).get(`/${media}/btc`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    });

    it("Should return status=404 and appropiate error message for invalid coin twitter ", async () => {
      const coin = "XYZ";
      const res = await request(app).get(`/twitter/${coin}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Page not found",
      });
    });

    it("Should return status=404 and appropiate error message for invalid coin reddit", async () => {
      const coin = "XYZ";
      const res = await request(app).get(`/reddit/${coin}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Page not found",
      });
    });

    it("Should return status=200 and appropiate message putting twitter", async () => {
      const res = await request(app).put("/twitter");
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Written successfully",
      });
    });

    it("Should return status=200 and appropiate message putting reddit", async () => {
      const res = await request(app).put("/reddit");
      expect(res.status).to.equal(201);
      expect(res.body).to.be.an("object");
      expect(res.body).to.be.deep.equal({
        message: "Written successfully",
      });
    });
  });
};

module.exports = getSocialsTest;
