import { Loader as LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center pt-8">
      <LoaderIcon className="animate-spin" size={50} />
    </div>
  );
}
