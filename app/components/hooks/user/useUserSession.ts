"use client"
import { useSession } from "next-auth/react"
export const useUserSession = () => {
  const { data, status } = useSession()
  const user = data?.user
  const display_id = user?.display_id
  const email = user?.email
  const name = user?.name
  const image = user?.image
  return {
    session: data,
    display_id,
    email,
    name,
    image,
    status,
  }
}
