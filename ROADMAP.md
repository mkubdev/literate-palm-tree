# Roadmap · simonbouvatier.fr

État au 25 novembre 2026 : la direction « Épuré » (ex-V7) est en place à la racine, prête à être déployée.

## Fait

- Site à la racine, mêmes adresses que l'ancien site Wavy pour garder les liens Google : `/`, `/services`, `/team`, `/access-contact`, `/photos`, plus `/mentions-legales`.
- Carte des services complète (46 prestations, reprises de Planity, qui fait foi pour les prix).
- Réservation : tous les boutons ouvrent la page Planity du salon dans un nouvel onglet.
- Contact : plan OpenStreetMap (sans cookie), horaires avec statut ouvert/fermé en direct.
- Logo vectorisé depuis la photo de l'enseigne : `public/brand/logo.svg`, `logo-blanc.svg`, `logo-noir.svg`, icône `icone.svg`.
- SEO : titres et descriptions par page, URL canoniques, `sitemap.xml`, `robots.txt`, fiche schema.org `HairSalon` (adresse, horaires, prix, réservation), image de partage, favicon et icône iPhone.
- Mentions légales (KALAME SAS) et confidentialité : aucun cookie, aucune collecte, donc pas de bandeau cookies.
- Anciennes versions (V3 à V6, sélecteur) archivées dans `_archive/`, hors du build.

## Mise en ligne

- [ ] Déployer sur Vercel et ajouter le domaine `simonbouvatier.fr` + `www.simonbouvatier.fr` (le `www` en principal, l'apex redirige).
- [ ] DNS chez OVH : reporter les enregistrements indiqués par Vercel (A sur l'apex, CNAME sur `www`), supprimer les anciens enregistrements Wavy en conflit.
- [ ] Rapatrier les 2 photos encore hébergées chez Wavy/Cloudinary avant de couper Wavy : Simon au travail (`photos.atWork`, page Simon) et la rose sous cloche (`photos.salon`, page Photos). Puis retirer `res.cloudinary.com` de `next.config.ts`.
- [ ] Résilier Wavy une fois le nouveau site en ligne et vérifié.
- [ ] Google Search Console : valider le domaine et soumettre `https://www.simonbouvatier.fr/sitemap.xml`.

## À compléter

- [ ] **Capital social de KALAME** : obligatoire dans les mentions légales, à renseigner dans `company.capital` (`src/content/salon.ts`). Se trouve sur le Kbis ou Pappers.
- [ ] Confirmer l'hébergeur dans les mentions si ce n'est pas Vercel.

## Contenus à demander à Simon

- [ ] Un portrait de Simon (page Simon et accueil).
- [ ] Des photos de réalisations (couleurs, mèches, mariées).
- [ ] Le logo original en vectoriel s'il existe (la version actuelle est vectorisée depuis une photo, propre mais pas l'original).

## Fiche Google de Simon (hors site, gros impact local)

- [ ] Vérifier le lien vers le site, les horaires, les photos récentes, le lien de réservation Planity.
- [ ] QR code à la caisse vers « Laisser un avis Google ».
- [ ] Répondre aux avis.

## Plus tard

- [ ] **Sanity** : prix, horaires, fermetures exceptionnelles, photos, avis, éditables par Simon. Les données sont déjà regroupées dans `src/content/salon.ts`, à migrer telles quelles.
- [ ] **Fermetures exceptionnelles** : bandeau « Fermé du … au … » ; sans ça le statut « Ouvert · ferme à 19h » est faux pendant les vacances.
- [ ] **Instagram** : flux Behold. Envoyer à Simon le lien d'autorisation Behold (son compte doit être professionnel), puis renseigner `INSTAGRAM_FEED_URL`. Le code est prêt (`src/lib/instagram.ts`).
- [ ] **Avis Google** : abandonné (l'API Places impose un compte Google Cloud avec carte). Alternative : recopier quelques avis à la main.
- [ ] Statistiques de visite sans cookie si besoin (Vercel Analytics ou Plausible), pour ne pas devoir ajouter de bandeau.
- [ ] Supprimer `_archive/` quand les anciennes versions ne servent plus.
