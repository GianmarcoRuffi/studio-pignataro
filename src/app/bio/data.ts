import { messages as italianMessages, type Dictionary } from "../../locales";
import { BioData } from "../../models/models";

export function getBioData(messages: Dictionary): BioData {
  return {
    image: "/site/bio/profile.webp",
    name: messages["editorial"]["bio"]["name"],
    intro: messages["editorial"]["bio"]["intro"],
    professionalExperiencesTitle:
      messages["editorial"]["bio"]["professionalExperiencesTitle"],
    experiences: [
      {
        title: messages["editorial"]["bio"]["experiences"]["0"]["title"],
        role: messages["editorial"]["bio"]["experiences"]["0"]["role"],
        description:
          messages["editorial"]["bio"]["experiences"]["0"]["description"],
        projects: [
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["0"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["1"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["2"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["3"],
          {
            description:
              messages["editorial"]["bio"]["experiences"]["0"]["projects"]["4"][
                "description"
              ],
            links: [],
          },
          {
            description:
              messages["editorial"]["bio"]["experiences"]["0"]["projects"]["5"][
                "description"
              ],
            links: [
              {
                name: messages["editorial"]["bio"]["experiences"]["0"][
                  "projects"
                ]["5"]["links"]["0"]["name"],
                url: "https://glisbo.com/",
              },
            ],
          },
          {
            description:
              messages["editorial"]["bio"]["experiences"]["0"]["projects"]["6"][
                "description"
              ],
            links: [
              {
                name: messages["editorial"]["bio"]["experiences"]["0"][
                  "projects"
                ]["6"]["links"]["0"]["name"],
                url: "https://www.luigicorda.com/",
              },
            ],
          },
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["7"],
          {
            description:
              messages["editorial"]["bio"]["experiences"]["0"]["projects"]["8"][
                "description"
              ],
            links: [
              {
                name: messages["editorial"]["bio"]["experiences"]["0"][
                  "projects"
                ]["8"]["links"]["0"]["name"],
                url: "https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario",
              },
            ],
          },
          {
            description:
              messages["editorial"]["bio"]["experiences"]["0"]["projects"]["9"][
                "description"
              ],
            links: [
              {
                name: messages["editorial"]["bio"]["experiences"]["0"][
                  "projects"
                ]["9"]["links"]["0"]["name"],
                url: "https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/",
              },
            ],
          },
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["10"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["11"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["12"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["13"],
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["14"],
          {
            description:
              messages["editorial"]["bio"]["experiences"]["0"]["projects"][
                "15"
              ]["description"],
            links: [
              {
                name: messages["editorial"]["bio"]["experiences"]["0"][
                  "projects"
                ]["15"]["links"]["0"]["name"],
                url: "http://www.dommoso.it/en/index.html",
              },
              {
                name: messages["editorial"]["bio"]["experiences"]["0"][
                  "projects"
                ]["15"]["links"]["1"]["name"],
                url: "https://www.villeecasali.com/country-living/stile-country/turismo-in-ogliastra/",
              },
            ],
          },
          messages["editorial"]["bio"]["experiences"]["0"]["projects"]["16"],
        ],
      },
      {
        title: messages["editorial"]["bio"]["experiences"]["1"]["title"],
        role: messages["editorial"]["bio"]["experiences"]["1"]["role"],
        description:
          messages["editorial"]["bio"]["experiences"]["1"]["description"],
        projects: [
          messages["editorial"]["bio"]["experiences"]["1"]["projects"]["0"],
          messages["editorial"]["bio"]["experiences"]["1"]["projects"]["1"],
          messages["editorial"]["bio"]["experiences"]["1"]["projects"]["2"],
          messages["editorial"]["bio"]["experiences"]["1"]["projects"]["3"],
          messages["editorial"]["bio"]["experiences"]["1"]["projects"]["4"],
          messages["editorial"]["bio"]["experiences"]["1"]["projects"]["5"],
          {
            description:
              messages["editorial"]["bio"]["experiences"]["1"]["projects"]["6"][
                "description"
              ],
            links: [],
          },
        ],
      },
      {
        title: messages["editorial"]["bio"]["experiences"]["2"]["title"],
        role: messages["editorial"]["bio"]["experiences"]["2"]["role"],
        description:
          messages["editorial"]["bio"]["experiences"]["2"]["description"],
        projects: [
          messages["editorial"]["bio"]["experiences"]["2"]["projects"]["0"],
          messages["editorial"]["bio"]["experiences"]["2"]["projects"]["1"],
          messages["editorial"]["bio"]["experiences"]["2"]["projects"]["2"],
          messages["editorial"]["bio"]["experiences"]["2"]["projects"]["3"],
        ],
      },
    ],
  };
}

export const bioData = getBioData(italianMessages);
