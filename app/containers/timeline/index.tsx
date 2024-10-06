import React from "react";

import {
  Timeline as TimelineComponent,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "../../components/ui/timeline";
import { Asterisk, FilePlus2 } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import Upload from "../upload";
import { Button } from "@/app/components/ui/button";

export default function Timeline() {
  return (
    <div className="flex justify-center flex-col items-start max-w-lg mx-auto p-4 bg-white/15 backdrop-blur-[11px] rounded-[10px] overflow-y-scroll">
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
              25 Jan 2023
            </time>
          </div>
        </div>
      </div>
      <TimelineComponent className="max-h-[50vh] overflow-y-scroll">
        <TimelineItem status="done">
          <TimelineHeading>Plan!</TimelineHeading>
          <TimelineDot status="done" />
          <TimelineLine done />
          <TimelineContent>
            Before diving into coding, it is crucial to plan your software
            project thoroughly. This involves defining the project scope,
            setting clear objectives, and identifying the target audience.
            Additionally, creating a timeline and allocating resources
            appropriately will contribute to a successful development process.
          </TimelineContent>
        </TimelineItem>
        <TimelineItem status="done">
          <TimelineHeading side="right" className="text-destructive">
            Design
          </TimelineHeading>
          <TimelineDot status="error" />
          <TimelineLine done />
          <TimelineContent>
            Designing your software involves creating a blueprint that outlines
            the structure, user interface, and functionality of your
            application. Consider user experience (UX) principles, wireframing,
            and prototyping to ensure an intuitive and visually appealing
            design.
          </TimelineContent>
        </TimelineItem>
        <TimelineItem status="done">
          <TimelineHeading>Code</TimelineHeading>
          <TimelineDot status="current" />
          <TimelineLine />
          <TimelineContent>
            The coding phase involves translating your design into actual code.
            Choose a programming language and framework that aligns with your
            project requirements. Follow best practices, such as modular and
            reusable code, to enhance maintainability and scalability. Regularly
            test your code to identify and fix any bugs or errors.
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeading>Test</TimelineHeading>
          <TimelineDot />
          <TimelineLine />
          <TimelineContent>
            Thorough testing is essential to ensure the quality and reliability
            of your software. Implement different testing methodologies,
            including unit testing, integration testing, and user acceptance
            testing. This helps identify and rectify any issues before deploying
            the software.
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeading>Deploy</TimelineHeading>
          <TimelineDot />
          <TimelineLine />
          <TimelineContent>
            Once your software has passed rigorous testing, it&apos;s time to
            deploy it. Consider the deployment environment, whether it&apos;s
            on-premises or in the cloud. Ensure proper documentation and provide
            clear instructions for installation and configuration.
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeading>Done!</TimelineHeading>
          <TimelineDot />
        </TimelineItem>
      </TimelineComponent>
    </div>
  );
}
