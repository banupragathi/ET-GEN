const fs = require('fs');
let c = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

const blockToInject = `<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF7A00] text-[10px] font-mono uppercase tracking-[0.2em] mb-8">
            <Zap className="w-3 h-3" />
            Autonomous Intelligence Engine v4.2
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-[#E6EDF3] mb-8 tracking-tighter leading-[0.9]">
            Autonomous Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#00E5FF]">Cost Intelligence</span>
          </h1>
          <p className="text-xl text-[#8B949E] max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform passive analytics into an action-oriented optimization engine. 
            Real-time spend intelligence, resource optimization, and autonomous decision-making for the modern enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto bg-[#FF7A00] text-black px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-[#E66D00] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
              Start Optimization
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/simulation')} className="w-full sm:w-auto border border-[#1C2632] text-[#E6EDF3] px-10 py-4 rounded font-bold uppercase tracking-widest hover:bg-[#E6EDF3]/10 hover:scale-105 transition-all duration-300">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-24 w-full max-w-6xl relative"
        >`;

// Regex to replace everything from the start of the garbled inline-flex down to className="mt-24...
const regex = /<div className="inline-flex items-center gap-2 px-3 py-1[\s\S]*?className="mt-24 w-full max-w-6xl relative"\s*>/m;

if (regex.test(c)) {
  c = c.replace(regex, blockToInject + '\n        >');
  fs.writeFileSync('src/pages/Landing.tsx', c);
  console.log("Syntactically repaired!");
} else {
  console.log("Regex not found. The file structure is different.");
}
