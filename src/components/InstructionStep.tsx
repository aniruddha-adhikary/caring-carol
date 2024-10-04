import React from "react";

interface InstructionStepProps {
  stepNumber: number;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}

const InstructionStep: React.FC<InstructionStepProps> = ({
  stepNumber,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <>
      <div className="space-y-2">
        <p className="font-semibold">Step {stepNumber}:</p>
        <p>{description}</p>
      </div>
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="object-cover w-full h-full"
        />
      </div>
    </>
  );
};

export default InstructionStep;
