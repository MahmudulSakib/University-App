import React from "react";
import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container gradient-blue ">
      <section className="auth-form">
        <div className="auth-box gradient-vertical">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" alt="log" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">Books Pedia</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="auth-illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
