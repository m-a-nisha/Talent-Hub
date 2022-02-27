import React, { useContext, useState } from 'react';
import Joi from "joi-browser";
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderButton, renderInput, validate, errorcheck } from '../common/Form_final'
import '../css/login.css'
import '../css/signup.css'
import Signupsvg from '../css/Signupsvg';
import { UserContext } from '../App'


export default function SignUp() {
  const navigate = useNavigate()
  const {  dispatch } = useContext(UserContext);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [errors, setError] = useState({})
  // const [image, setImage] = useState("https://res.cloudinary.com/adaisha/image/upload/v1644070998/blank-profile-picture-g3dbc83ad3_1280_dqxg3p.png")
  // const [url, seturl] = useState(undefined)

  // useEffect(() => {
  //   if (url) {
  //     submitFields()
  //   }
  // }, [url])

  // const uploadPic = () => {
  //   const data = new FormData()
  //   data.append("file", image)
  //   data.append("upload_preset", "social-Network")
  //   data.append("cloud_name", "adaisha")
  //   return (
  //     fetch("https://api.cloudinary.com/v1_1/adaisha/image/upload", {
  //       method: "post",
  //       body: data
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data)
  //         seturl(data.url)
  //       })
  //       .catch(err => console.log(err))
  //   )
  // }

  const schema = {
    name: Joi.string().required().max(50).label("Name"),
    password: Joi.string().required().min(8).max(100).label("Password"),
    email: Joi.string().required().email().label("Email")
  }

  const handelChange = ({ currentTarget: input }) => {
    // const { email, password } = data;
    const error = errorcheck({ currentTarget: input }, errors, schema);
    const data_value = { ...data };
    data_value[input.name] = input.value;
    setData(data_value);
    setError(error)

    // console.log(error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data_value = { ...data };
    const error = validate(data_value, schema);
    // console.log(error);
    if (error) {
      setError(error)
      // console.log(errors);
    }
    else {
      setError({})
      // console.log(errors);
    }
    if (error) return;
    doSubmit();
  }

  const submitFields = () => {
    const { name, email, password } = data;
    fetch("/api/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) toast.error(data.error)
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user })
          toast.success("Welcome to talentHub")
          navigate("/")
        }
      })
      .catch(err => toast.error(err))
    // console.log("Submitted");
  }

  const doSubmit = async () => {
    // if (image) {
    //   uploadPic()
    // } else {
      submitFields()
    // }

  }

  // const handlefile = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState == 2) {
  //       setImage(reader.result)
  //     }
  //   }
  //   reader.readAsDataURL(e.target.files[0])
  // }
  // const removeProfile = (e) => {
  //   e.preventDefault();
  //   // const reader = new FileReader();
  //   setImage("https://res.cloudinary.com/adaisha/image/upload/v1645342671/blank-profile-picture-g3dbc83ad3_1280_mnlood.png")
  //   // reader.readAsDataURL("https://res.cloudinary.com/adaisha/image/upload/v1644070998/blank-profile-picture-g3dbc83ad3_1280_dqxg3p.png")
  // }

  return (
    <>
      <ToastContainer />
      <div id='signUp'>
        <div>
          <Signupsvg />
        </div>
        <div>
          <div id='signin'>
            <h4 className='text-center p-2'>Welcome!</h4>
            <hr />
            <form className='form'>
              {renderInput("name", "Username", "text", handelChange, data, errors, "fa fa-user icon")}
              {renderInput("email", "Email", "text", handelChange, data, errors, "fa fa-envelope icon")}
              {renderInput("password", "Password", "password", handelChange, data, errors, "fa fa-key icon")}
              {/* <button type="button" className="upload_profile" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <img style={{
              width:"0.8em"
            }} src="https://cdn-icons.flaticon.com/png/512/5441/premium/5441871.png?token=exp=1645088531~hmac=f1ef0e582654dfc4880464d0258e3656" alt="" />
            </button>
          <UploadProfile image={image} handlefile={handlefile} removeProfile={removeProfile} /> */}
              {renderButton("Sign Up", handleSubmit)}
            </form>
            <div className='text-center'>

              <p>Already have account?
                <Link to="/signIn">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div >
    </>
  );

}
