'use client';

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

function page() {
  return <AuthForm type="signIn" schema={signInSchema} defaultValues={{ email: "", password: "" }} onSubmit={() => {}} />;
}

export default page;
