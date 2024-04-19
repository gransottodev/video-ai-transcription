import { loadingMessage } from "./loading.js";

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null

export function getVideoId(url){
  const [_, part2] = url.split("?v=")
  const [videoId, __] = part2.split("&")

  return videoId
}

export function loadVideo(url){
  loadingMessage('Carregando video do youtube')

  return new Promise((resolve, reject) => {
    window.YTPlayer = new YT.Player('youtubeVideo', {
      videoId: getVideoId(url),
      events: {
        'onReady': () => resolve(),
      }
    })
  })
}