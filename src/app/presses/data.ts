import { messages } from "../../locales";
import { PressesData } from "../../models/models";

const pressesData: PressesData[] = [
  {
    description:
      messages["editorial"]["publications"]["monograph"]["description"],
    imageSource: "/publications/covers/timeless-cover.webp",
    source: "",
    date: messages["editorial"]["publications"]["monograph"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["tubesApartment"]["description"],
    imageSource: "/publications/covers/tubes-cover.webp",
    source:
      "https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/",
    date: messages["editorial"]["publications"]["tubesApartment"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["homifyReasons"]["description"],
    imageSource: "/publications/covers/homify-cover-1.webp",
    source:
      "https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti",
    date: messages["editorial"]["publications"]["homifyReasons"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["homifyAttics"]["description"],
    imageSource: "/publications/covers/homify-cover-2.webp",
    source:
      "https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte",
    date: messages["editorial"]["publications"]["homifyAttics"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["homifyApartment"]["description"],
    imageSource: "/publications/covers/homify-cover-3.webp",
    source:
      "https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario",
    date: messages["editorial"]["publications"]["homifyApartment"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["youtradeGres"]["description"],
    imageSource: "/publications/covers/youtrade-cover-2.webp",
    source: "",
    date: messages["editorial"]["publications"]["youtradeGres"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["youtradeDiagonal"]["description"],
    imageSource: "/publications/covers/youtrade-cover-1.webp",
    source: "",
    date: messages["editorial"]["publications"]["youtradeDiagonal"]["date"],
  },
  {
    description:
      messages["editorial"]["publications"]["bravaCasaHistory"]["description"],
    imageSource: "/publications/covers/bravacasa-cover.webp",
    source: "",
    date: messages["editorial"]["publications"]["bravaCasaHistory"]["date"],
  },
];

export default pressesData;
