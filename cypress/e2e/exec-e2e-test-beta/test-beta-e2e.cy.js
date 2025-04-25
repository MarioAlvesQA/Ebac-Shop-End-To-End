/// <reference types="cypress" />
let dadosLogin

import productsPage from "../../support/page_objects/products.page"; // Importando a página de produtos para usar os métodos de interação com a página
import { clearCartUntilMessage } from "../../support/e2e-ebac-shop-functions"; // Importando a função para limpar o carrinho

describe('', () => {
    

context('Funcionalidade Login', () => {
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    // Hook para executar antes de cada teste
    beforeEach(() => {
        cy.visit('minha-conta/')
       // cy.login(dadosLogin.usuario, dadosLogin.senha)
        
        
    });

    // Hook para tirar screenshot após cada teste
    afterEach(() => {
        cy.screenshot()
    });
    
context('Limpar carrinho antes do teste End-To-End na Ebac Shop - Usando massa de dados login Fixos.', () => {
    /* 
        Dado que o usuário quer iniciar um teste End-To-End na Ebac Shop
        Quando o carrinho do usuário não estiver vazio
        Então o carrinho deve ser limpo antes de iniciar o teste
        E deve ser feito o logout após a limpeza do carrinho
    */
    // Teste para limpar o carrinho antes de iniciar o fluxo de compra com dados fixos
    it('Clear the cart before of the test', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha); // Método para login usando dados fixos
        productsPage.goToCart(); // Acessa o carrinho
        clearCartUntilMessage(); // Função para limpar o carrinho até que a mensagem "Seu carrinho está vazio." apareça
    });
});


    it('Login com sucesso usando Comando customizado', () => {
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.logout()
        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('contain', 'Minha conta')

        cy.fixture('product-list').then(product1 => {
            productsPage.searchProduct(product1[0].name)
            productsPage.chooseProductsAttributes(
                product1[0].size,
                product1[0].color,
                product1[0].quantity)
            productsPage.addToCart()
            
            // Check if the product name and quantity were added to the cart correctly
            if (product1[0].quantity === 1) {
                cy.get('.woocommerce-message').should('contain', `“${product1[0].name}” foi adicionado no seu carrinho.`)
            } else {
                cy.get('.woocommerce-message').should('contain', `${product1[0].quantity} × “${product1[0].name}” foram adicionados no seu carrinho.` )    
            }
    
        })

        cy.fixture('product-list').then(product2 => {
            productsPage.searchProduct(product2[1].name)
            productsPage.chooseProductsAttributes(
                product2[1].size,
                product2[1].color,
                product2[1].quantity
            )
            productsPage.addToCart()

            // Check if the product name and quantity were added to the cart correctly
            if (product2[1].quantity === 1) {
                cy.get('.woocommerce-message').should('contain', `"${product2[1].name}” foi adicionado no seu carrinho.`)
            } else {
                cy.get('.woocommerce-message').should('contain', `${product2[1].quantity} × “${product2[1].name}” foram adicionados no seu carrinho.` )
            }
        })

        cy.fixture('product-list').then(product3 => {
            productsPage.searchProduct(product3[2].name)
            productsPage.chooseProductsAttributes(
                product3[2].size,
                product3[2].color,
                product3[2].quantity
            )
            productsPage.addToCart()
            cy.wait(1000)

            // Check if the product name and quantity were added to the cart correctly
            if (product3[2].quantity === 1) {
                cy.get('.woocommerce-message').should('contain', `"${product3[2].name}” foi adicionado no seu carrinho.`)
            } else {
                cy.get('.woocommerce-message').should('contain', `${product3[2].quantity} × “${product3[2].name}” foram adicionados no seu carrinho.` )
            }
        })

        cy.fixture('product-list').then(product4 => {
            productsPage.searchProduct(product4[3].name)
            productsPage.chooseProductsAttributes(
                product4[3].size,
                product4[3].color,
                product4[3].quantity
            )
            productsPage.addToCart()

            // Check if the product name and quantity were added to the cart correctly
            if (product4[3].quantity === 1) {
                cy.get('.woocommerce-message').should('contain', `"${product4[3].name}” foi adicionado no seu carrinho.`)
            } else {
                cy.get('.woocommerce-message').should('contain', `${product4[3].quantity} × “${product4[3].name}” foram adicionados no seu carrinho.` )
            }
        })

        productsPage.goToCart()

        cy.fixture('product-list').then(cart => {
            //let prodValue = cart[3].quantity * cart[3].value
            //let prodValueTotal = prodValue.replace(/./g, ',').toLowerCase()
            
            cy.get(`:nth-child(${cart[0].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[0].quantity)
            cy.get(`:nth-child(${cart[0].id}) > .product-name > a`).eq(0).should('contain', cart[0].name)

            cy.get(`:nth-child(${cart[1].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[1].quantity)
            cy.get(`:nth-child(${cart[1].id}) > .product-name > a`).eq(0).should('contain', cart[1].name)

            cy.get(`:nth-child(${cart[2].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[2].quantity)
            cy.get(`:nth-child(${cart[2].id}) > .product-name > a`).eq(0).should('contain', cart[2].name)

            cy.get(`:nth-child(${cart[3].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[3].quantity)
            cy.get(`:nth-child(${cart[3].id}) > .product-name > a`).eq(0).should('contain', cart[3].name)
  
        });

        productsPage.checkOut()

        cy.fixture('product-list').then(cart => {
            
            cy.get(`:nth-child(${cart[0].id}) > .product-name > .product-quantity`).eq(0).should('contain', cart[0].quantity)
            cy.get(`tbody > :nth-child(${cart[0].id}) > .product-name`).eq(0).should('contain', cart[0].name)

            cy.get(`:nth-child(${cart[1].id}) > .product-name > .product-quantity`).eq(0).should('contain', cart[1].quantity)
            cy.get(`tbody > :nth-child(${cart[1].id}) > .product-name`).eq(0).should('contain', cart[1].name)

            cy.get(`:nth-child(${cart[2].id}) > .product-name > .product-quantity`).eq(0).should('contain', cart[2].quantity)
            cy.get(`tbody > :nth-child(${cart[2].id}) > .product-name`).eq(0).should('contain', cart[2].name)

            cy.get(`:nth-child(${cart[3].id}) > .product-name > .product-quantity`).eq(0).should('contain', cart[3].quantity)
            cy.get(`tbody > :nth-child(${cart[3].id}) > .product-name`).eq(0).should('contain', cart[3].name)
        });

        // Testar todos os métodos de pagamento
        productsPage.paymentMethodTestAll();
        
        // Selecionar o método de pagamento "Entrega na entrega" e aceitar os termos do pedido
        productsPage.paymentMethodEntrega();
        
        // Adicionar comentários ao pedido
        cy.fixture('product-comments').then(comments => {
            productsPage.addComments(comments[0].comment)
        });
        
        // Finalizar o pedido !!!!
        cy.get('#place_order').click()

        cy.wait(9000)

        // Validar pedido realizado com sucesso
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.' )

        // Validar os itens após finalizar a compra
        cy.fixture('product-list').then(cart => {    
            cy.get(`:nth-child(${cart[0].id}) > .woocommerce-table__product-name > .product-quantity`).eq(0).should('contain', cart[0].quantity)
            cy.get(`:nth-child(${cart[0].id}) > .woocommerce-table__product-name > a`).eq(0).should('contain', cart[0].name)

            cy.get(`:nth-child(${cart[1].id}) > .woocommerce-table__product-name > .product-quantity`).eq(0).should('contain', cart[1].quantity)
            cy.get(`:nth-child(${cart[1].id}) > .woocommerce-table__product-name > a`).eq(0).should('contain', cart[1].name)

            cy.get(`:nth-child(${cart[2].id}) > .woocommerce-table__product-name > .product-quantity`).eq(0).should('contain', cart[2].quantity)
            cy.get(`:nth-child(${cart[2].id}) > .woocommerce-table__product-name > a`).eq(0).should('contain', cart[2].name)

            cy.get(`:nth-child(${cart[3].id}) > .woocommerce-table__product-name > .product-quantity`).eq(0).should('contain', cart[3].quantity)
            cy.get(`:nth-child(${cart[3].id}) > .woocommerce-table__product-name > a`).eq(0).should('contain', cart[3].name)
        });

        // Armazenar dados do pedido após finalizar a compra
        let pedidoId = cy.get('.woocommerce-order-overview__order > strong')
        let pedidoData = cy.get('.woocommerce-order-overview__date > strong')
        let pedidoValor = cy.get('strong > .woocommerce-Price-amount > bdi')
        let pedidoMetodoPagamento = cy.get('.woocommerce-order-overview__payment-method > strong')
    
        // Voltar para Minha Conta
        cy.get('a > .hidden-xs').click()

        // Validar os dados do pedido na página "Minha Conta"
        productsPage.validarPedido()
    
    });

})

});