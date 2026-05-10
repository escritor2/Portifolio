/**
 * PORTFÓLIO PESSOAL - SCRIPT JAVASCRIPT PURO
 * Funcionalidades: Validação de formulário, Tema claro/escuro, Interações
 * Desenvolvido sem frameworks (React, Vue, Angular, etc.)
 */

// ============================================
// GERENCIADOR DE TEMA (Claro/Escuro)
// ============================================

/**
 * Inicializa o sistema de tema
 * Verifica se há preferência salva no localStorage
 */
function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplica o tema salvo
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.textContent = '🌙';
    }
    
    // Adiciona listener para o botão de tema
    themeBtn.addEventListener('click', toggleTheme);
}

/**
 * Alterna entre tema claro e escuro
 */
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    
    if (body.classList.contains('dark-theme')) {
        // Mudar para tema claro
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '🌙';
    } else {
        // Mudar para tema escuro
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '☀️';
    }
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================

/**
 * Valida um endereço de e-mail
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se o email é válido
 */
function isValidEmail(email) {
    // Expressão regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida se um campo está preenchido
 * @param {string} value - Valor do campo
 * @returns {boolean} - True se o campo não está vazio
 */
function isFieldFilled(value) {
    return value.trim().length > 0;
}

/**
 * Limpa as mensagens de erro de um campo
 * @param {HTMLElement} input - Elemento input
 * @param {HTMLElement} errorElement - Elemento de erro
 */
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

/**
 * Exibe uma mensagem de erro em um campo
 * @param {HTMLElement} input - Elemento input
 * @param {HTMLElement} errorElement - Elemento de erro
 * @param {string} message - Mensagem de erro
 */
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

/**
 * Valida o formulário de contato
 * @returns {boolean} - True se o formulário é válido
 */
function validateContactForm() {
    const form = document.getElementById('contact-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    
    const erroNome = document.getElementById('erro-nome');
    const erroEmail = document.getElementById('erro-email');
    const erroMensagem = document.getElementById('erro-mensagem');
    
    let isValid = true;
    
    // Validar Nome
    if (!isFieldFilled(nomeInput.value)) {
        showError(nomeInput, erroNome, 'Por favor, preencha seu nome.');
        isValid = false;
    } else {
        clearError(nomeInput, erroNome);
    }
    
    // Validar Email
    if (!isFieldFilled(emailInput.value)) {
        showError(emailInput, erroEmail, 'Por favor, preencha seu e-mail.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, erroEmail, 'Por favor, insira um e-mail válido (ex: usuario@dominio.com).');
        isValid = false;
    } else {
        clearError(emailInput, erroEmail);
    }
    
    // Validar Mensagem
    if (!isFieldFilled(mensagemInput.value)) {
        showError(mensagemInput, erroMensagem, 'Por favor, escreva uma mensagem.');
        isValid = false;
    } else if (mensagemInput.value.trim().length < 10) {
        showError(mensagemInput, erroMensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
        isValid = false;
    } else {
        clearError(mensagemInput, erroMensagem);
    }
    
    return isValid;
}

/**
 * Limpa os campos do formulário
 */
function clearContactForm() {
    const form = document.getElementById('contact-form');
    form.reset();
    
    // Limpar mensagens de erro
    document.getElementById('erro-nome').textContent = '';
    document.getElementById('erro-email').textContent = '';
    document.getElementById('erro-mensagem').textContent = '';
    
    // Remover classe de erro dos inputs
    document.getElementById('nome').classList.remove('error');
    document.getElementById('email').classList.remove('error');
    document.getElementById('mensagem').classList.remove('error');
}

/**
 * Simula o envio do formulário
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validar formulário
    if (!validateContactForm()) {
        console.log('Formulário inválido');
        return;
    }
    
    // Simular envio (em produção, isso seria uma requisição HTTP)
    console.log('Formulário válido - Simulando envio...');
    
    // Obter dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Simular delay de envio
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular requisição de 1.5 segundos
    setTimeout(() => {
        // Limpar formulário
        clearContactForm();
        
        // Mostrar mensagem de sucesso
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';
        
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Esconder mensagem de sucesso após 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Log da simulação
        console.log('Mensagem enviada com sucesso!');
        console.log({
            nome: nome,
            email: email,
            mensagem: mensagem,
            timestamp: new Date().toLocaleString('pt-BR')
        });
    }, 1500);
}

// ============================================
// INTERAÇÕES E EVENTOS
// ============================================

/**
 * Adiciona listeners aos campos do formulário para validação em tempo real
 */
function setupFormValidation() {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');
    
    // Validar nome enquanto digita
    nomeInput.addEventListener('blur', () => {
        if (!isFieldFilled(nomeInput.value)) {
            showError(nomeInput, document.getElementById('erro-nome'), 'Por favor, preencha seu nome.');
        } else {
            clearError(nomeInput, document.getElementById('erro-nome'));
        }
    });
    
    // Validar email enquanto digita
    emailInput.addEventListener('blur', () => {
        if (!isFieldFilled(emailInput.value)) {
            showError(emailInput, document.getElementById('erro-email'), 'Por favor, preencha seu e-mail.');
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, document.getElementById('erro-email'), 'Por favor, insira um e-mail válido.');
        } else {
            clearError(emailInput, document.getElementById('erro-email'));
        }
    });
    
    // Validar mensagem enquanto digita
    mensagemInput.addEventListener('blur', () => {
        if (!isFieldFilled(mensagemInput.value)) {
            showError(mensagemInput, document.getElementById('erro-mensagem'), 'Por favor, escreva uma mensagem.');
        } else if (mensagemInput.value.trim().length < 10) {
            showError(mensagemInput, document.getElementById('erro-mensagem'), 'A mensagem deve ter pelo menos 10 caracteres.');
        } else {
            clearError(mensagemInput, document.getElementById('erro-mensagem'));
        }
    });
}

/**
 * Inicializa o formulário de contato
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', handleFormSubmit);
    setupFormValidation();
}

/**
 * Adiciona animação suave aos links de navegação
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            // Verificar se é um link de navegação interna
            if (href !== '#' && document.querySelector(href)) {
                event.preventDefault();
                
                const targetElement = document.querySelector(href);
                const offsetTop = targetElement.offsetTop - 80; // Compensar altura da navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Adiciona efeito de destaque ao link de navegação ativo
 */
function setupActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Encontrar a seção atual
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Remover classe ativa de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Adicionar classe ativa ao link correspondente
        if (current) {
            const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Função principal que inicializa todos os scripts
 */
function init() {
    console.log('Inicializando portfólio pessoal...');
    
    // Inicializar tema
    initTheme();
    
    // Inicializar formulário
    initContactForm();
    
    // Configurar scroll suave
    setupSmoothScroll();
    
    // Configurar link ativo na navegação
    setupActiveNavLink();
    
    console.log('Portfólio inicializado com sucesso!');
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Alternativa: Se o script for carregado no final do body
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
