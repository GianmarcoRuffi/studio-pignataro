import { FC } from "react";

interface CardSkeletonProps {
  count?: number;
  descriptionLines?: number;
  className?: string;
  placeholderClassName?: string;
  textClassName?: string;
  titleClassName?: string;
  descClassName?: string;
}

export const CardSkeleton: FC<CardSkeletonProps> = ({
  count = 1,
  descriptionLines = 2,
  className = "",
  placeholderClassName = "",
  textClassName = "",
  titleClassName = "",
  descClassName = "",
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`skeleton-${index}`}
          className={className}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={placeholderClassName}></div>
          <div className={textClassName}>
            <div className={titleClassName}></div>
            {Array.from({ length: descriptionLines }, (_, descIndex) => (
              <div key={`desc-${descIndex}`} className={descClassName}></div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
