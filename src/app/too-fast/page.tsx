import React from "react";

const Page = () => {
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center">
      <h1 className="font-bebas text-5xl text-[var(--light-100)]">
        Whoa, Slow Down There, Speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center text-[var(--light-400)]">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again
        shortly
      </p>
    </main>
  );
};

export default Page;
