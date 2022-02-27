import React, { useEffect, useState } from 'react';
// import { UserContext } from "../App"
// import { Link } from 'react-router-dom'
// import CommentModal from '../common/CommentModal';
import Section from '../common/Section';
import Homelist from '../common/List';
export default function Home() {
    const [data, setData] = useState([])
    // const { state, dispatch } = useContext(UserContext)
    // console.log(data)
    // console.log("data" + typeof (data))
    useEffect(() => {
        fetch('/api/post/popular', {
            headers: {
                "auth-token": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log("result"+typeof(result))
                setData(result)
            })
    }, [])
    // console.log(data)
    const likePost = (id) => {
        fetch('/api/post/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                PostId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log("result"+result);
                const newData = data.map(item => {
                    // console.log(item)
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => console.log(err))
    }
    const unlikePost = (id) => {
        fetch('/api/post/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                PostId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => console.log(err))
    }

    const makComment = (text, PostId) => {
        // console.log("postId " + PostId)
        fetch('/api/post/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                PostId: PostId,
                text: text
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => console.log(err))
    }



    const deletePost = (postid) => {
        fetch(`/api/post/deletePost/${postid}`, {
            method: "delete",
            headers: {
                "auth-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData);
            })
    }

    return (
        <div className=''>
            <Homelist />
            {data.map(item => (
                <Section
                    key={item._id}
                    deletePost={deletePost}
                    makComment={makComment}
                    unlikePost={unlikePost}
                    likePost={likePost}
                    item={item}
                />
            ))}

        </div>
    );
}
