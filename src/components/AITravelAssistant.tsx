import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, User, MapPin, Calendar, DollarSign, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toursData, TourData } from "../data/tours-data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  time: string;
  quickReplies?: string[];
  tours?: TourData[];
}

interface ConversationState {
  hasDestination: boolean;
  hasPeople: boolean;
  hasTravelType: boolean;
  hasBudget: boolean;
  destination?: string;
  people?: string;
  travelType?: string;
  budget?: string;
}

export function AITravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    hasDestination: false,
    hasPeople: false,
    hasTravelType: false,
    hasBudget: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addAIMessage(
          "¡Hola! 👋 Soy **TravelBot AI**, tu asistente inteligente de viajes. Estoy aquí para ayudarte a encontrar el tour perfecto para tu cliente.\n\n¿A dónde le gustaría viajar?",
          ["Caribe", "Europa", "Sudamérica", "Norteamérica"]
        );
      }, 500);
    }
  }, [isOpen]);

  const addAIMessage = (text: string, quickReplies?: string[], tours?: TourData[]) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "ai",
      time: new Date().toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      quickReplies,
      tours,
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(false);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      time: new Date().toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const detectIntent = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();

    // Detect destinations - more flexible
    const destinationMap: Record<string, string[]> = {
      "Caribe": ["caribe", "cancún", "cancun", "playa del carmen", "riviera maya", "quintana roo", "playa", "beach", "mar", "tropical", "tulum"],
      "Europa": ["europa", "parís", "paris", "roma", "barcelona", "amsterdam", "ámsterdam", "francia", "italia", "españa", "holanda", "grecia", "atenas", "santorini", "londres", "edimburgo", "reino unido"],
      "Sudamérica": ["sudamérica", "sudamerica", "sur", "patagonia", "argentina", "buenos aires", "ushuaia", "glaciar", "chile", "perú", "peru", "machu picchu", "lima", "cusco"],
      "Norteamérica": ["norteamérica", "norteamerica", "norte", "nueva york", "boston", "washington", "estados unidos", "usa", "new york", "eeuu"],
      "Asia": ["asia", "japón", "japon", "tokio", "kioto", "tailandia", "bangkok", "phuket", "dubai", "emiratos"],
      "Centroamérica": ["centroamérica", "centroamerica", "costa rica", "san josé", "arenal", "monteverde"],
    };

    let detectedDestination: string | undefined;
    for (const [dest, keywords] of Object.entries(destinationMap)) {
      if (keywords.some((k) => lowerMsg.includes(k))) {
        detectedDestination = dest;
        break;
      }
    }

    // Detect numbers (people) - more flexible
    const numberMatch = userMessage.match(/\d+/);
    let people: string | null = null;
    
    if (numberMatch) {
      people = numberMatch[0];
    } else if (lowerMsg.includes("una persona") || lowerMsg.includes("solo") || lowerMsg.includes("sola")) {
      people = "1";
    } else if (lowerMsg.includes("dos") || lowerMsg.includes("pareja")) {
      people = "2";
    } else if (lowerMsg.includes("tres")) {
      people = "3";
    } else if (lowerMsg.includes("cuatro")) {
      people = "4";
    } else if (lowerMsg.includes("familia") || lowerMsg.includes("cinco") || lowerMsg.includes("grupo")) {
      people = "5";
    }

    // Detect travel types - more comprehensive
    const travelTypes = {
      playa: ["playa", "beach", "relax", "descanso", "todo incluido", "resort", "sol", "arena", "mar"],
      cultural: ["cultural", "cultura", "histórico", "historia", "museos", "museo", "patrimonio", "arte", "artístico"],
      aventura: ["aventura", "deportes", "deporte", "trekking", "senderismo", "extremo", "naturaleza", "hiking", "montaña"],
      ciudad: ["ciudad", "urbano", "shopping", "compras", "metrópoli", "metropolitano", "urbana"],
    };

    let detectedTravelType: string | undefined;
    for (const [type, keywords] of Object.entries(travelTypes)) {
      if (keywords.some((k) => lowerMsg.includes(k))) {
        detectedTravelType = type;
        break;
      }
    }

    // Detect budget - more flexible with ranges
    const budgetRanges = {
      economico: ["económico", "economico", "barato", "presupuesto bajo", "bajo", "15", "18", "20", "15,000", "18,000", "20,000", "25,000", "15000", "18000", "20000", "25000"],
      medio: ["medio", "moderado", "promedio", "30", "35", "40", "50", "30,000", "35,000", "40,000", "50,000", "30000", "35000", "40000", "50000"],
      alto: ["alto", "lujo", "premium", "60", "65", "80", "85", "60,000", "65,000", "80,000", "85,000", "60000", "65000", "80000", "85000"],
    };

    let detectedBudget: string | undefined;
    for (const [budget, keywords] of Object.entries(budgetRanges)) {
      if (keywords.some((k) => lowerMsg.includes(k))) {
        detectedBudget = budget;
        break;
      }
    }

    return {
      destination: detectedDestination,
      people: people,
      travelType: detectedTravelType,
      budget: detectedBudget,
    };
  };

  const filterTours = (state: ConversationState): TourData[] => {
    const allTours = Object.values(toursData);
    let exactMatches: TourData[] = [];
    let partialMatches: TourData[] = [];
    let otherTours: TourData[] = [];

    // Score tours based on how well they match criteria
    allTours.forEach((tour) => {
      let score = 0;
      let exactMatch = true;

      // Check destination match
      if (state.destination) {
        if (tour.destination === state.destination) {
          score += 3;
        } else {
          exactMatch = false;
        }
      }

      // Check category/travel type match
      if (state.travelType) {
        const categoryMap: Record<string, string[]> = {
          playa: ["Playa"],
          cultural: ["Cultural"],
          aventura: ["Aventura"],
          ciudad: ["Ciudad"],
        };
        const matchingCategories = categoryMap[state.travelType] || [];
        if (matchingCategories.includes(tour.category)) {
          score += 2;
        } else {
          exactMatch = false;
        }
      }

      // Check budget match
      if (state.budget) {
        const budgetRanges: Record<string, [number, number]> = {
          economico: [0, 25000],
          medio: [25000, 50000],
          alto: [50000, 100000],
        };
        const [min, max] = budgetRanges[state.budget] || [0, 999999];
        if (tour.price >= min && tour.price <= max) {
          score += 2;
        } else {
          // Allow some flexibility (20% above/below range)
          const flexibility = 0.2;
          if (
            tour.price >= min * (1 - flexibility) &&
            tour.price <= max * (1 + flexibility)
          ) {
            score += 1;
          } else {
            exactMatch = false;
          }
        }
      }

      // Categorize tours
      if (exactMatch && score >= 5) {
        exactMatches.push(tour);
      } else if (score >= 2) {
        partialMatches.push(tour);
      } else {
        otherTours.push(tour);
      }
    });

    // Return at least 3 tours, prioritizing exact matches
    let result: TourData[] = [];
    
    if (exactMatches.length >= 3) {
      result = exactMatches.slice(0, 3);
    } else {
      result = [...exactMatches];
      const remaining = 3 - result.length;
      result = [...result, ...partialMatches.slice(0, remaining)];
      
      // If still less than 3, add other tours
      if (result.length < 3) {
        const stillRemaining = 3 - result.length;
        result = [...result, ...otherTours.slice(0, stillRemaining)];
      }
    }

    return result;
  };

  const generateAIResponse = (userMessage: string) => {
    const intent = detectIntent(userMessage);
    const newState = { ...conversationState };

    // Update conversation state
    if (intent.destination && !conversationState.hasDestination) {
      newState.hasDestination = true;
      newState.destination = intent.destination;
      setConversationState(newState);

      setTimeout(() => {
        addAIMessage(
          `¡Excelente elección! **${intent.destination}** es un destino maravilloso. ✨\n\n¿Cuántas personas viajarán?`,
          ["1 persona", "2 personas", "4 personas", "Familia (5+)"]
        );
      }, 1200);
      return;
    }

    if (intent.people && !conversationState.hasPeople) {
      newState.hasPeople = true;
      newState.people = intent.people;
      setConversationState(newState);

      setTimeout(() => {
        addAIMessage(
          `Perfecto, un grupo de **${intent.people} persona${
            parseInt(intent.people) > 1 ? "s" : ""
          }**. 👥\n\n¿Qué tipo de viaje les interesa?`,
          ["Cultural", "Playa", "Aventura", "Ciudad"]
        );
      }, 1200);
      return;
    }

    if (intent.travelType && !conversationState.hasTravelType) {
      newState.hasTravelType = true;
      newState.travelType = intent.travelType;
      setConversationState(newState);

      const travelTypeNames: Record<string, string> = {
        cultural: "Cultural",
        aventura: "Aventura",
        playa: "Playa y Relax",
        ciudad: "Ciudad",
      };

      setTimeout(() => {
        addAIMessage(
          `¡Genial! Un viaje **${
            travelTypeNames[intent.travelType!]
          }** suena increíble. 🎯\n\n¿Cuál es el presupuesto aproximado por persona (en MXN)?`,
          ["$15,000 - $25,000", "$25,000 - $50,000", "$50,000 - $85,000"]
        );
      }, 1200);
      return;
    }

    if (intent.budget && !conversationState.hasBudget) {
      newState.hasBudget = true;
      newState.budget = intent.budget;
      setConversationState(newState);

      // Generate recommendations with tours
      setTimeout(() => {
        const matchedTours = filterTours(newState);
        if (matchedTours.length > 0) {
          addAIMessage(
            `¡Perfecto! 🎉 He encontrado **${matchedTours.length} tour${
              matchedTours.length > 1 ? "s" : ""
            }** que coinciden con tus preferencias:\n\n📍 Destino: **${newState.destination}**\n👥 Viajeros: **${
              newState.people
            } persona${parseInt(newState.people || "1") > 1 ? "s" : ""}**\n🎯 Tipo: **${
              newState.travelType
            }**\n💰 Presupuesto: **${newState.budget}**\n\nAquí están los tours disponibles:`,
            undefined,
            matchedTours
          );
        } else {
          // Show all tours if no exact match
          const allTours = Object.values(toursData);
          addAIMessage(
            `No encontré tours exactos con esos criterios específicos, pero aquí tienes nuestros mejores tours disponibles que podrían interesarte:`,
            undefined,
            allTours
          );
        }
      }, 1500);
      return;
    }

    // If all info is collected but user sends another message
    if (
      conversationState.hasDestination &&
      conversationState.hasPeople &&
      conversationState.hasTravelType &&
      conversationState.hasBudget
    ) {
      // Check if user is asking for more info or specific tours
      if (userMessage.toLowerCase().includes("más") || userMessage.toLowerCase().includes("otro")) {
        const allTours = filterTours(conversationState);
        setTimeout(() => {
          addAIMessage(
            "Aquí tienes todas las opciones disponibles que coinciden con tus preferencias:",
            undefined,
            allTours
          );
        }, 1000);
        return;
      }

      setTimeout(() => {
        addAIMessage(
          "¿Necesitas más información sobre alguno de los tours? También puedo ayudarte a:\n\n• Ver más detalles del tour\n• Consultar disponibilidad\n• Iniciar una reservación\n• Buscar otras opciones\n\n¿En qué más puedo ayudarte?"
        );
      }, 1000);
      return;
    }

    // Contextual help based on current state
    if (!conversationState.hasDestination) {
      setTimeout(() => {
        addAIMessage(
          "Para ayudarte mejor, necesito saber el **destino**. Puedes elegir entre:\n\n🏝️ Caribe (Cancún, playas)\n🏛️ Europa (París, Roma, Barcelona)\n🏔️ Sudamérica (Patagonia, Argentina)\n🏙️ Norteamérica (Nueva York, Boston)\n\n¿Cuál te interesa?",
          ["Caribe", "Europa", "Sudamérica", "Norteamérica"]
        );
      }, 1000);
      return;
    }

    if (!conversationState.hasPeople) {
      setTimeout(() => {
        addAIMessage(
          "¿Cuántas **personas** viajarán? Por favor indícame el número de viajeros.",
          ["1 persona", "2 personas", "4 personas", "Familia (5+)"]
        );
      }, 1000);
      return;
    }

    if (!conversationState.hasTravelType) {
      setTimeout(() => {
        addAIMessage(
          "¿Qué **tipo de viaje** prefieren?\n\n🏖️ Playa y relax\n🏛️ Cultural e histórico\n🏔️ Aventura y naturaleza\n🏙️ Ciudad y shopping\n\n¿Cuál es su estilo?",
          ["Cultural", "Playa", "Aventura", "Ciudad"]
        );
      }, 1000);
      return;
    }

    if (!conversationState.hasBudget) {
      setTimeout(() => {
        addAIMessage(
          "¿Cuál es el **presupuesto aproximado** por persona (en MXN)?\n\n💰 Económico: $15,000 - $25,000\n💎 Medio: $25,000 - $50,000\n👑 Premium: $50,000 - $85,000\n\n¿En qué rango están?",
          ["$15,000 - $25,000", "$25,000 - $50,000", "$50,000 - $85,000"]
        );
      }, 1000);
      return;
    }

    // Default fallback - should rarely reach here now
    setTimeout(() => {
      addAIMessage(
        "No estoy seguro de entender. ¿Podrías usar los botones de respuesta rápida o ser más específico? Estoy aquí para ayudarte. 😊"
      );
    }, 1000);
  };

  const handleSendMessage = (customMessage?: string) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim()) return;

    addUserMessage(messageToSend);
    setMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      generateAIResponse(messageToSend);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleReset = () => {
    setMessages([]);
    setConversationState({
      hasDestination: false,
      hasPeople: false,
      hasTravelType: false,
      hasBudget: false,
    });
    setTimeout(() => {
      addAIMessage(
        "¡Hola! 👋 Soy **TravelBot AI**, tu asistente inteligente de viajes. Estoy aquí para ayudarte a encontrar el tour perfecto para tu cliente.\n\n¿A dónde le gustaría viajar?",
        ["Caribe", "Europa", "Sudamérica", "Norteamérica"]
      );
    }, 300);
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110 group"
        >
          <div className="relative">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>

          {/* Pulse animation */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75 animate-ping"></span>

          {/* AI Badge */}
          <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] rounded-full flex items-center justify-center shadow-lg">
            AI
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-4 whitespace-nowrap bg-neutral-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Asistente AI de Viajes
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-2 h-2 bg-neutral-900 transform rotate-45"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[440px] h-[700px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-neutral-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 p-5 text-white relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-white shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
                  <AvatarFallback className="bg-transparent text-white">
                    <Sparkles className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white">TravelBot AI</h3>
                    <div className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px]">
                      Beta
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></span>
                    <span className="text-sm text-white/90">
                      Asistente inteligente activo
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Nueva conversación"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-neutral-50 to-white">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex gap-3 ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.sender === "ai" && (
                    <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                      <AvatarFallback className="bg-transparent text-white">
                        <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {msg.sender === "user" && (
                    <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-primary-600 to-primary-700">
                      <AvatarFallback className="bg-transparent text-white">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : ""
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[340px] ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-md"
                          : "bg-white border border-neutral-200 text-neutral-900 shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {msg.text.split("**").map((part, i) =>
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-400 mt-1 px-2">
                      {msg.time}
                    </span>
                  </div>
                </div>

                {/* Tour Cards */}
                {msg.sender === "ai" && msg.tours && msg.tours.length > 0 && (
                  <div className="mt-4 space-y-3 ml-0">
                    {msg.tours.map((tour) => (
                      <div
                        key={tour.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200 overflow-hidden group cursor-pointer"
                      >
                        {/* Tour Image */}
                        <div className="relative h-40 overflow-hidden">
                          <ImageWithFallback
                            src={tour.image}
                            alt={tour.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs">Popular</span>
                            </div>
                          </div>
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs shadow-lg">
                            {tour.category}
                          </div>
                        </div>

                        {/* Tour Info */}
                        <div className="p-4">
                          <h4 className="text-neutral-900 mb-1 line-clamp-1">
                            {tour.name}
                          </h4>
                          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                            {tour.subtitle}
                          </p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="flex items-center gap-1.5 text-neutral-600">
                              <MapPin className="w-3.5 h-3.5 text-primary-600" />
                              <span className="text-xs">{tour.destination}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-600">
                              <Calendar className="w-3.5 h-3.5 text-primary-600" />
                              <span className="text-xs">{tour.duration}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {tour.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full text-[10px]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                            <div>
                              <div className="text-xs text-neutral-500">Desde</div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-primary-600" />
                                <span className="text-primary-700">
                                  {tour.priceText}
                                </span>
                              </div>
                            </div>
                            <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm group/btn">
                              Ver detalles
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Replies */}
                {msg.sender === "ai" && msg.quickReplies && !msg.tours && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-11">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-2 bg-white border-2 border-primary-200 text-primary-700 rounded-full text-sm hover:bg-primary-50 hover:border-primary-300 transition-all hover:scale-105 shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-600">
                  <AvatarFallback className="bg-transparent text-white">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </AvatarFallback>
                </Avatar>
                <div className="px-4 py-3 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-neutral-200 bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <Button
                size="icon"
                className="bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 flex-shrink-0 shadow-md"
                onClick={() => handleSendMessage()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <p className="text-xs text-neutral-500">
                Impulsado por Inteligencia Artificial
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}