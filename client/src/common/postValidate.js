import React from 'react';

export default function postValidate({title,type,handlechange, accept}) {
  return(
    <div>
        <label htmlFor={title}>{title}</label>
          <input type={type} accept={accept} onChange={handlechange}/>
  </div>
  );
}
