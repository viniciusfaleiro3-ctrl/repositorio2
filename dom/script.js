const livros = [
  { id: 1, titulo: "Dom Casmurro", preco: 35.0 },
  { id: 2, titulo: "Clean Code", preco: 50.0 },
  { id: 3, titulo: "O Alquimista", preco: 42.0 },
  { id: 4, titulo: "JavaScript Eloquente", preco: 75.0 },
];

let carrinho = [];
let total = 0;

const listaLivrosHtml = document.getElementById("lista-livros");
const itensCarrinhoHtml = document.getElementById("itens-carrinho");
const valorTotalHtml = document.getElementById("valor-total");

function carregarCatalogo() {
  livros.forEach((livro) => {
    const div = document.createElement("div");
    div.classList.add("livro-card");
    div.innerHTML = `
        <h3>${livro.titulo}</h3>
        <p>R$ ${livro.preco.toFixed(2)}</p>
        <button class="btn-adicionar" onclick='adicionarAoCarrinho(${livro.id})'>Adicionar</button>
      `;
    listaLivrosHtml.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  const livro = livros.find((l) => l.id === id);
  carrinho.push(livro);
  total += livro.preco;
  atualizarInterfaceCarrinho();
}

function removerDoCarrinho(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  if (carrinho.length === 0) total = 0;
  atualizarInterfaceCarrinho();
}

function esvaziarCarrinho() {
  carrinho = [];
  total = 0;
  atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
  itensCarrinhoHtml.innerHTML = "";
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    // Texto simples para remoção unitária
    li.innerHTML = `${item.titulo} - R$ ${item.preco.toFixed(2)} (remover)`;
    li.onclick = () => removerDoCarrinho(index);
    itensCarrinhoHtml.appendChild(li);
  });

  valorTotalHtml.textContent = total.toFixed(2);

  // Cor vermelha se total passar de 100
  if (total > 100) {
    valorTotalHtml.style.color = "red";
  } else {
    valorTotalHtml.style.color = "black";
  }
}

carregarCatalogo();
