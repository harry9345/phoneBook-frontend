describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2021'
    );
  });

  it('front page contains random text', function () {
    cy.contains('wtf is this app?');
  });

  it('login form can be open', function () {
    cy.contains('log in').click();
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('ali');
    cy.get('#password').type('salam');
    cy.get('#login-button').click();

    cy.contains('ali log in');
  });
  describe('when log in', () => {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('input:first').type('ali');
      cy.get('input:last').type('salam');
      cy.get('#login-button').click();
    });
    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});
