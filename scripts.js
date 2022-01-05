const Modal = { // criado a constante Modal
  open(){
    // escopo, abrir modal
    // adicionar a class active
    document.querySelector('.modal-overlay') // document=>acessar a DOM
    .classList.add('active')
  },
  close(){
    // outro escopo, fechar o modal
    // remover a class active do modal
    document.querySelector('.modal-overlay')
    .classList.remove('active')
  }
}


const transactions = [ // entrada de dados
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
  }, 
  {
    id: 2,
    description: 'Criação Website',
    amount: 500000,
    date: '23/01/2021',
  }, 
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
  },
  {
    id: 4,
    description: 'App',
    amount: 200000,
    date: '25/02/2021',
  }
]

const Transaction = {  // cálculos
  all: transactions, //pegando tudo que está no trasactions

  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)
    App.reload()
  },

  incomes() { // somar entradas
    let income = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0) {
        income += transaction.amount;
      }
    })
    return income
  },

  expenses() { // somar saídas
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0) {
        expense += transaction.amount;
      }
    })
    return expense
  },

  total() { // entradas-saídas
    return Transaction.incomes() + Transaction.expenses();
  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')  // criado o elemento tr(linha) no HTML
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction (transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = 
    /* ` ` => para usar o HTML no formato string e posso colocar variáveis dentro (interpolação)*/ 
    `
    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img src="./assets/minus.svg" alt="remover transação">
    </td>
    `
    return html
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionContainer.innerHTML = ""
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "") //remoção de qualquer caractere especial

    value = Number(value) / 100 // colocar 2 casas após a vigura

    value = value.toLocaleString("pt-BR", { // dando caractericas do R$
      style: "currency",
      currency: "BRL"
    })
    return signal + value
  }
}

const App = {
  init () {
    // transactions.forEach(funcion)=>para cada transação do transactions faça..
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })

    DOM.updateBalance()
  },
  reload () {
    DOM.clearTransactions() // toda vez que for para o reload ele vai limpar todas as Transactions
    App.init()
  },
}

App.init()