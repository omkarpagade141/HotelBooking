import React from 'react'

function ViewCustomerProfile({ customerData }) {
  return (
    <div>
      <h1>{customerData ? customerData.fullName : <></>}</h1>
    </div>
  )
}

export default ViewCustomerProfile
