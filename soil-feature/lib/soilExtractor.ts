type SoilData = {
  ph: string | null
  nitrogen: string | null
  phosphorus: string | null
  potassium: string | null
  organicCarbon: string | null
}

// -------- CORE LINE PARSER --------

function getLastNumberFromLine(text: string, keywords: string[], min: number, max: number) {
  const lines = text.split(/\n|  {2,}/) // split by newline or table spacing

  for (const line of lines) {
    const lower = line.toLowerCase()

    if (keywords.some(k => lower.includes(k))) {

      const nums = line.match(/[0-9]+\.?[0-9]*/g)

      if (!nums || nums.length === 0) continue

      const candidate = nums[nums.length - 1] // ✅ TAKE LAST NUMBER
      const val = parseFloat(candidate)

      if (!isNaN(val) && val >= min && val <= max) {
        return candidate
      }
    }
  }

  return null
}

// -------- MAIN EXTRACTOR --------

export function extractSoilData(text: string): SoilData {

  const clean = text
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/ +/g, " ")

  return {

    ph: getLastNumberFromLine(
      clean,
      ["ph", "soil ph"],
      3, 10
    ),

    nitrogen: getLastNumberFromLine(
      clean,
      ["nitrogen", "available nitrogen"],
      0, 2000
    ),

    phosphorus: getLastNumberFromLine(
      clean,
      ["phosphorus", "available phosphorus"],
      0, 500
    ),

    potassium: getLastNumberFromLine(
      clean,
      ["potassium", "available potassium"],
      0, 1000
    ),

    organicCarbon: getLastNumberFromLine(
      clean,
      ["organic carbon", "oc"],
      0, 5
    ),
  }
}
