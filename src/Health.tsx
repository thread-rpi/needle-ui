import './index.css'
import { useGetHealth } from './api/queries'


function Health() {

  // Health endpoint destructuring
  const { isSuccess, data, isError, error, isLoading }= useGetHealth();

  return (
    <div className='absolute z-100 h-full w-full overflow-hidden mt-[-56px]'> 
    <div className="h-full w-full flex items-center justify-center bg-black ">
      <div className='h-max w-max'>
        <div className={`text-[64px] font-bold ${
          isSuccess ? 'text-green-500'
          : isLoading ? 'text-yellow-500'
          : 'text-red-500'
        }`}>
          {(isLoading && 'loading...') || 
          ('API is ' + ((isSuccess && data.data + '! :D') || isError && 'unhealthy! :C'))
          }
        </div>
        <div className='text-[22px] text-gray-400'>
          {isSuccess && 'No issues to report.' || isError && error.error}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Health;
