import * as express from "express";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import {
  createTodo,
  readTodos,
  readCompleteTodos,
} from "./controllers/todoController";

createConnection()
  .then(async connection => {
    const app = express();
    app.post("/create", createTodo);

    app.get("/read", readTodos);
    app.get("/incomplete", readCompleteTodos);

    app.listen(3000, () => {
      console.log(`server listening on port 3000`);
    });
  })
  .catch(error => console.log(error));
