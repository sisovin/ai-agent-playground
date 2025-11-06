'use client';

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { AgentCourse } from "@/lib/agent-data";
import { ollamaService, ChatMessage, OllamaModel } from "@/lib/ollama-service";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface AgentPlaygroundProps {
  course: AgentCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AgentPlayground({ course, open, onOpenChange }: AgentPlaygroundProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [connectionError, setConnectionError] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && course) {
      checkOllamaConnection();
    }
  }, [open, course]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingMessage]);

  const checkOllamaConnection = async () => {
    const isConnected = await ollamaService.checkConnection();
    if (isConnected) {
      setConnectionError(false);
      const availableModels = await ollamaService.getModels();
      setModels(availableModels);
      if (availableModels.length > 0 && !selectedModel) {
        setSelectedModel(availableModels[0].name);
      }
      if (course) {
        setMessages([
          {
            role: 'system',
            content: course.systemPrompt
          },
          {
            role: 'assistant',
            content: `Welcome to ${course.title}! I'm here to help you learn about ${course.description.toLowerCase()}. What would you like to know?`
          }
        ]);
      }
    } else {
      setConnectionError(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading || !selectedModel) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setStreamingMessage("");

    try {
      const chatHistory = messages.filter(m => m.role !== 'system');
      const systemMessage = messages.find(m => m.role === 'system');
      const messagesToSend = systemMessage 
        ? [systemMessage, ...chatHistory, userMessage]
        : [...chatHistory, userMessage];

      let fullResponse = "";
      await ollamaService.chat(
        selectedModel,
        messagesToSend,
        (chunk) => {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fullResponse
      }]);
      setStreamingMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure Ollama is running and try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{course.icon}</span>
              <div>
                <DialogTitle className="text-xl">{course.title}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Interactive AI Agent Playground
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              {models.length > 0 && (
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.name} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </DialogHeader>

        {connectionError ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="mt-2">
                <p className="font-semibold mb-2">Cannot connect to Ollama</p>
                <p className="text-sm mb-3">
                  Make sure Ollama is installed and running on localhost:11434
                </p>
                <div className="text-sm space-y-1 bg-destructive/10 p-3 rounded">
                  <p className="font-mono">1. Install: curl -fsSL https://ollama.com/install.sh | sh</p>
                  <p className="font-mono">2. Run: ollama serve</p>
                  <p className="font-mono">3. Pull a model: ollama pull llama2</p>
                </div>
                <Button 
                  onClick={checkOllamaConnection} 
                  className="mt-4 w-full"
                  variant="outline"
                >
                  Retry Connection
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.filter(m => m.role !== 'system').map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {streamingMessage && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted text-foreground">
                      <p className="text-sm whitespace-pre-wrap">{streamingMessage}</p>
                    </div>
                  </div>
                )}
                {loading && !streamingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t px-6 py-4 bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question about this AI agent topic..."
                  disabled={loading || !selectedModel}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={loading || !input.trim() || !selectedModel}
                  size="icon"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}