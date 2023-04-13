










import { Knob } from 'primereact/knob';

export function DisplayKnbos({ users }) {

  const NotActiveUsers = users.filter((u) => u.status === 'NotActive')
  const ActiveUsers = users.filter((u) => u.status === 'Active')
  const InProgressUsers = users.filter((u) => u.status === 'InProgress')

  return <>
    <div className=' flex flex-column align-items-center  justify-content-center gap-3 p-1 '>
      <div>
        <div className=' flex flex-column align-items-center  justify-content-center '>
          <Knob max={users.length} value={users?.length} readOnly />
          <span className='font-bold mr-3 '>Total users</span>
        </div>
      </div>
      <div className=' flex flex-row align-items-center  justify-content-center gap-3 p-1 ' >
        <div className=' flex flex-column align-items-center  justify-content-center '>
          <Knob max={users.length} value={NotActiveUsers?.length} readOnly />
          <span className='font-bold mr-3 '>Not Active</span>
        </div>
        <div className=' flex flex-column align-items-center  justify-content-center '>
          <Knob max={users.length} value={InProgressUsers?.length} readOnly />
          <span className='font-bold mr-3 '>In Progress</span>
        </div>
        <div className=' flex flex-column align-items-center  justify-content-center '>
          <Knob max={users.length} value={ActiveUsers?.length} readOnly />
          <span className='font-bold mr-3 '>Active</span>
        </div>
      </div>
    </div>

  </>
}