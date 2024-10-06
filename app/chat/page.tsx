"use client";
import React, { useState } from "react";
import { Button } from "../components/ui/button";

const Page = () => {
  const [data, setData] = useState<any>(null);
  const handleSubmit = async () => {
    const response = await fetch("/api/py/mistral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "hi there",
      }),
    });
    const data = await response.json();
    console.log("🟣 - ", data);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-50">
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Page;
