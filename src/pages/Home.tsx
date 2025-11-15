import type { EventType } from "../types/eventTypes";
import { generateCardGrid, getResponsiveWidth } from "../helpers/recentContentGrid";
// import { RecentContentThread } from "../components/RecentContentThread";
import { useGetRecentContent } from "../api/queries";
import { RecentContentCard } from "../components/recentContentCard";

const Home = () => {
  const { 
    isSuccess: isRecentContentSuccess,
    isLoading: isRecentContentLoading,
    isError: isRecentContentError,
    data: recentContentData,
    error: recentContentError,
  } = useGetRecentContent();
  console.log(recentContentData?.data || recentContentError?.error);
  const cardRows = generateCardGrid(recentContentData?.data || []);
  
  return (
    <div className="w-full h-full pt-15 flex justify-center">
      {/* <RecentContentThread 
        className="absolute -z-10 w-[128vw] shadow-[0_4px_7px_0_rgba(169,0,0,0.60)]"
      /> */}
      {isRecentContentSuccess && (
        <div className="flex flex-col gap-10 w-full max-w-7xl h-max mx-auto px-8 lg:px-12 pb-6">
          {cardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-10 w-full min-w-0">
              {row.map(({ item, width, height }) => (
                <div key={item.id} className={`${getResponsiveWidth(width)} ${height} min-w-0`}>
                  <RecentContentCard 
                    title={item.title} 
                    type={item.type as EventType} 
                    date={item.date} 
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {isRecentContentLoading && (
        <div className="flex max-w-7xl w-full h-full items-center justify-center">
          <div className="w-full h-min text-center text-black text-[8rem] animate-pulse">Loading...</div>
        </div>
      )}
      {isRecentContentError && (
        <div className="flex flex-col max-w-7xl w-full h-full items-center justify-center">
        <div className="w-full h-min text-center text-black text-[5rem] leading-none">Something went wrong...</div>
        <div className="w-full h-min text-center text-black text-[2rem]">Please try again later.</div>
      </div>
      )}
    </div>
  )
}
export default Home;
