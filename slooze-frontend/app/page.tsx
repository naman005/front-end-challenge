"use client";

import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/graphql/product";
import ProductTable from "@/components/ProductTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import { useEffect } from "react"
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface GetProductsResponse {
  products: Product[];
}


export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
        
          useEffect(() => {
            if (!user) {
              router.replace("/login");
            }
          }, [user, router]);

  const { data, loading, error } = useQuery<GetProductsResponse>(GET_PRODUCTS);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading products</p>;
  
  return (
    <div className="p-6">

      <ProductTable products={data?.products || []} />
    </div>
  );
}
