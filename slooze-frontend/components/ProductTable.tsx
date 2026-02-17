"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import CreateProductDialog from "./dialogs/CreateProductDialog";
import EditProductDialog from "./dialogs/EditProductDialog";
import DeleteProductButton from "./dialogs/DeleteProductButton";

export default function ProductTable({ products }: any) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <CreateProductDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-1 w-1" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
        <EditProductDialog product={product} asDropdown />
      <DeleteProductButton productId={product.id} asDropdown />

    </DropdownMenuContent>
  </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
