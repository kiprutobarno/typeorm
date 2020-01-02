import { AbstractRepository, EntityRepository, FindConditions } from "typeorm";
import Todo from "./Todo";

@EntityRepository(Todo)
export default class TodoRepository extends AbstractRepository<Todo> {
  public save(todo: Todo): Promise<Todo> {
    return this.manager.save(todo);
  }

  public find(conditions?: FindConditions<Todo>): Promise<Todo[]> {
    return this.repository
      .find({
        cache: true,
        relations: ["author", "metadata"],
        where: conditions
      })
      .then(todos => {
        return todos.map(todo => {
          return todo;
        });
      });
  }

  public findIncomplete(): Promise<Todo[]> {
    return this.repository
      .createQueryBuilder("todo")
      .innerJoinAndSelect("todo.metadata", "metadata")
      .innerJoinAndSelect("todo.author", "author")
      .where('todo."isComplete" = :value', { value: false })
      .cache(true)
      .getMany();
  }
}
