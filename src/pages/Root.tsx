import { useNavigate } from 'react-router-dom';
import '../index.css'
import landingPage from '../assets/landingPage.png'

function Root() {
  const navigate = useNavigate();
  const aboutUs = () => {
    navigate('/aboutUs')
  }
  const featured = () => {
    navigate('/features')
  }
  const calendar = () => {
    navigate('calendar')
  }
  const publications = () => {
    navigate('publications')
  }


  return (
    <div 
    className = "w-full h-screen bg-cover bg-center"
    style = {{backgroundImage: `url(${landingPage})`}}
    >
    <button
    className = "absolute text-2xl cursor-pointer"
    style = {{top: "33px", left:"1180px", opacity: 0}}
    onClick = {aboutUs}
    >Click me!</button>

    <button
    className = "absolute text-2xl cursor-pointer"
    style = {{top: "36px", left:"1330px", opacity: 0}}
    onClick = {featured}
    >Click me!</button>

    <button
    className = "absolute text-2xl cursor-pointer"
    style = {{top: "33px", left:"1480px", opacity: 0}}
    onClick = {calendar}
    >Click me!</button>

    <button
    className = "absolute text-3xl cursor-pointer"
    style = {{top: "29px", left:"1640px", transform: 'rotate(6deg)', opacity: 0}}
    onClick = {publications}
    >Click me!</button>

    <button
    className = "absolute text-3xl cursor-pointer"
    style = {{top: "300px", left:"1640px", transform: 'rotate(6deg)'}}
    onClick = {publications}
    >Click me!</button>


    
    </div>
  )
}

export default Root;
