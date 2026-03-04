import { NavShell } from "@/components/nav-shell";

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <NavShell>{children}</NavShell>;
}
