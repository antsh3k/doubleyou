import PageWrapper from "@/app/components/wrappers/page-wrapper";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <PageWrapper>
      <div className="flex min-w-screen justify-center my-[5rem]">
        <SignUp />
      </div>
    </PageWrapper>
  );
}
