import Blog from './Blog'
import React from 'react';

const Blogs = ({blogs, setBlogs}) => {

  /*const searchResults = searching
    ? persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    : persons*/
  //if (searching) setSearch('');
  const rows = () => blogs.map(
    blog => <Blog blog={blog} key={blog.id}/>
  )

  return(
    <div>
      <h2>Blogs</h2>
      <div>{rows()}</div>
    </div>
  )
}

export default Blogs
