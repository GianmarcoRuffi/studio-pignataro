import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper items-center flex justify-start max-lg:flex-col">
        <div className="footer-contacts flex">
          <ul className="footer-list">
            <li className="p-4">Via Ada Negri 12, 09127 Cagliari</li>
            <li className="p-4">0703517306 / Cell. 3485189797</li>
            <li className="p-4">
              <a href="mailto:glpignataro@yahoo.it">glpignataro@yahoo.it</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
