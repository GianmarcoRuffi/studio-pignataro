import Card from "../../components/Card";
import ScrollUpButton from "../../components/ScrollUpButton";
import styles from "./presses.module.css";
import pressesData from "../../data/pressesData";

export default function Presses() {
  return (
    <div className="presses-container flex-row justify-center ">
      <div className="card-box bg-gray-100 p-10 flex flex-col gap-16">
        {pressesData.map((press, index) => (
          <Card
            key={index}
            description={press.description}
            imageSource={press.imageSource}
            source={
              press.source ? (
                <a
                  href={press.source}
                  className={styles.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vai all' articolo
                </a>
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
