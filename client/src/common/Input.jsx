import React, { useState } from "react";

export default function Input({ name, id, type, title, handelChange, error, value, icon }) {
    const [passwordShow, setPasswordShow] = useState(true)
    const [visible, setvisible] = useState("password")
    const changeVisblity = () => {
        if (passwordShow === false){
            setPasswordShow(true)
            setvisible("password")
        }
        else{
            setPasswordShow(false)
            setvisible("text")
        }
    }
    // const onfocus =() =>{
    //     console.log("focus")
    // }
    const renderIcon = () => {
        if (name === "password") {
            if (passwordShow === true) {
                
                return <i className="far fa-eye password_icon" onClick={changeVisblity} ></i>
            }
            else {
                return <i className="far fa-eye-slash password_icon" onClick={changeVisblity}></i>
            }
        }
    }
    return (
        <div className="formContainer">
            <div className="error">
                {error && <span className="alert"><i className="fas fa-exclamation-triangle"></i>{error}!</span>}
            </div>
            <i className={`${icon} input_icon`}></i>
            {type !== "password" ?
                <input
                    placeholder={title}
                    autoComplete="off"
                    onChange={handelChange}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    className="input-field"
                /> :
                <input
                    placeholder={title}
                    autoComplete="off"
                    onChange={handelChange}
                    id={id}
                    name={name}
                    type={visible}
                    value={value}
                    className="input-field"
                />
            }

            {renderIcon()}

            {/* {title === "Password" ?  : <i></i>} */}
            <div>

            </div>
        </div>
    );
}
