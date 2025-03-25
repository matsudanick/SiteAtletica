let carrinho = [];

const cartButton = document.getElementById('cart-button');
const cartSidebar = document.getElementById('carrinho');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');

function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}

cartButton.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
overlay.addEventListener('click', toggleCart);


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrinho.length;
}

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    updateCartCount();
    
    const notification = document.createElement('div');
    notification.textContent = 'Produto adicionado ao carrinho!';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #8B5CF6;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        animation: slideIn 0.3s ease-out;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        z-index: 1000;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    
    itensCarrinho.innerHTML = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrinho';
        itemElement.innerHTML = `
            <span>${item.nome}</span>
            <span>
                R$ ${item.preco.toFixed(2)}
                <button onclick="removerDoCarrinho(${index})" style="
                    background: none;
                    border: none;
                    color: #8B5CF6;
                    cursor: pointer;
                    padding: 0 0.5rem;
                    font-size: 1.2rem;
                    transition: color 0.3s ease;
                "><i class="fas fa-times"></i></button>
            </span>
        `;
        itensCarrinho.appendChild(itemElement);
        total += item.preco;
    });
    
    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
    updateCartCount();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nObrigado por comprar na Atlética TI!`);
    carrinho = [];
    atualizarCarrinho();
    updateCartCount();
    toggleCart();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.produto').forEach(produto => {
    produto.style.opacity = '0';
    produto.style.transform = 'translateY(20px)';
    produto.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(produto);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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


updateCartCount();