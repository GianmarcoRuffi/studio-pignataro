import Link from "next/link";
import Image from "next/image";

export default function Presses() {
  return (
    <div>
      
<div className="presses-container flex justify-center items-center">

{/* container start */}

      <div class="card-box bg-gray-100 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
{/* <!--Card 1--> */}
<div class="rounded overflow-hidden shadow-lg">
<Image src="/img_25.jpg" alt="contacts" width="600" height="200" />
  <div class="px-6 py-4 bg-gray-100">
    <div class="font-bold text-lg mb-2">Design @ Home magazine</div>
    <p class="text-gray-700 text-base">
    01/06/14 
    </p>
  </div>

</div>
{/* <!--Card 2--> */}
<div class="rounded overflow-hidden shadow-lg">
<Image src="/tubes.jpg" alt="contacts" width="800" height="500" />
  <div class="px-6 py-4">
    <div class="font-bold text-lg mb-2">https://www.tubesradiatori.com/it/</div>
    <p class="text-gray-700 text-base">
    2013
    </p>
  </div>

</div>

{/* <!--Card 3--> */}
<div class="rounded overflow-hidden shadow-lg">
<Image src="/img_25.jpg" alt="contacts" width="600" height="300" />
  <div class="px-6 py-4">
    <div class="font-bold text-lg mb-2">Rivista di architettura</div>
    <p class="text-gray-700 text-base">
      08/2010
    </p>
  </div>
 
</div>
</div>
</div>

{/* container end */}

</div>



    
  );
}



