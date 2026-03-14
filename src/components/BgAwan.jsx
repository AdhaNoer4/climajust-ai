import awanImage from '../assets/images/awan.png'; 

export default function BgAwan() {
  return (
    <img
      src={awanImage}
      alt="Awan"
      className="absolute animate-move -top-1 left-0 z-0 w-1/2"
    />
  );
}