export default function Page() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center gap-16 min-h-[200vh]">
      
      {/* Hero Section */}
      <section className="bg-surface-alt/60 backdrop-blur-md border border-border/50 shadow-xl rounded-3xl p-10 md:p-20 text-center w-full max-w-4xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-text-primary/5 to-transparent pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
          Uvicon Technologies
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Scroll karke dekhiye ki upar wala Glassmorphism header text aur background ke sath kaise react karta hai.
        </p>
      </section>

      {/* Dummy Scrolling Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-surface-alt/60 backdrop-blur-md shadow-lg rounded-2xl p-8 flex flex-col items-start border border-border/50">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 border border-border/50 flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-text-primary/70">{item}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">Dummy Section {item}</h3>
            <p className="text-text-secondary leading-relaxed">
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
