import { ISize } from "@/interfaces";
import { Box, Button } from "@mui/material";
import { FC } from "react";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize?: (size: ISize) => void;
}

export const ProductSizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize: selectSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize == size ? "primary" : "info"}
          onClick={() => selectSize && selectSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
