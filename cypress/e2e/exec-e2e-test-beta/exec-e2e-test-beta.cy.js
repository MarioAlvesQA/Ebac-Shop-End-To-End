/// <reference types="cypress" />

// import { faker } library
import { faker } from '@faker-js/faker';
import { fakerPT_BR as fakerBR } from '@faker-js/faker'; // Importing the faker library to generate random data in Brazilian Portuguese
import { fakerKO as fakerKorea } from '@faker-js/faker'; // Importing the faker library to generate random data in Korean
import { fakerFR } from '@faker-js/faker'; // Importing the faker library to generate random data in French

import productsPage from '../../support/page_objects/products.page';
import { billDetailsMethodBR } from '../../support/e2e-ebac-shop-functions';

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    
    context('Exercicio - Testes End-to-end - Fluxo de pedido válido', () => {
        /*  
            Como cliente 
            Quero acessar a Loja EBAC 
            Para fazer um pedido de 4 produtos 
            Fazendo a escolha dos produtos
            Adicionando ao carrinho
            Preenchendo todas opções no checkout
            E validando minha compra ao final 
        */
    
      beforeEach(() => {
          cy.visit('/')
      
        });
    
      it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta - Usando dados aleatórios e novo usuário por execução', () => {
          //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
          // Fluxo de registro e criação de um novo usuário
          // variaveis faker para gerar dados aleatórios para cadastro e login do novo usuário
          let emailFaker = fakerBR.internet.email();
          let passwordFaker = faker.internet.password();
          let firstNameFaker = fakerKorea.person.firstName();
          let lastNameFaker = fakerKorea.person.lastName();
          let usernameFaker = fakerFR.internet.userName();
        
          cy.preRegister(emailFaker, passwordFaker); // Registro do usuário (email e senha)
          cy.accountDetails(firstNameFaker, lastNameFaker, usernameFaker); // Detalhes da conta (nome, sobrenome e nome de usuário)
          cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
          cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', `Olá, ${usernameFaker} (não é ${usernameFaker}? Sair)` )
          
          // Fluxo de logout e login com novo usuário
          cy.logout(); // Logout do usuário
          cy.login(emailFaker, passwordFaker); // Login com o novo usuário (email e senha)
          cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', `Olá, ${usernameFaker} (não é ${usernameFaker}? Sair)` )

          // Inicio do fluxo End-to-End de compra na loja Ebac Shop
          // adicionando produto 1 ao carrinho
          cy.fixture('product-list').then(product1 => {
                productsPage.searchProduct(product1[0].name)
                productsPage.chooseProductsAttributes(
                product1[0].size,
                product1[0].color,
                product1[0].quantity);
                productsPage.addToCart(); // Método para adicionar o produto ao carrinho
                      
                // Check if the product name and quantity were added to the cart correctly
                if (product1[0].quantity === 1) {
                    cy.get('.woocommerce-message').should('contain', `“${product1[0].name}” foi adicionado no seu carrinho.`)
                } else {
                    cy.get('.woocommerce-message').should('contain', `${product1[0].quantity} × “${product1[0].name}” foram adicionados no seu carrinho.` )    
                }   
            });

            // adicionando produto 2 ao carrinho
            cy.fixture('product-list').then(product2 => {
                productsPage.searchProduct(product2[1].name)
                productsPage.chooseProductsAttributes(
                product2[1].size,
                product2[1].color,
                product2[1].quantity);
                productsPage.addToCart();
            
                // Check if the product name and quantity were added to the cart correctly
                if (product2[1].quantity === 1) {
                    cy.get('.woocommerce-message').should('contain', `"${product2[1].name}” foi adicionado no seu carrinho.`)
                } else {
                    cy.get('.woocommerce-message').should('contain', `${product2[1].quantity} × “${product2[1].name}” foram adicionados no seu carrinho.` )
                }
            });

            // adicionando produto 3 ao carrinho
            cy.fixture('product-list').then(product3 => {
                productsPage.searchProduct(product3[2].name)
                productsPage.chooseProductsAttributes(
                product3[2].size,
                product3[2].color,
                product3[2].quantity);
                productsPage.addToCart();
                cy.wait(1000); // Wait necessário para evitar erro de timeout
        
            // Check if the product name and quantity were added to the cart correctly
                if (product3[2].quantity === 1) {
                    cy.get('.woocommerce-message').should('contain', `"${product3[2].name}” foi adicionado no seu carrinho.`)
                } else {
                    cy.get('.woocommerce-message').should('contain', `${product3[2].quantity} × “${product3[2].name}” foram adicionados no seu carrinho.` )
                }
            });
            
            // adicionando produto 4 ao carrinho
            cy.fixture('product-list').then(product4 => {
                productsPage.searchProduct(product4[3].name)
                productsPage.chooseProductsAttributes(
                product4[3].size,
                product4[3].color,
                product4[3].quantity);
                productsPage.addToCart();
            
                // Check if the product name and quantity were added to the cart correctly
                if (product4[3].quantity === 1) {
                    cy.get('.woocommerce-message').should('contain', `"${product4[3].name}” foi adicionado no seu carrinho.`)
                } else {
                    cy.get('.woocommerce-message').should('contain', `${product4[3].quantity} × “${product4[3].name}” foram adicionados no seu carrinho.` )
                }
            });
            
            // seguir para o carrinho
            productsPage.goToCart();
            
            // validar os produtos no carrinho nome e quantidade
            cy.fixture('product-list').then(cart => {
                cy.get(`:nth-child(${cart[0].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[0].quantity)
                cy.get(`:nth-child(${cart[0].id}) > .product-name > a`).eq(0).should('contain', cart[0].name)
                
                cy.get(`:nth-child(${cart[1].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[1].quantity)
                cy.get(`:nth-child(${cart[1].id}) > .product-name > a`).eq(0).should('contain', cart[1].name)
                
                cy.get(`:nth-child(${cart[2].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[2].quantity)
                cy.get(`:nth-child(${cart[2].id}) > .product-name > a`).eq(0).should('contain', cart[2].name)
                
                cy.get(`:nth-child(${cart[3].id}) > .product-quantity > .quantity > .input-text`).eq(0).should('have.attr', 'value', cart[3].quantity)
                cy.get(`:nth-child(${cart[3].id}) > .product-name > a`).eq(0).should('contain', cart[3].name)
              
            });
            
            // seguir para o checkout
            productsPage.checkOut();
            
            // validar o carrinho com base em nome e quantidade de cada produto antes de finalizar a compra
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
            
            // Preencher os detalhes de faturamento
            billDetailsMethodBR();

            // Testar todos os métodos de pagamento
            productsPage.paymentMethodTestAll();
                    
            // Selecionar o método de pagamento "Entrega na entrega" e aceitar os termos do pedido
            productsPage.paymentMethodEntrega();
                    
            // Adicionar comentários ao pedido
            cy.fixture('product-comments').then(comments => {
                productsPage.addComments(comments[1].comment)
            });
                    
            // Finalizar o pedido !!!!
            cy.get('#place_order').click();
            
            cy.wait(9000); // Wait necessário para evitar erro de timeout durante o carregamento da página de confirmação do pedido
            
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
            
            // Armazenar dados do pedido após finalizar a compra para validações futuras
            let pedidoId = cy.get('.woocommerce-order-overview__order > strong');
            let pedidoData = cy.get('.woocommerce-order-overview__date > strong');
            let pedidoValor = cy.get('strong > .woocommerce-Price-amount > bdi');
            let pedidoMetodoPagamento = cy.get('.woocommerce-order-overview__payment-method > strong');
                
            // Voltar para Minha Conta
            cy.get('a > .hidden-xs').click();
            
            // Validar os dados do pedido na página "Minha Conta"
            productsPage.validarPedido();

        });
    
    })

});

