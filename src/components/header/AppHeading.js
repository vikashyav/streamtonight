/* eslint-disable jsx-a11y/anchor-is-valid */
import constant from '@/helper/constant';
import NextLink from 'next/link';

const AppHeading = () => (
  <NextLink href="/" className="flex flex-col text-2xl font-bold ml-5 mr-8 py-3 text-textHighlight">
    <img src='/images/day2movies-icon.png' alt={constant.ATTRIBUTES.IMG} className='h-12 w-28' />
    {/* Day2Movies
    <span className='text-[10px] text-center pt-0'>stream day2night</span> */}
  </NextLink>
);

export default AppHeading;
