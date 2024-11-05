/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const BrandForm = () => {
  return (
    <div className='flex justify-center sm:justify-end pt-20 pb-20 sm:pt-0 sm:pb-0'>
      <div className='brand-container'>
        <div className="brand-item brand-item-peugeot">
          <img src="images/brands/peugeot.png" alt="" />
        </div>

        <div className="brand-item">
          <img src="images/brands/citroen.png" alt="" />
        </div>

        <div className="brand-item brand-item-fiat">
          <img src="images/brands/fiat.png" alt="" />
        </div>

        <div className="brand-item">
          <img src="images/brands/ds.png" alt="" />
        </div>
      </div>
    </div>
  )
}
