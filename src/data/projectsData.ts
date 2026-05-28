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

const projects: Project[] = [
  {
    projectName: "Quartiere Vanchiglia",
    imgSrc: "/projects/quartiere-vanchiglia/cover.webp",
    description: `Ristrutturazione con Interior design nel centro storico di Torino.`,
    slug: "Quartiere-Vanchiglia",
    imgCredits: "Foto © Luigi Corda",
    images: generateVanchigliaPaths(23),
  },

  {
    projectName: "Via Venturoli",
    imgSrc: "/projects/via-venturoli/cover.webp",
    description: `Progettazione di Interior design a Bologna.`,
    slug: "Via-Venturoli",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("projects/via-venturoli/gallery", 15),
  },

  {
    projectName: "Corso Vittorio Emanuele II",
    imgSrc: "/projects/corso-vittorio-emanuele-ii/cover.webp",
    description: `Ristrutturazione con Interior design nel centro storico di Cagliari.`,
    externalLink: [{ name: "Luigi Corda", url: linkNames["Luigi Corda"] }],
    slug: "Corso-Vittorio-Emanuele-II",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths(
      "projects/corso-vittorio-emanuele-ii/gallery",
      14
    ),
  },

  {
    projectName: "Via Asti",
    imgSrc: "/projects/via-asti/cover.webp",
    description: `Ristrutturazione con Interior design a Cagliari.`,
    externalLink: [{ name: "Luigi Corda", url: linkNames["Luigi Corda"] }],
    slug: "Via-Asti",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("projects/via-asti/gallery", 12),
  },

  {
    projectName: "Via Ada Negri",
    imgSrc: "/projects/via-ada-negri/cover.webp",
    description: `Progettazione di Interior design a Cagliari.`,
    slug: "Via-Ada-Negri",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("projects/via-ada-negri/gallery", 5),
  },

  {
    projectName: "Via Machiavelli",
    imgSrc: "/projects/via-machiavelli/cover.webp",
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
    images: generateImagePaths("projects/via-machiavelli/gallery", 10),
  },

  {
    projectName: "Vico V di Via S. Giovanni",
    imgSrc: "/projects/vico-v-via-san-giovanni/cover.webp",
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
    images: generateImagePaths("projects/vico-v-via-san-giovanni/gallery", 12),
  },

  {
    projectName: "Agenzia Immobiliare AMS",
    imgSrc: "/projects/agenzia-immobiliare-ams/cover.webp",
    description: `Interior design e d.l.
    Via Cagliari, Capoterra (CA)`,
    slug: "Agenzia-Immobiliare-AMS",
    imgCredits: "Foto © Luigi Corda",
    images: generateNamedImagePaths(
      "projects/agenzia-immobiliare-ams/gallery",
      ["1", "3", "2", "4", "5"]
    ),
  },

  {
    projectName: "Via Canonico Sanna",
    imgSrc: "/projects/via-canonico-sanna/cover.webp",
    description: `Ristrutturazione di una palazzina nel centro storico di Baunei (OG).`,
    slug: "Via-Canonico-Sanna",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("projects/via-canonico-sanna/gallery", 15),
  },

  {
    projectName: "V.le Regina Margherita",
    imgSrc: "/projects/viale-regina-margherita/cover.webp",
    description: `Ristrutturazione nel palazzo storico Zedda-Piras a Cagliari.`,
    slug: "Viale-Regina-Margherita",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("projects/viale-regina-margherita/gallery", 10),
  },

  {
    projectName: "Via Vittorio Amedeo II",
    imgSrc: "/projects/via-vittorio-amedeo-ii/cover.webp",
    description: `Progettazione e d.l. di una palazzina residenziale a Cagliari.`,
    slug: "Via-Vittorio-Amedeo-II",
    imgCredits: "Foto © Luigi Corda",
    images: generateImagePaths("projects/via-vittorio-amedeo-ii/gallery", 3),
  },

  {
    projectName: "Tangex Corp.",
    imgSrc: "/projects/tangex-corp/cover.webp",
    description: `Progettazione di una villa a Ocean Park San Juan, Puerto Rico (U.S.A.).`,
    slug: "TangexCorp",
    imgCredits: "Foto © Guanina Santiago de Jesus",
    images: generateImagePaths("projects/tangex-corp/gallery", 4),
  },

  {
    projectName: "Via Eroi d'Italia",
    imgSrc: "/projects/via-eroi-d-italia/cover.webp",
    description: `Progettazione, Interior design e d.l. di una palazzina residenziale a Cagliari.`,
    imageFit: "contain",
    slug: "Via-Eroi-d-Italia",
    imgCredits: "Foto © Matteo Piazza",
    images: generateImagePaths("projects/via-eroi-d-italia/gallery", 8),
  },

  {
    projectName: "Agenzia pubblicitaria Glisbò",
    imgSrc: "/projects/glisbo/cover.webp",
    description: 'Stand modulare per la "Regione Autonoma della Sardegna".',
    externalLink: [{ name: "Glisbò", url: linkNames["Glisbo"] }],
    imageFit: "contain",
    slug: "Glisbo",
    imgCredits:
      "Render di Gianpierluigi Secci - 3d Designer -www.mistralstudio.it ",
    images: [
      ...generateNamedImagePaths(
        "projects/glisbo/gallery",
        ["01", "02", "03", "04"],
        "webp"
      ),
      "/projects/glisbo/gallery/render.gif",
    ],
  },
];

export default projects;