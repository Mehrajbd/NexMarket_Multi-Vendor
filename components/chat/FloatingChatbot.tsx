'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    time: string;
    widget?: 'product' | 'order';
}

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const isHidden = pathname?.startsWith('/admin') || pathname?.startsWith('/vendor');
    if (isHidden) return null;

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: 'msg-0',
                    text: "Hi there! 👋 I'm your NexMarket AI Assistant. Looking for something specific or need help with an order?",
                    sender: 'bot',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        }
    }, [isOpen, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            text: input.trim(),
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI Logic (RAG + GPT simulation)
        setTimeout(() => {
            const query = userMsg.text.toLowerCase();
            let botReply: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: "I can certainly help with that! Let me check...",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            if (query.includes('order') || query.includes('status') || query.includes('tracking')) {
                botReply.text = "Here is the status for your most recent order:";
                botReply.widget = 'order';
            } else if (query.includes('shoe') || query.includes('sneaker') || query.includes('best')) {
                botReply.text = "I found these top-rated sneakers based on our catalog database:";
                botReply.widget = 'product';
            } else if (query.includes('vendor') || query.includes('sell')) {
                botReply.text = "To become a vendor on NexMarket, you can click on the 'Vendors' tab in the navigation menu and fill out the onboarding KYC form with your Trade License and Tax ID.";
            } else if (query.includes('refund') || query.includes('return')) {
                botReply.text = "Our refund policy covers defective items or unreceived packages within 30 days of purchase. Would you like me to open a dispute ticket for an item?";
            } else {
                botReply.text = "I understand. I'm referencing our knowledge base right now. Could you provide a bit more detail, or would you like me to connect you with a human support agent?";
            }

            setMessages(prev => [...prev, botReply]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-tight flex items-center gap-1">
                                        NexBot AI <Sparkles className="h-3 w-3 text-amber-300" />
                                    </h3>
                                    <p className="text-xs text-indigo-100 font-medium">Personal Shopping Assistant</p>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50 space-y-4">
                            {messages.map((msg) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id} 
                                    className={`flex max-w-[85%] ${msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                                >
                                    <div className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div 
                                            className={`p-3 text-sm rounded-2xl shadow-sm ${
                                                msg.sender === 'user' 
                                                    ? 'bg-indigo-600 text-white rounded-br-sm' 
                                                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-bl-sm text-slate-800 dark:text-slate-200'
                                            }`}
                                        >
                                            {msg.text}

                                            {/* Dynamic Widgets injected by AI Core */}
                                            {msg.widget === 'order' && (
                                                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border flex gap-3 items-center">
                                                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                                        <Package className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">ORD-9824-7123</p>
                                                        <p className="text-[10px] text-muted-foreground">Status: Out for Delivery</p>
                                                    </div>
                                                </div>
                                            )}
                                            {msg.widget === 'product' && (
                                                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border group cursor-pointer hover:border-indigo-500 transition-colors">
                                                    <div className="h-20 w-full bg-slate-200 dark:bg-slate-800 rounded mb-2 overflow-hidden relative">
                                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400">Sneaker Image</div>
                                                    </div>
                                                    <p className="text-xs font-bold truncate">Air Max Velocity 2.0</p>
                                                    <p className="text-sm font-black text-indigo-500 mt-0.5">$129.99</p>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground px-1">{msg.time}</span>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex max-w-[80%] mr-auto justify-start"
                                >
                                    <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm flex items-center justify-center gap-1">
                                        <motion.div className="h-1.5 w-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                                        <motion.div className="h-1.5 w-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                                        <motion.div className="h-1.5 w-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <Input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..." 
                                    className="pr-12 bg-slate-50 dark:bg-slate-900 border-none rounded-full h-10 focus-visible:ring-1 focus-visible:ring-indigo-500"
                                />
                                <Button 
                                    type="submit" 
                                    size="icon" 
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-1 top-1 h-8 w-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {isTyping ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                                </Button>
                            </form>
                            <div className="mt-2 text-center">
                                <p className="text-[9px] text-muted-foreground">AI can make mistakes. Verify important info.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
                    isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                }`}
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </motion.button>
        </div>
    );
};

export default FloatingChatbot;
