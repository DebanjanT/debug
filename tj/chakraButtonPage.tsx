import { useRouter } from "next/router";
import ChakraSidebarWrapper from "../../libraries/chakraui/marketing/ChakraSidebarWrapper";
import ComponentHeader from "@/components/core/engine/ComponentHeader";
import { RotateCw } from "lucide-react";
import dynamic from "next/dynamic";
import LoadingEngine from "@/components/core/engine/LoadingState";

const Codeblock = dynamic(() => import("@/components/core/engine/Codeblock"), {
  loading: () => <LoadingEngine />,
  ssr: false,
});

const ChakraUiButton = () => {
  const router = useRouter();
  const codeString = `<button className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-1 text-sm rounded">
  Small
</button>

<button className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-2 py-1 rounded">
  Medium
</button>

<button className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-3 py-2 rounded">
  Large
</button>

<button
  className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-3 py-2 rounded disabled:bg-ckr-gray-500/50 shadow-inner shadow-ckr-gray-700 disabled:cursor-not-allowed"
  disabled
>
  Disabled
</button>

<button
  disabled
  className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-3 py-2 rounded flex-btn disabled:bg-ckr-gray-500/50 disabled:shadow-inner disabled:shadow-ckr-gray-700 disabled:cursor-not-allowed"
>
  <RotateCw absoluteStrokeWidth className="animate-spin" />
  Loading...
</button>`;
  return (
    <ChakraSidebarWrapper>
      <ComponentHeader
        deps={["lucide-react"]}
        title="Button"
        description="Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation."
      />
      <div className="flex flex-wrap justify-start items-center gap-3 mb-4">
        <button className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-1 text-sm rounded">
          Small
        </button>

        <button className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-2 py-1 rounded">
          Medium
        </button>

        <button className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-3 py-2 rounded">
          Large
        </button>

        <button
          className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-3 py-2 rounded disabled:bg-ckr-gray-500/50 shadow-inner shadow-ckr-gray-700 disabled:cursor-not-allowed"
          disabled
        >
          Disabled
        </button>

        <button
          disabled
          className="bg-ckr-teal-600 hover:bg-ckr-teal-700 text-white px-3 py-2 rounded flex-btn disabled:bg-ckr-gray-500/50 disabled:shadow-inner disabled:shadow-ckr-gray-700 disabled:cursor-not-allowed"
        >
          <RotateCw absoluteStrokeWidth className="animate-spin" />
          Loading...
        </button>
      </div>
      <Codeblock
        title="Icon Import"
        code={'import { RotateCw } from "lucide-react";'}
        language="javascript"
        className="text-[13px]"
      />
      <br />
      <Codeblock
        title="JSX"
        code={codeString}
        language="xml"
        className="text-[13px]"
      />
    </ChakraSidebarWrapper>
  );
};

export default ChakraUiButton;
