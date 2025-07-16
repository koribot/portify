import { supabase } from "./supabaseClient";

interface IGetUserResponse {
  data: any;
  success: any;
}

export const getUser = async (email: string): Promise<IGetUserResponse> => {
  const { data, error } = await supabase
    .from("Users_Portify")
    .select("*")
    .eq("email", email)
    .single();
  return { data: !!data ? data : null, success: !(!!error) };
};
