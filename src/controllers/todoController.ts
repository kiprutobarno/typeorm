import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import Todo from "../entity/Todo";
import TodoRepository from "../entity/TodoRepository";
import TodoMetadata from "../entity/TodoMetadata";
import Author from "../entity/Author";

let initialized = false;
let todoRepository: TodoRepository;
let todoMetadataRepository: Repository<TodoMetadata>;
let authorRepository: Repository<Author>;

const initialize = () => {
  initialized = true;
  const connection = getConnection();
  todoRepository = connection.getCustomRepository(TodoRepository);
  todoMetadataRepository = connection.getRepository(TodoMetadata);
  authorRepository = connection.getRepository(Author);
};

export const createTodo = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!initialized) {
    initialize();
  }
  try {
    let author: Author;
    const authors = await authorRepository.find();
    if (authors.length === 0) {
      author = new Author();
      author.name = "John Doe";
      await authorRepository.save(author);
    } else {
      author = authors[0];
    }
    const todoMetadata = new TodoMetadata();
    todoMetadata.comment = "Hello comment";
    const todo = new Todo();
    todo.name = "A Todo";
    todo.isComplete = false;
    todo.author = author;
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

export const getTodos = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!initialized) {
    initialize();
  }
  try {
    const todos = await todoRepository.find();
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

export const getCompleteTodos = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!initialized) {
    initialize();
  }
  try {
    const todos = await todoRepository.find({ isComplete: true });
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

export const getInCompleteTodos = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!initialized) {
    initialize();
  }
  try {
    const todos = await todoRepository.findIncomplete();
    // const todos = await todoRepository.find({ isComplete: false });
    res.send(todos);
  } catch (error) {
    next(error);
  }
};
