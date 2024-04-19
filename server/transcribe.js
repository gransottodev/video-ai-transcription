import { config } from 'dotenv'
import OpenAI from 'openai'
import fs from 'fs'
config()

const openai = new OpenAI()


export async function transcribe() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "whisper-1",
    response_format: "verbose_json",
    timestamp_granularities: true,
  });

  return transcription.segments
}