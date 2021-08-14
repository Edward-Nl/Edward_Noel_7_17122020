import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory, useParams } from "react-router-dom";

function EditProfil() {
    let { id } = useParams();
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem('donnéesUser')) {
            history.push("/connexion")
        }
    }, [])

    const deleteAccount = (() => {
        axios.delete(`http://localhost:3500/api/auth/userInfo/${id}`, {
            headers: {Token: localStorage.getItem("accessToken")}
        })
            .then(() => {
                localStorage.clear();
                history.push("/");
            })
    })

    return (
        <div className="containerEdit">
            <h1>Modération du profil : </h1>


            <div className="divEditProfile">
                <h2>Supprimer le compte de l'utilisateur : </h2>
                <div>Attention la suppression de ce compte sera definitive, vous ne pourrez pas revenir en arrière,
                    et toutes les publication, j'aime, commentaire de ce compte seront supprimer !
                </div>
            <button className="btnDanger" onClick={() => { deleteAccount()}}> Supprimer le compte</button>
            </div>
        
        </div>
    );
}

export default EditProfil;