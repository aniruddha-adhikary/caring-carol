import { useState } from "react";
import FancyForm from "@/fancy-form.tsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "react-hot-toast";

import './App.css';
import step1Photo from './assets/step-1.png';
import step2Photo from './assets/step-2.png';
import step3Photo from './assets/step-3.png';
import step4Photo from './assets/step-4.png';

function App() {
  const [yourProfile, setYourProfile] = useState({});
  const [colleagueProfile, setColleagueProfile] = useState({});
  const [comparison, setComparison] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const generateComparison = () => {
    const comparisonText = `Your Profile:\n${JSON.stringify(yourProfile, null, 2)}\n\nColleague's Profile:\n${JSON.stringify(colleagueProfile, null, 2)}`;
    setComparison(comparisonText);
    setShowInstructions(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <FancyForm title="Your Personality Profile" onUpdate={setYourProfile} />
        <FancyForm title="Colleague's Personality Profile" onUpdate={setColleagueProfile} />
      </div>
      <Button
        className="w-full max-w-xl text-xl py-6"
        size="lg"
        onClick={generateComparison}
      >
        Generate Comparison
      </Button>
      {showInstructions && (
        <Card className="w-full max-w-4xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-semibold">Step 1:</p>
                <p>Go to <a href="https://pair.gov.sg" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">pair.gov.sg</a> and login.</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img src={step1Photo} alt="Step 1: Login" className="object-cover w-full h-full" />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 2:</p>
                <p>Click on "Explore Assistants" and then "Create an Assistant".</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img src={step2Photo} alt="Step 2: Create an Assistant" className="object-cover w-full h-full" />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 3:</p>
                <p>Copy the text from the textarea below and paste it as the instruction.</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img src={step3Photo} alt="Step 3: Put in instructions" className="object-cover w-full h-full" />
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Step 4:</p>
                <p>Click "Save" and start chatting!</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <img src={step4Photo} alt="Step 4: Save" className="object-cover w-full h-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {comparison && (
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-bold mb-2">Copy the text below:</h3>
          <div className="relative">
            <textarea
              className="w-full h-64 p-4 border-2 border-blue-500 rounded bg-blue-50"
              value={comparison}
              readOnly
            />
            <button
              className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(comparison).then(() => {
                  toast.success("Copied to clipboard!");
                }).catch((err) => {
                  console.error('Failed to copy: ', err);
                  toast.error("Failed to copy. Please try again.");
                });
              }}
            >
              Copy me!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
