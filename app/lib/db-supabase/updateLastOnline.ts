import { supabase } from "./supabaseClient";

interface IInsertUserResponse {
  data: any;
  success: boolean;
}

export const updateUserLastOnline = async (
  email: string
): Promise<IInsertUserResponse> => {
  const { data, error } = await supabase
    .from("Users_Portify")
    .update({
      last_online: new Date().toISOString(),
    })
    .eq("email", email)
    .select()
    .single();

  return {
    data: data ?? null,
    success: !error,
  };
};
