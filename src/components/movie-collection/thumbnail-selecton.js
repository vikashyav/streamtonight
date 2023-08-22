import React from 'react'
import Skeleton from "../skeleton";

export default function ThumbnailSelecton() {
  return (
      <>
          <div className="flex flex-col bg-[#282c34] text-[white] cursor-pointer m-[5px] p-[5px] rounded-[10px] hover:bg-[white] hover:text-[black]">
              <div className="flex items-center mt-auto">
                  <Skeleton className="w-6 rounded-full h-6 mr-1 mt-1" variant="circular" />
                  <Skeleton className="w-7/12 mx-2 h-4 rounded-sm" variant="circular" />
              </div>
              <div className="flex pl-7">
                  <Skeleton className="w-5/12 mx-2 h-3 rounded-sm" variant="circular" />
              </div>
          </div>
      </>
  )
}
