import { Length } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  AfterInsert,
  JoinColumn,
  OneToOne
} from "typeorm";
import TodoMetadata from "./TodoMetadata";

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
}

export default Todo;
