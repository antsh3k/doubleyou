import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import NavBar from "../nav";
import { getUserById } from "@/app/utils/queries/user";

export default async function PageWrapper({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { userId } = auth();
  const user = userId ? await getUserById(userId) : undefined;
  return (
    <>
      {/*  @ts-ignore */}
      <NavBar userId={userId} user={!!user} title={title} />
      <main
        className={cn(
          "flex min-w-screen min-h-screen flex-col items-center dark:bg-black bg-white justify-between",
          className
        )}
      >
        <div className="absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </main>
    </>
  );
}
