(function () {
  window.CATALOGO = [
    { nome: 'Agenda Executiva Personalizada', codigo: 'IMP-0001', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80',
      specs: [['Altura','21 cm'],['Largura','14 cm'],['Páginas','352']] },
    { nome: 'Caderno Capa Dura A5',           codigo: 'IMP-0002', img: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=120&q=80',
      specs: [['Altura','21 cm'],['Largura','14,8 cm'],['Páginas','198']] },
  ];

  function normalizar(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function itemHTML(p) {
    var data = encodeURIComponent(JSON.stringify(p));
    return '<div class="search-result-item" onclick="window._searchSelect(decodeURIComponent(\'' + data + '\'))">' +
      '<img class="search-result-thumb" src="' + p.img + '" alt="' + p.nome + '" />' +
      '<div class="search-result-info">' +
        '<span class="search-result-name">' + p.nome + '</span>' +
        '<span class="search-result-code">' + p.codigo + '</span>' +
      '</div></div>';
  }

  function buscar() {
    var input    = document.getElementById('searchInput');
    var dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    var q = normalizar(input.value.trim());
    if (!q) { dropdown.classList.remove('open'); dropdown.innerHTML = ''; return; }

    var exatos = CATALOGO.filter(function (p) {
      return normalizar(p.nome).includes(q) || normalizar(p.codigo).includes(q);
    });

    var possiveis = [];
    if (exatos.length === 0) {
      var palavras = q.split(/\s+/);
      possiveis = CATALOGO.filter(function (p) {
        var n = normalizar(p.nome), c = normalizar(p.codigo);
        return palavras.some(function (w) { return n.includes(w) || c.includes(w); });
      });
    }

    dropdown.innerHTML = '';
    if (exatos.length > 0) {
      dropdown.innerHTML += '<div class="search-section-label">Resultados</div>';
      exatos.forEach(function (p) { dropdown.innerHTML += itemHTML(p); });
    } else if (possiveis.length > 0) {
      dropdown.innerHTML += '<div class="search-section-label">Possíveis produtos</div>';
      possiveis.forEach(function (p) { dropdown.innerHTML += itemHTML(p); });
    } else {
      dropdown.innerHTML = '<div class="search-no-results">Nenhum produto encontrado para "<strong>' + input.value + '</strong>".</div>';
    }
    dropdown.classList.add('open');
  }

  window._searchSelect = function (raw) {
    var p = JSON.parse(raw);
    document.getElementById('searchDropdown').classList.remove('open');
    document.getElementById('searchInput').value = '';
    if (typeof window.searchOnSelect === 'function') {
      window.searchOnSelect(p);
    } else {
      var base = window.SEARCH_PRODUCT_BASE || './product.html';
      location.href = base + '?id=' + p.codigo;
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('searchInput');
    var form  = input && input.closest('form');
    if (!input) return;

    input.addEventListener('input', buscar);
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); buscar(); });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-wrapper')) {
        var d = document.getElementById('searchDropdown');
        if (d) d.classList.remove('open');
      }
    });
  });
})();
