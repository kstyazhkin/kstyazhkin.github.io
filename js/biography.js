document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления элементов при скролле
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Анимация тегов
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Анимация достижений
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

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

    // Интерактивный timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').style.transform = 'translateX(0)';
        });
    });

    // Социальные ссылки
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });

    // Обновление активного состояния в навигации
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
                if (correspondingLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
});

// Добавить к существующему biography.js

document.addEventListener('DOMContentLoaded', () => {
    // Анимация статистики при появлении
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const targetValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = targetValue / 30;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    stat.textContent = targetValue + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.ceil(currentValue) + '+';
                }
            }, 50);
        });
    };

    // Запуск анимации при видимости элемента
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.profile-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Параллакс эффект для фона профиля
    const profileBackground = document.querySelector('.profile-background');
    if (profileBackground) {
        document.addEventListener('mousemove', e => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            profileBackground.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }

    // Модальное окно для фото профиля
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${profileImage.src}" alt="Profile">
                    <button class="close-modal">×</button>
                </div>
            `;
            document.body.appendChild(modal);

            modal.addEventListener('click', e => {
                if (e.target === modal || e.target.className === 'close-modal') {
                    modal.classList.add('fade-out');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    }

    // Интерактивные теги профиля
    document.querySelectorAll('.profile-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Интерактивные иконки статистики
    document.querySelectorAll('.stat-item').forEach(item => {
        const icon = item.querySelector('i');
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });

        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Анимация кнопок контакта
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });

        btn.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });

    // Функция показа расписания
    window.showSchedule = () => {
        const scheduleModal = document.createElement('div');
        scheduleModal.className = 'schedule-modal';
        scheduleModal.innerHTML = `
            <div class="schedule-content">
                <h3>Расписание консультаций</h3>
                <div class="schedule-grid">
                    <div class="schedule-item">
                        <div class="day">Вторник</div>
                        <div class="time">14:00 - 15:30</div>
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            Кабинет 267
                        </div>
                    </div>
                    <div class="schedule-item">
                        <div class="day">Четверг</div>
                        <div class="time">14:00 - 15:30</div>
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            Кабинет 267
                        </div>
                    </div>
                </div>
                <button class="close-schedule">Закрыть</button>
            </div>
        `;
        document.body.appendChild(scheduleModal);

        setTimeout(() => scheduleModal.classList.add('active'), 10);

        const closeBtn = scheduleModal.querySelector('.close-schedule');
        closeBtn.addEventListener('click', () => {
            scheduleModal.classList.remove('active');
            setTimeout(() => scheduleModal.remove(), 300);
        });

        scheduleModal.addEventListener('click', e => {
            if (e.target === scheduleModal) {
                scheduleModal.classList.remove('active');
                setTimeout(() => scheduleModal.remove(), 300);
            }
        });
    };

    // Эффект подсветки при наведении на профиль
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mousemove', e => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            profileCard.style.setProperty('--x', `${x}px`);
            profileCard.style.setProperty('--y', `${y}px`);
        });
    }

    // Анимация загрузки профиля
    const animateProfileLoad = () => {
        const elements = [
            '.profile-image',
            '.profile-info h2',
            '.position',
            '.profile-tags',
            '.profile-stats',
            '.profile-contact',
            '.profile-links'
        ];

        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };

    // Запуск анимации загрузки профиля
    animateProfileLoad();
});