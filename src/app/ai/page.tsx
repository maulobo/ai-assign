import { createClient } from "@/src/supabase/server";

import { redirect } from "next/navigation";
import Form from "./_compoments/form";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return <Form />;
}
