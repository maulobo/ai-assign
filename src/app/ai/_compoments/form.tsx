"use client";
import { Prediction } from "@/src/Types";
import { createPrediction, getPrediction } from "@/src/actions";
import React from "react";
import { useFormState } from "react-dom";
import ButtonAi from "./buton-ai";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Form() {
  const [state, formAction] = useFormState(handleSubmit, null);

  async function handleSubmit(_state: Prediction | null, formData: FormData) {
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);
      await sleep(4000);
    }

    return prediction;
  }

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold ">
            AI Chatbot
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="promptSend" className="sr-only">
                Enter your prompt
              </label>
              <input
                id="promptSend"
                name="promptSend"
                type="text"
                required
                className="appearance-none rounded-none bg-black relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Insert your prompt"
              />
            </div>
          </div>
          <ButtonAi />
        </form>

        {state && (
          <div className="mt-6 p-4 bg-white shadow sm:rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900">
              Prediction Result:
            </h2>
            <p className="mt-2 text-gray-600">
              {state.output.reduce((text, token) => text + token, "")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
