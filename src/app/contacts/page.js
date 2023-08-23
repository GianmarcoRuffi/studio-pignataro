import Link from "next/link";
import Image from "next/image";

export default function Contacts() {
  return (
    <div className="contacts-container flex justify-center items-center">
      <div className="wrapper row md:grid grid-cols-2 gap-6">
        <div className="image-container  responsive">
          <Image
            src="/Studio.jpg"
            alt="contacts"
            width="620"
            height="580"
            className="responsive"
          />
        </div>

        <div className="contacts-box flex justify-center items-center max-w-xs bg-gray-100">
          <ul className="contacts text-sm">
            <li>
              <strong>Studio:</strong> Via Ada Negri 12, 09127 Cagliari
            </li>
            <li>
              <strong>Email:</strong> <a href="mailto:glpignataro@yahoo.it">glpignataro@yahoo.it</a> 
            </li>
            <li>
              <strong>Telefono:</strong> 0703517306 / Cell. 3485189797
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
