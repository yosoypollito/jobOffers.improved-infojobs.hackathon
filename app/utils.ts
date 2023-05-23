const datePeriods = {
  year: 1000 * 3600 * 24 * 365,
  month: 1000 * 3600 * 24 * 30,
  week: 1000 * 3600 * 24 * 7,
  day: 1000 * 3600 * 24,
  hour: 1000 * 3600,
  minute: 1000 * 60,
  second: 1000,
}

export const formatDate = (fecha: Date): {
  texts:{
    [key: string]: string;
  },
  times:{
    [key:string]:number;
  }
} => {
  const ahora = Date.now();
  if (!(fecha && fecha.valueOf())) {
    throw new Error(`Fecha: '${fecha}' no es válida`);
  }
  if (fecha.valueOf() > ahora) {
    throw new Error(`Fecha: ${fecha} es futura`);
  }
  let diferencia = ahora - fecha.valueOf();
  const years = Math.floor(diferencia / datePeriods.year);
  diferencia -= datePeriods.year * years;
  const months = Math.floor(diferencia / datePeriods.month);
  diferencia -= datePeriods.month * months;
  const weeks = Math.floor(diferencia / datePeriods.week);
  diferencia -= datePeriods.week * weeks;
  const days = Math.floor(diferencia / datePeriods.day);
  diferencia -= datePeriods.day * days;
  const hours = Math.floor(diferencia / datePeriods.hour);
  diferencia -= datePeriods.hour * hours;
  const minutes = Math.floor(diferencia / datePeriods.minute);
  diferencia -= datePeriods.minute * minutes;
  const seconds = Math.floor(diferencia / datePeriods.second);
  const textYears = years ? `${years === 1 ? 'un año' : `${years} años`}` : '';
  const textMonths = months ? `${months === 1 ? 'un mes' : `${months} meses`}` : '';
  const textWeeks = weeks ? `${weeks === 1 ? 'una semana' : `${weeks} semanas`}` : '';
  const textDays = days ? `${days === 1 ? 'un día' : `${days} días`}` : '';
  const textHours = hours ? `${hours === 1 ? 'una hora' : `${hours} horas`}` : '';
  const textMinutes = minutes ? `${minutes === 1 ? 'un minuto' : `${minutes} minutos`}` : '';
  const textSeconds = seconds ? `${seconds === 1 ? 'un segundo' : `${seconds} segundos`}` : '';
  
  const textMain = years >= 1 ? textYears : months >= 1 ? textMonths : weeks >= 1 ? textWeeks : days >= 1 ? textDays : hours >= 1 ? textHours : minutes >= 1 ? textMinutes : seconds >= 1 ? textSeconds : '';

  return {
    times: {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
    },
    texts: {
      main: textMain,
      years: textYears,
      months: textMonths,
      weeks: textWeeks,
      days: textDays,
      hours: textHours,
      minutes: textMinutes,
      seconds: textSeconds,
    }
  }
}