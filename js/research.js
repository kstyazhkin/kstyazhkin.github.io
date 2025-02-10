document.addEventListener('DOMContentLoaded', () => {
    // Инициализация фильтров
    const filterButtons = document.querySelectorAll('.filter-btn');
    const researchItems = document.querySelectorAll('[data-category]');

    // Фильтрация элементов
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            researchItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Поиск по публикациям
    const searchInput = document.getElementById('researchSearch');
    
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.toLowerCase();
        
        researchItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });

    // Анимация статистики при прокрутке
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.ceil(current) + '+';
                    }
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    stats.forEach(stat => statsObserver.observe(stat));

    // Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.progress');
    
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.style.width);
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = target + '%';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgress, {
        threshold: 0.5
    });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Обработка клика по ссылкам на публикации
    document.querySelectorAll('.pub-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.textContent.trim();
            alert(`Документ "${type}" будет доступен в ближайшее время`);
        });
    });

    // Анимация метрик при прокрутке
    const metricCards = document.querySelectorAll('.metric-card');
    
    const animateMetrics = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                
                // Анимация числового значения
                const valueElement = entry.target.querySelector('.metric-value');
                const targetValue = parseInt(valueElement.textContent);
                let currentValue = 0;
                
                const increment = targetValue / 30;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        valueElement.textContent = targetValue;
                        clearInterval(timer);
                    } else {
                        valueElement.textContent = Math.ceil(currentValue);
                    }
                }, 50);
                
                observer.unobserve(entry.target);
            }
        });
    };

    const metricsObserver = new IntersectionObserver(animateMetrics, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    metricCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        metricsObserver.observe(card);
    });

    // Анимация тегов при наведении
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#ebebeb';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#f5f5f5';
        });
    });

    // Плавная прокрутка к секциям
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

    // Эффект параллакса для hero секции
    const heroSection = document.querySelector('.research-hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroSection.style.backgroundPosition = `center ${rate}px`;
        });
    }

    // Динамическая загрузка данных (пример)
    const loadMoreData = async () => {
        try {
            // Здесь будет реальный запрос к API
            const response = await fetch('api/publications');
            const data = await response.json();
            
            // Добавление новых публикаций
            data.forEach(pub => {
                const card = createPublicationCard(pub);
                document.querySelector('.publications-grid').appendChild(card);
            });
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    // Функция создания карточки публикации
    const createPublicationCard = (pub) => {
        const card = document.createElement('article');
        card.className = 'publication-card';
        card.setAttribute('data-category', 'publications');
        // Добавление содержимого карточки
        // ...
        return card;
    };

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        // Перестройка сетки при необходимости
        const grid = document.querySelector('.publications-grid');
        if (window.innerWidth <= 768) {
            grid.style.gridTemplateColumns = '1fr';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        }
    });
});