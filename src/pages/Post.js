import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Post() {
    let { id } = useParams();
    const [onePost, setOnePost] = useState([]);
    const [commentaire, setCommentaire] = useState([]);
    const [newCommentaire, setNewCommentaire] = useState([]);
    const { authState } = useContext(AuthContext);
    let regex = /^[a-z\d\-_.,!?\s]+$/i;
    let history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem('donnéesUser')) {
            history.push("/connexion")
        } else {
            axios.get(`http://localhost:3500/api/post/${id}`, {
                headers: {Token: localStorage.getItem("accessToken")}
            })
                .then(response => {
                    setOnePost(response.data);
            });

            axios.get(`http://localhost:3500/api/commentaires/${id}`, {
                headers: {Token: localStorage.getItem("accessToken")}
            })
                .then(response => {
                    setCommentaire(response.data)
                });
        }
        
    }, [])

    const addCommentaire = () => {
        if(!newCommentaire.match(regex)){
            alert('Votre commentaire contient des caractère non autorisé')
        } else {
            axios.post("http://localhost:3500/api/commentaires", {
            commentaire: newCommentaire,
            PostId: id,
            UserId: authState.id,
            username: authState.username
        }, {
            headers: {Token: localStorage.getItem("accessToken")}
        })
        .then((response) => { 
            if (response.data.error) {
                console.log(response.data.error);
              } else {
                const commentaireAdd = {
                  commentaire: newCommentaire,
                  username: response.data.username,
                };
                setCommentaire([...commentaire, commentaireAdd]);
                setNewCommentaire("");
                window.location.reload(`/post/${id}`)
              }
              
        });
        }
        
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3500/api/post/${id}`, {
            headers: {Token: localStorage.getItem("accessToken")},
        })
        .then(() => {
            window.location.replace("/");
        });
    };

    const deleteCommentaire = (id) => {
        axios.delete(`http://localhost:3500/api/commentaires/${id}`, {
            headers: {Token: localStorage.getItem("accessToken")},
        })
        .then(() => {
            setCommentaire(commentaire.filter((val) => {return val.id != id}))
        });
    };


    return(
        <div className="homeContainer">
            <div className="post">
                <div className="postHead">
                    {onePost.username}
                    {(authState.username === onePost.username || authState.isAdmin === true) && (
                        <button onClick={() => {
                            deletePost(onePost.id)
                        }}> X </button>
                    )}
                </div>
                <div className="postBody">
                    {onePost.postText}
                    {onePost.name != null && (
                        <div>
                            <hr />
                            <img src={`http://localhost:3500/images/tmp/${onePost.name}`} alt={`${onePost.name}`} />
                        </div>
                    )}
                </div>
                <div className="postFoot1">
                    <div className="addComs">
                        <input type="text" placeholder="Ajoutez un commentaire" value={newCommentaire} onChange={event => {setNewCommentaire(event.target.value)}} />
                        <button onClick={addCommentaire}>Publier</button>
                    </div>
                    <div className="listeCommentaires">
                        {commentaire.map((commentaire, key) => {
                            return(
                                <div className="commentaire" key={key}>
                                    <label className="commentaireLabel"> Par : {commentaire.username}</label>
                                    <div>
                                       {commentaire.commentaire} 
                                    </div>
                                    {(authState.username === commentaire.username || authState.isAdmin === true) ? (
                                        <button className="divBtn" onClick={() => {
                                            deleteCommentaire(commentaire.id)
                                        }}> X </button>
                                    ) : (<div className="divBtn"></div>)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            
            
        </div>
    );
}

export default Post;