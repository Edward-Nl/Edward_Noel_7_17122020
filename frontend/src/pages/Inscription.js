// Page d'inscription au site 

import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import logo from '../image/logos/icon-left-font.png'

function Inscription() {
    let history = useHistory();
    const valeurInit = {
        lastname: "",
        firstname: "",
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        lastname: Yup.string()
        .matches(/^[a-z\d\\s]+$/i, "Doit contenir des chiffre, et des lettres")
        .min(2).max(20).
        required("Veuillez saisir votre Nom"),
        firstname: Yup.string()
            .matches(/^[a-z\d\\s]+$/i, "Doit contenir des chiffre, et des lettres")
            .min(2).max(30).required("Veuillez saisir votre Prénom"),
        username: Yup.string()
            .matches(/^[a-z\d\-_\s]+$/i, "Doit contenir des chiffre, des lettres, et \"_ -\"")
            .min(3).max(15).required("Veuillez saisir un nom d'utilisateur"),
        email: Yup.string().email('Addresse Mail invalide')
            .required("Veuillez saisir votre adresse mail"),
        password: Yup.string()
            .matches(/^[a-z\d\\s]+$/i, "Doit contenir des chiffre, et des lettres")
            .min(6, "Votre mot de passe doit contenir entre 5 et 40 caractère")
            .max(30, "Votre mot de passe doit contenir entre 5 et 40 caractère")
            .required("Veuillez saisir votre Mot de passe"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3500/api/auth/signup", data)
        .then((response) => {
          console.log(response.error);
          if(response.data.error){
            alert(response);
        } else {
            alert('Utilisateur Crée, merci de vous connecter');
            history.push("/connexion");
        }
        });
      };

    return (
        <div className="login-page">
            <div>
                <img className="login-logo" src={logo} alt="Logo du site"/>
            </div>
            <Formik initialValues={valeurInit} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <h1>INSCRIPTION</h1>
                    {/* <label>Nom :</label> */}
                    <ErrorMessage name="lastname" component="span" />
                    <Field className="inputIns" autoComplete="off" name="lastname" placeholder="NOM"/>
                
                    {/* <label>Prénom :</label> */}
                    <ErrorMessage name="firstname" component="span" />
                    <Field className="inputIns" autoComplete="off" name="firstname" placeholder="PRENOM"/>
                
                    {/* <label>Nom d'utilisateur :</label> */}
                    <ErrorMessage name="username" component="span" />
                    <Field className="inputIns" autoComplete="off" name="username" placeholder="PSEUDO"/>
                
                    {/* <label>Adresse Mail :</label> */}
                    <ErrorMessage name="email" component="span" />
                    <Field className="inputIns" autoComplete="off" name="email" placeholder="EMAIL"/>
                
                    {/* <label>Mot de passe :</label> */}
                    <ErrorMessage name="password" component="span" />
                    <Field className="inputIns" autoComplete="off" type="password" name="password" placeholder="MOT DE PASSE"/>

                    <button type="submit"> S'inscrire </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Inscription;