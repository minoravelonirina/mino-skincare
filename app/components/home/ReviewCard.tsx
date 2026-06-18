export default function ReviewCard({ review, content }: { review: any; content: any }) {
  const initials = `${review.user?.firstName?.charAt(0) ?? ""}${review.user?.lastName?.charAt(0) ?? ""}`;

  return (
    <article className="rounded-3xl bg-[#FAFAF7] p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-[#E6A817]" aria-label={`${review.rating} ${content.ratingLabel}`}>
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </p>
      {review.title && <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">{review.title}</p>}
      {review.comment && <p className="mb-6 text-sm italic leading-7 text-[#374151]">{`"${review.comment}"`}</p>}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3e8] text-sm font-semibold text-[#2d5a3d]">{initials || "MS"}</div>
        <div>
          <p className="text-sm font-semibold text-[#1a1a1a]">{review.user?.firstName} {review.user?.lastName}</p>
          <p className="text-xs text-[#999]">{content.about} {review.product?.name}</p>
        </div>
      </div>
    </article>
  );
}
