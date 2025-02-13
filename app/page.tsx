import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();
  await prisma.$disconnect(); // Add this to close the connection

  const deleteTodo = () => {};
  return (
    <main>
      <h1>Todo list</h1>
      <form action={"addTodo"}>
        <input type="text" name="title" typeof="text" placeholder="Title" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit">delete</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
