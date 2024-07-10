"use server";
import { unstable_noStore } from "next/cache";
import { Prediction } from "./Types";

export async function createPrediction(
  formData: FormData
): Promise<Prediction> {
  unstable_noStore();
  const promptSend = formData.get("promptSend");

  let prediction = await fetch(
    "https://replicate.com/api/models/mistralai/mixtral-8x7b-instruct-v0.1/predictions",
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-EN,en;q=0.9,en;q=0.8",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "OwkpU0sldqjl8VDltOLIZbLjucMPth4t",
      },
      referrer: "https://replicate.com/mistralai/mixtral-8x7b-instruct-v0.1",
      referrerPolicy: "same-origin",
      body: JSON.stringify({
        input: {
          top_p: 0.9,
          prompt: promptSend,
          temperature: 0.6,
          system_prompt:
            "You are a very helpful, respectful and honest assistant.",
          length_penalty: 1,
          max_new_tokens: 1024,
          prompt_template: "<s>[INST] {prompt} [/INST] ",
          presence_penalty: 0,
        },
        stream: true,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  ).then((response) => response.json() as Promise<Prediction>);

  return prediction;
}

export async function getPrediction(id: string) {
  unstable_noStore();
  return fetch("https://replicate.com/api/predictions/" + id, {
    headers: {
      accept: "*/*",
      "accept-language": "en-EN,en;q=0.9,en;q=0.8",
      baggage:
        "sentry-public_key=3dc017e574684610bbc7fd3b5519a4e8,sentry-trace_id=36d9256a521b463dac819bacd34c4dcf,sentry-sample_rate=0.1",
      "sec-ch-ua":
        '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sentry-trace": "36d9256a521b463dac819bacd34c4dcf-855b122e6f7e9377-0",
    },
    referrer:
      "https://replicate.com/mistralai/mixtral-8x7b-instruct-v0.1?prediction=c1yr2c1e35rj40cgjn388934tc",
    referrerPolicy: "same-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json() as Promise<Prediction>);
}

fetch(
  "https://api.rudderlabs.com/sourceConfig/?p=npm&v=2.37.0&writeKey=2SpwbmApV5tXczEyqZrIi6PTCKN",
  {
    headers: {
      accept: "*/*",
      "accept-language": "es-ES,es;q=0.9,en;q=0.8",
      authorization: "Basic MlNwd2JtQXBWNXRYY3pFeXFacklpNlBUQ0tOOg==",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
    },
    referrerPolicy: "same-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }
);
