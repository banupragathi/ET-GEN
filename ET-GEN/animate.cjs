const fs = require('fs');
let c = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// 1. Wrap sections with scroll animations
c = c.replace(/<section\b([^>]*)>/g, `<motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        $1
      >`);
c = c.replace(/<\/section>/g, '</motion.section>');

// 2. Buttons hover scaling
c = c.replace(
  /hover:text-\[#E6EDF3\] transition-colors">Login<\/button>/,
  `hover:text-[#E6EDF3] hover:scale-105 transition-all duration-300 inline-block">Login</button>`
);
c = c.replace(
  /hover:bg-\[#FF7A00\] transition-colors">Get Started<\/button>/,
  `hover:bg-[#FF7A00] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all duration-300">Get Started</button>`
);
c = c.replace(
  /hover:bg-\[#D96C1E\] transition-all flex items-center justify-center gap-2 group">/,
  `hover:bg-[#E66D00] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">`
);
c = c.replace(
  /hover:bg-\[#E6EDF3\]\/5 transition-all">/,
  `hover:bg-[#E6EDF3]/10 hover:scale-105 transition-all duration-300">`
);

// 3. Gradient text for section headings
c = c.replace(
  /text-\[#E6EDF3\] italic font-serif/g,
  `text-transparent bg-clip-text bg-gradient-to-r from-[#E6EDF3] to-[#8B949E] italic font-serif`
);

fs.writeFileSync('src/pages/Landing.tsx', c);
console.log('Animations applied');
