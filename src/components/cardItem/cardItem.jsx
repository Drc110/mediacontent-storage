import styles from './cardItem.module.scss'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Plyr from "plyr"
import Hls from "hls.js"

function CardItem({value}) {
  const [tags, setTags] = useState([])
  useEffect(() => {
    const temp = value.hashTags.map(el => (Object.values(el)[0]));
    setTags(temp);

    const loadVideo = async (path) => {
      const video = document.getElementById("player" + value.id);
      if(Hls.isSupported()){
        let hls = new Hls();
        hls.loadSource(path);

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          new Plyr(video, {hideControls: false, captions: {active: true}}).toggleControls(false)
        });
        hls.attachMedia(video);
        window.hls = hls;
      }
    };
    loadVideo(value.mediaFilePath)
  }, [])
  
  return (
    <div className={styles.wrapper}>
      <Link to={`/post/${value.id}`}>
        <div className={styles.cardText}>
          <p className={styles.title}>{value.title}</p>
          <p className={styles.content}>{value.content}</p>
        </div>
        
        <div className={styles.media}>
          <video id={"player" + value.id}></video>
        </div>
        <p>{value.createdAt.split('T')[0]}</p>
      </Link>
      <div className={styles.tags}>
        {tags && (tags.map(el => (
          <p className={styles.tag} key={el}>#{el}</p>
        )))}
      </div>
    </div>
  )
}

export default CardItem