import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls onSubmit with the right details when a new blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: '5 things to do in your lifetime' }
    })

    fireEvent.change(inputAuthor, {
      target: { value: 'Ana Karolina' }
    })

    fireEvent.change(inputUrl, {
      target: { value: 'http://example.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: '5 things to do in your lifetime',
      author: 'Ana Karolina',
      url: 'http://example.com',
      likes: 0
    })
  })
})

