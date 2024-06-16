import Header from '../header/header'
//missing provider now in main.jsx
import { Route, Routes } from 'react-router-dom'
import AdminPage from './AdminPage'
import EditPost from './EditPost'
import CreatePost from './CreatePost'
import MainPage from './mainPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" Component={MainPage} />
        <Route path="/admin" Component={AdminPage} />
        <Route path="/editPost/:postId" Component={EditPost} />
        <Route path="/createPost" Component={CreatePost} />
      </Routes>
    </>
  )
}

export default App