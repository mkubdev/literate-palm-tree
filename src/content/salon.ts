// Source : fiche Planity, novembre 2026 (liste complète, « voir plus » dépliés).
// Prestations et photos : la référence est désormais Sanity (src/sanity/content.ts) ;
// ces valeurs servent de secours si Sanity ne répond pas. À migrer dans Sanity une fois la DA choisie.

export type Service = {
  name: string;
  duration: string;
  price: string;
  /** false = non réservable en ligne, sur demande au salon */
  online: boolean;
};

export type ServiceCategory = {
  id: string;
  name: string;
  services: Service[];
  /** prestations non affichées par Planity, à compléter */
  more?: number;
};

/** Adresse publique du site (domaine OVH) */
export const SITE_URL = "https://www.simonbouvatier.fr";

export const salon = {
  name: "Simon Bouvatier",
  role: "Coiffeur visagiste, styliste et coloriste",
  address: {
    street: "75 rue Pierre Corneille",
    zip: "69006",
    city: "Lyon",
    district: "Lyon 6e",
    access: "Entre les métros Cordeliers et Part-Dieu",
    lat: 45.7637846,
    lng: 4.8439411,
  },
  mapsUrl: "https://www.google.com/maps?daddr=45.7637846,4.8439411",
  bookingUrl: "https://www.planity.com/simon-bouvatier-69006-lyon",
  phone: "04 78 41 42 99" as string | null,
  phoneHref: "tel:+33478414299",
  email: "simon.bouvatier@gmail.com",
  facebook: "https://www.facebook.com/486650810126595",
  instagram: "https://www.instagram.com/simon.bouvatier/",
  instagramHandle: "@simon.bouvatier",
  rating: { score: "5,0", count: 16 },
  booking: [
    "Réservation 24h/24",
    "Paiement sur place",
    "Confirmation immédiate",
  ],
} as const;

/** 0 = dimanche … 6 = samedi, heures en minutes */
export const hours: { day: string; short: string; open?: [number, number] }[] =
  [
    { day: "Lundi", short: "Lun" },
    { day: "Mardi", short: "Mar", open: [540, 1140] },
    { day: "Mercredi", short: "Mer", open: [540, 1140] },
    { day: "Jeudi", short: "Jeu", open: [540, 1140] },
    { day: "Vendredi", short: "Ven", open: [540, 1140] },
    { day: "Samedi", short: "Sam", open: [540, 1140] },
    { day: "Dimanche", short: "Dim" },
  ];

export const services: ServiceCategory[] = [
  {
    id: "femmes",
    name: "Femmes",
    services: [
      {
        name: "Shampoing, brushing · courts",
        duration: "30 min",
        price: "29 €",
        online: true,
      },
      {
        name: "Shampoing, brushing · mi-longs",
        duration: "1 h",
        price: "33 €",
        online: true,
      },
      {
        name: "Shampoing, brushing · longs",
        duration: "30 min",
        price: "37 €",
        online: true,
      },
      {
        name: "Shampoing, coupe, brushing · courts",
        duration: "1 h",
        price: "45 €",
        online: true,
      },
      {
        name: "Shampoing, coupe, brushing · mi-longs",
        duration: "1 h",
        price: "49 €",
        online: true,
      },
      {
        name: "Shampoing, coupe, brushing · longs",
        duration: "1 h",
        price: "53 €",
        online: true,
      },
      {
        name: "Permanente",
        duration: "1 h",
        price: "39 à 59 €",
        online: false,
      },
    ],
  },
  {
    id: "coloration",
    name: "Coloration",
    services: [
      {
        name: "Couleur racine, brushing · courts",
        duration: "1 h 30",
        price: "58 €",
        online: true,
      },
      {
        name: "Couleur racine, brushing · mi-longs",
        duration: "1 h 30",
        price: "62 €",
        online: true,
      },
      {
        name: "Couleur racine, brushing · longs",
        duration: "1 h 30",
        price: "66 €",
        online: true,
      },
      {
        name: "Couleur racine, coupe, brushing · courts",
        duration: "1 h 30",
        price: "74 €",
        online: true,
      },
      {
        name: "Couleur racine, coupe, brushing · mi-longs",
        duration: "1 h 30",
        price: "78 €",
        online: true,
      },
      {
        name: "Couleur racine, coupe, brushing · longs",
        duration: "1 h 30",
        price: "82 €",
        online: true,
      },
      {
        name: "Patine, brushing · courts",
        duration: "1 h 30",
        price: "52 €",
        online: true,
      },
      {
        name: "Patine, brushing · mi-longs",
        duration: "1 h 30",
        price: "61 €",
        online: true,
      },
      {
        name: "Patine, brushing · longs",
        duration: "1 h 30",
        price: "70 €",
        online: true,
      },
      {
        name: "Patine, coupe, brushing · courts",
        duration: "1 h 30",
        price: "68 €",
        online: true,
      },
      {
        name: "Patine, coupe, brushing · mi-longs",
        duration: "1 h 30",
        price: "77 €",
        online: true,
      },
      {
        name: "Patine, coupe, brushing · longs",
        duration: "2 h",
        price: "86 €",
        online: true,
      },
      {
        name: "Couleur tête entière, brushing · courts",
        duration: "1 h 30",
        price: "63 €",
        online: true,
      },
      {
        name: "Couleur tête entière, brushing · mi-longs",
        duration: "1 h 30",
        price: "78 €",
        online: true,
      },
      {
        name: "Couleur tête entière, brushing · longs",
        duration: "1 h 30",
        price: "86 €",
        online: true,
      },
      {
        name: "Couleur tête entière, coupe, brushing · courts",
        duration: "1 h 30",
        price: "79 €",
        online: true,
      },
      {
        name: "Couleur tête entière, coupe, brushing · mi-longs",
        duration: "1 h 30",
        price: "94 €",
        online: true,
      },
      {
        name: "Couleur tête entière, coupe, brushing · longs",
        duration: "1 h 30",
        price: "102 €",
        online: true,
      },
    ],
  },
  {
    id: "meches",
    name: "Mèches & décoloration",
    services: [
      {
        name: "Mèches, brushing · courts",
        duration: "2 h",
        price: "69 €",
        online: true,
      },
      {
        name: "Mèches, brushing · mi-longs",
        duration: "2 h",
        price: "79 €",
        online: true,
      },
      {
        name: "Mèches, brushing · longs",
        duration: "2 h",
        price: "89 €",
        online: true,
      },
      {
        name: "Mèches, coupe, brushing · courts",
        duration: "2 h",
        price: "85 €",
        online: true,
      },
      {
        name: "Mèches, coupe, brushing · mi-longs",
        duration: "2 h",
        price: "95 €",
        online: true,
      },
      {
        name: "Mèches, coupe, brushing · longs",
        duration: "2 h",
        price: "105 €",
        online: true,
      },
      {
        name: "Décoloration · courts",
        duration: "1 h",
        price: "44 €",
        online: false,
      },
      {
        name: "Décoloration · mi-longs",
        duration: "1 h",
        price: "53 €",
        online: false,
      },
      {
        name: "Décoloration · longs",
        duration: "1 h",
        price: "55 €",
        online: false,
      },
      {
        name: "Démaquillant, cheveux courts",
        duration: "1 h",
        price: "39 €",
        online: false,
      },
    ],
  },
  {
    id: "lissage",
    name: "Lissage & défrisage",
    services: [
      {
        name: "Lissage brésilien discovery · courts",
        duration: "1 h",
        price: "200 €",
        online: false,
      },
      {
        name: "Lissage brésilien discovery · mi-longs",
        duration: "1 h",
        price: "250 €",
        online: false,
      },
      {
        name: "Lissage brésilien discovery · longs",
        duration: "1 h",
        price: "300 €",
        online: false,
      },
      { name: "Défrisage", duration: "1 h", price: "39 à 59 €", online: false },
    ],
  },
  {
    id: "mariage",
    name: "Coiffure & mariage",
    services: [
      {
        name: "Essai + jour J",
        duration: "30 min",
        price: "170 €",
        online: false,
      },
      {
        name: "Chignon cocktail",
        duration: "30 min",
        price: "49 €",
        online: false,
      },
      {
        name: "Extensions Balmain · pack de 10 mèches",
        duration: "30 min",
        price: "70 €",
        online: false,
      },
      {
        name: "Extensions Balmain · la mèche",
        duration: "30 min",
        price: "8 €",
        online: false,
      },
    ],
  },
  {
    id: "hommes",
    name: "Hommes",
    services: [
      { name: "Coupe homme", duration: "30 min", price: "27 €", online: true },
      {
        name: "Barbe sans rasage",
        duration: "30 min",
        price: "15 €",
        online: false,
      },
    ],
  },
  {
    id: "enfants",
    name: "Enfants",
    services: [
      {
        name: "Coupe enfant, moins de 12 ans",
        duration: "30 min",
        price: "20 €",
        online: true,
      },
    ],
  },
];

export const reviews = [
  {
    author: null,
    text: "Simon est un excellent coiffeur ; à l'écoute, il a pris son temps pour réaliser la couleur que je souhaitais depuis longtemps.",
  },
  {
    author: "Carole",
    text: "Toujours bien accueillie et coiffée. Merci Simon.",
  },
  { author: null, text: "Super expérience, il était hyper styliste." },
  {
    author: null,
    text: "Un professionnel pas comme les autres… Vous ne pourrez plus vous en passer !",
  },
  {
    author: null,
    text: "Top, très bon rapport qualité prix, avec Simon qui est super sympa !",
  },
  { author: null, text: "RAS, test convaincant !" },
];

// Engagements repris de l'ancien site simonbouvatier.fr
export const promises = [
  "Un diagnostic capillaire offert",
  "Un devis détaillé, des tarifs raisonnables",
  "Une prise en charge personnalisée",
  "Des prestations sur mesure",
  "Des produits capillaires haut de gamme",
];

// Visuels de l'ancien site (hébergés chez Wavy/Cloudinary) : à rapatrier dans Sanity
const cdn = "https://res.cloudinary.com/wavy/image/upload/f_auto,q_auto";
export const photos = {
  atWork: {
    src: `${cdn},w_1600/v1554300368/Simon-Bouvatier.jpg`,
    alt: "Simon réalisant un brushing au salon",
    w: 1000,
    h: 712,
  },
  salon: {
    src: `${cdn},w_1600/v1576751909/photo-3be1c544.jpg`,
    alt: "Une rose dorée sous cloche, les postes de coiffage en arrière-plan",
    w: 6000,
    h: 4000,
  },
  hero: {
    src: `${cdn},w_2000/shop-website-renderer/70c1b8b4-e021-4001-a08e-63492940c63b/simon-bouvatier-Lyon-banner-895130cf`,
    alt: "Visage maquillé de doré, cheveux blonds ondulés",
    w: 2000,
    h: 1000,
  },
  leaves: {
    src: `${cdn},w_1600/shop-website-renderer/70c1b8b4-e021-4001-a08e-63492940c63b/panels/services-195ebcf8`,
    alt: "Feuilles dorées alignées",
    w: 1600,
    h: 600,
  },
  glitter: {
    src: `${cdn},w_1600/shop-website-renderer/70c1b8b4-e021-4001-a08e-63492940c63b/panels/contact-06c2f1af`,
    alt: "Visage allongé dans des paillettes dorées",
    w: 1600,
    h: 600,
  },
};

// Photos du salon fournies (media/), servies depuis public/images
export const salonPhotos = {
  facade: {
    src: "/images/facade.jpg",
    alt: "La devanture blanche du salon Simon Bouvatier, rue Pierre Corneille",
    w: 1200,
    h: 1600,
  },
  allee: {
    src: "/images/salon-allee.jpg",
    alt: "L'allée du salon : miroirs encadrés, fauteuils taupe et lustres en cristal",
    w: 2000,
    h: 1216,
  },
  postes: {
    src: "/images/salon-postes.jpg",
    alt: "Les postes de coiffage signés Simon Bouvatier, les bacs au fond",
    w: 2000,
    h: 1215,
  },
  bacs: {
    src: "/images/salon-bacs.jpg",
    alt: "Les trois bacs à shampoing et les étagères de soins",
    w: 2000,
    h: 1213,
  },
  vitrine: {
    src: "/images/salon-vitrine.jpg",
    alt: "La vitrine de produits Wella et l'entrée lumineuse du salon",
    w: 2000,
    h: 1221,
  },
  produits: {
    src: "/images/produits.jpg",
    alt: "Les soins Oil Reflections en rayon",
    w: 2000,
    h: 1219,
  },
};

// Biographie reprise de l'ancien site (page /team), orthographe corrigée
export const bio = [
  "Coiffeur, coloriste et visagiste, Simon Bouvatier réalise son rêve à 27 ans : il ouvre son propre salon.",
  "Fils de coiffeur enseignant, il baigne dans le milieu artistique du cheveu depuis son plus jeune âge. Diplômé de l'École professionnelle de coiffure et d'esthétique de Valence, il gravit très vite les échelons jusqu'à devenir manager, grâce à plusieurs années de formations à Paris, notamment chez Camille Albane.",
  "Aujourd'hui, Simon récolte le fruit de sa passion et de sa persévérance en vous accueillant dans son salon de la rue Pierre Corneille.",
];

// Société exploitante (annuaire officiel recherche-entreprises.api.gouv.fr, novembre 2026)
export const company = {
  name: "KALAME",
  form: "société par actions simplifiée (SAS)",
  /** Obligatoire dans les mentions légales : à compléter (Kbis ou Pappers) */
  capital: null as string | null,
  address: "75 rue Pierre Corneille, 69006 Lyon",
  siren: "842 871 550",
  rcs: "Lyon 842 871 550",
  vat: "FR38 842 871 550",
  director: "Simon Bouvatier",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
};

// Textes de l'accueil (secours ; la référence est le document « Page d'accueil » de Sanity)
export const home = {
  title: "Coiffeur,\ncoloriste,\nvisagiste.",
  intro:
    "Le salon de Simon Bouvatier, à Lyon 6e. Une seule personne vous reçoit, vous écoute et vous coiffe, de la coupe à la couleur.",
  salonTitle: "Le salon",
  salonText:
    "Rue Pierre Corneille, entre Cordeliers et Part-Dieu. Un lieu lumineux, des lustres de cristal, des miroirs signés, et un moment pour vous. Diagnostic capillaire offert, devis détaillé, produits haut de gamme.",
  promises,
  servicesTitle: "Prestations",
  servicesText:
    "Tarifs en vigueur, réservation en ligne 24h/24. Lissages, mariage et extensions sur rendez-vous au 04 78 41 42 99.",
  rating: { score: 5, count: salon.rating.count },
  reviews: reviews.map((r) => ({
    text: r.text,
    author: r.author ?? undefined,
  })),
  closing: "À bientôt rue Pierre Corneille.",
};

// Page /simon (secours ; la référence est le document « Page Simon » de Sanity)
export const simonPage = {
  title: "Simon",
  role: "Coiffeur · Coloriste · Visagiste",
  lead: bio[0],
  bio: bio.slice(1),
  cta: "Prendre rendez-vous avec Simon",
  promisesTitle: "Ses engagements",
};
