export default function ReviewCard({ review, content }: { review: any; content: any }) {
  const initials = `${review.user?.firstName?.charAt(0) ?? ""}${review.user?.lastName?.charAt(0) ?? ""}`;

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-[#e8e4dc] transition-all duration-500 hover:ring-[#2d5a3d]/30 hover:shadow-xl hover:shadow-[#2d5a3d]/5">
      <div className="mb-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-4 w-4 ${star <= review.rating ? "text-[#E6A817]" : "text-[#e0ddd5]"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {review.title && (
        <h3 className="mb-3 text-[15px] font-semibold text-[#1a1a1a]">
          {review.title}
        </h3>
      )}
      
      {review.comment && (
        <p className="mb-6 text-[14px] leading-[1.7] text-[#6b6b6b]">
          &ldquo;{review.comment}&rdquo;
        </p>
      )}
      
      <div className="flex items-center gap-3 border-t border-[#f0ede6] pt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#eef3e8] to-[#f5ede4] text-[13px] font-semibold text-[#2d5a3d]">
          {initials || "MS"}
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#1a1a1a]">
            {review.user?.firstName} {review.user?.lastName}
          </p>
          <p className="text-[12px] text-[#aaa]">
            {content.about} {review.product?.name}
          </p>
        </div>
      </div>
    </article>
  );
}
