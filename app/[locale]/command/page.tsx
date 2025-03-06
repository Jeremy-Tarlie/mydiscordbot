"use client";
import { useState } from "react";
import Form_step_1 from "@/components/Command/Form_step_1";
import View_Bot from "@/components/Command/View_bot";
import styles from "@/public/style/command.module.css";
import { Toaster } from "react-hot-toast";

type Bot = {
  name: string;
  img?: string;
  img_url?: string;
  host: string;
  description: string;
  comment: string;
};

const Command = () => {
  const [bot, setBot] = useState<Bot>({
    name: "",
    img: "",
    img_url: "",
    host: "false",
    description: "",
    comment: "",
  });

  return (
    <main>
      <div className={styles.container_commande}>
        <Toaster position="top-center" reverseOrder={false} />
        <View_Bot bot_view={bot} />
        <Form_step_1 bot={bot} setBot={setBot} />
      </div>
    </main>
  );
};

export default Command;