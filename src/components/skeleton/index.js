import React from "react";
import PropTypes from "prop-types";

import useSkeletonClass from "./styles";
import cx from "../../../utils/class-names";

const ANIMATION = ["pulse", "wave", "false"];
const VARIANTS = ["text", "circular", "rectangular"];

const Skeleton = React.forwardRef((props, ref) => {
  const { animation = "pulse", variant = "text", width, height, className, ...restProps } = props;

  const classes = useSkeletonClass({
    animation,
    variant,
    width,
    height,
    className,
  });
  let isText = variant === "text";
  return (
    <span ref={ref} className={cx("skeleton", classes)} {...restProps}>
      {isText ? <>&zwnj;</> : ""}
    </span>
  );
});

Skeleton.defaultProps = {
  animation: "pulse",
  variant: "text",
  className: "",
};

Skeleton.propTypes = {
  animation: PropTypes.oneOf(ANIMATION),
  variant: PropTypes.oneOf(VARIANTS),
  className: PropTypes.string,
};

export default Skeleton;
