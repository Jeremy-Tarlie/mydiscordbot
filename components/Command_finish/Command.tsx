"use client";
import style from "@/public/style/command_finish.module.css";
import list_command_fr from "@/public/locale/fr/list_command.json";
import list_command_en from "@/public/locale/en/list_command.json";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useState, useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";

type Command = {
  name: string;
  description: string;
  delay?: number;
  price?: number;
  category?: string;
  custom?: boolean;
};

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
  command?: Command[];
  price: number;
};

interface CommandProps {
  bot?: Bot;
  setBot: React.Dispatch<React.SetStateAction<Bot>>;
}

const Command: React.FC<CommandProps> = ({ setBot }) => {
  const locale = useLocale();
  const initialCommands =
    locale === "fr"
      ? list_command_fr.list_command
      : list_command_en.list_command;
  const t = useTranslations("command_finish");
  const [commands, setCommands] = useState<Command[]>(initialCommands);
  const [selectedCommands, setSelectedCommands] = useState<Command[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const groupedCommands = useMemo(() => {
    const filtered = commands.filter(
      (command) =>
        command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, command) => {
      const category = command.category || "Sans catégorie";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(command);
      return acc;
    }, {} as Record<string, Command[]>);
  }, [commands, searchTerm]);

  const additionalCost = useMemo(() => {
    const totalCommands = selectedCommands.length;
    const customCommands = selectedCommands.filter((cmd) => cmd.custom).length;

    const baseCommands = 20;
    const surchargePer3 = 1;
    const customCommandCost = 1;

    const additionalCommands =
      totalCommands > baseCommands
        ? Math.ceil((totalCommands - baseCommands) / 5)
        : 0;

    return (
      additionalCommands * surchargePer3 + customCommands * customCommandCost
    );
  }, [selectedCommands]);

  useEffect(() => {
    setBot((prevBot) => ({
      ...prevBot,
      price: additionalCost + 2,
      command: selectedCommands,
    }));
  }, [additionalCost, selectedCommands, setBot]);

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
      const newCommand: Command = {
        name: commandName.value,
        description: textareaCommand.value,
        category: "Sans catégorie",
        custom: true,
      };

      setCommands((prev) => [...prev, newCommand]);
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

  const toggleCommand = (command: Command) => {
    const isSelected = selectedCommands.some(
      (selected) => selected.name === command.name
    );

    if (isSelected) {
      setSelectedCommands((prev) =>
        prev.filter((selected) => selected.name !== command.name)
      );
    } else {
      setSelectedCommands((prev) => [...prev, command]);
    }
  };

  return (
    <div className={style.commandes_list}>
      <div className={style.search_container}>
        <label htmlFor="search" className={style.search_label}>
          {t("search_label")}
        </label>
        <input
          type="search"
          id="search"
          placeholder={t("search_placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={style.search_input}
        />
      </div>

      <ul className={style.command_list_ul}>
        {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
          <div key={category}>
            <h3 className={style.category_title}>{category}</h3>
            {categoryCommands.map((command) => (
              <li
                key={command.name}
                className={style.commande}
                onClick={() => toggleCommand(command)}
              >
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={(e) => e.stopPropagation()}
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
          </div>
        ))}

        <li className={style.other_command}>
          <div className={style.commande_div}>
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
