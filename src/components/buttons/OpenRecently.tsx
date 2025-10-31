import Recently from "../../assets/Recently.svg"

export default function OpenRecentlyButton(){

    return (
        <div>
        <button
            className="absolute"
            style={{
            right: '0%',
            top: '30.4%',
            height: '60.22vh',
            width: 'auto'
            }}
        >
            <img src={Recently} alt="Recently" className="w-auto h-full" />
        </button>

  </div>
    )
}