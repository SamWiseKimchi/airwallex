export {};
describe('Form e2e tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('main').within(() => {
      // Wait so that the page can finish loading
      cy.wait(1000);
      cy.get('button').should('exist').click();
    });

    cy.intercept({
      method: 'POST',
      url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    }).as('submitForm');
  });

  it('Successfully submits form', () => {
    cy.get('form')
      .should('exist')
      .within(() => {
        cy.get('input').filter('#name').focus().type('example name');
        cy.get('input').filter('#email').focus().type('example@email.com');
        cy.get('input')
          .filter('#confirm-email')
          .focus()
          .type('example@email.com');
        cy.get('button')
          .should('have.attr', 'type', 'submit')
          .click()
          .should('be.disabled')
          .should('have.text', 'Sending, please wait...');
      });

    cy.wait('@submitForm').its('response.statusCode').should('eq', 200);

    cy.get('h3').filter(':contains("ALL done!")').should('exist');
    cy.get('button').filter(':contains("OK")').should('exist').click();
  });

  describe('Fails to submit form', () => {
    it('Mismatching emails recieves error message', () => {
      cy.get('form')
        .should('exist')
        .within(() => {
          cy.get('input').filter('#name').focus().type('example name');
          cy.get('input').filter('#email').focus().type('example@email.com');
          cy.get('input')
            .filter('#confirm-email')
            .focus()
            .type('example123@email.com');
          cy.get('button').should('have.attr', 'type', 'submit').click();
          cy.get('h3')
            .filter(':contains("Emails do not match")')
            .should('exist');
        });
    });

    it('Bad email recieves Bad Request', () => {
      cy.get('form')
        .should('exist')
        .within(() => {
          cy.get('input').filter('#name').focus().type('example name');
          cy.get('input')
            .filter('#email')
            .focus()
            .type('usedemail@airwallex.com');
          cy.get('input')
            .filter('#confirm-email')
            .focus()
            .type('usedemail@airwallex.com');
          cy.get('button')
            .should('have.attr', 'type', 'submit')
            .click()
            .should('be.disabled')
            .should('have.text', 'Sending, please wait...');
        });

      cy.wait('@submitForm').its('response.statusCode').should('eq', 400);

      cy.get('h3')
        .filter(':contains("Bad Request status: 400")')
        .should('exist');
    });

    it('Empty inputs prompts popup warning with validation message', () => {
      cy.get('form')
        .should('exist')
        .within(() => {
          cy.get('button').should('have.attr', 'type', 'submit').click();
          cy.get('#name:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please fill in this field.');

          cy.get('input').filter('#name').focus().type('example name');
          cy.get('button').should('have.attr', 'type', 'submit').click();
          cy.get('#email:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please fill in this field.');

          cy.get('input').filter('#email').focus().type('example@email.com');
          cy.get('button').should('have.attr', 'type', 'submit').click();
          cy.get('#confirm-email:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', 'Please fill in this field.');
        });
    });
  });
});
