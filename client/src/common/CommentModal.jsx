import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../App'
import Loader from './Loader';


export default function CommentModal() {

    const [post, setPost] = useState([])
    const { state} = useContext(UserContext)
    const { postId } = useParams()
    // console.log(state)
    // console.log(postId)
    console.log(post)
    // console.log(post.length)
    // console.log(typeof(post))
    useEffect(() => {
        // console.log(post.comments)
        fetch(`/api/post/${postId}`, {
            headers: {
                "auth-token": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                // const data = [result]
                // console.log(typeof(data))
                // console.log(typeof(result))
                setPost(result)
            })
    }, [postId])

    const makComment = (text) => {
        // console.log("postId " + postId)
        fetch('/api/post/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                PostId: postId,
                text: text
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setPost(result)
                // const newData = data.map(item => {
                //     if (item._id == result._id) {
                //         return result
                //     } else {
                //         return item
                //     }
                // })
                // setData(newData)
            }).catch(err => console.log(err))
    }
    const deleteComment = (commentId) => {
        // console.log(commentId);
        fetch(`/api/post/deletePost/${postId}/${commentId}`, {
            method: "delete",
            headers: {
                "auth-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                setPost(result)
            })
            .catch(err => console.log(err))

    }

    return (
        <>

            <div className="viewContainer">
                <div className='card  my-2 mx-auto'>
                    <div>
                        {post._id &&
                            <Link className='link' to={(post.postedBy._id !== state._id) ? `/profile/${post.postedBy._id}` : "/profile"}>
                                <img className='HomeProfile' src={post.postedBy.pic} alt="" />
                                <span className='py-2 px-1'>{post.postedBy.name ? post.postedBy.name : "loading"}</span>
                            </Link>
                        }
                    </div>
                    <div className="photo mx-auto">
                        <div className="bg">
                            <img className='post_image' src={post.url} alt="" />
                        </div>
                        {post.likes &&
                            <div className='heart' >
                                <i className="fas fa-heart"></i>
                                <span>{post.likes.length}</span>
                            </div>
                        }

                    </div>
                    <div className='title p-1'>
                        <p style={{ paddingLeft: "10px" }}>{post.body}</p>
                    </div>
                </div>
                <div className='p-2 my-2 mx-auto box'>
                    <div>
                        <form
                            style={{display:"flex", justifyContent:"center"}}
                            onSubmit={(e) => {
                            e.preventDefault()
                            makComment(e.target[0].value)
                            e.target[0].value = ""
                        }}>
                            <input className='commentInput' type="text" placeholder='Add a comment' />
                            <button className='commentSubmit' type="submit"><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                    <div className='my-3' style={{ borderTop: "1.5px solid grey" }}>
                        <div>
                            <p className='my-2 p-1 '><strong>{post.comments ? post.comments.length : "..."}</strong>  comments</p>
                        </div>
                        {
                            post.comments ?
                                <>
                                    {post.comments.length > 0 ?
                                        post.comments.map(p => (
                                            <div className='commentContainer' key={p._id}>
                                                {/* {console.log(p)} */}
                                                <Link to={(p.postedBy._id !== state._id) ? `/profile/${p.postedBy._id}` : "/profile"}>
                                                    <img className='CommentProfile' src={p.postedBy.pic} alt="" />
                                                    <h6>{p.postedBy.name}</h6>
                                                </Link>
                                                <span style={{color:"black"}}>{p.text}</span>
                                                {p.postedBy._id === state._id &&
                                                    <i onClick={() => deleteComment(p._id)} className="fas fa-times"></i>
                                                }
                                            </div>
                                        ))
                                        :
                                        <p style={{ fontSize: "0.8em", textAlign: "center" }}>Be the first one to comment</p>}
                                </>
                                : <Loader/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
