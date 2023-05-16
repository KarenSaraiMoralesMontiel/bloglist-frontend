import React, {useState} from "react"

const BlogForm = ({
  createBlog, 
}) => {
  const [newBlog, setNewBlog] = useState({title: '' , author: '' , url: ''})

  const handleAuthor = (event) => {
    setNewBlog({...newBlog , author: event.target.value})
  }

  const handleTitle = (event) => {
    setNewBlog({...newBlog , title: event.target.value})
  }

  const handleUrl = (event) => {
    setNewBlog({...newBlog, url: event.target.value})
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0
    })

    setNewBlog({title: '' , author: '' , url: ''})
  }
  
    return (
      <div>
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id='title'
          type="text"
          value={newBlog.title}
          name="Title"
          placeholder="Title"
          onChange={handleTitle}
        />
      </div>

      <div>
        author
        <input
          id='author'
          type="text"
          value={newBlog.author}
          name="Author"
          placeholder="Author"
          onChange={handleAuthor}
        />
      </div>

      <div>
        url
        <input
          id='url'
          type="text"
          value={newBlog.url}
          name="Url"
          placeholder="Url"
          onChange={handleUrl}
        />
      </div>

      <button id="create-button" type="submit">create</button>
    </form>
    </div>)
}

export default BlogForm