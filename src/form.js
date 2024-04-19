import { startLoading, loadingMessage, stopLoading } from './loading'
import { renderText } from './render'
import { loadVideo, getVideoId } from './youtube-api'
import axios from 'axios'

const form = document.querySelector('#form')

export let data = null

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {
    loadingMessage('Start')
    startLoading()

    const formData = new FormData(form)
    const url = formData.get('url')

    await loadVideo(url)

    await axios.get('http://192.168.5.201:3000/audio?v=' + getVideoId(url))
    await axios.get('http://192.168.5.201:3000/transcription')
      .then(response => {
        data = response.data.text
        renderText(data)
      })

  } catch (error) {
    console.log(error);
  } finally {
    stopLoading()
  }
})