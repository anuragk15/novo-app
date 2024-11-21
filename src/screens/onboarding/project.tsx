import OnboardingForm from "@/components/onboarding/form";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingProjectScreen() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const CheckIcon = () => (
    <div className="bg-green-500 rounded-full p-1 flex items-center justify-center">
      <Check color="white" size={18} />
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 py-10">
      <div
        className={cn(
          "min-h-[90vh] max-w-4xl border shadow-sm rounded-xl mx-auto flex justify-center  bg-white  ",
          step == 3 && "min-h-fit max-w-5xl"
        )}
      >
        <div className="relative  flex flex-col justify-center items-center ">
          {step != 3 ? (
            <div
              className="flex cursor-pointer items-center absolute hover:bg-slate-100 p-2 rounded-lg left-2 top-2  "
              onClick={() => navigate("/")}
            >
              <ChevronLeft />
              <p>Back</p>
            </div>
          ) : null}
          {step != 3 ? (
            <div
              className={cn(
                " hidden md:flex pt-10  top-10 max-w-4xl px-4 md:px-20   items-center gap-5 w-full justify-center"
              )}
            >
              <div className=" justify-center flex flex-col items-center">
                {step > 0 ? (
                  <CheckIcon />
                ) : (
                  <div className="bg-slate-200 text-black font-bold rounded-full w-8 h-8 flex  items-center justify-center text-sm">
                    1
                  </div>
                )}

                <h1 className="text-sm font-semibold font-sans">
                  Enter details
                </h1>
              </div>
              <div className="flex-1 h-[0.5px] bg-slate-300"></div>
              <div className=" justify-center flex flex-col items-center">
                {step > 1 ? (
                  <CheckIcon />
                ) : (
                  <div className="bg-slate-200 text-black font-bold rounded-full w-8 h-8 flex  items-center justify-center text-sm">
                    2
                  </div>
                )}

                <h1 className="text-sm font-semibold font-sans">Competitors</h1>
              </div>
              <div className="flex-1 h-[0.5px] bg-slate-300"></div>
              <div className=" justify-center flex flex-col items-center">
                {step > 2 ? (
                  <CheckIcon />
                ) : (
                  <div className="bg-slate-200 text-black font-bold rounded-full w-8 h-8 flex  items-center justify-center text-sm">
                    3
                  </div>
                )}

                <h1 className="text-sm font-semibold font-sans">
                  Voice & audience
                </h1>
              </div>
            </div>
          ) : null}
          <div className="flex-1 py-5 flex justify-center items-center px-4 md:px-20 ">
            <OnboardingForm step={step} setStep={setStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
