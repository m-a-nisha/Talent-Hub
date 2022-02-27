import React, { useContext } from 'react'
import { UserContext } from "../App"
import '../css/search.css'
import { Link } from 'react-router-dom'
export default function SearchModal({ handleSearch, userDetail }) {
    const { state} = useContext(UserContext)
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" >
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <div className='header'>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                                <button className="btn btn-outline-dark" type="submit"><i className="fas fa-search" ></i></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                {userDetail.map(item => (
                                    <li key={item._id} className="list-group-item" style={{ padding: "0.2rem 0.3rem" }} data-bs-dismiss="modal">
                                        <Link className='search' to={(item._id !== state._id) ? `/profile/${item._id}` : "/profile"} >
                                            <img className='CommentProfile' src={item.pic} alt="" />
                                            <span style={{marginLeft:"0.5em"}}>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
