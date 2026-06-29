function criarBotaoPedir(nome, preco) {
  const precoFormatado = formatarPreco(preco);
  return `<a href="${whatsappLink(nome, precoFormatado)}" target="_blank" rel="noopener" class="whatsapp-btn-card">Pedir</a>`;
}

function criarCard(produto) {
  const precoFormatado = formatarPreco(produto.preco);
  return `
    <div class="card">
      <img src="${produto.img}" alt="${produto.nome}" loading="lazy">
      <div class="card-content">
        <h4>${produto.nome}</h4>
        <div class="price">${precoFormatado}</div>
      </div>
      ${criarBotaoPedir(produto.nome, produto.preco)}
    </div>`;
}

function criarGrupo(categoria) {
  const cards = categoria.produtos.map(criarCard).join('');
  return `
    <div class="group">
      <p>${categoria.categoria}</p>
      ${cards}
    </div>`;
}

function criarSlide(promo) {
  const precoFormatado = formatarPreco(promo.preco);
  return `
    <div class="slide" style="background-image:url('${promo.img}')" data-nome="${promo.nome}" data-preco="${precoFormatado}" data-img="${promo.img}">
      <div class="info">
        <h4>${promo.nome}</h4>
        <span>${precoFormatado}</span>
      </div>
    </div>`;
}

function criarPopupCard(promo) {
  const precoFormatado = formatarPreco(promo.preco);
  return `
    <div class="popup-card">
      <img src="${promo.img}" alt="${promo.nome}" loading="lazy">
      <h4>${promo.nome}</h4>
      <span>${precoFormatado}</span>
      ${criarBotaoPedir(promo.nome, promo.preco)}
    </div>`;
}

function renderPromocoes() {
  const slider = document.getElementById('slider');
  const popupGrid = document.getElementById('popup-grid');
  if (!slider || !popupGrid) return;

  const repeticoes = 4;
  let slidesHtml = '';
  for (let i = 0; i < repeticoes; i++) {
    slidesHtml += PROMOCOES_EXIBIDAS.map(criarSlide).join('');
  }
  slider.innerHTML = slidesHtml;
  popupGrid.innerHTML = PROMOCOES_EXIBIDAS.map(criarPopupCard).join('');
}

function renderCardapio() {
  const track = document.getElementById('track');
  if (!track) return;
  track.innerHTML = CARDAPIO.map(criarGrupo).join('');
}

function aplicarConfig() {
  const pedidoUrl = whatsappPedido();

  document.querySelectorAll('[data-link="whatsapp-pedido"]').forEach(el => {
    el.href = pedidoUrl;
  });

  const instagramUrl = CONFIG.instagram || '#';
  document.querySelectorAll('[data-link="instagram"]').forEach(el => {
    el.href = instagramUrl;
    if (!CONFIG.instagram) el.setAttribute('aria-disabled', 'true');
  });

  const cnpjEl = document.getElementById('footer-cnpj');
  if (cnpjEl) cnpjEl.textContent = CONFIG.cnpj;

  const cepEls = document.querySelectorAll('[data-cep]');
  cepEls.forEach(el => { el.textContent = CONFIG.cep; });
}

function initMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');

  if (!toggle || !nav || !header) return;

  const fecharMenu = () => {
    nav.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isActive));
    toggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', fecharMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharMenu();
  });

  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    if (nav.classList.contains('active')) fecharMenu();

    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop && currentScroll > 50) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
}

function initCarousel() {
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const slides = Array.from(document.querySelectorAll('.group'));

  if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(document.querySelectorAll('.group'));

  let index = 1;
  track.style.transform = `translateX(-${index * 100}%)`;

  function mover(direcao) {
    index += direcao;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => mover(-1));
  nextBtn.addEventListener('click', () => mover(1));

  track.addEventListener('transitionend', () => {
    if (allSlides[index] && allSlides[index].isSameNode(firstClone)) {
      track.style.transition = 'none';
      index = 1;
      track.style.transform = `translateX(-${index * 100}%)`;
    }
    if (allSlides[index] && allSlides[index].isSameNode(lastClone)) {
      track.style.transition = 'none';
      index = allSlides.length - 2;
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  });
}

function initPopupSlide() {
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  const popupTitle = document.getElementById('popup-title');
  const popupPrice = document.getElementById('popup-price');
  const popupBtn = document.getElementById('popup-btn');
  const closePopup = document.querySelector('#popup .close');

  if (!popup || !popupImg || !popupTitle || !popupPrice || !popupBtn || !closePopup) return;

  function fechar() {
    popup.style.display = 'none';
  }

  document.querySelectorAll('.slide').forEach(slide => {
    slide.addEventListener('click', () => {
      const nome = slide.dataset.nome;
      const preco = slide.dataset.preco;
      const img = slide.dataset.img;

      popupImg.src = img;
      popupImg.alt = nome;
      popupTitle.innerText = nome;
      popupPrice.innerText = preco;
      popupBtn.href = whatsappLink(nome, preco);
      popup.style.display = 'flex';
    });
  });

  closePopup.addEventListener('click', fechar);
  popup.addEventListener('click', (e) => { if (e.target === popup) fechar(); });
}

function initPopupPromocoes() {
  const btnAbrir = document.getElementById('abrirPromocoes');
  const popupPromocoes = document.getElementById('popupPromocoes');
  const fecharBtn = document.getElementById('fecharPopup');

  if (!btnAbrir || !popupPromocoes || !fecharBtn) return;

  function fechar() {
    popupPromocoes.classList.remove('active');
  }

  btnAbrir.addEventListener('click', (e) => {
    e.preventDefault();
    popupPromocoes.classList.add('active');
  });

  fecharBtn.addEventListener('click', fechar);
  popupPromocoes.addEventListener('click', (e) => { if (e.target === popupPromocoes) fechar(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fechar();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPromocoes();
  renderCardapio();
  aplicarConfig();
  initMenu();
  initCarousel();
  initPopupSlide();
  initPopupPromocoes();
});
