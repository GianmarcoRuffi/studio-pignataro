import Link from "next/link";
import Image from "next/image";

export default function Contacts() {
  return (
    <div className="contacts-container flex justify-center items-center">
      <div className="wrapper row grid grid-cols-2 gap-6">
        <div className="image-container  responsive">
          <Image
            src="/ufficio_01.jpg"
            alt="contacts"
            width="582"
            height="388"
            className="responsive"
          />
        </div>

        <div className="contacts-box flex justify-center items-center max-w-xs bg-gray-100">
          <ul className="contacts text-sm">
            <li>Email@gmail.com</li>
            <li>651 | 302 | 0420</li>
            <li>Saint Paul Minnesota 55114</li>
            <li>Linkedin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
