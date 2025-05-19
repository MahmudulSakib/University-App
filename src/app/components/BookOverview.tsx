import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p className="text-[var(--light-100)]">
            By{" "}
            <span className="font-semibold text-[var(--light-200)]">
              {author}
            </span>
          </p>
          <p className="text-[var(--light-100)]">
            Categroy{" "}
            <span className="font-semibold text-[var(--light-200)]">
              {genre}
            </span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="svg" width={22} height={22} />
            <p className="text-[var(--light-100)]">{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p className="text-[var(--light-100)]">
            Total Books: <span>{total_copies}</span>
          </p>
          <p className="text-[var(--light-100)]">
            Available Books: <span>{available_copies}</span>
          </p>
        </div>
        <p className="book-description text-[var(--light-100)]">
          {description}
        </p>
        <Button className="book-overview_btn bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] cursor-pointer text-shadow-black ">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas">Borrow Book</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
          <div className="absolute left-16 top-10 opacity-40 rotate-12">
            <BookCover variant="wide" coverColor={color} coverImage={cover} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
