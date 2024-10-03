import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unstable cache test",
  description:
    "This page is to test the unstable cache function with server action",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
