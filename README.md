# Technical test

## Fixed Bugs

### User: 

- Création d'un user:
  Modification du formulaire pour la création d'un nouvel utilisateur en remplaçant "username" par "name" comme définit dans le model
  retirer : .filter((u) => !filter?.contract || u.contract === filter?.contract) car contract ne fait pas partie de l'objet user

- Mise à jour user:
  changer le onChange par Onclick pour pouvoir mettre à jour les données


### Project :

- Ajouter un nouveau projet :
  Mise à jour de la liste des projets suite à la création d'un nouveau projet en appelant le fetch project à la fin de la création

- Update un projet :
  pour update un projet, dans le controller projet, j'ai remplacé le find par le findOne afin de récupérer un seul projet

- Supprimer un projet:
  Rediriger vers la liste des projets à la fin de la suppression en retirant le "s" de l'url /projects

### Activity :

- Dans le OnChange du <selectProject>, changer le "SetProject(e.name)" par "SetProject(e)"  avec l'object récupérer lorsqu'il y a un changement de sélection
- Dans le endpoint "get Activity", remplacer le "project" par "projectId" pour correspondre à l'API afin de pouvoir récupérer la liste des activités
- Corriger l'erreur (Each child in a list should have a unique "key" prop)
  en modifiant la clé pour la rendre unique afin d'afficher la liste et la selection <React.Fragment key={e.projectId}>


### App.js :

- Ajout de la dépendance dispatch pour assurer que le useEffect est exécuté à chaque fois que le dispatch change pour garantir que
  la logique est tjrs à jour 
- Suppression du if (!user) return <Redirect to={{ pathname: "/auth" }} />; car il repris après 
- Ajout d'une props.location pour conserver la page précédente afin de rediriger vers celle-ci après la connexion.

## New feature 

- Home Page: Création de charts pour avoir une synthèse des totaux des activités & couts par projet 

## Best practices 

Quelques bonnes pratiques ajoutées:

- Compléter les messages d'erreurs dans le catch
- Ajout de la validation des champs (email, ...)
- Rajouter la gestion d'erreurs dans l'api pour le mot de passe (Minimum 1 caractère, 1 chiffre, 1 majuscule, 1 minuscule)
- Rajouter la validation côté front, ça éviterai de faire un appel inutile
- Retirer le code commenté

L'architecture de l'app est bien stucturé, on a les 3 principaux dossiers ; components, scenes et services
Pour la partie api, étant donné qu'on est sur une architecture MVC, il serait intéressant peut être de rajouter une couche service pour gérer la logique métier et les traitements, une couche repository d'accès à la BDD et un dossier routes pour gérer toutes les routes.

