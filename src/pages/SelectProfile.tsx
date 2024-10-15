import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AnimeGenre } from "../types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  arrayUnion,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { useDb } from "../context/DbContext";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { useUser } from "../context/userContext";

export default function SelectProfile() {
  const db = useDb();
  const location = useLocation();
  const roomName = location.state?.roomName;
  const roomIdLocation = location.state?.roomId;
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const [userAvatar, setUserAvatar] = useState<any>("");
  const [userName, setUserName] = useState<string>("");
  const [animeLink, setAnimeLink] = useState<string>("");
  const [animeFileList, setAnimeFileList] = useState<any>();
  const [seriesFormatChecked, setSeriesFormatChecked] =
    useState<boolean>(false);
  const [selectedFormats] = useState<string[]>([]);
  const [seriesMinEpisodes, setSeriesMinEpisodes] = useState<number>();
  const [seriesMaxEpisodes, setSeriesMaxEpisodes] = useState<number>();
  const [animeGenres, setAnimeGenres] = useState<AnimeGenre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [genreClicked, setGenreClicked] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleProfileSubmit = async () => {
    setButtonClicked(true);
    console.log("Guardando usuario...");
    const userId = uuidv4();
    const user = {
      id: userId,
      name: userName,
      avatar: userAvatar,
      animeList: animeLink || null,
      animeFileList: animeFileList || null,
      animeFormat: selectedFormats || null,
      animePreferences: selectedGenres || null,
      userToRecommend: {},
    };

    Cookies.set("token", user.id, { expires: 60 });

    try {
      if (roomName) {
        const roomRef = collection(db, "rooms");
        const q = query(roomRef, where("name", "==", roomName));
        const docs = await getDocs(q);

        if (!docs.empty) {
          const roomId = docs.docs[0].id;
          const roomById = doc(db, "rooms", roomId);
          await updateDoc(roomById, {
            users: arrayUnion(user),
          });

          console.log("Usuario guardado");
          navigate(`/room/${roomId}/${userId}`);
        }
      } else {
        const roomDoc = doc(db, "rooms", roomIdLocation);
        await updateDoc(roomDoc, {
          users: arrayUnion(user),
        });

        console.log("usuario guardado");
        navigate(`/room/${roomIdLocation}/${userId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
    console.log(selectedFormats);
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
    setUserAvatar(image);
  };

  const handleFormatChange = (animeFormat: string, isChecked: boolean) => {
    if (isChecked) {
      if (!selectedFormats.includes(animeFormat)) {
        selectedFormats.push(animeFormat);
      }
    } else {
      const index = selectedFormats.indexOf(animeFormat);
      if (index > -1) {
        selectedFormats.splice(index, 1);
      }
    }
    if (animeFormat == "Serie TV") {
      setSeriesFormatChecked(!seriesFormatChecked);
    }
  };

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];
    setAnimeFileList(file);
  };

  const handleGenreClick = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      selectedGenres.push(genre);
    } else {
      const index = selectedGenres.indexOf(genre);
      if (index > -1) {
        selectedGenres.splice(index, 1);
      }
    }
    console.log(selectedGenres);
    setGenreClicked(!genreClicked);
  };

  return (
    <>
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <>
          {!user ? (
            <>
              <h1>Configura tu perfil</h1>
              <div className="flex flex-col">
                <div
                  className="h-24 w-24 rounded-full overflow-hidden cursor-pointer hover:bg-gray-500"
                  onClick={handleAvatarClick}
                >
                  <img
                    src={
                      userAvatar
                        ? userAvatar
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
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="URL Anilist o MyAnimeList"
                  className="input input-bordered"
                  value={animeLink}
                  onChange={(e) => {
                    setAnimeLink(e.target.value);
                  }}
                />
                <div className="divider">
                  O, si no tienes ninguna cuenta, sube un archivo con tu lista
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  accept=".txt,.csv,.json,.pdf"
                  onChange={uploadFile}
                />
                <span>Selecciona los formatos que te interesen</span>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    {animeFormats.map((animeFormat) => (
                      <div className="form-control w-52">
                        <label className="label cursor-pointer">
                          <span className="label-text">{animeFormat}</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={(e) =>
                              handleFormatChange(animeFormat, e.target.checked)
                            }
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {seriesFormatChecked && (
                      <div>
                        <span>Elije un rango de capítulos deseado:</span>
                        <span>Mínimo</span>
                        <input
                          type="number"
                          min={1}
                          value={seriesMinEpisodes}
                          onChange={(e) => {
                            setSeriesMinEpisodes(e.target.valueAsNumber);
                          }}
                        />
                        <span>Máximo</span>
                        <input
                          type="number"
                          min={1}
                          value={seriesMaxEpisodes}
                          onChange={(e) => {
                            setSeriesMaxEpisodes(e.target.valueAsNumber);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <span>
                  Selecciona tus preferencias de género (Lo que no elijas no se
                  te recomendará)
                </span>
                <div className="flex flex-wrap gap-2">
                  {animeGenres?.map((genre) => (
                    <button
                      key={genre.mal_id}
                      className={`badge transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:bg-blue-500 active:bg-blue-700 text-white ${
                        selectedGenres.includes(genre.name) && "bg-blue-700"
                      }`}
                      onClick={() => handleGenreClick(genre.name)}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
                <button
                  className={`btn btn-primary ${
                    buttonClicked && "btn-disabled"
                  }`}
                  onClick={() => handleProfileSubmit()}
                >
                  Terminar
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <h1>Bienvenido de vuelta {user.name}</h1>
              <Link
                to={`/room/${roomIdLocation}/${user.id}`}
                className="btn btn-primary"
              >
                Entrar en la sala
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
