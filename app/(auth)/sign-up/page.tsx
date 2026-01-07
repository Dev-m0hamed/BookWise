'use client';

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

function page() {
  return (
    <AuthForm
      type="signUp"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
}

export default page;
