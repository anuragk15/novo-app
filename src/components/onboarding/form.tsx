/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MultipleSelector } from "../ui/multi-select";
import { CompetitorsTable } from "./competitorsTable";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";

interface Props {
  step: number;
  setStep: (step: number) => void;
}
const targetAudienceList = [
  { label: "Developers" },
  { label: "Students" },
  { label: "Designers" },
  { label: "Founders" },
  { label: "Marketers" },
  { label: "Entrepreneurs" },
  { label: "Product Managers" },
  { label: "Investors" },
  { label: "Freelancers" },
  { label: "Educators" },
  { label: "Researchers" },
  { label: "Consultants" },
  { label: "HR Professionals" },
  { label: "Content Creators" },
  { label: "Small Business Owners" },
  { label: "Corporate Executives" },
  { label: "Healthcare Professionals" },
  { label: "Engineers" },
  { label: "Sales Professionals" },
  { label: "Accountants" },
  { label: "Financial Analysts" },
  { label: "Lawyers" },
  { label: "Nonprofit Leaders" },
  { label: "Public Relations Specialists" },
  { label: "Customer Support Agents" },
  { label: "IT Administrators" },
  { label: "Data Scientists" },
  { label: "UX/UI Designers" },
  { label: "Digital Nomads" },
  { label: "Parents" },
  { label: "Young Professionals" },
  { label: "Environmental Advocates" },
  { label: "Public Policy Makers" },
  { label: "Supply Chain Managers" },
  { label: "Real Estate Agents" },
  { label: "Operations Managers" },
  { label: "Government Officials" },
  { label: "Journalists" },
  { label: "Venture Capitalists" },
  { label: "Artists" },
  { label: "Musicians" },
  { label: "Chefs" },
  { label: "Athletes" },
  { label: "Fitness Coaches" },
  { label: "Gamers" },
  { label: "Photographers" },
  { label: "Videographers" },
  { label: "Writers" },
  { label: "Podcasters" },
  { label: "Influencers" },
  { label: "Travelers" },
  { label: "Indie Hackers & Makers" },
  { label: "Interns" },
  { label: "Mental Health Professionals" },
  { label: "Software Architects" },
  { label: "Compliance Officers" },
  { label: "Logistics Managers" },
  { label: "Social Workers" },
];

type TargetAudience =
  | "Developers"
  | "Students"
  | "Designers"
  | "Founders"
  | "Marketers"
  | "Entrepreneurs"
  | "Product Managers"
  | "Investors"
  | "Freelancers"
  | "Educators"
  | "Researchers"
  | "Consultants"
  | "HR Professionals"
  | "Content Creators"
  | "Small Business Owners"
  | "Corporate Executives"
  | "Healthcare Professionals"
  | "Engineers"
  | "Sales Professionals"
  | "Accountants"
  | "Financial Analysts"
  | "Lawyers"
  | "Nonprofit Leaders"
  | "Public Relations Specialists"
  | "Customer Support Agents"
  | "IT Administrators"
  | "Data Scientists"
  | "UX/UI Designers"
  | "Digital Nomads"
  | "Parents"
  | "Young Professionals"
  | "Environmental Advocates"
  | "Public Policy Makers"
  | "Supply Chain Managers"
  | "Real Estate Agents"
  | "Operations Managers"
  | "Government Officials"
  | "Journalists"
  | "Venture Capitalists"
  | "Artists"
  | "Musicians"
  | "Chefs"
  | "Athletes"
  | "Fitness Coaches"
  | "Gamers"
  | "Photographers"
  | "Videographers"
  | "Writers"
  | "Podcasters"
  | "Influencers"
  | "Travelers"
  | "Indie Hackers & Makers"
  | "Interns"
  | "Mental Health Professionals"
  | "Software Architects"
  | "Compliance Officers"
  | "Logistics Managers"
  | "Social Workers";

export default function OnboardingForm({ step, setStep }: Props) {
  const [website, setWebsite] = useState("");
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();
  const [targetAudience, setTargetAudience] = useState<TargetAudience[]>([]);
  const [brandVoice, setBrandVoice] = useState<string>("");
  const [competitors, setCompetitors] = useState<string[]>([]);
  function isValidURL(url) {
    // Regular expression to validate the URL format
    const urlPattern =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    return urlPattern.test(url);
  }

  function normalizeURL(url) {
    // Trim any whitespace from the URL
    url = url.trim();
    console.log(url);
    // Check if the URL is valid
    if (!isValidURL(url)) {
      toast({
        title: "Invalid URL",
        variant: "destructive",
      });
      return;
    }

    // Check if the URL starts with https
    if (!/^https:\/\//i.test(url)) {
      // If it starts with http or does not start with http/https, convert to https
      if (/^http:\/\//i.test(url)) {
        toast({
          title: "Only HTTPS URLs are supported",
          variant: "destructive",
        });
        return;
      }

      // If it doesn't start with http or https, add https:// to the beginning
      url = "https://" + url;
    }
    setWebsite(url);
    // Return the normalized URL
    return url;
  }

  if (step == 0)
    return (
      <div className=" flex flex-col md:min-w-[730px] justify-center  gap-10 h-full">
        <div className="md:space-y-4">
          <div className="space-y-1">
            <h1 className=" text-lg  md:text-2xl font-semibold font-sans">
              Let’s Start by Getting to Know You
            </h1>
            <p className="text-slate-600">
              To help us understand your brand, please provide your website
              link. <br /> You can also share documentation or any other
              resources that will help us understand your brand better.
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
              onPaste={(e) => {
                setTimeout(() => {
                  // @ts-ignore
                  normalizeURL(e.target.value);
                }, 300);
              }}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="  bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
              placeholder="company.xyz"
            />
          </div>
        </div>
        <div className=" flex justify-end md:mt-20">
          <Button className="px-8 " onClick={() => setStep(step + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  else if (step == 1) {
    return (
      <div className=" flex flex-col justify-center gap-10 h-full">
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
            <CompetitorsTable />
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
          <Button className="px-8" onClick={() => setStep(step + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  } else if (step == 2) {
    return (
      <div className=" flex flex-col justify-center gap-10 h-full">
        <div className="md:space-y-4">
          <div className="space-y-1">
            <h1 className=" text-lg  md:text-2xl font-semibold font-sans">
              Your Unique Brand Voice & Audience
            </h1>
            <p className="text-slate-600">
              Here’s an overview of your brand’s content style and target
              audience based on your website. Let us know if we’re right.
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
              navigate("/project/" + projectId + "");
            }}
          >
            Ready to Take Off
          </Button>
        </div>
      </div>
    );
  } else return <div></div>;
}
