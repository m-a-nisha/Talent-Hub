import React from 'react'

export default function Loader() {
    return (
        <div>
        <div className="d-flex justify-content-center" style={{alignItems:"center"}}>
            <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        </div>

    )
}
