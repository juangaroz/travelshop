import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy Ana del equipo de TravelShop. ¿En qué puedo ayudarte hoy?",
      sender: "agent",
      time: "Ahora"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      time: "Ahora"
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        text: "Gracias por tu mensaje. Un agente te responderá en breve.",
        sender: "agent",
        time: "Ahora"
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110 group"
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Pulse animation */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping"></span>
          
          {/* Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            1
          </span>

          {/* Tooltip */}
          <div className="absolute right-full mr-4 whitespace-nowrap bg-neutral-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ¿Necesitas ayuda?
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 bg-neutral-900 transform rotate-45"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-neutral-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarFallback className="bg-white text-primary-600">
                  AS
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white">Soporte TravelShop</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span className="text-sm text-white/90">En línea</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.sender === "agent" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary-100 text-primary-700 text-xs">
                      AS
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : ""}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[280px] ${
                      msg.sender === "user"
                        ? "bg-primary-600 text-white"
                        : "bg-white border border-neutral-200 text-neutral-900"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-neutral-400 mt-1 px-2">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-neutral-200 bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                size="icon"
                className="bg-primary-600 hover:bg-primary-700 flex-shrink-0"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 text-center">
              Normalmente respondemos en menos de 5 minutos
            </p>
          </div>
        </div>
      )}
    </>
  );
}
