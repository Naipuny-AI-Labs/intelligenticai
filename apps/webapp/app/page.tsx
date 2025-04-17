import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export default async function HomePage() {
  const user = await getCurrentUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }

  // If user is not logged in, redirect to login page
  redirect("/auth/sign-in")
}
