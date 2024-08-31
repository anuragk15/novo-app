import EditorFn from "@/components/ui/editor";
import DocNavbar from "@/components/ui/EditorElements/Navbar";
// import { Spinner } from "@/components/ui/spinner";

export default function DocumentEditorScreen() {
  return (
    <div>
      <div className=" flex flex-col  md:px-2">
        <DocNavbar />
        <EditorFn />
      </div>
    </div>
  );
}
