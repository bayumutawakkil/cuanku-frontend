import RegisterIllustration from "../components/auth/RegisterIllustration";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen">
            <section className="flex min-h-screen w-full overflow-hidden bg-white lg:flex-row">
               <RegisterIllustration />

               <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-sky-200 px-6 py-12 sm:px-10 lg:w-1/2">
                   <RegisterForm />
               </div>
            </section>
        </main>
    )
}