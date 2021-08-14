import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Header from './components/header';
import Footer from './components/footer';
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Accueil from './pages/Accueil';
import Post from './pages/Post';
import Profil from './pages/Profil';
import ProfilPerso from './pages/ProfilPerso';
import EditProfil from './pages/EditProfil';
import Moderation from './pages/modérationAccount';
import Error from './pages/Error';
import axios from "axios";

function App() {
  const donnéesUser = JSON.parse(localStorage.getItem("donnéesUser"))
  const [authState, setAuthState] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    username: "",
    isAdmin: "",
    token: "",
    status: false,
  });


  

  useEffect(() => {
    if(localStorage.getItem('donnéesUser')) {
      setAuthState({
      id: donnéesUser.id,
      firstname: donnéesUser.firstname,
      lastname: donnéesUser.lastname,
      username: donnéesUser.username,
      isAdmin: donnéesUser.isAdmin,
      token: donnéesUser.token,
      status: true,
     });
    }

  }, []);

  

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Accueil} />
            <Route path="/inscription" exact component={Inscription} />
            <Route path="/connexion" exact component={Connexion} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/profil/:id" exact component={Profil} />
            <Route path="/profilPerso/:id" exact component={ProfilPerso} />
            <Route path="/editProfil/:id" exact component={EditProfil} />
            <Route path="/moderation/:id" exact component={Moderation} />
            <Route path="/*" exact component={Error} />
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
