import React from 'react'
import circle from '../../assets/circle.png'
const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer__content">
        <div className="container">
            <section className="subscribe">
                <img src={circle} alt="" className="subscribe-img" />
                <div className="subscribe__content">
                    <h3 className="subscribe__title">
                        Subscribe to my blog.
                    </h3>
                    <small className="subscribe__subtitle">
                        I post fresh content every week.
                    </small>

                    <form action="">
                        <div className="subsribe__input">
                            <input type="text" placeholder="Email address" />
                            <button type="submit" className="subscribe-btn">subscribe</button>
                        </div>
                    </form>

                </div>
            </section>
            <div className="footer-line"></div>
            <section className="copyright">
                <span className="copyright__text">Copyright 2022 - Javohir Nurmatjonov</span>
            </section>

        </div>

    </div>
</footer>
  )
}

export default Footer
