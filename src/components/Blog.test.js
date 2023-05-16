import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom';
import Blog from './Blog'

describe('renders content', () => {
  const user = {id: '213', username: 'ana', name: 'Ana Lucia', password:'lisa'}
  const blog = {
    title: '5 things people have lied to you about it',
    author: 'Ana',
    url: 'www.ana.com',
    likes: 10,
    user: user.id
  }

  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(user)
  )

  const handleDelete = jest.fn()
  const addLikes = jest.fn()
  let component
  beforeEach(() => {
    component = render(<Blog blog={blog} handleDelete={handleDelete} addLikes={addLikes} />);
  })

  test('renders title and author but not url or likes by default', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('5 things people have lied to you about it Ana')
  })

  test('renders url and likes when "create view" button is clicked', () => {
    const button = component.getByText('create view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableDetails')
    expect(div).toHaveStyle('display: block')
    expect(div).toHaveTextContent('www.ana.com')
    expect(div).toHaveTextContent('10')
  });

  test('addLikes is called twice when the like button is clicked twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(addLikes).toHaveBeenCalledTimes(2)
  });
})
