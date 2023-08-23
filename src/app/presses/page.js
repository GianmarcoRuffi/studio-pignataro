import Link from "next/link";
import Image from "next/image";
import Card from "../../components/Card";

export default function Presses() {
  return (
    <div className="flex justify-center">
      <div className="presses-container flex justify-center items-center max-w-7xl">
        <div class="card-box bg-gray-100 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-16">
          {/* container start */}

          <Card
            description=" “Ristrutturazione di un appartamento”, articolo pubblicato nel sito online “TUBES”."
            imageSourceLeft="/Pubblicazioni/TUBES.JPG"
            imageSourceRight="/Pubblicazioni/TUBES02.JPG"
            source="https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/"
             date="2022"
          >
            {" "}
          </Card>

          <Card
            description=" “15 motivi (….)”, articolo pubblicato nella rivista online “HOMIFY”
            https://www.homify.it/librodelleidee/7792268/15-motivi-per-scegliere-il-cocciopesto-e-i-laterizi-per-i-rivestimenti "
            imageSourceLeft="/IMG_25.JPG"
            imageSourceRight="/IMG_25.JPG"
            date="Febbraio 2021"
          >
            {" "}
          </Card>

          <Card
            description=" Recupero dei sottotetti(….)”, articolo pubblicato nella rivista online “HOMIFY”, 
            https://www.homify.it/librodelleidee/6101558/recupero-dei-sottotetti-misure-e-normative-per-il-piemonte "
            imageSourceLeft="/IMG_25.JPG"
            imageSourceRight="/IMG_25.JPG"
            date="Novembre 2018"
          >
            {" "}
          </Card>


          <Card
            description="rivista di architettura"
            imageSourceLeft="/IMG_25.JPG"
            imageSourceRight="/IMG_25.JPG"
            date="01/04/2018"
          >
            {" "}
          </Card>

          <Card
            description="rivista di architettura"
            imageSourceLeft="/IMG_25.JPG"
            imageSourceRight="/IMG_25.JPG"
            date="01/04/2018"
          >
            {" "}
          </Card>
        </div>
      </div>
    </div>
  );
}
