const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
// if (!todoList.length) {
//   document.querySelector(
//     ".no-todo-message"
//   ).innerHTML = `<h3>NO Todo Add One</h3>`;
// }
/*[
  {
    name: "make dinner",
    dueDate: "2024-07-15",
    time: "11:40",
  },
  {
    name: "wash Dishes",
    dueDate: "2024-07-15",
    time: "11:40",
  },
];
*/

renderTodo();

function renderTodo() {
  if (!todoList.length) {
    document.querySelector(
      ".no-todo-message"
    ).innerHTML = `<h3 class="todo-alert">No Todo's</h3>`;
  } else {
    document.querySelector(".no-todo-message").innerHTML = "";
  }

  let todoListHTML = ``;
  todoList.forEach(function (todoObject, index) {
    const { name, dueDate, time } = todoObject;

    html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <div>${time}</div>
    <button " 
    class="delete-todo-button"
    >Delete</button>
    
    `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  document
    .querySelectorAll(".delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodo();
        saveToStorage();
      });
    });
}

document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;

  const dueDateInput = document.querySelector(".js-due-date-input");
  const dueDate = dueDateInput.value;

  const timeElement = document.querySelector(".js-time-input");
  const time = timeElement.value;

  if (time && dueDate && name) {
    document.querySelector(".error-message").innerHTML = "";

    todoList.unshift({
      name: name,
      dueDate: dueDate,
      time: time,
    });
    saveToStorage();
    clear();
    renderTodo();
  } else if (!name) {
    document.querySelector(".error-message").innerHTML =
      "Todo Must not be empty";
  } else if (!time || !dueDate) {
    document.querySelector(".error-message").innerHTML =
      "Check Your Time and date";
  }
}

function clear() {
  document.querySelector(".js-name-input").value = "";
  document.querySelector(".js-due-date-input").value = "";
}

function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function clearStorage() {
  localStorage.clear();
  todoList.length = 0;
  document.querySelector(".todo-grid").innerHTML = "";
  document.querySelector(
    ".no-todo-message"
  ).innerHTML = `<h3 class="todo-alert">No Todo's</h3>`;
  saveToStorage();
}
