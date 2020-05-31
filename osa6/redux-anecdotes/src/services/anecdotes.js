import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const data = { content: content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, data)
  return response.data
}

const update = async (data) => {
  await axios.put(baseUrl + '/' + data.id, data)
}

export default { getAll, createNew, update }
