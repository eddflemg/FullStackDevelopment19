import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('Simple Blog', () => {
  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mathias Led',
      likes: 5
    }

    const component = render(
      <SimpleBlog blog={blog} onClick={() => {console.log('Clicked')}} />
    )

    const title = component.container.querySelector('.author')
    expect(title).toHaveTextContent(`${blog.title} ${blog.author}`)

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(`blog has ${blog.likes} likes`)
  })

  test('double click like', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mathias Led',
      likes: 5
    }

    const mockHandler = jest.fn()

    const { getByText } =  render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
