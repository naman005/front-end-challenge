"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_PRODUCT, GET_PRODUCTS } from "@/graphql/product";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";


export default function DeleteProductButton({ productId, asDropdown }: any) {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleDelete = async () => {
    await deleteProduct({ variables: { id: productId } });
  };

  return (
    <>
    {asDropdown ? (
  <DropdownMenuItem
    className="text-red-500"
    onClick={handleDelete}
  >
    Delete
  </DropdownMenuItem>
) : (
  <Button variant="destructive" size="sm" onClick={handleDelete}>
    Delete
  </Button>
)}
</>
  );
}
