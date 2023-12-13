"use client";
import { useState, useCallback, useMemo } from "react";
import { Button } from "./components/Button";
import { Todo } from "./components/types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = useCallback(() => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        completed: false,
        text: newTodo,
        id: todos.length + 1,
      };

      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo("");
    }
  }, [newTodo]);

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const memoizedTodos = useMemo(() => todos, [todos]);

  return (
    <main>
      <section className="w-fit mx-auto">
        <h1 className="text-xl">Todo List</h1>
        <input
          type="text"
          className="p-1 border-solid border-2 border-gray-500 rounded"
          placeholder="...add next todo"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
        />
        <Button text="Add todo" handler={addTodo} />
        <ul className="my-4">
          {memoizedTodos.map((todo: Todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                className="m-2"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={`${todo.completed ? "line-through" : "none"}`}>
                {todo.text}
              </span>
              <Button text="Delete" handler={() => deleteTodo(todo.id)} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
