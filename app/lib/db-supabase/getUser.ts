import { userTable } from "@/app/constants/db";
import { supabase } from "./supabaseClient";

interface IGetUserResponse {
  data: any;
  success: any;
}

export const getUser = async (email: string): Promise<IGetUserResponse> => {
  const { data, error } = await supabase
    .from(userTable)
    .select("*")
    .eq("email", email)
    .single();
  return { data: !!data ? data : null, success: !(!!error) };
};
