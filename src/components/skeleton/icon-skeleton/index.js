import Skeleton from "..";
import cx from "../../../utils/class-names";

function IconSkeleton({ className }) {
  return <Skeleton className={cx("h-10 w-10", className)} variant="circular" />;
}

export default IconSkeleton;
