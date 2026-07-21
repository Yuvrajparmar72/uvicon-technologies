export default function Page() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center gap-16 min-h-[200vh]">
      
      {/* Hero Section */}
      <section className="glass rounded-3xl p-10 md:p-20 text-center w-full max-w-4xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Uvicon Technologies
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Scroll karke dekhiye ki upar wala Glassmorphism header text aur background ke sath kaise react karta hai.
        </p>
      </section>

      {/* Dummy Scrolling Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="glass glass-card rounded-2xl p-8 flex flex-col items-start border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-white/70">{item}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Dummy Section {item}</h3>
            <p className="text-gray-400 leading-relaxed">
              Ye kuch dummy text hai. Jab aap scroll karenge, toh ye cards header ke peeche se guzrenge. 
              Kyunki header mein backdrop-filter: blur(16px) laga hai, isliye ye text header ke aar-paar dhundhla (blur) hoke dikhega, 
              jo ek bahut hi premium look dega.
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}
