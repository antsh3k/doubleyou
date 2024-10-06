import React from "react";

import {
  Timeline as TimelineComponent,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "../../components/ui/timeline";
import { Asterisk, Eye, FilePlus2 } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import Upload from "../upload";
import { Button } from "@/app/components/ui/button";
import moment from "moment";

export default function Timeline({
  data,
  params,
  setParams,
}: {
  data: any;
  params: any;
  setParams: any;
}) {
  console.log("data", data);
  return (
    <div className="flex justify-center flex-col items-start w-full max-w-lg mx-auto p-4 bg-white/15 backdrop-blur-[11px] rounded-[10px] overflow-y-scroll">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <span className="h-fit py-2 px-2 flex justify-center items-center rounded-md bg-orange-600">
              <Asterisk color="black" size={24} />
            </span>
            <div className="">
              <small className="text-sm text-gray-500">Events</small>
              <p className="font-medium text-xl">Care Timeline</p>
            </div>
          </div>
          <Upload>
            <Button>
              <FilePlus2 size={16} className="mr-2" />
              Upload
            </Button>
          </Upload>
        </div>
        <div className="flex justify-between items-center w-full py-10">
          <div className="flex flex-col gap-1">
            <small className="text-gray-500">Status</small>
            <Badge
              variant="secondary"
              className="py-1 rounded-lg text-sm font-normal"
            >
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Historical Data
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <small className="text-gray-500">Start Date</small>
            <time dateTime="2023-01-25" className="text-sm">
              {moment(data[0].date_time).format("DD MMM YYYY")}
            </time>
          </div>
        </div>
      </div>
      <TimelineComponent className="max-h-[50vh] w-full overflow-y-scroll">
        {data &&
          data.map((item: any, i: number) => (
            <TimelineItem key={i} status="done" className={`cursor-pointer`}>
              <TimelineDot
                status="current"
                className={item.chronic ? "text-red-500" : "text-amber-600"}
              />
              <TimelineHeading>{item.disease}</TimelineHeading>
              <TimelineLine done={true} />
              <TimelineContent className="flex justify-between items-start w-full">
                <div>
                  <time className="block" dateTime="2023-01-25">
                    {item.date_time}
                  </time>
                  <p>
                    Treatment: {item.medication.join(", ") || "No treatment"}
                  </p>
                </div>
                {item.body_part.length ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const updatedParams = { ...params };
                      const bodyParts =
                        item.body_part.length > 1
                          ? item.body_part
                              .split(",")
                              .map((part: string) => part.trim())
                          : [item.body_part];
                      bodyParts.forEach((bodyPart: any) => {
                        updatedParams[bodyPart] = {
                          selected: !params[bodyPart]?.selected,
                          condition: item.chronic ? "chronic" : "",
                        };
                      });
                      setParams(updatedParams);
                    }}
                  >
                    <Eye />
                  </Button>
                ) : null}
              </TimelineContent>
            </TimelineItem>
          ))}
      </TimelineComponent>
    </div>
  );
}
