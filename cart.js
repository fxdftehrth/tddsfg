// ============================================
// УПРАВЛЕНИЕ КОРЗИНОЙ
// ============================================

// Получение корзины из localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Сохранение корзины в localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Обновление бейджа корзины в навигации
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cartBadge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// Добавление товара в корзину
function addToCart(productId, productData) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            ...productData,
            quantity: 1
        });
    }
    
    saveCart(cart);
    if (typeof window.showNotification === 'function') {
        window.showNotification('Товар добавлен в корзину!');
    }
}

// Удаление товара из корзины
function removeFromCart(productId) {
    try {
        console.log('Удаление товара:', productId);
        
        const cart = getCart();
        console.log('Текущая корзина:', cart);
        
        const item = cart.find(item => item.id === productId);
        
        if (!item) {
            console.warn('Товар не найден в корзине:', productId);
            return;
        }
        
        // Удаляем из корзины
        const filteredCart = cart.filter(item => item.id !== productId);
        console.log('Корзина после удаления:', filteredCart);
        
        // Сохраняем обновленную корзину
        localStorage.setItem('cart', JSON.stringify(filteredCart));
        
        // Обновляем бейдж
        updateCartBadge();
        
        // Показываем уведомление об удалении
        if (typeof window.showNotification === 'function') {
            window.showNotification(`Товар "${item.title}" удален из корзины`);
        }
        
        // Перерисовываем корзину немедленно
        renderCart();
        
        console.log('Корзина перерисована');
    } catch (error) {
        console.error('Ошибка при удалении товара из корзины:', error);
        if (typeof window.showNotification === 'function') {
            window.showNotification('Ошибка при удалении товара. Попробуйте еще раз.');
        }
        // В случае ошибки все равно перерисовываем корзину
        renderCart();
    }
}

// Изменение количества товара
function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    
    if (isNaN(quantity) || quantity < 1) {
        // Если количество меньше 1, удаляем товар
        if (confirm('Удалить товар из корзины?')) {
            removeFromCart(productId);
        } else {
            // Если пользователь отменил, восстанавливаем количество
            const cart = getCart();
            const item = cart.find(item => item.id === productId);
            if (item) {
                renderCart();
            }
        }
        return;
    }
    
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        renderCart();
        
        // Показываем уведомление об изменении количества
        if (typeof window.showNotification === 'function') {
            window.showNotification(`Количество товара "${item.title}" изменено на ${quantity}`);
        }
    }
}

// Очистка корзины
function clearCart() {
    saveCart([]);
    renderCart();
}

// Рендеринг корзины
function renderCart() {
    try {
        const cart = getCart();
        const cartItemsContainer = document.getElementById('cartItems');
        const cartEmpty = document.getElementById('cartEmpty');
        const cartSummary = document.getElementById('cartSummary');
        
        if (!cartItemsContainer || !cartEmpty || !cartSummary) {
            console.error('Не найдены элементы корзины');
            return;
        }
        
        console.log('Рендеринг корзины, товаров:', cart.length);
        
        if (cart.length === 0) {
            // Показываем пустое состояние
            cartEmpty.style.display = 'block';
            cartSummary.style.display = 'none';
            
            // Удаляем все товары из DOM
            const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
            existingItems.forEach(item => item.remove());
            
            console.log('Корзина пуста, показано пустое состояние');
            return;
        }
        
        // Скрываем пустое состояние, показываем итоги
        cartEmpty.style.display = 'none';
        cartSummary.style.display = 'block';
        
        // Полностью очищаем контейнер от всех товаров
        const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
        console.log('Удаление существующих элементов:', existingItems.length);
        existingItems.forEach(item => {
            item.remove();
        });
        
        // Рендеринг товаров сразу после очистки
        cart.forEach(item => {
            try {
                const cartItem = createCartItemElement(item);
                cartItemsContainer.insertBefore(cartItem, cartEmpty);
            } catch (error) {
                console.error('Ошибка при создании элемента корзины:', error, item);
            }
        });
        
        // Обновление итогов
        updateCartSummary(cart);
        console.log('Корзина перерисована, товаров:', cart.length);
        
    } catch (error) {
        console.error('Ошибка при рендеринге корзины:', error);
    }
}

// Создание элемента товара в корзине
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.setAttribute('data-product-id', item.id);
    
    // Парсинг цены (удаляем все символы кроме цифр и точки)
    const priceStr = item.price.toString().replace(/[^\d.]/g, '').replace(',', '.');
    const price = parseFloat(priceStr) || 0;
    const total = price * item.quantity;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-info">
            <h3 class="cart-item-title">${item.title}</h3>
            <div class="cart-item-price">${item.price}</div>
            <div style="color: var(--light-gray); margin-top: 0.5rem;">
                Итого: <span style="color: var(--crimson); font-weight: 700;">${total.toLocaleString('ru-RU')} ₽</span>
            </div>
        </div>
        <div class="cart-item-actions">
            <div class="cart-item-quantity">
                <button class="quantity-button quantity-decrease" data-product-id="${item.id}" type="button">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                       data-product-id="${item.id}">
                <button class="quantity-button quantity-increase" data-product-id="${item.id}" type="button">+</button>
            </div>
            <button class="cart-item-remove" data-product-id="${item.id}" type="button">
                Удалить
            </button>
        </div>
    `;
    
    // Добавляем обработчики событий
    const decreaseBtn = div.querySelector('.quantity-decrease');
    const increaseBtn = div.querySelector('.quantity-increase');
    const quantityInput = div.querySelector('.quantity-input');
    const removeBtn = div.querySelector('.cart-item-remove');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newQuantity = Math.max(1, item.quantity - 1);
            updateQuantity(item.id, newQuantity);
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            updateQuantity(item.id, item.quantity + 1);
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('change', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newQuantity = parseInt(e.target.value) || 1;
            updateQuantity(item.id, Math.max(1, newQuantity));
        });
        
        quantityInput.addEventListener('blur', (e) => {
            const newQuantity = parseInt(e.target.value) || 1;
            if (newQuantity < 1) {
                e.target.value = 1;
                updateQuantity(item.id, 1);
            }
        });
        
        quantityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newQuantity = parseInt(e.target.value) || 1;
                updateQuantity(item.id, Math.max(1, newQuantity));
            }
        });
    }
    
    if (removeBtn) {
        // Сохраняем ID товара для использования в обработчике
        const productIdToRemove = item.id;
        
        removeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Клик по кнопке удаления, ID товара:', productIdToRemove);
            
            // Вызываем функцию удаления напрямую
            const cart = getCart();
            const filteredCart = cart.filter(cartItem => cartItem.id !== productIdToRemove);
            
            // Сохраняем обновленную корзину
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            
            // Обновляем бейдж
            updateCartBadge();
            
            // Показываем уведомление
            const removedItem = cart.find(cartItem => cartItem.id === productIdToRemove);
            if (removedItem && typeof window.showNotification === 'function') {
                window.showNotification(`Товар "${removedItem.title}" удален из корзины`);
            }
            
            // Перерисовываем корзину
            renderCart();
        });
    }
    
    return div;
}

// Обновление итоговой информации
function updateCartSummary(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => {
        // Парсинг цены (удаляем все символы кроме цифр и точки)
        const priceStr = item.price.toString().replace(/[^\d.]/g, '').replace(',', '.');
        const price = parseFloat(priceStr) || 0;
        return sum + (price * item.quantity);
    }, 0);
    
    // Скидка 5% при покупке от 3 товаров
    const discount = totalItems >= 3 ? subtotal * 0.05 : 0;
    const total = subtotal - discount;
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('subtotal').textContent = subtotal.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('discount').textContent = discount.toLocaleString('ru-RU') + ' ₽';
    document.getElementById('total').textContent = total.toLocaleString('ru-RU') + ' ₽';
}

// Оформление заказа
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        if (typeof window.showNotification === 'function') {
            window.showNotification('Корзина пуста!');
        } else {
            alert('Корзина пуста!');
        }
        return;
    }
    
    // Подтверждение заказа
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => {
        const priceStr = item.price.toString().replace(/[^\d.]/g, '').replace(',', '.');
        const price = parseFloat(priceStr) || 0;
        return sum + (price * item.quantity);
    }, 0);
    const discount = totalItems >= 3 ? subtotal * 0.05 : 0;
    const total = subtotal - discount;
    
    const confirmMessage = `Оформить заказ?\n\nТоваров: ${totalItems}\nСумма: ${subtotal.toLocaleString('ru-RU')} ₽\nСкидка: ${discount.toLocaleString('ru-RU')} ₽\nК оплате: ${total.toLocaleString('ru-RU')} ₽`;
    
    if (confirm(confirmMessage)) {
        // Имитация оформления заказа
        if (typeof window.showNotification === 'function') {
            window.showNotification('Заказ успешно оформлен! Спасибо за покупку!');
        } else {
            alert('Заказ успешно оформлен! Спасибо за покупку!');
        }
        
        // Очистка корзины после оформления
        clearCart();
    }
}

// Инициализация страницы корзины
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartBadge();
    
    // Делегирование событий для кнопок удаления (работает даже после перерисовки)
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            // Обработка кнопки удаления
            const removeBtn = e.target.closest('.cart-item-remove');
            if (removeBtn) {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = removeBtn.getAttribute('data-product-id');
                console.log('Делегирование: удаление товара', productId);
                
                if (productId) {
                    if (typeof window.removeFromCart === 'function') {
                        window.removeFromCart(productId);
                    } else {
                        console.error('window.removeFromCart не найдена');
                    }
                }
            }
        });
    }
    
    // Обработка кнопки оформления заказа
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            checkout();
        });
    }
    
    // Обработка кнопки "Продолжить покупки"
    const continueShopping = document.querySelector('.continue-shopping');
    if (continueShopping) {
        continueShopping.addEventListener('click', (e) => {
            // Ссылка работает нормально, но можно добавить дополнительную логику
        });
    }
    
    // Обработка кнопки "Перейти в каталог" в пустой корзине
    const goToCatalogBtn = document.querySelector('.cart-empty .cta-button');
    if (goToCatalogBtn) {
        goToCatalogBtn.addEventListener('click', (e) => {
            // Ссылка работает нормально
        });
    }
});

// Экспорт функций для использования в других файлах
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.getCart = getCart;
window.updateCartBadge = updateCartBadge;
window.renderCart = renderCart;
window.checkout = checkout;

