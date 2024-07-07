# Mon Vieux Grimoire

Projet n°6 de la formation de Développeur Web OpenClassrooms

## Contexte du projet : 

Étant développeur back-end freelance depuis 1 an dans la région de Lille, j'ai été contacté par Kevin, développeur front-end experimenté afin de réaliser la partie back-end du site de Mon Vieux Grimoire. Il s’agit d’une petite chaîne de librairie qui souhaite ouvrir un site de référencement et de notation de livres.

- [La maquette du site](https://www.figma.com/design/Snidyc45xi6qchoOPabMA9/Maquette-Mon-Vieux-Grimoir?node-id=0-1&t=vGJdyCa1fxR2vG3m-0)
- [Les spécifications fonctionnelles du site](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+fonctionnelles.pdf)
- [Les spécifications techniques du site](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf)

## Objectif :

- Implémenter un modèle de données conforme à la réglementation.
- Stocker des données de façon sécurisée
- Réaliser des opérations CRUD sécurisées
- Optimiser les images des utilisateurs

## Prérequis : 

#### Avant d'installer et d'exécuter ce projet, assurez-vous d'avoir installé :

- npm 
- Node.js

## Configuration de la base de données : 

#### Avant de lancer le projet, assurez-vous d'avoir configuré votre base de données MongoDB. Vous pouvez suivre les étapes suivantes :

- Accédez au [site web de MongoDB](https://www.mongodb.com/cloud/atlas/register) et inscrivez-vous pour obtenir un compte.
- Une fois que vous avez accès à votre tableau de bord, créez un cluster et configurez-le selon vos besoins.
- Récupérez votre code URI sur MongoDB et ajoutez-le dans un fichier .env que vous créez à l'intérieur du dossier backend. Configurez les variables d'environnement ainsi :

      PORT=4000 (port sur lequel votre backend sera connecté)
      DB_USER_PASS=*URL de connexion à MongoDB*
      TOKEN_SECRET=*Votre clé secrète pour les tokens JWT*

## Lancer le projet : 

### Front-end : 

#### Avec npm

Utilisez la commande ``npm install`` pour installer les dépendances.

Utilisez la commande ``npm start`` pour lancer le projet.

### Front-end : 

#### Avec npm

Utilisez la commande ``npm install`` pour installer les dépendances.

Utilisez la commande ``npm start`` pour lancer le projet.
