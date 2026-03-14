'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ProductCard from '@/components/cards/ProductCard';
import { mockProducts, mockCategories } from '@/lib/api/mockData';
import {
    Filter,
    ChevronDown,
    Grid2X2,
    List,
    SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const ProductListingContent = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const imageSearch = searchParams.get('imageSearch');

    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const filteredProducts = useMemo(() => {
        let products = [...mockProducts];
        if (query) {
            products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        }
        if (imageSearch) {
            // For demo purposes, we randomly slice the array to simulate image search results
            products = products.slice(0, 3);
        }
        return products;
    }, [query, imageSearch]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 mt-16">
                    <span className="hover:text-primary cursor-pointer">Home</span>
                    <span>/</span>
                    <span className="text-foreground font-medium">All Products</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">Categories</h3>
                            <div className="space-y-3">
                                {mockCategories.map((cat) => (
                                    <div key={cat.id} className="flex items-center gap-3">
                                        <Checkbox id={cat.id} />
                                        <label htmlFor={cat.id} className="text-sm font-medium leading-none cursor-pointer">
                                            {cat.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Price Range</h3>
                            <div className="px-2">
                                <Slider
                                    defaultValue={[0, 1000]}
                                    max={1000}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    className="mb-4"
                                />
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-bold">${priceRange[0]}</span>
                                    <span className="font-bold">${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Minimum Rating</h3>
                            <div className="space-y-2">
                                {[4, 3, 2].map((r) => (
                                    <div key={r} className="flex items-center gap-2 text-sm">
                                        <Checkbox id={`r-${r}`} />
                                        <label htmlFor={`r-${r}`} className="flex items-center gap-1 cursor-pointer">
                                            {r}+ Stars
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button className="w-full" variant="outline">
                            Clear All Filters
                        </Button>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {imageSearch ? 'Image Scan Results' : query ? `Search Results for "${query}"` : 'Featured Catalog'}
                                </h1>
                                <p className="text-muted-foreground mt-1 text-sm">Showing 1-{filteredProducts.length} of {filteredProducts.length} products</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-lg p-1 bg-muted/50">
                                    <Button
                                        variant={view === 'grid' ? 'secondary' : 'ghost'}
                                        size="icon"
                                        onClick={() => setView('grid')}
                                        className="h-8 w-8"
                                    >
                                        <Grid2X2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={view === 'list' ? 'secondary' : 'ghost'}
                                        size="icon"
                                        onClick={() => setView('list')}
                                        className="h-8 w-8"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            Sort By: Popularity <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                        <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                        <DropdownMenuItem>Newest First</DropdownMenuItem>
                                        <DropdownMenuItem>Best Rating</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-muted-foreground">
                                    No products found matching your search.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex items-center justify-center gap-2">
                            <Button variant="outline" size="icon" disabled>&lt;</Button>
                            <Button variant="secondary" className="bg-primary text-white">1</Button>
                            <Button variant="ghost">2</Button>
                            <Button variant="ghost">3</Button>
                            <span className="px-2">...</span>
                            <Button variant="ghost">12</Button>
                            <Button variant="outline" size="icon">&gt;</Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const ProductListing = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
            <ProductListingContent />
        </Suspense>
    );
};

export default ProductListing;
