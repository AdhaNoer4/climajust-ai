export function determineRisk(description = "") {
  const desc = description.toLowerCase();

  if (desc.includes("lebat") || desc.includes("kencang")) {
    return "tinggi";
  }
  if (desc.includes("hujan") || desc.includes("angin")) {
    return "sedang";
  }
  return "rendah";
}

export function getRiskStyle(risk) {
  const styles = {
    tinggi: "from-red-500 to-orange-500",
    sedang: "from-yellow-500 to-amber-400",
    rendah: "from-green-500 to-emerald-400",
  };

  return styles[risk] || styles.sedang;
}