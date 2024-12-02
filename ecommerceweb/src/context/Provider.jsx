import React from 'react'
import StoreContext from './storeContext'

function Provider({children}) {
    const store = {}
  return (
    <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
  )
}

export default Provider