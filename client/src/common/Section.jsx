import React, { useContext } from 'react';
import { UserContext } from "../App"
import { Link } from 'react-router-dom'


export default function Section({ deletePost, makComment, unlikePost, likePost, item }) {
    const { state } = useContext(UserContext)
    // console.log(item)
    const checkurl = (url) => {
        const type = "mp4"
        const ext = url.substring(url.lastIndexOf(".") + 1);
        // console.log(ext)
        if (ext === type) {
            return (      
                <div >
                    <video className='post_video' controls preload="auto" loop={true}  autoPlay={true} src={item.url}></video>
                </div>
            )
        }
        else {
            return (
                <img className='post_image' src={item.url} alt="" />
            )
        }
    }
    
    return (
        <div className="card mx-auto my-3" key={item._id}>
            {/* {console.log(item.comments)} */}
            {/* {console.log(item)} */}
            {/* {console.log(item.postedBy.pic)} */}
            {/* {console.log(item._id)} */}
            <div>
                <Link className='link' to={(item.postedBy._id !== state._id) ? `/profile/${item.postedBy._id}` : "/profile"}>
                    <img className='HomeProfile' src={item.postedBy.pic} alt="" />
                    <span className='py-2 px-1'>{item.postedBy.name ? item.postedBy.name : "loading"}</span>
                </Link>

                {
                    item.postedBy._id === state._id && <i className="fas fa-trash-alt m-2 p-1" style={{ float: "right", cursor:"pointer", fontSize:"0.9em" }}
                        onClick={() => deletePost(item._id)}
                    ></i>
                }
            </div>

            <div className="mx-auto" >
                {checkurl(item.url)}
            </div>

            <div className='px-2 py-1' style={{ margin: "3px 11px" }}>
                <div>
                    {item.likes.includes(state._id)
                        ?
                        <i className="fas fa-heart me-2"
                            style={{ color: "red", fontSize: "1.3em", cursor: "pointer" }}
                            onClick={() => unlikePost(item._id)}
                        ></i>
                        :
                        <i className="far fa-heart me-3"
                            style={{ fontSize: "1.2em", cursor: "pointer" }}
                            onClick={() => likePost(item._id)}
                        ></i>
                    }
                    <Link to={`/${item._id}`} >
                        <i className="far fa-comment me-3 ms-1" style={{ fontSize: "1.2em", color:"whitesmoke" }}></i>
                    </Link>
                </div>
                <p
                    className='m-0'
                    style={{ fontSize: "0.76em" }}
                ><strong>{item.likes.length} </strong>
                    Likes
                </p>
                <div className='title'>
                    {/* <p>{item.title}</p> */}
                    <p>{item.body}</p>
                </div>


                {
                    item.comments.length > 2 ?
                        <>
                            <div className='mb-1 viewcomment'>
                                <Link to={`/${item._id}`} >
                                    <span
                                    >View all {item.comments.length} comments</span>
                                </Link>

                            </div>
                            <div className='homecomment'>
                                {/* {console.log(item.comments)} */}
                                <Link to={(item.comments[item.comments.length - 1].postedBy._id !== state._id) ? `/profile/${item.comments[item.comments.length - 1].postedBy._id}` : "/profile"}>
                                    <img className='CommentProfile' src={item.comments[item.comments.length - 1].postedBy.pic} alt="" />
                                    <h6 style={{ display: "inline" }}>{item.comments[item.comments.length - 1].postedBy.name} </h6>
                                </Link>
                                <span style={{ display: "inline" }}>{item.comments[item.comments.length - 1].text}</span>
                            </div>
                            <div className='homecomment'>
                                <Link to={(item.comments[item.comments.length - 1].postedBy._id !== state._id) ? `/profile/${item.comments[item.comments.length - 1].postedBy._id}` : "/profile"}>
                                    <img className='CommentProfile' src={item.comments[item.comments.length - 2].postedBy.pic} alt="" />
                                    <h6 style={{ display: "inline" }}>{item.comments[item.comments.length - 2].postedBy.name} </h6>
                                </Link>
                                <span style={{ display: "inline" }}>{item.comments[item.comments.length - 2].text}</span>
                            </div>
                        </>
                        :
                        item.comments.map(record => {
                            return (
                                <div className='homecomment' key={record._id}>
                                    <Link  key={record._id} to={(record.postedBy._id !== state._id) ? `/profile/${record.postedBy._id}` : "/profile"}>
                                        <img className='CommentProfile' src={record.postedBy.pic} alt="" />
                                        <h6  style={{ display: "inline" }}>{record.postedBy.name} </h6>
                                    </Link>
                                    <span style={{ display: "inline" }}>{record.text}</span>
                                </div>
                            )
                        })
                }
                <form
                    style={{display:"flex"}}
                    onSubmit={(e) => {                   
                    e.preventDefault()
                    makComment(e.target[0].value, item._id)
                    e.target[0].value = ""
                }}>
                    <input className='commentInput' type="text" placeholder='Add a comment' />
                    <button className='commentSubmit' type="submit"><i style={{color:"whitesmoke"}} className="fas fa-paper-plane"></i></button>

                </form>
            </div>
        </div>
    )
}
