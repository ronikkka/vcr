// Переключение страниц
function showPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    // Показать нужную
    document.getElementById(pageId).classList.add('active');
    
    // Активная ссылка в меню
    document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    // Закрыть мобильное меню
    document.querySelector('.nav-menu').classList.remove('active');
}

// Мобильное меню
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Форма заказа
document.querySelector('.order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
});

// Анимация скролла для элементов
function animateScroll() {
    document.querySelectorAll('.feature, .service-card, .gallery-item').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateScroll);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature, .service-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.6s ease';
    });
    showPage('home'); // Главная по умолчанию
    animateScroll();
});