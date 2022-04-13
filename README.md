# Projet de cours OpenClassrooms Groupomania  
Projet de la formation développeur web 

 ## Langages et Technologies utilisées  
 * HTML / CSS / JAVASCRIPT 
 * REACT.js  
 * NODE.js  
 * EXPRESS.js  
 * L'Orm SEQUELIZE & MySQL  

## Instruction  

Le but est de créer un reseau social d'enetreprise.  
Rien n'est fourni pour ce projet.  
Le frontend doit être développé avec un framework Front-end, le site doit contenir des pages d'inscription, et de connexion.  
La page d'accueil doit contenir les dernier post des utilisateur, les posts peuvent contenir du text, et des medias.  
Il y a  également des pages de profil personnel, et des pages de profil "public".  
L'utilisateur peut supprimer ses post, commantaires, et son compte, il peut modifier sa photo de profil, et son mot de passe.  
Le backend doit être entièrement fait avec Node et Express, et les routes CRUD sont à développer.  
Pour le projet l'utilisation de MySql est obligatoire, differentes tables sont utilisées pour les données, posts, etc ...  
L'Api doit également être sécurisé, et les données des utilisateurs protégées.  
Le suite ne doit pas être accesible si l'utilisateur ne ce connecte pas 

## Installation du frontend  
* Il faut cloner ce projet, et l'ouvrir dans l'IDE.  
* Lancer le terminal sur le dossier frontend avec la commande `cd frontend`.  
* Utiliser `npm install` pour installer les dépendances.  
* Démarrer le frontend avec la commande `npm start`, le projet s'affiche sur http://localhost:3000.  

## Installation du backend  
* Lancer le terminal sur le dossier Backend avec la commande `cd Backend`.  
* Utiliser `npm install` pour installer les dépendances, `npm install nodemon` pour installer nodemon.  
* Dans Backend/config/config.json : merci d'indiquer votre nom d'utilisateur et votre Mot de passe MySQL ainsi que la database utilisé aux lignes 3,4, et 5.  
* Démarrer le backend avec la commande `nodemon server`, le server sera lancé sur http://localhost:3500  

### Pour des raisons de sécurité :
Merci de créer un fichier ".env" dans le dossier backend et d'indiquer :  
PORT = 3500.  
TOKEN = "saisir une clé secrète".   
COOKIE_KEYS = "saisir une clé secrète".  


*A l'inscription, l'utilisateur dois fournir un mail non utilisé, et un mot de passe de 6 caractères minimum qui dois contenir des chiffres et des lettres
-Une fois incrit il sera invité à ce connecter.*  

--------------------------------------------

Pour créer un Administrateur :  
Sur MySql, saisir la commande suivante :  
`UPDATE NonDataBase . users SET adminAccount = 1 WHERE (id = Id de l'utilisateur qui deviendra administrateur);`

----------------------------------------------
*Ce projet a été validé le 16/08/2021*
