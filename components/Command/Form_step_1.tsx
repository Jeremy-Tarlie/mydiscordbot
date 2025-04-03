"use client";
import style from "@/public/style/form_step_1.module.css";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useParams } from 'next/navigation';

interface Bot {
  name: string;
  img?: string;
  img_url?: string;
  host: string;
  description: string;
  comment: string;
}

const Form_step_1 = ({
  bot,
  setBot,
}: {
  bot: Bot;
  setBot: React.Dispatch<React.SetStateAction<Bot>>;
}) => {
  const t = useTranslations("command");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBot((prevData: Bot) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          if (typeof reader.result === "string") {
            resolve(reader.result.split(",")[1]); // Extraire la base64
          } else {
            reject(new Error("Failed to convert blob to base64"));
          }
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bot),
      });

      if (response.ok) {
        localStorage.setItem("botData", JSON.stringify(bot));
        const routeLocale = `/${locale}/command_finish`
        router.push(routeLocale);
      } else {
        toast.error(t("error.error_submit"));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      toast.error(t("error.error_submit"));
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form}
      action="" // Ce champ devrait être vide ou non défini
      method="post" // Optionnel, car `fetch`
    >
      <div className={style.form_group}>
        <label>
          <span>{t("title_bot")}</span>
          <span className={"required"}>*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={bot.name}
          onChange={handleChange}
          required
          maxLength={35}
        />
      </div>
      <div className={style.form_group}>
        <label>{t("img_bot")}</label>
        <input
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const fileInput = document.querySelector('input[type="file"]');
            if (!fileInput) {
              throw new Error("File input not found");
            }
            const fileInputElement = fileInput as HTMLInputElement;
            if (
              !fileInputElement.files ||
              fileInputElement.files.length === 0
            ) {
              throw new Error("No file selected");
            }
            const file = fileInputElement.files[0]; // Exemple de récupération du fichier

            if (!file.type.startsWith("image/")) {
              toast.error("Le fichier sélectionné n'est pas une image");
              return;
            }

            if (!file.type.startsWith("image/")) {
              toast.error("Seuls les fichiers d'image sont autorisés");
              fileInputElement.value = "";
              setBot((prevData: Bot) => ({
                ...prevData,
                img: "",
                img_url: "",
              }));
              return;
            }

            if (file.size > 1024 * 1024) {
              toast.error("L'image est trop lourde");
              return;
            }

            // Convertir le fichier Blob en base64
            const base64Image = await convertBlobToBase64(file);

            setBot((prevData: Bot) => ({
              ...prevData,
              img: base64Image as string,
              img_url: e.target.files
                ? URL.createObjectURL(e.target.files[0])
                : "",
            }));
          }}
        />
      </div>
      <div className={style.form_group}>
        <label>{t("host.title")}</label>
        <select name="host" id="host" value={bot.host} onChange={handleChange}>
          <option value="false">{t("host.false")}</option>
          <option value="true">{t("host.true")}</option>
        </select>
      </div>
      <div className={style.form_group}>
        <label>{t("description")}</label>
        <textarea
          name="description"
          id="description"
          value={bot.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={style.form_group}>
        <label>{t("comment")}</label>
        <textarea
          name="comment"
          id="comment"
          value={bot.comment}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">{t("next_step")}</button>
    </form>
  );
};

export default Form_step_1;
