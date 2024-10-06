import PageWrapper from "@/app/components/wrappers/page-wrapper";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <PageWrapper>
      <div className="flex min-w-screen justify-center my-[5rem]">
        <SignIn />
      </div>
    </PageWrapper>
  );
}
