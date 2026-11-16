# Café Louise : infos à lui demander

Le site est en ligne avec ce qu'on a pu vérifier (fiche Google, Instagram @cafelouiseparis, photos de la carte et de l'ardoise). Voici ce qui manque, par ordre d'importance. Où le mettre : entre parenthèses.

## 1. Les horaires exacts
- Google dit **du mardi au samedi, 7 h – 19 h**, l'Instagram dit **7 h – 20 h**. Lequel est juste ? (`data/horaires.json`)
- Fermé le 25 décembre et le 1er janvier ? (déjà marqués fermés, à confirmer) Vacances prévues ? (`closures`)
- Jusqu'à quelle heure sert-il le petit-déjeuner ?

## 2. La carte complète et les prix (`data/carte.json`)
- La formule petit-déjeuner est-elle bien à **7 €** ? (chiffre un peu effacé sur l'ardoise)
- Prix du croissant, du pain au chocolat, de la tartine à l'unité.
- Les omelettes : quelles garnitures, quels prix ?
- Les crêpes : lesquelles, à quel prix ? (aucune photo pour l'instant)
- Les macarons : parfums, prix à l'unité, boîtes (6, 12…) ?
- Tartes, gâteaux à la part, café gourmand : la vitrine change-t-elle chaque jour ?
- Y a-t-il un brunch, des formules le samedi, un goûter ?
- Matcha latte : prix ?

## 3. Anniversaires et petits groupes (`data/site.json` → `party`, textes dans `locales/*.json` → `party`)
- Combien de personnes au maximum ? (le formulaire propose de 4 à 25)
- Gâteaux d'anniversaire : faits sur place ou commandés ? Parfums, tailles, prix, délai pour commander ?
- Faut-il un acompte ? (le paiement en ligne est prévu dans le code, désactivé)
- Réserve-t-il des tables pour le petit-déjeuner ? (le site dit « pas obligatoire, mais possible »)

## 4. Louise et l'histoire du café
- Louise est-elle une vraie personne (les avis parlent d'elle) ? Accepterait-elle une photo et quelques lignes sur l'histoire du café ?
- Depuis quand le café est-il ouvert ? Qui l'a fondé ? (la bio Instagram cite @entrecote.du.xv et @livaland)
- Si oui, le titre « Le petit-déjeuner de Louise » (option 3 dans CONTENU.md) devient possible.

## 5. Contact et réseaux
- E-mail pour les demandes de groupes (`data/site.json` → `email`).
- Le 06 95 13 46 56 reçoit-il bien les messages WhatsApp ? (les deux formulaires y envoient leur récapitulatif)
- Instagram @cafelouiseparis confirmé ; une page Facebook, TikTok ?

## 6. Pratique
- Moyens de paiement acceptés : carte, espèces, tickets-restaurant, Apple Pay ? (`data/site.json` → `paymentMethods`, la FAQ l'affiche)
- Langues parlées par l'équipe (anglais, espagnol ?) pour la FAQ.
- Menu enfant, chaises hautes, accès poussette, toilettes ?
- Nombre de places en salle et en terrasse ; terrasse chauffée l'hiver ?
- Temps de marche réel jusqu'à la tour Eiffel (le site dit « environ 10 minutes », à vérifier).

## 7. Photos (voir assets/A-PHOTOGRAPHIER.md)
- Petit-déjeuner complet en lumière du jour, crêpes, boîte de macarons, théière, comptoir et vitrine, façade entière sans passant.
- Accord pour réutiliser les photos de sa fiche Google et de son Instagram (déjà sur le site, les visages de clients ont été écartés).

## 8. Le logo
- A-t-il le fichier d'origine de l'enseigne (« Café Louise » doré + cœur rose) ? Le logo du site est redessiné d'après la photo de l'enseigne (`public/logo.svg`, `components/Logo.tsx`).

## 9. Mentions légales (`data/site.json` → `legal`)
- SIRET, raison sociale exacte, nom du directeur de la publication.

## 10. Avis
- Accepte-t-il qu'on reprenne 3 vrais avis Google sur le site (prénom, date) ? (`data/avis.json` ; aucun n'est inventé, trois emplacements attendent)
