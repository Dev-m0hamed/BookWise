import BookCard from "./BookCard";

function BookList({ title, books }: { title: string; books: Book[] }) {
  return (
    <section className="mt-28">
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="mt-10 flex flex-wrap gap-5 max-xs:justify-between xs:gap-10">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
