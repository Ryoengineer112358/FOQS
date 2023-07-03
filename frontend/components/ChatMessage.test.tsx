import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ChatMessage from './ChatMessage'

test('ChatMessage component tests', () => {
  const question = {
    id: 1,
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-01'),
    tutor_answers: [
      { id: 1, text: 'Tutor Answer 1', created_at: new Date('2023-01-01'), tutor_id: 1, student_question_id: 1, updated_at: new Date('2023-01-01') },
      { id: 2, text: 'Tutor Answer 2', created_at: new Date('2023-01-02'), tutor_id: 1, student_question_id: 1, updated_at: new Date('2023-01-02') },
    ],
    student_comments: [
      { id: 3, text: 'Student Comment', created_at: new Date('2023-01-03'), tutor_id: 1, student_question_id: 1, updated_at: new Date('2023-01-03') },
    ],
    image_urls: ['image1.jpg'],
    text: 'Question Text',
    student_id: 1,
    //closed_at: null,
  }
  
  
  const middleware = 'tutor'
  const sendFunction = jest.fn()

  render(
    <ChatMessage
      middleware={middleware}
      question={question}
      sendFunction={sendFunction}
    />,
  )

  // メッセージ入力フォームが表示されていることを確認
  const sendMessageElement = screen.getByRole('button', { name: /send/i })
  expect(sendMessageElement).toBeInTheDocument()

  // 質問のテキストが表示されていることを確認
  const questionTextElement = screen.getByText(/Question Text/i)
  expect(questionTextElement).toBeInTheDocument()

  // 画像が表示されていることを確認
  const imageElement = screen.getByRole('img')
  expect(imageElement).toHaveAttribute(
    'src',
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/image1.jpg`,
  )

  // メッセージが正しい順序で表示されていることを確認
  const messages = screen.getAllByRole('article') // <p>タグの代わりに<article>タグを使用していると仮定
  expect(messages[0]).toHaveTextContent('Tutor Answer 1')
  expect(messages[1]).toHaveTextContent('Tutor Answer 2')
  expect(messages[2]).toHaveTextContent('Student Comment')
})
