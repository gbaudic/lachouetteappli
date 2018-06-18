# La Chouette Appli
Maquette d'application mobile pour LCC, le projet de supermarché coopératif et participatif toulousain
www.lachouettecoop.fr

**ATTENTION** : si vous n'êtes pas membre, cette application n'est que d'une utilité limitée. 

## Fonctionnalités prévues

- calcul de caisse espèces
- liste de courses
- pense-bête TAFs
- scan d'articles pour obtenir des informations supplémentaires (via OpenFoodFacts - nécessite une connexion Internet)

A venir selon faisabilité technique : 

- liens vers le journal _le bec et la plume_
- relevés de prix
- carte de membre dématérialisée

## Prérequis

- Node.js >= 6
- Pour le développement Android : JDK 1.8.* (Java 9 et supérieur n'est pas supporté), Android Studio avec le SDK Android, un téléphone sous Android paramétré pour le développement (sources inconnues/apps non signées/mode développeur)
- Pour le développement sous iOS : un Mac avec XCode, un iPhone

## Compilation

`npm install -g ionic cordova`  
`npm install` pour les paquets javascript  
`ionic cordova add android`  
Vérifier qu'un dossier plugins a été créé et que le fichier `android.json` contient bien la liste dans la partie `installed_plugins`.  

Prévisualisation dans le navigateur : `ionic serve` (les fonctionnalités natives génèrent des erreurs)  
Compilation en natif : `ionic cordova build android`, avec éventuellement les options `--prod` et `--release`  
Attention: en mode release, bien effectuer les étapes complémentaires de signature de l'apk et de zipalign, sinon l'installation échouera systématiquement. 

## Licence

GPL v3. Voir le fichier LICENCE pour plus de détails. 
