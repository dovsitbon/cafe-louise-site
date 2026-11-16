# Café Louise : contenu du site

Tous les textes et la carte, pour validation. Ce qui est marqué « À REMPLIR » manque encore : voir INFOS-A-DEMANDER.md.

Relevé le 2026-11-16 à partir de sa fiche Google (4.8/5, 946 avis, horaires, téléphone, photos dont la carte de table et l'ardoise), de son Instagram @cafelouiseparis (bio, dernières publications) et des thèmes qui reviennent dans les avis (vue et proximité de la tour Eiffel, macarons, omelettes, anniversaires, pain au chocolat, accueil, salon de thé, crêpes). Aucun avis n'est recopié ni inventé.

Les textes se corrigent dans `locales/fr.json`, `locales/en.json`, `locales/es.json` ; la carte dans `data/carte.json` ; les horaires dans `data/horaires.json` ; le bandeau dans `data/annonces.json` ; les avis dans `data/avis.json`. Puis `npm run contenu` pour régénérer ce fichier.

## Titre du hero : trois propositions

1. **« Un café parisien, tout près de la tour Eiffel »** (retenu) : dit en une ligne ce que cherchent les voyageurs, et reprend la recherche « café près de la tour Eiffel ».
2. « Croissants, crêpes et macarons » : la carte en trois mots, plus gourmand, moins utile pour le référencement.
3. « Le petit-déjeuner de Louise » : plus intime, à garder si Louise accepte d'apparaître sur le site (photo, histoire du café).

## Référencement (balises title et description)

- **Title de l'accueil**
  - FR : Café et petit-déjeuner près de la tour Eiffel, Paris 15 | Café Louise
  - EN : Café and breakfast near the Eiffel Tower, Paris 15 | Café Louise
  - ES : Café y desayuno cerca de la torre Eiffel, París 15 | Café Louise
- **Description de l'accueil**
  - FR : Café Louise, café et salon de thé au 57 boulevard de Grenelle (Paris 15), à 10 minutes à pied de la tour Eiffel. Petit-déjeuner dès 7 h, omelettes, crêpes, macarons. 4,8/5 sur Google.
  - EN : Café Louise, a café and tea room at 57 boulevard de Grenelle (Paris 15), a 10-minute walk from the Eiffel Tower. Breakfast from 7 am, omelettes, crêpes, macarons. Rated 4.8/5 on Google.
  - ES : Café Louise, café y salón de té en el 57 boulevard de Grenelle (París 15), a 10 minutos a pie de la torre Eiffel. Desayuno desde las 7:00, tortillas, crepes, macarons. 4,8/5 en Google.
- **Title · La carte**
  - FR : La carte : petit-déjeuner, crêpes, macarons, cafés | Café Louise Paris 15
  - EN : Menu: breakfast, crêpes, macarons, coffee | Café Louise Paris 15
  - ES : La carta: desayuno, crepes, macarons, cafés | Café Louise París 15
- **Description · La carte**
  - FR : La carte du Café Louise près de la tour Eiffel : formule petit-déjeuner à 7 €, omelettes, crêpes, macarons, cafés et thés, avec les prix.
  - EN : The Café Louise menu near the Eiffel Tower: €7 set breakfast, omelettes, crêpes, macarons, coffees and teas, with prices.
  - ES : La carta del Café Louise cerca de la torre Eiffel: menú desayuno a 7 €, tortillas, crepes, macarons, cafés y tés, con precios.
- **Title · Réserver une table**
  - FR : Réserver une table au Café Louise, près de la tour Eiffel | Paris 15
  - EN : Book a table at Café Louise, near the Eiffel Tower | Paris 15
  - ES : Reservar mesa en el Café Louise, cerca de la torre Eiffel | París 15
- **Description · Réserver une table**
  - FR : Réservez votre table au Café Louise, 57 boulevard de Grenelle : petit-déjeuner, salon de thé, anniversaires. Demande envoyée par WhatsApp, confirmée par le café.
  - EN : Book your table at Café Louise, 57 boulevard de Grenelle: breakfast, tea room, birthdays. Request sent on WhatsApp, confirmed by the café.
  - ES : Reserve su mesa en el Café Louise, 57 boulevard de Grenelle: desayuno, salón de té, cumpleaños. Solicitud por WhatsApp, confirmada por el café.
- **Title · Petit-déjeuner près de la tour Eiffel**
  - FR : Petit-déjeuner près de la tour Eiffel, dès 7 h | Café Louise Paris 15
  - EN : Breakfast near the Eiffel Tower, from 7 am | Café Louise Paris 15
  - ES : Desayuno cerca de la torre Eiffel, desde las 7:00 | Café Louise París 15
- **Description · Petit-déjeuner près de la tour Eiffel**
  - FR : Un vrai petit-déjeuner parisien à 10 minutes à pied de la tour Eiffel : croissant, café, jus d'orange pour 7 €, omelettes et crêpes. Dès 7 h, du mardi au samedi.
  - EN : A real Parisian breakfast a 10-minute walk from the Eiffel Tower: croissant, coffee and orange juice for €7, omelettes and crêpes. From 7 am, Tuesday to Saturday.
  - ES : Un auténtico desayuno parisino a 10 minutos a pie de la torre Eiffel: cruasán, café y zumo de naranja por 7 €, tortillas y crepes. Desde las 7:00, de martes a sábado.
- **Title · Salon de thé Paris 15**
  - FR : Salon de thé Paris 15, Grenelle et Dupleix : thé, macarons | Café Louise
  - EN : Tea room in Paris 15, Grenelle and Dupleix: tea, macarons | Café Louise
  - ES : Salón de té en París 15, Grenelle y Dupleix: té, macarons | Café Louise
- **Description · Salon de thé Paris 15**
  - FR : Le salon de thé du boulevard de Grenelle : thé en théière, café viennois, macarons et pâtisseries, dans une salle rose et marbre près de Dupleix. Du mardi au samedi.
  - EN : The tea room on boulevard de Grenelle: tea in a pot, café viennois, macarons and pastries, in a pink and marble room near Dupleix. Tuesday to Saturday.
  - ES : El salón de té del boulevard de Grenelle: té en tetera, café vienés, macarons y pasteles, en una sala rosa y de mármol cerca de Dupleix. De martes a sábado.
- **Title · Mentions légales**
  - FR : Mentions légales | Café Louise
  - EN : Legal notice | Café Louise
  - ES : Aviso legal | Café Louise
- **Description · Mentions légales**
  - FR : Mentions légales du site du Café Louise, 57 boulevard de Grenelle, 75015 Paris.
  - EN : Legal notice for the Café Louise website, 57 boulevard de Grenelle, 75015 Paris.
  - ES : Aviso legal de la web del Café Louise, 57 boulevard de Grenelle, 75015 París.

## Bandeau du haut

- **Par défaut** : À 10 minutes à pied de la tour Eiffel · Petit-déjeuner dès 7 h, du mardi au samedi / A 10-minute walk from the Eiffel Tower · Breakfast from 7 am, Tuesday to Saturday / A 10 minutos a pie de la torre Eiffel · Desayuno desde las 7:00, de martes a sábado
- **fetes-2026** (du 2026-12-08 au 2026-12-31) : Fêtes de fin d'année : boîtes de macarons à offrir, pensez à les commander · Fermé le 25 décembre / Holiday season: boxes of macarons to give, order ahead · Closed on 25 December / Fiestas: cajas de macarons para regalar, encárguelas con tiempo · Cerrado el 25 de diciembre
- **saint-valentin-2027** (du 2027-02-05 au 2027-02-14) : Saint-Valentin : un petit-déjeuner à deux, à dix minutes de la tour Eiffel / Valentine's Day: breakfast for two, ten minutes from the Eiffel Tower / San Valentín: un desayuno para dos, a diez minutos de la torre Eiffel

## Accueil

- **Petite ligne**
  - FR : Café · Salon de thé · Près de la tour Eiffel
  - EN : Café · Tea room · Near the Eiffel Tower
  - ES : Café · Salón de té · Cerca de la torre Eiffel
- **Titre**
  - FR : Un café parisien, tout près de la tour Eiffel
  - EN : A Parisian café, close to the Eiffel Tower
  - ES : Un café parisino, muy cerca de la torre Eiffel
- **Sous-titre**
  - FR : Croissants dès 7 h, omelettes, crêpes, macarons et thé servi en théière, sur le boulevard de Grenelle.
  - EN : Croissants from 7 am, omelettes, crêpes, macarons and tea served in a pot, on boulevard de Grenelle.
  - ES : Cruasanes desde las 7:00, tortillas, crepes, macarons y té servido en tetera, en el boulevard de Grenelle.

### Tuiles

- **petit-dejeuner**
  - FR : Petit-déjeuner parisien
  - EN : Parisian breakfast
  - ES : Desayuno parisino
- **sale**
  - FR : Omelettes et salé
  - EN : Omelettes and savoury
  - ES : Tortillas y salado
- **crepes**
  - FR : Crêpes
  - EN : Crêpes
  - ES : Crepes
- **patisseries**
  - FR : Macarons et pâtisseries
  - EN : Macarons and pastries
  - ES : Macarons y pasteles
- **salon**
  - FR : Salon de thé
  - EN : Tea room
  - ES : Salón de té
- **boissons**
  - FR : Boissons
  - EN : Drinks
  - ES : Bebidas

### Services (4 pictos)

- **Picto 1**
  - FR : À 10 min de la tour Eiffel — À pied, par le Champ-de-Mars
  - EN : 10 min from the Eiffel Tower — On foot, across the Champ-de-Mars
  - ES : A 10 min de la torre Eiffel — A pie, por el Campo de Marte
- **Picto 2**
  - FR : Ouvert dès 7 h — Du mardi au samedi
  - EN : Open from 7 am — Tuesday to Saturday
  - ES : Abierto desde las 7:00 — De martes a sábado
- **Picto 3**
  - FR : Terrasse — Sur le boulevard de Grenelle
  - EN : Terrace — On boulevard de Grenelle
  - ES : Terraza — En el boulevard de Grenelle
- **Picto 4**
  - FR : Anniversaires — Gâteau, bougie, table prête
  - EN : Birthdays — Cake, candle, table ready
  - ES : Cumpleaños — Tarta, vela y mesa preparada

### Carte (intro)

- **Titre**
  - FR : Du premier café au goûter
  - EN : From the first coffee to afternoon tea
  - ES : Del primer café a la merienda
- **Texte**
  - FR : Prix affichés au comptoir, en euros, service compris. Les formules sont en tête de chaque onglet.
  - EN : Prices in euros, service included. Set menus come first in each tab.
  - ES : Precios en euros, servicio incluido. Los menús aparecen primero en cada pestaña.

### Blocs alternés

- **Bloc 1 · titre**
  - FR : Le petit-déjeuner parisien
  - EN : A Parisian breakfast
  - ES : El desayuno parisino
- **Bloc 1 · texte**
  - FR : Un croissant encore tiède, un café crème, un jus d'orange pressé. La formule est à 7 € et on la sert dès l'ouverture, à 7 h : le bon moment pour voir Paris se réveiller avant de monter à la tour.
  - EN : A croissant still warm, a café crème, a freshly squeezed orange juice. The set breakfast is €7 and served from opening time, 7 am: the right moment to watch Paris wake up before heading to the tower.
  - ES : Un cruasán aún tibio, un café con leche, un zumo de naranja natural. El menú desayuno cuesta 7 € y se sirve desde la apertura, a las 7:00: el mejor momento para ver despertar a París antes de subir a la torre.
- **Bloc 1 · bouton**
  - FR : Voir la carte
  - EN : See the menu
  - ES : Ver la carta
- **Bloc 2 · titre**
  - FR : Macarons et salon de thé
  - EN : Macarons and the tea room
  - ES : Macarons y salón de té
- **Bloc 2 · texte**
  - FR : Fauteuils en velours rose, tables de marbre, fleurs partout. On s'y pose pour un thé en théière, un café viennois ou une boîte de macarons, framboise, pistache ou vanille.
  - EN : Pink velvet armchairs, marble tables, flowers everywhere. Settle in for a pot of tea, a café viennois or a box of macarons: raspberry, pistachio or vanilla.
  - ES : Sillones de terciopelo rosa, mesas de mármol, flores por todas partes. Aquí se viene a tomar un té en tetera, un café vienés o una caja de macarons: frambuesa, pistacho o vainilla.
- **Bloc 2 · bouton**
  - FR : Découvrir
  - EN : Discover
  - ES : Descubrir
- **Bloc 3 · titre**
  - FR : À deux pas de la tour Eiffel
  - EN : Steps from the Eiffel Tower
  - ES : A dos pasos de la torre Eiffel
- **Bloc 3 · texte**
  - FR : Environ 10 minutes à pied par le Champ-de-Mars. Le métro Dupleix (ligne 6) est juste à côté, sous le métro aérien du boulevard de Grenelle.
  - EN : About a 10-minute walk across the Champ-de-Mars. Dupleix metro station (line 6) is right next door, under the elevated tracks of boulevard de Grenelle.
  - ES : Unos 10 minutos a pie cruzando el Campo de Marte. La estación de metro Dupleix (línea 6) está justo al lado, bajo el metro elevado del boulevard de Grenelle.
- **Bloc 3 · bouton**
  - FR : Itinéraire
  - EN : Directions
  - ES : Cómo llegar

### Anniversaires et petits groupes

- **Titre**
  - FR : On prépare la table, vous apportez les invités
  - EN : We set the table, you bring the guests
  - ES : Nosotros preparamos la mesa, usted trae a los invitados
- **Texte**
  - FR : Un anniversaire, des retrouvailles, une demande en mariage au pied de la tour ? Dites-nous la date, le nombre de personnes et le gâteau qui vous ferait plaisir : on vous répond sur WhatsApp pour tout caler.
  - EN : A birthday, a reunion, a proposal near the tower? Tell us the date, how many of you there will be and the cake you'd like: we'll reply on WhatsApp to sort it all out.
  - ES : ¿Un cumpleaños, un reencuentro, una pedida de mano cerca de la torre? Díganos la fecha, cuántas personas serán y la tarta que le gustaría: le respondemos por WhatsApp para organizarlo todo.
- **Liste**
  - FR : Un gâteau d'anniversaire, avec sa bougie · Une table réservée et décorée · Macarons ou café gourmand pour finir
  - EN : A birthday cake, with its candle · A reserved, decorated table · Macarons or a café gourmand to finish
  - ES : Una tarta de cumpleaños, con su vela · Una mesa reservada y decorada · Macarons o café gourmand para terminar
- **Mention**
  - FR : Demande à confirmer par le café : rien n'est réservé tant que vous n'avez pas sa réponse.
  - EN : Request to be confirmed by the café: nothing is booked until you hear back.
  - ES : Solicitud pendiente de confirmación por el café: no hay nada reservado hasta recibir su respuesta.

### Avis

Aucun avis inventé : trois emplacements « Avis client à venir » tant que `data/avis.json` est vide.
- **Titre**
  - FR : Près de 950 avis, 4,8 sur 5
  - EN : Nearly 950 reviews, 4.8 out of 5
  - ES : Casi 950 reseñas, 4,8 sobre 5
- **Texte**
  - FR : Les voyageurs parlent de la vue sur la tour, des omelettes, des macarons et de l'accueil. Lisez-les directement sur Google.
  - EN : Travellers mention the view of the tower, the omelettes, the macarons and the warm welcome. Read them directly on Google.
  - ES : Los viajeros hablan de la vista de la torre, de las tortillas, de los macarons y de la acogida. Léalas directamente en Google.

### FAQ

- **Q1**
  - FR : Faut-il réserver ?
  - EN : Do I need to book?
  - ES : ¿Hay que reservar?
- **R1**
  - FR : Non, on vient comme on est. Pour un groupe, un anniversaire ou une heure précise, mieux vaut envoyer une demande par WhatsApp ou appeler le 06 95 13 46 56 : on vous confirme la table.
  - EN : No, just walk in. For a group, a birthday or a specific time, it's best to send a request on WhatsApp or call +33 6 95 13 46 56: the café will confirm your table.
  - ES : No, puede venir sin más. Para un grupo, un cumpleaños o una hora concreta, mejor envíe una solicitud por WhatsApp o llame al +33 6 95 13 46 56: el café le confirma la mesa.
- **Q2**
  - FR : À quelle heure sert-on le petit-déjeuner ?
  - EN : What time is breakfast served?
  - ES : ¿A qué hora se sirve el desayuno?
- **R2**
  - FR : Dès l'ouverture, à 7 h, du mardi au samedi. La formule petit-déjeuner (viennoiserie ou tartine, boisson chaude et jus d'orange) est à 7 €.
  - EN : From opening time, 7 am, Tuesday to Saturday. The set breakfast (pastry or bread and butter, hot drink and orange juice) is €7.
  - ES : Desde la apertura, a las 7:00, de martes a sábado. El menú desayuno (bollería o tostada, bebida caliente y zumo de naranja) cuesta 7 €.
- **Q3**
  - FR : Y a-t-il des options végétariennes ?
  - EN : Are there vegetarian options?
  - ES : ¿Hay opciones vegetarianas?
- **R3**
  - FR : Oui : viennoiseries, crêpes, omelette nature ou au fromage, pâtisseries et macarons. En cas d'allergie, dites-le en commandant : on vous indique ce que contient chaque pâtisserie.
  - EN : Yes: pastries, crêpes, plain or cheese omelettes, cakes and macarons. If you have an allergy, mention it when ordering and we'll tell you what each pastry contains.
  - ES : Sí: bollería, crepes, tortilla natural o de queso, pasteles y macarons. Si tiene alguna alergia, dígalo al pedir y le indicamos qué lleva cada pastel.
- **Q4**
  - FR : Avez-vous un menu enfant ?
  - EN : Do you have a children's menu?
  - ES : ¿Tienen menú infantil?
- **R4**
  - FR : Pas de menu enfant fixe pour l'instant. Une crêpe et un chocolat chaud font souvent le bonheur des plus petits ; demandez-nous, on trouve toujours quelque chose.
  - EN : There's no fixed children's menu for now. A crêpe and a hot chocolate usually make little ones happy; just ask, we'll always find something.
  - ES : Por ahora no hay un menú infantil fijo. Una crepe y un chocolate caliente suelen hacer felices a los pequeños; pregúntenos, siempre encontramos algo.
- **Q5**
  - FR : Peut-on fêter un anniversaire ?
  - EN : Can we celebrate a birthday?
  - ES : ¿Se puede celebrar un cumpleaños?
- **R5**
  - FR : Oui, c'est même une habitude de la maison : gâteau, bougie, table préparée. Envoyez votre demande quelques jours avant avec le formulaire « Anniversaires » ; le café vous répond sur WhatsApp.
  - EN : Yes, it's something of a house tradition: cake, candle, table set up for you. Send your request a few days ahead with the « Birthdays » form; the café replies on WhatsApp.
  - ES : Sí, es casi una tradición de la casa: tarta, vela y mesa preparada. Envíe su solicitud unos días antes con el formulario « Cumpleaños »; el café le responde por WhatsApp.
- **Q6**
  - FR : Quelles langues parlez-vous ?
  - EN : Which languages do you speak?
  - ES : ¿Qué idiomas hablan?
- **R6**
  - FR : Le site et la carte existent en français, en anglais et en espagnol. Des voyageurs du monde entier passent chaque jour : avec la carte sous les yeux, on se comprend toujours.
  - EN : The website and the menu are in French, English and Spanish. Travellers from all over the world come by every day: with the menu in front of you, we always understand each other.
  - ES : La web y la carta están en francés, inglés y español. Cada día pasan viajeros de todo el mundo: con la carta delante, siempre nos entendemos.
- **Q7**
  - FR : Quels moyens de paiement acceptez-vous ?
  - EN : Which payment methods do you accept?
  - ES : ¿Qué formas de pago aceptan?
- **R7**
  - FR : Ils seront précisés ici très bientôt. En cas de doute, appelez-nous au 06 95 13 46 56. (tant que data/site.json → paymentMethods est vide)
  - EN : They'll be listed here very soon. If in doubt, call us on +33 6 95 13 46 56. (tant que data/site.json → paymentMethods est vide)
  - ES : Se indicarán aquí muy pronto. Si tiene dudas, llámenos al +33 6 95 13 46 56. (tant que data/site.json → paymentMethods est vide)

### Pied de page

- **Phrase**
  - FR : Café, salon de thé et petit-déjeuner parisien, à dix minutes de la tour Eiffel.
  - EN : Café, tea room and Parisian breakfast, ten minutes from the Eiffel Tower.
  - ES : Café, salón de té y desayuno parisino, a diez minutos de la torre Eiffel.

## Pages


### Petit-déjeuner près de la tour Eiffel

- **Titre**
  - FR : Petit-déjeuner près de la tour Eiffel
  - EN : Breakfast near the Eiffel Tower
  - ES : Desayuno cerca de la torre Eiffel
- **Intro**
  - FR : Dès 7 h, avant la file d'attente de la tour : un croissant, un café crème et un jus d'orange, au 57 boulevard de Grenelle.
  - EN : From 7 am, before the queues at the tower: a croissant, a café crème and an orange juice, at 57 boulevard de Grenelle.
  - ES : Desde las 7:00, antes de las colas de la torre: un cruasán, un café con leche y un zumo de naranja, en el 57 boulevard de Grenelle.
- **Section 1 · titre**
  - FR : Un vrai petit-déjeuner parisien
  - EN : A real Parisian breakfast
  - ES : Un auténtico desayuno parisino
- **Section 1 · texte**
  - FR : La formule à 7 € reprend ce que les Parisiens prennent au comptoir : une viennoiserie (croissant ou pain au chocolat) ou une tartine, une boisson chaude et un jus d'orange. Pour une faim plus grande, il y a les omelettes, servies avec de la baguette, et les crêpes.
  - EN : The €7 set breakfast is what Parisians have at the counter: a pastry (croissant or pain au chocolat) or bread and butter, a hot drink and an orange juice. Hungrier? There are omelettes, served with baguette, and crêpes.
  - ES : El menú de 7 € es lo que toman los parisinos en la barra: una pieza de bollería (cruasán o pain au chocolat) o una tostada, una bebida caliente y un zumo de naranja. ¿Más hambre? Hay tortillas, servidas con baguette, y crepes.
- **Section 2 · titre**
  - FR : Dès 7 h, avant de monter à la tour
  - EN : From 7 am, before you climb the tower
  - ES : Desde las 7:00, antes de subir a la torre
- **Section 2 · texte**
  - FR : Le café ouvre à 7 h du mardi au samedi. La tour Eiffel est à environ 10 minutes à pied, en passant par le Champ-de-Mars : de quoi prendre son temps et arriver parmi les premiers. Métro Dupleix (ligne 6) à 2 minutes, La Motte-Picquet – Grenelle (lignes 6, 8 et 10) à 6 minutes.
  - EN : The café opens at 7 am, Tuesday to Saturday. The Eiffel Tower is about a 10-minute walk away across the Champ-de-Mars: time to enjoy breakfast and still be among the first in line. Dupleix metro (line 6) is 2 minutes away, La Motte-Picquet – Grenelle (lines 6, 8 and 10) 6 minutes.
  - ES : El café abre a las 7:00 de martes a sábado. La torre Eiffel está a unos 10 minutos a pie cruzando el Campo de Marte: tiempo de sobra para desayunar y llegar entre los primeros. Metro Dupleix (línea 6) a 2 minutos, La Motte-Picquet – Grenelle (líneas 6, 8 y 10) a 6 minutos.
- **Section 3 · titre**
  - FR : En terrasse ou bien au chaud
  - EN : On the terrace or inside
  - ES : En la terraza o dentro, al calor
- **Section 3 · texte**
  - FR : Quelques tables en terrasse sur le boulevard, sous le store rayé, et une salle rose et dorée à l'intérieur, avec ses fauteuils en velours. Le dimanche et le lundi, le café est fermé.
  - EN : A few terrace tables on the boulevard under the striped awning, and a pink and gold room inside, with velvet armchairs. The café is closed on Sundays and Mondays.
  - ES : Unas cuantas mesas en la terraza del bulevar, bajo el toldo de rayas, y una sala rosa y dorada en el interior, con sillones de terciopelo. El café cierra los domingos y los lunes.

### Salon de thé Paris 15

- **Titre**
  - FR : Un salon de thé à Paris 15, entre Dupleix et Grenelle
  - EN : A tea room in Paris 15, between Dupleix and Grenelle
  - ES : Un salón de té en París 15, entre Dupleix y Grenelle
- **Intro**
  - FR : Thé en théière, café viennois, macarons et pâtisseries, dans une salle en velours rose et marbre blanc.
  - EN : Tea served in a pot, café viennois, macarons and pastries, in a room of pink velvet and white marble.
  - ES : Té en tetera, café vienés, macarons y pasteles, en una sala de terciopelo rosa y mármol blanco.
- **Section 1 · titre**
  - FR : Le décor
  - EN : The room
  - ES : La sala
- **Section 1 · texte**
  - FR : Fauteuils coquillage en velours rose, tables en marbre cerclées de laiton, abat-jour à franges, guirlandes de fleurs au plafond : la salle a été pensée comme un petit salon parisien. On y vient seul avec un livre, à deux, ou en famille pour le goûter.
  - EN : Pink velvet shell armchairs, brass-rimmed marble tables, fringed lampshades, garlands of flowers on the ceiling: the room was designed like a little Parisian salon. Come on your own with a book, as a couple, or with the family for an afternoon treat.
  - ES : Sillones de concha en terciopelo rosa, mesas de mármol con borde de latón, lámparas con flecos, guirnaldas de flores en el techo: la sala está pensada como un pequeño salón parisino. Se viene solo con un libro, en pareja o en familia a merendar.
- **Section 2 · titre**
  - FR : Thé, macarons et pâtisseries
  - EN : Tea, macarons and pastries
  - ES : Té, macarons y pasteles
- **Section 2 · texte**
  - FR : Thés et infusions servis en théière, café viennois sous sa crème fouettée, chocolat chaud. À côté : macarons à l'unité ou en boîte, tartes du jour, gâteaux à la part et café gourmand. Les prix sont sur la carte, en ligne et à jour.
  - EN : Teas and herbal teas served in a pot, café viennois under its whipped cream, hot chocolate. Alongside: macarons by the piece or boxed, tarts of the day, cake by the slice and café gourmand. Prices are on the menu, online and up to date.
  - ES : Tés e infusiones en tetera, café vienés con su nata montada, chocolate caliente. Y para acompañar: macarons por unidad o en caja, tartas del día, pasteles por porción y café gourmand. Los precios están en la carta, en línea y al día.
- **Section 3 · titre**
  - FR : Dans le quartier
  - EN : In the neighbourhood
  - ES : En el barrio
- **Section 3 · texte**
  - FR : Au 57 boulevard de Grenelle, sous le métro aérien, à deux minutes du métro Dupleix et à six de La Motte-Picquet – Grenelle. Le Champ-de-Mars et la tour Eiffel sont à une dizaine de minutes à pied.
  - EN : At 57 boulevard de Grenelle, under the elevated metro, two minutes from Dupleix station and six from La Motte-Picquet – Grenelle. The Champ-de-Mars and the Eiffel Tower are about ten minutes away on foot.
  - ES : En el 57 boulevard de Grenelle, bajo el metro elevado, a dos minutos de la estación Dupleix y a seis de La Motte-Picquet – Grenelle. El Campo de Marte y la torre Eiffel quedan a unos diez minutos a pie.

### La carte

- **Intro**
  - FR : Petit-déjeuner, omelettes, crêpes, pâtisseries et boissons, avec les prix. Les formules du midi sont dans l'onglet « Omelettes et salé ».
  - EN : Breakfast, omelettes, crêpes, pastries and drinks, with prices. The lunch set menus are in the « Omelettes and savoury » tab.
  - ES : Desayuno, tortillas, crepes, pasteles y bebidas, con precios. Los menús de mediodía están en la pestaña « Tortillas y salado ».

### Réserver une table

- **Intro**
  - FR : Pas obligatoire, mais pratique pour une heure précise ou une occasion. Votre demande part sur WhatsApp, le café vous confirme.
  - EN : Not required, but handy for a specific time or a special occasion. Your request goes out on WhatsApp and the café confirms.
  - ES : No es obligatorio, pero resulta práctico para una hora concreta o una ocasión especial. Su solicitud se envía por WhatsApp y el café le confirma.

## Messages WhatsApp envoyés par les formulaires

- **Réservation (début)**
  - FR : Bonjour Café Louise, je voudrais réserver une table.
  - EN : Hello Café Louise, I'd like to book a table.
  - ES : Hola, Café Louise. Quisiera reservar una mesa.
- **Anniversaire / groupe (début)**
  - FR : Bonjour Café Louise, je prépare un anniversaire ou une sortie de groupe.
  - EN : Hello Café Louise, I'm planning a birthday or a group outing.
  - ES : Hola, Café Louise. Estoy preparando un cumpleaños o una salida en grupo.

## La carte (data/carte.json)

Prix sûrs (relevés en photo) : toutes les boissons fraîches et chaudes de la carte de table, le café gourmand (8,50 €), les formules du midi de l'ardoise (sandwich 9,90 €, salade 11,90 €, plat du jour 13,90 €) et le plat du jour seul (9,90 €).
À confirmer : la formule petit-déjeuner à 7 € (chiffre un peu effacé sur l'ardoise). À remplir : viennoiseries à l'unité, omelettes, crêpes, macarons, tartes et gâteaux (noms tirés des photos et des avis).

### Petit-déjeuner · Breakfast · Desayuno

| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Formule petit-déjeuner parisien / Parisian breakfast set / Menú desayuno parisino | 7,00 € | Un croissant, un pain au chocolat ou une tartine, une boisson chaude et un jus d'orange. | formule | oui |
| Croissant / Croissant / Cruasán | **À REMPLIR** | Pur beurre, doré, à manger encore tiède avec le café. | végétarien | oui |
| Pain au chocolat / Pain au chocolat / Pain au chocolat | **À REMPLIR** | Le classique du matin parisien, deux barres de chocolat. | végétarien | à prendre |
| Tartine beurre et confiture / Bread, butter and jam / Tostada con mantequilla y mermelada | **À REMPLIR** | Baguette fraîche, beurre et confiture. | végétarien | à prendre |

### Omelettes et salé · Omelettes and savoury · Tortillas y salado

| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Omelette / Omelette / Tortilla francesa | **À REMPLIR** | Nature, jambon, fromage ou jambon-fromage, servie avec de la baguette. | on l'adore | oui |
| Formule sandwich / Sandwich lunch deal / Menú bocadillo | 9,90 € | Sandwich, boisson et dessert. Le midi. | formule | à prendre |
| Formule salade / Salad lunch deal / Menú ensalada | 11,90 € | Salade, boisson et dessert. Le midi. | formule | à prendre |
| Formule plat du jour / Dish of the day deal / Menú plato del día | 13,90 € | Plat du jour, boisson et dessert. Le plat change chaque jour, il est écrit sur l'ardoise. | formule | à prendre |
| Plat du jour seul / Dish of the day only / Solo plato del día | 9,90 € | Cuisine française simple, faite le jour même (par exemple un fish and chips de merlu et sa ratatouille). |  | à prendre |

### Crêpes · Crêpes · Crepes

| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Crêpe au sucre / Sugar crêpe / Crepe de azúcar | **À REMPLIR** | La plus simple, beurre et sucre. | végétarien | à prendre |
| Crêpe au chocolat / Chocolate crêpe / Crepe de chocolate | **À REMPLIR** | Nappée de chocolat fondu. | végétarien | à prendre |
| Crêpe à la confiture / Jam crêpe / Crepe de mermelada | **À REMPLIR** | Avec une confiture de fruits rouges. | végétarien | à prendre |

### Pâtisseries et macarons · Pastries and macarons · Pasteles y macarons

| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Macarons / Macarons / Macarons | **À REMPLIR** | Framboise, pistache, vanille, café… À l'unité, sur place, ou en boîte à emporter. | on l'adore, végétarien | oui |
| Café gourmand / Café gourmand / Café gourmand | 8,50 € | Un espresso et un assortiment de petites douceurs. |  | à prendre |
| Tartes du jour / Tarts of the day / Tartas del día | **À REMPLIR** | Pommes, myrtilles, citron meringué : selon la vitrine du jour. | végétarien | oui |
| Gâteaux et entremets / Cakes and entremets / Tartas y entremets | **À REMPLIR** | À la part, ou entier sur commande pour un anniversaire. | végétarien | oui |

### Boissons chaudes · Hot drinks · Bebidas calientes

| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Espresso / Espresso / Espresso | 2,50 € |  |  | à prendre |
| Americano / Americano / Americano | 3,00 € |  |  | à prendre |
| Latte / Latte / Latte | 4,50 € |  |  | à prendre |
| Cappuccino / Cappuccino / Capuchino | 5,00 € | Mousse de lait épaisse, un voile de cacao. |  | oui |
| Café viennois / Café viennois / Café vienés | 6,00 € | Café allongé, généreuse crème fouettée. | on l'adore | à prendre |
| Chocolat chaud / Hot chocolate / Chocolate caliente | 4,50 € |  |  | à prendre |
| Thé ou infusion / Tea or herbal tea / Té o infusión | 4,40 € | Servi en théière, au salon de thé. |  | à prendre |
| Matcha latte / Matcha latte / Matcha latte | **À REMPLIR** | Thé vert matcha et lait mousseux. |  | oui |

### Boissons fraîches · Cold drinks · Bebidas frías

| Article (FR / EN / ES) | Prix | Description (FR) | Mentions | Photo |
|---|---|---|---|---|
| Jus d'orange pressé / Freshly squeezed orange juice / Zumo de naranja natural | 5,90 € | Pressé à la commande. | 25 cl | à prendre |
| Ice latte aromatisé / Flavoured iced latte / Ice latte con sabor | 5,00 € | Latte glacé, avec le sirop de votre choix. |  | à prendre |
| Jus de fruits / Fruit juice / Zumo de frutas | 3,90 € |  | 25 cl | à prendre |
| Limonade / Lemonade / Limonada | 4,00 € |  | 25 cl | à prendre |
| Diabolo / Diabolo / Diabolo | 4,50 € | Limonade et sirop. | 25 cl | à prendre |
| Thé glacé / Iced tea / Té helado | 3,00 € |  | 25 cl | à prendre |
| Soda / Soft drink / Refresco | 3,00 € |  | 33 cl | à prendre |
| Perrier / Perrier / Perrier | 4,50 € |  | 33 cl | à prendre |
| San Pellegrino / San Pellegrino / San Pellegrino | 4,50 € | Eau pétillante. | 50 cl | à prendre |
| Vittel / Vittel / Vittel | 4,50 € | Eau minérale. | 50 cl | à prendre |

## Infos pratiques

- Adresse : 57 boulevard de Grenelle, 75015 Paris
- Téléphone et WhatsApp : 06 95 13 46 56
- Instagram : @cafelouiseparis
- E-mail : **À REMPLIR**
- Horaires (fiche Google ; la bio Instagram dit 7 h – 20 h, à confirmer) :
  - Lundi : fermé
  - Mardi : 07:00 – 19:00
  - Mercredi : 07:00 – 19:00
  - Jeudi : 07:00 – 19:00
  - Vendredi : 07:00 – 19:00
  - Samedi : 07:00 – 19:00
  - Dimanche : fermé
- Métro : Dupleix (ligne 6, 2 min à pied) ; La Motte-Picquet – Grenelle (lignes 6, 8, 10, 6 min à pied) ; Bir-Hakeim (ligne 6, 6 min à pied) ; Champ de Mars – Tour Eiffel (RER C, 8 min à pied)
- Tour Eiffel : environ 10 minutes à pied (à vérifier sur place)
- Moyens de paiement : **À REMPLIR**
- SIRET : **À REMPLIR**
