import Card from "../../components/Card";
import ScrollUpButton from "../../components/ScrollUpButton";
import styles from "./presses.module.css";

export default function Presses() {
  return (
    <div className="presses-container flex-row justify-center ">
      <div className="card-box bg-gray-100 p-10 flex flex-col gap-16">
        {/* container start */}
        <Card
          description=" “Gianluca Pignataro – 30 anni di inconsuetudine”, monografia a cura di Luigi Corda – “Associazione Culturale Timeless”"
          imageSource="/Pubblicazioni/Inconsuetudine.jpg"
          source={null}
          date="Dicembre 2023"
        />

        <Card
          description=" “Ristrutturazione di un appartamento”, articolo pubblicato nel sito online “TUBES”."
          imageSource="/Pubblicazioni/TUBES_cover.jpg"
          source={
            <a
              href="https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/"
              className={styles.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vai all' articolo
            </a>
          }
          date="2022"
        />

        <Card
          description=" “15 motivi (….)”, articolo pubblicato nella rivista online “HOMIFY”"
          imageSource="/Pubblicazioni/HOMIFY_cover1.jpg"
          source={
            <a
              href="https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti"
              className={styles.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vai all' articolo
            </a>
          }
          date="Febbraio 2021"
        />

        <Card
          description=" Recupero dei sottotetti (….)”, articolo pubblicato nella rivista online “HOMIFY”"
          imageSource="/Pubblicazioni/HOMIFY_cover2.jpg"
          source={
            <a
              href="https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte"
              className={styles.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vai all' articolo
            </a>
          }
          date="Novembre 2018"
        />

        <Card
          description="Un appartamento moderno rivoluzionato”, articolo pubblicato nella rivista online “HOMIFY”"
          imageSource="/Pubblicazioni/HOMIFY_cover3.jpg"
          source={
            <a
              href="https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario"
              className={styles.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vai all' articolo
            </a>
          }
          date="Maggio 2016"
        />

        <Card
          description="“Sull’onda del gres”, articolo pubblicato nella rivista “YOUTRADE Casa”"
          imageSource="/Pubblicazioni/GRES_cover_resized.jpg"
          source={null}
          date="Settembre 2015"
        />

        <Card
          description="“Diamoci un taglio (ma diagonale)”, copertina e articolo pubblicato nella rivista “YOUTRADE Casa”"
          imageSource="/Pubblicazioni/YOUTRADE.jpg"
          source={null}
          date="Maggio 2015"
        />

        <Card
          description="“Sulle orme della Storia”, articolo pubblicato nella rivista “Brava Casa”"
          imageSource="/Pubblicazioni/Bravacasa.jpg"
          source={null}
          date="Marzo 1999"
        />
      </div>
      <ScrollUpButton />
    </div>
  );
}
