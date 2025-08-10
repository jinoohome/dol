import { promises as fs } from "fs";
import path from "path";
import type { InviteData } from "@/app/types";

export async function getInvite(): Promise<InviteData["invite"]> {
  const jsonPath = process.env.INVITE_JSON_PATH || path.join(process.cwd(), "data", "invite.json");
  const file = await fs.readFile(jsonPath, "utf-8");
  const parsed = JSON.parse(file) as InviteData;
  return parsed.invite;
} 