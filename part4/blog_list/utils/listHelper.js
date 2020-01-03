const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reduce = blogs.reduce((sum, item) => sum+item.likes, 0)
  return reduce
}

const favoriteBlogs = blogs => {
  let max = 0
  let favorite = null
  blogs.forEach(blog => {
    if (blog.likes >= max) {
      favorite = blog
      max = blog.likes
    }
  })

  return favorite
}

const mostBlogs = blogs => {
  const result = _(blogs)
  .groupBy('author')
  .map((items, author) => ({ author, blogs: items.length }))

  let max = 0
  let favorite = null
  result.forEach(blog => {
    if (blog.blogs >= max) {
      favorite = blog
      max = blog.blogs
    }
  })

  return favorite
}

const mostLikes = blogs => {
  const result = _(blogs)
  .groupBy('author')
  .map((items, author) => ({ author, likes: totalLikes(items) }))

  let max = 0
  let favorite = null
  result.forEach(blog => {
    if (blog.likes >= max) {
      favorite = blog
      max = blog.likes
    }
  })

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
}
