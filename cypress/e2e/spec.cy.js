describe('URL shortener tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'urls.json' })
    cy.visit('http://localhost:3000')

  })
  it('should have a title', () => {
    cy.contains('URL Shortener')
  })

  it('should have existing shortened URLs', () => {
    cy.get('main')
      .find('.url')
      .contains('Awesome photo')
    cy.get('main')
      .find('.url')
      .find('a[href="http://localhost:3001/useshorturl/1"]')
    cy.get('main')
      .find('.url')
      .contains('Twitter')
    cy.get('main')
      .find('.url')
      .find('a[href="http://localhost:3001/useshorturl/2"]')
  })

  it('should display a form with proper inputs', () => {
    cy.get('main')
      .find('form')
      .find('input[name="title"]')
      .should('have.attr', 'placeholder', 'Title...')
    cy.get('main')
      .find('form')
      .find('input[name="urlToShorten"]')
      .should('have.attr', 'placeholder', 'URL to Shorten...')
  })

  it('should have proper values in the form when it is filled out', () => {
    cy.get('main')
      .find('form')
      .find('input[name="title"]')
      .type('YouTube')
      .should('have.value', 'YouTube')
    cy.get('main')
      .find('form')
      .find('input[name="urlToShorten"]')
      .type('https://www.youtube.com/')
      .should('have.value', 'https://www.youtube.com/')
  })

  it('should post and display a new shortened url when the form is filled and submitted', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          "long_url": "https://www.youtube.com/",
          "title": "YouTube",
          "id": 4,
          "short_url": "http://localhost:3001/useshorturl/3"
        }
      })
    })
    cy.get('main')
      .find('form')
      .find('input[name="title"]')
      .type('YouTube')
    cy.get('main')
      .find('form')
      .find('input[name="urlToShorten"]')
      .type('https://www.youtube.com/')
    cy.get('main')
      .find('form')
      .find('button')
      .click()
    cy.get('main')
      .find('.url')
      .contains('YouTube')
    cy.get('main')
      .find('.url')
      .find('a[href="http://localhost:3001/useshorturl/3"]')
    cy.get('main')
      .find('.url')
      .contains('https://www.youtube.com/')
  })
})

// When a user visits the page, they can view the page title and the existing shortened URLs
// When a user visits the page, they can view the Form with the proper inputs
// When a user fills out the form, the information is reflected in the input fields