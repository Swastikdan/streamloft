import UserNavbar from "@/components/user/navbar";
export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNavbar />
      <main>{children}</main>
    </>
  );
}
