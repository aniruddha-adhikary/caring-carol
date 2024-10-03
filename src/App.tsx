import {useRef, useState, useCallback} from "react";
import FancyForm from "@/fancy-form.tsx";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {toast, Toaster} from "react-hot-toast";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

import './App.css';
import step1Photo from './assets/step-1.png';
import step2Photo from './assets/step-2.png';
import step3Photo from './assets/step-3.png';
import step4Photo from './assets/step-4.png';
import step45Photo from './assets/step-4.5.png';
import step5Photo from './assets/step-5.png';

interface Profile {
  role?: string;
  preferences?: {
    analytical?: boolean;
    structural?: boolean;
    social?: boolean;
    conceptual?: boolean;
  };
  traits?: {
    assertiveness?: 'first-third' | 'second-third' | 'third-third';
    expressiveness?: 'first-third' | 'second-third' | 'third-third';
    flexibility?: 'first-third' | 'second-third' | 'third-third';
  };
}

function App() {
  const [yourProfile, setYourProfile] = useState<Profile>({});
  const [colleagueProfile, setColleagueProfile] = useState<Profile>({});
  const appName = "Caring Carol";
  const [comparison, setComparison] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [isYourProfileValid, setIsYourProfileValid] = useState(false);
  const [isColleagueProfileValid, setIsColleagueProfileValid] = useState(false);
  const instructionsRef = useRef<HTMLDivElement>(null);

  const appDescription = "Caring Carol is an inclusive communication tool designed to help you create personalized Pair prompts. It enables you to tailor your communications effectively, promoting understanding and collaboration while respecting individual differences and preferences.";

  const generateComparison = () => {
    if (!yourProfile.role || !colleagueProfile.role) {
      console.error("Profiles are incomplete");
      return;
    }
    const template = `You are a communication expert specializing in tailoring messages based on Emergenetics profiles. Your task is to help me communicate effectively with my colleague in various workplace situations. Use the provided profiles and situation to craft appropriate communication strategies.

First, review My Colleague's Emergenetics profile:

<my_colleague_profile>
Role/Title/Profession: ${colleagueProfile.role || 'N/A'}
${Object.entries(colleagueProfile.preferences ?? {})
  .filter(([_, value]) => value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking very strongly.
${Object.entries(colleagueProfile.preferences || {})
  .filter(([_, value]) => !value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking weak.

${colleagueProfile.traits?.assertiveness ?? 'N/A'} Assertiveness (${colleagueProfile.traits?.assertiveness === 'first-third' ? 'low' : colleagueProfile.traits?.assertiveness === 'second-third' ? 'medium' : colleagueProfile.traits?.assertiveness === 'third-third' ? 'high' : 'N/A'})
${colleagueProfile.traits?.expressiveness ?? 'N/A'} Expressiveness (${colleagueProfile.traits?.expressiveness === 'first-third' ? 'low' : colleagueProfile.traits?.expressiveness === 'second-third' ? 'medium' : colleagueProfile.traits?.expressiveness === 'third-third' ? 'high' : 'N/A'})
${colleagueProfile.traits?.flexibility ?? 'N/A'} Flexibility (${colleagueProfile.traits?.flexibility === 'first-third' ? 'low' : colleagueProfile.traits?.flexibility === 'second-third' ? 'medium' : colleagueProfile.traits?.flexibility === 'third-third' ? 'high' : 'N/A'})
</my_colleague_profile>

Now, review my Emergenetics profile:

<my_profile>
Role/Title/Profession: ${yourProfile.role || 'N/A'}
${Object.entries(yourProfile.preferences ?? {})
  .filter(([_, value]) => value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking very strongly.
${Object.entries(yourProfile.preferences || {})
  .filter(([_, value]) => !value)
  .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
  .join(' and ')} thinking weak.

${yourProfile.traits?.assertiveness ?? 'N/A'} Assertiveness (${yourProfile.traits?.assertiveness === 'first-third' ? 'low' : yourProfile.traits?.assertiveness === 'second-third' ? 'medium' : yourProfile.traits?.assertiveness === 'third-third' ? 'high' : 'N/A'})
${yourProfile.traits?.expressiveness ?? 'N/A'} Expressiveness (${yourProfile.traits?.expressiveness === 'first-third' ? 'low' : yourProfile.traits?.expressiveness === 'second-third' ? 'medium' : yourProfile.traits?.expressiveness === 'third-third' ? 'high' : 'N/A'})
${yourProfile.traits?.flexibility ?? 'N/A'} Flexibility (${yourProfile.traits?.flexibility === 'first-third' ? 'low' : yourProfile.traits?.flexibility === 'second-third' ? 'medium' : yourProfile.traits?.flexibility === 'third-third' ? 'high' : 'N/A'})
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

  const resetApp = useCallback(() => {
    setYourProfile({});
    setColleagueProfile({});
    setComparison("");
    setShowInstructions(false);
    setIsYourProfileValid(false);
    setIsColleagueProfileValid(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{appName}</h1>
      <p className="text-center text-gray-600 mb-6 max-w-2xl">{appDescription}</p>
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
                  <img src={step3Photo} alt="Step 4: Put in instructions" className="object-cover w-full h-full"/>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Step 5:</p>
                  <p>Click "Save" and start chatting!</p>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={step4Photo} alt="Step 5: Save" className="object-cover w-full h-full"/>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Step 6:</p>
                  <p>Choose your Caring Agent to tailor your comms.</p>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={step45Photo} alt="Step 6: Choose your Caring Agent" className="object-cover w-full h-full"/>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Step 7:</p>
                  <p>Detail your situation, and get a thinking aid!</p>
                </div>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={step5Photo} alt="Step 7: Chat" className="object-cover w-full h-full"/>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {showInstructions && (
        <Button
          onClick={resetApp}
          className="mt-8 mb-4 text-lg py-4 px-8"
          variant="default"
        >
          Start Over Again
        </Button>
      )}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        Built with love by Ani @ GVT
      </footer>
    </div>
  );
}

export default App
