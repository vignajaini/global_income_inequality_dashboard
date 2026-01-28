import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export const ZoomableImage = ({ src, alt }: ZoomableImageProps) => {
  return (
    <div className="glass rounded-2xl p-4 card-shadow">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controls */}
            <div className="flex gap-2 mb-4 justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={() => zoomIn()}
                className="rounded-full"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => zoomOut()}
                className="rounded-full"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => resetTransform()}
                className="rounded-full"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoomable Image */}
            <TransformComponent
              wrapperClass="!w-full"
              contentClass="!w-full"
            >
              <img
                src={src}
                alt={alt}
                className="w-full rounded-lg cursor-move"
              />
            </TransformComponent>

            {/* Instructions */}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              💡 Scroll to zoom • Drag to move • Use buttons for precise control
            </p>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
