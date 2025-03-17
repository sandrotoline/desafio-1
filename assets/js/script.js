const API_URL = 'https://desafio.xlow.com.br/search';

$(document).ready(() => {
  let isMobileLayout = true;

  // Buscar produtos ao carregar a página
  async function fetchProducts() {
    try {
      const response = await fetch(API_URL);
      const products = await response.json();

      if (!Array.isArray(products)) throw new Error('Dados inválidos da API');

      $('#product-count').text(`Produtos: ${products.length}`);
      renderProducts(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  }

  // Renderizar produtos
  async function renderProducts(products) {
    const $productList = $('#product-list');
    $productList.empty();

    for (const product of products) {
      const details = await fetchProductDetails(product.productId);

      if (!details || !details[0]?.items[0]) continue;

      const item = details[0].items[0];
      const price = item.sellers[0].commertialOffer.Price;
      const priceWithoutDiscount = item.sellers[0].commertialOffer.PriceWithoutDiscount;

      const productCard = `
        <div class="product-card">
          <img src="${item.images[0].imageUrl}" alt="${item.nameComplete}" class="main-image" />
          <h3>${item.nameComplete}</h3>
          <p class="price">
            ${
              priceWithoutDiscount && priceWithoutDiscount !== price
                ? `<span class="discount-price">R$ ${priceWithoutDiscount.toFixed(2)}</span> R$ ${price.toFixed(2)}`
                : `R$ ${price.toFixed(2)}`
            }
          </p>
          <div class="variations">
            ${item.images.map((v) =>
                `<img src="${v.imageUrl}" alt="Variação" class="variation-image" style="max-height:50px"/>`
              ).join('')}
          </div>
          <button class="buy-btn">Comprar</button>
        </div>
      `;

      $productList.append(productCard);
    }
  }

  // Buscar detalhes do produto
  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`${API_URL}/${productId}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar detalhes do produto ${productId}:`, error);
      return null;
    }
  }

  // Trocar imagem principal ao clicar em uma variação
  $('#product-list').on('click', '.variation-image', function () {
    const mainImage = $(this).closest('.product-card').find('.main-image');
    mainImage.attr('src', $(this).attr('src'));
  });

  // Alternar layout
  $('#toggle-layout').on('click', () => {
    const $productList = $('#product-list');
    if ($(window).width() < 768) {
      isMobileLayout = !isMobileLayout;
      $productList.toggleClass('grid-1 grid-2');
    } else {
      $productList.toggleClass('grid-4 grid-5');
    }
  });

  fetchProducts();
});
