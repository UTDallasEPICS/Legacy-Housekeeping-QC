import { montserrat } from "../../../../theme";
import { EllipsisTextChipProps } from "./props";

const EllipsisTextChip = (props: EllipsisTextChipProps) => {
  const { children, width } = props;

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: width,
        fontFamily: montserrat.style.fontFamily,
      }}
    >
      {children}
    </div>
  );
};

export default EllipsisTextChip;
