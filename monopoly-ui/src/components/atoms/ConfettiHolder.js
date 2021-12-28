import React from 'react'

import Confetti from 'react-confetti'

export const ConfettiHolder =  () => {
  

  
  return (
    <Confetti
      width={document.body.scrollWidth}
      height={document.body.scrollHeight}
    />
  )
}