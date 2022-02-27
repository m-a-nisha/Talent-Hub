import React, { useContext, useState } from 'react';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderButton, renderInput, validate, errorcheck } from '../common/Form_final'
import { UserContext } from '../App'
import { useNavigate, Link } from 'react-router-dom';
import '../css/login.css'
import '../css/phone.css'
import Loginsvg from '../css/loginsvg';
export default function SignIn() {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [data, setData] = useState({ email: '', password: "" });
  const [errors, setError] = useState({});

  const schema = {
    password: Joi.string().required().min(8).label("Password"),
    email: Joi.string().required().email().label("Email")
  }

  const handelChange = ({ currentTarget: input }) => {
    const error = errorcheck({ currentTarget: input }, errors, schema);
    const data_value = { ...data };
    data_value[input.name] = input.value;
    setData(data_value);
    setError(error)
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const data_value = { ...data };
    const error = validate(data_value, schema);
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

  const doSubmit = () => {

    const { email, password } = data;
    fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.user)
        if (data.error) toast.error(data.error);
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user })
          toast.success("Login Successfully")
          navigate("/")
        }
      })
      .catch(err => toast.error(err))
  }

  return (
    <div id='loginContainer'>
      <ToastContainer />
      {/* <div>
        <img className='imageHome' src={image} alt="" />
      </div> */}
        <div className="final">
          <div id='login'>
            <h4 className='text-center p-0 mb-3'>Welcome Back!</h4>
            <hr />
            <form className='form'>
              {renderInput("email", "Email", "text", handelChange, data, errors, "fa fa-envelope icon")}
              {renderInput("password", "Password", "password", handelChange, data, errors, "fa fa-key icon")}
            <div style={{textAlign:"right", fontSize:"0.75em", marginRight:"7px" }}>
              <Link to="/reset">Forget password?</Link>
            </div>

              {renderButton("Login", handleSubmit)}
            </form>
            <div className='text-center linklogin'>

              <p>Don't have account?
                <Link to="/signup">Register</Link>
              </p>
            </div>
          </div>
        </div>

        <div className='loginImage'>
          {/* <h5>Welcome Back</h5> */}
          {/* <p style={{
            width:"15em"
          }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
          {/* <img style={{width:"18em"}} src={img} alt="" /> */}
          <Loginsvg />
          {/* <Newsvg/> */}
        </div>
      </div>
  );
}
