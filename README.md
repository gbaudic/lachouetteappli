# La Chouette Appli
Maquette d'application mobile pour LCC, le projet de supermarché coopératif toulousain
www.lachouettecoop.fr

**ATTENTION** : si vous n'êtes pas membre, cette application n'est que d'une utilité limitée. 

## Fonctionnalités prévues

- calcul de caisse espèces
- carte de membre dématérialisée
- liste de courses

A venir selon faisabilité technique : 
- liste des TAFs
- liens vers le journal _le bec et la plume_

## Prérequis

- Node.js >= 6
- Pour le développement Android : JDK 1.8.* (Java 9 et supérieur n'est pas supporté), Android Studio avec le SDK Android, un téléphone sous Android paramétré pour le développement (sources inconnues/apps non signées/mode développeur)
- Pour le développement sous iOS : un Mac avec XCode, un iPhone

## Compilation

`npm install -g ionic cordova`  
`npm install` pour les paquets javascript  
`ionic cordova add android`  
TODO: installer les plugins natifs cordova dont la liste se trouve dans le fichier, vérifier qu'un dossier plugins a été créé et que le fichier `android.json` contient bien la liste dans la partie `installed_plugins`.  

Prévisualisation dans le navigateur : `ionic serve` (les fonctionnalités natives génèrent des erreurs)  
Compilation en natif : `ionic cordova build android`, avec éventuellement les options `--prod` et `--release`

## Licence

GPL v3. Voir le fichier LICENSE pour plus de détails. 
