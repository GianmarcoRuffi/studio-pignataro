import Link from "next/link";
import Image from "next/image";
import Card from "../../components/Card";
import ScrollUpButton from "../../components/ScrollUpButton";

export default function Presses() {
  return (
    <div className="flex main-presses justify-center">
      <div className="presses-container flex justify-center items-center ">
        <div className="card-box bg-gray-100 p-10 flex flex-col  items-center md:flex-col md:flex-wrap md:justify-center md:gap-16 gap-16">
          {/* container start */}

          <Card
            description=" “Ristrutturazione di un appartamento”, articolo pubblicato nel sito online “TUBES”."
            imageSource="/Pubblicazioni/TUBES_cover.jpg"
            source={
              <a href="https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/">
                {" "}
                https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/
              </a>
            }
            date="2022"
          >
            {" "}
          </Card>

          <Card
            description=" “15 motivi (….)”, articolo pubblicato nella rivista online “HOMIFY”"
            imageSource="/Pubblicazioni/HOMIFY_cover1.jpg"
            source={
              <a href=" https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti">
                {" "}
                https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti
              </a>
            }
            date="Febbraio 2021"
          >
            {" "}
          </Card>

          <Card
            description=" Recupero dei sottotetti (….)”, articolo pubblicato nella rivista online “HOMIFY”"
            imageSource="/Pubblicazioni/HOMIFY_cover2.jpg"
            source={
              <a href=" https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte">
                {" "}
                https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte
              </a>
            }
            date="Novembre 2018"
          >
            {" "}
          </Card>

          <Card
            description="Un appartamento moderno rivoluzionato”, articolo pubblicato nella rivista online “HOMIFY"
            imageSource="/Pubblicazioni/HOMIFY_cover3.jpg"
            source={
              <a href="https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario">
                {" "}
                https://www.homify.it/librodelleidee/778802/un-appartamento-moderno-rivoluzionario
              </a>
            }
            date="Maggio 2016"
          >
            {" "}
          </Card>

          <Card
            description="“Sull’onda del gres”, articolo pubblicato nella rivista “YOUTRADE Casa”"
            imageSource="/Pubblicazioni/GRES_cover_resized.jpg"
            source=""
            date="Settembre 2015"
          >
            {" "}
          </Card>

          <Card
            description="“Diamoci un taglio (ma diagonale)”, copertina e articolo pubblicato nella rivista “YOUTRADE Casa” "
            imageSource="/Pubblicazioni/YOUTRADE.jpg"
            source=""
            date="Maggio 2015"
          >
            {" "}
          </Card>

          <Card
            description="“Sulle orme della Storia”, articolo pubblicato nella rivista “Brava Casa”"
            imageSource="/Pubblicazioni/Bravacasa.jpg"
            source=""
            date="Marzo 1999"
          >
            {" "}
          </Card>
        </div>
      </div>
      <ScrollUpButton />
    </div>
  );
}
