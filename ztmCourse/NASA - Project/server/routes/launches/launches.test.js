const request = require("supertest");
const { loadPlanetsData } = require("../../models/planets.model");
const app = require("../../src/app");
const { connectMongo, disconnectMongo } = require("../../utils/mongo");

describe("launches API", () => {
  beforeAll(async () => {
    await connectMongo();
    await loadPlanetsData();
  });

  afterAll(async () => {
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "ZTM155",
      rocket: "ZTM experimental IS1",
      target: "Kepler-442 b",
      launchDate: "January 17, 30",
    };

    const launchDataWithoutDate = {
      mission: "ZTM155",
      rocket: "ZTM experimental IS1",
      target: "Kepler-442 b",
    };

    const launchDataWithoutParameter = {
      rocket: "",
      target: "Kepler-186 f",
      launchDate: "January 17, 30",
    };

    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("it should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutParameter)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing launch parameter",
      });
    });

    test("it should catch invalid date format", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "Invalid Date Format" });
    });
  });
});
