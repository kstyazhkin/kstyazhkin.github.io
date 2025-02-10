document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Валидация email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Валидация длины текста
    function isValidLength(text, minLength, maxLength) {
        return text.length >= minLength && text.length <= maxLength;
    }

    // Валидация отдельного поля
    function validateField(field) {
        const wrapper = field.closest('.input-wrapper');
        let errorMessage = '';

        switch(field.id) {
            case 'name':
                if (!isValidLength(field.value, 2, 50)) {
                    errorMessage = 'ФИО должно содержать от 2 до 50 символов';
                }
                break;
            case 'email':
                if (!isValidEmail(field.value)) {
                    errorMessage = 'Введите корректный email адрес';
                }
                break;
            case 'subject':
                if (!isValidLength(field.value, 5, 100)) {
                    errorMessage = 'Тема должна содержать от 5 до 100 символов';
                }
                break;
            case 'message':
                if (!isValidLength(field.value, 10, 500)) {
                    errorMessage = 'Сообщение должно содержать от 10 до 500 символов';
                }
                break;
        }

        // Удаляем предыдущее сообщение об ошибке
        const existingError = wrapper.nextElementSibling;
        if (existingError?.classList.contains('error-message')) {
            existingError.remove();
        }

        if (errorMessage) {
            wrapper.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            wrapper.parentNode.insertBefore(errorDiv, wrapper.nextSibling);
            return false;
        } else {
            wrapper.classList.remove('error');
            return true;
        }
    }

    // Обработка фокуса на полях
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.input-wrapper').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.closest('.input-wrapper').classList.remove('focused');
            validateField(input);
        });

        input.addEventListener('input', () => {
            const wrapper = input.closest('.input-wrapper');
            if (wrapper.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Показ уведомлений
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        const text = document.createElement('span');
        text.textContent = message;

        notification.appendChild(icon);
        notification.appendChild(text);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Обработка отправки формы
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Валидация всех полей
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }

        // Анимация кнопки отправки
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;

        try {
            // Имитация отправки формы
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Очистка формы
            contactForm.reset();
            showNotification('Сообщение успешно отправлено!');
        } catch (error) {
            showNotification('Произошла ошибка при отправке. Попробуйте позже.', 'error');
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    });

    // Анимация социальных иконок
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });

    // Анимация карточек расписания
    const scheduleCards = document.querySelectorAll('.schedule-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    scheduleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});