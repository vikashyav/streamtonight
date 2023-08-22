/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';
// import seriesIcon from '../vector/series-icon';
// interface NavItemProps {
//   name: 'TV' | 'Movies';
// }

const NavItem = ({ name, icon_url, link }) => (
  (<NextLink
    href={`/${link}`}
    className="flex items-center text-xl sm:text-lg hover:text-textHighlight font-semibold tracking-wide pl-5 py-3 sm:py-3 sm:mr-5">
    {icon_url && <img src={icon_url} alt="" className="h-5 px-1" />}
    {/* <seriesIcon className='h-10 px-1 text-black' /> */}
    {name}

  </NextLink>)
);

export default NavItem;
