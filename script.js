(function() { 
  "use strict";

  const dom = {
    views: { home: document.getElementById('home-view'), product: document.getElementById('product-page'), checkout: document.getElementById('checkout-view') },
    search: { input: document.getElementById('product-search'), container: document.getElementById('search-container'), clearBtn: document.getElementById('clear-search-btn') },
    cart: { bar: document.getElementById('cart-bar'), list: document.getElementById('cart-items'), total: document.getElementById('cart-total'), count: document.getElementById('cart-count'), toggleBtn: document.getElementById('cart-toggle-btn') },
    explain: { overlay: document.getElementById('explain-overlay'), text: document.getElementById('explain-text'), okBtn: document.getElementById('explain-ok-btn') },
    whyBuy: { overlay: document.getElementById('why-buy-overlay'), backBtn: document.getElementById('why-buy-back-btn') },
    checkout: { noteStep: document.getElementById('note-step'), receiptStep: document.getElementById('receipt-step'), noteText: document.getElementById('note-text'), noteOkBtn: document.getElementById('note-ok-btn'), copyReceiptBtn: document.getElementById('copy-receipt-btn'), nextBtn: document.getElementById('next-btn'), receiptText: document.getElementById('receipt-text'), receipts: { single: document.getElementById('receipt-single'), multi: document.getElementById('receipt-multi'), r1_item: document.getElementById('r1-item'), r1_plan: document.getElementById('r1-plan'), r1_duration: document.getElementById('r1-duration'), r1_price: document.getElementById('r1-price'), rm_itemList: document.getElementById('rm-item-list'), rm_total: document.getElementById('rm-total') } }
  };

  (function starfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; stars = Array.from({ length: Math.min(350, Math.floor((W * H) / 8000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + .4, s: Math.random() * .6 + .2, a: Math.random() * .6 + .4 })); }
    function draw() { ctx.clearRect(0, 0, W, H); for (const s of stars) { s.y += s.s; s.x += s.s * .15; if (s.y > H) s.y = -2; if (s.x > W) s.x = -2; const tw = s.a + Math.sin((s.x + s.y) * .01) * .25; ctx.globalAlpha = Math.max(.15, Math.min(1, tw)); ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = '#cfe9ff'; ctx.fill(); ctx.globalAlpha = tw * .25; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2); ctx.fillStyle = '#7fbfff'; ctx.fill(); } ctx.globalAlpha = 1; requestAnimationFrame(draw); }
    window.addEventListener('resize', resize); resize(); draw();
  })();

  const imageFor = { 
    "CapCut": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-C695-D25-1.png", 
    "AlightMotion": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9675-E38-1.png", 
    "Wink": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6373-C12.png", 
    "Meitu": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9460-A69.png", 
    "PicsArt": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-C2-C2-B1-B.png", 
    "Canva": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B7-E9-D62.png", 
    "VSCO": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A7-EE340.png", 
    "PhotoRoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9-A11032.png", 
    "Remini": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-CBAFAF8.png", 
    "NordVpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-FBC099.png", 
    "Express Vpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-7-D8-AC42-1.png", 
    "Surfshark Vpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B51-A628.png", 
    "Windows License": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-041-CB23.png", 
    "Microsoft 365": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A872-E8-C.png", 
    "Netflix": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-0-F69823.png", 
    "Disney+": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-FEB8336.png", 
    "HBO Max": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E7812-FA.png", 
    "Prime Video": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-8750-DEF.png", 
    "Spotify": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D73314-D.png", 
    "Apple Music": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-53-CD4-A0.png", 
    "Qobuz": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-953E931.png",
    "Google Drive": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-A43-DD6.png", 
    "Google One": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-009-BD4-E.png", 
    "iCloud": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-30-EDAEA.png", 
    "ChatGPT Plus": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6-CB3-A91-1.png", 
    "Gemini Veo 3": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-906-D5-F0.png", 
    "Grammarly AI": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-087-AC47.png", 
    "Zoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-5270010.png", 
    "YouTube": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-DCD6-D5.png", 
    "Tinder": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-DCDE0-B9.png", 
    "Telegram": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A162-FC1.png", 
    "Discord": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D060367.png",
    "Perplexity Ai": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-F59-EE5-A.png", 
    "GAGAOOLALA": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B18851-D.png", 
    "BSTATION": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-631-CC84.png", 
    "INSHOT": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-16-13-54-58-884.png", 
    "Duolingo Super": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E560-B70.png", 
    "SCRIBD": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-FA4502.png", 
    "WPS Office": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-49DAE75.png",
    "TradingView": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-02-36-751.png",
    "TeraBox": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-01-52-861.png",
    "PlaySafeCard": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-478-B983.png",
    "TikTok Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B93-FC6-C.png",
    "TikTok Non Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B93-FC6-C.png",
    "Facebook Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-10387-D3.png",
    "Telegram Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-ED17968.png",
    "YouTube Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-87-A43-F1.png",
    "Facebook Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-10387-D3.png",
    "Instagram Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-01-CA830.png",
    "Custom Website Service": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-26-17-49-23-686.png",
    "LightRoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-75A8C0F.png",
    "Wattpad": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_DF63C42_.png",
    "Photoshop": "https://ik.imagekit.io/dkdlgynlu/Photoshop%20_83C7623_.png",
    "Adobe Creative Cloud": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_3DECB4E_.png?updatedAt=1766482936190",
    "HMA VPN": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A5A675F_.png?updatedAt=1766482936062",
    "Crunchyroll": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A70E5F8_.png",
    "Telegram Star": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_AEF396E_.png",
    "Google Play Gift Card": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_E847DAF_.png?updatedAt=1767023159606"
  };

  const productData = { 
    "UAB Pay Top Up": { "Transfer": [{ duration: "10,000 Transfer", price: "10,200 Kyats" }] },
    "CapCut": { Share: [{ duration: "1 Month", price: "8,000 Kyats" }], Private: [{ duration: "7 Days", price: "4,000 Kyats" }, { duration: "1 Month", price: "13,000 Kyats" }], "Private Own Mail": [{ duration: "7 Days", price: "6,000 Kyats" }, { duration: "1 Month", price: "17,000 Kyats" }] }, 
    "AlightMotion": { Share: [{ duration: "9 Months", price: "3,500 Kyats" }, { duration: "1 Year", price: "5,000 Kyats" }], Private: [{ duration: "9 Months", price: "5,500 Kyats" }, { duration: "1 Year", price: "7,000 Kyats" }], "Private (Own Mail)": [{ duration: "9 Months", price: "7,500 Kyats" }, { duration: "1 Year", price: "9,000 Kyats" }] }, 
    "Canva": { "Pro Share": [{ duration: "1 Month", price: "2,500 Kyats" }], "Educational(Invite)": [{ duration: "Lifetime", price: "5,000 Kyats" }], "Pro Private": [{ duration: "1 Month", price: "7,000 Kyats" }, { duration: "3 Months", price: "20,000 Kyats" }] }
    // ... remaining productData items ...
  };

  const generalDetailsBlock = `\n\nPayment Methods:\n✅ KBZPay\n✅ WavePay\n✅ CBPay\n✅ UABPay\n✅ AYAPay\n\nAll above methods use this same number:\n09950004440\n(Name: Thet Paing Soe)\n\nWATCH OUT FOR SCAMMER!!`;

  const moreDetailsByProduct = { 
    "UAB Pay Top Up": `(KPay-WavePay-AyaPay-CbPay-YomaPay-OKpay-A+wallet-Trustypay-CTZpay) to Uabpay ငွေလဲနိုင်ပါတယ်။\n\nလက်ခံမယ့်ဖုန်းနံပါတ် နဲ အကောင့် Name ကို တခါထဲ တွဲပို့ပေးပါ။  \n\n 09950004440 ဒီဖုန်း တလုံးသာ အသုံးပြုပါသည်။ တခြား ဖုန်း လုံးဝ မသုံးပါ။`,
    "CapCut": `Share\nOne device only\nဖုန်းတလုံးပဲသုံးလို့ရပါတယ် Android & iOS\n• Sharing အကောင့်တေက Pro ပြုတ်တယ်ပါတယ်။\nDevice limit ကျော်သုံးရင်တခြားလူနဲ့ Shareသုံးရတာမလို့ဖြစ်လာရင်ဘယ်သူလုပ်လဲမသိရတာမလို့ warranty 15ရက်ပဲ ပေးပါတယ်။\n(we fully renew if Pro stops)\n\nPrivate\n2 devices max. Full warranty for the entire plan duration.\n\nPrivate Own Mail\n2 devices max. Full warranty for the entire plan duration.` + generalDetailsBlock
    // ... remaining moreDetailsByProduct items ...
  };
    
  const deviceSupport = { "UAB Pay Top Up": ["android", "ios"], "CapCut": ["android", "ios", "pc"] };
  const deviceIconMap = { "android": '<i class="fa-brands fa-android"></i>', "ios": '<i class="fa-brands fa-apple"></i>', "pc": '<i class="fa-solid fa-desktop"></i>', "tv": '<i class="fa-solid fa-tv"></i>' };
    
  let cart = [], lastScroll = 0, lastViewBeforeCheckout = 'home', productCards = []; 
  const escapeHTML = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  const parseKyats = t => { const m = (t || "").replace(/,/g, "").replace(/Ks/g, "").replace(/≈/g, "").trim().match(/(\d+(\.\d+)?)/); return m ? Number(m[1]) : null; }; 
  const formatKyats = n => (n || 0).toLocaleString("en-US") + " Kyats";
  const cartKey = ({ product, section, duration, priceText }) => [product, section, duration, priceText].join("|");

  function renderCart() { if (!cart.length) { dom.cart.bar.style.display = "none"; document.body.style.paddingBottom = "0"; return; } dom.cart.bar.style.display = "block"; dom.cart.list.innerHTML = cart.map(i => `<div class="cart-item"><div class="meta"><span class="title">${escapeHTML(i.product)} • ${escapeHTML(i.section)}</span><span class="sub">${escapeHTML(i.duration)} • ${escapeHTML(i.priceText)}</span></div><div class="subtotal">${formatKyats(i.unitPrice * i.qty)}</div><button class="remove-btn" data-cart-key="${escapeHTML(cartKey(i))}">×</button></div>`).join(""); const total = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0); dom.cart.total.textContent = formatKyats(total); dom.cart.count.textContent = String(cart.reduce((s, i) => s + i.qty, 0)); requestAnimationFrame(() => { let h = dom.cart.bar.classList.contains('collapsed') ? 60 : dom.cart.bar.offsetHeight; document.body.style.paddingBottom = h + "px"; }); }
  function showView(v) { Object.values(dom.views).forEach(x => x.classList.remove('active')); if (dom.views[v]) dom.views[v].classList.add('active'); dom.search.container.style.display = v === 'home' ? 'flex' : 'none'; if (v !== 'home') { dom.search.input.value = ''; filterProducts(''); } }
  function filterProducts(q) { q = q.toLowerCase().trim(); dom.search.clearBtn.style.display = q.length > 0 ? 'block' : 'none'; dom.views.home.classList.toggle('is-searching', q.length > 0); productCards.forEach(c => { const n = c.dataset.productName.toLowerCase(); if (q === '' || n.includes(q)) c.classList.add('search-match'); else c.classList.remove('search-match'); }); }
  
  const popularList = ["CapCut", "Canva", "Telegram", "Express Vpn", "Google Drive", "TeraBox", "Gemini Veo 3", "ChatGPT Plus", "TikTok Official", "Facebook Official", "UAB Pay Top Up"];

  function renderPopular(id, exc) { const cont = document.getElementById(id); if (!cont) return; const items = popularList.filter(n => exc ? n !== exc : true); const track = document.createElement("div"); track.className = "pop-track"; track.innerHTML = items.map(n => `<div class="pop-card" data-product-name="${escapeHTML(n)}"><img src="${imageFor[n] || ''}" alt="${escapeHTML(n)}"><p>${escapeHTML(n)}</p></div>`).join("").repeat(3); cont.innerHTML = ""; cont.appendChild(track); enableAutoScroll(cont, track); }
  function enableAutoScroll(c, t) { const SPEED = 120; let single = t.scrollWidth / 3; c.scrollLeft = single; function tick() { c.scrollLeft += SPEED; if (c.scrollLeft >= single * 2) c.scrollLeft -= single; requestAnimationFrame(tick); } tick(); }

  function openProduct(name) { 
    lastScroll = window.scrollY; 
    const pdata = productData[name] || {}; 
    let sections = Object.entries(pdata).map(([sec, plans]) => {
      const rows = plans.map(p => { const unit = parseKyats(p.price); const item = { product: name, section: sec, duration: p.duration || "", unitPrice: unit, priceText: p.price || "" }; const key = cartKey(item); const qty = (cart.find(x => cartKey(x) === key)?.qty) || 0; return `<div class="plan-row"><span class="plan-left">${escapeHTML(p.duration)}</span><span class="plan-price">${escapeHTML(p.price)}</span><span class="plan-qty">${unit == null || p.price === "Out of stock" ? '' : `<span class="qty"><button class="qty-btn" data-action="dec" data-item='${JSON.stringify(item)}'>−</button><span class="qty-val" data-item-key="${escapeHTML(key)}">${qty}</span><button class="qty-btn" data-action="inc" data-item='${JSON.stringify(item)}'>+</button></span>`}</span></div>`; }).join("");
      return `<div class="plan-box"><div class="plan-title">${sec}</div><div class="plan-rows">${rows}</div></div>`;
    }).join("");
    dom.views.product.innerHTML = `<button class="back-btn" id="product-back-btn">← Back</button><div class="product-hero"><div class="hero-img-wrap"><img src="${imageFor[name] || ''}" alt="${escapeHTML(name)}" /></div><div class="hero-title">${escapeHTML(name)}</div><div class="button-container"><button class="btn btn-outline hero-more" data-product-name="${escapeHTML(name)}">More Details</button></div></div>${sections}<section class="popular-section"><div class="popular-head"><h2 class="popular-title">Popular</h2><div class="popular-underline"></div></div><div class="pop-scroller" id="popular-product"></div></section>`;
    renderPopular("popular-product", name); showView('product'); window.scrollTo(0, 0); 
  }

  dom.search.input.addEventListener('input', e => { if (dom.views.home.classList.contains('active')) filterProducts(e.target.value); });
  document.addEventListener('DOMContentLoaded', () => { productCards = Array.from(dom.views.home.querySelectorAll('.card[data-product-name]')); renderPopular("popular-home"); });
  document.body.addEventListener('click', e => {
    const t = e.target, card = t.closest('[data-product-name]');
    if (card && (card.classList.contains('card') || card.classList.contains('pop-card'))) { openProduct(card.dataset.productName); return; }
    if (t.id === 'product-back-btn') { showView('home'); window.scrollTo(0, lastScroll); return; }
    if (t.closest('.hero-more')) { const n = t.closest('.hero-more').dataset.productName; dom.explain.text.innerText = moreDetailsByProduct[n] || "Coming soon."; dom.explain.overlay.style.display = "grid"; return; }
    if (t.closest('#explain-ok-btn')) { dom.explain.overlay.style.display = "none"; return; }
  });
})();
