export default function Contacts() {
  return (
    <div className="contacts-container flex justify-center items-center bg-gray-100 max-lg:flex-col">
      <div className="image-container lg:w-2/3 lg:pr-4 ">
        <img src="/Studio.jpg " alt="studio" className="max-w-full" />
      </div>

      <div className="contacts-box py-8  lg:w-1/3 flex items-center text-xs md:text-sm ">
        <ul className="contacts">
          <li className="p-4">
            <strong>Studio:</strong> Via Ada Negri 12, 09127 Cagliari
          </li>
          <li className="p-4">
            <strong>Email:</strong>{" "}
            <a href="mailto:glpignataro@yahoo.it" className="mailto">
              glpignataro@yahoo.it
            </a>
          </li>
          <li className="p-4">
            <strong>Telefono:</strong> 0703517306 / Cell. 3485189797
          </li>
        </ul>
      </div>
    </div>
  );
}
