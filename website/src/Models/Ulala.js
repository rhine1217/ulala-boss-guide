import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

class Ulala {
  static BossList = () => instance.get(`boss/`)

  // static ClassList = () => instance.get(`class`)

  static SkillList = () => instance.get(`skill/`)

  static ToyList = () => instance.get(`toy/`)

}

export default Ulala