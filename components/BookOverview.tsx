import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

function BookOverview({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) {
  return (
    <section className="flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-5xl font-semibold text-white md:text-7xl">
          {title}
        </h1>
        <div className="mt-7 flex flex-row flex-wrap gap-4 text-xl text-light-100">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex gap-1">
            <Image src="/icons/star.svg" alt="Star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 mt-1">
          <p className=" text-xl text-light-100">
            Total Books:{" "}
            <span className="ml-2 font-semibold text-primary">
              {totalCopies}
            </span>
          </p>
          <p className=" text-xl text-light-100">
            Available Books:{" "}
            <span className="ml-2 font-semibold text-primary">
              {availableCopies}
            </span>
          </p>
        </div>
        <p className="mt-2 text-justify text-xl text-light-100">
          {description}
        </p>
        <Button className="mt-4 min-h-14 w-fit bg-primary text-dark-100 hover:bg-primary/90 max-md:w-full cursor-pointer">
          <Image src="/icons/book.svg" alt="Book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookOverview;
