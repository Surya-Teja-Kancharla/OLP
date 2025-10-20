import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import api from "../services/api";

export default function CoursePlayer() {
  const [qs] = useSearchParams();
  const courseId = qs.get("course");
  const contentId = qs.get("content");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/courses/${courseId}/content/${contentId}`);
        setContent(res.data.data || res.data);
      } catch {
        alert("Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    if (courseId && contentId) load();
  }, [courseId, contentId]);

  if (loading) return <Layout><div className="p-6">Loading...</div></Layout>;
  if (!content) return <Layout><div className="p-6">Content not found.</div></Layout>;

  // If URL is an embeddable youtube link, embed, else show generic player
  const isYouTube = content.url && content.url.includes("youtube.com");
  const youtubeId = isYouTube ? new URL(content.url).searchParams.get("v") : null;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">{content.title}</h2>
        <div className="bg-black aspect-video rounded">
          {isYouTube && youtubeId ? (
            <iframe
              title="video"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              allowFullScreen
            />
          ) : content.url ? (
            <video controls className="w-full h-full">
              <source src={content.url} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="p-8 text-center text-white">No playable content</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
