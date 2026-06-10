import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/login/LoginForm";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin");
  }

  return <LoginForm />;
}
