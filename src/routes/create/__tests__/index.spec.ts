import * as registerApi from "..";
import * as request from "supertest";
import * as express from "express";
import * as bodyParser from "body-parser";

jest.mock("../controller", () => ({
  // @ts-ignore
  createNote: (req, res) => {
    res.status(200).send({});
  }
}));

const successBody = {
  "title": "Note 2222222",
  "content": "The 2020 UEFA European Football Championship, commonly referred to as 2020 UEFA European Championship, UEFA Euro 2020, or simply Euro 2020, is the 16th UEFA European Championship, the quadrennial international men's football championship of Europe organised by the Union of European Football Associations (UEFA).[1]"
}

describe("routes/create", () => {
  let app: express.Router;
  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const router = express.Router();
    registerApi.default(router);
    // @ts-ignore
    app.use(router);
  });

  test("Request validation succeeds", async done => {
    await request(app)
      .post("/api/v1/notes")
      .set("Accept", "application/json")
      .send(successBody)
      .expect(200);
    done();
  });
});
