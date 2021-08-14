import React from "react";
import logo from '../image/logos/icon-left-font-monochrome-white.png'

function Footer() {

    return (
        <div className="footerContainer">
            <div className="">
                <img className="logoFoot" src={logo} alt="Logo du site"/>
            </div>
            <div className="divFoot">
                <h3><ins>Informations légales</ins></h3>
                <ul>
                    <li>
                        <span>Conditions generales du site</span>
                    </li>
                    <li>
                        <span>Mentions légales</span>
                    </li>
                    <li>
                        <span>Utilisation de vos données personnelles</span>
                    </li>
                </ul>
            </div>
             
        </div>
    )
  }
  
  export default Footer;