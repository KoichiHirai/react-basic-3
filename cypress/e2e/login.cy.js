describe('template spec', () => {
  it.skip('アクセスチェック', () => {
    cy.visit('/login')
  })

  it('メールアドレスのバリデーションチェック時のエラー表示', () => {
    cy.visit('/login')

    cy.get('.email-input').type('invalid-email')

    cy.get('login-button').click()

    cy.get('.error-message').should('be.visible')
  })
})