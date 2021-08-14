import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import FormData from 'form-data';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function CreatePost() {
    const { authState } = useContext(AuthContext);
    let history = useHistory({});
    const [listePost, setListePost] = useState([]);
    const [postLikes, setPostLikes] = useState([])
    const donnéesUser = JSON.parse(localStorage.getItem("donnéesUser"))
    const [isDataLoading, setDataLoading] = useState(false)



    
    
    useEffect(() => {
        setDataLoading(true)
        if(!localStorage.getItem('donnéesUser')) {
            history.push("/connexion")
        } else {
           axios.get("http://localhost:3500/api/post", {
            headers: {Token: localStorage.getItem("accessToken"),
            UserId: donnéesUser.id},
            
        })
          .then(response => {
              setListePost(response.data.listOfPosts)
              setPostLikes(
                response.data.likedPosts.map((like) => {
                  return like.PostId;
                })
              )
              setDataLoading(false)
              
          }) 
        } 
    }, [])

    
    const form = document.getElementById('formPost');
      const onSubmit = () => {
        let formData = new FormData(form);
        formData.append('username', authState.username);
        formData.append('userId', authState.id)
        axios.post('http://localhost:3500/api/post/createPost', formData, {
          headers: {
            "content-Type": "multipart/form-data",
            Token: localStorage.getItem("accessToken")
          }
        })
          .then(response => {
            const addNewPost = {
              id: response.data.id,
              username: response.data.username,
              userId: response.data.userId,
              postText: response.data.postText,
              media: response.data.media
          };
          setListePost([...listePost, addNewPost])
          })
      }

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
      

    return(
        <div className="homeContainer">
            <h1>BIENVENUE SUR GROUPOMANIA</h1>
            <div>
                    <form id="formPost" className="formPost">
                        <input className="inputPost" name="postText" id="postText" placeholder="Publiez du contenu !"/>
                        <hr />
                        <input type="file" className="file" name="file"/>

                        <button onClick={onSubmit} className="btnPublier"> Publier </button>
                    </form>
               
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
                              {authState.username === value.username ? (
                                <Link to={`/profilPerso/${value.UserId}`}>{value.username}</Link>
                              ) : (
                                <Link to={`/profil/${value.UserId}`}>{value.username}</Link>
                              )}
                                
                            </div>
                            <div className="postBody" onClick={() => {
                                history.push(`/post/${value.id}`)
                            }}>
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
        
    );
}

export default CreatePost;