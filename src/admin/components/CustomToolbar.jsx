import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toolbarDesigns } from "./ToolbarDesigns";

export function RenderToolbar({ Toolbar, SwitchScrollMode, switchScrollMode }) {
  const [currentDesign, setCurrentDesign] = React.useState("Original");

  return (
    <Toolbar>
      {(slots) => (
        <div className="flex flex-col">
          <div className="p-2 bg-muted">
            <Select value={currentDesign} onValueChange={setCurrentDesign}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select design" />
              </SelectTrigger>
              <SelectContent>
                {toolbarDesigns.map((design) => (
                  <SelectItem key={design.name} value={design.name}>
                    {design.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {toolbarDesigns
            .find((design) => design.name === currentDesign)
            ?.component({ ...slots, SwitchScrollMode, switchScrollMode })}
        </div>
      )}
    </Toolbar>
  );
}
