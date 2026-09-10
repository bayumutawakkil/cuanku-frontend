export default function RegisterIllustration() {
  return (
    <section className="relative hidden min-h-full w-1/2 overflow-hidden bg-gradient-to-b from-blue-300 via-blue-900 to-indigo-950 p-8 text-white lg:flex lg:flex-col">

      {/* Decorative Shape Atas */}
      <div
        className="
          absolute
          -top-10
          -left-10
          h-[250px]
          w-[270px]
          rounded-br-[120px]
          rounded-tl-[50px]
          bg-gradient-to-br
          from-blue-200
          via-blue-500
          to-indigo-800
          opacity-90
        "
      />

      {/* Decorative Shape Tengah */}
      <div
        className="
          absolute
          left-0
          top-[23%]
          h-[330px]
          w-[55%]
          rounded-br-[120px]
          rounded-tr-[120px]
          bg-gradient-to-br
          from-blue-600
          via-blue-800
          to-transparent
          opacity-60
        "
      />

      {/* Decorative Shape Kanan */}
      <div
        className="
          absolute
          right-[-100px]
          bottom-[-50px]
          h-[450px]
          w-[320px]
          rotate-[30deg]
          bg-gradient-to-br
          from-indigo-700
          via-violet-700
          to-indigo-950
          opacity-80
        "
      />

      {/* Decorative Shape Bawah */}
      <div
        className="
          absolute
          -bottom-20
          -left-10
          h-[180px]
          w-[300px]
          rounded-t-full
          bg-slate-900
          opacity-70
        "
      />

      {/* Back Button */}
      <button
        type="button"
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
        <div className="mb-4 flex items-center gap-2">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-yellow-300
              text-xs
              font-bold
              text-yellow-700
              shadow-lg
            "
          >
            RP
          </div>

          <span className="text-2xl font-bold">
            Cuan<span className="text-yellow-300">Ku</span>
          </span>
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