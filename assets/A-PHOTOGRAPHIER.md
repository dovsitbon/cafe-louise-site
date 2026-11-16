# Photos à prendre sur place

Déposez chaque photo sous le nom indiqué, puis lancez `npm run media` : l'emplacement dessiné (tour Eiffel ou tasse au trait sur fond rose) laisse place à la photo, sans toucher au code. Lumière du jour, sans flash, pas de visages de clients.

| Fichier | Où elle apparaît | Conseil |
|---|---|---|
| `assets/patisseries/crepes.jpg` | Tuile « Crêpes » de l'accueil | Une crêpe pliée sur l'assiette, vue de trois quarts, sur le marbre |
| `assets/petit-dejeuner/formule.jpg` | (à brancher dans `data/carte.json` → photo de la formule) | Croissant, café crème, jus d'orange pressé, en terrasse le matin |
| `assets/patisseries/boite-macarons.jpg` | (à brancher sur l'article « Macarons ») | La boîte ouverte, vue de dessus |
| `assets/salle/theiere.jpg` | (à brancher sur « Thé ou infusion ») | La théière et la tasse sur une table, fauteuils roses derrière |
| `assets/salle/comptoir.jpg` | Page « Salon de thé » (à ajouter dans la mosaïque) | Le comptoir et la vitrine de pâtisseries, de face |
| `assets/facade/facade.jpg` | Bloc « À deux pas de la tour Eiffel » si on veut une photo à la place du plan | Toute la façade avec le store rayé, tôt le matin, sans passant |
| `assets/terrasse/terrasse.jpg` | Page « Petit-déjeuner » | Les tables de terrasse et le boulevard, avec le métro aérien |
| `assets/hero/hero.jpg` | Hero (remplace l'actuel) | Seulement si plus belle : format vertical, petit-déjeuner ou macarons avec la mini tour Eiffel |

Pour la carte : ajoutez `"photo": "/media/<dossier>/<fichier>.jpg"` sur l'article dans `data/carte.json` après `npm run media`.

Photos actuelles : `assets/raw/` (originaux de la fiche Google et de l'Instagram, non versionnés), triées par `scripts/classer.mjs`. Écartées : la façade avec une cliente au premier plan (seule l'enseigne a été gardée), la photo de groupe devant le comptoir, la carte des boissons (utilisée pour les prix), les publications Instagram où l'on voit des visages.
