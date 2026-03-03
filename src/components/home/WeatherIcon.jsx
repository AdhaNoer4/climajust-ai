import { weatherIconMap } from "../../utils/weatherIconMap";
import clearDay from "../../assets/weather/clear-day.svg";

const WeatherIcon = ({ description, className }) => {
  const normalized = description?.toLowerCase().trim();
  const icon = weatherIconMap[normalized] || clearDay;

  return (
    <img
      src={icon}
      alt={description}
      className={className}
    />
    );
};

export default WeatherIcon;
