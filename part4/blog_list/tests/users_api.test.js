const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f7",
    username: "Micha",
    name: "Michael Chan",
    passwordHash: "dsaiou92",
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    username: "Beate",
    name: "Beate Chan",
    passwordHash: "dsaiou92",
    __v: 0
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  for (let initUser of initialUsers) {
    let user = new User(initUser)
    await user.save()
  }
})

describe('User tests', () => {
  test('bad request - password', async () => {
    const newUser = {
      username: 'Max',
      name: 'Maximilian',
      password: '12'
    }

    const user = new User(newUser)
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(initialUsers.length)
  })

  test('bad request - username', async () => {
    const newUser = {
      username: 'Ma',
      name: 'Maximilian',
      password: '12332'
    }

    const user = new User(newUser)
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(initialUsers.length)
  })

  test('bad request - double username', async () => {
    const newUser = {
      username: 'Beate',
      name: 'Maximilian',
      password: '12321'
    }

    const user = new User(newUser)
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
