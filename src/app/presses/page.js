import Link from "next/link";
import Image from "next/image";

export default function Presses() {
  return (
    <div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <Image src="/img_14.jpg" alt="contacts" width="550082" height="500" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Pubblicazione</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </div>
  );
}
