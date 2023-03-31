import { Data } from "@/models/models"
const URL = process.env.NEXT_PUBLIC_API_URL

export async function getBallotData(): Promise<Data> {
  const ballot = await fetch(`${URL}/ballots`)

  if (!ballot.ok) throw new Error("Error get ballot data")
  const response: Data = await ballot.json()
  return response
}
