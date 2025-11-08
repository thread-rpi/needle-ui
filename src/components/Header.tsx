import { Link } from "react-router-dom";
import { aboutPath, featuresPath, publicationsPath, calendarPath } from "../routes/routePaths";

export default function Header() {
  return (
    <nav className="z-200 w-dvw h-max fixed top-0 left-0 flex justify-end gap-4 p-4 bg-white">
      {/* thread logo w child link to rootPath */}
      <Link to={aboutPath}>About Us</Link>
      <Link to={featuresPath}>Features</Link>
      <Link to={publicationsPath}>Publications</Link>
      <Link to={calendarPath}>Calendar</Link>
    </nav>
  )
}
