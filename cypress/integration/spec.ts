describe('Language switch', () => {
  it('works for en', () => {
    cy.visit('/?lang=en')
    cy.title().should('include', 'Starbuttons')
  })

  it('works for zh', () => {
    cy.visit('/?lang=zh')
    cy.title().should('include', '星按钮')
  })
})

describe('Basic features', () => {
  beforeEach(() => {
    cy.visit('/?lang=en')
  })

  it('has the center button', () => {
    cy.get('#bigBtn div').contains('Eeehihihihi')
  })

  it('has top menu', () => {
    cy.get('#settings label').contains('Do Not Click Me')
    cy.get('#settings label').contains('Repeat')
  })

  it('has music board button', () => {
    cy.get('#switchBtn').contains('Music board')
  })

  it('can open board', () => {
    cy.get('#switchBtn').click()
    cy.get('#boardContext h2').should('be.visible')
    cy.get('#boardContext div').should('be.visible')
  })
})

describe('Language hot switch', () => {
  before(() => {
    cy.visit('/?lang=en')
    cy.get('#langSelect').select('中文')
    cy.get('#bigBtn').focus() // this is to fire the language change event
  })

  it('has the center button', () => {
    cy.get('#bigBtn div').contains('噫hihihihi')
  })

  it('has top menu', () => {
    cy.get('#settings label').contains('没事不要点')
    cy.get('#settings label').contains('洗脑循环')
  })

  it('has music board button', () => {
    cy.get('#switchBtn').contains('声音面板')
  })
})
