<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glassmorphism UI Design</title>
    <!-- Tailwind CSS ko CDN se link kar rahe hain styling ke liye -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom CSS - Glassmorphism aur Background effect ke liye */
        
        body {
            /* Dark theme background set kar rahe hain */
            background-color: #0f172a;
            color: #ffffff;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Background me colorful glowing blobs (gole) banane ke liye taaki glass effect achha dikhe */
        .blob {
            position: absolute;
            filter: blur(90px);
            z-index: -1;
            border-radius: 50%;
            animation: moveBlobs 10s infinite alternate;
        }

        .blob-1 {
            top: -10%;
            left: -10%;
            width: 400px;
            height: 400px;
            background: #a855f7; /* Purple */
        }

        .blob-2 {
            bottom: -10%;
            right: -10%;
            width: 500px;
            height: 500px;
            background: #3b82f6; /* Blue */
        }

        .blob-3 {
            top: 40%;
            left: 50%;
            width: 300px;
            height: 300px;
            background: #ec4899; /* Pink */
            transform: translate(-50%, -50%);
        }

        /* Yeh wo main class hai jo Glassmorphism effect deti hai */
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px); /* Safari support ke liye */
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        /* Halki si hover animation cards ke liye */
        .glass-card {
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .glass-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 255, 255, 0.4);
        }

        /* Blobs ko dheere-dheere move karne ka animation */
        @keyframes moveBlobs {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.1) translate(20px, -20px); }
            100% { transform: scale(0.9) translate(-20px, 20px); }
        }
    </style>
</head>
<body class="antialiased selection:bg-purple-500 selection:text-white">

    <!-- Background Animating Blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Sticky Header Jisme Glass Effect Hai -->
    <header class="glass fixed w-full top-0 z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <a href="#" class="text-2xl font-bold tracking-wider text-white flex items-center gap-2">
                        <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        GlassUI
                    </a>
                </div>
                
                <!-- Desktop Menu -->
                <nav class="hidden md:block">
                    <ul class="flex space-x-8">
                        <li><a href="#" class="text-gray-200 hover:text-white hover:underline decoration-purple-400 decoration-2 underline-offset-4 transition-all">Home</a></li>
                        <li><a href="#" class="text-gray-200 hover:text-white hover:underline decoration-purple-400 decoration-2 underline-offset-4 transition-all">Baare Mein</a></li>
                        <li><a href="#" class="text-gray-200 hover:text-white hover:underline decoration-purple-400 decoration-2 underline-offset-4 transition-all">Services</a></li>
                        <li><a href="#" class="text-gray-200 hover:text-white hover:underline decoration-purple-400 decoration-2 underline-offset-4 transition-all">Sampark</a></li>
                    </ul>
                </nav>

                <!-- Action Button -->
                <div class="hidden md:block">
                    <button class="glass px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition-colors">
                        Login Karein
                    </button>
                </div>

                <!-- Mobile Menu Button (Hamburger) -->
                <div class="md:hidden flex items-center">
                    <button class="text-white hover:text-gray-300 focus:outline-none">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Area -->
    <main class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
        
        <!-- Hero Section -->
        <div class="glass rounded-3xl p-8 md:p-16 text-center max-w-4xl w-full mb-16 relative overflow-hidden">
            <!-- Decorative inner glow -->
            <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            
            <h1 class="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Glassmorphism Ka Jaadu
            </h1>
            <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Yeh ek modern aur premium UI design style hai. Isme backdrop-filter ka use karke semi-transparent elements banaye jaate hain jo dekhne me bahut hi aakarshak lagte hain.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="glass px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-500/30 transition-all border-purple-500/50 hover:border-purple-400">
                    Shuru Karein
                </button>
                <button class="glass px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                    Aur Jaanein
                </button>
            </div>
        </div>

        <!-- Features Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            
            <!-- Card 1 -->
            <div class="glass glass-card rounded-2xl p-6 flex flex-col items-start">
                <div class="glass p-3 rounded-xl mb-4 text-purple-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Premium Look</h3>
                <p class="text-gray-300 text-sm">
                    Frosty aur blurred effect website ko ek bahut hi mehanga aur modern look deta hai. Colors background se nikal kar aate hain.
                </p>
            </div>

            <!-- Card 2 -->
            <div class="glass glass-card rounded-2xl p-6 flex flex-col items-start">
                <div class="glass p-3 rounded-xl mb-4 text-blue-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="text-xl font-bold mb-2">100% Responsive</h3>
                <p class="text-gray-300 text-sm">
                    Yeh design mobile, tablet aur desktop har screen size par perfectly adjust ho jata hai bina kisi problem ke.
                </p>
            </div>

            <!-- Card 3 -->
            <div class="glass glass-card rounded-2xl p-6 flex flex-col items-start">
                <div class="glass p-3 rounded-xl mb-4 text-pink-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Fast Performance</h3>
                <p class="text-gray-300 text-sm">
                    Sirf CSS ka use karke banaya gaya hai. Koi bhari image ya script nahi hai, isliye website bahut fast load hoti hai.
                </p>
            </div>

        </div>
    </main>

    <!-- Footer -->
    <footer class="glass mt-auto w-full py-6 text-center text-sm text-gray-400">
        <p>© 2026 GlassUI. Sabhi adhikar surakshit hain.</p>
    </footer>

</body>
</html>