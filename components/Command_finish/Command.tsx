"use client";
import style from "@/public/style/command_finish.module.css";
import list_command_fr from "@/public/locale/fr/list_command.json";
import list_command_en from "@/public/locale/en/list_command.json";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState, useMemo, useEffect } from "react";
import {toast} from "react-hot-toast";

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

interface CommandProps {
  bot: Bot;
  setBot: React.Dispatch<React.SetStateAction<Bot>>;
}

const Command: React.FC<CommandProps> = ({ bot, setBot }) => {
  const locale = useLocale();
  const initialCommands =
    locale === "fr"
      ? list_command_fr.list_command
      : list_command_en.list_command;
  const t = useTranslations("command_finish");
  const [commands, setCommands] = useState(initialCommands);
  const [selectedCommands, setSelectedCommands] = useState<
    { name: string; description: string; custom?: boolean }[]
  >([]);

  const additionalCost = useMemo(() => {
    const totalCommands = selectedCommands.length;
    const customCommands = selectedCommands.filter((cmd) => cmd.custom).length;

    const baseCommands = 20;
    const surchargePer3 = 1;
    const customCommandCost = 1;

    const additionalCommands =
      totalCommands > baseCommands
        ? Math.ceil((totalCommands - baseCommands) / 3)
        : 0;

    return (
      additionalCommands * surchargePer3 + customCommands * customCommandCost
    );
  }, [selectedCommands]);

  useEffect(() => {
    setBot((prevBot: Bot) => ({
      ...prevBot,
      price: additionalCost,
    }));
  }, [additionalCost]);

  const addCommand = () => {
    const commandName = document.getElementById(
      "commandName"
    ) as HTMLInputElement;
    const textareaCommand = document.getElementById(
      "textareaCommand"
    ) as HTMLTextAreaElement;

    const commandExist = commands.find(
      (command) => command.name === commandName.value
    );

    if (commandName.value && textareaCommand.value && !commandExist) {
      const newCommand = {
        name: commandName.value,
        description: textareaCommand.value,
        delay: 0,
        price: 0,
        custom: true,
      };

      setCommands((prev) => [...prev, newCommand]);
      setBot({
        ...bot,
        command: [...(bot.command || []), newCommand],
      });
      setSelectedCommands((prev) => [...prev, newCommand]);

      commandName.value = "";
      textareaCommand.value = "";
      toast.success(t("success.success_command"));
    } else if (commandExist) {
      toast.error(t("error.command_exist"));
    } else {
      toast.error(t("error.fill_all_fields"));
    }
  };

  const command_select =
    (command: { name: string; description: string }) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedCommands((prev) => [...prev, command]);

        setBot((prevBot: Bot) => ({
          ...prevBot,
          command: [...(prevBot.command || []), command],
        }));
      } else {
        setSelectedCommands((prev) =>
          prev.filter((selected) => selected.name !== command.name)
        );

        setBot((prevBot: Bot) => ({
          ...prevBot,
          command: (prevBot.command || []).filter(
            (selected: { name: string; description: string; custom?: boolean }) => selected.name !== command.name
          ),
        }));
      }
    };

  return (
    <div className={style.commandes_list}>
      <ul className={style.command_list_ul}>
        {commands.map((command) => (
          <li key={command.name} className={style.commande}>
            <input
              className="checkbox"
              type="checkbox"
              onChange={command_select(command)}
              checked={selectedCommands.some(
                (selected) => selected.name === command.name
              )}
            />
            <label>
              <strong>{command.name}</strong>
              <span>{` : ${command.description}`}</span>
            </label>
          </li>
        ))}

        <li className={style.other_command}>
          <div>
            <input id="commandName" type="text" placeholder="Command name" />
            <strong>:</strong>
            <textarea
              id="textareaCommand"
              placeholder="Command description"
            ></textarea>
          </div>
          <button type="button" onClick={addCommand}>
            {t("add_command")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Command;
