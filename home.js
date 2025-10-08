// ===================================
// SENAI - Interactive JavaScript
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all features
  initThemeToggle();
  initMobileMenu();
  initScrollEffects();
  initCourseFilters();
  initFAQ();
  initCarousel();
  initContactForm();
  initAnimations();
  initBackToTop();
  initCounters();
  
});

// ===================================
// Theme Toggle
// ===================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
}

// ===================================
// Mobile Menu
// ===================================
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}

// ===================================
// Scroll Effects
// ===================================
function initScrollEffects() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===================================
// Course Filters
// ===================================
function initCourseFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter courses
      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===================================
// Course Modal
// ===================================
function openCourseModal(courseTitle) {
  const modal = document.getElementById('courseModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTopics = document.getElementById('modalTopics');
  
  // Course data
  const courseData = {
    'Desenvolvimento de Sistemas': {
      description: 'Curso técnico completo em desenvolvimento de sistemas, abrangendo programação, banco de dados, desenvolvimento web e mobile. Prepare-se para atuar como desenvolvedor full stack com as tecnologias mais demandadas pelo mercado.',
      topics: [
        'Lógica de Programação e Algoritmos',
        'Programação Orientada a Objetos (Java, C#, Python)',
        'Desenvolvimento Web (HTML, CSS, JavaScript, React)',
        'Desenvolvimento Mobile (React Native, Flutter)',
        'Banco de Dados (SQL, MySQL, PostgreSQL)',
        'APIs RESTful e Integração de Sistemas',
        'Versionamento de Código (Git, GitHub)',
        'Metodologias Ágeis (Scrum, Kanban)',
        'Testes de Software e Quality Assurance',
        'Projeto Integrador com Empresa Real'
      ]
    },
    'Mecânica Industrial': {
      description: 'Formação técnica em mecânica industrial com foco em manutenção, processos industriais e operação de máquinas. Desenvolva competências para atuar em indústrias de diversos segmentos.',
      topics: [
        'Desenho Técnico Mecânico',
        'Metrologia e Instrumentos de Medição',
        'Processos de Usinagem (Torno, Fresa, Retífica)',
        'Manutenção Mecânica Preventiva e Corretiva',
        'Elementos de Máquinas e Transmissões',
        'Pneumática e Hidráulica Industrial',
        'Soldagem e Processos de União',
        'Materiais Industriais e Tratamentos Térmicos',
        'Segurança no Trabalho e NRs',
        'Gestão da Manutenção Industrial'
      ]
    },
    'Edificações': {
      description: 'Curso técnico em edificações com formação completa em projetos, orçamentos e gestão de obras. Aprenda a desenvolver projetos estruturais e gerenciar todas as etapas de uma construção.',
      topics: [
        'Desenho Arquitetônico e Estrutural',
        'AutoCAD e Softwares de Projeto',
        'Materiais de Construção Civil',
        'Tecnologia das Construções',
        'Estruturas de Concreto, Aço e Madeira',
        'Instalações Hidrossanitárias e Elétricas',
        'Orçamento e Planejamento de Obras',
        'Topografia e Terraplenagem',
        'Normas Técnicas (NBR) e Legislação',
        'Gestão de Projetos e Canteiro de Obras'
      ]
    },
    'Redes de Computadores': {
      description: 'Formação técnica em redes de computadores com certificações reconhecidas. Aprenda a configurar, administrar e garantir a segurança de redes corporativas.',
      topics: [
        'Fundamentos de Redes e Protocolos',
        'Cabeamento Estruturado e Infraestrutura',
        'Configuração de Switches e Roteadores',
        'Redes Locais (LAN) e de Longa Distância (WAN)',
        'Protocolos TCP/IP e Endereçamento IP',
        'Segurança de Redes e Firewall',
        'Redes Sem Fio (Wi-Fi) e VPN',
        'Servidores Windows e Linux',
        'Virtualização e Cloud Computing',
        'Certificações Cisco CCNA'
      ]
    },
    'Mecânica Automotiva': {
      description: 'Curso técnico em mecânica automotiva com foco em tecnologias modernas. Aprenda manutenção, diagnóstico eletrônico e sistemas automotivos de última geração.',
      topics: [
        'Motores de Combustão Interna',
        'Sistemas de Transmissão e Embreagem',
        'Suspensão, Direção e Freios',
        'Injeção Eletrônica de Combustível',
        'Diagnóstico com Scanner Automotivo',
        'Sistemas Elétricos e Eletrônicos',
        'Ar Condicionado Automotivo',
        'Manutenção Preventiva e Corretiva',
        'Tecnologias Híbridas e Elétricas',
        'Gestão de Oficina Mecânica'
      ]
    },
    'Eletrotécnica': {
      description: 'Formação técnica em eletrotécnica com foco em instalações industriais e automação. Desenvolva competências para atuar com projetos elétricos e comandos industriais.',
      topics: [
        'Circuitos Elétricos e Eletrônicos',
        'Instalações Elétricas Prediais e Industriais',
        'Comandos Elétricos e Acionamentos',
        'Máquinas Elétricas (Motores e Geradores)',
        'Transformadores e Subestações',
        'Automação Industrial e CLPs',
        'Projetos Elétricos e Luminotécnica',
        'Norma Regulamentadora NR-10',
        'Eficiência Energética e Qualidade de Energia',
        'Manutenção Elétrica Industrial'
      ]
    }
  };
  
  const course = courseData[courseTitle];
  
  if (course) {
    modalTitle.textContent = courseTitle;
    modalDescription.textContent = course.description;
    
    modalTopics.innerHTML = '';
    course.topics.forEach(topic => {
      const li = document.createElement('li');
      li.textContent = topic;
      modalTopics.appendChild(li);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCourseModal() {
  const modal = document.getElementById('courseModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===================================
// FAQ Accordion
// ===================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// ===================================
// Testimonials Carousel
// ===================================
function initCarousel() {
  const carousel = document.getElementById('testimonialsCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const cards = carousel.querySelectorAll('.testimonial-card');
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  
  // Add dot styles
  const style = document.createElement('style');
  style.textContent = `
    .carousel-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--border);
      border: none;
      cursor: pointer;
      transition: all var(--transition-base);
    }
    .carousel-dot:hover {
      background: var(--primary);
      transform: scale(1.2);
    }
    .carousel-dot.active {
      background: var(--primary);
      width: 32px;
      border-radius: 6px;
    }
  `;
  document.head.appendChild(style);
  
  function updateCarousel() {
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoplay();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
  
  // Start autoplay
  startAutoplay();
  
  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', startAutoplay);
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate
    if (!data.name || !data.email || !data.phone || !data.course || !data.message) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// ===================================
// Scroll Animations
// ===================================
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });
}

// ===================================
// Back to Top Button
// ===================================
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// Animated Counters
// ===================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const speed = 200; // Animation speed
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-count');
        const increment = target / speed;
        
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString('pt-BR');
          }
        };
        
        updateCounter();
        counter.classList.add('counted');
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===================================
// Performance Optimizations
// ===================================

// Optimize scroll events
window.addEventListener('scroll', throttle(function() {
  // Scroll-based animations and effects are handled here
}, 100));

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===================================
// Console Message
// ===================================
console.log('%cSENAI - Educação Profissional', 'color: #0055A4; font-size: 24px; font-weight: bold;');
console.log('%cSite desenvolvido com HTML, CSS e JavaScript', 'color: #64748B; font-size: 14px;');
