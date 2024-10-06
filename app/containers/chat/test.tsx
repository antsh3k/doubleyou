"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button, buttonVariants } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk, Forward, MessagesSquare, User, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const formSchema = z.object({
    message: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/py/mistral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      //   console.log("🟣 - ", data);
      const aiMessage = { role: "assistant", content: data.response };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error calling Mistral API:", error);
      // Optionally add an error message to the chat
    } finally {
      setIsLoading(false);
    }
  };

  const chatRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={chatRef}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 flex items-center justify-center bg-orange-600 hover:bg-orange-500"
        >
          <span className="sr-only">Open chat</span>
          <MessagesSquare color="black" />
        </Button>
      )}
      {isOpen && (
        <Card className="w-96 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-black-full">
              Support Chat
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close chat</span>
              <X size={20} className="text-black" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {messages.map((message) => (
                <div key={message.id} className="grid grid-cols-12 relative">
                  <span
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      `w-5 h-5 p-0 mr-2 col-span-1 hover:bg-background ${
                        message.role !== "user" && "bg-orange-600"
                      }`
                    )}
                  >
                    {message.role === "user" ? (
                      <User size={12} />
                    ) : (
                      <Asterisk size={12} />
                    )}
                  </span>
                  <div
                    className="col-span-11 inline-block text-wrap"
                    key={message.id}
                  >
                    <p className="">{message.content}</p>
                    <hr className="border-stone-200 my-2" />
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={handleSubmit}
              className="border order border-stone-400 flex w-full space-x-2 p-2 rounded-md"
            >
              <Input
                className="border-none shadow-none pl-1"
                placeholder="Type your message here..."
                value={input}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="outline" disabled={isLoading}>
                <Forward />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
