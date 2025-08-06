const products = [
  {
    id: 1,
    name: "Tie-Dye Lounge Set",
    price: 150,
    image: "assets/Photos/photo-1432149877166-f75d49000351.jpg"
  },
  {
    id: 2,
    name: "Sunburst Tracksuit",
    price: 150,
    image: "assets/Photos/photo-1515886657613-9f3515b0c78f.jpg"
  },
  {
    id: 3,
    name: "Retro Red Streetwear",
    price: 150,
    image: "assets/Photos/photo-1529139574466-a303027c1d8b.jpg"
  },
  {
    id: 4,
    name: "Urban Sportwear Combo",
    price: 150,
    image: "assets/Photos/photo-1588117260148-b47818741c74.jpg"
  },
  {
    id: 5,
    name: "Oversized Knit & Coat",
    price: 150,
    image: "assets/Photos/photo-1603344797033-f0f4f587ab60.jpg"
  },
  {
    id: 6,
    name: "Chic Monochrome Blazer",
    price: 150,
    image: "assets/Photos/photo-1608748010899-18f300247112.jpg"
  }
];


let bundle = [];


function renderProducts() {
  const grid = document.querySelector('.product-grid');
  grid.innerHTML = '';
  
  products.forEach(product => {
    const inBundle = bundle.find(item => item.id === product.id);
    const isBundleFull = bundle.length >= 3;
    
    grid.innerHTML += `
  <div class="product-card" data-product-id="${product.id}">
    <img src="${product.image}" alt="${product.name}" />
    <div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
      <button class="${inBundle ? 'added-btn' : 'add-btn'}" 
              ${inBundle || isBundleFull ? 'disabled' : ''}>
        ${inBundle ? 
          'Added to Bundle <span><img src="assets/Icons/Check.svg" alt="Checkmark" class="btn-icon"></span>' : 
          'Add to Bundle <span><img src="assets/Icons/Plus.svg" alt="Plus" class="btn-icon"></span>'}
      </button>
    </div>
  </div>
`;
  });
}

let bundleAdded = false;

function renderBundle() {
  const bundleList = document.querySelector('.bundle-list');
  bundleList.innerHTML = '';
  
  for (let i = 0; i < 3; i++) {
    if (i < bundle.length) {
      const bundleItem = bundle[i];
      bundleList.innerHTML += `
        <div class="bundle-item" data-product-id="${bundleItem.id}">
          <div class="item-content">
            <div style="height: 88.8px; width:88.8px; max-width:90px">
              <img src="${bundleItem.image}" class="item-image" alt="${bundleItem.name}" />
            </div>
            <div style="flex-grow:1; height:79px">
              <div class="item-details">
                <div class="item-name">${bundleItem.name}</div>
                <div class="item-price">$${bundleItem.price.toFixed(2)}</div>
              </div>
              <div class="item-controls">
                <div class="qty-controls">
                  <button class="qty-minus icon-container"><img src="assets/Icons/SVG.svg" alt=""></button>
                  <span class="icon-container">${bundleItem.quantity}</span>
                  <button class="qty-plus icon-container"><img src="assets/Icons/Plus.svg" alt=""></button>
                </div>
                <button class="remove-btn" title="Remove"><img src="assets/Icons/icon-trash.svg" alt="Trash" class="btn-icon"></button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      
      bundleList.innerHTML += `
        <div class="bundle-item empty">
          <div class="item-content">
            <div style="background-color: #F5F5F5; height: 88.8px; width:80px"></div>
            <div style="background-color: #F5F5F5; height: 88.8px; flex-grow: 1"></div>
          </div>
        </div>
      `;
    }
  }

  
  const totalItems = bundle.reduce((sum, item) => sum + item.quantity, 0);
  const progressFill = document.querySelector('.progress-fill');
  
  
  const progressPercentage = Math.min(100, (totalItems / 3) * 100);
  if (progressFill) {
    progressFill.style.width = `${progressPercentage}%`;
  }
  
  
  const discountRow = document.querySelector('.discount-row span:last-child');
  const subtotalRow = document.querySelector('.subtotal-row span:last-child');
  const cartBtn = document.querySelector('.cart-btn');
  
  
  const subtotal = bundle.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = totalItems >= 3 ? subtotal * 0.3 : 0;
  const total = subtotal - discount;
  
  
  if (discountRow) {
    discountRow.textContent = totalItems >= 3 ? `- $${discount.toFixed(2)} (30%)` : '- $0.00';
  }
  
 
  if (subtotalRow) {
    subtotalRow.textContent = `$${total.toFixed(2)}`;
  }
  
  
  if (cartBtn) {
    cartBtn.disabled = bundleAdded || totalItems < 3;
    
    
    const buttonText = document.createElement('span');
    buttonText.style = `
      font-family: 'Instrument Sans', Arial, sans-serif; 
      font-weight: 600; 
      font-size: 15px; 
      line-height: 100%; 
      letter-spacing: -0.36px;
      color: #FFFFFF;
    `;
    
    if (bundleAdded) {
      buttonText.textContent = 'Added to Cart';
    } else {
      buttonText.textContent = totalItems >= 3 
        ? 'Add 3 Items to Cart' 
        : 'Add 3 Items to Proceed';
    }
   
    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.innerHTML = bundleAdded 
      ? '<img src="assets/Icons/Check.svg" alt="Checkmark">' 
      : (totalItems >= 3 
          ? '<img src="assets/Icons/CaretRight.svg" alt="Arrow">' 
          : '<img src="assets/Icons/CaretRight.svg" alt="Arrow">');
    
   
    cartBtn.innerHTML = '';
    cartBtn.appendChild(buttonText);
    cartBtn.appendChild(arrow);
    
    
    cartBtn.style.backgroundColor = totalItems >= 3 || bundleAdded ? 'black' : '#444444';
    cartBtn.style.color = '#FFFFFF';
    cartBtn.style.cursor = (totalItems >= 3 && !bundleAdded) ? 'pointer' : 'not-allowed';
    cartBtn.style.borderColor = totalItems >= 3 || bundleAdded ? 'black' : '#444444';
  }
}


document.addEventListener('click', function(e) {
 
  if (e.target.closest('.add-btn')) {
    const card = e.target.closest('.product-card');
    const id = Number(card.getAttribute('data-product-id'));
    
    
    if (!bundle.find(p => p.id === id) && bundle.length < 3) {
      const product = products.find(p => p.id === id);
      bundle.push({...product, quantity: 1});
      renderProducts();
      renderBundle();
    }
  }
  
 
  if (e.target.closest('.cart-btn') && !e.target.closest('.cart-btn').disabled && !bundleAdded) {
    const totalItems = bundle.reduce((sum, p) => sum + p.quantity, 0);
    const total = bundle.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const discount = totalItems >= 3 ? total * 0.3 : 0;
    const subtotal = total - discount;
    
    console.log('Bundle added to cart:', {
      items: bundle,
      totalItems: totalItems,
      originalTotal: total,
      discount: discount,
      finalTotal: subtotal
    });
    
    
    bundleAdded = true;
    renderBundle();
    
   
  }
  
  
  if (e.target.closest('.remove-btn')) {
    const item = e.target.closest('.bundle-item');
    const id = Number(item.getAttribute('data-product-id'));
    bundle = bundle.filter(p => p.id !== id);
    
    
    bundleAdded = false;
    
    renderProducts();
    renderBundle();
  }
  
 
  if (e.target.classList.contains('qty-plus')) {
    const item = e.target.closest('.bundle-item');
    const id = Number(item.getAttribute('data-product-id'));
    const prod = bundle.find(p => p.id === id);
    if (prod) {
      prod.quantity += 1;
      
      
      bundleAdded = false;
      
      renderBundle();
      renderProducts();
    }
  }
  

  if (e.target.classList.contains('qty-minus')) {
    const item = e.target.closest('.bundle-item');
    const id = Number(item.getAttribute('data-product-id'));
    const prod = bundle.find(p => p.id === id);
    if (prod) {
      prod.quantity -= 1;
      
      
      bundleAdded = false;
      
      if (prod.quantity <= 0) {
        bundle = bundle.filter(p => p.id !== id);
      }
      renderBundle();
      renderProducts();
    }
  }
});


renderProducts();
renderBundle();