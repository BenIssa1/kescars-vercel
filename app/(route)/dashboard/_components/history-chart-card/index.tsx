'use client'

import React from 'react'
import { CardWrapper } from './card-wrapper'
import { Chart } from './chart'

function HistoryChartCard() {

  return (
    <CardWrapper 
        title='Historique de donnees'
        situation={false}
        difference='25%'
        data={500}
    >
        <Chart />
    </CardWrapper>
  )
}

export default HistoryChartCard