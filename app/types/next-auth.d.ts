import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    guestId?: string; // Make it optional if it might not always be present
  }
}
