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
import Page from './Components/Page'
import axios from 'axios';
function App() {
  //   const nameRes = {name: "/Courge", server:"https://server-courge.herokuapp.com"}

  // {name: "", server:"http://localhost:5000"}
  const initialState = {user: null, posts: [], post: null, search: ""}
  const [state, dispatch] = React.useReducer(AppReducer, initialState)
  const nameRes =  {name: "/Courge", server:"https://server-courge.herokuapp.com"}
  const siteName = window.location.pathname.split("/")[1]
  const checkCurrentUser = React.useCallback(async()=>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return;
      const option ={
        method:'get',
        url:nameRes.server+'/api/v1/auth',
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
            <Route exact path={`${nameRes.name}`} element={<Page nameRes={nameRes} />} />
            {/* <Route exact path={`${nameRes.name}`} element={<Posts nameRes={nameRes} />}/> */}
            <Route exact path={`${nameRes.name}/login.html`} element={<Login nameRes={nameRes} />}/>
            <Route exact path={`${nameRes.name}/register.html`} element={<Register nameRes={nameRes} />}/>
            <Route exact path={`${nameRes.name}/post/:postId`} element={<PostDetail nameRes={nameRes} />} />
            <Route exact path={`${nameRes.name}/cpadmin`} element={<Dashboard nameRes={nameRes} />} />
            <Route exact path={`${nameRes.name}/user`} element={<User nameRes={nameRes} />} />
            <Route exact path={`${nameRes.name}/*`} element={<div>The site not found</div>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
