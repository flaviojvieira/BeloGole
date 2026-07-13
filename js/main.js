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

/* ===================== PRÉVIA DO CARDÁPIO NA HOME (1 tile por categoria) ===================== */

function criarTileCategoria(categoria) {
  const link = `cardapio.html?categoria=${encodeURIComponent(categoria.categoria)}`;
  return `
    <div class="categoria-tile">
      <a href="${link}" class="categoria-tile-imagem">
        <img src="${categoria.imagem}" alt="${categoria.categoria}" loading="lazy">
      </a>
      <div class="categoria-tile-content">
        <h3 class="categoria-tile-nome">${categoria.categoria}</h3>
        <a href="${link}" class="btn categoria-tile-btn">Ver Cardápio</a>
      </div>
    </div>`;
}

function renderCardapioPreview() {
  const container = document.getElementById('cardapio-preview');
  if (!container) return;
  container.innerHTML = CARDAPIO.map(criarTileCategoria).join('');
}

/* ===================== PÁGINA CARDÁPIO COMPLETO (ABAS) ===================== */

function getCategoriaFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('categoria');
}

function agruparPorSub(produtos) {
  const grupos = [];
  const mapa = new Map();

  produtos.forEach(p => {
    const chave = p.sub || '__geral__';
    if (!mapa.has(chave)) {
      const grupo = { titulo: p.sub || null, produtos: [] };
      mapa.set(chave, grupo);
      grupos.push(grupo);
    }
    mapa.get(chave).produtos.push(p);
  });

  return grupos;
}

function criarTab(categoria, ativa) {
  return `<button type="button" class="tab-btn${ativa ? ' active' : ''}" data-categoria="${categoria.categoria}">${categoria.categoria}</button>`;
}

// Categorias com mais de 1 subgrupo E muitos produtos ganham um submenu
// (ex: Cerveja -> Fardo, 600ml, Long Neck...). Categorias pequenas mostram tudo direto.
function usaSubmenu(categoria, grupos) {
  return grupos.length > 1;
}

function criarSubcategoriaCard(categoria, grupo) {
  return `
    <button type="button" class="subcategoria-card" data-sub="${grupo.titulo}">
      <img src="${categoria.imagem}" alt="${grupo.titulo}" loading="lazy">
      <span>${grupo.titulo}</span>
    </button>`;
}

function criarSecaoCategoria(categoria, ativa) {
  const grupos = agruparPorSub(categoria.produtos);

  if (usaSubmenu(categoria, grupos)) {
    const menuHtml = `
      <div class="subcategoria-menu">
        ${grupos.map(grupo => criarSubcategoriaCard(categoria, grupo)).join('')}
      </div>`;

    const produtosHtml = grupos.map(grupo => `
      <div class="subgrupo-produtos" data-sub="${grupo.titulo}">
        <button type="button" class="voltar-subcategoria">← Voltar para ${categoria.categoria}</button>
        <h3 class="subgrupo-titulo">${grupo.titulo}</h3>
        <div class="subgrupo-grid">
          ${grupo.produtos.map(criarCard).join('')}
        </div>
      </div>`).join('');

    return `<div class="cardapio-secao${ativa ? ' active' : ''}" data-categoria="${categoria.categoria}">${menuHtml}${produtosHtml}</div>`;
  }

  const gruposHtml = grupos.map(grupo => `
    <div class="subgrupo">
      ${grupo.titulo ? `<h3 class="subgrupo-titulo">${grupo.titulo}</h3>` : ''}
      <div class="subgrupo-grid">
        ${grupo.produtos.map(criarCard).join('')}
      </div>
    </div>`).join('');

  return `<div class="cardapio-secao${ativa ? ' active' : ''}" data-categoria="${categoria.categoria}">${gruposHtml}</div>`;
}

function resetSubmenus() {
  document.querySelectorAll('.cardapio-secao').forEach(secao => {
    const menu = secao.querySelector('.subcategoria-menu');
    if (!menu) return;
    menu.classList.remove('escondido');
    secao.querySelectorAll('.subgrupo-produtos').forEach(el => el.classList.remove('visivel'));
  });
}

function renderCardapioCompleto() {
  const tabsContainer = document.getElementById('cardapio-tabs');
  const secoesContainer = document.getElementById('cardapio-secoes');
  if (!tabsContainer || !secoesContainer) return;

  const categoriaURL = getCategoriaFromURL();
  const categoriaValida = CARDAPIO.some(c => c.categoria === categoriaURL);
  const categoriaAtiva = categoriaValida ? categoriaURL : CARDAPIO[0].categoria;

  tabsContainer.innerHTML = CARDAPIO.map(cat => criarTab(cat, cat.categoria === categoriaAtiva)).join('');
  secoesContainer.innerHTML = CARDAPIO.map(cat => criarSecaoCategoria(cat, cat.categoria === categoriaAtiva)).join('');
}

function initFiltroCardapio() {
  const tabsContainer = document.getElementById('cardapio-tabs');
  const secoesContainer = document.getElementById('cardapio-secoes');
  if (!tabsContainer || !secoesContainer) return;

  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    const categoriaSelecionada = btn.dataset.categoria;

    tabsContainer.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
    });

    secoesContainer.querySelectorAll('.cardapio-secao').forEach(secao => {
      secao.classList.toggle('active', secao.dataset.categoria === categoriaSelecionada);
    });

    resetSubmenus();

    btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });

  // Navegação dentro do submenu (ex: Cerveja -> Fardo -> produtos -> voltar)
  secoesContainer.addEventListener('click', (e) => {
    const subBtn = e.target.closest('.subcategoria-card');
    if (subBtn) {
      const secao = subBtn.closest('.cardapio-secao');
      const sub = subBtn.dataset.sub;

      secao.querySelector('.subcategoria-menu').classList.add('escondido');
      secao.querySelectorAll('.subgrupo-produtos').forEach(el => {
        el.classList.toggle('visivel', el.dataset.sub === sub);
      });

      secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const backBtn = e.target.closest('.voltar-subcategoria');
    if (backBtn) {
      const secao = backBtn.closest('.cardapio-secao');
      secao.querySelectorAll('.subgrupo-produtos').forEach(el => el.classList.remove('visivel'));
      secao.querySelector('.subcategoria-menu').classList.remove('escondido');
      secao.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
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

// Camada de fundo fixa compartilhada (usada quando existe mais de uma seção
// com "fundo fixo" na mesma página, ex: hero + cardápio no index).
// Troca a imagem conforme a seção que está visível, evitando que uma
// sobreponha a outra.
function initFixedBackgrounds() {
  const bg = document.getElementById('bg-fixed-shared');
  if (!bg) return;

  const secoes = Array.from(document.querySelectorAll('[data-bg]'));
  if (!secoes.length) return;

  // Pré-carrega todas as imagens de fundo usadas nas seções, assim quando a
  // troca acontecer o navegador já tem a imagem em cache/decodificada
  // (evita o "flash" mostrando a imagem antiga por um instante).
  const urlsUnicas = [...new Set(secoes.map(s => s.dataset.bg))];
  urlsUnicas.forEach(url => {
    const preload = new Image();
    preload.src = url;
  });

  let urlAtual = null;

  function secaoAtiva() {
    // Considera "ativa" a última seção que já começou a aparecer na tela
    // (seu topo já cruzou a borda de baixo da viewport). Assim a troca
    // acontece com bastante folga, antes da seção ficar visível de fato.
    const limiteBaixo = window.scrollY + window.innerHeight;
    let ativa = secoes[0];
    for (const sec of secoes) {
      const topoAbsoluto = sec.getBoundingClientRect().top + window.scrollY;
      if (topoAbsoluto <= limiteBaixo) {
        ativa = sec;
      }
    }
    return ativa;
  }

  function atualizarFundo() {
    const ativa = secaoAtiva();
    const url = ativa.dataset.bg;
    if (url !== urlAtual) {
      urlAtual = url;
      bg.style.backgroundImage = `url('${url}')`;
    }
  }

  atualizarFundo();

  // Atualiza a cada frame de rolagem (sem esperar callback assíncrono do
  // IntersectionObserver, que pode atrasar alguns frames em rolagens rápidas).
  let ticking = false;
  function aoRolar() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      atualizarFundo();
      ticking = false;
    });
  }

  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', atualizarFundo);
}

document.addEventListener('DOMContentLoaded', () => {
  renderPromocoes();
  renderCardapio();
  renderCardapioPreview();
  renderCardapioCompleto();
  aplicarConfig();
  initMenu();
  initCarousel();
  initPopupSlide();
  initPopupPromocoes();
  initFiltroCardapio();
  initFixedBackgrounds();
});