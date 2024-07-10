import React from "react";

import { Separator } from "@radix-ui/react-separator";

import SignUpForm from "./signUpForm";
import Button1 from "./button1";
import Button2 from "./button2";
import Button3 from "./button3";

export default function FUISignUpWithLeftBackground() {
  return (
    <main className="w-full min-h-screen flex overflow-y-hidden ">
      <div className="relative flex-1 hidden items-center justify-center min-h-screen bg-transparent lg:flex ">
        <div className="relative z-10 w-full max-w-lg ">
          <img
            src="https://farmui.com/logo-dark.svg"
            width={100}
            className="rounded-full"
          />
          <div className=" mt-10 space-y-3">
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal font-geist tracking-tighter">
              Start growing your business quickly
            </h3>

            <Separator className="h-px bg-white/20 w-[100px] mr-auto" />
            <p className="text-gray-300 text-md md:text-xl font-geist tracking-tight">
              Create an account and get access to all features for 30-days, No
              credit card required.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-full"
          style={
            {
              // background: "linear- gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
            }
          }
        >
          <div className="absolute  inset-0 opacity-15  w-full bg-transparent  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          <img
            className="absolute inset-x-0 -top-20 opacity-25 "
            src={
              "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
            }
            width={1000}
            height={1000}
            alt="back bg"
          />
        </div>
      </div>
      <div className="flex-1 relative flex items-center justify-center min-h-full bg-purple-200/10 transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]   rounded-lg duration-150">
        <div className="w-full max-w-md md:max-w-lg space-y-8 px-4  text-gray-600 sm:px-0 z-20">
          <div className="relative">
            <img
              src="https://farmui.com/logo.svg"
              width={100}
              className="lg:hidden rounded-full"
            />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-200 text-3xl  font-semibold tracking-tighter sm:text-4xl">
                Sign up - Start journey
              </h3>
              <p className="text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-3">
            <Button1 />
            <Button2 />
            <Button3 />
          </div>
          <Separator className="h-px bg-white/20" />
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
