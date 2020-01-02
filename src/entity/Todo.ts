import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

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
}

export default Todo;
