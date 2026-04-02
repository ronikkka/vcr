// Figma Sites Runtime аналог
class MoshkinASite {
    constructor() {
        this.init();
    }

    init() {
        this.container = document.getElementById('container');
        this.bundleId = '5bce6cdf-7ebf-4c2d-963a-b1dde17547e2';
        this.setupNavigation();
        this.setupForms();
        this.setupAnimations();
        this.setupMobileMenu();
        console.log('✅ MoshkinA Site initialized (Figma Sites clone)');
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.showPage(target);
            });
        });
    }

    showPage(pageId) {
        // Скрыть все страницы
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.opacity = '0';
        });
        
        // Показать нужную
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            setTimeout(() => {
                targetPage.classList.add('active');
                targetPage.style.opacity = '1';
            }, 150);
        }
        
        // Обновить активную ссылку
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector(`[href="#${pageId}"]`)?.classList.add('active');
        
        // Закрыть мобильное меню
        document.querySelector('.nav-menu')?.classList.remove('active');
    }

    setupForms() {
        document.querySelector('.order-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🎉 Заявка отправлена! Мы свяжемся с вами в течение часа.');
            e.target.reset();
        });
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.feature-card, .service-card, .portfolio-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    setupMobileMenu() {
        document.querySelector('.hamburger')?.addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    }
}

// Запуск при загрузке DOM (как Figma SitesRuntime)
document.addEventListener('DOMContentLoaded', () => {
    window.moshkinaSite = new MoshkinASite();
    
    // Показать главную страницу
    window.moshkinaSite.showPage('home');
});

// Глобальная функция для кнопок
function navigateTo(pageId) {
    window.moshkinaSite.showPage(pageId);
}