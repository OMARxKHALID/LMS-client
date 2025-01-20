import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { RenderToolbar } from "./CustomToolbar";

const PDFViewer = ({ pdfURL }) => {
  const scrollModePluginInstance = scrollModePlugin();
  const { switchScrollMode, SwitchScrollMode } = scrollModePluginInstance;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar: (Toolbar) => (
      <RenderToolbar
        Toolbar={Toolbar}
        SwitchScrollMode={SwitchScrollMode}
        switchScrollMode={switchScrollMode}
      />
    ),
  });

  const toolbarPluginInstance = toolbarPlugin();

  return (
    <div className="border overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="h-[calc(100vh-130px)]">
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
