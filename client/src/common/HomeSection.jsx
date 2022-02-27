import React, { useEffect, useState } from 'react';


import { useParams } from 'react-router-dom'
import Section from '../common/Section';
import Homelist from './List';
import Loader from './Loader';

export default function HomeSection() {
    const { title } = useParams()
    // console.log(title)
    const [data, setData] = useState(undefined)
    const [load, setload] = useState(false)
    // console.log(data)
    useEffect(() => {
        setload(true)
        // console.log(title)
        fetch(`/api/post/posts/${title}`, {
            headers: {
                "auth-token": localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setData(result)
                // setData(result)
                setload(false)
            })

    }, [title])
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
        <>
            {!load?
                <div className='' style={{ paddingBottom: "10px" }}>
                    <Homelist />
                    {data ?
                        data.length > 0 ?
                            data.map(item => (
                                <Section
                                    deletePost={deletePost}
                                    makComment={makComment}
                                    unlikePost={unlikePost}
                                    likePost={likePost}
                                    item={item}
                                    key={item.url}
                                />
                            ))
                            :
                            <h2
                                style={{ textAlign: "center", marginTop: "25px" }}
                            >No post Yet</h2>
                        :
                        <Loader />
                    }

                </div>
                :
                <Loader />
            }
        </>
    );

}
