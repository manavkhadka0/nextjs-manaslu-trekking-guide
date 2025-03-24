import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActivityBySlug } from "@/lib/api/activity";
import ActivityDetail from "@/components/activity/activity-detail";

interface ActivityPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) {
    return {
      title: "Activity Not Found | Manaslu Trekking Guide",
      description: "The requested activity could not be found.",
    };
  }

  return {
    title:
      activity.meta_title ||
      `${activity.activity_title} | Manaslu Trekking Guide`,
    description:
      activity.meta_description ||
      `Explore ${activity.activity_title} with Manaslu Trekking Guide. Duration: ${activity.duration}, Location: ${activity.location}.`,
    keywords: activity.meta_keywords || "",
  };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const activity = await getActivityBySlug(params.slug);

  if (!activity) {
    notFound();
  }

  return <ActivityDetail activity={activity} />;
}
