import { EditionCard } from '@/components/edition-card'
import React from 'react'

function CardEdtionPage() {
  return (
    <div className='max-h-[720px] overflow-auto p-2 remove-scrollbar'>
        <EditionCard />
    </div>
  )
}

export default CardEdtionPage