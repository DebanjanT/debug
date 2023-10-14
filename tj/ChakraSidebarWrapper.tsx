import { useRouter } from "next/router";
import { Sidebar } from "@/components/core/_marketing/sidebar";
import { ChakraSidebarWrapperProps } from "@/types/chakraui";
import { chakraUiComponents } from "@/utils/components";
import { chakraInit } from "@/utils/init";
import WIP from "@/components/core/_marketing/WIP";

const ChakraSidebarWrapper = ({ children }: ChakraSidebarWrapperProps) => {
  const router = useRouter();
  return (
    <>
      <WIP />
      <div className="w-full h-full relative grid grid-cols-1 lg:grid-cols-5">
        <div className="col-span-1  relative border-r">
          <Sidebar
            UI={{
              framework: "Chakra",
              logo: "/chakra-icon.png",
              brandColor: "[#38B2AC]",
            }}
            components={chakraUiComponents}
            location={router.pathname}
            init={chakraInit}
            className=""
          />
        </div>
        <div className=" col-span-1 lg:col-span-4 h-full p-4">{children}</div>
      </div>
    </>
  );
};

export default ChakraSidebarWrapper;
