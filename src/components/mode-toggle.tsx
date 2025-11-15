import { Monitor, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/useTheme"

type Theme = "light" | "dark" | "system"

const themes = [
  {
    name: "Light",
    value: "light",
    icon: Sun,
  },
  {
    name: "Dark",
    value: "dark",
    icon: Moon,
  },
  {
    name: "System",
    value: "system",
    icon: Monitor,
  },
] as const;

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
const ActiveIcon =
    themes.find((t) => t.value === theme)?.icon ?? Monitor;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <ActiveIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
       <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value as Theme)}>
            <t.icon className="mr-2 h-4 w-4" />
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}