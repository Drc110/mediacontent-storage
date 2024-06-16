import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./EditPost.module.scss"
import { Link } from "react-router-dom"
import { useMyData } from '../servises/context'

function EditPost() {
    const location = useLocation()
    const { showPopUp, itemsActions } = useMyData()
    const id = location.pathname.split('/')[2]
    const [obj, setObj] = useState({ title: "", content: "", tags: "", ceratedAt: "", mediaFilePath: "" })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getItem() {
            await axios.get(`http://109.123.154.239:8080/api/v1/posts/${id}`).then((response) => (setObj(response.data), setLoading(false)));
        }
        getItem()
    }, [])

    const saveEdit = async (evt) => {
        evt.preventDefault()
        const myFormData = new FormData()
        myFormData.append("title", evt.target[0].value)
        myFormData.append("content", evt.target[1].value)

        await axios.patch(`http://109.123.154.239:8080/api/v1/dashboard/patch/${id}`, myFormData)
    }

    return (
        <>
            {loading ? (
                <div className={styles.loading}>
                    <svg className={styles.spinner} viewBox="0 0 50 50">
                        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                </div>
            ) : (
                <div className={styles.wrapper}>
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
                    <div className={styles.grid}>
                        <Link to={`/admin`}>
                            <h3>Назад</h3>
                        </Link>
                        <h2>Редактирование записи</h2>
                    </div>
                    <form method="post" onSubmit={saveEdit}>
                        <span>
                            <p>Title: </p>
                            <input type="text" placeholder={obj.title} />
                        </span>
                        <span>
                            <p>Content: </p>
                            <textarea rows={20} placeholder={obj.content} />
                        </span>
                        <button type="submit">Отправить</button>

                    </form>
                </div>
            )}
        </>
    )
}

export default EditPost