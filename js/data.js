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

// Helper para criar um produto individual com nome, preço, imagem e subgrupo (opcional)
// O "sub" agrupa produtos dentro da mesma categoria (ex: Fardo, 600ml, Dose, Garrafa)
function produto(img, nome, preco, sub = null) {
  return { img, nome, preco, sub };
}

const CARDAPIO = [
  {
    categoria: 'Cerveja',
    imagem: 'assets/cervejas.png',
    // Capa de cada subgrupo no menu (Fardo c/8, 600ml, Long Neck...)
    subImagens: {
      'Fardo c/8': 'assets/cerveja-fardo8-capa.png',
      'Fardo c/15': 'assets/cerveja-fardo15-capa.png',
      'Fardo c/12': 'assets/cerveja-fardo12-capa.png',
      '600ml': 'assets/cerveja-600ml-capa.png',
      'Caçulinha 300ml': 'assets/cerveja-cacu300ml-capa.png',
      'Balde c/10 - Caçulinha 300ml': 'assets/cerveja-balde10-capa.jpeg',
      'Lata 269ml': 'assets/cerveja-lata269-capa.png',
      'Long Neck': 'assets/cerveja-longneck-capa.jpeg',
    },
    produtos: [
      // Fardo
      produto('assets/cerveja-fardo8-heineken.png', 'Heineken', '40,00', 'Fardo c/8'),
      produto('assets/cerveja-fardo8-original.png', 'Original', '35,00', 'Fardo c/8'),
      produto('assets/cerveja-fardo15-imperio.png', 'Império', '40,00', 'Fardo c/15'),
      produto('assets/cerveja-fardo15-skol.png', 'Skol', '45,00', 'Fardo c/15'),
      produto('assets/cerveja-fardo12-capa.png', 'Itaipava', '35,00', 'Fardo c/12'),
      // 600ml
      produto('assets/cerveja-600ml-heineken.png', 'Heineken', '17,00', '600ml'),
      produto('assets/cerveja-600ml-original.png', 'Original', '14,00', '600ml'),
      produto('assets/cerveja-600ml-imperio.png', 'Império', '12,00', '600ml'),
      // Caçulinha 300ml
      produto('assets/cerveja-cacu300ml-antarctica.png', 'Antarctica', '5,00', 'Caçulinha 300ml'),
      produto('assets/cerveja-cacu300ml-original.png', 'Original', '6,00', 'Caçulinha 300ml'),
      // Balde com 10 - Caçulinha 300ml
      produto('assets/cerveja-balde10-antarctica.jpeg', 'Antarctica', '50,00', 'Balde c/10 - Caçulinha 300ml'),
      produto('assets/cerveja-balde10-original.jpeg', 'Original', '60,00', 'Balde c/10 - Caçulinha 300ml'),
      // Lata 269ml
      produto('assets/cerveja-lata269-skol.png', 'Skol', '5,00', 'Lata 269ml'),
      produto('assets/cerveja-lata269-original.png', 'Original', '5,00', 'Lata 269ml'),
      produto('assets/cerveja-lata269-imperio.jpeg', 'Império', '5,00', 'Lata 269ml'),
      produto('assets/cerveja-lata269-heineken.jpeg', 'Heineken', '6,00', 'Lata 269ml'),
      // Long Neck
      produto('assets/cerveja-longneck-heineken.png', 'Heineken', '12,00', 'Long Neck'),
      produto('assets/cerveja-longneck-corona.png', 'Corona', '12,00', 'Long Neck'),
      produto('assets/cerveja-longneck-budweiser.png', 'Budweiser', '10,00', 'Long Neck'),
    ],
  },
  {
    categoria: 'Drinks',
    imagem: 'assets/drinks-bar.png',
    produtos: [
      produto('assets/drink-caipirinha.png', 'Caipirinha', '15,00'),
      produto('assets/drink-nevada.png', 'Nevada', '15,00'),
      produto('assets/drink-gintonica.png', 'Gin Tônica', '20,00'),
      produto('assets/drink-batida-morango.png', 'Batida de Morango', '20,00'),
      produto('assets/drink-batida-maracuja.png', 'Batida de Maracujá', '20,00'),
      produto('assets/drink-ice-morango.png', 'Ice de Morango', '25,00'),
      produto('assets/drink-ice-kiwi.jpeg', 'Ice de Kiwi', '25,00'),
    ],
  },
  {
    categoria: 'Combo',
    imagem: 'assets/combo-drinks.png',
    produtos: [
      produto('assets/combo-drinks.png', 'Combo', '119,90'),
    ],
  },
  {
    categoria: 'Whisky',
    imagem: 'assets/wisky.png',
    produtos: [
      // Doses
      produto('assets/wisky.png', 'Red Label', '15,00', 'Dose'),
      produto('assets/wisky.png', "Jack Daniel's", '20,00', 'Dose'),
      produto('assets/wisky.png', 'Cavalo Branco', '15,00', 'Dose'),
      produto('assets/wisky.png', 'Black & White', '20,00', 'Dose'),
      produto('assets/wisky.png', 'Ballantines', '15,00', 'Dose'),
      produto('assets/wisky.png', 'Jameson', '20,00', 'Dose'),
      produto('assets/wisky.png', 'Grants', '20,00', 'Dose'),
      // Garrafas
      produto('assets/wisky.png', 'Red Label', '140,00', 'Garrafa'),
      produto('assets/wisky.png', 'Cavalo Branco', '100,00', 'Garrafa'),
      produto('assets/wisky.png', 'Grants', '170,00', 'Garrafa'),
      produto('assets/wisky.png', "Jack Daniel's", '150,00', 'Garrafa'),
      produto('assets/wisky.png', 'Ballantines', '120,00', 'Garrafa'),
      produto('assets/wisky.png', 'Black & White', '140,00', 'Garrafa'),
      produto('assets/wisky.png', 'Jameson', '150,00', 'Garrafa'),
    ],
  },
  {
    categoria: 'Vodka',
    imagem: 'assets/vodka.png',
    produtos: [
      produto('assets/vodka.png', 'Dose Smirnoff', '15,00'),
      produto('assets/vodka.png', 'Dose Absolut', '20,00'),
    ],
  },
  {
    categoria: 'Cachaça',
    imagem: 'assets/cachaca.png',
    produtos: [
      produto('assets/cachaca.png', 'Velho Barreiro', '4,00'),
      produto('assets/cachaca.png', 'Velho Barreiro com Limão', '5,00'),
      produto('assets/cachaca.png', 'Cachaça 51', '5,00'),
      produto('assets/cachaca.png', 'São Francisco', '6,00'),
      produto('assets/cachaca.png', 'Ypioca Envelhecida', '15,00'),
      produto('assets/cachaca.png', 'Dom Taparro Premium', '20,00'),
      produto('assets/cachaca.png', 'Dom Taparro Premium no Carvalho', '25,00'),
    ],
  },
  {
    categoria: 'Vinho',
    imagem: 'assets/vinho.png',
    produtos: [
      produto('assets/vinho.png', 'Vinho Chalise', '17,00'),
      produto('assets/vinho.png', 'Vinho São Tomé', '25,00'),
      produto('assets/vinho.png', 'Vinho Pérgola', '28,00'),
      produto('assets/vinho.png', 'Vinho Cosecha', '45,00'),
      produto('assets/vinho.png', 'Vinho Alecrim', '45,00'),
      produto('assets/vinho.png', 'Vinho Pêra Negra', '45,00'),
    ],
  },
  {
    categoria: 'Licor',
    imagem: 'assets/licor.png',
    produtos: [
      produto('assets/licor.png', 'Sabores de Licor', '10,00', 'Dose'),
      produto('assets/licor.png', 'Dom Taparro', '80,00', 'Garrafa'),
    ],
  },
];