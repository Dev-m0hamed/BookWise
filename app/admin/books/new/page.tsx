import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <>
      <Button
        asChild
        className="mb-10 w-fit border border-light-300 bg-white text-xs font-medium text-dark-200 hover:bg-light-300"
      >
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
}

export default page;
