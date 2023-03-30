import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
const URL = "http://localhost:3000/api/ballots";

type Item = {
  title: string;
  photoUrL: string;
  id: string;
};

type Category = {
  id: string;
  items: Item[];
  title: string;
};

type Data = {
  items: Category[];
};

export default function Home() {
  const [ballot, setBallot] = useState<Data>();
  const [selectBallot, setSelectBallot] = useState<Record<string, Item>>()
  const [toggleButton, setToggleButton] = useState<boolean>(false)
  useEffect(() => {
    async function getBallotData() {
      try {
        const ballot = await fetch(URL);
        if (!ballot.ok) throw new Error("Error get ballot data");
        const response: Data = await ballot.json();
        setBallot(response);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    getBallotData();
  }, []);

  useMemo(() => {
    if(selectBallot) {
      const toggleButton = Object.keys(selectBallot).length === ballot?.items.length
      setToggleButton(toggleButton)
    }
  }, [selectBallot])

  const handleSelect = (itemId: Item['id'], ballot: Category) => {
    const getSelectedItem = ballot.items.find((nominee) => nominee.id === itemId)

    if(getSelectedItem) {
      setSelectBallot((prev) => {
        return {...prev, [ballot.title]: getSelectedItem }
      })
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold uppercase text-center mt-4">
        Awards 2021
      </h1>
      <main className="flex items-center flex-col p-4 relative">
        {ballot &&
          ballot.items.map((ballot: Category) => (
            <div key={ballot.id} className="w-3/5">
              <h4 className="text-left text-2xl my-4 w-full bg-slate-800 rounded-md p-2">
                {ballot.title}
              </h4>

              <section className="grid grid-cols-3 gap-4">
                {ballot.items.map((item: Item) => (
                  <div className="flex flex-col gap-4 w-full" key={item.id}>
                    <div className={`min-h-[35rem] max-w-[30rem] bg-nominee-color hover:bg-nominee-hover transition flex items-center flex-col justify-between rounded-md 
                    ${selectBallot && selectBallot[ballot.title]?.id === item.id ? 'border-4 border-nominee-color border-separate bg-nominee-hover' : ''}`}>
                      <span className="flex justify-center items-center flex-col">
                        <p className="text-lg font-medium p-2 text-center truncate w-9/12">{item?.title}</p>
                        <Image
                          src={item.photoUrL}
                          alt={item.title}
                          width={300}
                          height={400}
                          placeholder="blur"
                          blurDataURL={item.photoUrL}
                          className="rounded-full w-4/5 h-auto"
                        />
                      </span>
                      <button className="bg-yellow-500 py-2 px-4 rounded-sm w-full" onClick={() => handleSelect(item.id, ballot)}>
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          ))}
        {ballot && (
          <button className="bg-nominee-color hover:bg-nominee-hover transition py-2 px-4 rounded-sm bottom-4 sticky ml-auto text-lg disabled:bg-slate-400 disabled:cursor-not-allowed" 
          disabled={!toggleButton}>
            Submit Ballot
          </button>
        )}
      </main>
    </>
  );
}
