"use client";
import Command from "@/components/Command_finish/Command";
import Info_command from "@/components/Command_finish/Info_command";
import styles from "@/public/style/command_finish.module.css";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

type Bot = {
  bot_view: {
    name: string;
    img?: string;
    img_url?: string;
    host: string;
    description: string;
    comment: string;
    discord: string;
    email: string;
  };
  command?: Array<{ name: string; description: string; custom?: boolean }>;
  price: number;
};

const Command_finish = () => {
  const [bot, setBot] = useState<Bot>(() => ({
    bot_view: {
      name: "",
      img: "",
      img_url: "",
      host: "",
      description: "",
      comment: "",
      discord: "",
      email: "",
    },
    command: [],
    price: 0,
  }));

  useEffect(() => {
    const storedBotData = {
      name: "",
      img: "",
      img_url: "",
      host: "",
      description: "",
      comment: "",
      discord: "",
      email: "",
      ...JSON.parse(localStorage.getItem("botData") || "{}"),
    };
    setBot((prevBot) => ({ ...prevBot, bot_view: storedBotData }));
  }, []);

  return (
    <main>
      <div className={styles.page_header}>
        <h1>Finaliser votre commande</h1>
        <p>Sélectionnez les commandes pour votre bot et complétez vos informations de contact</p>
      </div>
      
      <div className={styles.container_commande}>
        <Toaster position="top-center" reverseOrder={false} />
        <Command bot={bot} setBot={setBot} />
        <Info_command bot={bot} setBot={setBot} />
      </div>
    </main>
  );
};

export default Command_finish;