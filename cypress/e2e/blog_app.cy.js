describe('Blog app', function() {
	const user1 = {
		username: 'ariety',
		name: 'Ariety Romanov',
		password: 'ari'
	  }
  
	  const badUser = {
		  username:'ariety',
		  name: 'alejandra',
		  password: "kaori"
	  }
  
	  const user2 = {
		username: 'analucia',
		name: 'Ana Lucia',
		password: 'ana'
	  }


	  
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

	
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
	
	cy.request('POST', 'http://localhost:3003/api/users/', user2)
	
    cy.visit('http://localhost:3000')

	})
	

	it('Login form is shown', function() {
		// ...
		cy.contains('Login')
		cy.contains('username')
		cy.contains('password')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
			// ...
			cy.get('#username').type(user1.username)
			cy.get('#password').type(user1.password)
			cy.get('#login-button').click()
			
    })

    it('fails with wrong credentials', function() {
			// ...
			cy.get('#username').type(badUser.username)
			cy.get('#password').type(badUser.password)
			cy.get('#login-button').click()
			cy.get('.error').contains('Wrong credentials')
    })
	})

	describe('When logged in', function() {
    beforeEach(function() {
			// log in user here
			cy.login({ username: user1.username, password: user1.password })
			cy.contains('Ariety Romanov logged in')
		})
	
	it('A blog can be created', function (){
		cy.contains('new blog').click()
		cy.get('#title').type('5 things to do before you kick the bucket')
    	cy.get('#author').type('Ana Lucia')
		cy.get('#url').type('www.paola.com')	
		cy.get('#create-button').click()
		cy.contains('Added blog 5 things to do before you kick the bucket by Ana Lucia')
	})

	it('A blog can be liked', function (){
		cy.contains('new blog').click()
		cy.get('#title').type('5 things to do before you kick the bucket')
    	cy.get('#author').type('Ana Lucia')
		cy.get('#url').type('www.paola.com')	
		cy.get('#create-button').click()
		cy.contains('create view').click()
		cy.get('.likeButton').click()
		cy.contains(1)
	})

	it('A blog can be deleted', function (){
		cy.contains('new blog').click()
		cy.get('#title').type('5 things to do before you kick the bucket')
    	cy.get('#author').type('Ana Lucia')
		cy.get('#url').type('www.paola.com')	
		cy.get('#create-button').click()
		cy.contains('create view').click()
		cy.get('.deleteButton').click()
		cy.wait(1000) // Wait for the post to be deleted
		//cy.url().should('contain', '/blogs') 
		cy.get('html').should('not.contain', '5 things to do before you kick the bucket')
	})

	it('A blog can only be deleted by its creator', function (){
		cy.contains('new blog').click()
		cy.get('#title').type('5 things to do before you kick the bucket')
    	cy.get('#author').type('Ana Lucia')
		cy.get('#url').type('www.paola.com')	
		cy.get('#create-button').click()
		cy.contains('create view').click()
		cy.get('#logoutButton').click()
		cy.get('#username').type('analucia')
			cy.get('#password').type('ana')
			cy.get('#login-button').click()
		cy.contains('create view').click()
		cy.get('.deleteButton').should('have.css', 'display', 'none')
	})

	it('ordered by Likes', function() {

		cy.createBlog('5 things to do before you kick them','Lila', 'www.kick.com', 2)
		cy.createBlog('How to study for your exams!','Anastasia', 'www.exame.com', 1)
		cy.createBlog('Im almost done with this project and I really want it to be over!!!!!','Jocelyn Michelle', 'www.helpImTired.com', 7)

		cy.get('.blog').eq(0).should('contain', 'Im almost done with this project and I really want it to be over!!!!!')
		cy.get('.blog').eq(1).should('contain', '5 things to do before you kick them')
		cy.get('.blog').eq(2).should('contain', 'How to study for your exams!')
	})



  })

})