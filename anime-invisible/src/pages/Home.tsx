import { Link } from "react-router-dom"

export default function Home() {
  return (
    <main>
      <h1>Anime Invisible</h1>
      <div className="flex flex-col">
        <span>
          ¡Bienvenid@ a tu página de confianza para hacer amigos invisibles de
          anime!
        </span>
        <Link to={"/create-room"} className="btn btn-primary">Crear sala</Link>
      </div>
      <div className="divider">o</div>
      <div className="flex flex-col">
        <span>¡Introduce el link de tu amigo para unirte a su sala!</span>
        <input
          type="text"
          placeholder="Link de la sala"
          className="input input-bordered"
        />
        <button className="btn btn-secondary">Unirse a la sala</button>
      </div>
    </main>
  );
}
