import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Author {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  bio?: string;
}

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex-shrink-0">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full border-4 border-gray-100"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                {author.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-xl font-bold">{author.name}</h3>

            {author.bio ? (
              <p className="mt-2 text-gray-600">{author.bio}</p>
            ) : (
              <p className="mt-2 text-gray-600">
                Experienced trekking guide with extensive knowledge of the
                Manaslu region. Passionate about sharing Nepal&apos;s natural
                beauty and cultural heritage with visitors.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
