import {
  addTodoFromForm,
  createRemovedTodosHtml,
  createTodoHtml,
  emptyFinishedList,
  emptyTodoList,
  getRemovedTodosFromLS,
  getTodosFromLS,
} from "./functions";
import { Todo } from "./models/Todo";

window.onload = function () {
  let todos: Todo[] = getTodosFromLS();
  let removedTodos: Todo[] = getRemovedTodosFromLS();
  console.log("Todos: ", todos);
  console.log("Borttagna todos: ", removedTodos);
  addTodoFromForm();

  createTodoHtml(todos);
  emptyTodoList();

  createRemovedTodosHtml(removedTodos);
  emptyFinishedList();
};
