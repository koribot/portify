// app/dashboard/[userId]/page.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { grapeJsGithubLink } from "@/app/config/constants";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

type Props = {
  params: {
    display_id: string;
  };
};

export default async function DashboardPage({ params }: Props) {
  const { display_id } = await params;

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
        <a href={grapeJsGithubLink} target="_blank" className="text-blue-600 underline font-bold">grapejs</a>, it is free and open-source
      </span>
    </div>
  );
}
