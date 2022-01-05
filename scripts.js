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

const Transaction = {  // cálculos
  all: [ // entrada de dados
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
  ], //pegando tudo que está no trasactions

  add(transaction){
    Transaction.all.push(transaction)
    App.reload() // limpa todas as antigas transações
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
  formatAmount(value) {
    value = Number(value) * 100
  },

  formatDate(date) {
    const splittedDate = date.split("-") //split=>separador
   return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()

    if(
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "") {
        throw new Error("Por favor, preencha todos os campos")
      }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    event.preventDefault()

    try {
      Form.validateFields() //verificar se os campos não estão vazios
      const transaction = Form.formatValues() // formatar os dados recebidos
      Transaction.add(transaction) //adicionar dados
      Form.clearFields() // limpar todos os campos
      Modal.close() //fechar o modal

    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init () {
    // transactions.forEach(funcion)=>para cada transação do transactions faça..
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()
  },
  reload () {
    DOM.clearTransactions() // toda vez que for para o reload ele vai limpar todas as Transactions
    App.init()
  },
}

App.init()