interface MetaProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export const generateMeta = ({
  title,
  description,
  imageUrl,
  url,
}: MetaProps) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@username" />
    <script
      src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      async
      defer
    ></script>
  </>
);
