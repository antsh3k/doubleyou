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
  console.log("transformedDocuments", transformedDocuments);
  const sortedData = transformedDocuments
    ? transformedDocuments.events.sort((a, b) => {
        return (
          new Date(b.date_time).getTime() - new Date(a.date_time).getTime()
        );
      })
    : [];
  return (
    <div className="flex w-full items-start justify-between ">
      <MedicalTimeline
        skeletonParts={params}
        setSkeletonParts={setParams}
        transformedDocuments={transformedDocuments}
      />
      <Timeline data={sortedData} params={params} setParams={setParams} />
    </div>
  );
}
