// Menu Toggle para Mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Função para detectar se é dispositivo móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768);
}

// Formulário de Contato
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contatoForm);
        const data = Object.fromEntries(formData);
        
        // Mapear assuntos
        const assuntoMap = {
            'venda': 'Quero Comprar',
            'aluguel': 'Quero Alugar',
            'vender': 'Quero Vender',
            'visita': 'Agendar Visita',
            'outro': 'Outro'
        };
        
        const assuntoTexto = assuntoMap[data.assunto] || data.assunto;
        
        // Detectar se é mobile ou desktop
        if (isMobileDevice()) {
            // MOBILE: Enviar para WhatsApp
            const mensagemWhatsApp = `*Nova Mensagem do Site Braga Imóveis*

*Nome:* ${data.nome}
*E-mail:* ${data.email}
*Telefone:* ${data.telefone}
*Assunto:* ${assuntoTexto}

*Mensagem:*
${data.mensagem}`;
            
            const mensagemEncoded = encodeURIComponent(mensagemWhatsApp);
            const whatsappUrl = `https://wa.me/5522999623615?text=${mensagemEncoded}`;
            
            window.open(whatsappUrl, '_blank');
            alert('Redirecionando para o WhatsApp...');
        } else {
            // DESKTOP: Enviar para Email
            const assuntoEmail = `Nova Mensagem do Site - ${assuntoTexto}`;
            const corpoEmail = `Nova Mensagem do Site Braga Imóveis

Nome: ${data.nome}
E-mail: ${data.email}
Telefone: ${data.telefone}
Assunto: ${assuntoTexto}

Mensagem:
${data.mensagem}`;
            
            const emailEncoded = encodeURIComponent(corpoEmail);
            const assuntoEncoded = encodeURIComponent(assuntoEmail);
            const mailtoUrl = `mailto:wellingtonrbaalvim@hotmail.com?subject=${assuntoEncoded}&body=${emailEncoded}`;
            
            window.location.href = mailtoUrl;
            alert('Seu cliente de e-mail será aberto. Por favor, confirme o envio.');
        }
        
        contatoForm.reset();
    });
}

// Animação ao scroll - Scroll Reveal
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observar todos os elementos que devem ser revelados
document.querySelectorAll('.imovel-card, .valor-card, .info-card, .depoimento-card, .section-title, .sobre-text, .sobre-image').forEach(el => {
    el.classList.add('reveal');
    scrollObserver.observe(el);
});

// Adicionar delay escalonado para cards
document.querySelectorAll('.imovel-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.valor-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.depoimento-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Header com fundo sólido ao scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Máscara para telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });
}

