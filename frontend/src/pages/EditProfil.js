// Page pour éditer le profil d'un utilisateur 

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useHistory, useParams } from "react-router-dom";
import FormData from 'form-data';

function EditProfil() {
    let { id } = useParams()
    const { authState } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    let history = useHistory();
    let regex = /^[a-z\d\-_.,!?\s]+$/i;

    useEffect(() => {
        if(!localStorage.getItem('donnéesUser')) {
            history.push("/connexion")
        } 
    }, [])

    const changePassword = () => {
        if(!oldPassword.match(regex) || !newPassword.match(regex)) {
            alert('Un champ de saisi contient des caractère non autorisé')
        }else {
            axios.put(`http://localhost:3500/api/auth/editPassword/${id}`,{
                oldPassword: oldPassword,
                newPassword: newPassword,
                id: authState.id
                },{
                headers: {Token: localStorage.getItem("accessToken")},
                }
            ).then((response) => {
                if (response.data.error) {
                alert(response.data.error);
                }
            });
        }
    };
    
    const changeProfilPicture = () => {
        const formFile = document.getElementById('formFile');
        console.log(formFile)
        let formData = new FormData(formFile);
        formData.append('username', authState.username);
        formData.append('userId', authState.id)
        axios.put(`http://localhost:3500/api/auth/editPicture/${id}`, formData ,{
            headers: {
                    "content-Type": "multipart/form-data",
                    Token: localStorage.getItem("accessToken")
                },
            }
        )
        window.location.reload(`/profilPerso/${id}`)
    };

    const deleteAccount = () => {
        axios.delete(`http://localhost:3500/api/auth/userInfo/${id}`, {
            headers: {Token: localStorage.getItem("accessToken")}
        })
            .then(() => {
                localStorage.clear();
                history.push('/connexion');
            })
    }

    return (
        <div className="containerEdit">
            <h1>Modifier votre profil : </h1>
            <div className="divEditProfile">
                <h2>Modifier le mot de passe : </h2>
                <form>
                    <label>Ancien mot de passe : </label>
                    <input id="oldPassword" type="text" placeholder="Ancien mot de passe "
                        onChange={(event) => {setOldPassword(event.target.value);}}/>

                    <label>Nouveau mot de passe : </label>   
                    <input id="newPassword" type="text" placeholder="Nouveau mot de passe"
                        onChange={(event) => {setNewPassword(event.target.value);}}/>
                        
                    <button onClick={changePassword}> Sauvegarder </button>
                </form>
            </div>

            <div className="divEditProfile">
                <h2>Modifier la photo de profil : </h2>
                <form id="formFile" enctype="multipart/form-data">
                    <label>Choisir un fichier : </label>
                    <input id="file" type="file" className="file" name="file" accept=".jpg, .jpeg, .png, .gif"/>

                    <button onClick={changeProfilPicture}> Sauvegarder </button>
                </form>
            </div>

            <div className="divEditProfile">
                <h2>Supprimer votre compte : </h2>
                <div>Attention la suppression de votre compte est definitive, vous ne pourrez pas revenir en arrière,
                    et toutes vos publication, j'aime, commentaire seront supprimer !
                </div>
            <button className="btnDanger" onClick={() => { deleteAccount(authState.id)}}> Supprimer le compte</button>
            </div>
        
        </div>
    );
}

export default EditProfil;