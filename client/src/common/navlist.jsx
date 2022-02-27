import React from 'react';
import { Link} from "react-router-dom";
export default function nav({route,name,icon}) {
    return (
        <li>
            <Link className="nav-item" to={route}>
                <span>{name}</span>
                
                <i className={icon}></i>
                </Link>
            </li>
    );
}
