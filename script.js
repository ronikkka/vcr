// ========== ДАННЫЕ ==========
const userData = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (900) 123-45-67",
    memberSince: "Январь 2024"
};

// ========== СОСТОЯНИЕ ==========
let currentPage = 'home';
let isLoggedIn = false;

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function showModal(title, message) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function showToast(message, isError = false) {
    // Простое уведомление через alert, можно заменить на более красивый тост
    alert(message);
}

// ========== КОМПОНЕНТЫ СТРАНИЦ ==========
const pages = {
    home: () => `
        <section class="hero">
            <div class="hero-bg"></div>
            <div class="hero-overlay"></div>
            <div class="container hero-content">
                <h1>Ателье индивидуального пошива</h1>
                <p>Воплощаем ваши мечты о совершенном образе в реальность</p>
                <button class="btn-hero" onclick="navigateTo('order')">Оформить заказ →</button>
            </div>
        </section>
        <section class="features">
            <div class="container">
                <h2>Почему выбирают нас</h2>
                <div class="features-grid">
                    <div class="feature-card"><div class="feature-icon">✂️</div><h3>Индивидуальный подход</h3><p>Каждое изделие создается с учетом ваших пожеланий и особенностей фигуры</p></div>
                    <div class="feature-card"><div class="feature-icon">✨</div><h3>Премиальное качество</h3><p>Используем только качественные ткани и материалы от проверенных поставщиков</p></div>
                    <div class="feature-card"><div class="feature-icon">⏰</div><h3>Соблюдение сроков</h3><p>Гарантируем выполнение работы точно в оговоренные сроки</p></div>
                </div>
            </div>
        </section>
        <section class="portfolio-section">
            <div class="container">
                <h2>Наши работы</h2>
                <p class="text-center text-gray-600 mb-12">Посмотрите примеры наших лучших работ</p>
                <div class="portfolio-grid">
                    ${portfolioItems.slice(0,3).map(item => `
                        <div class="portfolio-item"><img src="${item.image}" alt="${item.title}"><div class="portfolio-overlay"><span>${item.title}</span></div></div>
                    `).join('')}
                </div>
                <div class="text-center"><button class="btn-portfolio" onclick="navigateTo('portfolio')">Посмотреть все работы →</button></div>
            </div>
        </section>
        <section class="cta">
            <div class="container"><h2>Готовы создать свой идеальный образ?</h2><p>Свяжитесь с нами сегодня для консультации</p>
            <div class="cta-buttons"><button class="btn-primary" onclick="navigateTo('order')">Оформить заказ</button><button class="btn-secondary" onclick="navigateTo('contacts')">Связаться с нами</button></div></div>
        </section>
    `,
    
    portfolio: () => `
        <div class="container py-20">
            <h1>Портфолио</h1>
            <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Каждая работа создается с любовью и вниманием к деталям.</p>
            <div class="tabs-list" id="portfolioTabs">
                <button class="tab-trigger active" data-cat="all">Все работы</button>
                <button class="tab-trigger" data-cat="wedding">Свадебные</button>
                <button class="tab-trigger" data-cat="evening">Вечерние</button>
                <button class="tab-trigger" data-cat="suits">Костюмы</button>
            </div>
            <div class="portfolio-grid" id="portfolioGrid"></div>
        </div>
    `,
    
    services: () => `
        <div class="container py-20">
            <h1>Наши услуги</h1>
            <p class="text-center text-gray-600 mb-12">Мы предлагаем полный спектр услуг по индивидуальному пошиву</p>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${servicesData.map(s => `
                    <div class="card"><div style="height:200px; overflow:hidden;"><img src="${s.image}" style="width:100%; height:100%; object-fit:cover;"></div>
                    <div class="card-header"><h3 class="card-title">${s.title}</h3><p class="card-desc">${s.desc}</p></div>
                    <div class="card-content"><div class="mb-4"><span style="font-size:1.5rem;">${s.price}</span></div>
                    <ul>${s.features.map(f => `<li style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">✓ ${f}</li>`).join('')}</ul></div></div>
                `).join('')}
            </div>
        </div>
    `,
    
    order: () => `
        <div class="container py-20" style="max-width:800px;">
            <h1>Онлайн-заказ</h1>
            <p class="text-center text-gray-600 mb-12">Заполните форму, и мы свяжемся с вами для обсуждения деталей</p>
            <div class="card"><div class="card-header"><h3 class="card-title">Форма заказа</h3><p class="card-desc">Пожалуйста, укажите все необходимые данные</p></div>
            <div class="card-content"><form id="orderForm"><div class="form-group"><label>Имя и фамилия *</label><input type="text" id="orderName" required></div>
            <div class="grid-cols-2 md-cols-2"><div class="form-group"><label>Телефон *</label><input type="tel" id="orderPhone" required></div>
            <div class="form-group"><label>Email *</label><input type="email" id="orderEmail" required></div></div>
            <div class="form-group"><label>Тип услуги *</label><select id="orderService"><option value="wedding">Свадебное платье</option><option value="evening">Вечернее платье</option><option value="suit">Мужской костюм</option></select></div>
            <div class="form-group"><label>Описание заказа *</label><textarea id="orderDesc" rows="4" required></textarea></div>
            <button type="submit" class="btn-primary" style="width:100%;">Отправить заказ</button></form></div></div></div>
    `,
    
    account: () => {
        if (!isLoggedIn) {
            return `
                <div class="container py-20" style="max-width:400px;">
                    <div class="card"><div class="card-header"><h3 class="card-title">Вход в личный кабинет</h3><p class="card-desc">Введите свои данные для входа</p></div>
                    <div class="card-content"><form id="loginForm"><div class="form-group"><label>Email</label><input type="email" id="loginEmail" required></div>
                    <div class="form-group"><label>Пароль</label><input type="password" id="loginPassword" required></div>
                    <button type="submit" class="btn-primary" style="width:100%;">Войти</button></form>
                    <div class="text-center mt-4"><p class="text-gray-600">Нет аккаунта? <a href="#" onclick="showModal('Регистрация', 'Эта функция будет доступна в ближайшее время')">Зарегистрироваться</a></p></div></div></div></div>
            `;
        }
        return `
            <div class="container py-20"><div class="flex justify-between items-center mb-8"><div><h1>Личный кабинет</h1><p class="text-gray-600">Добро пожаловать, ${userData.name}!</p></div>
            <button class="btn-secondary" onclick="logout()">Выйти</button></div>
            <div class="tabs-list"><button class="tab-trigger active" data-tab="orders">Мои заказы</button><button class="tab-trigger" data-tab="profile">Профиль</button></div>
            <div id="ordersTab" class="tab-content active"><div class="card"><div class="card-header"><h3 class="card-title">История заказов</h3></div>
            <div class="card-content">${ordersData.map(o => `
                <div class="border rounded-lg p-4 mb-4"><div class="flex justify-between"><div><h4>${o.service}</h4><p>Заказ #${o.id}</p><p>${o.date}</p></div>
                <span class="badge ${o.status === 'В работе' ? 'badge-blue' : 'badge-green'}">${o.status}</span></div><div class="flex justify-between mt-3"><div><p>Этап: ${o.stage}</p><p class="font-medium">${o.price}</p></div>
                <button class="btn-secondary" style="height:2rem;" onclick="showModal('Детали заказа', 'Заказ №${o.id} от ${o.date}')">Подробнее</button></div></div>
            `).join('')}</div></div></div>
            <div id="profileTab" class="tab-content"><div class="card"><div class="card-header"><h3 class="card-title">Личная информация</h3></div>
            <div class="card-content"><div class="grid md:grid-cols-2 gap-4"><div><label>Имя и фамилия</label><input value="${userData.name}" readonly></div>
            <div><label>Email</label><input value="${userData.email}" readonly></div><div><label>Телефон</label><input value="${userData.phone}" readonly></div>
            <div><label>Клиент с</label><input value="${userData.memberSince}" readonly></div></div></div></div></div></div>
        `;
    },
    
    contacts: () => `
        <section class="bg-gray-900 text-white py-20 px-4"><div class="container text-center"><h1>Контакты</h1><p class="text-xl text-gray-300">Свяжитесь с нами удобным для вас способом</p></div></section>
        <section class="py-16 px-4 bg-gray-50"><div class="container"><div class="grid md:grid-cols-4 gap-6">
            <div class="card"><div class="card-content text-center"><div class="feature-icon mx-auto mb-4">📍</div><h3>Адрес</h3><p class="text-gray-600">г. Москва, ул. Примерная, д. 1</p></div></div>
            <div class="card"><div class="card-content text-center"><div class="feature-icon mx-auto mb-4">📞</div><h3>Телефон</h3><p class="text-gray-600">+7 (900) 123-45-67</p></div></div>
            <div class="card"><div class="card-content text-center"><div class="feature-icon mx-auto mb-4">✉️</div><h3>Email</h3><p class="text-gray-600">info@moshkina.ru</p></div></div>
            <div class="card"><div class="card-content text-center"><div class="feature-icon mx-auto mb-4">🕐</div><h3>Режим работы</h3><p class="text-gray-600">Пн-Пт: 10-20, Сб-Вс: 11-18</p></div></div>
        </div></div></section>
        <section class="py-16 px-4"><div class="container"><div class="grid lg:grid-cols-2 gap-12">
            <div><h2>Напишите нам</h2><form id="contactForm"><div class="form-group"><label>Ваше имя *</label><input type="text" id="contactName" required></div>
            <div class="grid md:grid-cols-2 gap-4"><div><label>Email *</label><input type="email" id="contactEmail" required></div><div><label>Телефон</label><input type="tel" id="contactPhone"></div></div>
            <div class="form-group"><label>Сообщение *</label><textarea id="contactMsg" rows="5" required></textarea></div>
            <button type="submit" class="btn-primary">Отправить сообщение</button></form></div>
            <div><h2>Как нас найти</h2><div class="bg-gray-200 rounded-lg h-80 flex items-center justify-center"><div class="text-center"><div>📍</div><p>г. Москва, ул. Примерная, д. 1</p></div></div></div>
        </div></div></section>
    `
};

// Данные портфолио
const portfolioItems = [
    { id: 1, category: "wedding", title: "Свадебное платье", image: "https://images.unsplash.com/photo-1665783126947-8c98c7b7ac72?w=600&h=600&fit=crop" },
    { id: 2, category: "evening", title: "Вечернее платье", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=600&fit=crop" },
    { id: 3, category: "suits", title: "Мужской костюм", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop" },
    { id: 4, category: "evening", title: "Коктейльное платье", image: "https://images.unsplash.com/photo-1656404131215-a40ad1f8da9e?w=600&h=600&fit=crop" },
    { id: 5, category: "suits", title: "Деловой костюм", image: "https://images.unsplash.com/photo-1585412459060-26478a8435b2?w=600&h=600&fit=crop" },
    { id: 6, category: "wedding", title: "Авторское платье", image: "https://images.unsplash.com/photo-1768885560804-637950eb129d?w=600&h=600&fit=crop" }
];

// Данные услуг
const servicesData = [
    { title: "Свадебные платья", desc: "Платье мечты для важного дня", price: "от 50 000 ₽", image: "https://images.unsplash.com/photo-1665783126947-8c98c7b7ac72?w=600&h=400&fit=crop", features: ["Индивидуальный дизайн", "3-4 примерки", "Срок: 2-3 месяца"] },
    { title: "Вечерние платья", desc: "Элегантные наряды", price: "от 30 000 ₽", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=400&fit=crop", features: ["Консультация по стилю", "2-3 примерки", "Срок: 1-2 месяца"] },
    { title: "Мужские костюмы", desc: "Идеальная посадка", price: "от 40 000 ₽", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=400&fit=crop", features: ["Снятие мерок", "2 примерки", "Срок: 3-4 недели"] }
];

const ordersData = [
    { id: "ORD-001", date: "15 марта 2026", service: "Свадебное платье", status: "В работе", stage: "Первая примерка", price: "55 000 ₽" },
    { id: "ORD-002", date: "1 февраля 2026", service: "Вечернее платье", status: "Завершен", stage: "Готово", price: "32 000 ₽" }
];

// ========== НАВИГАЦИЯ ==========
function navigateTo(page) {
    currentPage = page;
    render();
    
    // Обновляем активные ссылки
    document.querySelectorAll('.nav-links a, .footer a[data-page]').forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function logout() {
    isLoggedIn = false;
    navigateTo('account');
}

// ========== РЕНДЕРИНГ ==========
function render() {
    const app = document.getElementById('app');
    const footer = document.getElementById('footer');
    
    if (pages[currentPage]) {
        app.innerHTML = pages[currentPage]();
        footer.style.display = currentPage === 'account' && !isLoggedIn ? 'none' : 'block';
        
        // Инициализация после рендера
        setTimeout(() => {
            if (currentPage === 'portfolio') initPortfolioTabs();
            if (currentPage === 'account' && isLoggedIn) initAccountTabs();
            if (currentPage === 'order') document.getElementById('orderForm')?.addEventListener('submit', handleOrderSubmit);
            if (currentPage === 'contacts') document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);
            if (currentPage === 'account' && !isLoggedIn) document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
        }, 10);
    }
}

function initPortfolioTabs() {
    const container = document.getElementById('portfolioGrid');
    const filterItems = (cat) => {
        const filtered = cat === 'all' ? portfolioItems : portfolioItems.filter(i => i.category === cat);
        container.innerHTML = filtered.map(item => `
            <div class="portfolio-item"><img src="${item.image}" alt="${item.title}"><div class="portfolio-overlay"><span>${item.title}</span></div></div>
        `).join('');
    };
    
    filterItems('all');
    document.querySelectorAll('#portfolioTabs .tab-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#portfolioTabs .tab-trigger').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterItems(btn.dataset.cat);
        });
    });
}

function initAccountTabs() {
    const ordersTab = document.getElementById('ordersTab');
    const profileTab = document.getElementById('profileTab');
    
    document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            ordersTab.classList.toggle('active', btn.dataset.tab === 'orders');
            profileTab.classList.toggle('active', btn.dataset.tab === 'profile');
        });
    });
}

// ========== ОБРАБОТЧИКИ ФОРМ ==========
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (email && password) {
        isLoggedIn = true;
        navigateTo('account');
        showModal('Успешный вход', 'Добро пожаловать в личный кабинет!');
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();
    showModal('Заказ отправлен!', 'Спасибо за ваш заказ. Наш менеджер свяжется с вами в течение 24 часов.');
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    showModal('Сообщение отправлено!', 'Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn?.addEventListener('click', () => navLinks.classList.toggle('active'));
    
    // Навигация по кликам
    document.querySelectorAll('.nav-links a, .footer a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
            navLinks.classList.remove('active');
        });
    });
    
    // Модальное окно
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    document.getElementById('modalConfirm')?.addEventListener('click', closeModal);
    document.getElementById('modal')?.addEventListener('click', (e) => { if (e.target === document.getElementById('modal')) closeModal(); });
    
    // Стартовая страница
    navigateTo('home');
    
    // Глобальные функции
    window.navigateTo = navigateTo;
    window.showModal = showModal;
    window.logout = logout;
});