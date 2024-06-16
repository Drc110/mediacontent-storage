import { createContext, useContext, useState } from 'react';
import axios from 'axios';

let pageNum = 0

const deletePost = async (id) => {
  await axios.delete(`http://109.123.154.239:8080/api/v1/dashboard/delete/${id}`)
}

async function fetchData() {
  return await axios.get(`http://109.123.154.239:8080/api/v1/posts?page=${pageNum}`).then((response) => response.data.content);
}
const temp = await fetchData();

async function fetchTags() {
  return await axios.get(`http://109.123.154.239:8080/api/v1/hashtags`).then((response) => response.data);
}
const tempTags = await fetchTags();

const MyDataContext = createContext();

export function useMyData() {
  return useContext(MyDataContext);
}

export function MyDataProvider({ children }) {
  const [items, setItems] = useState(temp);
  const [showPopUp, setShowPopUp] = useState('');
  const [tags, setTags] = useState(tempTags);

  const itemsActions = {
    loadNext: async() => {
      pageNum++
      const temp = await fetchData()
      temp.length ? setItems([...items, ...temp]) : pageNum--
    },
    setPopUp: (newState) => {
      setShowPopUp(newState)
    },
    deleteItem: (id) =>{
      deletePost(id)
      const filtered = items.filter(el => el.id != id)
      setItems(filtered)
    }
  }

  return (
    <MyDataContext.Provider value={{items, itemsActions, showPopUp, tags}}>
      {children}
    </MyDataContext.Provider>
  );
}