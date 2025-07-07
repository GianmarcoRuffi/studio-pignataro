import { Project } from '../models/models';

const linkNames: Record<string, string> = {
  'Luigi Corda': 'https://www.luigicorda.com/',
  Glisbo: 'https://glisbo.com/',
  Homify:
    'https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario',
  'Tubes Radiatori':
    'https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/',
  'Homify-Recupero dei Sottotetti':
    'https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte',
  'Homify-15 motivi':
    'https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti',
};

const projects: Project[] = [
  {
    projectName: 'Quartiere Vanchiglia',
    imgSrc: '/Home/13.webp',
    description: `Ristrutturazione con interior design nel centro storico di Torino.`,
    slug: 'Quartiere-Vanchiglia',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/Vanchiglia/Torino_01.JPG',
      '/Vanchiglia/Torino_02.JPG',
      '/Vanchiglia/Torino_03.JPG',
      '/Vanchiglia/Torino_04.JPG',
      '/Vanchiglia/Torino_05.JPG',
      '/Vanchiglia/Torino_06.JPG',
      '/Vanchiglia/Torino_07.JPG',
      '/Vanchiglia/Torino_08.JPG',
      '/Vanchiglia/Torino_09.JPG',
      '/Vanchiglia/Torino_10.JPG',
      '/Vanchiglia/Torino_11.JPG',
      '/Vanchiglia/Torino_12.JPG',
      '/Vanchiglia/Torino_13.JPG',
      '/Vanchiglia/Torino_14.JPG',
      '/Vanchiglia/Torino_15.JPG',
      '/Vanchiglia/Torino_16.JPG',
      '/Vanchiglia/Torino_17.JPG',
      '/Vanchiglia/Torino_18.JPG',
      '/Vanchiglia/Torino_19.JPG',
      '/Vanchiglia/Torino_20.JPG',
      '/Vanchiglia/Torino_21.JPG',
      '/Vanchiglia/Torino_22.JPG',
      '/Vanchiglia/Torino_23.JPG',
    ],
  },

  
  {
    projectName: 'Corso Vittorio Emanuele II',
    imgSrc: '/Home/01.webp',
    description: `Ristrutturazione con Interior design nel centro storico di Cagliari.`,
    externalLink: [{ name: 'Luigi Corda', url: linkNames['Luigi Corda'] }],
    slug: 'Corso-Vittorio-Emanuele-II',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/CorsoVittorioEmanuele_II/1.jpg',
      '/CorsoVittorioEmanuele_II/2.jpg',
      '/CorsoVittorioEmanuele_II/3.jpg',
      '/CorsoVittorioEmanuele_II/4.jpg',
      '/CorsoVittorioEmanuele_II/5.jpg',
      '/CorsoVittorioEmanuele_II/6.jpg',
      '/CorsoVittorioEmanuele_II/7.jpg',
      '/CorsoVittorioEmanuele_II/8.jpg',
      '/CorsoVittorioEmanuele_II/9.jpg',
      '/CorsoVittorioEmanuele_II/10.jpg',
      '/CorsoVittorioEmanuele_II/11.jpg',
      '/CorsoVittorioEmanuele_II/12.jpg',
      '/CorsoVittorioEmanuele_II/13.jpg',
      '/CorsoVittorioEmanuele_II/14.jpg',
    ],
  },

  {
    projectName: 'Agenzia pubblicitaria Glisbò',
    imgSrc: '/Home/02.webp',
    description: 'Stand modulare per la “Regione Autonoma della Sardegna”.',
    externalLink: [{ name: 'Glisbò', url: linkNames['Glisbo'] }],
    slug: 'Glisbo',
    imgCredits:
      'Render di Gianpierluigi Secci - 3d Designer -www.mistralstudio.it ',
    images: [
      '/Glisbo/01.jpg',
      '/Glisbo/02.jpg',
      '/Glisbo/03.jpg',
      '/Glisbo/04.jpg',
      '/Glisbo/render.gif',
    ],
  },

  {
    projectName: 'Via Asti',
    imgSrc: '/Home/03.webp',
    description: `Ristrutturazione con Interior design a Cagliari.`,
    externalLink: [{ name: 'Luigi Corda', url: linkNames['Luigi Corda'] }],
    slug: 'Via-Asti',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/CasaCorda/1.jpg',
      '/CasaCorda/2.jpg',
      '/CasaCorda/3.jpg',
      '/CasaCorda/4.jpg',
      '/CasaCorda/5.jpg',
      '/CasaCorda/6.jpg',
      '/CasaCorda/7.jpg',
      '/CasaCorda/8.jpg',
      '/CasaCorda/9.jpg',
      '/CasaCorda/10.jpg',
      '/CasaCorda/11.jpg',
      '/CasaCorda/12.jpg',
    ],
  },

  {
    projectName: 'Via Machiavelli',
    imgSrc: '/Home/04.webp',
    description: `Ristrutturazione con Interior design a Cagliari.
    `,
    externalLink: [
      {
        name: " 'Un appartamento moderno rivoluzionario' su Homify",
        url: linkNames['Homify'],
      },
      {
        name: " 'Ristrutturazione di un appartamento' su Tubes Radiatori",
        url: linkNames['Tubes Radiatori'],
      },
    ],
    slug: 'Via-Machiavelli',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/CasaGuicciardi/1.jpg',
      '/CasaGuicciardi/2.jpg',
      '/CasaGuicciardi/3.jpg',
      '/CasaGuicciardi/4.jpg',
      '/CasaGuicciardi/5.jpg',
      '/CasaGuicciardi/6.jpg',
      '/CasaGuicciardi/7.jpg',
      '/CasaGuicciardi/8.jpg',
      '/CasaGuicciardi/9.jpg',
      '/CasaGuicciardi/10.jpg',
    ],
  },

  {
    projectName: 'Vico V di Via S. Giovanni',
    imgSrc: '/Home/05.webp',
    description: `Ristrutturazione con Interior design nel centro storico di Cagliari.
    `,

    externalLink: [
      {
        name: " 'Recupero dei Sottotetti: Misure e Normative per il Piemonte' su Homify",
        url: linkNames['Homify-Recupero dei Sottotetti'],
      },
      {
        name: " '15 Motivi per Scegliere il Cocciopesto e i Laterizi per i Rivestimenti' su Homify",
        url: linkNames['Homify-15 motivi'],
      },
    ],

    slug: 'Vico-V-Via-San-Giovanni',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/CasaPiras/1.jpg',
      '/CasaPiras/2.jpg',
      '/CasaPiras/3.jpg',
      '/CasaPiras/4.jpg',
      '/CasaPiras/5.jpg',
      '/CasaPiras/6.jpg',
      '/CasaPiras/7.jpg',
      '/CasaPiras/8.jpg',
      '/CasaPiras/9.jpg',
      '/CasaPiras/10.jpg',
      '/CasaPiras/11.jpg',
      '/CasaPiras/12.jpg',
    ],
  },

  {
    projectName: 'Agenzia Immobiliare AMS',
    imgSrc: '/Home/06.webp',
    description: `Interior design e d.l.
    Via Cagliari, Capoterra (CA)
    `,
    slug: 'Agenzia-Immobiliare-AMS',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/AMS/1.jpg',
      '/AMS/3.jpg',
      '/AMS/2.jpg',
      '/AMS/4.jpg',
      '/AMS/5.jpg',
    ],
  },

  {
    projectName: 'Via Canonico Sanna',
    imgSrc: '/Home/07.webp',
    description: `Ristrutturazione di una palazzina nel centro storico di Baunei (OG).
    `,
    slug: 'Via-Canonico-Sanna',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/CasaBarranu/1.jpg',
      '/CasaBarranu/2.jpg',
      '/CasaBarranu/3.jpg',
      '/CasaBarranu/4.jpg',
      '/CasaBarranu/5.jpg',
      '/CasaBarranu/6.jpg',
      '/CasaBarranu/7.jpg',
      '/CasaBarranu/8.jpg',
      '/CasaBarranu/9.jpg',
      '/CasaBarranu/10.jpg',
      '/CasaBarranu/11.jpg',
      '/CasaBarranu/12.jpg',
      '/CasaBarranu/13.jpg',
      '/CasaBarranu/14.jpg',
      '/CasaBarranu/15.jpg',
    ],
  },

  {
    projectName: 'V.le Regina Margherita',
    imgSrc: '/Home/08.webp',
    description: `Ristrutturazione nel palazzo storico Zedda-Piras a Cagliari.
    `,
    slug: 'Viale-Regina-Margherita',
    imgCredits: 'Foto © Luigi Corda',
    images: [
      '/CasaDalessio/1.jpg',
      '/CasaDalessio/2.jpg',
      '/CasaDalessio/3.jpg',
      '/CasaDalessio/4.jpg',
      '/CasaDalessio/5.jpg',
      '/CasaDalessio/6.jpg',
      '/CasaDalessio/7.jpg',
      '/CasaDalessio/8.jpg',
      '/CasaDalessio/9.jpg',
      '/CasaDalessio/10.jpg',
    ],
  },

  {
    projectName: 'Via Vittorio Amedeo II',
    imgSrc: '/Home/09.webp',
    description: `Progettazione e d.l. di una palazzina residenziale a Cagliari.
    `,
    slug: 'Via-Vittorio-Amedeo-II',
    imgCredits: 'Foto © Luigi Corda',
    images: ['/CasaVincis/1.jpg', '/CasaVincis/2.jpg', '/CasaVincis/3.jpg'],
  },

  {
    projectName: 'Tangex Corp.',
    imgSrc: '/Home/10.webp',
    description: `Progettazione di una villa a Ocean Park San Juan, Puerto Rico (U.S.A.).`,
    slug: 'TangexCorp',
    imgCredits: 'Foto © Guanina Santiago de Jesus',
    images: [
      '/TangexCorp/1.jpg',
      '/TangexCorp/2.jpg',
      '/TangexCorp/3.jpg',
      '/TangexCorp/4.jpg',
    ],
  },

  {
    projectName: 'Via Eroi d’Italia',
    imgSrc: '/Home/11.webp',
    description: `Progettazione, Interior design e d.l. di una palazzina residenziale a Cagliari.
    `,
    slug: 'Via-Eroi-d-Italia',
    imgCredits: 'Foto © Matteo Piazza',
    images: [
      '/EdificioCommendatore/1.jpg',
      '/EdificioCommendatore/2.jpg',
      '/EdificioCommendatore/3.jpg',
      '/EdificioCommendatore/4.jpg',
      '/EdificioCommendatore/5.jpg',
      '/EdificioCommendatore/6.jpg',
      '/EdificioCommendatore/7.jpg',
      '/EdificioCommendatore/8.jpg',
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
