document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления сертификатных карточек при прокрутке
    const certificateCards = document.querySelectorAll('.certificate-card');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    certificateCards.forEach(card => {
        observer.observe(card);
    });

    // Эффекты при наведении на карточки сертификатов
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Модальное окно для просмотра сертификата в увеличенном виде
    certificateCards.forEach(card => {
        card.addEventListener('click', () => {
            // Создание модального контейнера
            const modal = document.createElement('div');
            modal.classList.add('certificate-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    ${card.innerHTML}
                </div>
            `;
            document.body.appendChild(modal);

            // Добавление класса для анимации появления
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            // Закрытие модального окна при клике на кнопку закрытия или вне области контента
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('close-modal') || e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });
        });
    });
});
