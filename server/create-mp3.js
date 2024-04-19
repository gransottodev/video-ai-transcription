import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

export const createMP3 = () => new Promise((resolve, reject) => {
  ffmpeg.setFfmpegPath(ffmpegStatic);

  ffmpeg()
    .input('audio.mp4')

    .outputOptions('-ab', '20k')

    .saveToFile('audio.mp3')

    .on('end', () => {
      fs.unlink('audio.mp4', (err) => {
        if(err){
          console.log('erro');
        }

        console.log('Deletado');
      })
      resolve()
    })

    .on('error', (error) => {
      console.error(error);
      reject(error)
    });
})