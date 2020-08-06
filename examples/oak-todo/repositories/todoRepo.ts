import client from "../db/database.ts";
import Todo from "../interfaces/Todo.ts";


class TodoRepo {
    create(todo: Todo) {
        return client.query(
            "INSERT INTO todos (todo, isCompleted) VALUES ($1, $2) RETURNING *",
            todo.todo,
            todo.isCompleted,
        );
    }

    selectAll() {
        return client.query("SELECT * FROM todos ORDER BY id");
    }

    selectById(id: number) {
        return client.query(`SELECT * FROM todos WHERE id = $1`, id);
    }
    update(id: number, todo: Todo) {
        var latestTodo = this.selectById(id);
        var query = `UPDATE todos SET todo = $1, isCompleted = $2`;

        return client.query(query,
            todo.todo !== undefined ? todo.todo : (latestTodo as any).todo,
            todo.isCompleted !== undefined ? todo.isCompleted : (latestTodo as any).isCompleted);
    }

    //No delete in tutorial so making a quick one here:
    delete(id: number) {
        var query = `DELETE FROM todos WHERE id = $1;`;
        return client.query(query, id);
    }
}

export default new TodoRepo();