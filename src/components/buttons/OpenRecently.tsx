import Recently from "../../assets/Recently.svg";

export default function OpenRecentlyButton() {
  return (
    <div
      className="fixed"
      style={{
        top: "min(21.2vh, 190px)",
        right: "0vw",
      }}
    >
      <img
        src={Recently}
        alt="Recently"
        className="h-auto object-contain"
        style={{
          width: "19vw", 
        }}
      />
    </div>
  );
}
