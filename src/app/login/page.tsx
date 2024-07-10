import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { headers } from "next/headers";
import { createClient } from "@/src/supabase/server";

const GithubLogo = () => (
  <svg
    className="w-6 h-6 mr-2"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.86-.01-1.69-2.506.46-3.033-1.21-3.033-1.21-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.91.06 1.39.94 1.39.94.81 1.39 2.12.99 2.63.75.08-.58.31-.98.56-1.21-1.96-.22-4.04-.98-4.04-4.37 0-.96.34-1.75.89-2.37-.09-.22-.38-1.12.08-2.33 0 0 .74-.24 2.43.9.7-.2 1.44-.3 2.18-.3.73 0 1.48.1 2.18.3 1.69-1.14 2.43-.9 2.43-.9.46 1.21.17 2.11.08 2.33.55.61.89 1.41.89 2.37 0 3.4-2.09 4.15-4.06 4.37.32.27.61.81.61 1.64 0 1.18-.01 2.13-.01 2.42 0 .27.18.58.69.48A10.013 10.013 0 0 0 22 12c0-5.52-4.48-10-10-10z"
    />
  </svg>
);

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  async function signInWithGithub() {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (data.url) {
      redirect(data.url);
    }
    if (error) {
      redirect(`${origin}/login?message=an error occurred: ${error}`);
    }
  }
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(error);

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signInWithGoogle = async () => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    console.log(data, error);
    if (data.url) {
      redirect(data.url);
    }
    if (error) {
      redirect(`${origin}/login?message=an error occurred: ${error}`);
    }
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
          <div className="mt-5 space-y-2 mr-auto">
            <h3 className="text-gray-200 text-2xl font-normal sm:text-3xl tracking-tighter font-geist">
              Log in to your account
            </h3>
            <p className="text-gray-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-pink-600 hover:text-pink-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <form>
          <div>
            <label className="font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-4 text-gray-500 bg-transparent outline-none  focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px]"
            />
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="Password"
              name="password"
              required
              className="w-full mt-2 px-3 py-4 text-gray-500 bg-transparent outline-none  focus:border-pink-600/50 shadow-sm rounded-lg border-white/20 border-[1px]"
            />
          </div>
          <SubmitButton
            formAction={signIn}
            className="w-full mt-2 group px-4 py-4 font-geist tracking-tighter text-xl text-white font-medium bg-purple-200/10 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] hover:bg-transparent/10 active:bg-purple-600 rounded-lg duration-150"
          >
            Sign in
            <ChevronRight className="inline-flex justify-center items-center w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
          </SubmitButton>
        </form>
        <div className="relative">
          <span className="block w-full h-px "></span>
          <p className="inline-block w-fit text-sm  text-gray-200 px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>
        <form className=" flex justify-center item-center text-center">
          <button
            formAction={signInWithGithub}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            <GithubLogo />
            <span>Sign in with GitHub</span>
          </button>
        </form>
        <form>
          <div className="space-y-4 text-sm text-gray-200/50 font-medium">
            <button
              formAction={signInWithGoogle}
              className="group w-full space-x-1 py-3 flex transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]  border-white/10  items-center justify-center border rounded-lg hover:bg-transparent/20 duration-150 active:bg-transparent/50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>
        </form>
        <div className="text-center">
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
          <a
            href="/account/forgotten"
            className="text-gray-200/40 hover:text-pink-500/90"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
}
