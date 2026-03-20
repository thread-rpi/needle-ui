const UnfinishedPage = () => {
  return (
    <div className={`relative w-full h-full flex items-center justify-start py-16 px-10 md:py-18 md:px-18`}>
      <div className='z-10 h-max w-max'>
        <div className={`text-[32px] md:text-[64px] text-black font-bold text-wrap`}>Coming <a className='text-thread-red'>soon</a>...</div>
        <div className='text-[16px] md:text-[24px] text-gray-400'>Please check back later.</div>
      </div>
    </div>
  )
}
export default UnfinishedPage;
