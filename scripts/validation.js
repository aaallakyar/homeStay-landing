document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Сброс старых ошибок
        document.querySelectorAll('.field.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.ui.error.message').forEach(el => el.remove());

        let isValid = true;

        //  Валидация ФИО 
        const fullname = document.getElementById('fullname');
        if (fullname.value.trim().split(' ').filter(w => w.length > 0).length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        // Валидация телефона 
        const phone = document.getElementById('phone');
        if (phone.value.replace(/\D/g, '').length < 10) {
            showError(phone, 'Введите корректный номер телефона');
            isValid = false;
        }

        // Валидация Email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, 'Неверный формат email');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullname.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim(),
                message: document.getElementById('message').value.trim() || '(пусто)'
            };

            const validEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(validEvent);

            alert('Форма успешно заполнена!');
            form.reset();
        }
    });

    function showError(input, message) {
        const field = input.closest('.field');
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'ui error message';
        errorDiv.style.display = 'block';
        errorDiv.textContent = message;
        field.appendChild(errorDiv);
    }
});
