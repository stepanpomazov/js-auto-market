const mainGrid = document.querySelector('.grid');
const searchField = document.querySelector('.search');
const cartIcon = document.querySelector('.cart-icon');
const cartContainer = document.querySelector('.cart-container');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceEl = document.querySelector('.total-price');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const cartCount = document.querySelector('.cart-count');  // Элемент для отображения количества товаров в корзине
const countdownElement = document.getElementById('countdown');


let countdownDate = new Date().getTime() + 3600 * 1000; // 1 час от текущего времени (измените по необходимости)

// Функция обновления таймера
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = countdownDate - now;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = 'Акция закончилась!';
    } else {
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        countdownElement.textContent = `${hours}ч ${minutes}м ${seconds}с`;
    }
}, 1000);
let cart = [];

const store = [
  {
    id: '1243545712',
    img: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Land rover sport+',
    description: 'Очень большая машина',
    price: 100000,
  },
  {
    id: '213324234',
    img: 'https://images.unsplash.com/photo-1486326658981-ed68abe5868e?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Dodge RAM',
    description: 'Очень большая машина',
    price: 200000,
  },

  {
    id: '34322341',
    img: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Бусик',
    description: 'Семейная машина',
    price: 25000,
  },

  {
    id: '67543кек',
    img: 'https://plus.unsplash.com/premium_photo-1683134240084-ba074973f75e?q=80&w=2795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'F1',
    description: 'Гоночный боллид',
    price: 1200000,
  },

  {
    id: '423ти4ро234',
    img: 'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'ВАЗ',
    description: 'Для рабалки',
    price: 3000,
  },

  {
    id: '243лти534шр634',
    img: 'https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'БМВ',
    description: 'Машина',
    price: 45000,
  },
];

// Функция для рендеринга товаров
function renderAll() {
    mainGrid.innerHTML = ''; // Очищаем grid перед рендером
    store.filter(item => !cart.some(cartItem => cartItem.id === item.id))
        .forEach(item => new Card(item.id, item.img, item.name, item.description, item.price).render());
}

// Класс для карточки товара
class Card {
    constructor(id, img, name, description, price) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    addToCart(cardElement) {
      // Проверяем, не добавлен ли товар уже в корзину
      const existingItem = cart.find(item => item.id === this.id);
      if (!existingItem) {
          cart.push({
              id: this.id,
              img: this.img,
              name: this.name,
              price: this.price,
              quantity: 1,
          });
          this.animateToCart(cardElement);
          cartContainer.classList.add('show-cart');  // Открываем корзину
      }
      updateCart();
  }
  

    animateToCart(cardElement) {
        // Получаем позицию и размеры карточки товара
        const rect = cardElement.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        const clonedCard = cardElement.cloneNode(true);
        clonedCard.style.position = 'absolute';
        clonedCard.style.left = `${rect.left}px`;
        clonedCard.style.top = `${rect.top}px`;
        clonedCard.style.width = `${rect.width}px`;
        clonedCard.style.transition = 'all 0.7s ease-in-out';
        document.body.appendChild(clonedCard);

        setTimeout(() => {
            clonedCard.style.left = `${cartRect.left}px`;
            clonedCard.style.top = `${cartRect.top}px`;
            clonedCard.style.width = '0px';
            clonedCard.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            clonedCard.remove();
        }, 700);

        cardElement.remove();
    }

    render() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="card_img" src="${this.img}" alt="${this.name}">
            <div class="card_info">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
            </div>
            <div class="card_control">
                <button class="btn">Купить</button>
            </div>
        `;
        mainGrid.append(card);

        card.querySelector('.btn').addEventListener('click', () => this.addToCart(card));
    }
}

// Функция для обновления корзины
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <p class="item-name">${item.name}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="remove-item">✖</button>
        `;
        cartItemsContainer.append(cartItem);

        // Обработчик на удаление товара из корзины
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem.id !== item.id);
            updateCart();
            renderAll(); // Восстановить товар в списке товаров
        });
    });

    totalPriceEl.textContent = `$${totalPrice}`;
    cartCount.textContent = cart.length;  // Обновляем количество товаров в корзине
}

// Клик по иконке корзины — открыть/закрыть корзину
cartIcon.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart');
});
document.addEventListener('click', (event) => {
  if (!cartContainer.contains(event.target) && !cartIcon.contains(event.target)) {
          cartContainer.classList.remove('show-cart');
  }
});

// Очистить корзину
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
    renderAll(); // Обновить товары, показывая все товары снова
});

// Функция поиска товаров по введенному запросу
searchField.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    mainGrid.innerHTML = ''; // Очищаем grid перед рендером
    store.filter(item => item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm))
        .forEach(item => new Card(item.id, item.img, item.name, item.description, item.price).render());
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderAll();
});
