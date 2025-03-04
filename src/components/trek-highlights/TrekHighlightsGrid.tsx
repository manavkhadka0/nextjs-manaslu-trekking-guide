import { TrekHighlight } from "@/lib/sanity/queries/trekHighlightQueries";
import TrekHighlightCard from "./TrekHighlightCard";
import { VideoIcon, CameraIcon, ImageIcon } from "lucide-react";

interface TrekHighlightsGridProps {
  highlights: TrekHighlight[];
  title?: string;
  subtitle?: string;
  className?: string;
  showType?: "all" | "videos" | "photos";
}

const TrekHighlightsGrid = ({
  highlights,
  title = "Trek Highlights",
  subtitle = "Experience the journey through my lens",
  className = "",
  showType = "all",
}: TrekHighlightsGridProps) => {
  if (!highlights || highlights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No trek highlights available yet.
        </p>
      </div>
    );
  }

  // Filter highlights based on showType
  const filteredHighlights = highlights.filter((highlight) => {
    if (showType === "all") return true;
    if (showType === "videos") return !highlight.isPhotoGallery;
    if (showType === "photos") return highlight.isPhotoGallery;
    return true;
  });

  if (filteredHighlights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No {showType} available yet.</p>
      </div>
    );
  }

  // Determine the icon and title based on showType
  let icon = <VideoIcon className="h-4 w-4 mr-1.5" />;
  let typeLabel = "Trek Highlights";
  let titleSuffix = "Collection";

  if (showType === "videos") {
    icon = <VideoIcon className="h-4 w-4 mr-1.5" />;
    typeLabel = "Trek Videos";
    titleSuffix = "Videos";
  } else if (showType === "photos") {
    icon = <CameraIcon className="h-4 w-4 mr-1.5" />;
    typeLabel = "Trek Photos";
    titleSuffix = "Galleries";
  } else {
    icon = <ImageIcon className="h-4 w-4 mr-1.5" />;
    typeLabel = "Trek Media";
    titleSuffix = "Collection";
  }

  return (
    <section className={`py-24 relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {icon}
            <span>{typeLabel}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {title} <span className="text-primary">{titleSuffix}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHighlights.map((highlight) => (
            <TrekHighlightCard key={highlight._id} highlight={highlight} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekHighlightsGrid;
