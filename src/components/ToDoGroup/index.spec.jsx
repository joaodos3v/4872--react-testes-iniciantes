import { render } from "@testing-library/react";
import React from "react";
import TodoGroup from ".";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("ToDoGroup", () => {
  test("deveria renderizar o componente corretamente", () => {
    const { getByText, queryAllByRole } = render(<TodoGroup todos={[]} heading="Teste" />);

    expect(getByText("Teste")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });

  test("deveria renderizar os itens do grupo corretamente", () => {
    const items = [
      {
        id: 1,
        description: "Estudar React",
        completed: false,
        createdAt: "2025-08-26T10:00:00.000Z",
      },
      {
        id: 2,
        description: "Estudar Jest",
        completed: true,
        createdAt: "2025-08-27T10:00:00.000Z",
      },
    ];
    const { getByText, queryAllByRole } = render(
      <TodoContext.Provider value={{}}>
        <TodoGroup todos={items} heading="Teste" />
      </TodoContext.Provider>,
    );

    expect(queryAllByRole("listitem")).toHaveLength(2);

    const todoItem1 = getByText("Estudar React");
    expect(todoItem1).toBeInTheDocument();

    const todoItem2 = getByText("Estudar Jest");
    expect(todoItem2).toBeInTheDocument();
  });
});
