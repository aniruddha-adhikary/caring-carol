import { useState, useEffect, useCallback } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface FormData {
  role: string;
  preferences: {
    analytical: boolean;
    conceptual: boolean;
    structural: boolean;
    social: boolean;
  };
  traits: {
    expressiveness: "first-third" | "second-third" | "third-third";
    assertiveness: "first-third" | "second-third" | "third-third";
    flexibility: "first-third" | "second-third" | "third-third";
  };
}

interface FancyFormProps {
  title: string;
  onUpdate: (data: FormData) => void;
  onValidityChange: (isValid: boolean) => void;
}

export default function FancyForm({
  title,
  onUpdate,
  onValidityChange,
}: FancyFormProps) {
  const [role, setRole] = useState("");
  const [preferences, setPreferences] = useState({
    analytical: false,
    conceptual: false,
    structural: false,
    social: false,
  });

  const [traits, setTraits] = useState({
    expressiveness: "first-third",
    assertiveness: "first-third",
    flexibility: "first-third",
  });

  const isFormValid = useCallback(() => {
    return (
      role.trim() !== "" &&
      Object.values(preferences).some((value) => value === true)
    );
  }, [role, preferences]);

  useEffect(() => {
    onValidityChange(isFormValid());
  }, [isFormValid, onValidityChange]);

  const updateRole = (newRole: string) => {
    setRole(newRole);
    onUpdate({
      role: newRole,
      preferences,
      traits: traits as FormData["traits"],
    });
  };

  const updatePreferencesAndTraits = (
    newPreferences: typeof preferences,
    newTraits: typeof traits,
  ) => {
    onUpdate({
      role,
      preferences: newPreferences,
      traits: newTraits as FormData["traits"],
    });
  };

  const togglePreference = (pref: keyof typeof preferences) => {
    const newPreferences = { ...preferences, [pref]: !preferences[pref] };
    setPreferences(newPreferences);
    updatePreferencesAndTraits(newPreferences, traits);
  };

  const updateTrait = (
    trait: keyof typeof traits,
    value: "first-third" | "second-third" | "third-third",
  ) => {
    const newTraits = { ...traits, [trait]: value };
    setTraits(newTraits);
    updatePreferencesAndTraits(preferences, newTraits);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role/Title/Profession
          </label>
          <Input
            id="role"
            value={role}
            onChange={(e) => updateRole(e.target.value)}
            placeholder="Enter role, title, or profession"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Thought Preferences (&gt;23%)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(preferences).map(([key, value]) => (
              <Toggle
                key={key}
                pressed={value}
                onPressedChange={() =>
                  togglePreference(key as keyof typeof preferences)
                }
                className={`w-full h-16 font-semibold border-2 ${
                  value
                    ? `text-white border-transparent ${
                        key === "analytical"
                          ? "bg-blue-500 hover:bg-blue-600 data-[state=on]:bg-blue-500 data-[state=on]:hover:bg-blue-600"
                          : key === "conceptual"
                            ? "bg-yellow-500 hover:bg-yellow-600 data-[state=on]:bg-yellow-500 data-[state=on]:hover:bg-yellow-600"
                            : key === "social"
                              ? "bg-red-500 hover:bg-red-600 data-[state=on]:bg-red-500 data-[state=on]:hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600 data-[state=on]:bg-green-500 data-[state=on]:hover:bg-green-600"
                      }`
                    : `bg-white ${
                        key === "analytical"
                          ? "text-blue-500 border-blue-500 hover:bg-blue-100"
                          : key === "conceptual"
                            ? "text-yellow-500 border-yellow-500 hover:bg-yellow-100"
                            : key === "social"
                              ? "text-red-500 border-red-500 hover:bg-red-100"
                              : "text-green-500 border-green-500 hover:bg-green-100"
                      }`
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Toggle>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Behavioral Preferences</h2>
          {Object.entries(traits).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    updateTrait(key as keyof typeof traits, "first-third")
                  }
                  variant={value === "first-third" ? "default" : "outline"}
                  className={`flex-1 ${value === "first-third" ? "bg-purple-300 hover:bg-purple-400" : "text-purple-700 border-purple-300 hover:bg-purple-100"}`}
                >
                  First-third
                </Button>
                <Button
                  onClick={() =>
                    updateTrait(key as keyof typeof traits, "second-third")
                  }
                  variant={value === "second-third" ? "default" : "outline"}
                  className={`flex-1 ${value === "second-third" ? "bg-purple-500 hover:bg-purple-600" : "text-purple-700 border-purple-500 hover:bg-purple-100"}`}
                >
                  Second-third
                </Button>
                <Button
                  onClick={() =>
                    updateTrait(key as keyof typeof traits, "third-third")
                  }
                  variant={value === "third-third" ? "default" : "outline"}
                  className={`flex-1 ${value === "third-third" ? "bg-purple-700 hover:bg-purple-800" : "text-purple-700 border-purple-700 hover:bg-purple-100"}`}
                >
                  Third-third
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
