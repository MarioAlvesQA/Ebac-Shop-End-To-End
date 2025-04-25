// Created by: Mario Alves
// Date: 2025-04-23
// This file contains the productsPage class which contains methods to interact with the products page of the website Loja Ebac Shop.
class productsPage {
    // Search product by name
    searchProduct(productName){
        cy.get(`.tbay-search`).eq(1).type(productName)
        cy.get(`.button-search`).eq(1).click()
    };

    // Chose product attributes like size, color and quantity
    chooseProductsAttributes(size, color, quantity){
        cy.wait(1000)
        cy.get(`.button-variable-item-${size} `).click()
        cy.get(`.button-variable-item-${color} `).click()
        cy.get('.input-text').clear().type(quantity)
    };

    // Add product to cart
    addToCart(){
        cy.get('.single_add_to_cart_button').click()
    };

    // Go to cart page
    goToCart(){
        //cy.get('.woocommerce-message').click()
        cy.get('#cart > .dropdown-toggle').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()        
    };

    // Proceed to checkout page
    checkOut(){
        cy.get('.checkout-button').should('have.attr', 'class', 'checkout-button button alt wc-forward')
        cy.get('.checkout-button').click()
    };

    // Proceed to checkout page with immediate checkout option
    immediateCheckout(){

    };

    // Validate if the products are in the cart
    checkProductInCart(productName, quantity, eQuantity,eName){
        
        //cy.get('.woocommerce-mini-cart__empty-message').should('not.exist')
        cy.get(':nth-child(1) > .product-quantity > .quantity > .input-text').eq(eName).should('contain', quantity)
        cy.get(':nth-child(1) > .product-name > a').eq(eQuantity).should('contain', productName)
    };
    
    // Method created to clear the cart
    clearCart(item){
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').eq(item).click()
    };
    
    // Method to check all payment methods available in the checkout page
    paymentMethodTestAll(){
        cy.get('#payment_method_cod').click()
        cy.get('#payment_method_bacs').click()
        cy.get('#payment_method_cheque').click()
    };
    
    // Chose payment method by "Pagar na entrega"
    paymentMethodEntrega(){
        cy.get('#payment_method_cod').click()
        cy.get('.wc_payment_method.payment_method_cod > .payment_box > p').should('contain', 'Pagar em dinheiro na entrega.')
        cy.get('#terms').click()
    };
    
    // Chose payment method by "Transferência bancária"
    paymentMethodTransferencia(){
        cy.get('#payment_method_bacs').click()
        cy.get('.wc_payment_method.payment_method_bacs > .payment_box > p').should('contain', 'Faça seu pagamento diretamente em nossa conta bancária. Se possível informe o ID do seu pedido como identificação do seu depósito ou transferência. Para pagamentos via DOC, seu pedido não será enviado enquanto o pagamento não for compensado.')
        cy.get('#terms').click()
    };
    
    // Chose payment method by "Cheque"
    paymentMethodCheque(){
        cy.get('#payment_method_cheque').click()
        cy.get('.wc_payment_method.payment_method_cheque > .payment_box > p').should('contain', 'Envie seu cheque para Nome da loja, Rua da loja, Cidade da loja, Estado/País da loja, CEP da loja.')
        cy.get('#terms').click()
    };
    
    // Add comments to the order
    addComments(comments){
        cy.get('#order_comments').clear().type(comments)
    };
    
    // Validate if the order was placed successfully
    validarPedido(pedido){
        cy.visit('minha-conta/')
        cy.get('.woocommerce-MyAccount-navigation-link--orders > a').click()
        cy.get(':nth-child(1) > .woocommerce-orders-table__cell-order-number').click()
    };

};

export default new productsPage();