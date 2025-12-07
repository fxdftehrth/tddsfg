// ============================================
// ДАННЫЕ О ТОВАРАХ ДЛЯ КАТАЛОГА
// ============================================
const catalogProducts = [
    {
        id: 'logitech-g502',
        title: 'Logitech G502 X Plus',
        image: 'https://hyperpc.ru/images/catalog/accessories/mouse/logitech/g502-x-plus/logitech-g502-x-plus-wireless-rgb.jpg',
        price: 12990,
        category: 'mouse',
        brand: 'logitech',
        availability: 'in-stock',
        features: ['rgb', 'wireless'],
        badge: 'Хит продаж',
        description: 'Профессиональная игровая мышь с революционным сенсором HERO 25K'
    },
    {
        id: 'razer-kraken',
        title: 'Razer Kraken X',
        image: 'https://razer.syntes.io/213841/razer-kraken-x-lite-gallery-07.jpg',
        price: 5990,
        category: 'headphones',
        brand: 'razer',
        availability: 'in-stock',
        features: [],
        badge: 'Новинка',
        description: 'Комфортные игровые наушники с объемным звуком 7.1 Surround'
    },
    {
        id: 'corsair-k95',
        title: 'Corsair K95 RGB Platinum XT',
        image: 'https://cdn.mos.cms.futurecdn.net/j5hNffGdJrnnKzrJhYG6X4-1200-80.jpg',
        price: 18990,
        category: 'keyboard',
        brand: 'corsair',
        availability: 'in-stock',
        features: ['rgb', 'premium'],
        badge: 'Premium',
        description: 'Механическая клавиатура премиум-класса с переключателями Cherry MX'
    },
    {
        id: 'steelseries-qck',
        title: 'SteelSeries QcK Prism XL',
        image: 'https://img-itopya.mncdn.com/cdn/100/steelseries-qck-prism-cloth-xl-3.png24143e29-a1d9-4398-ac45-681b363a8c02.png',
        price: 3490,
        category: 'mousepad',
        brand: 'steelseries',
        availability: 'in-stock',
        features: ['rgb'],
        badge: '',
        description: 'Игровой коврик с RGB подсветкой по краям'
    },
    {
        id: 'hyperx-cloud',
        title: 'HyperX Cloud Alpha Wireless',
        image: 'https://hyperpc.ru/images/catalog/accessories/headsets/hyperx/alpha-wireless/hyperx-alpha-cloud-wireless.jpg',
        price: 8990,
        category: 'headphones',
        brand: 'hyperx',
        availability: 'in-stock',
        features: ['wireless'],
        badge: '',
        description: 'Беспроводные наушники с батареей на 300 часов работы'
    },
    {
        id: 'razer-deathadder',
        title: 'Razer DeathAdder V3 Pro',
        image: 'https://razer.syntes.io/public/BRLmeDPgWpjuNi3tPBv3Jj/800x600-razer-deathadder-v3-pro-white-product-promo.png',
        price: 10990,
        category: 'mouse',
        brand: 'razer',
        availability: 'in-stock',
        features: ['wireless', 'rgb'],
        badge: '',
        description: 'Беспроводная игровая мышь с оптическим сенсором Focus Pro 30K'
    },
    {
        id: 'logitech-g915',
        title: 'Logitech G915 TKL',
        image: 'https://hexus.net/media/uploaded/2021/8/563e83d8-6eb9-443f-b52d-f63686d85e77.jpg',
        price: 14990,
        category: 'keyboard',
        brand: 'logitech',
        availability: 'pre-order',
        features: ['rgb', 'wireless'],
        badge: 'Новинка',
        description: 'Беспроводная механическая клавиатура с RGB подсветкой'
    },
    {
        id: 'corsair-hs80',
        title: 'Corsair HS80 RGB Wireless',
        image: 'https://hexus.net/media/uploaded/2021/8/563e83d8-6eb9-443f-b52d-f63686d85e77.jpg',
        price: 12990,
        category: 'headphones',
        brand: 'corsair',
        availability: 'in-stock',
        features: ['rgb', 'wireless'],
        badge: '',
        description: 'Беспроводные наушники с RGB подсветкой и объемным звуком'
    },
    {
        id: 'razer-huntsman',
        title: 'Razer Huntsman V3 Pro',
        image: 'https://razer.syntes.io/public/pvWbRpjpu3DyZmT3XTXQeH/huntsman-v3-pro-1500x1000-3.jpg',
        price: 19990,
        category: 'keyboard',
        brand: 'razer',
        availability: 'in-stock',
        features: ['rgb', 'premium'],
        badge: 'Premium',
        description: 'Механическая клавиатура с оптическими переключателями'
    },
    {
        id: 'steelseries-aerox',
        title: 'SteelSeries Aerox 5 Wireless',
        image: 'https://4frag.ru/image/data/News/%D0%9C%D0%B0%D1%80%D1%82-%D0%B0%D0%BF%D1%80%D0%B5%D0%BB%D1%8C%202022/steelseries-aerox-5-aerox-5-wireless-i-aerox-9-wireless-news-1.jpg',
        price: 8990,
        category: 'mouse',
        brand: 'steelseries',
        availability: 'in-stock',
        features: ['wireless'],
        badge: '',
        description: 'Легкая беспроводная игровая мышь с сенсором TrueMove Air'
    }
];

// ============================================
// ФИЛЬТРАЦИЯ И СОРТИРОВКА
// ============================================

let filteredProducts = [...catalogProducts];
let currentSort = 'default';

// Применение фильтров
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
    const selectedAvailability = Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value);
    const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(cb => cb.value);
    
    const priceMin = parseFloat(document.getElementById('priceMin').value) || 0;
    const priceMax = parseFloat(document.getElementById('priceMax').value) || 50000;
    
    filteredProducts = catalogProducts.filter(product => {
        // Фильтр по категории
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Фильтр по бренду
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }
        
        // Фильтр по наличию
        if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.availability)) {
            return false;
        }
        
        // Фильтр по особенностям
        if (selectedFeatures.length > 0) {
            const hasAllFeatures = selectedFeatures.every(feature => product.features.includes(feature));
            if (!hasAllFeatures) {
                return false;
            }
        }
        
        // Фильтр по цене
        if (product.price < priceMin || product.price > priceMax) {
            return false;
        }
        
        return true;
    });
    
    applySort();
    renderProducts();
}

// Применение сортировки
function applySort() {
    switch (currentSort) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
            break;
        default:
            // По умолчанию - исходный порядок
            break;
    }
}

// Рендеринг товаров
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productsEmpty = document.getElementById('productsEmpty');
    const productsCount = document.getElementById('productsCount');
    
    productsCount.textContent = filteredProducts.length;
    
    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        productsEmpty.style.display = 'block';
        return;
    }
    
    productsGrid.style.display = 'grid';
    productsEmpty.style.display = 'none';
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Создание карточки товара
function createProductCard(product) {
    const div = document.createElement('article');
    div.className = 'device-card';
    div.setAttribute('data-3d', 'true');
    
    const badgeClass = product.badge === 'Новинка' ? 'new' : 
                      product.badge === 'Premium' ? 'premium' : '';
    
    // Если изображение не указано, показываем плейсхолдер
    const imageSrc = product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzJhMWExYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM1MDQwNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QktC+0LfQstGA0LDRgtGMINC90LUg0YPRgdC70L7QstC40YLRjDwvdGV4dD48L3N2Zz4=';
    const imageAlt = product.image ? product.title : 'Изображение не загружено';
    const imageStyle = !product.image ? 'style="opacity: 0.5;"' : '';
    
    div.innerHTML = `
        <div class="card-image-wrapper">
            ${product.badge ? `<div class="card-badge ${badgeClass}">${product.badge}</div>` : ''}
            <img src="${imageSrc}" alt="${imageAlt}" loading="lazy" ${imageStyle}>
            <div class="card-overlay">
                <button class="card-button" onclick="addProductToCart('${product.id}')">В корзину</button>
            </div>
        </div>
        <div class="card-content">
            <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="card-features">
                ${product.features.map(f => `<span class="feature-tag">${f.toUpperCase()}</span>`).join('')}
            </div>
            <div style="margin-top: 1rem; font-size: 1.5rem; font-weight: 700; color: var(--crimson); font-family: var(--font-heading);">
                ${product.price.toLocaleString('ru-RU')} ₽
            </div>
        </div>
    `;
    
    return div;
}

// Добавление товара в корзину
function addProductToCart(productId) {
    const product = catalogProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Проверяем, есть ли функция addToCart (из cart.js)
    if (typeof window.addToCart === 'function') {
        window.addToCart(productId, {
            title: product.title,
            image: product.image,
            price: product.price.toLocaleString('ru-RU') + ' ₽',
            description: product.description
        });
    } else {
        // Если cart.js еще не загружен, используем localStorage напрямую
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price.toLocaleString('ru-RU') + ' ₽',
                description: product.description,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        if (typeof window.showNotification === 'function') {
            window.showNotification('Товар добавлен в корзину!');
        }
        
        // Обновляем бейдж корзины
        if (typeof window.updateCartBadge === 'function') {
            window.updateCartBadge();
        } else {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const badges = document.querySelectorAll('#cartBadge');
            badges.forEach(badge => {
                badge.textContent = totalItems;
                badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
            });
        }
    }
}

// Сброс фильтров
function resetFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true);
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceRange = document.getElementById('priceRange');
    
    if (priceMin) priceMin.value = 0;
    if (priceMax) priceMax.value = 50000;
    if (priceRange) priceRange.value = 50000;
    
    currentSort = 'default';
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    // Не применяем фильтры автоматически при сбросе - пользователь должен нажать "Применить"
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Синхронизация слайдера с полем ввода (без применения фильтров)
    const priceMaxInput = document.getElementById('priceMax');
    const priceRangeInput = document.getElementById('priceRange');
    
    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', function() {
            if (priceMaxInput) {
                priceMaxInput.value = this.value;
            }
        });
    }
    
    if (priceMaxInput) {
        priceMaxInput.addEventListener('input', function() {
            const maxPrice = Math.min(50000, Math.max(0, parseInt(this.value) || 50000));
            if (priceRangeInput) {
                priceRangeInput.value = maxPrice;
            }
        });
    }
    
    // Сортировка (применяется сразу)
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applySort();
            renderProducts();
        });
    }
    
    // Кнопка сброса фильтров
    const filtersReset = document.getElementById('filtersReset');
    if (filtersReset) {
        filtersReset.addEventListener('click', () => {
            resetFilters();
            // После сброса применяем фильтры автоматически
            applyFilters();
        });
    }
    
    // Кнопка применения фильтров
    const filterApplyButton = document.getElementById('filterApplyButton');
    if (filterApplyButton) {
        filterApplyButton.addEventListener('click', (e) => {
            e.preventDefault();
            applyFilters();
            
            // Визуальная обратная связь
            filterApplyButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                filterApplyButton.style.transform = '';
            }, 150);
        });
    }
    
    // Мобильное меню фильтров
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersContent = document.querySelector('.filters-content');
    if (filtersToggle && filtersContent) {
        filtersToggle.addEventListener('click', () => {
            filtersContent.classList.toggle('active');
        });
    }
    
    // Первоначальная загрузка (применяем фильтры при загрузке страницы)
    applyFilters();
    
    // Обновление бейджа корзины
    if (typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    } else {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('#cartBadge');
        badges.forEach(badge => {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    }
});

// Экспорт функции для использования в других файлах
window.addProductToCart = addProductToCart;

