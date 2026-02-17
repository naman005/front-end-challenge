"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PRODUCT, GET_PRODUCTS } from "@/graphql/product";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function EditProductDialog({ product, asDropdown }: any) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState(product);
  const [isChanged, setIsChanged] = useState(false);

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  useEffect(() => {
    setForm(product);
  }, [product]);

  useEffect(() => {
    const changed =
      form.name !== product.name ||
      form.description !== product.description ||
      form.price !== product.price ||
      form.quantity !== product.quantity;

    setIsChanged(changed);
  }, [form, product]);

  const handleUpdate = async () => {
    await updateProduct({
      variables: {
        id: product.id,
        input: {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          quantity: Number(form.quantity),
        },
      },
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
{asDropdown ? (
  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    <span onClick={() => setOpen(true)}>Edit</span>
  </DropdownMenuItem>
) : (
  <Button variant="outline" onClick={() => setOpen(true)}>
    Edit
  </Button>
)}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogClose className="absolute right-4 top-4"></DialogClose>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <Input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <Input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
          <Input
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <Button disabled={!isChanged} onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
