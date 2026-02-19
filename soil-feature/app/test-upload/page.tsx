"use client"

import { useState } from "react"

export default function Page() {
  const [result, setResult] = useState<any>(null)

  async function handleFile(e: any) {
    const file = e.target.files[0]

    const form = new FormData()
    form.append("file", file)

    const res = await fetch("/api/soil/upload", {
      method: "POST",
      body: form
    })

    const data = await res.json()
    setResult(data)
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Soil PDF Test</h2>

      <input type="file" accept=".pdf" onChange={handleFile} />

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
