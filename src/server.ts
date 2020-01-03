import * as express from "express";
import "reflect-metadata";
import { getAuthors } from "./controllers/authorsController";
import {
  createTodo,
  getTodos,
  getCompleteTodos,
  getInCompleteTodos
} from "./controllers/todoController";

const app = express();
app.post("/todos", createTodo);

app.get("/todos", getTodos);
app.get("/todos/complete", getCompleteTodos);
app.get("/todos/incomplete", getInCompleteTodos);
app.get("/authors", getAuthors);

app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
