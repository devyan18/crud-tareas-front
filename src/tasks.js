import { API_URL } from "./main";

export const deleteTask = (id) => {
  return fetch(API_URL + `/${id}`, {
    method: "DELETE",
  });
};

export const createTask = (task) => {
  return `
    <div class='task-card'>
      <h1>${task.title}</h1>
      <p>${task.description}</p>
      <div>
        <span>${task.isComplete ? "Completada" : "Pendiente"}</span> 
        <button id="delete-btn-${task.id}">Eliminar</button>
      </div>
    </div>`;
};
