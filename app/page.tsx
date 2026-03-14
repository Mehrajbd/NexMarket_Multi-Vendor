import Hero from '@/components/home/Hero';
import CategoryList from '@/components/home/CategoryList';
import ProductCard from '@/components/cards/ProductCard';
import { mockProducts } from '@/lib/api/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Zap, Headphones, Store } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = mockProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-950">
      <Hero />

      {/* Flash Sale Bar */}
      <section className="py-6 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <div>
                <h3 className="text-white font-black tracking-tight">Limited Time Flash Sale</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Exclusive drops and 24-hour deals on select luxury items.</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {[
                { label: 'Hours', value: '08' },
                { label: 'Min', value: '42' },
                { label: 'Sec', value: '19' }
              ].map((time, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-3xl font-black text-white tracking-tighter leading-none">{time.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{time.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CategoryList />

      {/* Featured Products Section */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-2">Featured Products</h2>
              <p className="text-slate-500 font-medium">Hand-picked by our editors for exceptional quality.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 text-white">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 text-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Premier Partners Section */}
      <section className="py-32 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black tracking-tighter text-white mb-4 italic text-center md:text-left">Premier <span className="text-indigo-500">Partners</span></h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Discover the makers behind the brands. We only partner with vendors who meet our rigorous standards for quality and ethics.
              </p>
            </div>
            <Button className="h-14 px-8 rounded-2xl border border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all">
              View All Partners
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Lumina Tech', tag: 'VERIFIED ELITE', clients: '1.2k+ Satisfied Customers', icon: 'LT', color: 'from-blue-500 to-indigo-600' },
              { name: 'Urban Threads', tag: 'TOP RATED', clients: '800+ Artisan Pieces Sold', icon: 'UT', color: 'from-purple-500 to-pink-600' },
              { name: 'EcoLiving Co.', tag: 'SUSTAINABILITY PRO', clients: 'Certified Eco-Friendly Partner', icon: 'EL', color: 'from-emerald-500 to-teal-600' }
            ].map((partner, idx) => (
              <div key={idx} className="glass-morphism p-10 rounded-[48px] border-white/5 hover:bg-white/5 transition-all duration-500 text-center group">
                <div className={`h-24 w-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform`}>
                  {partner.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{partner.name}</h3>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{partner.tag}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{partner.clients}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Indigo Newsletter Section */}
      <section className="py-40">
        <div className="container mx-auto px-6">
          <div className="bg-indigo-600 rounded-[32px] md:rounded-[64px] p-8 md:p-32 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 md:w-[500px] h-72 md:h-[500px] bg-white/10 rounded-full blur-[80px] md:blur-[120px] -mr-32 md:-mr-64 -mt-32 md:-mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 md:w-[500px] h-72 md:h-[500px] bg-black/10 rounded-full blur-[60px] md:blur-[100px] -ml-32 md:-ml-64 -mb-32 md:-mb-64 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8">Join the NexMarket Elite.</h2>
              <p className="text-indigo-100 font-bold mb-16 text-lg max-w-xl mx-auto opacity-80 leading-relaxed">
                Subscribe for early access to premium drops, member-only pricing, and global inspiration.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white/10 p-2 rounded-[32px] backdrop-blur-sm border border-white/10">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 h-16 px-10 rounded-[28px] bg-transparent text-white placeholder:text-indigo-200 outline-none font-bold"
                  required
                />
                <Button type="submit" className="h-16 px-12 rounded-[26px] bg-white text-indigo-600 hover:bg-slate-50 font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl">
                  Join Now
                </Button>
              </form>
              <p className="mt-10 text-[10px] font-black uppercase tracking-widest text-indigo-200/60">
                In pursuit of excellence. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
