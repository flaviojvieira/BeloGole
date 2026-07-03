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

const CARDAPIO = [
  {
    categoria: 'Cerveja',
    produtos: criarProdutos('assets/cervejas.png', 'Cerveja', '29,90'),
  },
  {
    categoria: 'Combo',
    produtos: criarProdutos('assets/combo.png', 'Combo', '119,90'),
  },
  {
    categoria: 'Whisky',
    produtos: criarProdutos('assets/wisky.png', 'Whisky', '89,90'),
  },
  {
    categoria: 'Copão',
    produtos: criarProdutos('assets/copao.png', 'Copão', '59,90'),
  },
  {
    categoria: 'Vodka',
    produtos: criarProdutos('assets/vodka.png', 'Vodka', '29,90'),
  },
  {
    categoria: 'Drinks',
    produtos: criarProdutos('assets/drinks.png', 'Drink', '119,90'),
  },
];