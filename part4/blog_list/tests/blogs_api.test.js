const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let initBlog of helper.initialBlogs) {
    let blog = new Blog(initBlog)
    await blog.save()
  }
})

test('number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('id check', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('add blog', async () => {
  const newBlog = {
    title: 'Hallo',
    author: 'me',
    url: 'www.google.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(contents).toContain('Hallo')
})

test('missing like', async () => {
  const newBlog = {
    title: 'Hallo',
    author: 'me',
    url: 'www.google.com'
  }

  const blog = new Blog(newBlog)
  await api
    .post('/api/blogs')
    .send(newBlog)

  console.log(blog._id.toString());
  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)
  expect(likes).toContain(0)
})

test('bad request', async () => {
  const newBlog = {
    author: 'me',
    likes: 2
  }

  const blog = new Blog(newBlog)
  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
