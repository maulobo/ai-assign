import { createClient } from "@/src/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/ai">AI</Link>
              </li>
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost text-xl">
            Lobai
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/ai" className="hover:bg-slate-400">
                AI
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between mr-5 ">{user?.email}</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <form action={signOut}>
                    <button className="py-2  rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="  flex rounded-xl no-underline  btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
