"use client";

import { Card } from "./_components/cards/card";
import HistoryChartCard from "./_components/history-chart-card";
import { InteractionFlow } from "./_components/interaction-flow";

const DashboardPage = () => {
  /* const user = useCurrentUser();
 
  console.log(user)

 */
  return (
    <div className="flex flex-col gap-y-8 h-[720px] overflow-auto p-2 remove-scrollbar">
      <Card />
      <InteractionFlow />
      <div className="grid grid-cols-5 gap-x-4 mt-5">
        <div className="col-span-3">
          <HistoryChartCard />
        </div>
        <div className="col-span-2 bg-red-500 w-full h-64"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
