document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const data = event.detail;
        
        console.group('--- Данные формы ---');
        console.log('ФИО:', data.fullname);
        console.log('Телефон:', data.phone);
        console.log('Email:', data.email);
        console.log('Сообщение:', data.message);
        console.log('Дата отправки:', new Date().toLocaleString());
        console.groupEnd();
    });
});
