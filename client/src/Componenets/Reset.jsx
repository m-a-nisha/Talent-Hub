import React, { useState } from 'react';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderButton, renderInput, validate, errorcheck } from '../common/Form_final'
import '../css/login.css'

import Password from '../css/Password';
export default function Reset() {

    const [data, setData] = useState({ email: ''});
    const [errors, setError] = useState({});

    const schema = {
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

        const { email} = data;
        fetch("/api/users/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(res => res.json())
            .then(data => {
                
                if (data.error) toast.error(data.error);
                else {
                    toast.success("Check your mail!")
                    // navigate("/signIn")
                }
            })
            .catch(err => toast.error(err))
    }

    return (
        <div id='loginContainer'>
            <ToastContainer />
            <div className="final">
                <div id='login'>
                    <img style={{ width: "2em", display: "block", margin: "auto" }} src="https://cdn-icons.flaticon.com/png/512/3826/premium/3826520.png?token=exp=1645977640~hmac=5b7574e343730bea27c28c2b5c099a62" alt="" />
                    <hr />
                    <form className='form'>
                        {renderInput("email", "Email", "text", handelChange, data, errors, "fa fa-envelope icon")}
                        {/* {renderInput("password", "Password", "password", handelChange, data, errors, "fa fa-key icon")} */}


                        {renderButton("Reset Password", handleSubmit)}
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
                <Password/>
                {/* <Newsvg/> */}
            </div>
        </div>
    );
}
