// Configuração inicial: Cria um array vazio no LocalStorage se não existir
if (!localStorage.getItem('agendamentos')) {
    localStorage.setItem('agendamentos', JSON.stringify([]));
}

// Formulário de Agendamento (index.html)
if (document.getElementById('agendamentoForm')) {
    const form = document.getElementById('agendamentoForm');
    const dataInput = document.getElementById('data');
    
    // Define a data mínima como hoje
    dataInput.min = new Date().toISOString().split('T')[0];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const agendamento = {
            id: Date.now(),
            nome: document.getElementById('nome').value,
            whatsapp: document.getElementById('whatsapp').value,
            endereco: document.getElementById('endereco').value,
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value,
            status: 'Pendente'
        };

        // Salva no LocalStorage
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
        agendamentos.push(agendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        alert('Agendamento realizado! Entraremos em contato para confirmar.');
        form.reset();
    });
}

// Painel Administrativo (admin.html)
if (document.getElementById('listaPedidos')) {
    const tabela = document.getElementById('listaPedidos');

    function carregarPedidos() {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
        tabela.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>WhatsApp</th>
                <th>Endereço</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Ações</th>
            </tr>
        `;

        agendamentos.forEach(pedido => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.nome}</td>
                <td>${pedido.whatsapp}</td>
                <td>${pedido.endereco}</td>
                <td>${pedido.data}</td>
                <td>${pedido.horario}</td>
                <td>
                    <button onclick="marcarEntregue(${pedido.id})">Entregue</button>
                    <button onclick="cancelarPedido(${pedido.id})">Cancelar</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    }

    window.marcarEntregue = (id) => {
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
        agendamentos = agendamentos.map(pedido => {
            if (pedido.id === id) pedido.status = 'Entregue';
            return pedido;
        });
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        carregarPedidos();
    };

    window.cancelarPedido = (id) => {
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
        agendamentos = agendamentos.filter(pedido => pedido.id !== id);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        carregarPedidos();
    };

    // Carrega os pedidos ao abrir a página
    carregarPedidos();
}