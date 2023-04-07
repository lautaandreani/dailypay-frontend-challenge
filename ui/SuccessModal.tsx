import { SetStateAction } from 'react'

import { SelectBallot } from '@/models/models'

type Props = {
  selection: SelectBallot
  setToggleModal: React.Dispatch<SetStateAction<boolean>>
}

function SuccessModal({ selection, setToggleModal }: Props) {
  return (
    <div
      role='dialog'
      className='fixed bg-slate-800 bg-opacity-50 backdrop-blur-sm min-h-screen min-w-full top-0 transition flex justify-center items-center'
    >
      <div className='w-[70%] max-w-[50rem] min-h-[32rem] max-h-[30rem] p-4 bg-slate-800 rounded-md text-center overflow-y-auto'>
      <button className='w-full text-right text-lg' aria-label='cerrar modal' onClick={(() => setToggleModal(false))}>×</button>
        <h5 className='text-3xl font-bold'>Success</h5>
        <p>Your nomimees</p>
        <span>
          {selection?.map((nominee) => (
            <ul key={nominee.nominee.id} className='text-left'>
              <li>
                <strong className='text-lg'>{nominee.category}</strong>
                <p>{nominee.nominee.title}</p>
              </li>
            </ul>
          ))}
        </span>
      </div>
    </div>
  )
}

export default SuccessModal
