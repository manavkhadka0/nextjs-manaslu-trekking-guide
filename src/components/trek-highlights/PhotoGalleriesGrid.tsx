import { TrekHighlight } from "@/lib/sanity/queries/trekHighlightQueries";
import PhotoGalleryCard from "./PhotoGalleryCard";
import { CameraIcon } from "lucide-react";

interface PhotoGalleriesGridProps {
  galleries: TrekHighlight[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const PhotoGalleriesGrid = ({
  galleries,
  title = "Photo Galleries",
  subtitle = "Explore the beauty of the Manaslu Circuit through my lens",
  className = "",
}: PhotoGalleriesGridProps) => {
  if (!galleries || galleries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No photo galleries available yet.
        </p>
      </div>
    );
  }

  return (
    <section className={`py-24 relative ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <CameraIcon className="h-4 w-4 mr-1.5" />
            <span>Trek Photos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {title} <span className="text-primary">Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <PhotoGalleryCard key={gallery._id} highlight={gallery} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGalleriesGrid;
