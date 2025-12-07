// ============================================
// ДАННЫЕ О ТОВАРАХ
// ============================================
const productsData = {
    'logitech-g502': {
        title: 'Logitech G502 X Plus',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop',
        badge: 'Хит продаж',
        description: 'Профессиональная игровая мышь с революционным сенсором HERO 25K, обеспечивающим точность до 25,600 DPI. Оснащена 11 программируемыми кнопками, беспроводной технологией LIGHTSPEED с задержкой менее 1 мс и RGB подсветкой. Идеальный выбор для профессиональных киберспортсменов и энтузиастов.',
        specs: [
            'Сенсор: HERO 25K',
            'DPI: до 25,600',
            'Кнопки: 11 программируемых',
            'Подключение: Wireless LIGHTSPEED / USB',
            'Время работы: до 120 часов',
            'Вес: 114 г',
            'RGB подсветка: Да'
        ],
        features: ['RGB', 'Wireless', 'LIGHTSPEED', 'Programmable'],
        price: '12,990 ₽'
    },
    'razer-kraken': {
        title: 'Razer Kraken X',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
        badge: 'Новинка',
        description: 'Комфортные игровые наушники с объемным звуком 7.1 Surround и охватывающим микрофоном. Легкая конструкция (250 г) обеспечивает комфорт при длительных игровых сессиях. Идеальная звуковая изоляция и четкий звук для полного погружения в игру.',
        specs: [
            'Тип: Охватывающие',
            'Звук: 7.1 Surround',
            'Микрофон: Охватывающий, отключаемый',
            'Частотный диапазон: 12 Гц - 28 кГц',
            'Импеданс: 32 Ом',
            'Вес: 250 г',
            'Кабель: 1.3 м с контроллером'
        ],
        features: ['7.1 Surround', 'Lightweight', 'Comfortable', 'Retractable Mic'],
        price: '5,990 ₽'
    },
    'corsair-k95': {
        title: 'Corsair K95 RGB Platinum XT',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop',
        badge: 'Premium',
        description: 'Механическая клавиатура премиум-класса с переключателями Cherry MX Speed и расширенной RGB подсветкой per-key. Оснащена 6 программируемыми макроклавишами, алюминиевой рамкой и USB passthrough. Профессиональный инструмент для геймеров и стримеров.',
        specs: [
            'Переключатели: Cherry MX Speed',
            'Клавиши: 109 (6 макроклавиш)',
            'RGB подсветка: Per-key RGB',
            'Материал корпуса: Алюминий',
            'USB passthrough: Да',
            'Профили: 8 встроенных',
            'Гарантия: 2 года'
        ],
        features: ['Cherry MX', 'RGB', 'Macro Keys', 'Aluminum'],
        price: '18,990 ₽'
    }
};

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ============================================
window.addEventListener('load', () => {
    const body = document.querySelector('body');
    body.style.opacity = '0';
    setTimeout(() => {
        body.style.transition = 'opacity 1s ease-in-out';
        body.style.opacity = '1';
    }, 100);
    
    // Инициализация всех функций
    initSmoothScroll();
    init3DEffects();
    initScrollAnimations();
    initMobileMenu();
    initParticleSystem();
    initCardInteractions();
    initProductModal();
});

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 3D ЭФФЕКТЫ ДЛЯ КАРТОЧЕК
// ============================================
function init3DEffects() {
    const cards = document.querySelectorAll('[data-3d="true"]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями и карточками
    const elementsToAnimate = document.querySelectorAll('.section, .device-card, .graphics-card, .stat-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Анимация иконки гамбургера
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ============================================
// СИСТЕМА ЧАСТИЦ (3D ЭФФЕКТ)
// ============================================
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Создаем дополнительные частицы для более богатого эффекта
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.width = (3 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// ИНТЕРАКТИВНОСТЬ КАРТОЧЕК
// ============================================
function initCardInteractions() {
    // Эффект при клике на карточку
    const deviceCards = document.querySelectorAll('.device-card');
    deviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.card-button')) {
                // Легкая анимация при клике
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
}

// ============================================
// МОДАЛЬНОЕ ОКНО ДЛЯ ТОВАРОВ
// ============================================
function initProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    const cardButtons = document.querySelectorAll('.card-button[data-product]');
    
    // Открытие модального окна
    cardButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.getAttribute('data-product');
            openProductModal(productId);
        });
    });
    
    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    // Закрытие при клике вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeProductModal();
        }
    });
    
    // Обработка кнопки "Купить сейчас"
    const buyButton = modal.querySelector('.modal-buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            const productId = buyButton.getAttribute('data-product-id');
            if (productId && typeof window.addToCart === 'function') {
                const product = productsData[productId];
                if (product) {
                    window.addToCart(productId, {
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        description: product.description
                    });
                }
            } else {
                showNotification('Товар добавлен в корзину!');
            }
            closeProductModal();
        });
    }
}

function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const product = productsData[productId];
    
    if (!modal || !product) return;
    
    // Заполнение данных
    modal.querySelector('#modalProductImage').src = product.image;
    modal.querySelector('#modalProductImage').alt = product.title;
    modal.querySelector('#modalProductTitle').textContent = product.title;
    modal.querySelector('#modalProductDescription').textContent = product.description;
    modal.querySelector('#modalProductPrice').textContent = product.price;
    
    // Бейдж
    const badgeEl = modal.querySelector('#modalProductBadge');
    badgeEl.textContent = product.badge;
    badgeEl.className = 'modal-badge';
    if (product.badge === 'Новинка') {
        badgeEl.classList.add('new');
    } else if (product.badge === 'Premium') {
        badgeEl.classList.add('premium');
    }
    
    // Характеристики
    const specsList = modal.querySelector('#modalProductSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    // Особенности
    const featuresEl = modal.querySelector('#modalProductFeatures');
    featuresEl.innerHTML = '';
    product.features.forEach(feature => {
        const span = document.createElement('span');
        span.className = 'feature-tag';
        span.textContent = feature;
        featuresEl.appendChild(span);
    });
    
    // Установка data-атрибута для кнопки "Купить сейчас"
    const buyButton = modal.querySelector('.modal-buy-button');
    if (buyButton) {
        buyButton.setAttribute('data-product-id', productId);
    }
    
    // Показ модального окна
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ============================================
// ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO СЕКЦИИ
// ============================================
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// ============================================
// ИЗМЕНЕНИЕ ПРОЗРАЧНОСТИ HEADER ПРИ СКРОЛЛЕ
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 8px 32px rgba(139, 0, 0, 0.6)';
    } else {
        header.style.boxShadow = '0 4px 16px rgba(139, 0, 0, 0.4)';
    }
    
    // Подсветка активной секции в навигации
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// ============================================
// ОБНОВЛЕНИЕ АКТИВНОЙ ССЫЛКИ В НАВИГАЦИИ
// ============================================
function updateActiveNavLink() {
    // Определяем текущую страницу по URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Проверяем, соответствует ли ссылка текущей странице
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Вызываем при загрузке страницы
updateActiveNavLink();

// ============================================
// АНИМАЦИЯ СТАТИСТИКИ (Счетчик)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Запуск анимации счетчиков при появлении в viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    stat.textContent = '0+';
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// ОБРАБОТКА CTA КНОПКИ
// ============================================
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const featuredSection = document.querySelector('#featured-devices');
        if (featuredSection) {
            const headerOffset = 80;
            const elementPosition = featuredSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// УЛУЧШЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ
// ============================================
// Throttle функция для оптимизации scroll событий
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Применяем throttle к scroll событиям
const optimizedScrollHandler = throttle(() => {
    // Обработка scroll событий
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ============================================
// ОБРАБОТКА ФОРМЫ КОНТАКТОВ
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Визуальная обратная связь
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Имитация отправки (в реальном проекте здесь был бы AJAX запрос)
        setTimeout(() => {
            submitButton.textContent = 'Отправлено! ✓';
            submitButton.style.background = 'linear-gradient(135deg, #00C853 0%, #00A844 100%)';
            
            // Очистка формы
            contactForm.reset();
            
            // Восстановление кнопки через 3 секунды
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
            
            // Показываем уведомление
            showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        }, 1500);
    });
}

// ============================================
// ФУНКЦИЯ ПОКАЗА УВЕДОМЛЕНИЙ
// ============================================
window.showNotification = function(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(220, 20, 60, 0.5);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
};

// Добавляем стили для анимации уведомлений
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ============================================
// ДОБАВЛЕНИЕ СТИЛЕЙ ДЛЯ АКТИВНОГО МЕНЮ (мобильная версия)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .main-nav.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #8B0000 0%, #5C0000 50%, #4B0000 100%);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
            border-top: 2px solid #DC143C;
        }
        
        .main-nav.active ul {
            flex-direction: column;
            width: 100%;
        }
        
        .main-nav.active .nav-link {
            width: 100%;
            justify-content: flex-start;
            padding: 1rem;
            border-bottom: 1px solid rgba(220, 20, 60, 0.3);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// РЕДАКТИРОВАНИЕ ИЗОБРАЖЕНИЙ
// ============================================
let currentImageId = null;

// Инициализация функционала редактирования изображений
function initImageEditor() {
    // Загружаем сохраненные изображения из localStorage
    loadSavedImages();
    
    // Обработчики для кнопок редактирования
    const editButtons = document.querySelectorAll('.edit-image-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const imageId = button.getAttribute('data-image-id');
            openImageEditModal(imageId);
        });
    });
    
    // Инициализация модального окна
    const imageModal = document.getElementById('imageEditModal');
    if (imageModal) {
        const closeBtn = imageModal.querySelector('.modal-close');
        const cancelBtn = document.getElementById('cancelImageBtn');
        const saveBtn = document.getElementById('saveImageBtn');
        const urlInput = document.getElementById('imageUrlInput');
        const fileInput = document.getElementById('imageFileInput');
        const previewImg = document.getElementById('imagePreview');
        
        // Закрытие модального окна
        if (closeBtn) {
            closeBtn.addEventListener('click', closeImageEditModal);
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeImageEditModal);
        }
        
        // Закрытие при клике вне модального окна
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageEditModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('show')) {
                closeImageEditModal();
            }
        });
        
        // Предпросмотр при вводе URL
        if (urlInput) {
            urlInput.addEventListener('input', (e) => {
                const url = e.target.value.trim();
                if (url && isValidImageUrl(url)) {
                    previewImg.src = url;
                    previewImg.style.display = 'block';
                } else {
                    previewImg.style.display = 'none';
                }
            });
        }
        
        // Загрузка файла
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        previewImg.src = event.target.result;
                        previewImg.style.display = 'block';
                        // Автоматически заполняем поле URL
                        if (urlInput) {
                            urlInput.value = event.target.result;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Сохранение изображения
        if (saveBtn) {
            saveBtn.addEventListener('click', saveImage);
        }
    }
}

// Открытие модального окна редактирования
function openImageEditModal(imageId) {
    const modal = document.getElementById('imageEditModal');
    if (!modal) return;
    
    currentImageId = imageId;
    const image = document.querySelector(`img[data-image-id="${imageId}"]`);
    
    if (image) {
        const urlInput = document.getElementById('imageUrlInput');
        const previewImg = document.getElementById('imagePreview');
        
        if (urlInput) {
            urlInput.value = image.src;
        }
        if (previewImg) {
            previewImg.src = image.src;
            previewImg.style.display = 'block';
        }
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна редактирования
function closeImageEditModal() {
    const modal = document.getElementById('imageEditModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Очистка полей
        const urlInput = document.getElementById('imageUrlInput');
        const fileInput = document.getElementById('imageFileInput');
        const previewImg = document.getElementById('imagePreview');
        
        if (urlInput) urlInput.value = '';
        if (fileInput) fileInput.value = '';
        if (previewImg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
        }
        
        currentImageId = null;
    }
}

// Сохранение изображения
function saveImage() {
    if (!currentImageId) return;
    
    const urlInput = document.getElementById('imageUrlInput');
    const imageUrl = urlInput ? urlInput.value.trim() : '';
    
    if (!imageUrl) {
        showNotification('Пожалуйста, введите URL или загрузите файл');
        return;
    }
    
    // Обновляем изображение на странице
    const image = document.querySelector(`img[data-image-id="${currentImageId}"]`);
    if (image) {
        // Проверяем загрузку изображения перед сохранением
        const testImg = new Image();
        testImg.onload = () => {
            image.src = imageUrl;
            
            // Сохраняем в localStorage
            saveImageToStorage(currentImageId, imageUrl);
            
            showNotification('Изображение успешно обновлено!');
            closeImageEditModal();
        };
        testImg.onerror = () => {
            showNotification('Ошибка: не удалось загрузить изображение. Проверьте URL или путь к файлу.');
        };
        testImg.src = imageUrl;
    }
}

// Сохранение изображения в localStorage
function saveImageToStorage(imageId, imageUrl) {
    try {
        const savedImages = JSON.parse(localStorage.getItem('savedImages') || '{}');
        savedImages[imageId] = imageUrl;
        localStorage.setItem('savedImages', JSON.stringify(savedImages));
    } catch (e) {
        console.error('Ошибка при сохранении изображения:', e);
    }
}

// Загрузка сохраненных изображений из localStorage
function loadSavedImages() {
    try {
        const savedImages = JSON.parse(localStorage.getItem('savedImages') || '{}');
        
        Object.keys(savedImages).forEach(imageId => {
            const image = document.querySelector(`img[data-image-id="${imageId}"]`);
            if (image && savedImages[imageId]) {
                image.src = savedImages[imageId];
            }
        });
    } catch (e) {
        console.error('Ошибка при загрузке изображений:', e);
    }
}

// Проверка валидности URL изображения
function isValidImageUrl(url) {
    // Проверяем, является ли это data URL или обычный URL
    return url.startsWith('data:image/') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/') ||
           url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    initImageEditor();
});
