import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserBlog = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogData) => {
  console.log(token)
  const config = {
    headers: { Authorization: token }
  }

  const blog = await axios.post(baseUrl, blogData, config)
  return blog.data
}


// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

const update = async (id,blogData) => {

  // const blog = await axios.post(baseUrl, blogData, config)
  const blog = await axios.put(`${baseUrl}/${id}`, blogData)
  return blog.data
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const blog = await axios.delete(`${baseUrl}/${id}`, config)
  return blog.data
}


const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default { getAll, getUserBlog, create, setToken, update, deleteBlog }