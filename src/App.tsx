import { useState, useRef } from "react";
import FancyForm from "@/fancy-form.tsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  const [isYourProfileValid, setIsYourProfileValid] = useState(false);
  const [isColleagueProfileValid, setIsColleagueProfileValid] = useState(false);
  const instructionsRef = useRef<HTMLDivElement>(null);

  const generateComparison = () => {
    const template = `You are a communication expert specializing in tailoring messages based on Emergenetics profiles. Your task is to help me communicate effectively with my colleague in various workplace situations. Use the provided profiles and situation to craft appropriate communication strategies.

First, review My Colleague's Emergenetics profile:

<my_colleague_profile>
Role/Title/Profession: ${colleagueProfile.role}
${Object.entries(colleagueProfile.preferences || {})
  .filter(([_, value]) => value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking very strongly.
${Object.entries(colleagueProfile.preferences || {})
  .filter(([_, value]) => !value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking weak.

${colleagueProfile.traits?.assertiveness} Assertiveness (${colleagueProfile.traits?.assertiveness === 'first-third' ? 'low' : colleagueProfile.traits?.assertiveness === 'second-third' ? 'medium' : 'high'})
${colleagueProfile.traits?.expressiveness} Expressiveness (${colleagueProfile.traits?.expressiveness === 'first-third' ? 'low' : colleagueProfile.traits?.expressiveness === 'second-third' ? 'medium' : 'high'})
${colleagueProfile.traits?.flexibility} Flexibility (${colleagueProfile.traits?.flexibility === 'first-third' ? 'low' : colleagueProfile.traits?.flexibility === 'second-third' ? 'medium' : 'high'})
</my_colleague_profile>

Now, review my Emergenetics profile:

<my_profile>
Role/Title/Profession: ${yourProfile.role}
${Object.entries(yourProfile.preferences || {})
  .filter(([_, value]) => value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking very strongly.
${Object.entries(yourProfile.preferences || {})
  .filter(([_, value]) => !value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking weak.

${yourProfile.traits?.assertiveness} Assertiveness (${yourProfile.traits?.assertiveness === 'first-third' ? 'low' : yourProfile.traits?.assertiveness === 'second-third' ? 'medium' : 'high'})
${yourProfile.traits?.expressiveness} Expressiveness (${yourProfile.traits?.expressiveness === 'first-third' ? 'low' : yourProfile.traits?.expressiveness === 'second-third' ? 'medium' : 'high'})
${yourProfile.traits?.flexibility} Flexibility (${yourProfile.traits?.flexibility === 'first-third' ? 'low' : yourProfile.traits?.flexibility === 'second-third' ? 'medium' : 'high'})
</my_profile>

You will be presented with a situation or message that I need to communicate to My Colleague. Your job is to analyze the situation and provide recommendations on how I should tailor my communication to suit My Colleague's preferences.

To complete this task, follow these steps:

1. Analyze the situation: Consider the context, the message's content, and its importance.

2. Identify relevant aspects of My Colleague's profile: Determine which elements of My Colleague's Emergenetics profile are most relevant to this situation.

3. Compare with my profile: Note any significant differences between my and My Colleague's profiles that may affect communication.

4. Tailor the communication: Based on your analysis, suggest how I can adapt my communication style to better suit My Colleague's preferences. Consider the following aspects:
   - Thinking preferences (Analytical, Structural, Social, Conceptual)
   - Behavioral attributes (Expressiveness, Assertiveness, Flexibility)

5. Provide specific recommendations: Offer concrete suggestions for:
   - How to phrase the message
   - When and how to approach My Colleague
   - Which communication medium to use (e.g., email, face-to-face, meeting)
   - Any follow-up actions

6. Additional tips: Include any other relevant advice that could improve the effectiveness of the communication.

Format your response as follows:

## Analysis
Provide a brief analysis of the situation and relevant profile aspects.


## Recommendations
List your specific recommendations for tailoring the communication.

## Recommendations
If appropriate, provide a sample of how I could phrase my message to My Colleague.

## Recommendations
Include any other relevant advice or considerations.

Remember to focus on adapting my communication style to match My Colleague's preferences, emphasizing thinking, and being mindful of our  expressiveness, assertiveness and assertiveness. Unless specified otherwise, it is a Telegram/Slack message, a Word document/excel/powerpoint for his reference or face-to-face conversation. You may ask clarifying questions too.

The situation will be provided by the user in following messages.`;

    setComparison(template);
    setShowInstructions(true);
    setTimeout(() => {
      instructionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const isGenerateDisabled = !isYourProfileValid || !isColleagueProfileValid;

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <FancyForm
          title="Your Personality Profile"
          onUpdate={setYourProfile}
          onValidityChange={setIsYourProfileValid}
        />
        <FancyForm
          title="Colleague's Personality Profile"
          onUpdate={setColleagueProfile}
          onValidityChange={setIsColleagueProfileValid}
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="w-full max-w-xl">
              <Button
                className="w-full text-xl py-6"
                size="lg"
                onClick={generateComparison}
                disabled={isGenerateDisabled}
              >
                Generate Prompt
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isGenerateDisabled
              ? "Please fill out both forms completely. Ensure at least one thought preference is selected for each profile."
              : "Click to generate comparison"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showInstructions && (
        <Card className="w-full max-w-4xl" ref={instructionsRef}>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <div className="space-y-6">
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
              </div>

              {comparison && (
                <div className="w-full">
                  <h3 className="text-xl font-bold mb-2">Step 3: Copy the text below:</h3>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-semibold">Step 4:</p>
                  <p>Paste the copied text as the instruction for your new assistant.</p>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={step3Photo} alt="Step 4: Put in instructions" className="object-cover w-full h-full" />
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Step 5:</p>
                  <p>Click "Save" and start chatting!</p>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={step4Photo} alt="Step 5: Save" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App
