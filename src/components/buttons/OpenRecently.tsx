import Recently from "../../assets/Recently.svg";

export default function OpenRecentlyButton() {
  return (
    <div
      className="fixed"
      style={{
        top: "240px",      // fixed distance from top
        right: "50px",     // fixed distance from right
      }}
    >
      <img
        src={Recently}
        alt="Recently"
        className="h-auto object-contain"
        style={{
          width: "300px",          // fixed width
          transform: "scale(1.40)", // increased scale 
        }}
      />
    </div>
  );
}
