import recentContent from "../helpers/recentContent.json";
import { RecentContentCard } from "../components/RecentContentCard";
import type { EventType } from "../types/eventTypes";
import { generateCardGrid, getResponsiveWidth } from "../helpers/recentContentGrid";
import { RecentContentThread } from "../components/RecentContentThread";

const Home = () => {
  const cardRows = generateCardGrid(recentContent);

  return (
    <div className="w-full h-full pb-6 pt-20 flex justify-center">
      <RecentContentThread 
        className="absolute -z-10 w-[128vw] shadow-[0_4px_7px_0_rgba(169,0,0,0.60)]"
      />
      <div className="flex flex-col gap-10 max-w-7xl mx-auto px-7 lg:px-4 xl:px-0 w-full">
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
      
    </div>
  )
}
export default Home;
