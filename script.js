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

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards de imóveis
document.querySelectorAll('.imovel-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
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

