import { useState, useCallback, useEffect } from "react";
import Handlebars from "handlebars";
import FancyForm from "@/fancy-form.tsx";
import templateSource from "./template";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast, Toaster } from "react-hot-toast";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";
import "./App.css";
import step1Photo from "./assets/step-1.png";
import step2Photo from "./assets/step-2.png";
import step3Photo from "./assets/step-3.png";
import step4Photo from "./assets/step-4.png";
import step45Photo from "./assets/step-4.5.png";
import step5Photo from "./assets/step-5.png";
import VideoModal from "./components/VideoModal.tsx";

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
      case 3:
        return renderInstructions();
      default:
        return null;
    }
  };

  const renderInstructions = () => (
    <>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-semibold">Step 1:</p>
                <p>
                  Go to{" "}
                  <a
                    href="https://pair.gov.sg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    pair.gov.sg
                  </a>{" "}
                  and login.
                </p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={step1Photo}
                  alt="Step 1: Login"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 2:</p>
                <p>
                  Click on &quot;Explore Assistants &quot; and then &quot;Create
                  an Assistant&quot;.
                </p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={step2Photo}
                  alt="Step 2: Create an Assistant"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {comparison && (
              <div className="w-full">
                <h3 className="text-xl font-bold mb-2">
                  Step 3: Copy the text below:
                </h3>
                <div className="relative">
                  <textarea
                    className="w-full h-64 p-4 border-2 border-blue-500 rounded bg-blue-50"
                    value={comparison}
                    readOnly
                  />
                  <button
                    className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(comparison)
                        .then(() => {
                          toast.success("Copied to clipboard!");
                        })
                        .catch((err) => {
                          console.error("Failed to copy: ", err);
                          toast.error("Failed to copy. Please try again.");
                        });
                    }}
                  >
                    Copy me!
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-semibold">Step 4:</p>
                <p>
                  Paste the copied text as the instruction for your new
                  assistant.
                </p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={step3Photo}
                  alt="Step 4: Put in instructions"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 5:</p>
                <p>Click &quot;Save&quot; and start chatting!</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={step4Photo}
                  alt="Step 5: Save"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 6:</p>
                <p>Choose your Caring Agent to tailor your comms.</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={step45Photo}
                  alt="Step 6: Choose your Caring Agent"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 7:</p>
                <p>Detail your situation, and get a thinking aid!</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={step5Photo}
                  alt="Step 7: Chat"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{appName}</h1>
      <p className="text-center text-gray-600 max-w-2xl">{appDescription}</p>
      <Button onClick={openVideoModal} variant="outline" size="lg">
        <Play className="mr-2 h-4 w-4" /> Watch Demo
      </Button>
      <Toaster position="top-right" />
      <span className="starting-point"></span>
      {renderStep()}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoUrl="https://www.youtube.com/watch?v=AUuU8GvfhQw"
      />
      <div className="flex gap-4">
        {step > 0 && (
          <Button onClick={() => setStep(step - 1)} size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
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
        Built with love by Ani @ GVT
      </footer>
    </div>
  );
}

export default App;
