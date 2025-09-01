import { use } from "react";
import { IconPencil, IconTrash } from "../icons";
import { TodoContext } from "../TodoProvider/TodoContext";
import mergeClass from "./mergeClass";
import "./todo-item.style.css";

export function ToDoItem({ item }) {
  const { toggleItemCompleted, removeTodo, selectTodoForEdit } = use(TodoContext);

  const styles = mergeClass(item.completed);

  return (
    <li className={styles}>
      <p className="date">{new Date(item.createdAt).toLocaleDateString("pt-BR")}</p>
      <div className="details">
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={item.completed}
          onClick={() => toggleItemCompleted(item)}
        />
        <p className="description">{item.description}</p>
        <div className="actions">
          <button
            className="btn"
            aria-label="delete"
            data-testid="btn-delete"
            onClick={() => removeTodo(item)}
          >
            <IconTrash />
          </button>
          <button className="btn" aria-label="edit" onClick={() => selectTodoForEdit(item)}>
            <IconPencil />
          </button>
        </div>
      </div>
    </li>
  );
}
