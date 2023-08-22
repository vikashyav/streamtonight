import Skeleton from "..";
import IconSkeleton from "../icon-skeleton";

function ShowSkeleton({ shouldShow, children, className, type }) {
  return shouldShow ? type === "icon" ? <IconSkeleton className={className} /> : <Skeleton className={className} /> : children;
}

export default ShowSkeleton;
