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
  mensagemErro.classList.remove("oculto");
  mensagemErro.style.color = "#991b1b";
}

function mostrarSucesso(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.classList.remove("oculto");
  mensagemErro.style.color = "#166534";
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
  mostrarSucesso("Livro cadastrado com sucesso!");
  form.reset();
  carregarLivros();
});


async function removerLivro(id) {
  try {
    const response = await fetch(`/livros/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      mostrarErro('Erro ao remover livro');
      return;
    }

    carregarLivros();
  } catch (error) {
    mostrarErro(error.message);
  }


}


async function alternarStatus(livro) {
  try {
    const novoValor = livro.disponivel === 1 ? 0 : 1;

    const response = await fetch(`/livros/${livro.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        disponivel: novoValor
      })
    });

    if (!response.ok) {
      mostrarErro('Erro ao atualizar status do livro');
      return;
    }

    carregarLivros();
  } catch (error) {
    mostrarErro(error.message);
  }
}

carregarLivros();
