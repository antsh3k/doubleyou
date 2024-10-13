"use client";
import React, { useState } from "react";
import Timeline from "../timeline";
import { MedicalTimeline } from "@/app/components/visual-timeline";

const exampleParams = {
  left_hand: { selected: false },
};

export default function InfoContainer({
  transformedDocuments,
}: {
  transformedDocuments: any;
}) {
  const [params, setParams] = useState<any>(exampleParams);

  const sortedData = transformedDocuments
    ? transformedDocuments.events.sort((a, b) => {
        return (
          new Date(b.date_time).getTime() - new Date(a.date_time).getTime()
        );
      })
    : [];
  return (
    <div className="flex w-full items-start justify-between relative">
      <div className="flex flex-col gap-2 w-[200px] absolute bottom-20 left-10">
        <div className="flex justify-start items-center gap-2 border p-2 rounded-md">
          <div className="w-5 h-5 bg-red-500 hover:bg-red-400 rounded-md" />
          <p>Urgent</p>
        </div>
        <div className="flex justify-start items-center gap-2 border p-2 rounded-md">
          <div className="w-5 h-5 bg-blue-500 hover:bg-blue-400 rounded-md" />
          <p>Acute</p>
        </div>
      </div>
      <MedicalTimeline
        skeletonParts={params}
        setSkeletonParts={setParams}
        transformedDocuments={transformedDocuments}
      />
      <Timeline data={sortedData} params={params} setParams={setParams} />
    </div>
  );
}
