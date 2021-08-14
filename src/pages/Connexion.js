import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from '../image/logos/icon-left-font.png'
function Connexion() {
    let history = useHistory();
    const { setAuthState } = useContext(AuthContext);
    const valeurInit = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Addresse Mail invalide')
            .required("Veuillez saisir votre adresse mail"),
        password: Yup.string()
            .matches(/^[a-z\d\\s]+$/i, "Votre mot de passe doit contenir des chiffre, et des lettres")
            .min(6, "Votre mot de passe doit contenir entre 5 et 40 caractère")
            .max(30, "Votre mot de passe doit contenir entre 5 et 40 caractère")
            .required("Veuillez saisir votre Mot de passe"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3500/api/auth/login", data)
        .then((response) => {
          if(response.data.error){
            alert("Un champs de saisi est mal renseigné");
        } else {
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("donnéesUser", JSON.stringify(response.data))
            setAuthState({
                id: response.data.id,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                username: response.data.username,
                isAdmin: response.data.isAdmin,
                status: true,
            });
            history.push("/");
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
                    <h1>CONNEXION</h1>

                    <ErrorMessage name="email" component="span" />
                    <Field className="inputIns" autoComplete="off" name="email" placeholder="EMAIL"/>

                    <ErrorMessage name="password" component="span" />
                    <Field className="inputIns" autoComplete="off" type="password" name="password" placeholder="MOT DE PASSE"/>

                    <button type="submit"> Connexion </button>
                </Form>
            </Formik>
        </div>
    )
}
export default Connexion;