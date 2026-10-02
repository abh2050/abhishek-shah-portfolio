// Seedance 2.5 text-to-video example. Server-side only: credentials load from .env.local at runtime.
import { config as loadEnv } from "dotenv";
import {
  AuthenticationError,
  config,
  higgsfield,
  NotEnoughCreditsError,
  TimeoutError,
  type V2Response,
} from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

if (!process.env.HF_CREDENTIALS) {
  console.error("HF_CREDENTIALS is not set. Add it to .env.local as key-id:key-secret.");
  process.exit(1);
}

config({
  credentials: process.env.HF_CREDENTIALS,
  maxPollTime: 15 * 60 * 1000, // video generation can exceed the 5-minute default
});

let result: V2Response;
try {
  result = await higgsfield.subscribe("bytedance/seedance-2.5/text-to-video", {
    input: {
      prompt: "A cinematic scene at sunset",
      duration: 5,
      resolution: "720p",
      aspect_ratio: "16:9",
    },
    withPolling: true,
  });
} catch (error) {
  const reason =
    error instanceof AuthenticationError
      ? "credentials were rejected"
      : error instanceof NotEnoughCreditsError
        ? "the account does not have enough credits"
        : error instanceof TimeoutError
          ? "polling timed out before the request finished"
          : error instanceof Error
            ? error.message
            : String(error);
  console.error(`Request not completed: ${reason}.`);
  process.exit(1);
}

// The SDK types list completed | failed | nsfw; treat anything else (e.g. canceled) as unsuccessful too.
const status: string = result.status;
const videoUrl = result.video?.url;

if (status === "completed" && videoUrl) {
  console.log(`Completed (request ${result.request_id})`);
  console.log(videoUrl);
} else {
  const reason =
    status === "nsfw"
      ? "rejected by moderation (credits refunded)"
      : status === "failed"
        ? "generation failed (credits refunded)"
        : status === "canceled" || status === "cancelled"
          ? "request was canceled"
          : status === "completed"
            ? "completed without a video URL"
            : `ended with unexpected status "${status}"`;
  console.error(`Request ${result.request_id} ${reason}.`);
  process.exit(1);
}
