/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatedGroup } from "../ui/animated-group";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MultipleSelector } from "../ui/multi-select";
import { useToast } from "../ui/use-toast";
import { CompetitorsTable } from "./competitorsTable";
import { SingleIdea } from "../dashboard/recommendationCard";
import { ArrowRight } from "lucide-react";
import { BorderTrail } from "../ui/border-trail";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  onboardProject,
  onboardProjectCompetitors,
  updateProject,
} from "@/api/functions/projects";
import LoadingOnboardingText from "./loadingText";
import { targetAudienceList } from "@/lib/constants";

const dummyRecommendations = [
  {
    id: "3e2d1f0b-73ec-4e7e-b4e2-74b5d90c1234",
    projectId: "7f8e9d10-4f32-4d6a-bb8c-8e9e0c91a234",
    title: "Boost Engagement through Interactive Content",
    description:
      "Suggestions for interactive content to improve user engagement on the platform.",
    prompt:
      "Create interactive content strategies that enhance user experience.",
    marketingFunnel: "Awareness",
    type: "Content Strategy",
    keywords: "engagement, interactive content, user experience",
    accepted: true,
  },
  {
    id: "3e2d1f0b-73ec-4e7e-b4e2-74b5d90c12344",
    projectId: "7f8e9d10-4f32-4d6a-bb8c-8e9e0c91a234",
    title: "Boost Engagement through Interactive Content",
    description:
      "Suggestions for interactive content to improve user engagement on the platform.",
    prompt:
      "Create interactive content strategies that enhance user experience.",
    marketingFunnel: "Awareness",
    type: "Content Strategy",
    keywords: "engagement, interactive content, user experience",
    accepted: true,
  },
  {
    id: "3e2d1f0b-73ec-4e7e-b4e2-74b5d90c12324",
    projectId: "7f8e9d10-4f32-4d6a-bb8c-8e9e0c91a234",
    title: "Boost Engagement through Interactive Content",
    description:
      "Suggestions for interactive content to improve user engagement on the platform.",
    prompt:
      "Create interactive content strategies that enhance user experience.",
    marketingFunnel: "Awareness",
    type: "Content Strategy",
    keywords: "engagement, interactive content, user experience",
    accepted: true,
  },
  {
    id: "6a1b2d3c-47fb-4e9d-a327-65c9d7f4b789",
    projectId: "7f8e9d10-4f32-4d6a-bb8c-8e9e0c91a234",
    title: "Increase Conversion with Personalized Offers",
    description:
      "Recommendation to use personalized offers for boosting conversion rates.",
    prompt: "Suggest personalized offer strategies for higher conversion.",
    marketingFunnel: "Consideration",
    type: "Conversion Strategy",
    keywords: "personalization, offers, conversion rate",
    accepted: false,
  },
  {
    id: "9f3b4c5d-63f1-4a9e-8e3c-2b1d7e9f6c01",
    projectId: "e2f3g4h5-6i7j-8k9l-0m1n-2o3p4q5r6789",
    title: "Optimize SEO for Better Visibility",
    description: "Guide to improving SEO for better search engine visibility.",
    prompt: "Provide SEO optimization techniques for enhanced visibility.",
    marketingFunnel: "Awareness",
    type: "SEO",
    keywords: "SEO, visibility, optimization",
    accepted: true,
  },
  {
    id: "c3d4e5f6-78a9-4b2c-8d9e-3f4g5h6j7k8l",
    projectId: "e2f3g4h5-6i7j-8k9l-0m1n-2o3p4q5r6789",
    title: "Build Trust through Customer Testimonials",
    description: "Using testimonials to build brand trust and credibility.",
    prompt: "Develop a strategy to gather and use customer testimonials.",
    marketingFunnel: "Consideration",
    type: "Trust-Building",
    keywords: "testimonials, trust, credibility",
    accepted: false,
  },
  {
    id: "f4g5h6j7-8k9l-0m1n-2o3p-5q6r7s8t9u0v",
    projectId: "7f8e9d10-4f32-4d6a-bb8c-8e9e0c91a234",
    title: "Encourage Sign-Ups through Limited-Time Offers",
    description:
      "Limited-time offers as a strategy to encourage user sign-ups.",
    prompt: "Suggest limited-time offers that can drive sign-ups effectively.",
    marketingFunnel: "Decision",
    type: "Offer Strategy",
    keywords: "sign-ups, limited-time, offers",
    accepted: true,
  },
];

interface Props {
  step: number;
  setStep: (step: number) => void;
}



export default function OnboardingForm({ step, setStep }: Props) {
  const [website, setWebsite] = useState("");
  const { projectId } = useParams();
  const { toast } = useToast();

  const [targetAudience, setTargetAudience] = useState<any>([]);
  const [brandVoice, setBrandVoice] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  const { data, isPending, mutateAsync } = useMutation({
    mutationKey: ["onboard", "project", projectId],
    mutationFn: onboardProject,
    onError: (error) => {
      console.error(error);
      toast({
        title: "Something went wrong with fetching your website data",
        description: "Please try a different website or contact support.",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: addCompetition } = useMutation({
    mutationKey: ["onboard", "project", projectId, "competitors"],
    mutationFn: onboardProjectCompetitors,
    onError: (error) => {
      console.error(error);
      toast({
        title: "Something went wrong with adding competitors",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    },
  });
  const { mutateAsync: updateProjectFn } = useMutation({
    mutationKey: ["onboard", "project", projectId, "competitors"],
    mutationFn: updateProject,
    onError: (error) => {
      console.error(error);
      toast({
        title: "Something went wrong with updating project",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    },
  });

  function isValidURL(url) {
    // Regular expression to validate the URL format
    const urlPattern =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    return urlPattern.test(url);
  }

  function normalizeURL(url) {
    // Trim any whitespace from the URL
    url = url.trim();
    // console.log(url);
    // Check if the URL is valid
    if (!isValidURL(url)) {
      toast({
        title: "Invalid URL",
        variant: "destructive",
      });
      return undefined;
    }

    // Check if the URL starts with https
    if (!/^https:\/\//i.test(url)) {
      // If it starts with http or does not start with http/https, convert to https
      if (/^http:\/\//i.test(url)) {
        toast({
          title: "Only HTTPS URLs are supported",
          variant: "destructive",
        });
        return undefined;
      }

      // If it doesn't start with http or https, add https:// to the beginning
      url = "https://" + url;
    }
    setWebsite(url);
    // Return the normalized URL
    return url;
  }
  async function handleSubmit() {
    const url = normalizeURL(website);
    if (url) {
      await mutateAsync({ projectId, websiteUrl: url })
        .then((res) => {
          console.log(res);
          setTargetAudience(res.targetAudience.split(","));

          setBrandVoice(res.brandVoice);

          setStep(step + 1);
          return res;
        })
        .catch((e) => console.error(e));
    }
  }
  // console.log(
  //   data.targetAudience.split(",").map((e) => {
  //     return { value: e, label: e };
  //   })
  // );
  if (step == 0)
    return (
      <Step0
        website={website}
        setWebsite={setWebsite}
        onSubmit={() => {
          handleSubmit();
        }}
        isPending={isPending}
      />
    );
  else if (step == 1) {
    return (
      <Step1
        onNext={() => {
          // console.log(competitors);
          if (competitors.length > 0) {
            addCompetition({ projectId, competitors });
          }
          setStep(step + 1);
        }}
        step={step}
        setStep={setStep}
        data={data?.competitors}
        setCompetitors={setCompetitors}
      />
    );
  } else if (step == 2) {
    return (
      <Step2
        targetAudience={targetAudience}
        setTargetAudience={setTargetAudience}
        setBrandVoice={setBrandVoice}
        brandVoice={brandVoice}
        onNext={() => {
          updateProjectFn({
            projectId,
            targetAudience: targetAudience
              .join(",")
              .map((e: string) => e.trim()),
            brandVoice,
          });
          setStep(step + 1);
        }}
      />
    );
  } else if (step == 3) {
    return <Step3 projectId={projectId} />;
  } else return <div></div>;
}

const Step0 = ({ onSubmit, website, setWebsite, isPending }) => {
  return (
    <div className=" flex   flex-col md:min-w-[730px] justify-center  gap-10 h-full">
      {isPending ? (
        <BorderTrail
          className={cn(
            "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-100"
          )}
          size={200}
          transition={{
            ease: [0, 0.5, 0.8, 0.5],
            duration: 4,
            repeat: 40,
          }}
        />
      ) : null}
      {isPending ? (
        <LoadingOnboardingText />
      ) : (
        <>
          <div className="md:space-y-4">
            <div className="space-y-1">
              <h1 className=" text-lg  md:text-2xl font-semibold font-sans">
                Let’s Start by Getting to Know You
              </h1>
              <p className="text-slate-600">
                To help us understand your business, please provide your website
                link. <br /> You can also share documentation link or any other
                resource that will help us understand your business better.
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className=" flex items-center justify-between">
                <Label>Website link</Label>
                <p className="text-xs text-slate-500">
                  Only HTTPS URLs are supported.
                </p>
              </div>
              <Input
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    onSubmit();
                  }
                }}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="  bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
                placeholder="company.xyz"
              />
            </div>
          </div>
          <div className=" flex justify-end md:mt-20">
            <Button disabled={isPending} className="px-8 " onClick={onSubmit}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const Step1 = ({ onNext, step, setStep, data, setCompetitors }) => {
  return (
    <div className=" flex relative flex-col justify-center gap-10 h-full">
      <div className="md:space-y-4">
        <div className="space-y-1">
          <h1 className=" text-lg  md:text-2xl font-semibold font-sans">
            Explore Similar Businesses & Products
          </h1>
          <p className="text-slate-500">
            We’re gathering a list of your top competitors to compare content
            strategies, strengths, and opportunities.
          </p>
          <p className="text-slate-500 pt-8">
            Select the businesses and products that are most similar to yours.
          </p>
        </div>
        <div className="flex items-center">
          <CompetitorsTable
            data={data.map((item: any, i: number) => {
              item.id = i;
              return item;
            })}
            setCompetitors={setCompetitors}
          />
        </div>
      </div>
      <div className=" flex justify-end gap-3">
        <Button
          variant="ghost"
          className="px-8"
          onClick={() => setStep(step + 1)}
        >
          Skip
        </Button>
        <Button
          className="px-8"
          onClick={() => {
            onNext();
            //setStep(step + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Step2 = ({
  targetAudience,
  setTargetAudience,
  setBrandVoice,
  brandVoice,
  onNext,
}) => {
  console.log(targetAudience);
  return (
    <div className=" flex flex-col justify-center gap-10 h-full">
      <div className="md:space-y-4">
        <div className="space-y-1">
          <h1 className=" text-lg  md:text-2xl font-semibold font-sans">
            Your Unique Brand Voice & Audience
          </h1>
          <p className="text-slate-600">
            Here’s an overview of your brand’s content style and target audience
            based on your website. Let us know if we’re right.
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex  items-center justify-between">
            <Label>Target audience</Label>
            <p className="text-xs text-slate-600">Max 3 audience</p>
          </div>

          <MultipleSelector
            maxLength={3}
            totalList={targetAudienceList}
            frameworks={targetAudience}
            setFrameworks={setTargetAudience}
            placeholder={"Search audience..."}
            noItemsFoundPlaceholder={"No audience found"}
          />
        </div>
        <div className="space-y-1">
          <Label>Brand voice</Label>
          <Input
            value={brandVoice}
            maxLength={75}
            onChange={(e) => setBrandVoice(e.target.value)}
            className=" bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
            placeholder="Informal, friendly, and helpful"
          />
        </div>
      </div>
      <div className=" flex justify-end">
        <Button
          className="px-2"
          onClick={() => {
            onNext();
            // navigate("/project/" + projectId + "");
          }}
        >
          Ready to Take Off
        </Button>
      </div>
    </div>
  );
};

const Step3 = ({ projectId }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col justify-center gap-10 h-full">
      <div className="md:space-y-6">
        <div className="space-y-1">
          <h1 className=" text-lg text-center md:text-2xl font-semibold font-sans">
            We've generated some ideas for you!
          </h1>
          <p className="text-slate-500 text-center ">
            We will generate some more ideas for you in a few minutes once we
            have processed your data.
          </p>
        </div>
        <div className="flex items-center">
          <AnimatedGroup
            className="grid grid-cols-1 gap-4 md:grid-cols-3 "
            preset="scale"
          >
            {dummyRecommendations.slice(0, 6).map((idea) => (
              <SingleIdea item={idea} key={idea.id} />
            ))}
          </AnimatedGroup>
        </div>
      </div>
      <div className=" flex  justify-center gap-3">
        <Button
          variant="link"
          className="px-8"
          onClick={() => navigate("/project/" + projectId)}
        >
          Take me to dashboard <ArrowRight size={16} className="mx-2" />
        </Button>
      </div>
    </div>
  );
};
