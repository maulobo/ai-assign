import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/src/supabase/server";

export default async function UpdatePassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  const resetPassword = async (formData: FormData) => {
    "use server";

    const password = formData.get("password") as string;
    const supabase = createClient();

    if (searchParams.code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        return redirect(
          `/account/reset-password?message=Unable to reset Password. Link expired!`
        );
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/account/reset-password?message=Unable to reset Password. Try again!`
      );
    }

    redirect(
      `/login?message=Your Password has been reset successfully. Sign in.`
    );
  };

  return (
    <main
      style={{
        background:
          "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
      className="w-full min-h-screen flex flex-col items-center justify-center sm:px-4 relative"
    >
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-left">
          <img
            src="https://farmui.com/logo.svg"
            width={100}
            className="mr-auto rounded-full"
          />
        </div>
        <form action={resetPassword}>
          <div>
            <label className="font-medium" htmlFor="password">
              Update Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-4 text-gray-500 bg-transparent outline-none focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px]"
            />
          </div>
          <button className="w-full mt-2 group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150">
            Reset Password
            <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
          </button>
        </form>
      </div>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </main>
  );
}
