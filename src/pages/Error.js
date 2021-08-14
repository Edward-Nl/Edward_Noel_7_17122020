import React, { useEffect, useState } from "react";

function Error() {

    class ValidForm{
        static textValide(value) {
            const re = /^[A-Za-z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
            return re.test(value);
        };
        static mailValide(value) {
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
            return re.test(value);
        };
    };
 
    return (
        <div>
            <h1>ERREUR : VOUS ETES ACTUELLEMENT SUR UNE PAGE QUI N'EXISTE PAS</h1>
            <h2>Nous vous invitons à retourner à l'accueil, ou à vous connecter si vous
                ne l'êtes pas !
            </h2>
        </div>
    )
}

export default Error;