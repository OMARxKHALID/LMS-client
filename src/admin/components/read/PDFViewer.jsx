import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RotateCw,
  Printer,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomOut,
  ZoomIn,
} from "lucide-react";

const CustomToolbar = ({ slots }) => (
  <div className="flex flex-wrap items-center justify-between w-full px-2 py-1 bg-background border-b gap-2">
    <div className="flex items-center gap-1">
      <slots.ZoomOut>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 px-0 hidden md:inline-flex sm:inline-flex"
            onClick={props.onClick}
          >
            <ZoomOut className="h-8 w-8" />
          </Button>
        )}
      </slots.ZoomOut>
      <slots.CurrentScale>
        {(props) => (
          <span className="text-sm min-w-[35px] text-center hidden sm:inline-flex">{`${Math.round(
            props.scale * 100
          )}%`}</span>
        )}
      </slots.CurrentScale>
      <slots.ZoomIn>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 px-0 hidden md:inline-flex sm:inline-flex"
            onClick={props.onClick}
          >
            <ZoomIn className="h-8 w-8" />
          </Button>
        )}
      </slots.ZoomIn>
    </div>
    <div className="flex items-center gap-1 flex-grow justify-center">
      <slots.GoToFirstPage>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="h-8 w-8 px-0 hidden sm:inline-flex"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}
      </slots.GoToFirstPage>
      <slots.GoToPreviousPage>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="h-8 w-8 px-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
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
            className="w-12 h-8 text-sm px-1"
          />
        )}
      </slots.CurrentPageInput>
      <span className="text-sm">/</span>
      <slots.NumberOfPages>
        {(props) => <span className="text-sm">{props.numberOfPages}</span>}
      </slots.NumberOfPages>
      <slots.GoToNextPage>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="h-8 w-8 px-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </slots.GoToNextPage>
      <slots.GoToLastPage>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="h-8 w-8 px-0 hidden sm:inline-flex"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </slots.GoToLastPage>
    </div>
    <div className="flex items-center gap-1">
      <slots.Rotate>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="h-8 w-8 px-0 hidden sm:inline-flex"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        )}
      </slots.Rotate>
      <slots.Print>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="h-8 w-8 px-0 hidden sm:inline-flex"
          >
            <Printer className="h-4 w-4" />
          </Button>
        )}
      </slots.Print>
    </div>
  </div>
);

const PDFViewer = ({ pdfURL }) => {
  const scrollModePluginInstance = scrollModePlugin();

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar: (Toolbar) => (
      <Toolbar>{(slots) => <CustomToolbar slots={{ ...slots }} />}</Toolbar>
    ),
  });

  const toolbarPluginInstance = toolbarPlugin();

  return (
    <div className="overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="h-[calc(100vh-130px)] sm:h-[calc(100vh-100px)]">
          <Viewer
            fileUrl={pdfURL}
            plugins={[
              defaultLayoutPluginInstance,
              toolbarPluginInstance,
              scrollModePluginInstance,
            ]}
            defaultScale={SpecialZoomLevel.PageFit}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PDFViewer;
