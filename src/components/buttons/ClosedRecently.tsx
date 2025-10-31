import LoopTap from "../../assets/LoopTap.svg"

type Props = {
  onClick: () => void;
};



export default function ClosedRecentlyButton({onClick}: Props){

    return (
        <button
        onClick = {onClick}
        className="absolute cursor-pointer z-10"
        style={{
          right: '0%',
          top: '73.4%',
          height: '23.22vh',
          width: 'auto',
        }}
      >
        <img src={LoopTap} alt="The Loop" className="w-auto h-full" />
      </button>
    )
}