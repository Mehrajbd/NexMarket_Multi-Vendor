'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Youtube, Zap, Mail, Phone, ShieldCheck } from 'lucide-react';

const Footer = () => {
    const pathname = usePathname();
    const isHidden = pathname?.startsWith('/admin') || (pathname?.startsWith('/vendor') && !pathname?.startsWith('/vendors'));

    if (isHidden) return null;

    return (
        <footer className="group/footer bg-slate-950 border-t border-white/5 pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Zap className="h-6 w-6 text-white fill-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">NexMarket</span>
                        </Link>
                        <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                            Engineering the future of commerce. A curated ecosystem where quality meets innovation, connecting elite vendors with global collectors.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                                <Link key={idx} href="#" className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-300">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Explore Store', 'Top Brands', 'Flash Sales', 'New Arrivals', 'Verified Vendors'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Resources</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Member Rewards', 'Shipping Hub', 'Returns Portal', 'Global Concierge'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Security */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8">Security</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <ShieldCheck className="h-6 w-6 text-indigo-500" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Secured by AES-256</p>
                                    <p className="text-[10px] text-slate-500 font-bold">Encrypted Transactions</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer group">
                                    <Mail className="h-4 w-4 group-hover:text-indigo-500" />
                                    <span className="text-sm font-bold">elite@nexmarket.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer group">
                                    <Phone className="h-4 w-4 group-hover:text-indigo-500" />
                                    <span className="text-sm font-bold">+1 (888) NEX-MARKET</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                        © 2024 NexMarket Global Ecosystem. In Pursuit of Excellence.
                    </p>
                    <div className="flex gap-12">
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">System Status</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
