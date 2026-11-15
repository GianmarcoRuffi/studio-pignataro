import Catalog from "./Catalog";
import EditorialIndex from "../../components/StructuredData/EditorialIndex";
export default function Page() {
  return <Catalog editorialIndex={<EditorialIndex publications={true} />} />;
}
