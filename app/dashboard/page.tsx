import FloatingMenu from "../containers/floating-menu";
import InfoContainer from "../containers/info-container";
// import Chat from "../containers/chat";
import { getDocuments } from "../utils/queries/documents";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { getUserById } from "../utils/queries/user";
import moment from "moment";
import { mockMedicalDocument } from "@/demo_data/mock-medical-document";
import Chat from "../containers/chat";

export default async function Home() {
  const { userId } = auth();
  const data = auth();

  const user = (userId ? await getUserById(userId) : undefined) as
    | User
    | undefined;
  // console.log("user", user);

  if (!user?.id) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        not logged in
      </div>
    );
  }
  const documents = await getDocuments(user?.id);
  if (!documents) {
    return (
      <div className="w-screen h-fit flex justify-center items-start py-20 px-20">
        <InfoContainer transformedDocuments={[]} />
        <FloatingMenu />
        <Chat />
      </div>
    );
  }

  const docs = documents
    ?.flatMap((document: any) => {
      const events = JSON.parse(document?.summary)?.events || [
        {
          disease: "Unknown",
          chronic: false,
          medication: [],
          body_part: [],
          date_time: "January 1, 2024",
        },
      ];
      if (!events) {
        return;
      }

      return events.map((event: any) => ({
        ...event,
        date_time: new Date(document.date),
      }));
    })
    .filter((event) => event !== undefined);

  const transformDocuments = (events: any[]) => {
    return {
      category: "Medical document", // Always set to "Medical document"
      events: events.map((event) => ({
        disease: event.disease,
        chronic: event.chronic,
        medication: event.medication,
        body_part: event.body_part,
        date_time: moment(event.date_time).format("DD MMM YYYY"),
      })),
    };
  };

  const transformedDocuments = transformDocuments(docs);

  const finalDocuments = {
    category: "Medical documents",
    events: transformedDocuments.events.length
      ? [...transformedDocuments.events].concat(mockMedicalDocument.events)
      : mockMedicalDocument.events,
  };

  return (
    <div className="w-screen h-fit flex justify-center items-start py-20 px-20">
      <InfoContainer transformedDocuments={finalDocuments} />
      <FloatingMenu />
      <Chat />
    </div>
  );
}
