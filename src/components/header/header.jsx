import styles from './header.module.scss'
import { Link } from 'react-router-dom'
function Header() {

  return (
    <header>
      <div className={styles.textRight}>
        <Link to={"/"}>Новостной портал</Link>
      </div>
    </header>
  )
}

export default Header