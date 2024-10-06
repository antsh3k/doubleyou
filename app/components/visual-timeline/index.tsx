"use client";
import React, { useState, useEffect } from "react";
import { Skeleton, BodyComponentProps } from "../skeleton";
import { Slider } from "../ui/slider";
import { mockMedicalDocument } from "@/demo_data/mock-medical-document";
import moment from "moment";

export const MedicalTimeline: React.FC<{
  skeletonParts: BodyComponentProps["parts"];
  setSkeletonParts: React.Dispatch<
    React.SetStateAction<BodyComponentProps["parts"]>
  >;
}> = ({ skeletonParts, setSkeletonParts }) => {
  const [sliderValue, setSliderValue] = useState([0]);

  useEffect(() => {
    updateSkeletonParts(sliderValue[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue]);

  const updateSkeletonParts = (value: number) => {
    const newParts: BodyComponentProps["parts"] = {};
    const events = mockMedicalDocument.events.slice(0, value + 1);

    events.forEach((event) => {
      event.body_part.forEach((part) => {
        newParts[part] = {
          selected: true,
          condition: event.chronic ? "chronic" : "",
        };
      });
    });

    setSkeletonParts(newParts);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Skeleton parts={skeletonParts} setParts={setSkeletonParts} />
      <div className="w-full max-w-md py-2">
        <Slider
          defaultValue={[0]}
          max={mockMedicalDocument.events.length - 1}
          step={1}
          onValueChange={setSliderValue}
        />
      </div>
      <div className="text-medium">
        {moment(mockMedicalDocument.events[sliderValue[0]].date_time).format(
          "DD MMM YYYY"
        )}
      </div>
    </div>
  );
};
