import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import {
  createTodo,
  readTodo,
  readIncompleteTodos
} from "./controllers/todoController";

createConnection()
  .then(async connection => {
    const app = express();
    app.get("/create", createTodo);

    app.get("/read", readTodo);
    app.get("/incomplete", readIncompleteTodos);

    app.listen(3000, () => {
      console.log(`server listening on port 3000`);
    });
  })
  .catch(error => console.log(error));
