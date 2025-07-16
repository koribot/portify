// app/dashboard/[userId]/page.tsx
import { grapeJsGithubLink } from "@/app/config/constants";
import { authOptions } from "@/app/lib/auth/authoptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage({ params }: PageProps) {
  const resolvedParams = await params;
  const display_id = resolvedParams?.display_id as string;

  const session: any = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  if (session?.user?.display_id !== display_id.split("~")[1]) {
    redirect("/not-found");
  }

  return (
    <div className="p-6 flex flex-col justify-center items-center min-h-screen">
      <span className="flex flex-col items-center gap-5">
        <h1 className="text-2xl font-bold">
          Welcome, {session.user.name || session.user.email}
        </h1>
        <p> 🔧🛠️🧱🚧👷‍♂️👷‍♀️🏗️ Working on it 🔧🛠️🧱🚧👷‍♂️👷‍♀️🏗️</p>
      </span>
      <span className="mt-2 text-gray-600">
        The core functionality of editor will be built using{" "}
        <a
          href={grapeJsGithubLink}
          target="_blank"
          className="text-blue-600 underline font-bold"
        >
          grapejs
        </a>
        , it is free and open-source
      </span>
    </div>
  );
}
