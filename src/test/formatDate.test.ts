import { describe, it, expect } from "vitest";

// A função que vamos testar (copiada do AdminDashboard)
const formatDate = (ts?: { seconds: number }) => {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("pt-BR");
};

// "describe" agrupa testes relacionados
describe("formatDate", () => {

  // "it" (ou "test") descreve o que o teste verifica
  it("retorna '—' quando não recebe argumento", () => {
    // "expect" é o que você quer verificar
    // "toBe" compara valores simples (string, number, boolean)
    expect(formatDate(undefined)).toBe("—");
  });

  it("retorna uma string quando recebe um timestamp válido", () => {
    const resultado = formatDate({ seconds: 1700000000 });

    // "toBeTruthy" verifica se o valor existe (não é null, undefined, "")
    expect(resultado).toBeTruthy();

    // "not.toBe" verifica que NÃO é igual a algo
    expect(resultado).not.toBe("—");
  });

  it("retorna uma string no formato de data", () => {
    const resultado = formatDate({ seconds: 1700000000 });

    // "toContain" verifica se a string contém um trecho
    expect(resultado).toContain("/");
  });

});
