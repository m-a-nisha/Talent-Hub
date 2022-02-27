
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App'
// import AddBio from './AddBio';
import UploadProfile from './UploadProfile';
import { Link } from 'react-router-dom'
import Loader from '../common/Loader';
export default function Profile() {
  const [mypics, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [image, setImage] = useState(state ? state.pic : "https://res.cloudinary.com/adaisha/image/upload/v1645342671/blank-profile-picture-g3dbc83ad3_1280_mnlood.png")
  const [url, setUrl] = useState(undefined)
  const [profile, setProfile] = useState(state ? state.pic : undefined)
  const [load, setload]=useState(false)

  useEffect(() => {
    fetch('/api/post/mypost', {
      headers: {
        "auth-token": localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        setData(result)
      })
  }, [])
  // console.log(state);
  useEffect(() => {
    if (profile) {
      // console.log(profile)
      uploadPic();
    }
    // else {
    //   setload(false)
    // }
  }, [profile])

  const uploadPic = () => {
    const data = new FormData()
    data.append("file", profile)
    data.append("upload_preset", "social-Network")
    data.append("cloud_name", "adaisha")
    return (
      fetch("https://api.cloudinary.com/v1_1/adaisha/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          setUrl(data.secure_url)
          uploadToDatabase(data)
        })
        .catch(err => {
          // console.log(err)
          setload(false)
        })
    )
  }

  const uploadToDatabase = (data) => {
    fetch("/api/profile/updatepic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        pic: data.secure_url
      })
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
        localStorage.setItem("user", JSON.stringify({ ...state, pic: data.secure_url }))
        dispatch({ type: "UpdatePic", payload: data.secure_url })
        setload(false)
      })
    .catch(setload(false))
  }
  const uploadProfile = () => {
    setload(true)
    setProfile(image)
    // console.log(image)
    // console.log(profile.length>1?profile:"Hello")
  }

  const handlefile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const removeProfile = (e) => {
    e.preventDefault();
    setImage("https://res.cloudinary.com/adaisha/image/upload/v1644070998/blank-profile-picture-g3dbc83ad3_1280_dqxg3p.png")
  }

  const checkurl = (url, id) => {
    const type = "mp4"
    const ext = url.substring(url.lastIndexOf(".") + 1);
    // console.log(ext)
    if (ext === type) {
      return (
        <Link to={`/${id}`} >
          <video style={{ boxShadow: "0px 0px 5px gray" }} className='AllPost' controls preload="auto" loop={true} autoPlay={true} src={url}></video>
        </Link>

      )
    }
    else {
      return (
        <Link to={`/${id}`} >
          <img style={{ boxShadow: "0px 0px 5px gray" }} className='AllPost' src={url} alt="" />
        </Link>
      )
    }
  }


  return (
    <>
      {!load?
        state ?
        <div className='profilesection2' style={{ margin: "5px 35px 5px 35px",paddingBottom:"10px" }}>
          <div className="profile_section my-2 mx-auto" style={{ display: "flex", justifyContent: "center" }}>
            <div className="">
              <div className='p-2 editSection' >
                <img className="profile_img p-1" src={url ? url : state ? state.pic : ""} alt="" />
                <i className="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                <UploadProfile image={image} handlefile={handlefile} removeProfile={removeProfile} uploadProfile={uploadProfile} />
                {/* <i className="fas fa-user-edit " ></i> */}
              </div>

            </div>
            <div className=" p-2 user">

              <div className="user_details p-2">
                <h4>{state ? state.name : "loading"}</h4>
                <div>
                  <span className='me-2'><strong>{mypics.length}</strong> posts</span>

                  <span className='me-2'><strong>{state ? state.followers.length : 0}</strong> following</span>
                  <span className='me-2'><strong>{state ? state.following.length : 0}</strong> followers</span>
                </div>

                {/* <p style={{fontSize:"0.75em", margin:"7px 0px 0px 0px"}} data-bs-toggle="modal" data-bs-target="#Bio"><i className="fas fa-plus"></i> Write something about you</p>
            <AddBio /> */}
              </div>
            </div>

          </div>
          <hr />
          <div >
            <div id="postbox">
              {mypics.map(img => (
                <div className='col-4 my-2' style={{ margin: "2px 2px", boxShadow: "0px 0px 2px black"}} key={img.url} >
                  {checkurl(img.url, img._id)}
                  {/* <img className='AllPost my-2' src={img.url} alt="" /> */}
                </div>
              ))}
            </div>
          </div>

        </div>
        :
          <Loader />
        :
        <Loader/>
}
    </>
  );
}
