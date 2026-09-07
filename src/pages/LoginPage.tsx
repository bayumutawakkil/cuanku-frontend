import LoginIllustration from "../components/auth/LoginIllustration";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen w-full overflow-hidden bg-white lg:flex-row">
        <LoginIllustration />

        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-sky-200 px-6 py-12 sm:px-12 lg:w-1/2">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}