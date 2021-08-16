// Component Header du site 

import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import logo from '../image/logos/icon-left-font-monochrome-white.png'

function Header() {
    const { authState, setAuthState } = useContext(AuthContext)

    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("donnéesUser");
        setAuthState({ firstname: "", lastname: "", username: "", id: 0,token: "", isAdmin: false, status: false });
      };

    return (
        <div className="headerContainer">
            <div className="divLogo">
                <img className="logoHeader" src={logo} alt="Logo du site"/>
            </div>
            <div className="navbar">
                
                {!authState.status ? (
                    <>
                        <Link to="/inscription">INSCRIPTION</Link>
                        <hr className="displayHr" />
                        <Link to="/connexion">CONNEXION</Link> 
                    </>
                ) : (
                    <>
                        <Link to="/">PAGE D'ACCUEIL</Link>
                        <hr className="displayHr" />
                        <Link to={`/profilPerso/${authState.id}`}>{authState.firstname + " " + authState.lastname}</Link>
                        <hr className="displayHr" />
                        <Link to="/connexion" onClick={Logout}>Déconnexion</Link> 
                    </>
                )}
            </div>
            
        </div>
    )
  }
  
  export default Header