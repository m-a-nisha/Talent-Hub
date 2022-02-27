import React, { useEffect, useState } from "react";
// import PostValidate from "../common/postValidate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

export default function CreatePost() {
  // const [state, setState] = useState({ title: "", body: "", image: " ", url: "", })
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("")
  const [url, setUrl] = useState("");
  const [load, setload] = useState(false);
  // const navigate = useNavigate()
  
  useEffect(() => {
    if (url.length > 0) {
      // console.log(url);
      fetch("/api/post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title: title,
          body: body,
          url: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("data: " + data);
          // console.log(url);

          if (data.error) toast.error(data.error);
          else {
            // console.log(data);
            toast.success("Posted Successfully");
            setload(false)
          }
        })
        .catch((err) => {
          toast.error(err);
          setload(false)
        })
        // .then(navigate("/"))
    }
  }, [url]);

  const handlePost = async () => {
    
    if (title.length === 0) {
      return toast.error("Choose a title")
    }
    if (image.length === 0 & video.length === 0) {
      return toast.error("select an image to post")
    }
    const data = new FormData();
    if (image.length > 0) {
      setload(true);
      data.append("file", image);
      data.append("upload_preset", "social-Network");
      data.append("cloud_name", "adaisha");
      return fetch("https://api.cloudinary.com/v1_1/adaisha/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUrl(data.secure_url);
        })
        .catch((err) => console.log(err));
    }
    if (video.length > 0) {
      setload(true);
      data.append("file", video);
      data.append("upload_preset", "social-Network");
      data.append("cloud_name", "adaisha");
      return fetch("https://api.cloudinary.com/v1_1/adaisha/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUrl(data.secure_url);
        })
        .catch((err) => console.log(err));
    }
  };

  const handlechange = (e) => {
    // console.log(e.target.value)
    const title = e.target.value;
    setTitle(title);
    // console.log(title);
  };
  const handlebody = (e) => {
    const body = e.target.value;
    setBody(body);
    // console.log(body);
  };
  const handlefile = (e) => {
    const size = e.target.files[0].size / 1000000;
    if (size > 20) {
      toast.error("Size limit is 20MB");
      e.target = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (e.target.files[0].type !== "video/mp4") {
          setImage(reader.result);
          setVideo("")
          // console.log(reader.result)
        }
        else {
          setVideo(reader.result)
          setImage("")
          // console.log(reader.result)
        }
      }
    };
    // console.log(e.target.files[0].size);
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      {!load ?
        <div className="createPost">

          <div id="createPostContainer">
            <ToastContainer />
            <form>
              <div className="m-1 p-1">
                {/* 
          <input type="text" id='name' className='post' autoComplete="off" onChange={handlechange} /> */}
                <div>
                  <label htmlFor="name" className='postLabel'>Title</label>
                </div>
                <select className='post' defaultValue={'DEFAULT'} onChange={handlechange}>
                  <option value="DEFAULT" disabled style={{ display: "none" }}></option>
                  <option value="Art">Art</option>
                  <option value="Designing">Designing</option>
                  <option value="Music">Music</option>
                  <option value="Writing">Writing</option>
                  <option value="Dance">Dance</option>
                </select>
              </div>

              <div className="m-1 p-1">
                <div>
                  <label htmlFor="body" className="postLabel">
                    Write something about your post{" "}
                  </label>
                </div>
                <textarea rows="3" cols="33" className="post" onChange={handlebody} />
              </div>

              <div className="m-1 p-1">
                <input
                  type="file"
                  name="Post"
                  className="post"
                  id="post_image"
                  onChange={handlefile}
                  accept="audio/*,video/*,image/*"
                />
                <label
                  className="labelButton uploadButton"
                  htmlFor="post_image"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{ color: "black" ,cursor:"pointer"}}
                >
                  Add <i style={{ color: "blue" }} className="fas fa-image"></i>
                </label>
                {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Upload Image
          </button> */}

                {/* {image.length >0 && ( */}
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
              
                >
                  <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content ">
                      <div className="modal-body">
                        {image.length > 1 ? (
                          <img src={image} alt="" className="CreatePostImage" />
                        ) :
                          video.length > 1 ?
                            <div>
                              <video className="CreatePostImage" src={video} autoPlay={true} preload="auto" loop={true}></video>
                            </div>
                            :
                            <div></div>

                        }
                        {/* {
                    video.length > 1 ?
                      <div>
                        <video src={video} autoplay preload="auto"></video>
                      </div>
                      :
                      <div></div>
                  } */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* )}  */}
              </div>
            </form>
            <div className="m-1 p-1" style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn btn-light btn-sm" onClick={handlePost}>
                Post
              </button>
              
            </div>
          </div>
        </div>
        :
        <Loader/>
}
    </>
  );
}
