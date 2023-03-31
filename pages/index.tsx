import { useEffect, useMemo, useState } from "react"

import { Category, Data, Item, SelectBallot } from "@/models/models"
import { getBallotData } from "@/api/api"
import Card from "@/components/Card"

export default function Home() {
  const [ballot, setBallot] = useState<Data>()
  const [selectBallot, setSelectBallot] = useState<SelectBallot>()
  const [toggleButton, setToggleButton] = useState<boolean>(false)
  const [loading, setLoading] = useState<null | boolean>(null)

  useEffect(() => {
    async function fetchBallotData() {
      try {
        setLoading(true)
        const response = await getBallotData()
        setLoading(false)
        setBallot(response)
      } catch (error) {
        if (error instanceof Error) console.error(error.message)
      }
    }

    fetchBallotData()
  }, [])

  useMemo(() => {
    if (selectBallot) {
      const toggleButton = Object.keys(selectBallot).length === ballot?.items.length
      setToggleButton(toggleButton)
    }
  }, [selectBallot])

  const handleSelect = (itemId: Item["id"], ballot: Category) => {
    const getSelectedItem = ballot.items.find((nominee) => nominee.id === itemId)

    if (getSelectedItem) {
      setSelectBallot((prev) => {
        return { ...prev, [ballot.title]: getSelectedItem }
      })
    }
  }

  return (
    <>
      <h1 className='text-3xl font-bold uppercase text-center mt-4'>Awards 2021</h1>
      <main className='flex items-center flex-col p-4 relative'>
        {ballot &&
          ballot.items.map((ballot: Category) => (
            <div key={ballot.id} className='w-3/5'>
              <h4 className='text-left text-2xl my-4 w-full bg-slate-800 rounded-md p-2'>{ballot.title}</h4>

              <section className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4'>
                {ballot.items.map((item: Item) => (
                  <Card ballot={ballot} item={item} handleSelect={handleSelect} selectBallot={selectBallot} key={item.id} />
                ))}
              </section>
            </div>
          ))}
        {ballot && (
          <button
            className='bg-nominee-color hover:bg-nominee-hover transition py-2 px-4 rounded-sm bottom-4 sticky ml-auto text-lg disabled:bg-slate-400 disabled:cursor-not-allowed'
            disabled={!toggleButton}
          >
            Submit Ballot
          </button>
        )}
      </main>
    </>
  )
}
