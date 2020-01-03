import { NextFunction, Request, Response } from "express";
import { Repository, getConnection } from "typeorm";
import Author from "../entity/Author";
import { createConn } from "../utils/connection";

let initialized = false;
let authorRepository: Repository<Author>;

const initialize = async () => {
  initialized = true;
  const connection = await createConn();
  authorRepository = connection.getRepository(Author);
};

export const getAuthors = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!initialized) {
    initialize();
  }
  try {
    const authors = await authorRepository.find({ relations: ["todos"] });
    res.send(authors);
  } catch (error) {
    next(error);
  }
};
