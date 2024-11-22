// js/cadastroUsuario.js 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Previne o envio do formulário até que a validação seja feita
        
        // Validação dos campos
        if (!nomeInput.value.trim() || !emailInput.value.trim()) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Validação do e-mail
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailInput.value)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        // Verificar se o e-mail já foi cadastrado
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioExistente = usuarios.find(usuario => usuario.email === emailInput.value);
        if (usuarioExistente) {
            alert('Este e-mail já está cadastrado.');
            return;
        }

        // Adicionar o novo usuário ao array de usuários
        const novoUsuario = {
            nome: nomeInput.value,
            email: emailInput.value
        };

        usuarios.push(novoUsuario);

        // Salvar os dados no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro concluído com sucesso');
        form.reset();  // Limpar os campos após o envio
    });
});
