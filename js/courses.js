document.addEventListener('DOMContentLoaded', () => {
    // Фильтрация курсов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
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

    // Поиск курсов
    const searchInput = document.getElementById('courseSearch');
    
    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();

        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.course-description').textContent.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });

    // Обработка кнопок действий
    const actionButtons = document.querySelectorAll('.action-btn');

    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const courseName = this.closest('.course-card').querySelector('h3').textContent;

            if (this.classList.contains('primary')) {
                showMaterials(courseName);
            } else if (this.classList.contains('secondary')) {
                showSchedule(courseName);
            }
        });
    });

    // Функция для показа материалов курса
    function showMaterials(courseName) {
        alert(`Материалы курса "${courseName}" будут доступны в ближайшее время`);
    }

    // Функция для показа расписания
    function showSchedule(courseName) {
        alert(`Расписание курса "${courseName}" будет доступно в ближайшее время`);
    }

    // Анимация появления при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    courseCards.forEach(card => {
        observer.observe(card);
    });
});