import React, { useRef } from "react";
import { useFormContext } from "./FormContext";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

const interestOptions = [
  "2 Seasons Residential",
  "True Vine Lakefront Villas",
  "Hygge Town",
  "The Wellness Hub",
];

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const MultiStepForm: React.FC = () => {
  const { step, formData, updateForm, nextStep } = useFormContext();
  const summaryCardRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (summaryCardRef.current) {
      try {
        const canvas = await html2canvas(summaryCardRef.current, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });
        
        const link = document.createElement('a');
        link.download = `2-seasons-response-${formData.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        // Fallback to JSON download if image generation fails
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "responses.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    }
  };

  return (
    <>
      {/* Hidden summary card for image generation */}
      <div 
        ref={summaryCardRef}
        className="fixed top-0 left-0 w-[800px] h-[600px] bg-white p-8 -translate-x-full pointer-events-none"
        style={{ zIndex: -1 }}
      >
        {/* 2 Seasons Header */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">2 SEASONS</div>
          <div className="text-lg text-gray-600">Residential Development</div>
          <div className="text-sm text-gray-500 mt-1">Phase 1 — The City of the 1%</div>
        </div>
        
        {/* Form Response Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Your Interest Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-blue-800">{formData.name}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-blue-800">{formData.email}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-blue-800">{formData.phone}</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
              <span className="font-semibold text-gray-700">Interest:</span>
              <span className="text-blue-800">{formData.interest}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Selection:</span>
              <span className="text-blue-800">{formData.description}</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <div>Generated on {new Date().toLocaleDateString()}</div>
          <div className="mt-2">Thank you for your interest in 2 Seasons Residential</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            className="space-y-6 md:space-y-8 bg-white rounded-xl shadow-2xl p-4 md:p-8 animate-fade-in"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.5, type: "spring" }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              nextStep();
            }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 md:mb-6 text-center drop-shadow">Let's get to know you</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-base md:text-lg transition"
                value={formData.name}
                onChange={e => updateForm({ name: e.target.value })}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-base md:text-lg transition"
                value={formData.email}
                onChange={e => updateForm({ email: e.target.value })}
                required
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-base md:text-lg transition"
                value={formData.phone}
                onChange={e => updateForm({ phone: e.target.value })}
                required
                placeholder="e.g. +1 234 567 8900"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 md:py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
            >
              Next
            </button>
          </motion.form>
        )}
        {step === 2 && (
          <motion.form
            key="step2"
            className="space-y-6 md:space-y-8 bg-white rounded-xl shadow-2xl p-4 md:p-8 animate-fade-in"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.5, type: "spring" }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (formData.interest) nextStep();
            }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 md:mb-6 text-center drop-shadow">What are you most interested in?</h2>
            <div className="grid gap-3 md:gap-4">
              {interestOptions.map(option => (
                <button
                  type="button"
                  key={option}
                  className={`w-full py-2 md:py-3 px-3 md:px-4 rounded-lg border-2 font-semibold text-base md:text-lg shadow transition text-left ${
                    formData.interest === option
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600 shadow-lg"
                      : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                  }`}
                  onClick={() => updateForm({ interest: option })}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="submit"
              className={`w-full py-2 md:py-3 px-4 rounded-lg font-semibold text-base md:text-lg shadow-lg transition ${
                formData.interest ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!formData.interest}
            >
              Next
            </button>
          </motion.form>
        )}
        {step === 3 && (
          <motion.form
            key="step3"
            className="space-y-6 md:space-y-8 bg-white rounded-xl shadow-2xl p-4 md:p-8 animate-fade-in"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.5, type: "spring" }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              if (formData.description) nextStep();
            }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 md:mb-6 text-center drop-shadow">
              {formData.interest ? `Select an option for ${formData.interest}` : "Select an option"}
            </h2>
            <div className="grid gap-3 md:gap-4">
              {(() => {
                let options: string[] = [];
                switch (formData.interest) {
                  case "2 Seasons Residential":
                    options = [
                      "Claim ownership now",
                      "Make a deposit",
                      "Claim ownership later",
                      "Show my interest",
                    ];
                    break;
                  case "True Vine Lakefront Villas":
                    options = [
                      "Buy now and start building",
                      "Buy now and build later",
                      "Note my interest",
                    ];
                    break;
                  case "Hygge Town":
                    options = [
                      "I run a startup",
                      "I own a VC",
                      "I want to partner in building",
                      "I want to build a head office",
                    ];
                    break;
                  case "The Wellness Hub":
                    options = [
                      "Fitness coach",
                      "Fitness enthusiast",
                      "Herbal remedies enthusiast",
                      "Masseuse",
                      "Meditation and Prayer Therapy enthusiast",
                    ];
                    break;
                  default:
                    options = [];
                }
                return options.map(option => (
                  <button
                    type="button"
                    key={option}
                    className={`w-full py-2 md:py-3 px-3 md:px-4 rounded-lg border-2 font-semibold text-base md:text-lg shadow transition text-left ${
                      formData.description === option
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600 shadow-lg"
                        : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
                    }`}
                    onClick={() => updateForm({ description: option })}
                  >
                    {option}
                  </button>
                ));
              })()}
            </div>
            <button
              type="submit"
              className={`w-full py-2 md:py-3 px-4 rounded-lg font-semibold text-base md:text-lg shadow-lg transition ${
                formData.description ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!formData.description}
            >
              Next
            </button>
          </motion.form>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            className="space-y-6 md:space-y-8 text-center bg-white rounded-xl shadow-2xl p-4 md:p-8 animate-fade-in"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 mb-2 drop-shadow">Thank you!</h2>
              <p className="text-gray-700 text-base md:text-lg">Your responses have been recorded.</p>
            </div>
            <button
              onClick={downloadAsImage}
              className="w-full py-2 md:py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
            >
              Download Your Summary (PNG)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MultiStepForm; 