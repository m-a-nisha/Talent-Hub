import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import './css/phone.css'
import CommentModal from './common/CommentModal';
import HomeSection from './common/HomeSection';
import About from './Componenets/About';
import MyNetwork from './Componenets/MyNetwork';
import CreatePost from './Componenets/CreatePost';
import Home from './Componenets/Home';
import Popular from './Componenets/Popular';
import Navbar from './Componenets/Navbar';
import Profile from './Componenets/Profile';
import Reset from './Componenets/Reset';
import SignIn from './Componenets/SignIn';
import SignUp from './Componenets/SignUp';
import UploadProfile from './Componenets/UploadProfile';
import UserProfile from './Componenets/UserProfile'
import NewPassword from './Componenets/NewPassword'
import { reducer, initialState } from './reducer/UserReducer'
import SearchModal from './common/SearchModal';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({type:"USER", payload:user})
    }
    else {
      if (!location.pathname.startsWith('/reset')) {        
        navigate("/signIn")
      }
    }
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mynetwork" element={<MyNetwork/> } />
      <Route path="/popular" element={<Popular/> } />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/reset" element={<Reset/>} />
      <Route path="/reset/:token" element={<NewPassword/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/uploadProfile" element={<UploadProfile/>} />
      <Route path='/createPost' element={<CreatePost />} />
      <Route path='/profile/:userid' element={<UserProfile/>} />
      <Route path='/:postId' element={<CommentModal/>} />
      <Route path='/post/:title' element={<HomeSection/>} />
    </Routes>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("")
  const [userDetail, setDetails] = useState([])
  
  const handleSearch = (e) => {
    // console.log(e.target.value)
    const query = e.target.value;
    if (query.trim()==="") {
      return;
    }
    setSearch(query)
    fetch('/api/post/search-users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(result => {
      setDetails(result.user)
    })
  }
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <SearchModal handleSearch={handleSearch} userDetail={userDetail}/>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
