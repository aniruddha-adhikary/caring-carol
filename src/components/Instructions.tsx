import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import InstructionStep from "./InstructionStep";
import step1Photo from "../assets/step-1.png";
import step2Photo from "../assets/step-2.png";
import step3Photo from "../assets/step-3.png";
import step4Photo from "../assets/step-4.png";
import step45Photo from "../assets/step-4.5.png";
import step5Photo from "../assets/step-5.png";

interface InstructionsProps {
  comparison: string;
}

const Instructions: React.FC<InstructionsProps> = ({ comparison }) => {
  return (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InstructionStep
              stepNumber={1}
              description={
                <>
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
                </>
              }
              imageSrc={step1Photo}
              imageAlt="Step 1: Login"
            />

            <InstructionStep
              stepNumber={2}
              description='Click on "Explore Assistants" and then "Create an Assistant".'
              imageSrc={step2Photo}
              imageAlt="Step 2: Create an Assistant"
            />
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
                <Button
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
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InstructionStep
              stepNumber={4}
              description="Paste the copied text as the instruction for your new assistant."
              imageSrc={step3Photo}
              imageAlt="Step 4: Put in instructions"
            />

            <InstructionStep
              stepNumber={5}
              description='Click "Save" and start chatting!'
              imageSrc={step4Photo}
              imageAlt="Step 5: Save"
            />

            <InstructionStep
              stepNumber={6}
              description="Choose your Caring Agent to tailor your comms."
              imageSrc={step45Photo}
              imageAlt="Step 6: Choose your Caring Agent"
            />

            <InstructionStep
              stepNumber={7}
              description="Detail your situation, and get a thinking aid!"
              imageSrc={step5Photo}
              imageAlt="Step 7: Chat"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Instructions;
