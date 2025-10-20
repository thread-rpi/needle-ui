import { Link } from "react-router-dom";
import { aboutPath, featuresPath, publicationsPath, calendarPath } from "../routes/routePaths";

export default function Header() {
  return (
    <nav className="z-200 w-full h-max absolute flex justify-end gap-4 p-4">
      {/* thread logo w child link to rootPath */}
      <Link to={aboutPath}>About Us</Link>
      <Link to={featuresPath}>Features</Link>
      <Link to={publicationsPath}>Publications</Link>
      <Link to={calendarPath}>Calendar</Link>
    </nav>
  )
}
