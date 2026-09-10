export default function RegisterIllustration() {
  return (
    <section className="relative hidden min-h-full w-1/2 overflow-hidden bg-gradient-to-b from-blue-300 via-blue-900 to-indigo-950 p-8 text-white lg:flex lg:flex-col">
      
      {/* Shape atas */}
      <img
        src="/images/Vector 4.svg"
        alt=""
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          w-[62%]
          h-auto
        "
      />

      {/* Shape bawah / kanan */}
      <img
        src="/images/Vector 5.svg"
        alt=""
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          z-0
          w-[100%]
          h-auto
        "
      />

      {/* Efek blur / glow */}
      <img
        src="/images/Group 10.svg"
        alt=""
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          opacity-40
        "
      />

      {/* Back Button */}
      <button
        className="
          relative
          z-10
          w-fit
          text-sm
          text-white/80
          transition
          hover:text-white
        "
      >
        ← Kembali
      </button>

      {/* Content */}
      <div className="relative z-10 mt-auto mb-10">
        
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/images/logo.svg"
            alt=""
            className="h-10 w-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="max-w-md text-5xl font-extrabold leading-tight xl:text-6xl">
          Mulai
          <br />
          Perjalanan
          <br />
          Bisnis Anda!
        </h1>
      </div>
    </section>
  );
}