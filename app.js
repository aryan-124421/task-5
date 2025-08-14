<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#0ea5e9" />
  <title>FluxCart — API Driven Shop</title>

  <!-- Fonts & preconnects -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="styles.css">

  <!-- PWA manifest + icon -->
  <link rel="manifest" href="manifest.json">
  <link rel="icon" href="assets/icon-192.png">
</head>
<body>
  <header class="topbar" role="banner">
    <div class="container row between center">
      <a class="brand" href="/" aria-label="FluxCart Home">⚡ FluxCart</a>

      <form id="searchForm" role="search" class="search" autocomplete="off">
        <label class="sr-only" for="q">Search products</label>
        <input id="q" name="q" type="search" placeholder="Search… (e.g., bag, watch)" inputmode="search">
      </form>

      <nav aria-label="Primary">
        <button id="cartBtn" class="cart-btn" aria-haspopup="dialog" aria-controls="cartDialog" aria-label="Open cart">
          🛒 <span id="cartCount" class="badge" aria-live="polite">0</span>
        </button>
      </nav>
    </div>
  </header>

  <main class="container" id="main">
    <section class="hero">
      <div class="hero-text">
        <h1>“Shop Smarter. Shop Real.”.</h1>
        <p>“Fresh products updated live from trusted APIs. Your next favorite item is just a click away.</p>
        <p>“Shop the Future.”</p>
        <div class="row gap">
          <button id="reload" class="btn">↻ Reload</button>
          <a href="#" class="btn ghost" id="perfLink">Performance Checklist</a>
        </div>
      </div>
    </section>

    <section class="controls" aria-label="Filters and sorting">
      <div class="row wrap gap">
        <select id="categoryFilter" aria-label="Filter by category">
          <option value="all">All Categories</option>
        </select>

        <select id="sortBy" aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>

        <select id="sourceSel" aria-label="Data source">
          <option value="fakestore">FakeStoreAPI</option>
          <option value="dummyjson">DummyJSON</option>
        </select>
      </div>
    </section>

    <section id="productGrid" class="grid" aria-live="polite" aria-busy="true"></section>
  </main>

  <!-- Cart dialog -->
  <dialog id="cartDialog" aria-labelledby="cartTitle">
    <h2 id="cartTitle">Your Cart</h2>
    <div id="cartItems" class="cart-items"></div>
    <div class="row between center totals">
      <strong>Total:</strong> <span id="cartTotal">₹0</span>
    </div>
    <div class="row gap">
      <button id="clearCart" class="btn ghost">Clear</button>
      <button id="checkout" class="btn primary">Checkout</button>
      <button id="closeCart" class="btn">Close</button>
    </div>
  </dialog>

  <!-- Product detail dialog -->
  <dialog id="productDialog" aria-labelledby="productTitle">
    <button id="closeProduct" class="btn" style="float:right">✕</button>
    <div id="productBody"></div>
  </dialog>

  <footer class="footer">
    <div class="container row between wrap">
      <small>© <span id="year"></span> FluxCart</small>
      <small><a href="#" id="testMatrixLink">Testing Matrix</a> · <a href="#" id="buildGuideLink">Build & Optimize</a></small>
    </div>
  </footer>

  <!-- Scripts (deferred) -->
  <script defer src="utils.js"></script>
  <script defer src="cart.js"></script>
  <script defer src="app.js"></script>

  <script>
    // register SW (if available)
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(()=>{}));
    }
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>

  <noscript>Your browser must support JavaScript to use this app.</noscript>
</body>
</html>
