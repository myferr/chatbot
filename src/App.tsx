"use client";

if (localStorage.length === 0) {
  window.location.href = "/";
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GeminiService } from "intelligent";

async function generateResponse() {
  const gemini = new GeminiService(localStorage.getItem("APIKEY")!);
  const response = await gemini.response(
    // @ts-expect-error
    document.getElementById("userinput")!.value
  );
  return response;
}

type Message = {
  id: number;
  role: "user" | "bot";
  content: any;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot typing
    setIsTyping(true);
    const botResponse = await generateResponse(); // Await the response
    setTimeout(() => {
      // Add bot response
      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: botResponse, // Use the awaited response
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000); // Simulate 1 second delay
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Intelligent-powered Chatbot</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-4 ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="text-left">
              <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                <img
                  src="https://cdn.discordapp.com/emojis/393848431413559296.gif"
                  alt=""
                />
              </span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
              id="userinput"
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
