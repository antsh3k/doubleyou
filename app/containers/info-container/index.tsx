"use client";
import React, { useState } from "react";
import Timeline from "../timeline";
import { mockMedicalDocument } from "@/demo_data/mock-medical-document";
import { MedicalTimeline } from "@/app/components/visual-timeline";

const exampleParams = {
  left_hand: { selected: false },
};

export default function InfoContainer() {
  const [params, setParams] = useState<any>(exampleParams);
  const sortedData = mockMedicalDocument.events.sort((a, b) => {
    return new Date(b.date_time).getTime() - new Date(a.date_time).getTime();
  });
  return (
    <div className="flex w-full items-start justify-between ">
      <MedicalTimeline skeletonParts={params} setSkeletonParts={setParams} />
      <Timeline data={sortedData} params={params} setParams={setParams} />;
    </div>
  );
}
