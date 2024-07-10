import { Input } from "@/src/components/input";
import { createClient } from "@/src/supabase/server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin");
  const email = formData.get("Email") as string;
  const password = formData.get("Password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  console.log("thereeeee", error);

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};

export default function SignUpForm() {
  return (
    <form>
      <div>
        <label
          htmlFor="User"
          className="font-medium text-gray-100/50 font-geist"
        >
          Name
        </label>
        <Input
          type="text"
          name="User"
          required
          className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label className="font-medium text-gray-100/50 font-geist">Email</label>
        <Input
          type="email"
          name="Email"
          required
          className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label
          htmlFor="Password"
          className="font-medium text-gray-100/50 font-geist"
        >
          Password
        </label>
        <Input
          type="password"
          name="Password"
          required
          className="w-full mt-2 px-3 py-5 text-gray-500 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
        />
      </div>
      <button
        formAction={signUp}
        className="w-full mt-2 group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150"
      >
        Create account
      </button>
    </form>
  );
}
