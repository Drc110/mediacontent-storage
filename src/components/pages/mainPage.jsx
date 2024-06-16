import styles from './App.module.scss'
import CardItem from '../cardItem/cardItem'
import CardPage from './CardPage'
//missing provider now in main.jsx
import { useMyData } from '../servises/context'
import { Route, Routes } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom'

function MainPage() {
  const { ref, inView } = useInView({
    threshold: 0.9,
  })

  const { items, showPopUp, itemsActions, tags } = useMyData()

  const test1 = debounce(() => {
    itemsActions.loadNext()
  }, 500)

  useEffect(() => {
    if (inView) {
      test1()
    }
  }, [])

  return (
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
      <div className={styles.content}>
        <div className={styles.drawer}>
          <div className={styles.sidebar}>
            <Link to="/" className={styles.sidebarItem}>
              <img src="/fire.svg" width={30} height={30} />
              <p>Популярное</p>
            </Link>
            <Link to="/" className={styles.sidebarItem}>
              <img src="/new.svg" width={30} height={30} />
              <p>Свежее</p>
            </Link>
            <Link to="/admin" className={styles.sidebarItem}>
              <img src="/account.svg" width={30} height={30} />
              <p>Аккаунт</p>
            </Link>
          </div>
          <p className={styles.tagsTop}>Теги</p>
          <ul>
            {Object.entries(tags).sort((a, b) => { return b[1] - a[1] }).map(el => (
              <li key={el[0]} className={styles.tags}>
                <span>#{el[0]}</span>
                <span>{el[1]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={
              <>
                <div className={styles.display}>
                  {items.map(el => (
                    <CardItem key={el.id} value={el} />
                  ))}
                </div>
                <div ref={ref} className={styles.intersection}></div>
              </>
            } />
            <Route path="/post/:postId" Component={CardPage} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default MainPage