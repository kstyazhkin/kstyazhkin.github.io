document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления элементов при скролле
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Первичная проверка при загрузке

    // Плавная прокрутка для якорных ссылок
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

    // Интерактивное меню для мобильных устройств
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }

    // Анимация чисел при прокрутке до них
    const animateNumbers = () => {
        document.querySelectorAll('.number-animation').forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const current = parseInt(number.innerText);
            const increment = target / 50; // Скорость анимации

            if (current < target) {
                number.innerText = Math.ceil(current + increment);
                setTimeout(animateNumbers, 20);
            }
        });
    };

    // Интерактивные карточки
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Динамическая подсветка активного пункта меню при скролле
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});



