"use client"

import { useState, useTransition, useOptimistic } from "react"
import { BrainCircuit, Send } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function AIAssistant() {
  const [input, setInput] = useState("")
  const [isPending, startTransition] = useTransition()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI learning assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])

  // Use optimistic updates for better UX
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state, newMessage: Message) => [
    ...state,
    newMessage,
  ])

  const handleSend = () => {
    if (!input.trim()) return

    // Create user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    // Add optimistic update
    addOptimisticMessage(userMessage)

    // Clear input immediately for better UX
    setInput("")

    // Use transition for non-urgent updates
    startTransition(() => {
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 2,
          content: "I'm analyzing your question. Here's what I found based on your learning materials...",
          sender: "ai",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage, aiMessage])
      }, 1000)
    })
  }

  // Use the optimistic messages for rendering
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>
          AI Learning Assistant {isPending && <span className="text-xs text-muted-foreground">(thinking...)</span>}
        </CardTitle>
        <CardDescription>Ask questions about your courses or get help with your studies</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {optimisticMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    {message.sender === "ai" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>
                          <BrainCircuit className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>U</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Ask anything about your courses..."
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            disabled={isPending}
          />
          <Button size="icon" onClick={handleSend} disabled={isPending}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

