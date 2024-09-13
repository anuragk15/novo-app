import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import { TextEffect } from "../ui/text-effect";
import { Check } from "lucide-react";
export function OnboardingOverviewContent() {
  return (
    <div className="relative w-full">
      <Carousel>
        <CarouselContent className="max-w-[523px] ">
          <CarouselItem>
            <div className="flex aspect-square  flex-col rounded-xl items-center justify-between ">
              <div className="flex flex-1 w-full justify-center  rounded-md items-center bg-gradient-to-b from-blue-400 via-blue-50 to-white ">
                <div className=" space-y-4">
                  <TextEffect
                    className=" text-center text-5xl font-brand"
                    delay={1.3}
                    per="char"
                    preset="blur"
                  >
                    Novo
                  </TextEffect>
                  <TextEffect
                    className=" text-center text-xl font-sans"
                    delay={1.9}
                    per="char"
                    preset="scale"
                  >
                    Where AI Meets Effortless Writing
                  </TextEffect>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <h1 className=" text-2xl font-medium font-sans">Welcome</h1>
                <p className=" font-sans">
                  Novo is more than just a text editor—it's an AI-powered
                  workspace.
                  <br />
                  With built-in templates for faster content generation and
                  smart, context-aware suggestions, Novo helps you create
                  high-quality content effortlessly.
                  <br />
                  <br />
                  Let’s get started!
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex aspect-square flex-col rounded-xl items-center justify-between ">
              <div className="flex flex-1 w-full justify-center  rounded-md items-center bg-gradient-to-b from-purple-400 via-blue-50 to-white ">
                <div className=" space-y-4">
                  <TextEffect
                    className=" text-center text-5xl font-brand"
                    delay={1.3}
                    per="char"
                    preset="blur"
                  >
                    Contextual Suggestions
                  </TextEffect>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <h1 className=" text-xl font-medium font-sans">
                  Novo learns from your documents
                </h1>

                <p className=" font-sans">
                  Novo analyses your content and provides context-aware
                  suggestions as you write.
                  <br />
                  From improving sentences to offering relevant insights, Novo
                  will assist you in creating your best work.
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex aspect-square flex-col rounded-xl items-center justify-between ">
              <div className="flex flex-1 w-full justify-center  rounded-md items-center bg-gradient-to-b from-yellow-100 via-blue-50 to-white ">
                <div className=" space-y-4">
                  <TextEffect
                    className=" text-center text-5xl font-brand"
                    delay={1.5}
                    per="char"
                    preset="blur"
                  >
                    Less Clutter.
                  </TextEffect>
                  <TextEffect
                    className=" text-center text-5xl font-brand"
                    delay={1.5}
                    per="char"
                    preset="blur"
                  >
                    More Creativity.
                  </TextEffect>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <h1 className=" text-xl font-medium font-sans">
                  Experience a seamless writing environment
                </h1>

                <p className=" font-sans">
                  With rich formatting options, intuitive shortcuts, and
                  distraction-free interface, Novo ensures that every word flows
                  perfectly. Whether you're drafting documents or polishing
                  content, our editor adapts to your needs.
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex aspect-square flex-col rounded-xl items-center justify-between ">
              <div className="flex flex-1 w-full justify-center  rounded-md items-center bg-gradient-to-b from-yellow-100 via-blue-50 to-white ">
                <div className=" space-y-4">
                  <TextEffect
                    className=" text-center text-5xl font-brand"
                    delay={1.5}
                    per="char"
                    preset="blur"
                  >
                    Bring your team to the party.
                  </TextEffect>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <h1 className=" text-xl font-medium font-sans">
                  Collaborate & Organise
                </h1>

                <p className=" font-sans">
                  Invite team members, share documents, and collaborate. You can
                  also tag and organise your documents with ease.
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex aspect-square flex-col rounded-xl items-center justify-between ">
              <div className="flex flex-1 w-full justify-center  rounded-md items-center bg-gradient-to-b from-blue-300 via-blue-50 to-white ">
                <div className=" bg-white p-10 rounded-2xl border shadow-xl">
                  <Check size={50} color="gray" />
                </div>
              </div>
              <div className="space-y-3 p-5">
                <h1 className=" text-xl font-medium font-sans">
                  Start Creating
                </h1>

                <p className=" font-sans">
                  Now that you’re familiar with Novo’s features, it’s time to
                  dive in! Start by creating a project, upload some documents,
                  and let Novo assist you. Welcome again!
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNavigation alwaysShow />
        <CarouselIndicator />
      </Carousel>
    </div>
  );
}
