import { products, faqs } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initHeroAnimations();
    initNavbarScroll();
    initProducts();
    initTabs();
    initFAQ();
    initCart();
});

function initHeroAnimations() {
    gsap.to('.hero-anim', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out",
        delay: 0.5
    });
}

function initNavbarScroll() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/90', 'backdrop-blur-md', 'py-4', 'shadow-sm');
            nav.classList.remove('py-6');
        } else {
            nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'py-4', 'shadow-sm');
            nav.classList.add('py-6');
        }
    });
}

function initProducts() {
    const grid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const render = (category = 'Todos') => {
        const filtered = category === 'Todos' 
            ? products 
            : products.filter(p => p.category === category);

        grid.innerHTML = filtered.map(p => `
            <div class="product-card group" data-category="${p.category}">
                <div class="relative overflow-hidden mb-8 aspect-[4/5] bg-[#F9F9F9]">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                    <button class="add-to-cart absolute bottom-0 left-0 w-full bg-[#1A1A1A] text-white py-4 text-[9px] font-bold uppercase tracking-[0.3em] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        Adicionar à Sacola
                    </button>
                </div>
                <div class="space-y-2">
                    <span class="text-[9px] uppercase tracking-widest text-gray-400 font-bold">${p.category}</span>
                    <h4 class="font-serif text-2xl">${p.name}</h4>
                    <p class="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-4">${p.description}</p>
                    <p class="text-sm font-bold tracking-tight text-[var(--primary)]">${p.price}</p>
                </div>
            </div>
        `).join('');
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render(btn.dataset.category);
        });
    });

    render();
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
            

            if(window.innerWidth < 768) {
                document.getElementById('universo').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initFAQ() {
    const container = document.getElementById('faq-container');
    container.innerHTML = faqs.map(faq => `
        <div class="faq-item bg-white p-8 group cursor-pointer">
            <div class="flex justify-between items-center mb-0 transition-all duration-300">
                <h5 class="font-serif text-lg md:text-xl group-hover:text-[var(--primary)] transition-colors">${faq.question}</h5>
                <i data-lucide="plus" class="w-4 h-4 text-gray-300 group-hover:text-[var(--primary)]"></i>
            </div>
            <div class="max-h-0 overflow-hidden transition-all duration-500 opacity-0 mt-0">
                <p class="pt-6 text-sm text-gray-400 leading-relaxed font-light border-t border-black/5 mt-4">
                    ${faq.answer}
                </p>
            </div>
        </div>
    `).join('');

    lucide.createIcons();

    container.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('div:last-child');
            const icon = item.querySelector('i');
            const isOpen = content.classList.contains('opacity-100');
            
            if (isOpen) {
                content.style.maxHeight = '0';
                content.classList.remove('opacity-100');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = '200px';
                content.classList.add('opacity-100');
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });
}

let cartCount = 0;
function initCart() {
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            showToast("Produto adicionado à sua sacola.");
        }
    });
}

function showToast(msg) {
    const wrapper = document.getElementById('toast-wrapper');
    const toast = document.createElement('div');
    toast.className = 'toast-notification px-8 py-4 bg-white border-l-4 border-[var(--primary)] shadow-2xl pointer-events-auto flex items-center gap-4 transition-all duration-500 transform translate-x-full';
    toast.innerHTML = `
        <i data-lucide="check-circle-2" class="w-4 h-4 text-[var(--primary)]"></i>
        <span class="text-[10px] font-bold tracking-widest uppercase">${msg}</span>
    `;
    wrapper.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-[-20px]');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
