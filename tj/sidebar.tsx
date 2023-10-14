import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IChakraUiComponents } from "@/libraries/chakraui/utils/components";
import Link from "next/link";
import { LucideIcon, RocketIcon } from "lucide-react";

interface IUiComponents {
  name: string;
  link: string;
}
interface InitProps {
  name: string;
  link: string;
  icon: LucideIcon;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  components: IUiComponents[];
  location: string;
  init: InitProps[];
  UI: {
    framework: string;
    logo: string;
    brandColor: string;
    className?: string;
  };
}

export function Sidebar({
  className,
  UI,
  components,
  location,
  init,
}: SidebarProps) {
  return (
    <div className={cn("pb-12 sticky top-16", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight flex justify-start items-center gap-1">
            <img src={UI.logo} className="w-10 h-10" />
            <span className={cn("capitalize ", UI.className)}>
              {UI.framework}
            </span>
          </h2>
          <div className="space-y-1 mt-4">
            {init.map((component: InitProps, idx: number) => (
              <Link href={component.link} key={idx}>
                <Button
                  variant={location == component.link ? "default" : "link"}
                  className={cn(
                    "w-full justify-start font-youngSerif",
                    location == component.link
                      ? `bg-gradient-to-r from-${UI.brandColor} to-background font-bold text-white tracking-wide`
                      : ""
                  )}
                >
                  <component.icon className="mr-2" />
                  {component.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Components
          </h2>
          <div className="space-y-1">
            {components.map((component: IChakraUiComponents, idx: number) => (
              <Link key={idx} href={component.link}>
                <Button
                  variant="link"
                  className={cn(
                    "w-full justify-start py-0",
                    location == component.link
                      ? `bg-gradient-to-r from-${UI.brandColor} to-background  text-white tracking-wide`
                      : ""
                  )}
                >
                  <span>
                    {location == component.link && (
                      <span className={`mr-1`}>{">>"}</span>
                    )}
                    {component.name}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
