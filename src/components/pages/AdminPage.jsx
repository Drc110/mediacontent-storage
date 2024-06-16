import styles from "./AdminPage.module.scss"
import { useMyData } from '../servises/context'
import { Link } from "react-router-dom"

function AdminPage() {
    const { items, showPopUp, itemsActions } = useMyData()

    return (
        <>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Админ-панель</h1>
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
                <div className={styles.top}>
                    <Link to={"/createPost"}>
                        <h2>Создать запись</h2>
                    </Link>
                    <Link to="/" className={styles.backBtn}>
                        <h2>Назад</h2>
                        <img src="/undo.svg" alt="" width={35} height={35} />
                    </Link>
                </div>

                <div className={styles.post}>
                    <h3>Название</h3>
                    <h3>Дата создания</h3>
                </div>

                {items.map(el => (
                    <div className={styles.post} key={el.id}>
                        <p>{el.title}</p>
                        <p>{el.createdAt.split('.')[0].replace('T', ' ')}</p>
                        <Link to={`/editPost/${el.id}`}>
                            <h3>Редактировать</h3>
                        </Link>
                        <h3 className={styles.delete} onClick={() => itemsActions.deleteItem(el.id)}>Удалить</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AdminPage