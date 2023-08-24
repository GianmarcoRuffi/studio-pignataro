import Link from "next/link";
import Image from "next/image";

export default function Contacts() {
  return (
    <div className="contacts-container flex justify-center items-center">
      <div className="contacts-wrapper row lg:grid grid-cols-2 gap-6">
        <div className="image-container ">
          <img src="/Studio.jpg" alt="studio" />
        </div>

        <div className="contacts-box py-8 flex justify-center items-center max-w-xs bg-gray-100">
          <ul className="contacts text-sm ">
            <li className="p-4">
              <strong>Studio:</strong> Via Ada Negri 12, 09127 Cagliari
            </li>
            <li className="p-4">
              <strong>Email:</strong>{" "}
              <a href="mailto:glpignataro@yahoo.it">glpignataro@yahoo.it</a>
            </li>
            <li className="p-4">
              <strong>Telefono:</strong> 0703517306 / Cell. 3485189797
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
