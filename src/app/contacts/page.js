import Link from "next/link";
import Image from "next/image";

export default function Contacts() {
  return (
    <div className="contacts-container flex justify-center items-center bg-gray-100">
      
        <div className="image-container w-1/2 pr-4 ">
          <img src="/Studio.jpg " alt="studio" className="max-w-full" />
        </div>

        <div className="contacts-box py-8  w-1/2 flex items-center ">
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
    
  );
}
