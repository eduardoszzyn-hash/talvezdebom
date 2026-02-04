
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  Map, 
  Zap, 
  Lock, 
  CheckCircle2, 
  BrainCircuit,
  LayoutGrid,
  ArrowRight,
  ShieldAlert,
  BadgeCheck,
  Mail,
  ShieldQuestion,
  Terminal,
  Cpu,
  Fingerprint,
  FileText,
  Video,
  Target,
  XCircle,
  Clock,
  Filter,
  Wrench,
  Navigation
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Sub-components (Core Logic) ---

const BackgroundGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0D0D0D]" />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.01}px, ${(mousePos.y - window.innerHeight / 2) * 0.01}px)`
        }}
      />
      <div 
        className="absolute inset-0 bg-radial-gradient from-[#39FF14]/5 to-transparent blur-[120px] opacity-40 hidden md:block"
        style={{
          left: mousePos.x - 350,
          top: mousePos.y - 350,
          width: '700px',
          height: '700px',
          transition: 'left 0.2s ease-out, top 0.2s ease-out'
        }}
      />
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = "" }) => {
  const words = useMemo(() => text.split(" "), [text]);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } }
  };
  const item = { hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.p className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block mr-[0.3em]">{word}</motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-[#39FF14] ml-1 align-middle"
      />
    </motion.p>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`relative z-10 py-24 md:py-48 px-6 sm:px-10 max-w-7xl mx-auto w-full ${className}`}>
    {children}
  </section>
);

const PriceBadge: React.FC = () => (
  <motion.div 
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: 12 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
    className="absolute -top-24 left-1/2 -translate-x-1/2 sm:-top-20 sm:-right-10 sm:left-auto sm:translate-x-0 md:-right-24 bg-[#39FF14] text-black font-mono font-bold px-4 py-3 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(57,255,20,0.4)] z-30 flex flex-col items-center justify-center min-w-[130px] sm:min-w-[180px] border-2 sm:border-4 border-black/10 pointer-events-none sm:pointer-events-auto scale-[0.7] sm:scale-100"
  >
    <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-black opacity-80 mb-0.5 sm:mb-1">Oferta Única</p>
    <p className="text-lg sm:text-2xl md:text-3xl font-black tracking-tighter italic">R$ 15,90</p>
  </motion.div>
);

const ModuleCard: React.FC<{ title: string; description: React.ReactNode; result: string; icon: React.ReactNode; index: number }> = ({ title, description, result, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="group relative p-8 md:p-10 bg-[#1A1A1A]/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#39FF14]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col h-full"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl font-black select-none group-hover:opacity-20 transition-opacity">0{index + 1}</div>
    <div className="w-12 h-12 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center text-[#39FF14] mb-8 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all">{icon}</div>
    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">{title}</h3>
    <div className="text-white/60 leading-relaxed text-base mb-10 font-light flex-grow">{description}</div>
    <div className="mt-auto pt-6 border-t border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
        <p className="text-[#39FF14] font-mono text-xs uppercase tracking-widest font-bold">Meta: {result}</p>
      </div>
    </div>
  </motion.div>
);

const CTAButton: React.FC<{ text: string; className?: string; onClick?: () => void }> = ({ text, className = "", onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ boxShadow: ['0 0 10px rgba(57,255,20,0.2)', '0 0 25px rgba(57,255,20,0.5)', '0 0 10px rgba(57,255,20,0.2)'] }}
    transition={{ repeat: Infinity, duration: 2 }}
    onClick={onClick}
    className={`bg-[#39FF14] text-black font-black py-5 px-10 rounded-xl tracking-tighter flex items-center justify-center gap-4 transition-all duration-300 relative overflow-hidden group w-full sm:w-auto ${className}`}
  >
    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
    <span className="uppercase text-lg sm:text-xl font-black relative z-10 italic leading-none text-center">{text}</span>
    <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform hidden sm:block" />
  </motion.button>
);

// --- Main App Component ---

export default function App() {
  const handlePurchase = useCallback(() => {
    window.location.href = "https://pay.cakto.com.br/hqkp9td_751652";
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-white selection:bg-[#39FF14] selection:text-black overflow-x-hidden w-full">
      <div className="bg-grain" />
      <BackgroundGrid />

      {/* Top Status Bar */}
      <div className="absolute top-6 sm:top-14 left-0 w-full z-50 flex justify-center px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-[#39FF14]/30 bg-black/60 backdrop-blur-xl flex items-center gap-4 shadow-[0_0_20px_rgba(57,255,20,0.1)] max-w-[90vw] sm:max-w-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] shadow-[0_0_100px_#39FF14] animate-pulse flex-shrink-0" />
          <span className="text-[10px] sm:text-[12px] font-mono tracking-wide text-[#39FF14] font-bold uppercase">Acesso Autorizado: Protocolo Anti-Manada v2.0</span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <Section className="pt-[18rem] sm:pt-[24rem] pb-24 sm:pb-56 flex flex-col items-center text-center">
        <div className="relative w-full max-w-5xl px-4 sm:px-0">
          <PriceBadge />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="text-[#39FF14] font-mono text-xs sm:text-sm tracking-[0.5em] uppercase font-black">Filtro Lógico de Direção Digital</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center mb-16 sm:mb-20 select-none">
            <span className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] text-white max-w-4xl">PARE DE TENTAR ADIVINHAR</span>
            <span className="text-5xl sm:text-8xl md:text-9xl font-black italic tracking-tighter uppercase leading-[1.0] bg-gradient-to-r from-[#39FF14] via-[#39FF14] to-white bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(57,255,20,0.3)]">O QUE DÁ DINHEIRO</span>
          </motion.h1>
          <div className="max-w-4xl mx-auto">
            <TypewriterText 
              delay={0.5}
              className="text-lg sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-medium tracking-tight px-4"
              text="Use o Guia Anti-Manada para decidir seu primeiro passo no digital em 15 minutos e pare de seguir quem só quer te vender o próximo curso."
            />
          </div>
          <div className="flex flex-col items-center gap-16 mt-20 sm:mt-24">
            <CTAButton text="QUERO MEU ACESSO E SAIR DA MANADA AGORA" onClick={handlePurchase} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex flex-wrap items-center justify-center gap-6 sm:gap-20 opacity-30">
              <div className="flex items-center gap-2"><Clock size={14}/><span className="text-xs font-mono tracking-widest uppercase font-black">15 MINUTOS PARA CLAREZA</span></div>
              <div className="flex items-center gap-2"><Target size={14}/><span className="text-xs font-mono tracking-widest uppercase font-black">DIREÇÃO CIRÚRGICA</span></div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Origin Section (The Story) */}
      <Section className="border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 mb-6"><FileText size={24} /></div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter mb-4">A ORIGEM <span className="text-[#39FF14]">DO GUIA</span></h2>
            <div className="w-24 h-1 bg-[#39FF14]/30 rounded-full" />
          </div>
          <div className="relative p-8 sm:p-12 bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-6 opacity-5"><Terminal size={100} /></div>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed font-light italic mb-8">
              "Este guia nasceu depois de eu ver, por anos, iniciantes dedicados repetindo exatamente os mesmos erros, perdendo o pouco dinheiro que tinham e desistindo por falta de direção."
            </p>
            <p className="text-lg text-white/50 leading-relaxed font-light border-l-2 border-[#39FF14]/50 pl-6">
              Este filtro foi criado após analisar os mesmos erros repetidos por dezenas de iniciantes que perderam dinheiro começando pelo lugar errado.
            </p>
          </div>
        </div>
      </Section>

      {/* Pain Section */}
      <Section className="bg-[#0A0A0A]">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div>
            <h2 className="text-5xl sm:text-7xl font-black mb-14 uppercase tracking-tighter italic leading-tight">Por que você <br/><span className="text-[#39FF14]">ainda não saiu</span> do lugar:</h2>
            <div className="space-y-10">
              {[
                { t: "Excesso de Informação", d: "Você tem toneladas de dados, mas zero direção prática." },
                { t: "Medo do Prejuízo", d: "Tem medo de gastar o pouco que tem e quebrar a cara." },
                { t: "Acúmulo de PDFs", d: "Está cansado de ver gurus prometendo riqueza enquanto você só acumula arquivos inúteis." },
                { t: "Inércia Cognitiva", d: "Vê todo mundo avançar enquanto você continua travado na dúvida." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0 group-hover:bg-red-500/20 transition-all"><XCircle size={20} /></div>
                  <div>
                    <h4 className="text-white font-bold text-xl uppercase tracking-tight italic mb-1">{item.t}</h4>
                    <p className="text-white/40 font-light leading-snug">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-red-500/5 blur-[100px]" />
            <div className="relative border border-white/10 p-10 sm:p-16 bg-[#1A1A1A]/90 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 mb-10"><AlertTriangle className="text-red-500 w-6 h-6" /><span className="text-[10px] font-mono text-red-500/60 tracking-[0.5em] uppercase font-bold">Diagnóstico de Fracasso</span></div>
              <p className="text-2xl text-white font-black italic uppercase leading-tight mb-8">O problema não é sua falta de vontade.</p>
              <p className="text-lg text-white/60 font-light italic leading-relaxed mb-12">
                É que você está seguindo a manada para o precipício. Você precisa do <span className="text-[#39FF14] font-bold">Filtro Lógico de Direção Digital</span>: o mesmo método usado para evitar 90% dos erros de quem começa do zero.
              </p>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-[#39FF14]" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Deliverables Section */}
      <Section id="modules" className="border-t border-white/5">
        <div className="mb-24 sm:mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#39FF14]/10 border border-[#39FF14]/20 rounded-full mb-8"><Cpu className="w-4 h-4 text-[#39FF14]" /><span className="text-[10px] font-mono text-[#39FF14] uppercase tracking-[0.3em] font-black">O Que Você Recebe Agora</span></div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 uppercase tracking-tighter italic leading-none text-white">RECURSO <span className="text-[#39FF14]">TÁTICO</span></h2>
          <p className="text-white/40 text-sm sm:text-lg font-mono tracking-[0.4em] uppercase font-bold max-w-3xl mx-auto italic">Pare de ser audiência e comece a ser dono do seu lucro.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <ModuleCard 
            index={0} 
            icon={<Map />} 
            title="Mapa de Direção" 
            description="O passo a passo visual para não começar errado e entrar apenas em caminhos com potencial real de lucro." 
            result="Execução Imediata" 
          />
          <ModuleCard 
            index={1} 
            icon={<Video />} 
            title="Filtro de Lucro" 
            description="A lógica real de como o dinheiro circula no mercado digital — para quem não pode errar, não tem dinheiro para perder e não cai em fantasia de guru." 
            result="Blindagem Mental" 
          />
          <ModuleCard 
            index={2} 
            icon={<BrainCircuit />} 
            title="Matriz de Decisão" 
            description="Escolha apenas modelos que cabem no seu bolso hoje e que fazem sentido financeiramente, com potencial real de retorno — sem depender de promessas, sorte ou investimentos que você não consegue sustentar." 
            result="Escolha Certa" 
          />
        </div>
      </Section>

      {/* Qualification (For Whom) */}
      <Section className="bg-[#0D0D0D] border-y border-white/5">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-10 bg-black/40 border border-[#39FF14]/20 rounded-3xl">
            <h3 className="text-[#39FF14] text-3xl font-black uppercase italic mb-8 flex items-center gap-4"><CheckCircle2 /> É PARA:</h3>
            <ul className="space-y-6 text-lg text-white/60 font-light italic">
              <li>• Quem quer parar de errar e perder dinheiro.</li>
              <li>• Quem precisa de um passo a passo lógico.</li>
              <li>• Quem tem pouco capital para investir inicialmente.</li>
              <li>• Quem busca clareza real sobre o mercado digital.</li>
            </ul>
          </div>
          <div className="p-10 bg-black/40 border border-red-500/20 rounded-3xl">
            <h3 className="text-red-500 text-3xl font-black uppercase italic mb-8 flex items-center gap-4"><XCircle /> NÃO É PARA:</h3>
            <ul className="space-y-6 text-lg text-white/60 font-light italic">
              <li>• Quem busca dinheiro fácil sem qualquer esforço.</li>
              <li>• Quem não está disposto a seguir um sistema sério.</li>
              <li>• Quem prefere continuar sendo enganado por promessas mágicas.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Bonus Section */}
      <Section id="bonus" className="border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#39FF14] font-mono text-sm tracking-[0.5em] uppercase font-black">Protocolos de Aceleração (Inclusos)</span>
            <h2 className="text-5xl sm:text-7xl font-black uppercase italic tracking-tighter mt-4">3 ARQUIVOS <span className="text-[#39FF14]">COMPLEMENTARES</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {/* Bonus 01 */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 bg-black/60 border border-white/10 rounded-3xl relative overflow-hidden group hover:border-[#39FF14]/50 transition-all shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-mono text-[#39FF14] tracking-widest uppercase border border-[#39FF14]/30 rounded px-2 py-1 inline-block font-black">BÔNUS 01</div>
                    <Filter className="text-[#39FF14]/20 group-hover:text-[#39FF14]/40 transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 leading-tight">O Filtro de <br/><span className="text-[#39FF14]">Viabilidade</span></h3>
                <p className="text-white/40 font-light italic leading-relaxed mb-8">Um protocolo para identificar nichos que realmente dão lucro e descartar os 'buracos negros' de capital antes de investir seu tempo neles.</p>
                <div className="text-xs font-mono text-[#39FF14] uppercase tracking-[0.1em] font-bold border-t border-white/5 pt-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                    Pare de dar tiros no escuro
                </div>
            </motion.div>
            
            {/* Bonus 02 */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 bg-black/60 border border-white/10 rounded-3xl relative overflow-hidden group hover:border-[#39FF14]/50 transition-all shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-mono text-[#39FF14] tracking-widest uppercase border border-[#39FF14]/30 rounded px-2 py-1 inline-block font-black">BÔNUS 02</div>
                    <Wrench className="text-[#39FF14]/20 group-hover:text-[#39FF14]/40 transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 leading-tight">Checklist <br/><span className="text-[#39FF14]">da Operação</span></h3>
                <p className="text-white/40 font-light italic leading-relaxed mb-8">A lista das únicas ferramentas gratuitas necessárias para iniciar no digital de forma enxuta, evitando assinaturas caras e focando no ROI.</p>
                <div className="text-xs font-mono text-[#39FF14] uppercase tracking-[0.1em] font-bold border-t border-white/5 pt-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                    Fature sem pagar 'pedágio'
                </div>
            </motion.div>

            {/* Bonus 03 */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 bg-black/60 border border-white/10 rounded-3xl relative overflow-hidden group hover:border-[#39FF14]/50 transition-all shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-mono text-[#39FF14] tracking-widest uppercase border border-[#39FF14]/30 rounded px-2 py-1 inline-block font-black">BÔNUS 03</div>
                    <Navigation className="text-[#39FF14]/20 group-hover:text-[#39FF14]/40 transition-colors" size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 leading-tight">Mapa de <br/><span className="text-[#39FF14]">Decisão</span></h3>
                <p className="text-white/40 font-light italic leading-relaxed mb-8">Um material de bolso para você nunca mais se perder no excesso de informação. Olhe para o mapa, veja se ela é real ou apenas perda de tempo.</p>
                <div className="text-xs font-mono text-[#39FF14] uppercase tracking-[0.1em] font-bold border-t border-white/5 pt-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                    Blindagem cognitiva instantânea
                </div>
            </motion.div>
          </div>

          {/* Guarantee Box */}
          <div className="max-w-4xl mx-auto p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden text-center backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent" />
            <BadgeCheck className="w-20 h-20 text-[#39FF14] mx-auto mb-8 drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]" />
            <h3 className="text-3xl font-black uppercase italic mb-6">GARANTIA DE CLAREZA</h3>
            <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-2xl mx-auto italic font-light">
                O método é cirúrgico. Se mesmo aplicando o sistema você sentir que não obteve clareza sobre seu próximo passo, basta solicitar o reembolso. O risco de testar é zero; o risco de continuar sem direção é todo seu.
            </p>
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-white/20 text-xl line-through font-mono">R$ 47,00</span>
                    <span className="text-7xl sm:text-8xl font-black text-[#39FF14] italic tracking-tighter drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">R$ 15,90</span>
                </div>
                <CTAButton text="QUERO MEU ACESSO E SAIR DA MANADA AGORA" onClick={handlePurchase} className="w-full sm:w-auto" />
                <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">PAGAMENTO ÚNICO | ACESSO IMEDIATO</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Pricing / Footer */}
      <Section id="buy" className="pt-0 pb-32">
        <div className="max-w-4xl mx-auto text-center border-t border-white/5 pt-20">
            <p className="text-xl text-white/40 italic font-light mb-12">
                "Ignorar isso agora é escolher continuar no escuro por mais uma semana. Não deixe para amanhã a clareza que você pode ter em 15 minutos."
            </p>
            <div className="flex flex-col items-center gap-10">
                <div className="flex items-center gap-8 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <span className="font-black text-2xl tracking-tighter">VISA</span>
                    <span className="font-black text-2xl tracking-tighter">MASTER</span>
                    <span className="font-black text-2xl tracking-tighter">PIX</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-widest bg-white/5 px-8 py-4 rounded-full border border-white/5">
                    <ShieldCheck size={16} className="text-[#39FF14]/50" /> 
                    SISTEMA DE PAGAMENTO 100% CRIPTOGRAFADO
                </div>
            </div>
        </div>
      </Section>

      <footer className="relative z-10 border-t border-white/5 bg-[#050505] py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] font-black mb-6">© 2026 • GUIA ANTI-MANADA • TODOS OS DIREITOS RESERVADOS</p>
          <div className="flex justify-center gap-8 text-[10px] font-mono text-white/10 tracking-[0.2em] uppercase">
            <span>TERMOS DE USO</span>
            <span>PRIVACIDADE</span>
            <span>CONTATO</span>
          </div>
          <div className="mt-10 px-6 py-2 bg-white/[0.01] border border-white/5 rounded-full inline-block">
            <p className="text-[9px] font-mono text-white/10 tracking-[0.3em] uppercase">ESTE SITE NÃO É DO GOOGLE OU META</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
