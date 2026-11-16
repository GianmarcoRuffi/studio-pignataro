import Catalog from "./Catalog";
import CollectionStructuredData from "../../components/StructuredData/CollectionStructuredData";
export default function Page() {
  return (
    <>
      <CollectionStructuredData publications={true} />
      <Catalog />
    </>
  );
}
