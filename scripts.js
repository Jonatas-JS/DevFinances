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

const transactions = [{ // entrada de dados
  id: 1,
  description: 'Luz',
  amount: -50000,
  date: '23/01/2021',
}, {
  id: 2,
  description: 'Criação Website',
  amount: 500000,
  date: '23/01/2021',
}, {
  id: 3,
  description: 'Internet',
  amount: -20000,
  date: '23/01/2021',
}]

const Transaction = {  // cálculos
  incomes() { // somar entradas 

  },
  expenses() { // somar saídas

  },
  total() { // entradas-saídas

  }
}