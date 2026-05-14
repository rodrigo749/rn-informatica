import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

// "render" renderiza o componente em memória (sem abrir o browser)
// "screen" permite buscar elementos na tela
// "fireEvent" simula ações do usuário (clique, digitação, etc.)

describe("Badge (exemplo de teste de componente)", () => {

  it("renderiza o texto corretamente", () => {
    render(<Badge>Suporte Técnico</Badge>);

    // getByText busca um elemento pelo texto visível
    const badge = screen.getByText("Suporte Técnico");

    // toBeInTheDocument verifica se o elemento existe na tela
    expect(badge).toBeInTheDocument();
  });

  it("aplica a variante correta", () => {
    render(<Badge variant="destructive">Erro</Badge>);

    const badge = screen.getByText("Erro");

    // toHaveClass verifica se o elemento tem uma classe CSS
    expect(badge).toHaveClass("bg-destructive");
  });

  it("chama onClick quando clicado", () => {
    // vi.fn() cria uma função "espiã" que registra quando é chamada
    const handleClick = vi.fn();

    render(<Badge onClick={handleClick}>Clique aqui</Badge>);

    const badge = screen.getByText("Clique aqui");

    // fireEvent.click simula um clique no elemento
    fireEvent.click(badge);

    // toHaveBeenCalledTimes verifica quantas vezes a função foi chamada
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});
