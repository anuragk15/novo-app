import { useUser } from "@clerk/clerk-react";
// import EmptyHomescreen from "../home/ui/emptyHomeScreen";
import Calendar from "../ui/calendar-component";
import FilesCard from "./filesCard";
import UsageCard from "./knowledgeCard";
import RecommendationCard from "./recommendationCard";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";
import { Plus, Wand2 } from "lucide-react";
import AddSource from "../home/ui/addSource";

export default function DashboardHomeContents({ data, projectId }) {
  const { user } = useUser();

  // if (data?.length === 0) {
  //   return <EmptyHomescreen projectId={projectId} />;
  // }

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
      description:
        "Guide to improving SEO for better search engine visibility.",
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
      prompt:
        "Suggest limited-time offers that can drive sign-ups effectively.",
      marketingFunnel: "Decision",
      type: "Offer Strategy",
      keywords: "sign-ups, limited-time, offers",
      accepted: true,
    },
  ];

  return (
    <div className=" flex-col px-8 w-full pl-4 pb-2 overflow-scroll h-screen bg-slate-100">
      <div className="flex flex-col ">
        <div className="flex gap-2 flex-col md:flex-row pb-2 md:items-center">
          <p className="text-3xl font-sans font-medium py-4">
            {user?.firstName
              ? `How can Novo assist you today, ${user.firstName}?`
              : "How can Novo assist you today?"}
          </p>
          <div className="border gap-1 p-2  max-h-fit cursor-pointer group justify-center flex  items-center border-slate-300 hover:bg-slate-200 rounded-lg border-dashed">
            <Wand2
              size={16}
              className=" text-slate-700 group-hover:text-black"
            />
            <h1 className="hover:text-black text-slate-700  font-sans text-center">
              Ideas
            </h1>
          </div>
          <CreateNewDocumentPopup
            trigger={
              <div className="border gap-1 p-2  max-h-fit cursor-pointer group justify-center flex  items-center border-slate-300 hover:bg-slate-200 rounded-lg border-dashed">
                <Plus
                  size={16}
                  className=" text-slate-700 group-hover:text-black"
                />
                <h1 className="hover:text-black text-slate-700  font-sans text-center">
                  Create
                </h1>
              </div>
            }
          />
          <AddSource
            projectId={projectId}
            children={
              <div className="border gap-1 p-2  max-h-fit cursor-pointer group justify-center flex  items-center border-slate-300 hover:bg-slate-200 rounded-lg border-dashed">
                <h1 className="hover:text-black text-slate-700  font-sans text-center">
                  Add training material
                </h1>
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-4 w-full min-h-[90vh] gap-4 ">
          <div className=" md:col-span-3">
            <RecommendationCard ideas={dummyRecommendations} />
          </div>
          <div className="  md:col-span-1">
            <div className="bg-white border flex items-center rounded-lg h-full">
              <Calendar showControls={false} />
            </div>
          </div>
          <div className="  md:col-span-2">
            <FilesCard files={data} />
          </div>
          <div className="  md:col-span-2">
            <UsageCard />
          </div>
        </div>
      </div>
    </div>
  );
}
