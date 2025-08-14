/* cart.js – localStorage cart */
(function(){
  const KEY = 'fluxcart.cart.v1';
  const state = { items: JSON.parse(localStorage.getItem(KEY) || '[]') };

  function save(){ localStorage.setItem(KEY, JSON.stringify(state.items)); emit('cart:change', state.items); }

  window.cart = {
    add(prod){
      const found = state.items.find(i=>i.id===prod.id);
      if(found){ found.qty += 1; } else { state.items.push({ id: prod.id, name: prod.title || prod.name, price: prod.price, qty: 1 }); }
      save();
    },
    dec(id){ const it = state.items.find(i=>i.id===id); if(!it) return; it.qty=Math.max(0,it.qty-1); if(it.qty===0) this.remove(id); else save(); },
    inc(id){ const it = state.items.find(i=>i.id===id); if(!it) return; it.qty+=1; save(); },
    remove(id){ const idx = state.items.findIndex(i=>i.id===id); if(idx>-1){ state.items.splice(idx,1); save(); } },
    clear(){ state.items = []; save(); },
    get items(){ return state.items; },
    get total(){ return state.items.reduce((s,i)=>s + i.price * i.qty, 0); }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const dlg = $('#cartDialog');
    const btn = $('#cartBtn');
    const closeBtn = $('#closeCart');
    const clearBtn = $('#clearCart');
    const checkout = $('#checkout');
    const itemsEl = $('#cartItems');
    const totalEl = $('#cartTotal');
    const countEl = $('#cartCount');

    function render(){
      itemsEl.innerHTML = cart.items.length ? '' : '<p>Your cart is empty.</p>';
      cart.items.forEach(i=>{
        const row = document.createElement('div');
        row.className = 'row between';
        row.innerHTML = `<div>${i.name} × 
            <span class="qty">
              <button aria-label="Decrease" data-act="dec" data-id="${i.id}">−</button>
              <span>${i.qty}</span>
              <button aria-label="Increase" data-act="inc" data-id="${i.id}">+</button>
            </span>
          </div>
          <div>${formatINR(i.price*i.qty)}</div>`;
        itemsEl.appendChild(row);
      });
      totalEl.textContent = formatINR(cart.total);
      countEl.textContent = cart.items.reduce((s,i)=>s+i.qty,0);
    }

    itemsEl.addEventListener('click', (e)=>{
      const t = e.target;
      const id = Number(t.getAttribute('data-id'));
      const act = t.getAttribute('data-act');
      if(!id || !act) return;
      if(act==='dec') cart.dec(id);
      if(act==='inc') cart.inc(id);
    });

    on('cart:change', render);
    render();

    btn.addEventListener('click', ()=> dlg.showModal());
    closeBtn.addEventListener('click', ()=> dlg.close());
    clearBtn.addEventListener('click', ()=> cart.clear());
    checkout.addEventListener('click', ()=> alert('Demo checkout — integrate a real gateway later.'));
  });
})();
