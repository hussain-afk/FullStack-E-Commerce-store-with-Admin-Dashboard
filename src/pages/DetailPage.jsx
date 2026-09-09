import React from 'react'
import ProdDetail from '../components/ProdDetail'
import AllReviews from '../components/reviews'
import SimilarProducts from '../components/SimilarProducts'

function DetailPage() {
  return (
    <div>
      <ProdDetail />
      <AllReviews />
      <SimilarProducts />
    </div>
  )
}

export default DetailPage
