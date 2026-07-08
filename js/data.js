const CONFIG = {
  whatsapp: '5511926291025',
  instagram: '', // Preencher com o link do Instagram
  cnpj: '000.000.0001/00', // Preencher com o CNPJ real
  cep: '07802-160',
  endereco: 'Rua Antônio Ignácio Bicudo, 99',
  bairro: 'Companhia Fazenda Belém',
  cidade: 'Franco da Rocha - SP',
  telefone: '(11) 92629-1025',
};

function whatsappLink(nome, preco) {
  const precoTexto = preco || 'valor a combinar';
  const msg = encodeURIComponent(`Olá, quero ${nome} por ${precoTexto}`);
  return `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
}

function whatsappPedido() {
  const msg = encodeURIComponent('Olá, quero fazer um pedido!');
  return `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
}

function formatarPreco(preco) {
  if (!preco) return 'Consulte';
  return preco.startsWith('') ? preco : `R$ ${preco}`;
}

function criarProdutos(img, nomeBase, preco, quantidade = 6) {
  return Array.from({ length: quantidade }, (_, index) => ({
    img,
    nome: `${nomeBase}`,
    preco,
  }));
}

// Preços vazios = "Consulte" até você informar os valores reais
const PROMOCOES = [
  { img: 'assets/chequemate3.png', nome: 'Xeque Mate', preco: '' },
  { img: 'assets/combo2.png', nome: 'Combo', preco: '189,00' },
  { img: 'assets/longneck.png', nome: 'Long Neck', preco: '17,00' },
  { img: 'assets/drinks.png', nome: 'Drinks', preco: '' },
  { img: 'assets/campari.png', nome: 'Campari', preco: '' },
  { img: 'assets/vodka.png', nome: 'Vodka', preco: '119,90' },
];

const PROMOCOES_EXIBIDAS = Array.from({ length: 8 }, (_, index) => PROMOCOES[index % PROMOCOES.length]);

// Helper para criar um produto individual com nome, preço e imagem próprios
function produto(img, nome, preco) {
  return { img, nome, preco };
}

const CARDAPIO = [
  {
    categoria: 'Cerveja',
    produtos: [
      // Fardo
      produto('assets/cervejas.png', 'Heineken - Fardo c/8', '40,00'),
      produto('assets/cervejas.png', 'Original - Fardo c/8', '35,00'),
      produto('assets/cervejas.png', 'Império - Fardo c/15', '40,00'),
      produto('assets/cervejas.png', 'Skol - Fardo c/15', '45,00'),
      produto('assets/cervejas.png', 'Itaipava - Fardo c/12', '35,00'),
      // 600ml
      produto('assets/cervejas.png', 'Heineken 600ml', '17,00'),
      produto('assets/cervejas.png', 'Original 600ml', '14,00'),
      produto('assets/cervejas.png', 'Império 600ml', '12,00'),
      // Caçulinha 300ml
      produto('assets/cervejas.png', 'Caçulinha Antarctica 300ml', '5,00'),
      produto('assets/cervejas.png', 'Caçulinha Original 300ml', '6,00'),
      // Balde com 10 - Caçulinha 300ml
      produto('assets/cervejas.png', 'Balde Antarctica 300ml (10un)', '50,00'),
      produto('assets/cervejas.png', 'Balde Original 300ml (10un)', '60,00'),
      // 269ml
      produto('assets/cervejas.png', 'Skol 269ml', '5,00'),
      produto('assets/cervejas.png', 'Original 269ml', '5,00'),
      produto('assets/cervejas.png', 'Império 269ml', '5,00'),
      produto('assets/cervejas.png', 'Heineken 269ml', '6,00'),
      // Long Neck
      produto('assets/longneck.png', 'Long Neck Heineken', '12,00'),
      produto('assets/longneck.png', 'Long Neck Corona', '12,00'),
      produto('assets/longneck.png', 'Long Neck Budweiser', '10,00'),
    ],
  },
  {
    categoria: 'Drinks',
    produtos: [
      produto('assets/drinks.png', 'Caipirinha', '15,00'),
      produto('assets/drinks.png', 'Nevada', '15,00'),
      produto('assets/drinks.png', 'Gin Tônica', '20,00'),
      produto('assets/drinks.png', 'Batida de Morango', '20,00'),
      produto('assets/drinks.png', 'Batida de Maracujá', '20,00'),
      produto('assets/drinks.png', 'Ice de Morango', '25,00'),
      produto('assets/drinks.png', 'Ice de Kiwi', '25,00'),
    ],
  },
  {
    categoria: 'Combo',
    produtos: criarProdutos('assets/combo.png', 'Combo', '119,90'),
  },
  {
    categoria: 'Whisky',
    produtos: [
      // Doses
      produto('assets/wisky.png', 'Dose Red Label', '15,00'),
      produto('assets/wisky.png', "Dose Jack Daniel's", '20,00'),
      produto('assets/wisky.png', 'Dose Cavalo Branco', '15,00'),
      produto('assets/wisky.png', 'Dose Black & White', '20,00'),
      produto('assets/wisky.png', 'Dose Ballantines', '15,00'),
      produto('assets/wisky.png', 'Dose Jameson', '20,00'),
      produto('assets/wisky.png', 'Dose Grants', '20,00'),
      // Garrafas
      produto('assets/wisky.png', 'Garrafa Red Label', '140,00'),
      produto('assets/wisky.png', 'Garrafa Cavalo Branco', '100,00'),
      produto('assets/wisky.png', 'Garrafa Grants', '170,00'),
      produto('assets/wisky.png', "Garrafa Jack Daniel's", '150,00'),
      produto('assets/wisky.png', 'Garrafa Ballantines', '120,00'),
      produto('assets/wisky.png', 'Garrafa Black & White', '140,00'),
      produto('assets/wisky.png', 'Garrafa Jameson', '150,00'),
    ],
  },
  {
    categoria: 'Vodka',
    produtos: [
      produto('assets/vodka.png', 'Dose Smirnoff', '15,00'),
      produto('assets/vodka.png', 'Dose Absolut', '20,00'),
    ],
  },
  {
    categoria: 'Cachaça',
    produtos: [
      produto('assets/copao.png', 'Velho Barreiro', '4,00'),
      produto('assets/copao.png', 'Velho Barreiro com Limão', '5,00'),
      produto('assets/copao.png', 'Cachaça 51', '5,00'),
      produto('assets/copao.png', 'São Francisco', '6,00'),
      produto('assets/copao.png', 'Ypioca Envelhecida', '15,00'),
      produto('assets/copao.png', 'Dom Taparro Premium', '20,00'),
      produto('assets/copao.png', 'Dom Taparro Premium no Carvalho', '25,00'),
    ],
  },
  {
    categoria: 'Vinho',
    produtos: [
      produto('assets/combo.png', 'Vinho Chalise', '17,00'),
      produto('assets/combo.png', 'Vinho São Tomé', '25,00'),
      produto('assets/combo.png', 'Vinho Pérgola', '28,00'),
      produto('assets/combo.png', 'Vinho Cosecha', '45,00'),
      produto('assets/combo.png', 'Vinho Alecrim', '45,00'),
      produto('assets/combo.png', 'Vinho Pêra Negra', '45,00'),
    ],
  },
  {
    categoria: 'Licor',
    produtos: [
      produto('assets/campari.png', 'Dose Sabores de Licor', '10,00'),
      produto('assets/campari.png', 'Garrafa Licores Dom Taparro', '80,00'),
    ],
  },
];