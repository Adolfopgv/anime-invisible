import Calendar from "../components/Calendar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { useDb } from "../context/DbContext";

export default function CreateRoom() {
  const db = useDb();
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [roomName, setRoomName] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [roomBackground, setRoomBackground] = useState<any>("");

  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [endDateError, setEndDateError] = useState<boolean>(false);
  const [roomNameError, setRoomNameError] = useState<boolean>(false);
  const [roomDescriptionError, setRoomDescriptionError] =
    useState<boolean>(false);
  const [roomBackgroundError, setRoomBackgroundError] =
    useState<boolean>(false);

  const [startDateErrorMessage, setStartDateErrorMessage] =
    useState<string>("");
  const [endDateErrorMessage, setEndDateErrorMessage] = useState<string>("");
  const [roomNameErrorMessage, setRoomNameErrorMessage] = useState<string>("");
  const [roomDescriptionErrorMessage, setRoomDescriptionErrorMessage] =
    useState<string>("");
  const [roomBackgroundErrorMessage, setRoomBackgroundErrorMessage] =
    useState<string>("");

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    console.log("Fecha de inicio:", start);
    console.log("Fecha de fin:", end);
  };

  const handleRoomSubmit = async () => {
    setButtonClicked(true);
    console.log("Creando sala...");
    const room = {
      name: roomName,
      description: roomDescription,
      background: roomBackground,
      startDate: startDate,
      endDate: endDate,
      users: [{}],
    };
    try {
      const roomRef = await addDoc(collection(db, "rooms"), room);
      if (roomRef) {
        navigate("/select-profile");
      }
    } catch (error) {
      console.error("Error al crear la sala:", error);
    }
    
    console.log(room);
  };

  const uploadImg = async (e: any) => {
    const file = e.target.files[0];
    const image = await imgbase64(file);
    setRoomBackground(image);
  };

  const imgbase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const dataImg = new Promise((res) => {
      reader.onload = () => res(reader.result);
    });
    return dataImg;
  };

  return (
    <>
      <h1>Configura tu sala</h1>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Nombre"
          className="input input-bordered"
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
            setRoomNameError(false);
          }}
        />
        <input
          type="text"
          placeholder="Descripción"
          className="input input-bordered"
          value={roomDescription}
          onChange={(e) => {
            setRoomDescription(e.target.value);
            setRoomDescriptionError(false);
          }}
        />
        <span>Selecciona un fondo personalizado</span>
        <input
          type="file"
          className="file-input file-input-bordered"
          accept=".jpg,.jpeg,.png"
          onChange={uploadImg}
        />
        <Calendar onDateChange={handleDateChange} />
        <button
          className={`btn btn-primary ${buttonClicked && "btn-disabled"}`}
          onClick={() => handleRoomSubmit()}
        >
          Crear Sala
        </button>
      </div>
    </>
  );
}
