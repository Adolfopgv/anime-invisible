import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AnimeGenre } from "../types";

export default function SelectProfile() {
  const [animeGenres, setAnimeGenres] = useState<AnimeGenre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.jikan.moe/v4/genres/anime"
        );
        if (response.data) {
          setAnimeGenres(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("Error al obtener los géneros de anime");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getGenres();
  }, []);

  const animeFormats = ["Serie TV", "OVA", "Película", "Especiales", "ONA"];

  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [img, setImg] = useState<any>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfileSubmit = () => {
    setButtonClicked(true);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const imgbase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const dataImg = new Promise((res) => {
      reader.onload = () => res(reader.result);
    });
    return dataImg;
  };

  const uploadImg = async (e: any) => {
    const file = e.target.files[0];
    const image = await imgbase64(file);
    setImg(image);
  };

  return (
    <>
      <h1>Configura tu perfil</h1>
      <div className="flex flex-col">
        <div
          className="h-24 w-24 rounded-full overflow-hidden cursor-pointer hover:bg-gray-500"
          onClick={handleAvatarClick}
        >
          <img
            src={
              img
                ? img
                : `data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNMjU2IDI1NmM1Mi44MDUgMCA5Ni00My4yMDEgOTYtOTZzLTQzLjE5NS05Ni05Ni05Ni05NiA0My4yMDEtOTYgOTYgNDMuMTk1IDk2IDk2IDk2em0wIDQ4Yy02My41OTggMC0xOTIgMzIuNDAyLTE5MiA5NnY0OGgzODR2LTQ4YzAtNjMuNTk4LTEyOC40MDItOTYtMTkyLTk2eiIvPjwvc3ZnPg==`
            }
            alt="avatar"
            className="object-cover w-full h-full"
          />
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            ref={fileInputRef}
            onChange={uploadImg}
          />
        </div>
        <input
          type="text"
          placeholder="Nombre"
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="URL Anilist o MyAnimeList"
          className="input input-bordered"
        />
        <div className="divider">
          O, si no tienes ninguna cuenta, sube un archivo o imagen con tu lista
        </div>
        <input
          type="file"
          className="file-input file-input-bordered"
          accept=".txt,.csv,.json,.pdf,.jpg,.jpeg,.png"
        />
        <span>Selecciona los formatos que te interesen</span>
        <div className="flex flex-col">
          {animeFormats.map((animeFormat) => (
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">{animeFormat}</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
          ))}
        </div>
        <span>
          Selecciona tus preferencias de género (Lo que no elijas no se te
          recomendará)
        </span>
        <div className="flex flex-wrap gap-2">
          {animeGenres?.map((genre) => (
            <button
              key={genre.mal_id}
              className="badge transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:bg-blue-500 active:bg-blue-700 text-white"
            >
              {genre.name}
            </button>
          ))}
        </div>
        <button
          className={`btn btn-primary ${buttonClicked && "btn-disabled"}`}
          onClick={() => handleProfileSubmit()}
        >
          Crear Sala
        </button>
      </div>
    </>
  );
}
