import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL, 
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken"
})

const reqParams = (interactionType, withComments) => ({params: { interaction: interactionType, withComments }})

class Interaction {
  static Like = (data, withComments) => instance.post(`interaction/`, data, reqParams('like', withComments))
  static Unlike = (setupId, withComments) => instance.delete(`interaction/${setupId}`, reqParams('like', withComments))
  static Favourite = (data, withComments) => instance.post(`interaction/`, data, reqParams('favourite', withComments))
  static Unfavourite = (setupId, withComments) => instance.delete(`interaction/${setupId}`, reqParams('favourite', withComments))
  static PostComment = (data) => instance.post(`interaction/`, data, reqParams('comment', true))
  static DeleteComment = (commentId) => instance.delete(`interaction/${commentId}`, reqParams('comment', true))
}

export default Interaction