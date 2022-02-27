import React from 'react';

export default function UploadProfile({ image, handlefile, removeProfile, uploadProfile }) {

    return (
        <div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header ">
                            <h6 className='m-0 p-1'>Upload Profile</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* <h1>upload profile</h1> */}
                            <div className='modal-body-container'>

                                <img src={image} alt="" className='profile_img' />
                            </div>
                            <div className='modal-body-container'>
                                <input type="file" name="upload Image" id="profileImg" accept='image/*' onChange={handlefile} />
                                <label htmlFor="profileImg" className='labelButton m-2' >Add <i className="fas fa-image"></i></label>
                                <label className='labelButton m-2' onClick={removeProfile}>Remove</label>
                                <label className='labelButton m-2' onClick={uploadProfile} data-bs-dismiss="modal" aria-label="Close" >Save</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
