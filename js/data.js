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
  return preco.startsWith('R$') ? preco : `R$ ${preco}`;
}

// Preços vazios = "Consulte" até você informar os valores reais
const PROMOCOES = [
  { img: 'chequemate3.png', nome: 'Xeque Mate', preco: '' },
  { img: 'combo2.png', nome: 'Combo', preco: '189,00' },
  { img: 'longneck.png', nome: 'Long Neck', preco: '17,00' },
  { img: 'drinks.png', nome: 'Drinks', preco: '' },
  { img: 'campari.png', nome: 'Campari', preco: '' },
  { img: 'vodka.png', nome: 'Vodka', preco: '119,90' },
];

const CARDAPIO = [
  {
    categoria: 'Cerveja',
    produtos: [
      { img: 'cervejas.png', nome: 'Cerveja', preco: '29,90' },
      { img: 'cervejas.png', nome: 'Cerveja', preco: '29,90' },
      { img: 'cervejas.png', nome: 'Cerveja', preco: '29,90' },
      { img: 'cervejas.png', nome: 'Cerveja', preco: '29,90' },
      { img: 'cervejas.png', nome: 'Cerveja', preco: '29,90' },
      { img: 'cervejas.png', nome: 'Cerveja', preco: '29,90' },
    ],
  },
  {
    categoria: 'Combo',
    produtos: [
      { img: 'combo.png', nome: 'Combo', preco: '119,90' },
      { img: 'combo.png', nome: 'Combo', preco: '119,90' },
      { img: 'combo.png', nome: 'Combo', preco: '119,90' },
      { img: 'combo.png', nome: 'Combo', preco: '119,90' },
      { img: 'combo.png', nome: 'Combo', preco: '119,90' },
      { img: 'combo.png', nome: 'Combo', preco: '119,90' },
    ],
  },
  {
    categoria: 'Whisky',
    produtos: [
      { img: 'wisky.png', nome: 'Whisky Premium', preco: '89,90' },
      { img: 'wisky.png', nome: 'Whisky Premium', preco: '89,90' },
      { img: 'wisky.png', nome: 'Whisky Premium', preco: '89,90' },
      { img: 'wisky.png', nome: 'Whisky Premium', preco: '89,90' },
      { img: 'wisky.png', nome: 'Whisky Premium', preco: '89,90' },
      { img: 'wisky.png', nome: 'Whisky Premium', preco: '89,90' },
    ],
  },
  {
    categoria: 'Copão',
    produtos: [
      { img: 'copao.png', nome: 'Copão', preco: '59,90' },
      { img: 'copao.png', nome: 'Copão', preco: '59,90' },
      { img: 'copao.png', nome: 'Copão', preco: '59,90' },
      { img: 'copao.png', nome: 'Copão', preco: '59,90' },
      { img: 'copao.png', nome: 'Copão', preco: '59,90' },
      { img: 'copao.png', nome: 'Copão', preco: '59,90' },
    ],
  },
  {
    categoria: 'Vodka',
    produtos: [
      { img: 'vodka.png', nome: 'Vodka', preco: '29,90' },
      { img: 'vodka.png', nome: 'Vodka', preco: '29,90' },
      { img: 'vodka.png', nome: 'Vodka', preco: '29,90' },
      { img: 'vodka.png', nome: 'Vodka', preco: '29,90' },
      { img: 'vodka.png', nome: 'Vodka', preco: '29,90' },
      { img: 'vodka.png', nome: 'Vodka', preco: '29,90' },
    ],
  },
  {
    categoria: 'Drinks',
    produtos: [
      { img: 'drinks.png', nome: 'Drinks', preco: '119,90' },
      { img: 'drinks.png', nome: 'Drinks', preco: '119,90' },
      { img: 'drinks.png', nome: 'Drinks', preco: '119,90' },
      { img: 'drinks.png', nome: 'Drinks', preco: '119,90' },
      { img: 'drinks.png', nome: 'Drinks', preco: '119,90' },
      { img: 'drinks.png', nome: 'Drinks', preco: '119,90' },
    ],
  },
];
