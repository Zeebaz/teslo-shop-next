import { FC } from "react";
import { Slide } from "react-slideshow-image";
import styles from "./ProductSlideshow.module.css";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: string[];
}

export const ProductSlideShow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={7000} indicators >
      {images.map((slideImage) => {
        const url = `/products/${slideImage}`;

        return (
          <div key={slideImage} className={styles["each-slide"]}>
            <div
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${url})`,
              }}
            ></div>
          </div>
        );
      })}
    </Slide>    
  );
};
