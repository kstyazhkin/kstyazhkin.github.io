document.addEventListener('DOMContentLoaded', () => {
    // Функция анимации чисел
    const animateCounter = (counter, target) => {
        let current = 0;
        const increment = target / 50; // Скорость анимации
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, 20);
    };

    // Запуск анимации при появлении в области видимости
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Наблюдение за секцией достижений
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        observer.observe(achievementsSection);
    }

    // Добавление эффектов при наведении
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.achievement-icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.achievement-icon i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
});