import { useRef, useState, type PointerEvent } from "react";
import { ChevronsLeftRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import beforeTub from "@/assets/before-tub.webp";
import afterTub from "@/assets/after-tub.webp";

type FrameProps = {
  position: number;
  onChange: (value: number) => void;
  onEnlarge?: () => void;
};

function ComparisonFrame({ position, onChange, onEnlarge }: FrameProps) {
  const frame = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    onChange(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)));
  };

  return (
    <div ref={frame} className="relative h-full w-full overflow-hidden rounded-md border border-border bg-muted" role="group" aria-label="Tub and shower before and after remodeling">
      <img src={afterTub} alt="After remodeling: white tub, large-format veined tile, a wide built-in niche, brushed-gold rain shower and handheld, and recessed ceiling lights" width={768} height={1024} className="absolute inset-0 h-full w-full object-cover" decoding="async" loading="eager" />
      <img src={beforeTub} alt="Before remodeling: white bathtub with small square white wall tiles, basic chrome fixtures, and a worn terrazzo-style floor" width={768} height={1024} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} decoding="async" loading="eager" />
      {onEnlarge && (
        <Button variant="ghost" onClick={onEnlarge} aria-label="Enlarge tub before and after comparison" className="absolute inset-0 h-full w-full rounded-none p-0 hover:bg-transparent focus-visible:ring-inset">
          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-sm bg-background text-foreground shadow-sm">
            <Maximize2 className="h-4 w-4" />
          </span>
        </Button>
      )}
      <span className="pointer-events-none absolute left-3 top-3 bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-background shadow-sm" style={{ left: `${position}%` }} />
      <Button
        variant="outline"
        role="slider"
        aria-label="Before and after reveal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)} percent before`}
        aria-orientation="horizontal"
        title="Drag to compare"
        className="absolute top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full border-2 border-background bg-background p-0 text-foreground shadow-md hover:bg-muted"
        style={{ left: `${position}%` }}
        onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); move(event); }}
        onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event); }}
        onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onKeyDown={(event) => {
          const next = event.key === "ArrowLeft" ? position - 5 : event.key === "ArrowRight" ? position + 5 : event.key === "Home" ? 0 : event.key === "End" ? 100 : null;
          if (next === null) return;
          event.preventDefault();
          onChange(Math.max(0, Math.min(100, next)));
        }}
      >
        <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}

export function TubComparison() {
  const [position, setPosition] = useState(50);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="mx-auto aspect-[3/4] w-[260px] max-w-full sm:w-[300px] lg:w-[380px] xl:w-[400px]">
        <ComparisonFrame position={position} onChange={setPosition} onEnlarge={() => setOpen(true)} />
      </div>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[560px] gap-3 p-4 sm:p-5 motion-reduce:animate-none">
        <DialogTitle className="pr-8 text-base tracking-normal">Tub &amp; shower transformation</DialogTitle>
        <div className="mx-auto aspect-[3/4] w-[min(100%,56.25dvh)]">
          <ComparisonFrame position={position} onChange={setPosition} />
        </div>
      </DialogContent>
    </Dialog>
  );
}