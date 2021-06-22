import * as express from "express";

import create from "./create";
import search from "./search";
import update from "./update";
import get from "./get";
import _delete from "./_delete";

export default (router: express.Router): void => {
  create(router);
  search(router);
  update(router);
  get(router);
  _delete(router);
};
