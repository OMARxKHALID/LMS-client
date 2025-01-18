import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ScrollMode } from "@react-pdf-viewer/scroll-mode";

import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, ArrowRight, Fullscreen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFViewerToolbar = ({ renderToolbar }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar,
  });

  const toolbarPluginInstance = toolbarPlugin({
    theme: {
      toolbar: {
        backgroundColor: "#f8f9fa",
        border: "none",
      },
    },
  });

  return { defaultLayoutPluginInstance, toolbarPluginInstance };
};

const RenderToolbar = (Toolbar) => (
  <Toolbar>
    {(slots) => {
      const {
        CurrentPageInput,
        GoToNextPage,
        NumberOfPages,
        CurrentScale,
        ZoomIn,
        ZoomOut,
        Print,
        EnterFullScreen,
        GoToFirstPage,
        Rotate,
      } = slots;

      return (
        <div className="flex items-center justify-between px-4 py-2 bg-background border-b">
          <div className="flex items-center space-x-2">
            <ZoomOut>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                  Zoom Out
                </Button>
              )}
            </ZoomOut>

            <CurrentScale>
              {(props) => (
                <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                  {`${Math.round(props.scale * 100)}%`}
                </span>
              )}
            </CurrentScale>

            <ZoomIn>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                  Zoom In
                </Button>
              )}
            </ZoomIn>
          </div>

          <div className="flex items-center">
            <GoToFirstPage>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Go to First Page"
                >
                  <ArrowLeft className="h-4 w-4" />
                  First
                </Button>
              )}
            </GoToFirstPage>

            <div className="flex items-center">
              <CurrentPageInput>
                {(props) => (
                  <input
                    className="text-muted-foreground border border-b"
                    type="number"
                    value={props.pageIndex + 1}
                    onChange={(e) =>
                      props.goToPage(parseInt(e.target.value) - 1)
                    }
                  />
                )}
              </CurrentPageInput>
              <span className="text-sm text-muted-foreground">/</span>
              <NumberOfPages />
            </div>

            <GoToNextPage>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Next Page"
                >
                  <ArrowRight className="h-4 w-4" />
                  Next
                </Button>
              )}
            </GoToNextPage>
          </div>

          <div className="flex items-center">
            <Rotate>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Rotate"
                >
                  <Rotate className="h-4 w-4" />
                  Rotate
                </Button>
              )}
            </Rotate>

            <EnterFullScreen>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Enter Full Screen"
                >
                  <Fullscreen className="h-4 w-4" />
                  Full Screen
                </Button>
              )}
            </EnterFullScreen>

            <Print>
              {(props) => (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={props.onClick}
                  disabled={props.isDisabled}
                  title="Print"
                >
                  Print
                </Button>
              )}
            </Print>
          </div>
        </div>
      );
    }}
  </Toolbar>
);

const PDFViewer = ({ pdfURL }) => {
  const { defaultLayoutPluginInstance, toolbarPluginInstance } =
    PDFViewerToolbar({
      renderToolbar: RenderToolbar,
      toolbarPlugin: {
        fullScreenPlugin: {
          onEnterFullScreen: (zoom) => {
            zoom(SpecialZoomLevel.PageFit);
            defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
              ScrollMode.Wrapped
            );
          },
          onExitFullScreen: (zoom) => {
            zoom(SpecialZoomLevel.PageWidth);
            defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
              ScrollMode.Horizontal
            );
          },
        },
      },
    });

  return (
    <div className="border overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="h-[calc(100vh-130px)]">
          <Viewer
            fileUrl={pdfURL}
            plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
            defaultScale={SpecialZoomLevel.ActualSize}
          />
        </div>
      </Worker>
    </div>
  );
};

const ReadBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { borrows } = useSelector((state) => state.borrow);
  const book = borrows.find((b) => b._id === id);
  const pdfURL = book?.borrowed_book?.pdf_files?.[0];

  if (!pdfURL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>PDF Not Available</AlertTitle>
          <AlertDescription>
            The PDF file for this book is not available.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {book?.borrowed_book?.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {book?.borrowed_book?.author}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <PDFViewer pdfURL={pdfURL} />
    </div>
  );
};

export default ReadBooks;
