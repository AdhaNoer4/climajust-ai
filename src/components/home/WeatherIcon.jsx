import { weatherIconMap } from "../../utils/weatherIconMap";
import clearDay from "../../assets/weather/clear-day.svg";

const WeatherIcon = ({ description, descriptionEn, className }) => {
  const text =
    descriptionEn?.toLowerCase().trim() ||
    description?.toLowerCase().trim() ||
    "";

  const matchedKey = Object.keys(weatherIconMap).find((key) =>
    text.includes(key)
  );
  
  console.log("WeatherIcon text:", text);
  const icon = matchedKey
    ? weatherIconMap[matchedKey]
    : clearDay;

  return <img src={icon} alt={text} className={className} />;
};

export default WeatherIcon;