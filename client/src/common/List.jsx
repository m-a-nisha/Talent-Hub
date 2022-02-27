import React, { useState } from 'react'
import {Link} from 'react-router-dom'
export default function Homelist() {
    const [active, setactive] = useState(["false", "false", "false", "false", "false", "false"])
    // useEffect(() => {

    // }, [active])
    // console.log(active)
    const handleclass = (i) => {
        
        let data = [...active];
        data = data.map(item =>(
            item="false"
        ))
        data[i] = "true"
        // console.log(data)
        // console.log(data)
        setactive(data);
    }
    
    return (
        <div className='homeList'>
           {/* { console.log("called")} */}
            <Link to={"/popular"}>
                <h6 className={active[0]==="true"?"active":""} onClick={()=>handleclass(0)}>Popular<i style={{textShadow:"0px 0px 5px orange"}} className="fas fa-fire"></i></h6>
            </Link>
            <Link to={"/post/Art"}>
                <h6 className={active[1] === "true" ? "active" : ""} onClick={()=>handleclass(1)}>Art<i className="fas fa-paint-brush"></i></h6>
            </Link>
            <Link to={"/post/Designing"}>
                <h6 className={active[2] === "true" ? "active" : ""} onClick={() => handleclass(2)}>Designing<i className="fas fa-object-ungroup"></i></h6>
            </Link>
            <Link to={"/post/Writing"}>
                <h6 className={active[3] === "true" ? "active" : ""} onClick={() => handleclass(3)}>Writing<i className="fas fa-feather-alt"></i></h6>
            </Link>
            <Link to={"/post/Music"}>
                <h6 className={active[4] === "true" ? "active" : ""} onClick={() => handleclass(4)}>Music<i className="fas fa-music"></i></h6>
            </Link>
            <Link to={"/post/Dance"}>
                <h6 className={active[5] === "true" ? "active" : ""} onClick={() => handleclass(5)}>Dance<i className="fas fa-walking"></i></h6>
            </Link>
        </div>
    )
}
