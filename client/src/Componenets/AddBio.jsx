import React from 'react'

export default function AddBio() {
  return (
      <div>
          {/* <!-- Button trigger modal --> */}
          

          {/* <!-- Modal --> */}
          <div className="modal fade" id="Bio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content" style={{width:"60%", margin:"auto"}}>                      
                      <div className="modal-body" style={{height:"126px", margin:"auto"}}>
                          <textarea name="" id="" cols="35" rows="3" className="post" style={{border:"1px solid black"}} />
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-sm btn-primary">Add to Bio</button>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
