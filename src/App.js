import React, { useState, useEffect , useRef}   from 'react'

import Togglable from './components/Togglable'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [message,setMessage] = useState(null)
  const [number, setNumber] = useState(0)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes))
    )}, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLikes = async (blog) => {
    blog.likes = blog.likes + 1
    await blogService
      .update(blog.id,blog)
      .then(
        setBlogs(blogs.map(x => x.id !== blog.id ? x: blog))
      )
      .catch(() => {
        setNumber(1)
        setMessage(`Information from ${blog.name} was already deleted from server`)
        setTimeout(() => {
          setMessage(0)
        }, 5000)
        setBlogs(blogs.filter(x => x.id !== blog.id))
      })
  }
    
  const createBlog = async (blogObject) => {
     await blogService.create(blogObject)
    .then(response => {
      updateBlog()
      setMessage(`Added blog ${blogObject.title} by ${blogObject.author}`)
      setNumber(2)
      blogFormRef.current.toggleVisibility()
      setTimeout(()=> {
        setNumber(0)
        }, 5000)
    })
    .catch(error => {
      alert('Create, Blog exception')
      setMessage('Create, Blog exception')
      setNumber(1)
      setTimeout(()=> {
        setNumber(0)
        }, 5000)
      })

  }
  const updateBlog = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }
  const handleDelete = async (blog) => {
    if (window.confirm("Do you really want to leave?")) { 
        await blogService.deleteBlog(blog.id)
          .then(()=> {
            setBlogs(blogs.filter(x => x.id !== blog.id))
            setNumber(2)
            setMessage(`Blog ${blog.title} by ${blog.author} has been deleted`)
            setTimeout(() => {
            setMessage(0)
          }, 5000)
          })
          .catch(error => {
            setNumber(1)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(0)
            }, 5000)
            if(error.response.status !== 401){
              setBlogs(blogs.filter(x => x.id !== blog.id))
            }
          })
    }
  }

  const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload(false)
  }


  const handleLogin = async (event) => {
  event.preventDefault()

  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    ) 

    blogService.setToken(user.token)
    setUser(user)
    console.log(JSON.stringify(user))
    setUsername('')
    setPassword('')
  } catch (exception) {
    setMessage('Wrong credentials')
    setNumber(1)
      setTimeout(()=> {
        setNumber(0)
        }, 5000)
  }
}

const createForm = () => {
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm 
          createBlog={createBlog}
        />
      </Togglable>
    </div>
  )
}

  const loginForm = () => {
    return (
      <div>
    <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />  
    </div>)    
  }


  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} number={number}/>
      {user === null ? (
        loginForm()
      ) : (
        <div>
        <p>{user.name} logged in</p>
        <button id="logoutButton" onClick={handleLogout}>logout</button>
        {createForm()}
        {blogs.map(blog => 
        <Blog 
        key={blog.id} 
        blog={blog} 
        handleDelete={handleDelete}
        addLikes = {addLikes}/>
      )}
      </div>)}
    </div>
  )
}

export default App