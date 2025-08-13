"use client";
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "@/public/style/botCard.module.css";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = memo(({
  id,
  title,
  description,
  image,
}) => {
  const t = useTranslations("bots");
  const params = useParams();
  const locale = params.locale as string;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mémoisation de la description tronquée
  const truncatedDescription = React.useMemo(() => {
    return description.length > 100 ? description.slice(0, 100) + "..." : description;
  }, [description]);

  // Gestion des erreurs d'image
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Gestion du chargement d'image
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Image de fallback
  const fallbackImage = "/img/bot.png";

  return (
    <div className={style.card}>
      <div className={style.card_content}>
        <div className={style.card_top}>
          <div className={style.card_image_container}>
            <Image
              src={imageError ? fallbackImage : image}
              alt={title}
              width={300}
              height={200}
              className={`${style.card_image} ${imageLoaded ? style.image_loaded : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
            {!imageLoaded && !imageError && (
              <div className={style.image_skeleton}></div>
            )}
          </div>
          <div className={style.card_title_container}>
            <h2 className={style.card_title}>{title}</h2>
          </div>
        </div>
        <p className={style.card_description}>
          {truncatedDescription}
        </p>
        <Link 
          href={`/${locale}/bots/${id}`} 
          className={style.card_link}
          prefetch={false}
        >
          {t("card_link")}
        </Link>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;