import { userTable } from "@/app/config/constants";
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
  auth_provider = "google",
}: IUser): Promise<IInsertUserResponse> => {
  const { data, error } = await supabase
    .from(userTable)
    .insert({
      email: email,
      username: username,
      avatar: avatar,
      auth_provider: auth_provider,
    })
    .select()
    .single();
  return { data: !!data ? data : null, success: !!!error };
};
