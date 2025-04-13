import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllActivities } from "@/lib/api/activity";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Activities & Treks | Manaslu Trekking Guide",
  description:
    "Explore our range of trekking activities, tours, and expeditions in the Himalayas. Find the perfect adventure for your next trip to Nepal.",
};

export const revalidate = 10;

export default async function ActivityPage() {
  const activities = await getAllActivities();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image
            src="/images/WhatsApp Image 2025-02-28 at 11.57.58 (1).jpeg"
            alt="Himalayan Mountains"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/20 backdrop-blur-sm">
            Explore Adventures
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Himalayan Treks & Activities
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Discover our carefully curated selection of treks, tours, and
            expeditions in the Himalayas. Find your perfect adventure with our
            expert guides.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-60">
                  <Image
                    src={activity.coverImg.url}
                    alt={activity.coverImg.alt || activity.activity_title}
                    fill
                    className="object-cover"
                  />
                  {activity.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      Featured
                    </Badge>
                  )}
                  {activity.priceSale &&
                    activity.priceSale < activity.price && (
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                        Sale
                      </Badge>
                    )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-gray-600">
                      {activity.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {activity.activity_title}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{activity.duration}</span>
                    </div>

                    {activity.trip_grade && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{activity.trip_grade}</span>
                      </div>
                    )}

                    {activity.max_group_size && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          Max {activity.max_group_size}
                        </span>
                      </div>
                    )}

                    {activity.best_time && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{activity.best_time}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">
                        {activity.ratings.toFixed(1)}
                      </span>
                    </div>

                    <div className="text-right">
                      {activity.priceSale &&
                      activity.priceSale < activity.price ? (
                        <>
                          <span className="text-gray-500 line-through text-sm mr-2">
                            ${activity.price}
                          </span>
                          <span className="text-primary font-bold">
                            ${activity.priceSale}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary font-bold">
                          ${activity.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link
                      href={`/activity/${activity.slug}`}
                      className="flex items-center justify-center gap-2"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
