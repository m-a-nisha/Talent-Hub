import React from 'react';
import image from '../images/1.2.png'
import image2 from '../images/14.png'
import image3 from '../images/16.png'
import image4 from '../images/3.5.png'
import image5 from '../images/3.1.png'
// import image6 from '../images/9.webp'
import Newsvg from '../css/Newsvg'
import '../css/about.css'
import Carousel from '../common/Carousel';
import Footer from './Footer';
export default function About() {
    return (
        <div className='about'>
            <div className='aboutContainer'>
                <Carousel />
                <div className=''>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 10px 0px 0px " }} className='idea'>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 5px 10px 5px" }} className='header'>
                            <h4 >Be creative! Showcase your talent here</h4>
                            <p>Give wings to your creativity</p>
                            <p> Explore your creative side </p>
                            <p>Connect with new people</p>

                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                        </div>

                        <Newsvg />
                    </div>
                    {/* <h1>Welcome to talent Hub</h1>
            <p>Talent Hub gives you a platform to show your talent, connect with new people, and appereciate each other's work </p> */}
                    {/* <img className='image' src={image6} alt="" /> */}
                    {/* <h4>Show your talent</h4> */}
                    <div className='item'>

                        <div className="card m-1" >
                            <img className='image' src={image2} alt="" />
                            <div className="card-body">
                                <p className="card-text">Show your writing skills</p>
                            </div>
                        </div>
                        <div className="card m-1" >
                            <img className='image' src={image} alt="" />
                            <div className="card-body">
                                <p className="card-text">Show your creative arts</p>
                            </div>
                        </div>
                        <div className="card m-1" >
                            <img className='image' src={image3} alt="" />
                            <div className="card-body">
                                <p className="card-text">Show your designing skills</p>
                            </div>
                        </div>
                        <div className="card m-1" >
                            <img className='image' src={image4} alt="" />
                            <div className="card-body">
                                <p className="card-text">Show your singing skills</p>
                            </div>
                        </div>
                        <div className="card m-1" >
                            <img className='image' src={image5} alt="" />
                            <div className="card-body">
                                <p className="card-text">Show your dancing skills</p>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        </div>
    );
}
