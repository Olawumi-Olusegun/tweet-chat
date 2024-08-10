import React from 'react'

const LoadingSpinnerSmall = (className = "") => {
  return (
    <>
    <span className={`loading loading-spinner loading-xs ${className}`}></span>
    </>
  )
}

export default LoadingSpinnerSmall