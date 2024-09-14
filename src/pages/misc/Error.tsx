import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ErrorScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/NotFound.svg" className="w-full max-w-[20rem]" />
      <div className=" space-y-2  flex flex-col justify-center">
        <h1 className="text-6xl text-center font-bold text-gray-800">Oops</h1>
        <p className="text-gray-800 text-center text-xl">
          Something went wrong. We're looking into it!
        </p>
        <div className="mx-auto my-3">
          <Button onClick={() => navigate("/")}>Go back to dashboard</Button>
        </div>
      </div>
    </div>
  );
}
