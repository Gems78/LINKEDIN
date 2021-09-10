const { writer } = require("repl");

describe('Linkedin',function(){
    beforeEach(function(){
    cy.visit('https://es.linkedin.com/');
    //Function that accesses the file containing the user's credentials.
    cy.fixture('/user.json')
    .then (credentials => { 
        this.credentials = credentials;
     })
    });
    
    //Function correct login,create,edit and delete post
    it('login', function() {

        cy.contains('Iniciar').click();
        cy.get('#username').type(this.credentials.name);
        cy.get('#password').type(this.credentials.password);
        cy.get('.login__form_action_container ').click();
        cy.get('.scaffold-layout__sidebar').should('contain.text','Te damos la bienvenida')
        cy.contains('Crear publicación').click();
        cy.get('div.ql-editor.ql-blank').type('Create a new post');
        cy.contains('Publicar').click();
        cy.wait(500);
        cy.get('[aria-label="Abrir el menú de control"]').eq(0).click();
        cy.contains('Editar publi').click();
        cy.get('.ql-editor').clear().type('Modify the post');
        cy.contains('Guardar').click();
        cy.wait(1000);
        cy.get('[aria-label="Abrir el menú de control"]').eq(0).click();
        cy.contains('Borrar publi').click();
        cy.wait(500);
        cy.get('[type="button"]').contains('Borrar').click();
    });

    //Function that checks for incorrect user
    it('UserIncorrect', function() {

        cy.contains('Iniciar').click();
        cy.get('#username').type(this.credentials.noname);
        cy.get('#password').type(this.credentials.password);
        cy.get('.login__form_action_container ').click();
        cy.get('#error-for-username').should('contain.text','Introduce un nombre de usuario válido');
    })

    //Function that checks for incorrect password
    it('PassIncorrect', function() {

        cy.contains('Iniciar').click();
        cy.get('#username').type(this.credentials.name);
        cy.get('#password').type(this.credentials.nopassword);
        cy.get('.login__form_action_container ').click();
        cy.get('#error-for-password').should('contain.text','Esa no es la contraseña. Vuelve a intentarlo o');
    })
})
