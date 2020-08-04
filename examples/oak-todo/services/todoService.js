//Pulled from https://blog.logrocket.com/creating-your-first-rest-api-with-deno-and-postgres/
//and modified to suit our purposes with todos!
import todoRepo from "../repositories/todoRepo.ts";

export const getTodos = async () => {
  const todos = await todoRepo.selectAll();

  var result = new Array();

  todos.rows.map(todo => {
    //TODO: Change this to Interface/class assignment.
    //Column from postgres package messing up with dynamic fields.
    //Example is js only, so sticking with that for now.
    var obj = new Object();

    todos.rowDescription.columns.map((el, i) => {
      obj[el.name] = todo[i];
    });
    result.push(obj);
  });

  return result;
};

export const getTodo = async todoId => {
  const todos = await todoRepo.selectById(todoId);

  var obj = new Object();
  todos.rows.map(todo => {
    todos.rowDescription.columns.map((el, i) => {
      obj[el.name] = todo[i];
    });
  });

  return obj;
};

export const createTodo = async todoData => {
  const newTodo = {
    todo: String(todoData.todo),
    isCompleted: "isCompleted" in todoData ? Boolean(todoData.isCompleted) : false,
  };

  await todoRepo.create(newTodo);

  return newTodo.id;
};

export const updateTodo = async (todoId, todoData) => {
  const todo = await getTodo(todoId);
  
  if (Object.keys(todo).length === 0 && todo.constructor === Object) {
    throw new Error("Todo not found");
  }

  const updatedTodo = {
    todo: todo.todo !== undefined ? String(todoData.todo) : todo.todo,
    isCompleted:
    todoData.isCompleted !== undefined
        ? Boolean(todoData.isCompleted)
        : todoData.isCompleted
  };

  todoData.update(todoId, updatedTodo);
};

export const deleteTodo = async todoId => {
  todoRepo.delete(todoId);
};