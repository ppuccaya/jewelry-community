import MembersGate from "@/components/public/MembersGate";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MembersGate>{children}</MembersGate>;
}
