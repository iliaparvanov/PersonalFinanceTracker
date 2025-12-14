import App from '../../src/App'

describe('Expense Tracking', () => {
  beforeEach(() => {
    cy.mount(<App />)
  })

  const addExpense = (name: string, amount: string) => {
    cy.get('input[name="expense-name"]').type(name)
    cy.get('input[name="expense-amount"]').type(amount)
    cy.get('button').contains('Add Expense').click()
  }

  describe('View empty expense list', () => {
    it('should display an empty expenses table', () => {
      cy.get('.expenses-section table').should('exist')
      cy.get('.expenses-section table tbody tr').should('have.length', 0)
    })
  })

  describe('Add a single expense', () => {
    it('should add an expense with name and amount to the table', () => {
      addExpense('Groceries', '50.00')

      cy.get('.expenses-section table tbody tr').should('have.length', 1)
      cy.get('.expenses-section table tbody tr').first().within(() => {
        cy.contains('Groceries')
        cy.contains('50.00')
      })
    })
  })

  describe('Add multiple expenses', () => {
    it('should display all added expenses in the table', () => {
      const expenses = [
        { name: 'Groceries', amount: '50.00' },
        { name: 'Gas', amount: '35.50' },
        { name: 'Coffee', amount: '4.75' },
      ]

      expenses.forEach(({ name, amount }) => {
        addExpense(name, amount)
      })

      cy.get('.expenses-section table tbody tr').should('have.length', 3)

      expenses.forEach(({ name, amount }) => {
        cy.get('.expenses-section table tbody').within(() => {
          cy.contains('td', name)
          cy.contains('td', amount)
        })
      })
    })
  })

  describe('Validation', () => {
    it('should not submit expense without name', () => {
      cy.get('input[name="expense-amount"]').type('50.00')
      cy.get('button').contains('Add Expense').click()

      cy.get('.expenses-section table tbody tr').should('have.length', 0)
    })

    it('should not submit expense without amount', () => {
      cy.get('input[name="expense-name"]').type('Groceries')
      cy.get('button').contains('Add Expense').click()

      cy.get('.expenses-section table tbody tr').should('have.length', 0)
    })

    it('should not submit empty expense', () => {
      cy.get('button').contains('Add Expense').click()

      cy.get('.expenses-section table tbody tr').should('have.length', 0)
    })
  })

  describe('Remove expense', () => {
    it('should remove the only expense and show empty table', () => {
      addExpense('Groceries', '50.00')

      cy.get('.expenses-section table tbody tr')
        .contains('Groceries')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .click()

      cy.get('.expenses-section table tbody tr').should('have.length', 0)
    })

    it('should remove one expense from multiple expenses', () => {
      addExpense('Groceries', '50.00')
      addExpense('Gas', '35.50')
      addExpense('Coffee', '4.75')

      cy.get('.expenses-section table tbody tr')
        .contains('Gas')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .click()

      cy.get('.expenses-section table tbody tr').should('have.length', 2)
      cy.get('.expenses-section table tbody').within(() => {
        cy.contains('td', 'Groceries')
        cy.contains('td', '50.00')
        cy.contains('td', 'Coffee')
        cy.contains('td', '4.75')
      })
      cy.get('.expenses-section table tbody').should('not.contain', 'Gas')
    })

    it('should remove all expenses one by one', () => {
      addExpense('Groceries', '50.00')
      addExpense('Gas', '35.50')

      cy.get('.expenses-section table tbody tr')
        .contains('Groceries')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .click()

      cy.get('.expenses-section table tbody tr')
        .contains('Gas')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .click()

      cy.get('.expenses-section table tbody tr').should('have.length', 0)
    })

    it('should display a remove button for each expense', () => {
      addExpense('Groceries', '50.00')

      cy.get('.expenses-section table tbody tr')
        .contains('Groceries')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .should('exist')
    })
  })
})

describe('Income Tracking', () => {
  beforeEach(() => {
    cy.mount(<App />)
  })

  const addIncome = (name: string, amount: string) => {
    cy.get('input[name="income-name"]').type(name)
    cy.get('input[name="income-amount"]').type(amount)
    cy.get('button').contains('Add Income').click()
  }

  describe('View empty income list', () => {
    it('should display an empty income table', () => {
      cy.get('.income-section table').should('exist')
      cy.get('.income-section table tbody tr').should('have.length', 0)
    })
  })

  describe('Add a single income item', () => {
    it('should add an income item with name and amount to the table', () => {
      cy.get('input[name="income-name"]').type('Salary')
      cy.get('input[name="income-amount"]').type('3000.00')
      cy.get('button').contains('Add Income').click()

      cy.get('.income-section table tbody tr').should('have.length', 1)
      cy.get('.income-section table tbody tr').first().within(() => {
        cy.contains('Salary')
        cy.contains('3000.00')
      })
    })
  })

  describe('Add multiple income items', () => {
    it('should display all added income items in the table', () => {
      const incomeItems = [
        { name: 'Salary', amount: '3000.00' },
        { name: 'Freelance', amount: '500.00' },
        { name: 'Dividends', amount: '150.00' },
      ]

      incomeItems.forEach(({ name, amount }) => {
        addIncome(name, amount)
      })

      cy.get('.income-section table tbody tr').should('have.length', 3)

      incomeItems.forEach(({ name, amount }) => {
        cy.get('.income-section table tbody').within(() => {
          cy.contains('td', name)
          cy.contains('td', amount)
        })
      })
    })
  })

  describe('Validation', () => {
    it('should not submit income without name', () => {
      cy.get('input[name="income-amount"]').type('3000.00')
      cy.get('button').contains('Add Income').click()

      cy.get('.income-section table tbody tr').should('have.length', 0)
    })

    it('should not submit income without amount', () => {
      cy.get('input[name="income-name"]').type('Salary')
      cy.get('button').contains('Add Income').click()

      cy.get('.income-section table tbody tr').should('have.length', 0)
    })

    it('should not submit empty income', () => {
      cy.get('button').contains('Add Income').click()

      cy.get('.income-section table tbody tr').should('have.length', 0)
    })
  })

  describe('Remove income', () => {
    it('should remove the only income item and show empty table', () => {
      addIncome('Salary', '3000.00')

      cy.get('.income-section table tbody tr')
        .contains('Salary')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .click()

      cy.get('.income-section table tbody tr').should('have.length', 0)
    })

    it('should remove one income from multiple income items', () => {
      addIncome('Salary', '3000.00')
      addIncome('Freelance', '500.00')
      addIncome('Dividends', '150.00')

      cy.get('.income-section table tbody tr')
        .contains('Freelance')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .click()

      cy.get('.income-section table tbody tr').should('have.length', 2)
      cy.get('.income-section table tbody').within(() => {
        cy.contains('td', 'Salary')
        cy.contains('td', '3000.00')
        cy.contains('td', 'Dividends')
        cy.contains('td', '150.00')
      })
      cy.get('.income-section table tbody').should('not.contain', 'Freelance')
    })

    it('should display a remove button for each income item', () => {
      addIncome('Salary', '3000.00')

      cy.get('.income-section table tbody tr')
        .contains('Salary')
        .parent('tr')
        .find('button')
        .contains('Remove')
        .should('exist')
    })
  })
})

describe('Balance Display', () => {
  beforeEach(() => {
    cy.mount(<App />)
  })

  const addIncome = (name: string, amount: string) => {
    cy.get('input[name="income-name"]').type(name)
    cy.get('input[name="income-amount"]').type(amount)
    cy.get('button').contains('Add Income').click()
  }

  const addExpense = (name: string, amount: string) => {
    cy.get('input[name="expense-name"]').type(name)
    cy.get('input[name="expense-amount"]').type(amount)
    cy.get('button').contains('Add Expense').click()
  }

  it('should show total income when income items exist', () => {
    addIncome('Salary', '3000.00')
    addIncome('Freelance', '500.00')

    cy.get('.total-income').should('contain', '3500.00')
  })

  it('should show total expenses when expense items exist', () => {
    addExpense('Rent', '1200.00')
    addExpense('Groceries', '300.00')

    cy.get('.total-expenses').should('contain', '1500.00')
  })

  it('should show net balance when both income and expenses exist', () => {
    addIncome('Salary', '3000.00')
    addExpense('Rent', '1200.00')

    cy.get('.total-income').should('contain', '3000.00')
    cy.get('.total-expenses').should('contain', '1200.00')
    cy.get('.net-balance').should('contain', '1800.00')
  })

  it('should show positive net balance when income exceeds expenses', () => {
    addIncome('Salary', '3000.00')
    addExpense('Rent', '1000.00')

    cy.get('.net-balance')
      .should('contain', '2000.00')
      .and('have.class', 'positive')
  })

  it('should show negative net balance when expenses exceed income', () => {
    addIncome('Salary', '1000.00')
    addExpense('Rent', '1500.00')

    cy.get('.net-balance')
      .should('contain', '-500.00')
      .and('have.class', 'negative')
  })
})
