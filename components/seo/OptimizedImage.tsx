import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Générer un placeholder blur si non fourni
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  if (hasError) {
    return (
      <div 
        className={`image-error ${className}`}
        style={{ 
          width, 
          height, 
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '0.875rem'
        }}
        role="img"
        aria-label={`Erreur de chargement: ${alt}`}
      >
        Image non disponible
      </div>
    );
  }

  return (
    <div className={`image-container ${className}`} style={{ position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        {...props}
      />
      
      {!isLoaded && !hasError && (
        <div 
          className="image-skeleton"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '0.875rem'
          }}
        >
          Chargement...
        </div>
      )}
    </div>
  );
}

// Composant spécialisé pour les images de bots Discord
interface BotImageProps {
  botId: string;
  botName: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function BotImage({ 
  botId, 
  botName, 
  size = 128, 
  className = '',
  priority = false 
}: BotImageProps) {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${botId}/avatar.png`;
  
  return (
    <OptimizedImage
      src={avatarUrl}
      alt={`Avatar du bot Discord ${botName}`}
      width={size}
      height={size}
      priority={priority}
      className={`bot-avatar ${className}`}
      sizes={`${size}px`}
      quality={90}
      placeholder="blur"
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}

// Composant pour les images de héros avec optimisation SEO
interface HeroImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function HeroImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = true 
}: HeroImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`hero-image ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={90}
      placeholder="blur"
      loading="eager"
    />
  );
}
