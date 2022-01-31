import React from "react";
import pikachu from '../img/pikachu.png';
import linkedIn from '../img/LinkedIn.png';
import BannerStyle from '../Styles/banner.module.css'

export default function Banner () {
    const linkDin = "https://www.linkedin.com/in/emmazaragoza"

    return (
    <div className={BannerStyle.cont}>
        <div className={BannerStyle.contenedor}>
            <div className={BannerStyle.contPika}>
                <img className={BannerStyle.pikachu} src={pikachu} alt="pikachu" />
            </div>
            <div className={BannerStyle.conth1} >
                <h1 className={BannerStyle.h1}> Todos los derechos resevandos.</h1>
            </div>
            <div className={BannerStyle.conth1} >
                <h1 className={BannerStyle.h1a}>SPA Creada por: Emmanuel</h1>
            </div>
            <div className={BannerStyle.contLink}>
                <a href= {linkDin}><img className={BannerStyle.linkedin} src={linkedIn} alt="LinkedIn" /></a>
                          
            </div>
            
        </div>
        
    </div>
    )
}