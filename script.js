document.getElementById('formCliente').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const endereco = document.getElementById('endereco').value;
  const telefone = document.getElementById('telefone').value;

  const cliente = { nome, endereco, telefone };

  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  mostrarClientes();
  this.reset();
});

function mostrarClientes() {
  const lista = document.getElementById('listaClientes');
  lista.innerHTML = '';
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

  clientes.forEach((cliente, index) => {
    let li = document.createElement('li');
    li.textContent = `${cliente.nome} - ${cliente.endereco} - ${cliente.telefone}`;
    lista.appendChild(li);
  });
}

window.onload = mostrarClientes;
