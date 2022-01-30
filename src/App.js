import * as React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import AppReducer from './Reducer/AppReducer'
import Posts from './Components/Posts'
import AppContext from './Components/AppContext'
import Appbar from './Components/Navbar'
import Login from './Components/Login'
import Register from './Components/Register'
import PostDetail from './Components/PostDetail'
import Dashboard from './Components/Admin/Controlpanel'
import User from './Components/User/Dashboard'
import axios from 'axios';
function App() {
  const initialState = {user: null, posts: [], post: null, search: ""}
  const [state, dispatch] = React.useReducer(AppReducer, initialState)
  const nameRes = "/Courge"
  console.log()
  const siteName = window.location.pathname.split("/")[1]
  const checkCurrentUser = React.useCallback(async()=>{
    try {
      const token = localStorage.getItem("token")
      const option ={
        method:'get',
        url:'/api/v1/auth',
        headers:{
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(option)
      if(response.data.data.user){
        const {userName, permission, id} = response.data.data.user
        dispatch({type: "CURRENT_USER", payload:{userName, permission, id}})
      }
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])
  React.useEffect(()=>{
    checkCurrentUser()
  }, [checkCurrentUser])
  return (
    <BrowserRouter>
      <AppContext.Provider value={{state, dispatch}}>
        <div className="App">
          {siteName !== "cpadmin" && <Appbar nameRes={nameRes} />}
          <Routes>
            <Route exact path="/" element={<Posts />}/>
            <Route exact path={`${nameRes}/login.html`} element={<Login />}/>
            <Route exact path={`${nameRes}/register.html`} element={<Register />}/>
            <Route exact path={`${nameRes}/post/:postId`} element={<PostDetail />} />
            <Route exact path={`${nameRes}/cpadmin`} element={<Dashboard />} />
            <Route exact path={`${nameRes}/user`} element={<User />} />
            <Route exact path="*" element={<div>The site not found</div>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
