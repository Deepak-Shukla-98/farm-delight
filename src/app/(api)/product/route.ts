import { apiMiddleware } from "@/components/utils/apimiddleware";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    if (!products) {
      return new Response(JSON.stringify({ error: "No Products" }), {
        headers: {
          "Content-type": "application/json",
        },
        status: 404, // Not Found
      });
    }
    let data = products.map((d) => ({ ...d, quantity: 1 }));
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.log({ error });
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-type": "application/json",
      },
      status: 500,
    });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
    const formData = await request.formData();
    const data: { [key: string]: any } = {};
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });
    formData.forEach(async (value, key) => {
      if (value instanceof File) {
        // Save the file to the uploads directory
        let name = new Date().getTime() + "-" + value.name;
        data[key] = `/uploads/${name}`; // Store the relative path or the name
        const filePath = path.join(uploadsDir, `${name}`);
        const arrayBuffer = await value.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));
      } else {
        data[key] = value;
      }
    });
    const { name, price, discount, inventory, status, photo } = data;
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        discount: parseFloat(discount),
        photo,
        inventory: parseInt(inventory, 10),
        status: status === "in_stock",
      },
    });
    return new Response(JSON.stringify(product), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
export async function PUT(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
    const formData = await request.formData();
    const data: { [key: string]: any } = {};
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });
    formData.forEach(async (value, key) => {
      if (value instanceof File) {
        // Save the file to the uploads directory
        let name = new Date().getTime() + "-" + value.name;
        data[key] = `/uploads/${name}`; // Store the relative path or the name
        const filePath = path.join(uploadsDir, `${name}`);
        const arrayBuffer = await value.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));
      } else {
        data[key] = value;
      }
    });
    const {
      productId = data.id,
      name,
      price,
      discount,
      inventory,
      status,
      photo,
    } = data;
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price: parseFloat(price),
        discount: parseFloat(discount),
        photo,
        inventory: parseInt(inventory, 10),
        status: status === "in_stock",
      },
    });
    return new Response(JSON.stringify(updatedProduct), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await apiMiddleware(request)) as { id: string };
    if (!id) {
      return new Response(JSON.stringify({ error: "Not Authorised" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
    const url = new URL(request.url);
    const productId = url.searchParams.get("id");
    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
    // Fetch the product to get the photo path
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }
    // Delete the product from the database
    await prisma.product.delete({
      where: { id: productId },
    });
    // Delete the file associated with the product
    const filePath = path.join(process.cwd(), `/public${product.photo}`);
    await fs.unlink(filePath);
    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
