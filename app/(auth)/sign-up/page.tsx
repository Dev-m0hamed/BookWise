'use client';

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

function page() {
  return (
    <AuthForm
      type="signUp"
      schema={signUpSchema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={() => {}}
    />
  );
}

export default page;
