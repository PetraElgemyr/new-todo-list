import { RemovedTodo } from "./models/RemovedTodo";
import { Todo } from "./models/Todo";
let todos = getTodosFromLS();
let removedTodos = getRemovedTodosFromLS();

export function getTodosFromLS() {
  let todos: Todo[] = JSON.parse(localStorage.getItem("todoList") || "[]");
  return todos;
}

export function getRemovedTodosFromLS() {
  let todos: RemovedTodo[] = JSON.parse(
    localStorage.getItem("removedTodosInLs") || "[]"
  );
  return todos;
}

export const addTodoFromForm = () => {
  const form: HTMLFormElement = document.getElementById(
    "todoForm"
  ) as HTMLFormElement;

  const todoInput: HTMLInputElement = document.getElementById(
    "todoInput"
  ) as HTMLInputElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (todoInput.value !== "") {
      let newTodo = new Todo(todoInput.value, false);
      todos.push(newTodo);

      localStorage.setItem("todoList", JSON.stringify(todos));
      createTodoHtml(todos);
      console.log("Ny lista", todos);

      todoInput.value = "";
    } else {
      const messageBox: HTMLParagraphElement = document.getElementById(
        "emptyInput"
      ) as HTMLParagraphElement;
      messageBox.innerHTML = "Du måste skriva en todo innan du lägger till";
    }
  });
};

export const createTodoHtml = (todos: Todo[]) => {
  const todoWrapper: HTMLDivElement = document.getElementById(
    "todoList"
  ) as HTMLDivElement;
  todoWrapper.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const todoContainer: HTMLParagraphElement = document.createElement("p");
    const todoTask: HTMLSpanElement = document.createElement("span");
    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    const removeTodo: HTMLSpanElement = document.createElement("span");

    todoContainer.className = "todoContainer";
    todoTask.className = "todo";
    removeTodo.className = "removeTodo";

    todoTask.innerHTML = todos[i].todo;
    removeTodo.innerHTML = "Ta bort";

    let clickedObject: Todo = todos[i];

    todoContainer.append(todoTask, checkbox, removeTodo);
    todoWrapper.appendChild(todoContainer);

    removeTodo.addEventListener("click", () => {
      //radera todon från listan och localstorage
      let index = todos.indexOf(todos[i]);
      todos.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todos));

      //skriv ut listan på nytt
      createTodoHtml(todos);
      console.log("Todos: ", todos);
      console.log("Gjorda todos: ", removedTodos);
    });
    /*
    doneBtn.addEventListener("click", () => {
      //ta bort från todolista
      let index = todos.indexOf(todos[i]);
      todos.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todos));

      // lägg till på borttagnalistan
      //toggla classname och todo.finished-värdet
      let newRemovedTodo: RemovedTodo = new RemovedTodo(todos[i].todo, true);
      removedTodos.push(newRemovedTodo);
      localStorage.setItem("removedTodosInLs", JSON.stringify(removedTodos));

      console.log("Todos: ", todos);
      console.log("Gjorda todos: ", removedTodos);
      createTodoHtml(todos);
      createRemovedTodosHtml(removedTodos);
    }); */
  }
};

export const emptyTodoList = () => {
  const emptyBtn: HTMLSpanElement = document.getElementById(
    "emptyListBtn"
  ) as HTMLSpanElement;
  emptyBtn.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todoList", JSON.stringify(todos));
    createTodoHtml(todos);
    console.log("Tom todolista: ", todos);
  });
};

// export const createRemovedTodosHtml = (removedTodos: Todo[]) => {
//   const doneList: HTMLDivElement = document.getElementById(
//     "removed__list"
//   ) as HTMLDivElement;
//   doneList.innerHTML = "";

//   for (let i = 0; i < removedTodos.length; i++) {
//     const todoContainer: HTMLParagraphElement = document.createElement("p");
//     const todoTask: HTMLSpanElement = document.createElement("span");
//     const doneBtn: HTMLButtonElement = document.createElement("button");
//     const removeTodo: HTMLSpanElement = document.createElement("span");

//     todoContainer.className = "todoContainer__done";
//     // todoTask.className = "todo";
//     // doneBtn.className = "finished";
//     // removeTodo.className = "removeTodo";

//     todoTask.innerHTML = removedTodos[i].todo;
//     doneBtn.innerHTML = "Markera oklar";
//     removeTodo.innerHTML = "Ta bort";

//     todoContainer.append(todoTask, doneBtn, removeTodo);
//     doneList.appendChild(todoContainer);

//     removeTodo.addEventListener("click", () => {
//       let index = removedTodos.indexOf(removedTodos[i]);
//       removedTodos = removedTodos.splice(index, 1);
//       localStorage.setItem("removedTodosInLs", JSON.stringify(removedTodos));
//       createRemovedTodosHtml(removedTodos);
//     });
//   }
// };

export const emptyFinishedList = () => {
  const emptyBtn: HTMLSpanElement = document.getElementById(
    "emptyListBtnSecond"
  ) as HTMLSpanElement;
  emptyBtn.addEventListener("click", () => {
    removedTodos.splice(0, removedTodos.length);
    localStorage.setItem("removedTodosInLs", JSON.stringify(removedTodos));
    console.log("Tom removed lista: ", removedTodos);
    // createRemovedTodosHtml(removedTodos);
  });
};
