import prisma from "@/lib/prisma";
import Image from "next/image";


await prisma.$connect();
console.log("DB locale connectée");

export default function Home() {
  return(
    <h1>HELLO WORLD</h1>
  );
}
