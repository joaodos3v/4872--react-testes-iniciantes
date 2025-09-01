import userEvent from "@testing-library/user-event";
import React from "react";
import FormToDo from ".";
import customRender from "../../helpers/customRender";

describe("FormToDo", () => {
  test("deveria renderizar o form corretamente", () => {
    const { getByRole } = customRender(<FormToDo onSubmit={() => {}}></FormToDo>, {
      selectedTodo: { description: "Um exemplo qualquer" },
    });

    expect(getByRole("form")).toBeInTheDocument();
  });

  test("deveria renderizar a descrição do todo selecionado", () => {
    const { getByRole } = customRender(<FormToDo onSubmit={() => {}}></FormToDo>, {
      selectedTodo: { description: "Um exemplo qualquer DE NOVO" },
    });

    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByRole("textbox")).toHaveValue("Um exemplo qualquer DE NOVO");
  });

  test("deveria enviar o form com a descrição atualizada", async () => {
    const funcaoSimulandoSubmit = jest.fn();

    const { getByRole } = customRender(<FormToDo onSubmit={funcaoSimulandoSubmit}></FormToDo>, {
      selectedTodo: { description: "Um exemplo qualquer DE NOVO" },
    });

    const input = getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "Um novo curso para estudar");

    const button = getByRole("button", { name: /salvar item/i });
    await userEvent.click(button);

    expect(funcaoSimulandoSubmit).toHaveBeenCalled();
  });
});
