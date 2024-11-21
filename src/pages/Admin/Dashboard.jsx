import React, { useState } from 'react'
import CardComponent from '../../components/_common/CardComponent'
import { FaDollarSign, FaMessage, FaUser } from 'react-icons/fa6'

import GraphComponent from '../../components/_common/GraphComponent';


const Dashboard = () => {
    
    const data = [
        { month: "Jan", value: 1000 },
        { month: "Jan", value: 1300 },
        { month: "Jan", value: 1400 },
        { month: "Jan", value: 2000 },
        { month: "Feb", value: 1800 },
        { month: "Feb", value: 2000 },
        { month: "Feb", value: 2300 },
        { month: "Feb", value: 2500 },
      ];
  return (
    <>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    <CardComponent
      icon={<FaDollarSign />}
      name="Total Earning"
      value="242.65K"
      description="From the running month"
      bgColor="bg-purple-200"
    />
    <CardComponent
      icon={<FaDollarSign />}
      name="Annual Earning"
      value="242.65K"
      description="From the running month"
      bgColor="bg-purple-200"
    />
    <CardComponent
      icon={<FaDollarSign />}
      name="Monthly Earning"
      value="242.65K"
      description="From the running month"
      bgColor="bg-purple-200"
    />
    <CardComponent
      icon={<FaDollarSign />}
      name="Today Earning"
      value="0"
      description="From the running month"
      bgColor="bg-purple-200"
    />
    {/* Add more cards as needed */}
  </div>
 
  <GraphComponent data={data} />
    </>
  )
}

export default Dashboard