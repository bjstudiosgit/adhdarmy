(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const M="/assets/black-adhd-army-tshirt-uSr9c5RT.png",x="/assets/pink-adhd-army-tshirt-C6Rbugkq.png",D="/assets/signed-adhd-army-tshirt-C0kJF00f.png",m=[{id:"unisex",name:"Tymeless T-Shirt",price:19.99,tags:["Limited drop of 100","Black or pink"],sizes:["XS","S","M","L","XL","2XL","3XL"],colours:[{name:"Black",value:"black",image:M,swatch:"#080808"},{name:"Pink",value:"pink",image:x,swatch:"#f68fb4"}]},{id:"signed",name:"Signed T-Shirt",price:25.99,tags:["Signed design","Includes signed photo"],sizes:["XS","S","M","L","XL","2XL","3XL"],colours:[{name:"Pink",value:"pink",image:D,swatch:"#f68fb4"}]}],i={sort:"featured",cart:[],discountRate:0},d=document.querySelector("[data-products]"),P=document.querySelector("[data-sort]"),p=document.querySelector("[data-cart]"),$=document.querySelector("[data-cart-backdrop]"),v=document.querySelector("[data-cart-items]"),R=document.querySelector("[data-cart-count]"),A=document.querySelector("[data-subtotal]"),B=document.querySelector("[data-discount]"),I=document.querySelector("[data-total]"),b=document.querySelector("[data-promo-form]"),w=b.querySelector("input"),g=document.querySelector("[data-promo-message]"),h=document.querySelector("[data-toast]"),c=new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:2,maximumFractionDigits:2});function S(){window.lucide&&window.lucide.createIcons()}function L(t,a){return t.colours.find(o=>o.value===a)||t.colours[0]}function C(){d.innerHTML=m.map(t=>{const a=t.colours[0],o=t.sizes.map(s=>`<option value="${s}">${s}</option>`).join(""),r=t.colours.map(s=>`<option value="${s.value}">${s.name}</option>`).join(""),e=t.tags.map(s=>`<span class="tag">${s}</span>`).join(""),n=t.colours.map(s=>`<span class="swatch" style="background:${s.swatch}" aria-hidden="true"></span>`).join("");return`
        <article class="product-card">
          <figure>
            <img data-product-image="${t.id}" src="${a.image}" alt="${t.name} ADHD ARMY product photo" loading="lazy">
          </figure>
          <div class="product-info">
            <div class="product-top">
              <h3>${t.name}</h3>
              <span class="price">${c.format(t.price)}</span>
            </div>
            <div class="tag-row">${e}</div>
            <div class="swatches" aria-label="Available colours">${n}</div>
            <div class="product-controls">
              <label class="visually-hidden" for="size-${t.id}">Size for ${t.name}</label>
              <select id="size-${t.id}" data-size="${t.id}">
                ${o}
              </select>
              <label class="visually-hidden" for="colour-${t.id}">Colour for ${t.name}</label>
              <select id="colour-${t.id}" data-colour="${t.id}">
                ${r}
              </select>
              <button class="button button-primary add-button" type="button" data-add="${t.id}">
                <i data-lucide="shopping-bag" aria-hidden="true"></i>
                Add
              </button>
            </div>
          </div>
        </article>
      `}).join(""),S()}function N(t,a,o){return`${t}:${a}:${o}`}function O(t,a,o,r=1){const e=m.find(y=>y.id===t);if(!e)return;const n=a||e.sizes[0],s=L(e,o),f=N(t,n,s.value),k=i.cart.find(y=>y.key===f);k?k.quantity+=r:i.cart.push({key:f,id:t,size:n,colour:s.value,quantity:r}),u(),E(),l(`${e.name} in ${s.name} added to your cart.`)}function T(){const t=i.cart.reduce((e,n)=>{const s=m.find(f=>f.id===n.id);return e+s.price*n.quantity},0),a=i.cart.reduce((e,n)=>e+n.quantity,0)>=3?Math.round(t*.08):0,o=Math.round((t-a)*i.discountRate),r=a+o;return{subtotal:t,discount:r,total:Math.max(0,t-r)}}function u(){const t=i.cart.reduce((o,r)=>o+r.quantity,0);R.textContent=t,i.cart.length===0?v.innerHTML='<p class="empty-cart">Your cart is ready for the first tee.</p>':v.innerHTML=i.cart.map(o=>{const r=m.find(n=>n.id===o.id),e=L(r,o.colour);return`
          <article class="cart-line">
            <img src="${e.image}" alt="">
            <div>
              <h3>${r.name}</h3>
              <p>${e.name} / ${o.size} / ${c.format(r.price)}</p>
              <div class="qty-controls" aria-label="Quantity controls for ${r.name}">
                <button type="button" data-qty="${o.key}" data-direction="-1" aria-label="Decrease quantity">
                  <i data-lucide="minus" aria-hidden="true"></i>
                </button>
                <span>${o.quantity}</span>
                <button type="button" data-qty="${o.key}" data-direction="1" aria-label="Increase quantity">
                  <i data-lucide="plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <button class="remove-line" type="button" data-remove="${o.key}" aria-label="Remove ${r.name}">
              <i data-lucide="trash-2" aria-hidden="true"></i>
            </button>
          </article>
        `}).join("");const a=T();A.textContent=c.format(a.subtotal),B.textContent=`-${c.format(a.discount).replace("-","")}`,I.textContent=c.format(a.total),S()}function E(){p.classList.add("is-open"),p.setAttribute("aria-hidden","false"),$.hidden=!1,document.body.classList.add("cart-is-open")}function q(){p.classList.remove("is-open"),p.setAttribute("aria-hidden","true"),$.hidden=!0,document.body.classList.remove("cart-is-open")}function l(t){h.textContent=t,h.classList.add("is-visible"),window.clearTimeout(l.timer),l.timer=window.setTimeout(()=>h.classList.remove("is-visible"),2600)}function z(t,a=!0){t==="TYMELESS10"?(i.discountRate=.1,g.textContent="Promo applied."):t?(i.discountRate=0,g.textContent=a?"That code is not active.":""):(i.discountRate=0,g.textContent=""),u()}P.addEventListener("change",t=>{i.sort=t.target.value,C()});d.addEventListener("change",t=>{const a=t.target.closest("[data-colour]");if(!a)return;const o=m.find(n=>n.id===a.dataset.colour),r=L(o,a.value),e=d.querySelector(`[data-product-image="${o.id}"]`);e&&(e.src=r.image)});d.addEventListener("click",t=>{const a=t.target.closest("[data-add]");if(!a)return;const o=a.dataset.add,r=d.querySelector(`[data-size="${o}"]`).value,e=d.querySelector(`[data-colour="${o}"]`).value;O(o,r,e)});document.querySelector("[data-cart-open]").addEventListener("click",E);document.querySelector("[data-cart-close]").addEventListener("click",q);$.addEventListener("click",q);v.addEventListener("click",t=>{const a=t.target.closest("[data-qty]"),o=t.target.closest("[data-remove]");if(a){const r=i.cart.find(e=>e.key===a.dataset.qty);if(!r)return;r.quantity+=Number(a.dataset.direction),r.quantity<=0&&(i.cart=i.cart.filter(e=>e.key!==r.key)),u()}o&&(i.cart=i.cart.filter(r=>r.key!==o.dataset.remove),u())});b.addEventListener("submit",t=>{t.preventDefault();const a=new FormData(b).get("promo").trim().toUpperCase();z(a)});w.addEventListener("input",()=>{const t=w.value.trim().toUpperCase();(t==="TYMELESS10"||!t)&&z(t,!1)});document.querySelector("[data-checkout]").addEventListener("click",()=>{if(i.cart.length===0){l("Add a tee before checkout.");return}const t=T();l(`Demo checkout ready: ${c.format(t.total)} total.`)});document.addEventListener("keydown",t=>{t.key==="Escape"&&q()});C();u();S();
