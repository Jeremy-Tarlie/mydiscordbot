import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Parse le corps de la requête

    if (!data.name || !data.host) {
      return NextResponse.json({
        message: "Veuillez remplir tous les champs",
      }, { status: 400 });
    }



    return NextResponse.json({ message: "Données reçues avec succès", data });
  } catch (error) {
    console.error("Erreur de traitement des données :", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}