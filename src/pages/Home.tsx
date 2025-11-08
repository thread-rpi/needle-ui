import recentContent from "../helpers/recentContent.json";
import { RecentContentCard } from "../components/recentContentCard";
import type { EventType } from "../types/eventTypes";
import { generateCardGrid } from "../helpers/recentContentGrid";

const Home = () => {
  const cardRows = generateCardGrid(recentContent);

  return (
    <div className="w-full h-full pb-6 pt-20">
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-7 lg:px-4 xl:px-0">
        {cardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {row.map(({ item, width, height }) => (
              <div key={item.id} className={`${width} ${height}`}>
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
