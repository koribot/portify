import Dashboard from "@/app/components/dashboard/Dashboard"
import { authOptions } from "@/app/lib/auth/authoptions"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

// I do not know the type of params, so I am using any: TODO
export default async function DashboardPage({ params }: any) {
  const resolvedParams = await params
  const display_id = resolvedParams?.display_id as string
  const session: any = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }
  if (session?.user?.display_id !== display_id.split("~")[1]) {
    redirect("/not-found")
  }

  return (
    // Pass the session and display_id to the client component
    <Dashboard session={session} displayId={display_id} />
  )
}
