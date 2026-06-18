import SectionHeader from "./SectionHeader";
import ReviewCard from "./ReviewCard";

export default function TestimonialsSection({ reviews, content }: { reviews: any[]; content: any }) {
  if (!reviews.length) return null;

  const avg = reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;

  return (
    <section id="testimonials" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <SectionHeader title={content.title} description={content.description} />
          <div className="ml-4 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FAFAF7] px-3 py-2 text-sm font-semibold text-[#1a1a1a]">
              <span className="text-[#E6A817]">★</span>
              <span>{avg.toFixed(1)}</span>
              <span className="text-xs text-[#999]">({reviews.length})</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
