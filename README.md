## Description

Api de Ynote, application scolaire pour tout type d'établissement.
Suiver les étapes suivantes afin d'utiliser l'api correctement.

## Avant de lancer le projet faire

Créer un fichier .env qui contient deux variables: JWT_SECRET (sécurité des données), ADMIN_PASSWORD (mot de passe du compte administrateur)

```bash
$ npm install
```

## Compiler et lancer le projet

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Utiliser swagger

Se connecter en tant qu'administrateur :
- Vous authentifiez via la partie authentification sur la route POST /auth/login (password: variable d'environement PASSWORD_ADMIN, email:"admin@ynote.io").
- Cliquez sur le bouton authorize (en haut à droite) et copier/coller le bearer renvoyer par la methode POST.
- Voilà, vous êtes connecté en tant qu'administrateur.

Creer d'autres utilisateur et se connecter avec :
- Utiliser la route POST /user/create-admin (administrateur), /user/create-prof (professeur) ou /user/create-eleve (eleve) pour créer un utilisateur.
- Vous pouvez vous authentifier au nouveau compte avec la route POST /auth/login (password et email du nouvel utilisateur)
- Cliquez sur le bouton authorize (en haut à droite) et copier/coller le bearer renvoyer par la methode POST.
- Voilà, vous êtes connecté avec votre nouvel utilisateur.

## Autres fonctionnalitées

- Créer, récuperer, modifier et supprimer des "user".
- Créer, récuperer, modifier et supprimer des "classes".
- Créer, récuperer, modifier et supprimer des "notes".
- Créer, récuperer, modifier et supprimer des "roles".

Méthodes GET, GETALL authorisation pour tous les utilisateurs.
Méthodes POST, DELETE, PUT authorisation pour les administrateurs. (Les professeurs ont l'authorisation pour les notes)

## Support

Support de Ynote :
[https://support-ynote.com](https://fr.wikipedia.org/wiki/Clown)