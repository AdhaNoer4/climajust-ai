export default function RiskBadge({ level }) {

  const colors = {
    rendah: "bg-green-100 text-green-700",
    sedang: "bg-orange-100 text-orange-700",
    tinggi: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[level]}`}
    >
      {level}
    </span>
  );
}