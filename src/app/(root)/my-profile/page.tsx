import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "../../../../auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] cursor-pointer text-shadow-black">
          Logout
        </Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default Page;
