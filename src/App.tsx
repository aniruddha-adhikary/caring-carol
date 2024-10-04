import { useCallback, useEffect, useState } from "react";
import Handlebars from "handlebars";
import FancyForm from "@/fancy-form.tsx";
import templateSource from "./template";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import { ArrowRight, Play } from "lucide-react";
import "./App.css";
import VideoModal from "./components/VideoModal.tsx";
import Instructions from "./components/Instructions";

// Define the "eq" helper for Handlebars
Handlebars.registerHelper("eq", function (arg1, arg2) {
  return arg1 === arg2;
});

interface Profile {
  role?: string;
  preferences?: {
    analytical?: boolean;
    structural?: boolean;
    social?: boolean;
    conceptual?: boolean;
  };
  traits?: {
    assertiveness?: "first-third" | "second-third" | "third-third";
    expressiveness?: "first-third" | "second-third" | "third-third";
    flexibility?: "first-third" | "second-third" | "third-third";
  };
}

function scrollToTop() {
  const header = document.querySelector(".starting-point");
  if (header) {
    header.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function App() {
  const [step, setStep] = useState(0);
  const [yourProfile, setYourProfile] = useState<Profile>({});
  const [colleagueProfile, setColleagueProfile] = useState<Profile>({});
  const [comparison, setComparison] = useState("");
  const [isYourProfileValid, setIsYourProfileValid] = useState(false);
  const [isColleagueProfileValid, setIsColleagueProfileValid] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const appName = "Caring Carol";
  const appDescription =
    "Caring Carol is an inclusive communication tool designed to help you create personalized Pair prompts. It enables you to tailor your communications effectively, promoting understanding and collaboration while respecting individual differences and preferences.";

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const generateComparison = useCallback(() => {
    if (!yourProfile.role || !colleagueProfile.role) {
      console.error("Profiles are incomplete");
      return;
    }
    const compiledTemplate = Handlebars.compile(templateSource);
    const filledTemplate = compiledTemplate({ yourProfile, colleagueProfile });
    setComparison(filledTemplate);
    setStep(3);
  }, [yourProfile, colleagueProfile]);

  const resetApp = useCallback(() => {
    setYourProfile({});
    setColleagueProfile({});
    setComparison("");
    setIsYourProfileValid(false);
    setIsColleagueProfileValid(false);
    setStep(0);
    setTimeout(() => scrollToTop());
  }, []);

  useEffect(() => {
    if (step === 0) {
      return;
    }
    scrollToTop();
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <FancyForm
              title="Your Personality Profile"
              onUpdate={setYourProfile}
              onValidityChange={setIsYourProfileValid}
              key={2}
            />
          </>
        );
      case 1:
        return (
          <>
            <FancyForm
              title="Colleague's Personality Profile"
              onUpdate={setColleagueProfile}
              onValidityChange={setIsColleagueProfileValid}
              key={1}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{appName}</h1>
      <p className="text-center text-gray-600 max-w-2xl">{appDescription}</p>
      <Button onClick={openVideoModal} variant="outline" size="lg">
        <Play className="mr-2 h-4 w-4" /> Watch Demo
      </Button>
      <Toaster position="top-right" />
      <span className="starting-point"></span>
      {step === 3 ? <Instructions comparison={comparison} /> : renderStep()}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoUrl="https://www.youtube.com/watch?v=AUuU8GvfhQw"
      />
      <div className="flex gap-4">
        {step < 1 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!isYourProfileValid}
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </span>
              </TooltipTrigger>
              {!isYourProfileValid && (
                <TooltipContent>
                  <p>Please complete your profile to proceed</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
        {step === 1 && (
          <Button
            onClick={() => {
              generateComparison();
              setStep(3);
            }}
            disabled={!isColleagueProfileValid}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg"
          >
            Generate Prompt
          </Button>
        )}
        {step === 3 && (
          <Button
            onClick={resetApp}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg"
          >
            Start Over
          </Button>
        )}
      </div>
      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        <a href="https://linkedin.com/in/tuxboy">
          Built with love by Ani @ GVT
        </a>
      </footer>
    </div>
  );
}

export default App;
