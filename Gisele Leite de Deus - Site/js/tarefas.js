document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar usuários no select de Usuário
    loadUserOptions();

    // Evento para cadastrar tarefa
    document.getElementById('cadastroTarefaForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Captura os dados do formulário
        const data = {
            nome_tarefa: document.getElementById('nome_tarefa').value,
            descricao_tarefa: document.getElementById('descricao_tarefa').value,
            nome_setor: document.getElementById('nome_setor').value,
            prioridade: document.getElementById('prioridade').value,
            status: document.getElementById('status').value,
            usuario_id: document.getElementById('usuario_id').value
        };

        // Verifica se há tarefas já armazenadas no localStorage, ou inicializa um array vazio
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        // Adiciona a nova tarefa ao array de tarefas
        tarefas.push(data);

        // Armazena o array atualizado no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        alert('Tarefa cadastrada com sucesso!');

        // Limpa os campos do formulário após o cadastro
        document.getElementById('cadastroTarefaForm').reset();
    });
});

// Função para carregar usuários no campo select
function loadUserOptions() {
    // Recuperar os usuários armazenados no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Selecionar o elemento select do HTML
    const usuarioSelect = document.getElementById('usuario_id');

    // Adicionar uma opção para cada usuário
    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id_usuario; // Valor será o ID do usuário
        option.textContent = usuario.nome; // Texto será o nome do usuário
        usuarioSelect.appendChild(option);
    });
}
