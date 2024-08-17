import { deleteTask, putTask } from "./services";

export const renderTask = (task) => {
  const $taskContainer = document.createElement("div");
  $taskContainer.classList.add("task-item");

  const taskTitle = document.createElement("p", {
    is: "task-title",
  });
  const $taskDescription = document.createElement("p");
  const $taskIsCompleted = document.createElement("input");
  const $taskDelete = document.createElement("button");

  taskTitle.classList.add("task-title");
  taskTitle.textContent = task.title;

  if (task.isComplete) {
    taskTitle.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild(taskTitle);

  $taskDescription.classList.add("task-description");
  $taskDescription.textContent = task.description;

  if (task.isComplete) {
    $taskDescription.style.textDecoration = "line-through";
  }

  $taskContainer.appendChild($taskDescription);

  $taskIsCompleted.type = "checkbox";
  $taskIsCompleted.checked = task.isComplete;

  $taskIsCompleted.addEventListener("change", (event) => {
    task.isComplete = event.target.checked;
    taskTitle.style.textDecoration = task.isComplete ? "line-through" : "none";
    $taskDescription.style.textDecoration = task.isComplete
      ? "line-through"
      : "none";

    putTask(task.id, {
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    });
  });

  $taskContainer.appendChild($taskIsCompleted);

  $taskDelete.textContent = "Delete";

  $taskDelete.addEventListener("click", () => {
    deleteTask(task.id).then(() => {
      $taskContainer.remove();
    });
  });

  $taskContainer.appendChild($taskDelete);

  return $taskContainer;
};
