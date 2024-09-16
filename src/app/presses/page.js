import PressesCard from "../../components/PressesCard";
import ScrollUpButton from "../../components/ScrollUpButton";
import LinkButton from "../../components/LinkButton";
import pressesData from "../../data/pressesData";
import styles from "./presses.module.css";

export default function Presses() {
  return (
    <div className="presses-container flex-row justify-center ">
      <div className={`${styles.cardBox} p-10 flex flex-col gap-16`}>
        {pressesData.map((press, index) => (
          <PressesCard
            key={index}
            description={press.description}
            imageSource={press.imageSource}
            source={
              press.source ? (
                <LinkButton
                  href={press.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vai all'articolo
                </LinkButton>
              ) : (
                ""
              )
            }
            date={press.date}
          />
        ))}
      </div>
      <ScrollUpButton />
    </div>
  );
}
