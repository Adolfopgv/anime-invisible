export default function Home() {
  return (
    <main>
      <h1>Anime Invisible</h1>
      <div>
        <span>
          ¡Bienvenid@ a tu página de confianza para hacer amigos invisibles de
          anime!
        </span>
        <button className="btn-ghost">Crear sala</button>
        <div className="divider">O</div>
        <span>¡Introduce el link de tu amigo para unirte a su sala!</span>
        <input
          type="text"
          placeholder="Link de la sala"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </main>
  );
}
