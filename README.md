# JDR app

Une application qui permet de suivre ces parties de JDR en cours.

## Les fonctionnalitées

L'application est encore à une version Beta

Actuellement, il est possible de :

- Créer un compte utilisateur
- Se connecter avec un compte existant
- Se déconnecter
- Afficher ses informations de comptes
- afficher les pages Parties et Personnages

## Lancer le projet

Le projet possède un back (avec une base de donnée) et un front.

### Lancer le serveur back

```bash
    cd ./back
    npm run server
```

### Lancer l'application

```bash
    cd ./jdr-app-front
    npm start
```

### Utilisateur test

pour tester les fonctionnalités de connexion, un utilisateur test exites.

pseudo : test

password : mdp

## Les futures fonctionnalités

### V1

- Ajouter un personnage
- Ajouter une partie
- Création des tables Personnages et Parties côté back
- Modifier son compte
- Modifier un Personnages
- Modifier une partie

### V2

- Uploader une ficher personnage
- Imprimer une ficher personnage
- Ajouter un utilisateur en ami
- Ajouter un personnage dans une partie
