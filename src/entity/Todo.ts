import { Length } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  AfterInsert,
  JoinColumn,
  OneToOne,
  ManyToOne
} from "typeorm";
import TodoMetadata from "./TodoMetadata";
import Author from "./Author";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Length(0, 10)
  public name: string = "";

  @Index()
  @Column()
  public isComplete: boolean = false;

  @OneToOne(() => TodoMetadata)
  @JoinColumn()
  public metadata: TodoMetadata;

  @Index()
  @ManyToOne(
    () => Author,
    author => author.todos
  )
  public author: Author;
}

export default Todo;
