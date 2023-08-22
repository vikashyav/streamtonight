
import cx from "../../../../../utils/class-names";
const BasicsSection = ({
  classNames,
  heading,
  movie,
children
}) => {
  return <>
    <div
      className={cx("flex flex-row mb-4 sm:h-14  items-center rounded-lg border-[1px]", )}>
      <div className={cx("font-semibold min-w-[100px] max-w-[120px] sm:w-[120px] pl-2 py-2 overflow-hidden rounded-lg  bg-gray-700", classNames?.root)}>{heading}:</div>
      {
        heading === "Title" ?
          <h1 className={cx("pl-4", classNames?.content)}>
            {children}
          </h1> :
          <h2 className={cx("pl-4", classNames?.content)}>
            {children}
          </h2>
      }
    </div>
  </>
}

export default BasicsSection;
