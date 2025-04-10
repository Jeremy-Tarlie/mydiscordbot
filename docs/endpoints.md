# Documentation des Endpoints API

## POST /api/email

Endpoint pour gérer l'envoi d'emails lors de la commande d'un bot Discord.

### Paramètres de la requête
```json
{
  "recaptchaToken": "string",
  "bot_view": {
    "name": "string",
    "description": "string",
    "host": "boolean (string)",
    "comment": "string",
    "img": "string (base64)",
    "discord": "string",
    "email": "string"
  },
  "command": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "price": "number"
}
```

### Champs obligatoires
- email
- discord
- name

### Réponses

#### Succès (200)
```json
{
  "success": true
}
```

#### Erreurs
- 400: "CAPTCHA validation failed"
- 400: "Email, Discord, et Nom du bot sont obligatoires"
- 400: "Email invalide"
- 500: Message d'erreur spécifique
- 405: "Method Not Allowed"

### Fonctionnalités
- Validation du CAPTCHA Cloudflare Turnstile
- Validation des champs obligatoires
- Validation du format email
- Envoi d'un email de confirmation au client
- Envoi d'un email détaillé à l'administrateur
- Support pour les images en base64

---

## POST /api/command

Endpoint pour traiter les données initiales d'une commande de bot.

### Paramètres de la requête
```json
{
  "name": "string",
  "host": "string"
}
```

### Champs obligatoires
- name
- host

### Réponses

#### Succès (200)
```json
{
  "message": "Données reçues avec succès",
  "data": {
    "name": "string",
    "host": "string"
  }
}
```

#### Erreurs
- 400: "Veuillez remplir tous les champs"
- 500: "Erreur interne du serveur"