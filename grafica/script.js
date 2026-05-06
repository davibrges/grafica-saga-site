// Gallery thumbnail swap
function setMain(thumb, src) {
  document.getElementById('mainImg').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// Quantity controls
function changeQty(delta) {
  const input = document.getElementById('qty');
  if (!input) return;
  const min = parseInt(input.min) || 1;
  const val = parseInt(input.value) || min;
  input.value = Math.max(min, val + delta);
}

// Color selection
document.querySelectorAll('.color-circle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-circle').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const label = document.getElementById('selectedColor');
    if (label) label.textContent = btn.dataset.color;
  });
});

// Tab switcher
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('tab-active'));
  const content = document.getElementById('tab-' + name);
  if (content) content.classList.remove('hidden');
  event.currentTarget.classList.add('tab-active');
}

// Add to cart feedback
function addToCart() {
  const btn = document.querySelector('.btn-primary-cta');
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = '✓ Adicionado à Cesta!';
  btn.style.background = '#25D366';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    const count = document.querySelector('.cart-count');
    if (count) count.textContent = '1 item';
  }, 2000);
}
function updateCount() {
  var cart = JSON.parse(localStorage.getItem('carrinho_produto'));
  var countEl = document.querySelector('.cart-count');

  if (!countEl) return;

  if (cart && cart.qty) {
    countEl.textContent = cart.qty + ' itens';
  } else {
    countEl.textContent = '0 itens';
  }
}