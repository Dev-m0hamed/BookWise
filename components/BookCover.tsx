import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "w-[28.95px] h-10",
  small: "w-[55px] h-[76px]",
  medium: "w-[144px] h-[199px]",
  regular: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
  wide: "xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]",
};

interface Props {
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
}

function BookCover({
  variant = "regular",
  coverColor = "#012B48",
  coverUrl,
}: Props) {
  return (
    <div
      className={cn(
        "relative transition-all duration-300 z-10",
        variantStyles[variant]
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div className="absolute z-10 left-[12%] w-[87.5%] h-[88%]">
        <Image
          src={coverUrl}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
}

export default BookCover;
