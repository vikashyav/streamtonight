import cx from "../../../utils/class-names";

const animations = (props) => {
  return {
    pulse: "animate-pulse  duration-2000 ease-in-out",
    wave: "relative z-[1] translate-z-1 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:bg-[length:50%_100%] before:bg-no-repeat before:from-gray-200  before:to-gray-100 before:animate-[wave_2s_ease-in-out_infinite]",
    false: "",
  }[props.animation];
};

const variations = (props) => {
  return {
    text: "h-auto mt-0 mb-0 origin-[0_55%] scale-x-[1] scale-y-[0.6] rounded-[4px/6.7px] w-full",
    circular: "rounded-[50%]",
    rectangular: "rounded-none",
  }[props.variant];
};

export default function useSkeletonClass(props) {
  const { animation, variant, className } = props;

  const commonClasses = "block bg-gray-200 ";
  const animationClasses = animations({ animation });
  const variantClasses = variations({ variant });

  return cx(commonClasses, animationClasses, variantClasses, className);
}
