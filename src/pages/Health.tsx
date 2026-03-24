import { useGetHealth } from '../api/queries'

const Health = () => {
  // Health endpoint destructuring
  const { isSuccess, data, isError, error, isLoading }= useGetHealth();
  console.log(error);
  return (
    <div className={`relative w-full h-full min-h-[60dvh] flex items-center justify-center`}>
      <div className='z-10 h-max w-max'>
        <div className={`text-[32px] md:text-[64px] text-black font-bold text-wrap`}>
          {
          (isLoading && <>API is <a className='text-yellow-500'>loading...</a></>) || 
          (isSuccess && <>API is <a className='text-green-500'>{data?.state}!</a> :D</>) ||
          (isError && <>API is <a className='text-red-500'>unhealthy!</a> :C</>)
          }
        </div>
        <div className='text-[16px] md:text-[24px] text-gray-400'>
          {isSuccess && ('No issues to report.') || isError && ('Error: ' + (error?.error || 'Unknown error occurred'))}
        </div>
      </div>
    </div>
  )
}
export default Health;
