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
    produtos: [
      // Fardo
      produto('assets/cervejas.png', 'Heineken', '40,00', 'Fardo c/8'),
      produto('assets/cervejas.png', 'Original', '35,00', 'Fardo c/8'),
      produto('assets/cervejas.png', 'Império', '40,00', 'Fardo c/15'),
      produto('assets/cervejas.png', 'Skol', '45,00', 'Fardo c/15'),
      produto('assets/cervejas.png', 'Itaipava', '35,00', 'Fardo c/12'),
      // 600ml
      produto('assets/cervejas.png', 'Heineken', '17,00', '600ml'),
      produto('assets/cervejas.png', 'Original', '14,00', '600ml'),
      produto('assets/cervejas.png', 'Império', '12,00', '600ml'),
      // Caçulinha 300ml
      produto('assets/cervejas.png', 'Antarctica', '5,00', 'Caçulinha 300ml'),
      produto('assets/cervejas.png', 'Original', '6,00', 'Caçulinha 300ml'),
      // Balde com 10 - Caçulinha 300ml
      produto('assets/cervejas.png', 'Antarctica', '50,00', 'Balde c/10 - Caçulinha 300ml'),
      produto('assets/cervejas.png', 'Original', '60,00', 'Balde c/10 - Caçulinha 300ml'),
      // 269ml
      produto('assets/cervejas.png', 'Skol', '5,00', '269ml'),
      produto('assets/cervejas.png', 'Original', '5,00', '269ml'),
      produto('assets/cervejas.png', 'Império', '5,00', '269ml'),
      produto('assets/cervejas.png', 'Heineken', '6,00', '269ml'),
      // Long Neck
      produto('assets/longneck.png', 'Heineken', '12,00', 'Long Neck'),
      produto('assets/longneck.png', 'Corona', '12,00', 'Long Neck'),
      produto('assets/longneck.png', 'Budweiser', '10,00', 'Long Neck'),
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
      produto('assets/campari.png', 'Sabores de Licor', '10,00', 'Dose'),
      produto('assets/campari.png', 'Dom Taparro', '80,00', 'Garrafa'),
    ],
  },
];