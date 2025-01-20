import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Fullscreen,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ScrollMode } from "@react-pdf-viewer/core";

const ScrollModeSelect = ({ switchScrollMode }) => (
  <Select
    onValueChange={(value) => switchScrollMode(value)}
    defaultValue={ScrollMode.Vertical.toString()}
  >
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select scroll mode" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value={ScrollMode.Vertical.toString()}>Vertical</SelectItem>
      <SelectItem value={ScrollMode.Horizontal.toString()}>
        Horizontal
      </SelectItem>
      <SelectItem value={ScrollMode.Wrapped.toString()}>Wrapped</SelectItem>
      <SelectItem value={ScrollMode.Page.toString()}>Page</SelectItem>
    </SelectContent>
  </Select>
);

// Original design (slightly modified)
const OriginalDesign = (slots) => (
  <div className="flex items-center justify-between px-4 py-2 bg-background border-b">
    <div className="flex items-center space-x-2">
      <slots.ZoomOut>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <ZoomOut className="h-4 w-4 mr-1" />
            Zoom Out
          </Button>
        )}
      </slots.ZoomOut>
      <slots.CurrentScale>
        {(props) => (
          <span className="text-sm font-medium min-w-[60px] text-center">{`${Math.round(
            props.scale * 100
          )}%`}</span>
        )}
      </slots.CurrentScale>
      <slots.ZoomIn>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom In
          </Button>
        )}
      </slots.ZoomIn>
    </div>
    <div className="flex items-center space-x-2">
      <slots.GoToFirstPage>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            First
          </Button>
        )}
      </slots.GoToFirstPage>
      <slots.CurrentPageInput>
        {(props) => (
          <Input
            type="number"
            min={1}
            max={props.numberOfPages}
            value={props.pageIndex + 1}
            onChange={(e) =>
              props.goToPage(Number.parseInt(e.target.value, 10) - 1)
            }
            className="w-16 h-8"
          />
        )}
      </slots.CurrentPageInput>
      <span className="text-sm font-medium">/</span>
      <slots.NumberOfPages />
      <slots.GoToNextPage>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            Next
          </Button>
        )}
      </slots.GoToNextPage>
    </div>
    <div className="flex items-center space-x-2">
      <slots.Rotate>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <RotateCw className="h-4 w-4 mr-1" />
            Rotate
          </Button>
        )}
      </slots.Rotate>
      <slots.EnterFullScreen>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <Fullscreen className="h-4 w-4 mr-1" />
            Full Screen
          </Button>
        )}
      </slots.EnterFullScreen>
      <slots.Print>
        {(props) => (
          <Button
            variant="outline"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        )}
      </slots.Print>
      <ScrollModeSelect
        SwitchScrollMode={slots.SwitchScrollMode}
        switchScrollMode={slots.switchScrollMode}
      />
    </div>
  </div>
);

// Compact design
const CompactDesign = (slots) => (
  <TooltipProvider>
    <div className="flex items-center justify-between px-2 py-1 bg-background border-b">
      <div className="flex items-center space-x-1">
        <slots.ZoomOut>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          )}
        </slots.ZoomOut>
        <slots.CurrentScale>
          {(props) => (
            <span className="text-xs font-medium min-w-[40px] text-center">{`${Math.round(
              props.scale * 100
            )}%`}</span>
          )}
        </slots.CurrentScale>
        <slots.ZoomIn>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          )}
        </slots.ZoomIn>
      </div>
      <div className="flex items-center space-x-1">
        <slots.GoToFirstPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>First Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToFirstPage>
        <slots.GoToPreviousPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToPreviousPage>
        <slots.CurrentPageInput>
          {(props) => (
            <Input
              type="number"
              min={1}
              max={props.numberOfPages}
              value={props.pageIndex + 1}
              onChange={(e) =>
                props.goToPage(Number.parseInt(e.target.value, 10) - 1)
              }
              className="w-12 h-6 text-xs"
            />
          )}
        </slots.CurrentPageInput>
        <span className="text-xs font-medium">/</span>
        <slots.NumberOfPages />
        <slots.GoToNextPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToNextPage>
        <slots.GoToLastPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Last Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToLastPage>
      </div>
      <div className="flex items-center space-x-1">
        <slots.Rotate>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rotate</TooltipContent>
            </Tooltip>
          )}
        </slots.Rotate>
        <slots.EnterFullScreen>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <Fullscreen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Full Screen</TooltipContent>
            </Tooltip>
          )}
        </slots.EnterFullScreen>
        <slots.Print>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print</TooltipContent>
            </Tooltip>
          )}
        </slots.Print>
        <ScrollModeSelect
          SwitchScrollMode={slots.SwitchScrollMode}
          switchScrollMode={slots.switchScrollMode}
        />
      </div>
    </div>
  </TooltipProvider>
);

// Minimal design
const MinimalDesign = (slots) => (
  <TooltipProvider>
    <div className="flex items-center justify-center px-2 py-1 bg-background border-b">
      <div className="flex items-center space-x-1">
        <slots.ZoomOut>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          )}
        </slots.ZoomOut>
        <slots.CurrentScale>
          {(props) => (
            <span className="text-xs font-medium min-w-[40px] text-center">{`${Math.round(
              props.scale * 100
            )}%`}</span>
          )}
        </slots.CurrentScale>
        <slots.ZoomIn>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          )}
        </slots.ZoomIn>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <slots.GoToPreviousPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToPreviousPage>
        <slots.CurrentPageInput>
          {(props) => (
            <Input
              type="number"
              min={1}
              max={props.numberOfPages}
              value={props.pageIndex + 1}
              onChange={(e) =>
                props.goToPage(Number.parseInt(e.target.value, 10) - 1)
              }
              className="w-12 h-6 text-xs"
            />
          )}
        </slots.CurrentPageInput>
        <span className="text-xs font-medium">/</span>
        <slots.NumberOfPages />
        <slots.GoToNextPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToNextPage>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <ScrollModeSelect
          SwitchScrollMode={slots.SwitchScrollMode}
          switchScrollMode={slots.switchScrollMode}
        />
      </div>
    </div>
  </TooltipProvider>
);

// Modern design
const ModernDesign = (slots) => (
  <TooltipProvider>
    <div className="flex flex-col items-center px-4 py-2 bg-background border-b">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center space-x-2">
          <slots.ZoomOut>
            {(props) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={props.onClick}
                    disabled={props.isDisabled}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
            )}
          </slots.ZoomOut>
          <slots.CurrentScale>
            {(props) => (
              <span className="text-sm font-medium min-w-[50px] text-center">
                {`${Math.round(props.scale * 100)}%`}
              </span>
            )}
          </slots.CurrentScale>
          <slots.ZoomIn>
            {(props) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={props.onClick}
                    disabled={props.isDisabled}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
            )}
          </slots.ZoomIn>
        </div>
        <div className="flex items-center space-x-2">
          <slots.Rotate>
            {(props) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={props.onClick}
                    disabled={props.isDisabled}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Rotate</TooltipContent>
              </Tooltip>
            )}
          </slots.Rotate>
          <slots.EnterFullScreen>
            {(props) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={props.onClick}
                    disabled={props.isDisabled}
                  >
                    <Fullscreen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Full Screen</TooltipContent>
              </Tooltip>
            )}
          </slots.EnterFullScreen>
          <slots.Print>
            {(props) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={props.onClick}
                    disabled={props.isDisabled}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Print</TooltipContent>
              </Tooltip>
            )}
          </slots.Print>
          <ScrollModeSelect
            SwitchScrollMode={slots.SwitchScrollMode}
            switchScrollMode={slots.switchScrollMode}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <slots.GoToFirstPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>First Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToFirstPage>
        <slots.GoToPreviousPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToPreviousPage>
        <slots.CurrentPageInput>
          {(props) => (
            <Input
              type="number"
              min={1}
              max={props.numberOfPages}
              value={props.pageIndex + 1}
              onChange={(e) =>
                props.goToPage(Number.parseInt(e.target.value, 10) - 1)
              }
              className="w-16 h-8 text-sm"
            />
          )}
        </slots.CurrentPageInput>
        <span className="text-sm font-medium">/</span>
        <slots.NumberOfPages />
        <slots.GoToNextPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToNextPage>
        <slots.GoToLastPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Last Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToLastPage>
      </div>
    </div>
  </TooltipProvider>
);

// Elegant design
const ElegantDesign = (slots) => (
  <TooltipProvider>
    <div className="flex items-center justify-between px-4 py-2 bg-background border-b">
      <div className="flex items-center space-x-2">
        <slots.ZoomOut>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <ZoomOut className="h-4 w-4 mr-1" />
                  Zoom Out
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          )}
        </slots.ZoomOut>
        <slots.CurrentScale>
          {(props) => (
            <span className="text-sm font-medium min-w-[60px] text-center text-primary">
              {`${Math.round(props.scale * 100)}%`}
            </span>
          )}
        </slots.CurrentScale>
        <slots.ZoomIn>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <ZoomIn className="h-4 w-4 mr-1" />
                  Zoom In
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          )}
        </slots.ZoomIn>
      </div>
      <div className="flex items-center space-x-2">
        <slots.GoToFirstPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>First Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToFirstPage>
        <slots.GoToPreviousPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToPreviousPage>
        <slots.CurrentPageInput>
          {(props) => (
            <Input
              type="number"
              min={1}
              max={props.numberOfPages}
              value={props.pageIndex + 1}
              onChange={(e) =>
                props.goToPage(Number.parseInt(e.target.value, 10) - 1)
              }
              className="w-16 h-8 text-sm border-primary text-primary"
            />
          )}
        </slots.CurrentPageInput>
        <span className="text-sm font-medium text-primary">/</span>
        <slots.NumberOfPages />
        <slots.GoToNextPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToNextPage>
        <slots.GoToLastPage>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Last Page</TooltipContent>
            </Tooltip>
          )}
        </slots.GoToLastPage>
      </div>
      <div className="flex items-center space-x-2">
        <slots.Rotate>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rotate</TooltipContent>
            </Tooltip>
          )}
        </slots.Rotate>
        <slots.EnterFullScreen>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <Fullscreen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Full Screen</TooltipContent>
            </Tooltip>
          )}
        </slots.EnterFullScreen>
        <slots.Print>
          {(props) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  className="text-primary"
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print</TooltipContent>
            </Tooltip>
          )}
        </slots.Print>
        <ScrollModeSelect
          SwitchScrollMode={slots.SwitchScrollMode}
          switchScrollMode={slots.switchScrollMode}
        />
      </div>
    </div>
  </TooltipProvider>
);

export const toolbarDesigns = [
  { name: "Original", component: OriginalDesign },
  { name: "Compact", component: CompactDesign },
  { name: "Minimal", component: MinimalDesign },
  { name: "Modern", component: ModernDesign },
  { name: "Elegant", component: ElegantDesign },
];
