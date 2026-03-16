import { Project } from "../models/models";
import {
  generateImagePaths,
  generateVanchigliaPaths,
  generateNamedImagePaths,
} from "../utils/imageUtils";

const linkNames: Record<string, string> = {
  "Luigi Corda": "https://www.luigicorda.com/",
  Glisbo: "https://glisbo.com/",
  Homify:
    "https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario",
  "Tubes Radiatori":
    "https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/",
  "Homify-Recupero dei Sottotetti":
    "https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte",
  "Homify-15 motivi":
    "https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti",
};

export const notFoundContent = {
  title: "Siamo spiacenti, la pagina che hai cercato non esiste.",
  ctaLabel: "Clicca qui per tornare alla home",
  ctaHref: "/",
} as const;

const projects: Project[] = [
  {
    projectName: "Quartiere Vanchiglia",
    imgSrc: "/Home/13.webp",
    description: `Ristrutturazione con Interior design nel centro storico di Torino.`,
    slug: "Quartiere-Vanchiglia",
    imgCredits: "Foto © Luigi Corda",
    images: generateVanchigliaPaths(23),
  },

  {
    projectName: "Via Venturoli",
    imgSrc: "/Home/14.webp",
    description: `Progettazione di Interior design a Bologna.`,
    slug: "Via-Venturoli",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("ViaVenturoli", 15),
  },

  {
    projectName: "Corso Vittorio Emanuele II",
    imgSrc: "/Home/01.webp",
    description: `Ristrutturazione con Interior design nel centro storico di Cagliari.`,
    externalLink: [{ name: "Luigi Corda", url: linkNames["Luigi Corda"] }],
    slug: "Corso-Vittorio-Emanuele-II",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CorsoVittorioEmanuele_II", 14),
  },

  {
    projectName: "Via Asti",
    imgSrc: "/Home/03.webp",
    description: `Ristrutturazione con Interior design a Cagliari.`,
    externalLink: [{ name: "Luigi Corda", url: linkNames["Luigi Corda"] }],
    slug: "Via-Asti",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CasaCorda", 12),
  },

  {
    projectName: "Via Ada Negri",
    imgSrc: "/Home/12.webp",
    description: `Progettazione di Interior design a Cagliari.`,
    slug: "Via-Ada-Negri",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("ViaAdaNegri", 5),
  },

  {
    projectName: "Via Machiavelli",
    imgSrc: "/Home/04.webp",
    description: `Ristrutturazione con Interior design a Cagliari.`,
    externalLink: [
      {
        name: " 'Un appartamento moderno rivoluzionario' su Homify",
        url: linkNames["Homify"],
      },
      {
        name: " 'Ristrutturazione di un appartamento' su Tubes Radiatori",
        url: linkNames["Tubes Radiatori"],
      },
    ],
    slug: "Via-Machiavelli",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CasaGuicciardi", 10),
  },

  {
    projectName: "Vico V di Via S. Giovanni",
    imgSrc: "/Home/05.webp",
    description: `Ristrutturazione con Interior design nel centro storico di Cagliari.`,

    externalLink: [
      {
        name: " 'Recupero dei Sottotetti: Misure e Normative per il Piemonte' su Homify",
        url: linkNames["Homify-Recupero dei Sottotetti"],
      },
      {
        name: " '15 Motivi per Scegliere il Cocciopesto e i Laterizi per i Rivestimenti' su Homify",
        url: linkNames["Homify-15 motivi"],
      },
    ],

    slug: "Vico-V-Via-San-Giovanni",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CasaPiras", 12),
  },

  {
    projectName: "Agenzia Immobiliare AMS",
    imgSrc: "/Home/06.webp",
    description: `Interior design e d.l.
    Via Cagliari, Capoterra (CA)`,
    slug: "Agenzia-Immobiliare-AMS",
    imgCredits: "Foto © Luigi Corda",
    images: generateNamedImagePaths("AMS", ["1", "3", "2", "4", "5"]),
  },

  {
    projectName: "Via Canonico Sanna",
    imgSrc: "/Home/07.webp",
    description: `Ristrutturazione di una palazzina nel centro storico di Baunei (OG).`,
    slug: "Via-Canonico-Sanna",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CasaBarranu", 15),
  },

  {
    projectName: "V.le Regina Margherita",
    imgSrc: "/Home/08.webp",
    description: `Ristrutturazione nel palazzo storico Zedda-Piras a Cagliari.`,
    slug: "Viale-Regina-Margherita",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CasaDalessio", 10),
  },

  {
    projectName: "Via Vittorio Amedeo II",
    imgSrc: "/Home/09.webp",
    description: `Progettazione e d.l. di una palazzina residenziale a Cagliari.`,
    slug: "Via-Vittorio-Amedeo-II",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("CasaVincis", 3),
  },

  {
    projectName: "Tangex Corp.",
    imgSrc: "/Home/10.webp",
    description: `Progettazione di una villa a Ocean Park San Juan, Puerto Rico (U.S.A.).`,
    slug: "TangexCorp",
    imgCredits: "Foto © Guanina Santiago de Jesus",
    images: generateImagePaths("TangexCorp", 4),
  },

  {
    projectName: "Via Eroi d'Italia",
    imgSrc: "/Home/11.webp",
    description: `Progettazione, Interior design e d.l. di una palazzina residenziale a Cagliari.`,
    imageFit: "contain",
    slug: "Via-Eroi-d-Italia",
    imgCredits: "Foto © Matteo Piazza",
    images: generateImagePaths("EdificioCommendatore", 8),
  },

  {
    projectName: "Agenzia pubblicitaria Glisbò",
    imgSrc: "/Home/02.webp",
    description: 'Stand modulare per la "Regione Autonoma della Sardegna".',
    externalLink: [{ name: "Glisbò", url: linkNames["Glisbo"] }],
    slug: "Glisbo",
    imgCredits:
      "Render di Gianpierluigi Secci - 3d Designer -www.mistralstudio.it ",
    images: [
      ...generateNamedImagePaths("Glisbo", ["01", "02", "03", "04"], "webp"),
      "/Glisbo/render.gif",
    ],
  },

  // Placeholder per la nuova location dello studio
  // {
  //   projectName: "Studio Pignataro",
  //   imgSrc: "/Home/12.jpg",
  //   description: ``,
  //   invisible: true,
  //   slug: "contacts",
  //   imgCredits: "",
  //   images: [],
  // },
];

export default projects;
