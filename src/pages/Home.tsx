import recentContent from "../helpers/recentContent.json";
import { RecentContentCard } from "../components/recentContentCard";
import type { EventType } from "../types/eventTypes";
import { generateCardGrid } from "../helpers/recentContentGrid";

const Home = () => {
  const cardRows = generateCardGrid(recentContent);

  // Helper to convert width class to responsive version
  const getResponsiveWidth = (width: string) => {
    // On mobile (default), always use w-full
    // On md and above, use the original width
    // Handle both regular classes (w-full) and arbitrary values (w-[calc(...)])
    if (width.startsWith('w-[')) {
      // Arbitrary value: w-[calc(...)] -> md:w-[calc(...)]
      const value = width.substring(2); // Remove 'w-'
      return `w-full md:w-${value}`;
    } else {
      // Regular class: w-full -> md:w-full
      const mdWidth = width.replace('w-', 'md:w-');
      return `w-full ${mdWidth}`;
    }
  };

  return (
    <div className="w-full h-full pb-6 pt-20 overflow-x-hidden">
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-7 lg:px-4 xl:px-0 w-full">
        {cardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col md:flex-row gap-4 w-full min-w-0">
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
