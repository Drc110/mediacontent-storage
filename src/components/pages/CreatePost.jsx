import axios from "axios"
import styles from "./CreatePost.module.scss"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useMyData } from '../servises/context'

function CreatePost() {
    const [tags, setTags] = useState([])
    const { showPopUp, itemsActions } = useMyData()

    const createNewPost = async (evt) => {
        evt.preventDefault()

        itemsActions.setPopUp('proccess')

        const myFormData = new FormData()
        myFormData.append("title", evt.target[0].value)
        myFormData.append("content", evt.target[1].value)
        myFormData.append("data", evt.target[2].files[0])
        myFormData.append("hashtags", tags)
        await axios.post(`http://109.123.154.239:8080/api/v1/dashboard/upload`, myFormData)
            .then(_ => itemsActions.setPopUp('success'))
            .catch(_ => itemsActions.setPopUp(_.code))
    }
    const addTag = (evt) => {
        evt.preventDefault()
        const val = document.getElementById('tagsField').value
        val && setTags([...tags, val])
    }
    const removeTag = (value) => {
        const filtered = tags.filter(el => el != value)
        setTags([...filtered])
    }
    return (
        <div className={styles.wrapper}>
            <div>
                <Link to="/admin" className={styles.backBtn}>
                    <h2>Назад</h2>
                    <img src="/undo.svg" alt="" width={35} height={35} />
                </Link>
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

                <h2>Создание записи</h2>
                <form method="post" onSubmit={createNewPost}>
                    <p>Заголовок: </p>
                    <input type="text" placeholder="Заголовок" />

                    <p>Содержание: </p>
                    <textarea rows={20} placeholder="Содержание" />

                    <p>Медиа файл: </p>
                    <input type="file" />

                    <p>Добавить теги: </p>
                    <div className={styles.tagsArea}>
                        <input type="text" placeholder="Теги" id="tagsField" />
                        <button onClick={addTag}>Добавить</button>
                    </div>
                    <div className={styles.tagsDisplay}>
                        {tags && tags.map(el => (
                            <div key={el} className={styles.tag}>
                                <h3>#{el}</h3>
                                <img src="/close.svg" alt="" width={30} height={30} onClick={() => removeTag(el)} />
                            </div>
                        ))}
                    </div>

                    <button type="submit">Отправить</button>
                </form>
            </div>

        </div>
    )
}

export default CreatePost