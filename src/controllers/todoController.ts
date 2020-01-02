import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import Todo from "../entity/Todo";
import TodoRepository from "../entity/TodoRepository";
import TodoMetadata from "../entity/TodoMetadata";

let initialized = false;
let todoRepository: TodoRepository;
let todoMetadataRepository: Repository<TodoMetadata>;

const initialize = () => {
  initialized = true;
  const connection = getConnection();
  todoRepository = connection.getCustomRepository(TodoRepository);
  todoMetadataRepository = connection.getRepository(TodoMetadata);
};

export const createTodo = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (todoRepository === undefined) {
    initialize();
  }
  try {
    const todoMetadata = new TodoMetadata();
    todoMetadata.comment = "Hello comment";
    const todo = new Todo();
    todo.name = "A Todo";
    todo.isComplete = true;
    const errors = await validate(todo);
    if (errors.length > 0) {
      throw 400;
    }

    todo.metadata = todoMetadata;
    await todoMetadataRepository.save(todoMetadata);
    await todoRepository.save(todo);
    res.send(todo);
  } catch (error) {
    if (error === 400) {
      res.status(400).send("Bad Request");
    } else {
      next(error);
    }
  }
};

export const readTodos = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (todoRepository === undefined) {
    initialize();
  }
  try {
    const todos = await todoRepository.find();
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

export const readCompleteTodos = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (todoRepository === undefined) {
    initialize();
  }
  try {
    const todos = await todoRepository.find({ isComplete: false });
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

export const readCompleteTodos2 = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (todoRepository === undefined) {
    initialize();
  }
  try {
    const todos = await todoRepository.findIncomplete();
    res.send(todos);
  } catch (error) {
    next(error);
  }
};
