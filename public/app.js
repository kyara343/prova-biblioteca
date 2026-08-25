const form = document.querySelector('#form-livro');
const listaEl = document.querySelector('#lista-livros');
const mensagemErro = document.querySelector('#mensagem-erro');

async function carregarLivros() {
  try {
    const response = await fetch("/livros");

    if (!response.ok) {
      mostrarErro('Erro ao buscar livros');
      return;
    }

    const livros = await response.json();

    renderizarLivros(livros);
    return;
  } catch (error) {
    mostrarErro(error.message);
  }
}


function mostrarErro(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.classList.remove('oculto');
}


function renderizarLivros(livros) {
   listaEl.innerHTML = "";
   livros.forEach ((livro) =>
   {
    const status = livro.disponivel
  ? "Disponível"
  : "Emprestado";

  const li = document.createElement("li");
  li.textContent = `${livro.titulo} - ${livro.autor} (${livro.ano}) - ${status}`;
    const btnStatus = document.createElement("button");
    btnStatus.textContent = livro.disponivel ? "Emprestar" : "Devolver";
    btnStatus.addEventListener( "click", () => {
      alternarStatus(livro);
    })
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    
    btnRemover.addEventListener("click", () => {
      removerLivro(livro.id);
    });
    li.appendChild(btnStatus);
    li.appendChild(btnRemover);

    listaEl.appendChild(li);

    li.className = livro.disponivel === 1
  ? "disponivel"
  : "indisponivel";
   })
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const titulo = document.querySelector("#input-titulo").value;
  const autor = document.querySelector("#input-autor").value;
  const ano = document.querySelector("#input-ano").value;
  const response = await fetch("/livros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo,
      autor,
      ano
    })
  
  });

  if (!response.ok) {
    mostrarErro("Erro ao cadastrar livro");
    return;
  }
  form.reset();
  carregarLivros();
});

// ----- TAREFA 3: remover um livro (DELETE) -----
async function removerLivro(id) {
  const response = await fetch (`/livros/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    8
    mostrarErro('Erro ao remover livro');
    9
    return;

    carregarLivros();
    } catch (error) {
    mostrarErro(error.message);
    }
 
  // TAREFA: fazer fetch DELETE para a rota DELETE
  // TAREFA: tratar erro com a função mostrarErro em caso de falha
  // TAREFA: se der certo, chamar carregarLivros() para atualizar a lista
}

// ----- TAREFA 4: emprestar / devolver um livro (PUT) -----
async function alternarStatus(livro) {
  // TAREFA: descobrir o novo valor de "disponivel" (inverter o atual: 1 vira 0, 0 vira 1)
  // TAREFA: fazer fetch PUT para a rota PUT enviando
  //       { disponivel: novoValor } no body, com headers corretos
  //       OBS: A rota PUT precisa ser criada no back-end
  // TAREFA: tratar erro com a função mostrarErro
  // TAREFA: se der certo, chamar carregarLivros() para atualizar a lista
}

carregarLivros();
