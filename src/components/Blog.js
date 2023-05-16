import React, { useState } from 'react'
const Blog = ({ blog, handleDelete, addLikes }) => {
  const [extraDetails, setExtraDetails] = useState(false)
  const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const showDetails = { display: extraDetails ? '' : 'none' }
  const showDelete = { display: blog.user.username === loggedUserJSON.username ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={ () => setExtraDetails(!extraDetails)}>{extraDetails === true ? 'hide' : 'create view'}</button>
        <div style={showDetails} className="togglableDetails">
          {blog.url}<br/> {blog.likes} <button className='likeButton' onClick={() => addLikes(blog)}>like</button><br/> {blog.user.name}<br/>
          <button className='deleteButton'style={showDelete} onClick={() => handleDelete(blog)}>remove</button>
        </div>
      </div>
    </div> )
}

export default Blog