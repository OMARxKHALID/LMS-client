import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomOut,
  ZoomIn,
} from "lucide-react";
import { useEffect } from "react";

const TopToolbar = ({ slots }) => (
  <div className="flex items-center justify-between w-full h-12 gap-2 px-2 py-1 bg-background">
    <div className="flex items-center gap-1">
      <slots.ZoomOut>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={props.onClick}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
        )}
      </slots.ZoomOut>
      <slots.CurrentScale>
        {(props) => (
          <span className="text-sm min-w-[35px] text-center">{`${Math.round(
            props.scale * 100
          )}%`}</span>
        )}
      </slots.CurrentScale>
      <slots.ZoomIn>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={props.onClick}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        )}
      </slots.ZoomIn>
    </div>
    <div className="flex items-center gap-1">
      <slots.Rotate>
        {(props) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            disabled={props.isDisabled}
            className="w-8 h-8 p-0"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        )}
      </slots.Rotate>
    </div>
  </div>
);

const BottomToolbar = ({ slots }) => (
  <div className="flex items-center justify-center w-full h-12 gap-2 px-2 py-1 border-b bg-background">
    <slots.GoToFirstPage>
      {(props) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={props.onClick}
          disabled={props.isDisabled}
          className="hidden w-8 h-8 p-0 sm:inline-flex"
        >
          <ChevronsLeft className="w-4 h-4" />
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
          className="w-8 h-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
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
          className="w-12 h-8 px-1 text-sm"
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
          className="w-8 h-8 p-0"
        >
          <ChevronRight className="w-4 h-4" />
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
          className="hidden w-8 h-8 p-0 sm:inline-flex"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      )}
    </slots.GoToLastPage>
  </div>
);

const PDFViewer = ({ pdfURL }) => {
  const scrollModePluginInstance = scrollModePlugin();

  useEffect(() => {
    const preventDefaultActions = (e) => e.preventDefault();
    const preventSelection = () => false;

    // Prevent various actions
    document.addEventListener("contextmenu", preventDefaultActions);
    document.addEventListener("selectstart", preventSelection);
    document.addEventListener("keydown", (e) => {
      if (
        (e.ctrlKey && (e.key === "p" || e.key === "P")) ||
        e.key === "PrintScreen"
      ) {
        preventDefaultActions(e);
      }
    });
    document.addEventListener("copy", preventDefaultActions);
    document.addEventListener("cut", preventDefaultActions);
    document.addEventListener("paste", preventDefaultActions);

    return () => {
      document.removeEventListener("contextmenu", preventDefaultActions);
      document.removeEventListener("selectstart", preventSelection);
      document.removeEventListener("copy", preventDefaultActions);
      document.removeEventListener("cut", preventDefaultActions);
      document.removeEventListener("paste", preventDefaultActions);
    };
  }, []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => (
          <div
            className="flex flex-col w-full select-none"
            style={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          >
            <TopToolbar slots={{ ...slots }} />
            <BottomToolbar slots={{ ...slots }} />
          </div>
        )}
      </Toolbar>
    ),
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="h-[calc(100vh-130px)] sm:h-[calc(100vh-100px)] border select-none">
        <Viewer
          fileUrl={pdfURL}
          plugins={[defaultLayoutPluginInstance, scrollModePluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
        />
      </div>
    </Worker>
  );
};

export default PDFViewer;
