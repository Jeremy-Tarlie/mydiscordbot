"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "@/public/style/botCard.module.css";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  image,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card_content}>
        <div className={style.card_top}>
          <div className={style.card_image_container}>
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              className={style.card_image}
            />
          </div>
          <div className={style.card_title_container}>
            <h2 className={style.card_title}>{title}</h2>
          </div>
        </div>
        <p className={style.card_description}>
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>
        <Link href={`/fr/bots/${id}`} className={style.card_link}>
          Voir plus
        </Link>
      </div>
    </div>
  );
};

export default Card;