import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ToDoItem } from ".";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("ToDoItem", () => {
  test("deveria renderizar o item corretamente", () => {
    const item = {
      description: "Aprender Jest",
      createdAt: "2025-08-26T10:00:00Z",
      completed: false,
    };

    const { getByText, getByRole } = render(
      <TodoContext.Provider value={{}}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    expect(getByText("Aprender Jest")).toBeInTheDocument();
    expect(getByText("26/08/2025")).toBeInTheDocument();
    expect(getByRole("checkbox")).not.toBeChecked();
  });

  test("deveria chamar a função selectTodoForEdit quando o botão de editar for clicado", async () => {
    const funcaoSimulandoSelectTodoForEdit = jest.fn();
    const item = {
      description: "Editar Jest",
      createdAt: "2025-08-26T10:00:00Z",
      completed: false,
    };

    const { getByRole } = render(
      <TodoContext.Provider value={{ selectTodoForEdit: funcaoSimulandoSelectTodoForEdit }}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    const button = getByRole("button", { name: /edit/i });
    await userEvent.click(button);

    expect(funcaoSimulandoSelectTodoForEdit).toHaveBeenCalledWith(item);
  });

  test("deveria chamar a função removeTodo quando o botão de deletar for clicado", async () => {
    const funcaoSimulandoRemoveTodo = jest.fn();
    const item = {
      description: "Excluir Jest",
      createdAt: "2025-08-26T10:00:00Z",
      completed: false,
    };

    const { getByRole } = render(
      <TodoContext.Provider value={{ removeTodo: funcaoSimulandoRemoveTodo }}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    const button = getByRole("button", { name: /delete/i });
    await userEvent.click(button);

    expect(funcaoSimulandoRemoveTodo).toHaveBeenCalledWith(item);
  });

  test("[data-testid] deveria chamar a função removeTodo quando o botão de deletar for clicado", async () => {
    const funcaoSimulandoRemoveTodo = jest.fn();
    const item = {
      description: "Excluir Jest",
      createdAt: "2025-08-26T10:00:00Z",
      completed: false,
    };

    const { getByTestId } = render(
      <TodoContext.Provider value={{ removeTodo: funcaoSimulandoRemoveTodo }}>
        <ToDoItem item={item} />
      </TodoContext.Provider>,
    );

    // const button = getByRole("button", { name: /delete/i });
    const button = getByTestId("btn-delete");
    await userEvent.click(button);

    expect(funcaoSimulandoRemoveTodo).toHaveBeenCalledWith(item);
  });
});
