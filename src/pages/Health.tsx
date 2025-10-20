import { useGetHealth } from '../api/queries'

const Health = () => {
  // Health endpoint destructuring
  const { isSuccess, data, isError, error, isLoading }= useGetHealth();

  return (
    <div className={`h-full w-full flex items-center justify-center bg-black ${
          isSuccess ? 'bg-green-500'
          : isLoading ? 'bg-yellow-500'
          : 'bg-red-500'
        }`}>
      <div className='h-max w-max'>
        <div className={`text-[64px] text-white font-bold`}>
          {(isLoading && 'loading...') || 
          ('API is ' + ((isSuccess && data.data + '! :D') || isError && 'unhealthy! :C'))
          }
        </div>
        <div className='text-[24px] text-gray-300'>
          {isSuccess && 'No issues to report.' || isError && error.error}
        </div>
      </div>
    </div>
  )
}
export default Health;
