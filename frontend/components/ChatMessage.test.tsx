import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import ChatMessage from '@/components/ChatMessage'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { 'question-id': 1 },
  }),
}))

const question = {
  id: 1,
  created_at: new Date('2023-01-01'),
  updated_at: new Date('2023-01-01'),
  tutor_answers: [
    {
      id: 1,
      text: 'Tutor Answer 1',
      created_at: new Date('2023-01-01'),
      tutor_id: 1,
      student_question_id: 1,
      updated_at: new Date('2023-01-01'),
    },
    {
      id: 2,
      text: 'Tutor Answer 2',
      created_at: new Date('2023-01-02'),
      tutor_id: 1,
      student_question_id: 1,
      updated_at: new Date('2023-01-02'),
    },
  ],
  student_comments: [
    {
      id: 3,
      text: 'Student Comment',
      created_at: new Date('2023-01-03'),
      tutor_id: 1,
      student_question_id: 1,
      updated_at: new Date('2023-01-03'),
    },
  ],
  image_urls: ['image1.jpg'],
  text: 'Question Text',
  student_id: 1,
  closed_at: new Date('2023-01-04'),
}

const sendFunction = jest.fn()

test('ChatMessage component tests with middleware as student', () => {
  const middleware = 'student'
  const component = renderer.create(
    <ChatMessage
      middleware={middleware}
      question={question}
      sendFunction={sendFunction}
    />,
  )
  const root = component.root

  // メッセージがstudentから送信されたものとして正しくレンダリングされていることを確認
  const messagesSent = root.findAllByProps({ className: 'msg sent' })
  expect(
    messagesSent.some(
      (m) =>
        typeof m.children[0] === 'object' &&
        m.children[0].props.children === 'Student Comment',
    ),
  ).toBe(true)

  // メッセージがtutorからの回答として正しくレンダリングされていることを確認
  const messagesReceived = root.findAllByProps({ className: 'msg received' })
  expect(
    messagesReceived.some(
      (m) =>
        typeof m.children[0] === 'object' &&
        m.children[0].props.children === 'Tutor Answer 1',
    ),
  ).toBe(true)
  expect(
    messagesReceived.some(
      (m) =>
        typeof m.children[0] === 'object' &&
        m.children[0].props.children === 'Tutor Answer 2',
    ),
  ).toBe(true)
})

test('ChatMessage component tests with no image_urls', () => {
  const middleware = 'tutor'
  const questionNoImage = { ...question, image_urls: [] }
  const component = renderer.create(
    <ChatMessage
      middleware={middleware}
      question={questionNoImage}
      sendFunction={sendFunction}
    />,
  )
  const root = component.root

  // 画像がレンダリングされていないことを確認
  const imageElement = root.findAllByType('img')
  expect(imageElement).toHaveLength(0)
})

test('ChatMessage component tests when question is closed', () => {
  const middleware = 'tutor'
  const component = renderer.create(
    <ChatMessage
      middleware={middleware}
      question={question}
      sendFunction={sendFunction}
    />,
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  const root = component.root

  // メッセージ入力フォームが表示されていないことを確認
  const sendMessageComponent = root.findAllByProps({ sender_role: middleware })
  expect(sendMessageComponent).toHaveLength(0)

  // 質問のテキストが表示されていることを確認
  const questionTextComponent = root.findAllByProps({ children: question.text })
  expect(questionTextComponent).toHaveLength(1)

  // 画像が表示されていることを確認
  const imageElement = root.findAllByType('img')
  expect(imageElement[0].props.src).toBe(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/image1.jpg`,
  )

  // メッセージが正しい順序で表示されていることを確認
  const messages = root.findAllByType('p')
  expect(messages[0].props.children).toBe('Question Text')
  expect(messages[1].props.children).toBe('Tutor Answer 1')
  expect(messages[2].props.children).toBe('Tutor Answer 2')
  expect(messages[3].props.children).toBe('Student Comment')
})

test('ChatMessage component tests when question is not closed', () => {
  const middleware = 'tutor'
  const questionNotClosed = {
    ...question,
    closed_at: undefined,
  }

  const component = renderer.create(
    <ChatMessage
      middleware={middleware}
      question={questionNotClosed}
      sendFunction={sendFunction}
    />,
  )

  const root = component.root

  // メッセージ入力フォームが表示されていることを確認
  const sendMessageComponent = root.findAllByProps({ sender_role: middleware })
  expect(sendMessageComponent).toHaveLength(1)
})
