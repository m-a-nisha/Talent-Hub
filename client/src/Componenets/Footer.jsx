import React from 'react'

export default function Footer() {
    return (
        <div className="container border-top">
            <div style={{padding:"7px"}}>
                <p className="love">Made with <i className="fas fa-heart"></i> by Manisha Kumari</p>
            </div>

            <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-2 ">


                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <svg className="bi" width="30" height="24"><use href="#bootstrap"></use></svg>
                    </a>
                    <span className="text-muted">© 2022 TalentHub</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex footer" style={{ fontSize: "1.3rem" }}>
                    <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/_ma_n_isha__/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                    <li className="ms-3"><a className="text-muted" href="https://github.com/m-a-nisha"><i className="fab fa-github" target="_blank" rel="noreferrer"></i></a></li>
                    <li className="ms-3"><a className="text-muted" href="https://www.linkedin.com/in/manisha-kumari-6969851b4/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></li>
                    <li className="ms-3"><a className="text-muted" href="mailto:manisha10116@gmail.com" target="_blank" rel="noreferrer"><i className="fas fa-envelope"></i></a></li>
                </ul>
            </footer>
        </div>
    )
}
