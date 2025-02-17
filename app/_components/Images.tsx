import planes from "@/public/planes.jpg";
import window from "@/public/window.jpg";
import interior from "@/public/interior.jpg";
import wing from "@/public/wing.jpg";
import hotel from "@/public/hotel.jpg";
import islandvilla from "@/public/islandvilla.jpeg";
import luxury from "@/public/luxury.jpg";
import pool from "@/public/pool.jpg";
import Image from "next/image";

const planeImages = [
  { src: window, alt: "A photo of a plane window" },
  { src: planes, alt: "A photo of 2 planes" },
  { src: interior, alt: "A photo of a plane inside" },
  { src: wing, alt: "A photo of a plane wing" },
];

const hotelImages = [
  { src: hotel, alt: "Burdj al arab photo" },
  { src: islandvilla, alt: "An island villa photo" },
  { src: luxury, alt: "A photo of a luxury hotel" },
  { src: pool, alt: "A photo of a hotel pool" },
];

type ImagesProps = {
  pic: "plane" | "hotel";
};

export default function Images({ pic }: ImagesProps) {
  return (
    <div className="w-[28%] max-lg:hidden grid grid-cols-2 grid-rows-2 justify-items-center gap-y-3">
      {pic === "plane"
        ? planeImages.map((image) => (
            <div
              key={image.alt}
              className="w-[12rem] h-[12rem] rounded-full overflow-hidden relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                placeholder="blur"
                quality={100}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ))
        : hotelImages.map((image) => (
            <div
              key={image.alt}
              className="w-[12rem] h-[12rem] rounded-full overflow-hidden relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                placeholder="blur"
                quality={100}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ))}
    </div>
  );
}
