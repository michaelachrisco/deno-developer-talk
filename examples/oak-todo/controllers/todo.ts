import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interfaces
import Todo from "../interfaces/Todo.ts";
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../services/todoService.js";

export default {
    /**
     * @description Get all todos
     * @route GET /todos
     */
    getAllTodos: async ({ response }: { response: any }) => {
        let todos: Todo[] = await getTodos();
        response.status = 200;
        response.body = todos;
    },
    /**
     * @description Add a new todo
     * @route POST /todos
     */
    createTodo: async (
        { request, response }: { request: any; response: any },
    ) => {
        const { value: todoBody } = await request.body();
        const todo: Todo = todoBody;
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }

        // if everything is fine then perform
        // operation and return todos with the
        // new data added.
        let newTodo: Todo = {
            id: v4.generate(),
            todo: (await todo).todo,
            isCompleted: false,
        };
        let todoRecord = await createTodo(newTodo);
        let data = todoRecord;
        response.body = {
            success: true,
            data,
        };
    },
    /**
     * @description Get todo by id
     * @route GET todos/:id
     */
    getTodoById: async (
        { params, response }: { params: { id: string }; response: any },
    ) => {
        const todo = await getTodo(params.id);
        if (!todo) {
            response.status = 404;
            response.body = {
                success: false,
                message: "No todo found",
            };
            return;
        }

        // If todo is found
        response.status = 200;
        response.body = {
            success: true,
            data: todo,
        };
    },
    /**
     * @description Update todo by id
     * @route PUT todos/:id
     */
    updateTodoById: async (
        { params, request, response }: {
            params: { id: string },
            request: any,
            response: any,
        },
    ) => {
        const todo = await getTodo(params.id);
        if (!todo) {
            response.status = 404;
            response.body = {
                success: false,
                message: "No todo found",
            };
            return;
        }

        // if todo found then update todo
        const body = await request.body();
        const updatedData: { id: string; todo?: string; isCompleted?: boolean } = body.value;

        const newTodos = await updateTodo(params.id, updatedData);
        response.status = 200;
        response.body = {
            success: true,
            data: newTodos,
        };
    },
    /**
     * @description Delete todo by id
     * @route DELETE todos/:id
     */
    deleteTodoById: async (
        { params, response }: { params: { id: string }; response: any },
    ) => {
        await deleteTodo(params.id);

        // remove the todo w.r.t id and return
        // remaining todos
        let todos: Todo[] = await getTodos();
        response.status = 200;
        response.body = {
            success: true,
            data: todos,
        };
    },
};