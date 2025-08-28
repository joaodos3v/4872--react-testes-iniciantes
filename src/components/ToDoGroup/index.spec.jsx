import { render } from "@testing-library/react";
import React from "react";
import TodoGroup from ".";
import { TodoContext } from "../TodoProvider/TodoContext";

describe("ToDoGroup", () => {
  test("deveria renderizar a mensagem de carregando quando o isLoading for true", () => {
    const { getByText, queryAllByRole } = render(
      <TodoGroup isLoading={true} todos={[]} heading="Teste" />,
    );

    expect(getByText("Carregando...")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });

  test("deveria renderizar a mensagem de lista vazia quando não tiver itens", () => {
    const { getByText, queryByText, queryAllByRole } = render(
      <TodoGroup isLoading={false} todos={[]} heading="Teste" />,
    );

    expect(getByText("Nenhum item encontrado")).toBeInTheDocument();
    expect(queryByText("Carregando...")).toBeNull();
    expect(queryAllByRole("listitem")).toHaveLength(0);
  });

  test.each([
    { isLoading: true, items: [] },
    { isLoading: false, items: [] },
    {
      isLoading: false,
      items: [
        {
          id: 1,
          description: "Estudar React",
          completed: false,
          createdAt: "2025-08-26T10:00:00.000Z",
        },
      ],
    },
  ])("deveria renderizar o título da lista o tempo todo", ({ isLoading, items }) => {
    const { getByText, queryByText, queryAllByRole } = render(
      <TodoContext.Provider value={{}}>
        <TodoGroup isLoading={isLoading} todos={items} heading="Visível o tempo todo" />
      </TodoContext.Provider>,
    );

    expect(getByText("Visível o tempo todo")).toBeInTheDocument();
    expect(queryAllByRole("listitem")).toHaveLength(items.length);

    if (isLoading) {
      expect(getByText("Carregando...")).toBeInTheDocument();
    } else {
      expect(queryByText("Carregando...")).toBeNull();
    }
  });

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

  describe("falso-positivo", () => {
    test("deveria renderizar o estado correto quando a lista estiver vazia", () => {
      const { getByText, queryAllByRole } = render(
        <TodoGroup isLoading={false} todos={[]} heading="Teste" />,
      );

      expect(getByText("Teste")).toBeInTheDocument();

      // Falso-positivo
      expect(queryAllByRole("listitem")).toHaveLength(0);

      // Correto
      // expect(getByText("Nenhum item encontrado")).toBeInTheDocument();
    });
  });
});
