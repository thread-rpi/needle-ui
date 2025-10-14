import { useState } from 'react'
import './index.css'
import { useGetHealth } from './api/queries'


function Root() {

  // Health endpoint destructuring
  const { isSuccess, data, isError, error, isLoading }= useGetHealth();

  return (
    <div className = "p-4">
      This is the root | server is {isSuccess && data.data || isLoading && 'loading...' || isError && 'unhealthy: ' + error.error}
    </div>
  )
}

export default Root;
