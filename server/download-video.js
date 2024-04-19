import ytdl from "ytdl-core";
import fs from 'fs'

export const downloader = (videoId) => new Promise((resolve, reject) => {
  const videoURL = 'https://youtube.com/watch?v=' + videoId

  console.log('[START-DOWNLOAD]', videoURL);

  ytdl(videoURL, {
    quality: "lowestaudio",
    filter: "audioonly"
  })
  .on('end', () => {
    console.log('Acabou');
    resolve()
  })
  .on('error', () => {
    console.log('erro')
    reject('Falha no dowload')
  })
  .pipe(fs.createWriteStream('audio.mp4'))
})