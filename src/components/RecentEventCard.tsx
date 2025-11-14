interface RecentEventCardProps {
  title: string;
  date: string;
  type: string;
}



const RecentEventCard = ({ title, date, type }: RecentEventCardProps) => {
    return (
        <div>
            {title}
            {date}
            {type}
        </div>
    )
}

export default RecentEventCard;