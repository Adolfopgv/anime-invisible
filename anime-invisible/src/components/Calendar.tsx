import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { format, setHours, setMinutes, isSameDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function Calendar({ onDateChange }: CalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const now = new Date();
  const roundedNow = setMinutes(setHours(now, now.getHours()), 0);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(date);
    }
    onDateChange(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  const filterStartTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    // Solo aplicar restricciones si es el día actual
    if (isSameDay(selectedDate, currentDate)) {
      return currentDate.getTime() < selectedDate.getTime();
    }

    // Para fechas futuras, permite todas las horas
    return true;
  };

  return (
    <div className="">
      <span>Selecciona Rango de Fechas y Horas</span>
      <div>
        <label htmlFor="start-date">Fecha y Hora de Inicio</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={handleStartDateChange}
          showTimeSelect
          dateFormat="Pp"
          locale={es}
          placeholderText="Selecciona fecha y hora de inicio"
          minDate={now}
          minTime={
            isSameDay(startDate || now, now)
              ? roundedNow
              : setHours(setMinutes(new Date(), 0), 0)
          }
          maxTime={setHours(setMinutes(new Date(), 45), 23)}
          filterTime={filterStartTime}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="end-date">Fecha y Hora de Fin</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={handleEndDateChange}
          showTimeSelect
          dateFormat="Pp"
          locale={es}
          placeholderText="Selecciona fecha y hora de fin"
          minDate={startDate || now}
          minTime={
            isSameDay(endDate || startDate || now, now)
              ? startDate || roundedNow
              : setHours(setMinutes(new Date(), 0), 0)
          }
          maxTime={setHours(setMinutes(new Date(), 45), 23)}
          className="w-full p-2 border rounded"
        />
      </div>
      {startDate && endDate && (
        <div className="mt-4 p-3 rounded">
          <p>
            <strong>Fechas seleccionadas:</strong>
          </p>
          <p>Inicio: {format(startDate, "dd/MM/yyyy HH:mm", { locale: es })}</p>
          <p>Fin: {format(endDate, "dd/MM/yyyy HH:mm", { locale: es })}</p>
        </div>
      )}
    </div>
  );
}
