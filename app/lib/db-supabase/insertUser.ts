import { supabase } from "./supabaseClient";

interface IInsertUserResponse {
  data: any;
  success: any;
}

interface IUser {
  email: string;
  username: string;
  avatar: string;
  auth_provider?: string;
}

export const insertUser = async ({
  email,
  username,
  avatar,
  auth_provider,
}: IUser): Promise<IInsertUserResponse> => {
  const { data, error } = await supabase
    .from("Users_Portify")
    .insert({
      email: email,
      username: username,
      avatar: avatar,
      auth_provider: "google",
    })
    .select()
    .single();
  return { data: !!data ? data : null, success: !!!error };
};
