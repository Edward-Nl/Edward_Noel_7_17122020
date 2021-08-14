# EdwardNoel_7_17122020 EDWARD NOËL - Groupomania - PROJET 7 - FORMATION DEVELOPPEUR WEB OPENCLASSROOMS

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

 Technologies utilisées : Framework REACT js / Nodejs / Express / Sequelize / mySQL /

## INSTRUCTION :
Il faut cloner ce projet GitHub

### Pour faire tourner le frontend :

-Lancer le terminal sur le dossier frontend avec la commande cd frontend. 
-Utiliser npm install pour installer les dépendances. 
-Démarrer le frontend avec la commande npm start, le projet s'affiche sur http://localhost:3000.

### Pour faire tourner le backend :

-Lancer le terminal sur le dossier Backend avec la commande cd Backend. 
-Utiliser npm install pour installer les dépendances, npm install nodemon pour installer nodemon. 
-Dans Backend/config/config.json : merci d'indiquer votre nom d'utilisateur et votre Mdp MySQL ainsi que la database utilisé aux lignes 3,4, et 5.
-Démarrer le backend avec la commande nodemon server, le server sera lancé sur http://localhost:3500

### Pour des raisons de sécurité :

Merci de créer un fichier ".env" dans le dossier backend et d'indiquer : 
PORT = 3500.
TOKEN = "saisir une clé secrète". 
COOKIE_KEYS = "saisir une clé secrète".


-A l'inscription, l'utilisateur dois fournir un mail non utilisé, et un mot de passe de 6 caractères minimum qui dois contenir des chiffres et des lettres
-Une fois incrit il sera invité à ce connecter.

Pour créer un Administrateur -> sur MySql, saisir la commande suivante :
UPDATE `NonDataBase`.`users` SET `adminAccount` = '1' WHERE (`id` = 'Id de l'utilisateur qui deviendra administrateur');
