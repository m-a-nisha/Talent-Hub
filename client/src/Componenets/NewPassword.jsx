import React, {useState } from 'react';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderButton, renderInput, validate, errorcheck } from '../common/Form_final'
// import { UserContext } from '../App'
import { useNavigate, useParams } from 'react-router-dom';
import '../css/login.css'
// import Newsvg from '../css/Newsvg';
// import Loginsvg from '../css/loginsvg';
// import img from '../images/new.jpg'
import Password from '../css/Password';
export default function SignIn() {
    const navigate = useNavigate();
    const { token } = useParams()
    // console.log(token)
    const [data, setData] = useState({ password: ""});
    const [errors, setError] = useState({});

    const schema = {
        password: Joi.string().required().min(8).label("Password"),
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

        const {password } = data;
        fetch("/api/users/newpassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                token:token
            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.user)
                if (data.error) toast.error(data.error);
                else {
                    toast.success("Password reset Successfully")
                    // navigate("/signIn")
                }
            })
            .then(navigate("/signIn"))
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
                    <img style={{ width: "2em", display: "block", margin: "auto" }} src="https://cdn-icons.flaticon.com/png/512/3826/premium/3826520.png?token=exp=1645977640~hmac=5b7574e343730bea27c28c2b5c099a62" alt="" />
                    <hr />
                    <form className='form'>
                        {/* {renderInput("email", "Email", "text", handelChange, data, errors, "fa fa-envelope icon")} */}
                        {renderInput("password", "New Password", "password", handelChange, data, errors, "fa fa-key icon")}
                        {/* {renderInput("current_password", "Confirm Password", "password", handelChange, data, errors, "fa fa-key icon")} */}


                        {renderButton("Reset", handleSubmit)}
                    </form>
                    {/* <div className='text-center linklogin'>

                        <p>Don't have account?
                            <Link to="/signup">Register</Link>
                        </p>
                    </div> */}
                </div>
            </div>

            <div className='loginImage'>
                {/* <h5>Welcome Back</h5> */}
                {/* <p style={{
            width:"15em"
          }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
                {/* <img style={{width:"18em"}} src={img} alt="" /> */}
                {/* <Loginsvg /> */}
                <Password/>
                {/* <Newsvg/> */}
            </div>
        </div>
    );
}
