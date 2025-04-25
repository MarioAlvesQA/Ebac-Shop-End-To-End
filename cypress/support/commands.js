/*
Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});
*/

// Created by Mario Alves - April,23-2025

// Login "EBAC Shop"
Cypress.Commands.add('login', (email, password) => {
    cy.visit('minha-conta/')
    cy.get('#username').type(email, { log: true})
    cy.get('#password').type(password, { log: false})
    cy.get('#rememberme').click()
    cy.get('.woocommerce-form > .button').click()
});

// Update account details
Cypress.Commands.add('accountDetails', (firstName, lastName, username) => {
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').clear().type(firstName, {log: true})
    cy.get('#account_last_name').clear().type(lastName, {log: false})
    cy.get('#account_display_name').clear().type(username, {log: true})
    cy.get('.woocommerce-Button').click()

});

// Register a new user
Cypress.Commands.add('preRegister', (email, password) => {
    cy.get('.icon-user-unfollow').click()
    cy.get('#reg_email').type(email, {log: true})
    cy.get('#reg_password').type(password, {log: false})
    cy.get(':nth-child(4) > .button').click()

});

Cypress.Commands.add('logout', () => {
    cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a').click();
});