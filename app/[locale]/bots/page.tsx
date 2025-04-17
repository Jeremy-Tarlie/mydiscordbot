import React from 'react'
import BotList from '@/components/Bots/BotList'

const page = () => {

  const data = {
    nbr_bot_max: 8,
    bots: [
      {
        id: "1",
        title: "Customer Support Bot",
        description:
          "AI-powered assistant to handle customer inquiries and support tickets 24/7.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "2",
        title: "Social Media Manager",
        description:
          "Automate your social media posting and engagement with this intelligent bot.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "3",
        title: "Data Analysis Bot",
        description:
          "Process large datasets and generate insights automatically on schedule.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "4",
        title: "Trading Bot",
        description:
          "Execute trading strategies based on market conditions and custom parameters.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "5",
        title: "Content Creation Bot",
        description:
          "Generate blog posts, articles and marketing copy with AI assistance.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "6",
        title: "Email Marketing Bot",
        description:
          "Schedule and optimize email campaigns with personalized content.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "7",
        title: "Language Translation Bot",
        description:
          "Translate content between multiple languages with high accuracy.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "8",
        title: "Research Assistant Bot",
        description:
          "Collect and summarize information from multiple sources automatically.",
        image: "/api/placeholder/300/200",
      },
    ],
  };

  return (
    <div>
      <BotList data={data} />
    </div>
  )
}

export default page
