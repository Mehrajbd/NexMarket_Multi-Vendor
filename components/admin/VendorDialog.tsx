'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Vendor } from '@/types';
import { Upload, X } from 'lucide-react';

const vendorSchema = z.object({
    name: z.string().min(1, "Vendor name is required").min(2, "Name must be at least 2 characters"),
    description: z.string().min(1, "Description is required").min(10, "Description must be at least 10 characters"),
    logo: z.string().min(1, "Please upload a store logo"),
    rating: z.coerce.number().min(0).max(5).default(0),
    totalSales: z.coerce.number().min(0).default(0),
    isVerified: z.boolean().default(false),
});

type VendorFormValues = z.infer<typeof vendorSchema>;

interface VendorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    vendor?: Vendor | null;
    onSave: (vendor: Partial<Vendor>) => void;
}

const VendorDialog = ({ open, onOpenChange, vendor, onSave }: VendorDialogProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue,
        watch
    } = useForm<VendorFormValues>({
        // @ts-ignore
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            name: '',
            description: '',
            logo: '',
            rating: 0,
            totalSales: 0,
            isVerified: false,
        }
    });

    const logoValue = watch('logo');

    useEffect(() => {
        if (open) {
            if (vendor) {
                reset({
                    name: vendor.name || '',
                    description: vendor.description || '',
                    logo: vendor.logo || '',
                    rating: vendor.rating || 0,
                    totalSales: vendor.totalSales || 0,
                    isVerified: !!vendor.isVerified,
                });
            } else {
                reset({
                    name: '',
                    description: '',
                    logo: '',
                    rating: 0,
                    totalSales: 0,
                    isVerified: false,
                });
            }
        }
    }, [vendor, reset, open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('logo', reader.result as string, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setValue('logo', '', { shouldValidate: true });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const onSubmit = (data: VendorFormValues) => {
        onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{vendor ? 'Edit Vendor' : 'Add New Vendor'}</DialogTitle>
                    <DialogDescription>
                        {vendor ? 'Update the vendor details below.' : 'Enter the details for the new vendor.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Vendor Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. NexroLab"
                            {...register('name')}
                        />
                        {errors.name && <p className="text-[11px] text-rose-500 font-bold mt-1 tracking-tight">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="A brief description of the vendor..."
                            className="min-h-[100px]"
                            {...register('description')}
                        />
                        {errors.description && <p className="text-[11px] text-rose-500 font-bold mt-1 tracking-tight">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label>Store Logo</Label>
                        <div className="flex items-center gap-6">
                            <div className="relative h-24 w-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden group flex items-center justify-center">
                                {logoValue ? (
                                    <>
                                        <img
                                            src={logoValue}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeLogo}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-6 w-6 text-white" />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors"
                                    >
                                        <Upload className="h-6 w-6" />
                                        <span className="text-[10px] font-bold">UPLOAD</span>
                                    </button>
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-2">Upload your store logo. Recommended size 400x400px.</p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-full px-4 h-8 text-xs font-bold"
                                >
                                    Select Image
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {errors.logo && <p className="text-[11px] text-rose-500 font-bold mt-2 tracking-tight">{errors.logo.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rating">Initial Rating</Label>
                            <Input
                                id="rating"
                                type="number"
                                step="0.1"
                                {...register('rating', { valueAsNumber: true })}
                            />
                            {errors.rating && <p className="text-[11px] text-rose-500 font-bold mt-1 tracking-tight">{errors.rating.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="totalSales">Initial Sales</Label>
                            <Input
                                id="totalSales"
                                type="number"
                                {...register('totalSales', { valueAsNumber: true })}
                            />
                            {errors.totalSales && <p className="text-[11px] text-rose-500 font-bold mt-1 tracking-tight">{errors.totalSales.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isVerified"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            {...register('isVerified')}
                        />
                        <Label htmlFor="isVerified" className="cursor-pointer font-bold text-slate-700">Verified Store</Label>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">Cancel</Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 px-8 rounded-full font-bold">
                            {vendor ? 'Update Vendor' : 'Create Vendor'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default VendorDialog;
