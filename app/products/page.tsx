'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/cards/ProductCard';
import { useProductStore } from '@/store/useProductStore';
import { useCategoryStore } from '@/store/useCategoryStore';
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
    const { products } = useProductStore();
    const { categories } = useCategoryStore();
    const query = searchParams.get('q');
    const imageSearch = searchParams.get('imageSearch');

    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>('popularity');

    const handleClearFilters = () => {
        setPriceRange([0, 1000]);
        setSelectedCategories([]);
        setMinRating(null);
        setSortBy('popularity');
    };

    const toggleCategory = (categoryName: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const filteredProducts = useMemo(() => {
        let pList = [...products];

        // Search Query filter
        if (query) {
            pList = pList.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        }

        // Image Search simulation
        if (imageSearch) {
            pList = pList.slice(0, 3);
        }

        // Category filter
        if (selectedCategories.length > 0) {
            pList = pList.filter(p => selectedCategories.includes(p.category));
        }

        // Price filter
        pList = pList.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Rating filter
        if (minRating) {
            pList = pList.filter(p => p.rating >= minRating);
        }

        // Sorting
        if (sortBy === 'price-low') {
            pList.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            pList.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            pList.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'newest') {
            // Newest simulation: assume higher ID or reverse order
            pList.reverse();
        }

        return pList;
    }, [products, query, imageSearch, selectedCategories, priceRange, minRating, sortBy]);

    return (
        <div className="min-h-screen bg-background">

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
                                {categories.map((cat) => (
                                    <div key={cat.id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={cat.id}
                                            checked={selectedCategories.includes(cat.name)}
                                            onCheckedChange={() => toggleCategory(cat.name)}
                                        />
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
                                        <Checkbox
                                            id={`r-${r}`}
                                            checked={minRating === r}
                                            onCheckedChange={() => setMinRating(prev => prev === r ? null : r)}
                                        />
                                        <label htmlFor={`r-${r}`} className="flex items-center gap-1 cursor-pointer">
                                            {r}+ Stars
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={handleClearFilters}
                        >
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
                                            Sort By: {
                                                sortBy === 'popularity' ? 'Popularity' :
                                                    sortBy === 'price-low' ? 'Price: Low to High' :
                                                        sortBy === 'price-high' ? 'Price: High to Low' :
                                                            sortBy === 'newest' ? 'Newest First' :
                                                                sortBy === 'rating' ? 'Best Rating' : 'Popularity'
                                            } <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setSortBy('popularity')}>Popularity</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest First</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy('rating')}>Best Rating</DropdownMenuItem>
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
