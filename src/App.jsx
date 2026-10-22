
import { useState } from "react";
import "./App.css";

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida)
    );
  }

  const total = tarefas.length;
  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;
  const pendentes = total - concluidas;

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  return (
    <main>
      <header className="cabecalho">
        <p className="estrelinhas">★ ☆ ★ ☆ ★</p>
        <h1>Meu Organizador</h1>
        <p className="subtitulo">
          ~ minha página pessoal de tarefas ~
        </p>
      </header>

      <div className="aviso">
        ✿ BEM-VINDO(A) AO MEU CANTINHO ✿
      </div>

      <section className="painel">
        <h2>♡ Nova tarefa ♡</h2>

        <form onSubmit={adicionarTarefa}>
          <label htmlFor="nova-tarefa">
            O que você precisa fazer?
          </label>

          <input
            id="nova-tarefa"
            type="text"
            placeholder="Digite sua tarefa aqui..."
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
          />

          <button type="submit">＋ Adicionar</button>
        </form>
      </section>

      <section className="painel resumo">
        <h2>★ Meu progresso ★</h2>

        <div className="estatisticas">
          <div className="estatistica">
            <span>{total}</span>
            <small>Total</small>
          </div>

          <div className="estatistica">
            <span>{concluidas}</span>
            <small>Concluídas</small>
          </div>

          <div className="estatistica">
            <span>{pendentes}</span>
            <small>Pendentes</small>
          </div>
        </div>
      </section>

      <section className="painel">
        <h2>♡ Filtrar tarefas ♡</h2>

        <div className="filtros">
          <button
            type="button"
            className={filtro === "todas" ? "ativo" : ""}
            onClick={() => setFiltro("todas")}
          >
            Todas
          </button>

          <button
            type="button"
            className={filtro === "pendentes" ? "ativo" : ""}
            onClick={() => setFiltro("pendentes")}
          >
            Pendentes
          </button>

          <button
            type="button"
            className={filtro === "concluidas" ? "ativo" : ""}
            onClick={() => setFiltro("concluidas")}
          >
            Concluídas
          </button>
        </div>
      </section>

      <section className="painel">
        <h2>★ Minha lista ★</h2>

        {tarefasVisiveis.length === 0 ? (
          <p className="vazio">
            ✿ Nenhuma tarefa para exibir. ✿
          </p>
        ) : (
          <ul className="lista">
            {tarefasVisiveis.map((tarefa) => (
              <li
                key={tarefa.id}
                className={tarefa.concluida ? "concluida" : ""}
              >
                <label className="tarefa-label">
                  <input
                    type="checkbox"
                    checked={tarefa.concluida}
                    onChange={() => alternarConclusao(tarefa.id)}
                  />

                  <span>{tarefa.texto}</span>
                </label>

                <button
                  type="button"
                  className="remover"
                  onClick={() => removerTarefa(tarefa.id)}
                >
                  ✖ Remover
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="limpar"
          onClick={limparConcluidas}
        >
          ♡ Limpar concluídas
        </button>
      </section>

      <footer>
        <p>✧ feito com amor e glitter ✧</p>
        <p>© 2000–2026 | Meu cantinho na internet</p>
        <p>★ Obrigado pela visita! ★</p>
      </footer>
    </main>
  );
}

export default App;
