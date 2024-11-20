import { getProjectById, updateProject } from "@/api/functions/projects";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultipleSelector } from "@/components/ui/multi-select";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import {
  contentTypesList,
  industryList,
  targetAudienceList,
} from "@/lib/constants";
import { capitalizeFirstCharacter } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CustomiseIdeasScreen() {
  const { projectId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["get", "projects", projectId],
    queryFn: () => getProjectById({ projectId }),
  });
  const { toast } = useToast();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update", "project", projectId],
    mutationFn: updateProject,
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your recommendation preferences have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const [settings, setSettings] = useState({
    brandVoice: data?.data?.project?.brandVoice || "",
    targetAudience:
      data?.data?.project?.targetAudience?.split(",") || ([] as string[]),
    keywords: data?.data?.project?.keywords || "",
    contentTypes:
      data?.data?.project?.contentTypes?.split(",") || ([] as string[]),
    industryFocus:
      data?.data?.project?.industryFocus?.split(",") || ([] as string[]),
    tonePreference: data?.data?.project?.tonePreference || "",
  });
  const [keywordsField, setKeywordsField] = useState("");

  const handleSubmit = async () => {
    console.log(settings);

    try {
      const payload = {
        brandVoice: settings.brandVoice,
        targetAudience: settings.targetAudience.join(","),
        keywords: settings.keywords,
        contentTypes: settings.contentTypes.join(","),
        industryFocus: settings.industryFocus.join(","),
        marketingFunnel: settings.tonePreference,
      };
      await mutateAsync({
        projectId,
        ...payload,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex bg-slate-100">
      <div className="hidden md:block">
        <Sidebar projectId={projectId} />
      </div>
      <div className="flex-col w-full md:min-w-[85vw] px-2 py-2 overflow-scroll h-screen bg-slate-100">
        <MobileSideBar projectId={projectId} />
        {isLoading ? (
          <div className="flex h-full w-full flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-6 min-h-[98vh]  mx-auto px-8 pt-8 bg-white rounded-lg border shadow-sm">
            <div>
              <h1 className="text-3xl font-bold">Customise Recommendations</h1>
              <p className="text-slate-500 mt-2">
                Tailor your content recommendations by adjusting these
                parameters
              </p>
            </div>

            <div
              onSubmit={handleSubmit}
              className="gap-6 flex h-full flex-col justify-between"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brandVoice">Brand Voice</Label>
                  <Input
                    maxLength={140}
                    id="brandVoice"
                    placeholder="Describe your brand's voice (e.g., professional, casual, friendly)"
                    value={settings.brandVoice}
                    onChange={(e) =>
                      setSettings({ ...settings, brandVoice: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <MultipleSelector
                    maxLength={3}
                    totalList={targetAudienceList}
                    frameworks={settings.targetAudience}
                    setFrameworks={(value) =>
                      setSettings({ ...settings, targetAudience: value })
                    }
                    placeholder="Search audience..."
                    noItemsFoundPlaceholder="No audience found"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Focus Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="Enter keywords separated by commas"
                    value={keywordsField}
                    onChange={(e) => {
                      if (e.target.value.at(-1) == ",") {
                        const currentKeywords = settings.keywords.split(',').filter(k => k.trim());
                        if (currentKeywords.length >= 10) {
                          toast({
                            title: "Error",
                            description: "You can only have up to 10 keywords.",
                            variant: "destructive",
                          });
                          return;
                        }
                        setSettings({ ...settings, keywords: settings.keywords + e.target.value });
                        setSettings({ ...settings, keywords: e.target.value });
                        setKeywordsField("");
                      } else {
                        setKeywordsField(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSettings({
                          ...settings,
                          keywords: settings.keywords + "," + keywordsField,
                        });
                        setKeywordsField("");
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {settings.keywords?.split(",").map(
                      (keyword, index) =>
                        keyword.trim() && (
                          <div
                            key={index}
                            className="bg-slate-100 px-2 py-1 rounded-lg text-sm flex items-center gap-1"
                          >
                            {keyword.trim()}
                            <button
                              type="button"
                              onClick={() => {
                                const newKeywords = settings.keywords
                                  .split(",")
                                  .filter((_, i) => i !== index)
                                  .join(",");
                                setSettings({
                                  ...settings,
                                  keywords: newKeywords,
                                });
                              }}
                              className="hover:text-red-500 ml-1"
                            >
                              ×
                            </button>
                          </div>
                        )
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="contentTypes">Preferred Content Types</Label>
                  <MultipleSelector
                    maxLength={5}
                    totalList={contentTypesList}
                    frameworks={settings.contentTypes}
                    setFrameworks={(value) =>
                      setSettings({ ...settings, contentTypes: value })
                    }
                    placeholder="Select content types..."
                    noItemsFoundPlaceholder="No content types found"
                  />
                </div>

                <div>
                  <Label htmlFor="industryFocus">Industry Focus</Label>
                  <MultipleSelector
                    maxLength={3}
                    totalList={industryList}
                    frameworks={settings.industryFocus}
                    setFrameworks={(value) =>
                      setSettings({ ...settings, targetAudience: value })
                    }
                    placeholder="Select industry..."
                    noItemsFoundPlaceholder="No industry found"
                  />
                </div>

                <div>
                  <Label htmlFor="tonePreference">
                    How Product-Centric Should Your Content Be?
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {settings.tonePreference
                          ? capitalizeFirstCharacter(settings.tonePreference)
                          : "Select product focus level..."}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[230px] md:w-[500px]">
                      <DropdownMenuRadioGroup
                        value={settings.tonePreference}
                        onValueChange={(value) =>
                          setSettings({ ...settings, tonePreference: value })
                        }
                      >
                        <DropdownMenuRadioItem
                          value="very-low"
                          className="flex flex-col cursor-pointer items-start"
                        >
                          <span className="font-medium">
                            Very Low Product Focus
                          </span>
                          <p className="text-sm text-muted-foreground">
                            Focus mostly on industry trends and educational
                            content, with minimal product mentions.
                          </p>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="low"
                          className="flex flex-col cursor-pointer items-start"
                        >
                          <span className="font-medium">Low Product Focus</span>
                          <p className="text-sm text-muted-foreground">
                            Prioritize industry insights but include occasional
                            product-related ideas.
                          </p>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="balanced"
                          className="flex flex-col cursor-pointer items-start"
                        >
                          <span className="font-medium">Balanced</span>
                          <p className="text-sm text-muted-foreground">
                            Blend industry trends with content that highlights
                            your product as a solution.
                          </p>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="high"
                          className="flex flex-col cursor-pointer items-start"
                        >
                          <span className="font-medium">
                            High Product Focus
                          </span>
                          <p className="text-sm text-muted-foreground">
                            Highlight the product in most content while tying it
                            to relevant industry use cases.
                          </p>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="very-high"
                          className="flex flex-col cursor-pointer items-start"
                        >
                          <span className="font-medium">
                            Very High Product Focus
                          </span>
                          <p className="text-sm text-muted-foreground">
                            Focus entirely on the product, emphasizing features,
                            benefits, and promotions.
                          </p>
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Button
                disabled={isLoading || isPending}
                onClick={handleSubmit}
                className="flex self-start"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
