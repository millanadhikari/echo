import React, { useEffect } from "react";
import Vapi from "@vapi-ai/web";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = React.useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [transcript, setTranscript] = React.useState<TranscriptMessage[]>([]);

  useEffect(() => {
    //only for testing the VAPI API, otherwise customers will provide their own API key
    const vapiInstance = new Vapi("927c684c-20d8-47d2-91aa-dd06b791b376");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnecting(true);
      setIsConnected(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnecting(false);
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error: any) => {
      console.error("Vapi error:", error);
      setIsConnecting(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });
    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = async () => {
    setIsConnecting(true);
    if (vapi) {
      //only for testing the VAPI API, otherwise customers will provide their own Assistant Ids

      vapi.start("cda999ae-7d5c-40a2-ac62-6e9ff9a5c79d");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };
  return {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall,
  };
};
