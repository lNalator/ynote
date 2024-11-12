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

## Lancer les testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
