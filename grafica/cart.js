var Cart = (function () {
  var KEY = 'saga_cesta';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function add(item) {
    var items = getAll();
    for (var i = 0; i < items.length; i++) {
      if (items[i].code === item.code) {
        items[i].qty = item.qty || 10;
        items[i].name = item.name;
        items[i].img = item.img;
        save(items);
        return items;
      }
    }
    items.push({ code: item.code, name: item.name, img: item.img, qty: item.qty || 10 });
    save(items);
    return items;
  }

  function remove(code) {
    var items = getAll().filter(function (i) { return i.code !== code; });
    save(items);
    return items;
  }

  function updateQty(code, qty) {
    var items = getAll();
    for (var i = 0; i < items.length; i++) {
      if (items[i].code === code) { items[i].qty = qty; break; }
    }
    save(items);
  }

  function clear() { localStorage.removeItem(KEY); }

  return { getAll: getAll, add: add, remove: remove, updateQty: updateQty, clear: clear };
})();
