import { Spinner } from "./spinner";

export default function LoadingState() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Spinner size="large" />
    </div>
  );
}
