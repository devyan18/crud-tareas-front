import "./style.css";
import { createTask, deleteTask } from "./tasks.js";

const $app = document.getElementById("app");

export const API_URL = "http://localhost:4000/tasks";

const renderTasks = async () => {
  $app.innerHTML = "";

  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((tarea) => {
        $app.innerHTML += createTask(tarea);
      });
      return data;
    })
    .then((e) => {
      e.forEach((e) => {
        const $delBtn = document.getElementById(`delete-btn-${e.id}`);
        $delBtn.addEventListener("click", async () => {
          await deleteTask(e.id).then(async (e) => {
            await renderTasks();
          });
        });
      });
    });
};

const $taskForm = document.getElementById("create-task-form");

$taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const $titleInput = document.getElementById("input-title");
  const $descriptionInput = document.getElementById("input-description");
  const $isCompleteInput = document.getElementById("input-is-complete");

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      title: $titleInput.value,
      description: $descriptionInput.value,
      isComplete: $isCompleteInput.checked,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async () => {
    e.target.reset();
    await renderTasks();
  });
});

document.addEventListener("DOMContentLoaded", renderTasks);
