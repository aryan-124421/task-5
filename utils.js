/* utils.js – helpers */
(function () {
  window.$ = (sel, root=document) => root.querySelector(sel);
  window.$$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  window.formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  window.debounce = function(fn, delay=250){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(null,args), delay); }; };
  const events = {};
  window.on = (e, fn) => ((events[e] = events[e] || []).push(fn));
  window.emit = (e, data) => (events[e] || []).forEach(fn => fn(data));
})();
