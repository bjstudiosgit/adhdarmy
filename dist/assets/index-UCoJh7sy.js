(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const w="/assets/black-adhd-army-tshirt-uSr9c5RT.png",C="/assets/pink-adhd-army-tshirt-C6Rbugkq.png",m=[{id:"unisex",name:"Tymeless T-Shirt",price:19.99,tags:["Limited drop of 100","Black or pink"],sizes:["XS","S","M","L","XL","2XL","3XL"],colours:[{name:"Black",value:"black",image:w,swatch:"#080808"},{name:"Pink",value:"pink",image:C,swatch:"#f68fb4"}]},{id:"signed",name:"Signed T-Shirt",price:25.99,tags:["Includes signed photo","Limited drop of 100"],sizes:["XS","S","M","L","XL","2XL","3XL"],colours:[{name:"Black",value:"black",image:w,swatch:"#080808"},{name:"Pink",value:"pink",image:C,swatch:"#f68fb4"}]}],i={sort:"featured",cart:[],discountRate:0},d=document.querySelector("[data-products]"),D=document.querySelector("[data-sort]"),p=document.querySelector("[data-cart]"),$=document.querySelector("[data-cart-backdrop]"),g=document.querySelector("[data-cart-items]"),P=document.querySelector("[data-cart-count]"),B=document.querySelector("[data-subtotal]"),R=document.querySelector("[data-discount]"),A=document.querySelector("[data-total]"),b=document.querySelector("[data-promo-form]"),T=b.querySelector("input"),v=document.querySelector("[data-promo-message]"),h=document.querySelector("[data-toast]"),c=new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",minimumFractionDigits:2,maximumFractionDigits:2});function L(){window.lucide&&window.lucide.createIcons()}function S(t,a){return t.colours.find(o=>o.value===a)||t.colours[0]}function E(){d.innerHTML=m.map(t=>{const a=t.colours[0],o=t.sizes.map(s=>`<option value="${s}">${s}</option>`).join(""),r=t.colours.map(s=>`<option value="${s.value}">${s.name}</option>`).join(""),e=t.tags.map(s=>`<span class="tag">${s}</span>`).join(""),n=t.colours.map(s=>`<span class="swatch" style="background:${s.swatch}" aria-hidden="true"></span>`).join("");return`
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
      `}).join(""),L()}function I(t,a,o){return`${t}:${a}:${o}`}function N(t,a,o,r=1){const e=m.find(y=>y.id===t);if(!e)return;const n=a||e.sizes[0],s=S(e,o),f=I(t,n,s.value),k=i.cart.find(y=>y.key===f);k?k.quantity+=r:i.cart.push({key:f,id:t,size:n,colour:s.value,quantity:r}),u(),M(),l(`${e.name} in ${s.name} added to your cart.`)}function z(){const t=i.cart.reduce((e,n)=>{const s=m.find(f=>f.id===n.id);return e+s.price*n.quantity},0),a=i.cart.reduce((e,n)=>e+n.quantity,0)>=3?Math.round(t*.08):0,o=Math.round((t-a)*i.discountRate),r=a+o;return{subtotal:t,discount:r,total:Math.max(0,t-r)}}function u(){const t=i.cart.reduce((o,r)=>o+r.quantity,0);P.textContent=t,i.cart.length===0?g.innerHTML='<p class="empty-cart">Your cart is ready for the first tee.</p>':g.innerHTML=i.cart.map(o=>{const r=m.find(n=>n.id===o.id),e=S(r,o.colour);return`
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
        `}).join("");const a=z();B.textContent=c.format(a.subtotal),R.textContent=`-${c.format(a.discount).replace("-","")}`,A.textContent=c.format(a.total),L()}function M(){p.classList.add("is-open"),p.setAttribute("aria-hidden","false"),$.hidden=!1,document.body.classList.add("cart-is-open")}function q(){p.classList.remove("is-open"),p.setAttribute("aria-hidden","true"),$.hidden=!0,document.body.classList.remove("cart-is-open")}function l(t){h.textContent=t,h.classList.add("is-visible"),window.clearTimeout(l.timer),l.timer=window.setTimeout(()=>h.classList.remove("is-visible"),2600)}function x(t,a=!0){t==="TYMELESS10"?(i.discountRate=.1,v.textContent="Promo applied."):t?(i.discountRate=0,v.textContent=a?"That code is not active.":""):(i.discountRate=0,v.textContent=""),u()}D.addEventListener("change",t=>{i.sort=t.target.value,E()});d.addEventListener("change",t=>{const a=t.target.closest("[data-colour]");if(!a)return;const o=m.find(n=>n.id===a.dataset.colour),r=S(o,a.value),e=d.querySelector(`[data-product-image="${o.id}"]`);e&&(e.src=r.image)});d.addEventListener("click",t=>{const a=t.target.closest("[data-add]");if(!a)return;const o=a.dataset.add,r=d.querySelector(`[data-size="${o}"]`).value,e=d.querySelector(`[data-colour="${o}"]`).value;N(o,r,e)});document.querySelector("[data-cart-open]").addEventListener("click",M);document.querySelector("[data-cart-close]").addEventListener("click",q);$.addEventListener("click",q);g.addEventListener("click",t=>{const a=t.target.closest("[data-qty]"),o=t.target.closest("[data-remove]");if(a){const r=i.cart.find(e=>e.key===a.dataset.qty);if(!r)return;r.quantity+=Number(a.dataset.direction),r.quantity<=0&&(i.cart=i.cart.filter(e=>e.key!==r.key)),u()}o&&(i.cart=i.cart.filter(r=>r.key!==o.dataset.remove),u())});b.addEventListener("submit",t=>{t.preventDefault();const a=new FormData(b).get("promo").trim().toUpperCase();x(a)});T.addEventListener("input",()=>{const t=T.value.trim().toUpperCase();(t==="TYMELESS10"||!t)&&x(t,!1)});document.querySelector("[data-checkout]").addEventListener("click",()=>{if(i.cart.length===0){l("Add a tee before checkout.");return}const t=z();l(`Demo checkout ready: ${c.format(t.total)} total.`)});document.addEventListener("keydown",t=>{t.key==="Escape"&&q()});E();u();L();
