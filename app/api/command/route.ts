import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const csrfTokenFromCookie = cookieStore.get("csrf-token")?.value;

    const data = await req.json(); // Parse le corps de la requête
    const { csrf_token: csrfTokenFromBody, ...botData } = data;

    if (!csrfTokenFromCookie || !csrfTokenFromBody || csrfTokenFromCookie !== csrfTokenFromBody) {
      return NextResponse.json({ message: "Invalid CSRF token" }, { status: 403 });
    }

    if (!botData.name || !botData.host) {
      return NextResponse.json(
        {
          message: "Veuillez remplir tous les champs",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Données reçues avec succès", data: botData });
  } catch (error) {
    console.error("Erreur de traitement des données :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
