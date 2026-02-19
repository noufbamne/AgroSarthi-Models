export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
const pdf = require("pdf-parse/lib/pdf-parse.js")

import { extractSoilData } from "@/lib/soilExtractor"
import { classifySoil } from "@/lib/soilRules"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const parsed = await pdf(buffer)

    const soil = extractSoilData(parsed.text)
    const analysis = classifySoil(soil)

    return NextResponse.json({
      extracted: soil,
      analysis
    })

  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error"

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
