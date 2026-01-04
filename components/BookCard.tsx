import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

function BookCard({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="mt-2 line-clamp-1 text-base font-semibold text-white xs:text-xl">
            {title}
          </p>
          <p className="mt-1 line-clamp-1 text-sm italic text-light-100 xs:text-base">
            {genre}
          </p>
        </div>
        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="flex flex-row items-center gap-1 max-xs:justify-center">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>
            <Button className="bg-dark-600 mt-3 min-h-14 w-full font-bebas-neue text-base text-primary cursor-pointer">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
}

export default BookCard;
