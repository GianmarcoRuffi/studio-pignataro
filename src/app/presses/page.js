import Link from "next/link";
import Image from "next/image";
import Card from "../../components/Card";

export default function Presses() {
  return (
    <div className="flex justify-center">
      <div className="presses-container flex justify-center items-center max-w-7xl">
        <div class="card-box bg-gray-100 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {/* container start */}

          <Card
            description="rivista di architettura"
            imageSource="/IMG_25.JPG"
            date="01/04/2018"
          >
            {" "}
          </Card>

          <Card
            description="https://www.tubesradiatori.com/it/progetti/ristrutturazione-di-un-appartamento/"
            imageSource="/tubes.jpg"
            date="2013"
          >
            {" "}
          </Card>

          <Card
            description="rivista di architettura"
            imageSource="/IMG_25.JPG"
            date="01/04/2018"
          >
            {" "}
          </Card>


          <Card
            description="rivista di architettura"
            imageSource="/IMG_25.JPG"
            date="01/04/2018"
          >
            {" "}
          </Card>

          <Card
            description="rivista di architettura"
            imageSource="/IMG_25.JPG"
            date="01/04/2018"
          >
            {" "}
          </Card>
        </div>
      </div>
    </div>
  );
}
