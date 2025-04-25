// cypress/support/e2e-ebac-shop-functions.js
// Created by Mario Alves on 2025-04-23

// import biblioteca faker 
import { faker } from '@faker-js/faker'; // default locale is en_US
import { fakerPT_BR as fakerBR } from '@faker-js/faker'; // Importando a biblioteca faker para gerar dados aleatórios em português do Brasil
import { fakerDE as fakerDE } from '@faker-js/faker'; // Importando a biblioteca faker para gerar dados aleatórios em alemão
import { fakerPT_PT as fakerPT } from '@faker-js/faker'; // Importando a biblioteca faker para gerar dados aleatórios em português de Portugal

import productsPage from './page_objects/products.page'; // Importando a página de produtos para usar os métodos de interação com a página e nas functions


// Funcão para gerar dados aleatórios FAKER para formulário na página "Detalhes de faturamento" da EBAC Shop durante o checkout em Português do Brasil
function billDetailsMethodBR() {
    // Gerar dados aleatórios para o formulário de detalhes de faturamento
    const country = faker.location.country();
    const address = fakerBR.location.streetAddress(false);
    const address2 = fakerBR.location.secondaryAddress(); // endereço secundário opcional exemplo: "Apto 101"
    const city = fakerBR.location.city(); // cidade aleatória brasileira
    const phone = fakerBR.phone.number('(##) #####-####'); // mascara para telefone 11-98765-4321
    const companyName = faker.company.name();
    const cep = fakerBR.location.zipCode('#####-###'); // máscara para CEP 12345-678

    // Preencher o formulário de detalhes de faturamento com os dados gerados usando cypress
    cy.get('#billing_company').clear().type(companyName);
    cy.get('#billing_address_1').clear().type(address);
    cy.get('#billing_address_2').clear().type(address2);
    cy.get('#billing_city').clear().type(city);
    cy.get('#billing_postcode').clear().type(cep);
    cy.get('#billing_phone').clear().type(phone);
};

// Função para gerar dados aleatórios FAKER para formulário na página "Detalhes de faturamento" da EBAC Shop durante o checkout em Português de Portugal
function billDetailsMethodPT() {
    
};

// Função para gerar dados aleatórios FAKER para formulário na página "Detalhes de faturamento" da EBAC Shop durante o checkout em Alemão
function billDetailsMethodDE() {

};

// Função criada para limpar o carrinho antes de iniciar um novo fluxo End-To-End na Loja Ebac Shop.
function clearCartUntilMessage() {
            cy.get('body').then(($body) => {
                // Verifica se a mensagem "Seu carrinho está vazio." está presente
                if ($body.find('.cart-empty').length > 0 && $body.find('.cart-empty').text().includes('Seu carrinho está vazio.')) {
                    cy.log('Carrinho está vazio. Parando o loop.');
                    cy.logout();
                } else {
                    // Se a mensagem não estiver presente, limpa o próximo item e chama a função novamente
                    productsPage.clearCart(0);
                    cy.wait(500); // Aguarda um pouco antes de verificar novamente
                    clearCartUntilMessage(); // Chamada recursiva
                }
            });
        };

// Exportando a função "billDetailsMethodxx" para uso em outros arquivos de teste
export { billDetailsMethodBR };
export { billDetailsMethodPT };
export { billDetailsMethodDE };
// Exportando a função "clarCartUntilMessage" para uso em outros arquivos de teste
export { clearCartUntilMessage };