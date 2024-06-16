import { useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import styles from "./CardPage.module.scss"
import { Link } from 'react-router-dom'
import Plyr from "plyr"
import Hls from "hls.js"
import { useMyData } from '../servises/context'

function CardPage() {
  const location = useLocation()
  const { showPopUp, itemsActions } = useMyData()
  const id = location.pathname.split('/')[2]
  const [obj, setObj] = useState({ title: "", content: "", ceratedAt: "", mediaFilePath: "" })
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadVideo = async (path) => {
      const video = document.getElementById("player");
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(path);
        const defaultOptions = {}

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          const availableQualities = hls.levels.map((l) => l.height)
          defaultOptions.controls = [
            'play-large', // The large play button in the center
            'restart', // Restart playback
            'rewind', // Rewind by the seek time (default 10 seconds)
            'play', // Play/pause playback
            'fast-forward', // Fast forward by the seek time (default 10 seconds)
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'mute', // Toggle mute
            'volume', // Volume control
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'fullscreen', // Toggle fullscreen
          ];
          defaultOptions.quality = {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (e) => updataQuality(e)
          }
          new Plyr(video, defaultOptions)
        });
        hls.attachMedia(video);
        window.hls = hls;
      }
      function updataQuality(e) {
        window.hls.levels.forEach((levels, levelIndex) => {
          if (levels.height === e) {
            window.hls.currentLevel = levelIndex
          }
        })
      }
    };

    async function getItem() {
      await axios.get(`http://109.123.154.239:8080/api/v1/posts/${id}`).then((response) => {
        loadVideo(response.data.mediaFilePath);
        setLoading(false);
        setObj(response.data);
        const temp = response.data.hashTags.map(el => (Object.values(el)[0]));
        setTags(temp);
      })
    }
    getItem()
  }, [])

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <svg className={styles.spinner} viewBox="0 0 50 50">
            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
        </div>
      ) : (
        <>
          {showPopUp &&
            <div className="popup">
              <div className={showPopUp}>
                {
                  (showPopUp == 'proccess') ? (<p>Идет загрузка видео...</p>) :
                    (showPopUp == 'success') ? (<p>Загружено успешно!</p>) :
                      (<p>Ошибка загрузки, <br></br> Код ошибки: {showPopUp}</p>)
                }
                <button className="popupBtn" onClick={() => { itemsActions.setPopUp('') }}>Закрыть</button>
              </div>

            </div>
          }
          <div className={styles.devider}>
            <div className={styles.wrapper}>
              <h1>{obj.title}</h1>

              <div className={styles.media}>
                <video id="player" controls></video>
              </div>

              <p>{obj.content}</p>

            </div>
            <Link to="/" className={styles.backBtn}>
              <h2>Назад</h2>
              <img src="/undo.svg" alt="" width={35} height={35} />
            </Link>
          </div>

          <div className={styles.tags}>
            {tags && (tags.map(el => (
              <p className={styles.tag} key={el}>#{el}</p>
            )))}
          </div>
        </>
      )}

    </>
  )
}

export default CardPage