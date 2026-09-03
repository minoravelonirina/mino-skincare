import SectionHeader from "./SectionHeader";
import ReviewCard from "./ReviewCard";

export default function TestimonialsSection({ reviews, content }: { reviews: any[]; content: any }) {
  if (!reviews.length) return null;

  const title = content.title ?? content.heading ?? "What our clients say";
  const description = content.description ?? content.subtitle ?? "";
  const avg = reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;

  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#faf8f5] to-white" />
      
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2d5a3d]/5 px-4 py-2 text-[12px] font-medium text-[#2d5a3d]">
            Reviews
          </span>
          <h2 className="mt-5 font-serif text-[32px] tracking-tight text-[#1a1a1a] sm:text-[40px]">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#888]">
            {description}
          </p>
          
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 ring-1 ring-[#e8e4dc]">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(avg) ? "text-[#E6A817]" : "text-[#e0ddd5]"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[14px] font-semibold text-[#1a1a1a]">{avg.toFixed(1)}</span>
            <span className="text-[13px] text-[#aaa]">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
