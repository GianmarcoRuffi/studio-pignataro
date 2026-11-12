import { messages } from "../locales";
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
    projectName:
      messages["editorial"]["projects"]["Quartiere-Vanchiglia"]["projectName"],
    imgSrc: "/projects/quartiere-vanchiglia/cover.webp",
    description:
      messages["editorial"]["projects"]["Quartiere-Vanchiglia"]["description"],
    slug: "Quartiere-Vanchiglia",
    imgCredits:
      messages["editorial"]["projects"]["Quartiere-Vanchiglia"]["imgCredits"],
    images: generateVanchigliaPaths(23),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Via-Venturoli"]["projectName"],
    imgSrc: "/projects/via-venturoli/cover.webp",
    description:
      messages["editorial"]["projects"]["Via-Venturoli"]["description"],
    slug: "Via-Venturoli",
    imgCredits:
      messages["editorial"]["projects"]["Via-Venturoli"]["imgCredits"],
    images: generateImagePaths("projects/via-venturoli/gallery", 15),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Corso-Vittorio-Emanuele-II"][
        "projectName"
      ],
    imgSrc: "/projects/corso-vittorio-emanuele-ii/cover.webp",
    description:
      messages["editorial"]["projects"]["Corso-Vittorio-Emanuele-II"][
        "description"
      ],
    externalLink: [
      {
        name: messages["editorial"]["projects"]["Corso-Vittorio-Emanuele-II"][
          "externalLink"
        ]["0"]["name"],
        url: linkNames["Luigi Corda"],
      },
    ],
    slug: "Corso-Vittorio-Emanuele-II",
    imgCredits:
      messages["editorial"]["projects"]["Corso-Vittorio-Emanuele-II"][
        "imgCredits"
      ],
    images: generateImagePaths(
      "projects/corso-vittorio-emanuele-ii/gallery",
      14
    ),
  },

  {
    projectName: messages["editorial"]["projects"]["Via-Asti"]["projectName"],
    imgSrc: "/projects/via-asti/cover.webp",
    description: messages["editorial"]["projects"]["Via-Asti"]["description"],
    externalLink: [
      {
        name: messages["editorial"]["projects"]["Via-Asti"]["externalLink"][
          "0"
        ]["name"],
        url: linkNames["Luigi Corda"],
      },
    ],
    slug: "Via-Asti",
    imgCredits: messages["editorial"]["projects"]["Via-Asti"]["imgCredits"],
    images: generateNamedImagePaths("projects/via-asti/gallery", [
      "4",
      "1",
      "2",
      "3",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ]),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Via-Ada-Negri"]["projectName"],
    imgSrc: "/projects/via-ada-negri/cover.webp",
    description:
      messages["editorial"]["projects"]["Via-Ada-Negri"]["description"],
    slug: "Via-Ada-Negri",
    imgCredits:
      messages["editorial"]["projects"]["Via-Ada-Negri"]["imgCredits"],
    images: generateImagePaths("projects/via-ada-negri/gallery", 5),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Via-Machiavelli"]["projectName"],
    imgSrc: "/projects/via-machiavelli/cover.webp",
    description:
      messages["editorial"]["projects"]["Via-Machiavelli"]["description"],
    externalLink: [
      {
        name: messages["editorial"]["projects"]["Via-Machiavelli"][
          "externalLink"
        ]["0"]["name"],
        url: linkNames["Homify"],
      },
      {
        name: messages["editorial"]["projects"]["Via-Machiavelli"][
          "externalLink"
        ]["1"]["name"],
        url: linkNames["Tubes Radiatori"],
      },
    ],
    slug: "Via-Machiavelli",
    imgCredits:
      messages["editorial"]["projects"]["Via-Machiavelli"]["imgCredits"],
    images: generateNamedImagePaths("projects/via-machiavelli/gallery", [
      "9",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "10",
    ]),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Vico-V-Via-San-Giovanni"][
        "projectName"
      ],
    imgSrc: "/projects/vico-v-via-san-giovanni/cover.webp",
    description:
      messages["editorial"]["projects"]["Vico-V-Via-San-Giovanni"][
        "description"
      ],

    externalLink: [
      {
        name: messages["editorial"]["projects"]["Vico-V-Via-San-Giovanni"][
          "externalLink"
        ]["0"]["name"],
        url: linkNames["Homify-Recupero dei Sottotetti"],
      },
      {
        name: messages["editorial"]["projects"]["Vico-V-Via-San-Giovanni"][
          "externalLink"
        ]["1"]["name"],
        url: linkNames["Homify-15 motivi"],
      },
    ],

    slug: "Vico-V-Via-San-Giovanni",
    imgCredits:
      messages["editorial"]["projects"]["Vico-V-Via-San-Giovanni"][
        "imgCredits"
      ],
    images: generateNamedImagePaths(
      "projects/vico-v-via-san-giovanni/gallery",
      ["2", "1", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    ),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Agenzia-Immobiliare-AMS"][
        "projectName"
      ],
    imgSrc: "/projects/agenzia-immobiliare-ams/cover.webp",
    description:
      messages["editorial"]["projects"]["Agenzia-Immobiliare-AMS"][
        "description"
      ],
    slug: "Agenzia-Immobiliare-AMS",
    imgCredits:
      messages["editorial"]["projects"]["Agenzia-Immobiliare-AMS"][
        "imgCredits"
      ],
    images: generateNamedImagePaths(
      "projects/agenzia-immobiliare-ams/gallery",
      ["1", "3", "2", "4", "5"]
    ),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Via-Canonico-Sanna"]["projectName"],
    imgSrc: "/projects/via-canonico-sanna/cover.webp",
    description:
      messages["editorial"]["projects"]["Via-Canonico-Sanna"]["description"],
    slug: "Via-Canonico-Sanna",
    imgCredits:
      messages["editorial"]["projects"]["Via-Canonico-Sanna"]["imgCredits"],
    images: generateNamedImagePaths("projects/via-canonico-sanna/gallery", [
      "2",
      "1",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ]),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Viale-Regina-Margherita"][
        "projectName"
      ],
    imgSrc: "/projects/viale-regina-margherita/cover.webp",
    description:
      messages["editorial"]["projects"]["Viale-Regina-Margherita"][
        "description"
      ],
    slug: "Viale-Regina-Margherita",
    imgCredits:
      messages["editorial"]["projects"]["Viale-Regina-Margherita"][
        "imgCredits"
      ],
    images: generateNamedImagePaths(
      "projects/viale-regina-margherita/gallery",
      ["3", "1", "2", "4", "5", "6", "7", "8", "9", "10"]
    ),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Via-Vittorio-Amedeo-II"][
        "projectName"
      ],
    imgSrc: "/projects/via-vittorio-amedeo-ii/cover.webp",
    description:
      messages["editorial"]["projects"]["Via-Vittorio-Amedeo-II"][
        "description"
      ],
    slug: "Via-Vittorio-Amedeo-II",
    imgCredits:
      messages["editorial"]["projects"]["Via-Vittorio-Amedeo-II"]["imgCredits"],
    images: generateImagePaths("projects/via-vittorio-amedeo-ii/gallery", 3),
  },

  {
    projectName: messages["editorial"]["projects"]["TangexCorp"]["projectName"],
    imgSrc: "/projects/tangex-corp/cover.webp",
    description: messages["editorial"]["projects"]["TangexCorp"]["description"],
    slug: "TangexCorp",
    imgCredits: messages["editorial"]["projects"]["TangexCorp"]["imgCredits"],
    images: generateImagePaths("projects/tangex-corp/gallery", 4),
  },

  {
    projectName:
      messages["editorial"]["projects"]["Via-Eroi-d-Italia"]["projectName"],
    imgSrc: "/projects/via-eroi-d-italia/cover.webp",
    description:
      messages["editorial"]["projects"]["Via-Eroi-d-Italia"]["description"],
    imageFit: "contain",
    slug: "Via-Eroi-d-Italia",
    imgCredits:
      messages["editorial"]["projects"]["Via-Eroi-d-Italia"]["imgCredits"],
    images: generateImagePaths("projects/via-eroi-d-italia/gallery", 8),
  },

  {
    projectName: messages["editorial"]["projects"]["Glisbo"]["projectName"],
    imgSrc: "/projects/glisbo/cover.webp",
    description: messages["editorial"]["projects"]["Glisbo"]["description"],
    externalLink: [
      {
        name: messages["editorial"]["projects"]["Glisbo"]["externalLink"]["0"][
          "name"
        ],
        url: linkNames["Glisbo"],
      },
    ],
    imageFit: "contain",
    slug: "Glisbo",
    imgCredits: messages["editorial"]["projects"]["Glisbo"]["imgCredits"],
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
