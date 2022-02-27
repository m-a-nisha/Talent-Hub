import React from 'react'
import image from '../images/Frame 1.png'
import img1 from '../images/wel3.png'
import '../css/carousel.css'
export default function Carousel() {
    return (
        <div className='animate'>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    
                </div>
                <div className="carousel-inner" id='back'>
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption  d-md-block">
                                <h2>Talent Hub</h2>
                            <p>A platform to show your talent, connect with new people, and appereciate each other's work</p>
                            </div>
                    </div>
                    <div className="carousel-item" >
                        <img src={image} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption  d-md-block">
                                <h2>Second slide label</h2>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                    </div>
                    
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
