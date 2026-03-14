'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Store, ShieldCheck } from 'lucide-react';

interface VendorChatDialogProps {
    vendorName: string;
    triggerButton?: React.ReactNode;
}

const VendorChatDialog = ({ vendorName, triggerButton }: VendorChatDialogProps) => {
    const [messages, setMessages] = useState([
        { id: 1, text: `Hi there! I represent ${vendorName}. How can I help you today?`, sender: 'vendor', time: '10:00 AM' }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setMessages([...messages, { 
            id: Date.now(), 
            text: newMessage, 
            sender: 'user', 
            time: timeString 
        }]);
        setNewMessage('');

        // Simulate vendor reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thanks for your message! Our team will get back to you shortly.",
                sender: 'vendor',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1500);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {triggerButton || (
                    <Button variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" /> Message Vendor
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-background border-border">
                {/* Header */}
                <DialogHeader className="p-4 bg-muted/30 border-b flex flex-row items-center gap-3 space-y-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Store className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-left">
                        <DialogTitle className="flex items-center gap-2 text-base">
                            {vendorName}
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                        </DialogTitle>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            Typically replies within an hour
                        </p>
                    </div>
                </DialogHeader>

                {/* Chat Area */}
                <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-4 bg-gradient-to-b from-background to-muted/10">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                        >
                            <div 
                                className={`px-4 py-2.5 rounded-2xl text-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                                        : 'bg-muted border border-border/50 text-foreground rounded-tl-sm'
                                }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 mx-1 px-1">
                                {msg.time}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-background border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-10 rounded-full"
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()} className="rounded-full h-10 w-10 shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VendorChatDialog;
