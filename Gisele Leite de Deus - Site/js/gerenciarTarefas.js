document.addEventListener('DOMContentLoaded', function () {
    // Carregar as tarefas do localStorage quando a página for carregada
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Carregar a lista de usuários

    tarefas.forEach(task => {
        renderTask(task, usuarios);
    });
});

function renderTask(task, usuarios) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    // Encontrar o nome do usuário pelo ID
    const usuario = usuarios.find(user => user.id_usuario === task.id_usuario);
    const nomeUsuario = usuario ? usuario.nome : 'Usuário desconhecido';

    // Criar o dropdown (select) para alterar o status
    const statusSelect = document.createElement('select');
    const statusOptions = ['A Fazer', 'Fazendo', 'Pronto'];
    statusOptions.forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        if (status === task.status) {
            option.selected = true;
        }
        statusSelect.appendChild(option);
    });

    // Evento para alterar o status
    statusSelect.addEventListener('change', function () {
        updateTaskStatus(task.id_tarefa, statusSelect.value);
    });

    taskItem.innerHTML = `
        <h3>${task.nome_tarefa}</h3>
        <p>Descrição: ${task.descricao_tarefa}</p>
        <p>Setor: ${task.nome_setor}</p>
        <p>Prioridade: ${task.prioridade}</p>
        <p>Usuário: ${nomeUsuario}</p> <!-- Exibir o nome do usuário -->
    `;

    // Adicionar o dropdown ao item da tarefa
    taskItem.appendChild(statusSelect);

    // Botões de ação
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';
    actionsDiv.innerHTML = `
        <button class="edit" onclick="editTask(${task.id_tarefa})">Editar</button>
        <button class="delete" onclick="deleteTask(${task.id_tarefa})">Excluir</button>
    `;
    taskItem.appendChild(actionsDiv);

    // Adicionar a tarefa na coluna correspondente ao status
    const statusColumn = document.getElementById(`task-list-${task.status.toLowerCase().replace(' ', '-')}`);
    if (statusColumn) {
        statusColumn.appendChild(taskItem);
    }
}

function updateTaskStatus(taskId, newStatus) {
    // Recuperar as tarefas do localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Encontrar a tarefa a ser atualizada
    const taskIndex = tarefas.findIndex(task => task.id_tarefa === taskId);
    if (taskIndex !== -1) {
        // Atualizar o status da tarefa
        tarefas[taskIndex].status = newStatus;

        // Atualizar o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Recarregar a página para atualizar a lista de tarefas
        window.location.reload();
    }
}

function editTask(taskId) {
    // Redirecionar para a página de cadastro para edição, passando o ID da tarefa na URL
    window.location.href = `cadTarefas.html?id=${taskId}`;
}

function deleteTask(taskId) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        // Recuperar as tarefas do localStorage
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        // Remover a tarefa pelo ID
        tarefas = tarefas.filter(task => task.id_tarefa !== taskId);

        // Atualizar o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Recarregar a página para atualizar a lista de tarefas
        window.location.reload();
    }
}
