// Sample products
const products = [
    { id: 1, name: "Dog Food", price: 25, image: "images/dog_food.png" },
    { id: 2, name: "Cat Toy", price: 10, image: "images/cat_toy.png" },
    { id: 3, name: "Bird Cage", price: 50, image: "images/bird_cage.png" },
    { id: 4, name: "Pet Bed", price: 40, image: "images/pet_bed.png" },
];

// Sample services
const services = [
    { 
        id: 1, 
        name: "Pet Grooming", 
        price: 45, 
        icon: "✂️", 
        description: "Professional grooming services to keep your pet looking and feeling great" 
    },
    { 
        id: 2, 
        name: "Pet Training", 
        price: 60, 
        icon: "🎓", 
        description: "Expert training sessions to help your pet learn new skills and behaviors" 
    },
    { 
        id: 3, 
        name: "Pet Boarding", 
        price: 35, 
        icon: "🏠", 
        description: "Safe and comfortable boarding facilities for when you're away" 
    },
    { 
        id: 4, 
        name: "Veterinary Care", 
        price: 80, 
        icon: "🩺", 
        description: "Comprehensive health check-ups and medical care for your pets" 
    },
    { 
        id: 5, 
        name: "Pet Walking", 
        price: 20, 
        icon: "🚶", 
        description: "Regular walking services to keep your pet active and healthy" 
    },
    { 
        id: 6, 
        name: "Pet Sitting", 
        price: 30, 
        icon: "👨‍👩‍👧", 
        description: "In-home pet sitting services for personalized care and attention" 
    },
];

// Cart array
let cart = [];

// DOM elements
const productList = document.getElementById('product-list');
const servicesList = document.getElementById('services-list');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartEmpty = document.getElementById('cart-empty');
const checkoutBtn = document.getElementById('checkout-btn');

// Load services with staggered animation
services.forEach((service, index) => {
    setTimeout(() => {
        const serviceEl = document.createElement('div');
        serviceEl.classList.add('service');
        serviceEl.style.animationDelay = `${index * 0.1}s`;
        serviceEl.innerHTML = `
            <span class="service-icon">${service.icon}</span>
            <h3>${service.name}</h3>
            <p class="service-description">${service.description}</p>
            <p class="service-price">$${service.price}</p>
            <button onclick="bookService(${service.id}, event)">Book Now</button>
        `;
        servicesList.appendChild(serviceEl);
    }, index * 100);
});

// Load products with staggered animation
products.forEach((product, index) => {
    setTimeout(() => {
        const productEl = document.createElement('div');
        productEl.classList.add('product');
        productEl.style.animationDelay = `${index * 0.1}s`;
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productEl);
    }, index * 100);
});

// Book service function
function bookService(id, event) {
    const service = services.find(s => s.id === id);
    if (service) {
        // Add visual feedback to the button
        const button = event ? event.target : null;
        if (button) {
            const originalText = button.textContent;
            button.textContent = '✓ Booked!';
            button.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
        }
        
        showNotification(`${service.name} service booked! We'll contact you soon.`);
    }
}

// Add to cart function with animation
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    // Animate cart button with bounce
    cartBtn.style.animation = 'none';
    setTimeout(() => {
        cartBtn.style.animation = 'bounce 0.5s ease-out';
    }, 10);
    
    setTimeout(() => {
        cartBtn.style.animation = '';
    }, 500);

    updateCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Update cart UI
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartEmpty.classList.add('show');
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
    } else {
        cartEmpty.classList.remove('show');
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.style.animationDelay = `${index * 0.05}s`;
            li.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">Quantity: ${item.quantity} × $${item.price}</div>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            `;
            cartItems.appendChild(li);
        });
    }

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Show/hide cart modal with smooth transitions
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    cartBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
    cartBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        cartBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.classList.contains('active')) {
        cartModal.classList.remove('active');
        cartBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Checkout button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\n\nTotal: $${total.toFixed(2)}\n\nYour order has been placed.`);
    cart = [];
    updateCart();
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);
