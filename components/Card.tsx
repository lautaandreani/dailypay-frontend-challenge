import { Category, Item, SelectBallot } from "@/models/models"
import Image from "next/image"

type Props = {
  item: Item
  selectBallot?: SelectBallot
  ballot: Category
  handleSelect: (itemId: string, ballot: Category) => void
}

function Card({ item, selectBallot, ballot, handleSelect, ...props }: Props) {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div
        className={`min-h-[35rem] max-w-[30rem] bg-nominee-color hover:bg-nominee-hover transition flex items-center flex-col justify-between rounded-md overflow-hidden 
            ${
              selectBallot && selectBallot[ballot.title]?.id === item.id
                ? "border-4 border-nominee-color border-separate bg-nominee-hover"
                : ""
            }`}
      >
        <span className='flex justify-center items-center flex-col'>
          <p className='text-lg font-medium p-2 text-center truncate w-8/12'>{item?.title}</p>
          <Image
            src={item.photoUrL}
            alt={item.title}
            width={300}
            height={400}
            placeholder='blur'
            blurDataURL={item.photoUrL}
            className='h-auto'
          />
        </span>
        <button className='bg-yellow-500 py-2 px-4 rounded-sm w-full' onClick={() => handleSelect(item.id, ballot)}>
          Select
        </button>
      </div>
    </div>
  )
}

export default Card
