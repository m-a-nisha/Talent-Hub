import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import Loader from '../common/Loader';

export default function Profile() {
    const [userProfile, setuserProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showfollow, setfollow] = useState(state ? !state.following.includes(userid) : true)
    // console.log(userid)
    useEffect(() => {
        fetch(`/api/profile/${userid}`, {
            headers: {
                "auth-token": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setuserProfile(result)
            })
    }, [userid])

    const checkurl = (url, id) => {
        const type = "mp4"
        const ext = url.substring(url.lastIndexOf(".") + 1);
        // console.log(ext)
        if (ext === type) {
            return (
                <Link to={`/${id}`} >
                    <video style={{ boxShadow: "0px 0px 2px gray" }} className='AllPost' controls preload="auto" loop={true} autoPlay={true} src={url}></video>
                </Link>

            )
        }
        else {
            return (
                <Link to={`/${id}`} >
                    <img style={{ boxShadow: "0px 0px 2px gray" }} className='AllPost' src={url} alt="" />
                </Link>
            )
        }
    }

    const followUser = () => {
        fetch('/api/profile/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                // console.log(userProfile)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setuserProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }

                    }
                })

                setfollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/api/profile/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                // console.log("data: "+data)
                // console.log("state: "+userProfile)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setuserProfile((prevState) => {
                    const removeFollower = prevState.user.followers.filter(item => item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: removeFollower
                        }
                    }
                })
                setfollow(true)
            })
    }

    return (

        <>
            {(!userProfile) ? <Loader /> :
                <div className='profilesection2' style={{ margin: "5px 35px 5px 35px", paddingBottom: "10px" }}>
                    <div className="profile_section my-2 mx-auto" style={{ display: "flex", justifyContent: "center" }}>
                        <div className="">
                            <div className='p-2'>
                                <img className="profile_img p-1" src={userProfile.user.pic} alt="profile" />
                            </div>
                        </div>
                        <div className=" p-2 user">
                            <div className="user_details p-2">
                                <h3>{userProfile.user.name}</h3>
                                <div>
                                    <span className='me-2'><strong>{userProfile.posts.length}</strong>posts</span>
                                    <span className='me-2'><strong>{userProfile.user.followers.length}</strong>Followers</span>
                                    <span className='me-2'><strong>{userProfile.user.following.length}</strong>following</span>
                                </div>
                                {/* <h4>{userProfile.user.name}</h4> */}
                                {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At vel quo beatae labore molestias dolor harum quia inventore officia iure illo, ratione corporis nihil!</p> */}
                                {state ?
                                    showfollow ?
                                        <button
                                            className="btn btn-sm btn-primary followButton"
                                            onClick={() => followUser()}
                                        >Follow</button>
                                        :
                                        <button
                                            className="btn btn-sm btn-primary followButton"
                                            onClick={() => unfollowUser()}
                                        >UnFollow</button>
                                    :
                                    <button className="btn btn-primary btn-sm followButton" type="button" disabled>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </button>
                                }


                            </div>
                        </div>

                    </div>
                    <hr />
                    <div>
                        <div id="postbox my-2">
                            {userProfile.posts.map(img => (
                                <div className="col-4" style={{ margin: "2px 2px", boxShadow: "0px 0px 2px gray" }} key={img.url} >
                                    {checkurl(img.url, img._id)}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            }
        </>


    );
}