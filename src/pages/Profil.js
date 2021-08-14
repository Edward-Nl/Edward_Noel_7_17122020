import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function Profil() {
    let { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [infoUser, setInfoUser] = useState([]);
    const donnéesUser = JSON.parse(localStorage.getItem("donnéesUser"))
    const [isDataLoading, setDataLoading] = useState(false)

    let history = useHistory();

    useEffect(() => {
      setDataLoading(true)
      if(!localStorage.getItem('donnéesUser')) {
        history.push("/connexion")
    } else {
      axios.get(`http://localhost:3500/api/post/userPost/${id}`, {
            headers: {Token: localStorage.getItem("accessToken"),
            UserId: donnéesUser.id}
        })
            .then(response => {
                setListePost(response.data.listOfPosts)
                setPostLikes(
                    response.data.likedPosts.map(like => {
                    return like.PostId;
                })
              )
              setDataLoading(false)
        });

        axios.get(`http://localhost:3500/api/auth/userInfo/${id}`, {
            headers: {Token: localStorage.getItem("accessToken")}
        })
            .then(response => {
                setInfoUser(response.data)
            });
    }
        
    }, [])

    const [listePost, setListePost] = useState([]);
    const [postLikes, setPostLikes] = useState([])


    const likeAPost = (postId) => {
        axios.post("http://localhost:3500/api/post/likes",{ 
          PostId: postId,
          UserId: authState.id, }, { 
          headers: { Token: localStorage.getItem("accessToken") } }
          ).then((response) => {
            setListePost(listePost.map((post) => {
                if (post.id === postId) {
                  if (response.data.liked) {
                    return { ...post, Likes: [...post.Likes, 0] };
                  } else {
                    const likesArray = post.Likes;
                    likesArray.pop();
                    return { ...post, Likes: likesArray };
                  }
                } else {
                  return post;
                }
              })
            );
    
            if (postLikes.includes(postId)) {
              setPostLikes(postLikes.filter((id) => {
                  return id != postId;
                })
              );
            } else {
              setPostLikes([...postLikes, postId]);
            }
          });
      };
      console.log(postLikes)

    return(
        <div className="">
          
            <div >
                <div className="profilHeader">
                    <img src={`http://localhost:3500/images/tmp/${infoUser.name}`} alt="Avatar de Profil"/>
                    <div className="nameInfo">
                      <div>
                        {infoUser.firstname + " " + infoUser.lastname }
                      </div>
                      <div className="username">
                        {infoUser.username}
                        </div>
                        
                    </div>
                    {authState.isAdmin === true && (
                        <div>
                            <button onClick={() => {
                                history.push(`/moderation/${id}`)
                            }}>Modération du profil</button>
                        </div>
                        
                    )}
                    
                </div>

                {isDataLoading ? (
                  <div className="chargement">
                <div className="barre barreee barre-1 barre-10"></div>
                <div className="barre barreee barre-2 barre-11"></div>
                <div className="barre barreee barre-3 barre-12"></div>
                <div className="barre barreee barre-2 barre-4 barre-11"></div>
                <div className="barre barreee barre-1 barre-5 barre-10"></div>
          
              </div>
                ) : (
                  <div className="postContainer">
                {listePost.map((value, key) => {
                    return(
                        <div key={key} className="post">
                            <div className="postHead">
                                {value.username}
                            </div>
                            <div className="postBody" onClick={() => {
                                history.push(`/post/${value.id}`)}}>
                                {value.postText}
                                {value.name != null && (
                                  <div>
                                    <hr/>
                                    <img src={`http://localhost:3500/images/tmp/${value.name}`} alt={`${value.name}`} />
                                  </div>
                                )}
                            </div>
                            <div className="postFoot">
                              <ThumbUpAltIcon onClick={() => {likeAPost(value.id)}} 
                              className={postLikes.includes(value.id) ? "like" : "noLike"}/>
                                <label className={postLikes.includes(value.id) ? "like" : "noLike"}>
                                  J'aimes : {value.Likes.length}
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>
                )}
                
                
                
            </div>
        </div>
    );
}

export default Profil;