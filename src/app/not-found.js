import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Siamo spiacenti, la pagina che hai cercato non esiste.</h2>
      <Link href="/">Clicca qui per tornare alla home</Link>
    </div>
  );
}
