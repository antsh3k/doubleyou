"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
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

export default function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
  });
  const chatRef = useRef<HTMLDivElement>(null);

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
