'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { iconButtonClass } from '../../utils';
import AppHeading from './AppHeading';
import NavItem from './NavItem';
import SearchBar from './SearchBar';
const iconButtonClass =
  "ml-3 p-2 border border-inputPlaceholder hover:bg-bg2 mr-5 rounded-md";

const AppHeader = () => {
  const [value, setValue] = useState('');
  const [expandMenu, setExpandMenu] = useState(false);

  const { asPath } = useRouter();

  const toggleMenu = () => setExpandMenu(!expandMenu);

  useEffect(() => setExpandMenu(false), [asPath]);
  return (
    <header
      className="day2-header  sticky top-0 bg-bgFull z-[99]"
      // bg-[#040714]  bg-[#040714]
    >
      <div className="md:hidden w-full flex justify-between items-center relative">
        <AppHeading />
        <button
          aria-label="expand menu"
          className={iconButtonClass}
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5 text-textHighlight"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {expandMenu ? (
          <div className="day2-header absolute top-14 w-full bg-bgFull flex flex-col pt-2 pb-6">
            <NavItem name="Movies" link="movie" />
            <NavItem name="Bollywood" link="bollywood" />
            <NavItem name="Series" link="series" />
            <div className="px-2">
              <SearchBar setValue={setValue} value={value} />
            </div>
          </div>
        ) : null}
      </div>
      <div className="hidden md:flex w-full justify-between items-center">
        <div className="flex items-center">
          <AppHeading />
          <nav className='flex'>
            <NavItem icon_url={"/images/movie-icon.svg"} name="Movies" link="movie" />
            <NavItem icon_url={"/images/movie-icon.svg"} name="Bollywood" link="bollywood" />
            <NavItem icon_url={"/images/series-icon.svg"} name="Series" link="series"/>
          </nav>
        </div>
        <SearchBar setValue={setValue} value={value} />
      </div>
    </header>
  );
};

export default AppHeader;
