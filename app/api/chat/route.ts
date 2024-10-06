import { mistral } from "@ai-sdk/mistral";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: mistral("mistral-small-latest"),
    maxTokens: 10,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
