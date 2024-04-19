import express from "express";
import cors from 'cors'
import { downloader } from "./download-video.js";
import { createMP3 } from "./create-mp3.js";
import { transcribe } from "./transcribe.js";

const app = express()
app.use(cors())

app.get('/audio', async (req, res) => {
  const videoId = req.query.v

  try{
    await downloader(videoId)
    await createMP3()

  } catch(error){
    return res.send(error)
  }

  return res.send(videoId)
})

app.get('/transcription', async (req, res) => {
  const data = await transcribe()

  return res.json({
    text: data
  })
})

app.listen(3000, () => {
  console.log('Server on 3000🔥');
})
