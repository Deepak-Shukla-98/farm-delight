import { PrismaClient, UserType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed a sample user
  const user = await prisma.user.upsert({
    where: { email: "demo@farmdelight.com" },
    update: {},
    create: {
      email: "demo@farmdelight.com",
      password: "password123", // In production, hash passwords!
      userType: UserType.ADMIN,
      first_name: "Demo",
      last_name: "User",
      address: "123 Farm Lane",
      city: "Delight City",
      state: "Healthy",
      pincode: "123456",
      phone: "1234567890",
    },
  });

  // Seed six sample products with different images
  const productImages = [
    "uploads/1722537759392-photo1.avif",
    "uploads/1722537802471-photo2.avif",
    "uploads/1722537818727-photo3.avif",
    "uploads/1722537852781-photo4.avif",
    "uploads/1722537882253-photo5.avif",
    "uploads/1722537897314-photo6.avif",
  ];

  const productNames = [
    "Premium Makhana",
    "Classic Makhana",
    "Spicy Makhana",
    "Sweet Makhana",
    "Roasted Makhana",
    "Organic Makhana",
  ];

  const products = [];
  for (let i = 0; i < 6; i++) {
    const existing = await prisma.product.findFirst({
      where: { name: productNames[i] },
    });
    if (!existing) {
      const product = await prisma.product.create({
        data: {
          name: productNames[i],
          price: 199 + i * 20,
          discount: 5 + i * 2,
          photo: productImages[i],
          inventory: 100 - i * 10,
          short_desc: `Sample description for ${productNames[i]}.`,
          long_desc: `This is a long description for ${productNames[i]}. Enjoy the best makhana experience!`,
          length: 10 + i,
          breadth: 5 + i,
          height: 3 + i,
          weight: 0.5 + i * 0.1,
          status: true,
        },
      });
      products.push(product);
    } else {
      products.push(existing);
    }
  }

  console.log("Seed data created:", { user, products });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
