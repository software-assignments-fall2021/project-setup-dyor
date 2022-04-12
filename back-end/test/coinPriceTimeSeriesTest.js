const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const axios = require("axios");
const sinon = require("sinon");
const app = require("../app");
const fs = require("fs");

const baseURL = "/coinPriceTimeSeries";

const coinPriceTimerSeriesTest = () => {
  describe("coinPriceTimeSeries", () => {
    describe("GET /coinPriceTimeSeries", () => {
      let stubAPI;

      const mockedFileResponseObj = [
        {
          time_period_start: "2021-11-04T00:00:00.0000000Z",
          time_period_end: "2021-11-05T00:00:00.0000000Z",
          time_open: "2021-11-04T00:00:00.0000000Z",
          time_close: "2021-11-04T23:59:00.0000000Z",
          rate_open: 62939.87716275478,
          rate_high: 63104.00191797576,
          rate_low: 60792.62179140194,
          rate_close: 61434.92296456507,
        },
        {
          time_period_start: "2021-11-05T00:00:00.0000000Z",
          time_period_end: "2021-11-06T00:00:00.0000000Z",
          time_open: "2021-11-05T00:00:00.0000000Z",
          time_close: "2021-11-05T23:59:00.0000000Z",
          rate_open: 61436.9953734023,
          rate_high: 62525.20258356643,
          rate_low: 60827.82405708815,
          rate_close: 61036.90390647799,
        },
        {
          time_period_start: "2021-11-06T00:00:00.0000000Z",
          time_period_end: "2021-11-07T00:00:00.0000000Z",
          time_open: "2021-11-06T00:00:00.0000000Z",
          time_close: "2021-11-06T23:59:00.0000000Z",
          rate_open: 61012.792445148494,
          rate_high: 61584.12103829724,
          rate_low: 60145.40409160071,
          rate_close: 61529.48772365027,
        },
        {
          time_period_start: "2021-11-07T00:00:00.0000000Z",
          time_period_end: "2021-11-08T00:00:00.0000000Z",
          time_open: "2021-11-07T00:00:00.0000000Z",
          time_close: "2021-11-07T23:59:00.0000000Z",
          rate_open: 61531.73917111925,
          rate_high: 63281.52163045246,
          rate_low: 61402.31060452912,
          rate_close: 63281.52163045246,
        },
      ];

      const mockedResponseObj = {
        data: [
          {
            time_period_start: "2021-11-04T00:00:00.0000000Z",
            time_period_end: "2021-11-05T00:00:00.0000000Z",
            time_open: "2021-11-04T00:00:00.0000000Z",
            time_close: "2021-11-04T23:59:00.0000000Z",
            rate_open: 62939.87716275478,
            rate_high: 63104.00191797576,
            rate_low: 60792.62179140194,
            rate_close: 61434.92296456507,
          },
          {
            time_period_start: "2021-11-05T00:00:00.0000000Z",
            time_period_end: "2021-11-06T00:00:00.0000000Z",
            time_open: "2021-11-05T00:00:00.0000000Z",
            time_close: "2021-11-05T23:59:00.0000000Z",
            rate_open: 61436.9953734023,
            rate_high: 62525.20258356643,
            rate_low: 60827.82405708815,
            rate_close: 61036.90390647799,
          },
          {
            time_period_start: "2021-11-06T00:00:00.0000000Z",
            time_period_end: "2021-11-07T00:00:00.0000000Z",
            time_open: "2021-11-06T00:00:00.0000000Z",
            time_close: "2021-11-06T23:59:00.0000000Z",
            rate_open: 61012.792445148494,
            rate_high: 61584.12103829724,
            rate_low: 60145.40409160071,
            rate_close: 61529.48772365027,
          },
        ],
      };

      beforeEach(() => {
        sinon
          .stub(fs, "exists")
          .withArgs("BTC_11-04-2021_11-07-2021.json")
          .returns(true);
        sinon
          .stub(fs, "readFile")
          .withArgs(
            "./public/timeSeriesData/BTC_11-04-2021_11-07-2021.json",
            "utf-8",
          )
          .yields(null, JSON.stringify(mockedFileResponseObj));

        sinon
          .stub(fs, "writeFile")
          .withArgs(
            "./public/timeSeriesData/BTC_11-04-2021_11-07-2021.json",
            "utf-8",
          )
          .yields(null, {});
        stubAPI = sinon.stub(axios, "request").resolves(mockedResponseObj);
      });

      afterEach(() => {
        fs.exists.restore();
        fs.readFile.restore();
        fs.writeFile.restore();
        stubAPI.restore();
      });

      it("Should return status=200 and the the time series for a year provided that the coin_symbol and other query parameters are valid, and has the data stored for time_start and time_end ", async () => {
        const coin_symbol = "BTC";
        const period_id = "1DAY";
        const time_start = new Date("2021-11-04T12:00:00.0000000Z");
        const time_end = new Date("2021-11-07T12:59:00.0000000Z");
        const limit = 4;
        const res = await request(app)
          .get(baseURL)
          .query({ coin_symbol, period_id, time_start, time_end, limit });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.equal(limit);
        const requiredProperties = [
          "time_period_start",
          "time_period_end",
          "time_open",
          "time_close",
          "rate_open",
          "rate_high",
          "rate_low",
          "rate_close",
        ];
        res.body.forEach((element) => {
          for (let i = 0; i < requiredProperties.length; i++) {
            expect(element).have.property(requiredProperties[i]);
          }
        });
      });

      it("Should return status=200 and the the time series for a year provided that the coin_symbol and other query parameters are valid, even if the data was not stored for time_start and time_end ", async () => {
        fs.readFile.restore();
        sinon
          .stub(fs, "readFile")
          .withArgs(
            "./public/timeSeriesData/BTC_11-04-2021_11-06-2021.json",
            "utf-8",
          )
          .yields("FILE NOPE", null);

        const coin_symbol = "BTC";
        const period_id = "1DAY";
        const time_start = "2021-11-04T12:01:00.0000000Z";
        const time_end = "2021-11-06T12:59:00.0000000Z";

        const limit = 3;

        const res = await request(app)
          .get(baseURL)
          .query({ coin_symbol, period_id, time_start, time_end, limit });

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.equal(limit);

        const requiredProperties = [
          "time_period_start",
          "time_period_end",
          "time_open",
          "time_close",
          "rate_open",
          "rate_high",
          "rate_low",
          "rate_close",
        ];

        res.body.forEach((element) => {
          for (let i = 0; i < requiredProperties.length; i++) {
            expect(element).have.property(requiredProperties[i]);
          }
        });
      });

      it("Should return status=404 given an unknown route 'NA'", async () => {
        const res = await request(app).get("/NA");
        expect(res.status).to.equal(404);
      });
    });
  });
};

module.exports = coinPriceTimerSeriesTest;
