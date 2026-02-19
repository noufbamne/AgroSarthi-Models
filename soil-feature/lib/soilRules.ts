export function classifySoil(data: any) {

  const good: string[] = []
  const improve: string[] = []
  const advice: string[] = []

  const ph = Number(data.ph)
  const oc = Number(data.organicCarbon)
  const n = Number(data.nitrogen)
  const p = Number(data.phosphorus)
  const k = Number(data.potassium)

  // ---------- pH ----------
  if (!isNaN(ph)) {
    if (ph >= 6.0 && ph <= 7.5) {
      good.push("Soil pH is optimal for most crops")
    } else if (ph < 6.0) {
      improve.push("Soil is acidic")
      advice.push("Apply agricultural lime based on soil test dose")
    } else {
      improve.push("Soil is alkaline")
      advice.push("Apply gypsum and increase organic matter")
    }
  }

  // ---------- Organic Carbon (%) ----------
  if (!isNaN(oc)) {
    if (oc > 0.75) {
      good.push("Organic carbon is high")
    } else if (oc >= 0.5) {
      improve.push("Organic carbon is medium")
      advice.push("Add compost or crop residue incorporation")
    } else {
      improve.push("Organic carbon is low")
      advice.push("Apply FYM or vermicompost heavily")
    }
  }

  // ---------- Nitrogen (kg/ha) ----------
  if (!isNaN(n)) {
    if (n > 560) {
      good.push("Nitrogen level is high")
    } else if (n >= 280) {
      improve.push("Nitrogen level is medium")
      advice.push("Use split nitrogen application")
    } else {
      improve.push("Nitrogen level is low")
      advice.push("Apply urea or NPK fertilizer")
    }
  }

  // ---------- Phosphorus (kg/ha) ----------
  if (!isNaN(p)) {
    if (p > 25) {
      good.push("Phosphorus level is high")
    } else if (p >= 10) {
      improve.push("Phosphorus level is medium")
      advice.push("Apply SSP in basal application")
    } else {
      improve.push("Phosphorus level is low")
      advice.push("Apply SSP or rock phosphate")
    }
  }

  // ---------- Potassium (kg/ha) ----------
  if (!isNaN(k)) {
    if (k > 280) {
      good.push("Potassium level is high")
    } else if (k >= 120) {
      improve.push("Potassium level is medium")
      advice.push("Apply MOP in split doses")
    } else {
      improve.push("Potassium level is low")
      advice.push("Apply muriate of potash")
    }
  }

  return { good, improve, advice }
}
