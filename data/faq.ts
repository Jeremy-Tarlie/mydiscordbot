export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "Comment créer un bot Discord personnalisé avec MyDiscordBot ?",
    answer: "Créer un bot Discord avec MyDiscordBot est très simple ! Rendez-vous sur notre page de création, connectez-vous avec votre compte Discord, choisissez les fonctionnalités que vous souhaitez, et notre système générera automatiquement votre bot personnalisé. Le processus ne prend que quelques minutes."
  },
  {
    question: "Les bots Discord créés avec MyDiscordBot sont-ils gratuits ?",
    answer: "Oui, tous nos bots Discord de base sont entièrement gratuits ! Nous proposons également des fonctionnalités premium pour les utilisateurs qui souhaitent des options avancées comme l'hébergement 24/7, des commandes personnalisées, et un support prioritaire."
  },
  {
    question: "Quelles fonctionnalités puis-je ajouter à mon bot Discord ?",
    answer: "Nos bots Discord incluent de nombreuses fonctionnalités : modération automatique (anti-spam, filtres de contenu), mini-jeux (économie, niveaux, récompenses), gestion de communauté (rôles automatiques, salons temporaires), musique, et bien plus encore. Vous pouvez personnaliser chaque aspect selon vos besoins."
  },
  {
    question: "Comment fonctionne l'hébergement 24/7 pour mon bot Discord ?",
    answer: "Nous proposons un hébergement professionnel 24/7 pour votre bot Discord. Votre bot sera hébergé sur nos serveurs sécurisés avec une disponibilité garantie de 99.9%. Vous n'avez rien à configurer, nous nous occupons de tout !"
  },
  {
    question: "Puis-je personnaliser les commandes de mon bot Discord ?",
    answer: "Absolument ! Vous pouvez créer des commandes personnalisées, modifier les réponses existantes, ajouter des alias, et même créer des commandes avec des paramètres complexes. Notre interface intuitive vous permet de tout personnaliser sans connaissances techniques."
  },
  {
    question: "Mon bot Discord est-il sécurisé ?",
    answer: "La sécurité est notre priorité. Tous nos bots utilisent les meilleures pratiques de sécurité, incluent des protections contre les attaques courantes, et respectent les permissions Discord. Vos données et celles de votre serveur sont protégées."
  },
  {
    question: "Comment obtenir de l'aide pour mon bot Discord ?",
    answer: "Nous offrons un support technique complet ! Vous pouvez nous contacter via notre serveur Discord, par email, ou utiliser notre système de tickets. Notre équipe répond généralement dans les 24 heures."
  },
  {
    question: "Puis-je migrer mon bot Discord existant vers MyDiscordBot ?",
    answer: "Oui, nous proposons un service de migration pour vos bots Discord existants. Notre équipe peut vous aider à transférer vos commandes, configurations, et données vers notre plateforme tout en préservant la fonctionnalité de votre bot."
  },
  {
    question: "Quelles sont les limites d'utilisation des bots Discord gratuits ?",
    answer: "Les bots gratuits incluent toutes les fonctionnalités de base sans limite de temps. Les seules limitations concernent certaines fonctionnalités avancées comme l'hébergement 24/7 et le support prioritaire, qui sont disponibles dans nos plans premium."
  },
  {
    question: "Comment mettre à jour mon bot Discord ?",
    answer: "Les mises à jour sont automatiques ! Nous améliorons constamment nos bots avec de nouvelles fonctionnalités et corrections. Vous recevrez des notifications des nouvelles fonctionnalités disponibles que vous pourrez activer depuis votre tableau de bord."
  }
];

// FAQ spécifiques aux fonctionnalités
export const moderationFAQ: FAQItem[] = [
  {
    question: "Comment configurer la modération automatique de mon bot Discord ?",
    answer: "La modération automatique se configure facilement depuis votre tableau de bord. Vous pouvez activer l'anti-spam, définir des filtres de mots, configurer les sanctions automatiques, et personnaliser les messages d'avertissement."
  },
  {
    question: "Mon bot peut-il détecter et sanctionner automatiquement le spam ?",
    answer: "Oui ! Notre système anti-spam détecte automatiquement les messages répétitifs, les mentions excessives, et les liens suspects. Vous pouvez configurer les sanctions (avertissement, timeout, bannissement) selon votre préférence."
  }
];

export const gamesFAQ: FAQItem[] = [
  {
    question: "Quels mini-jeux sont disponibles pour mon bot Discord ?",
    answer: "Nous proposons de nombreux mini-jeux : système d'économie avec monnaie virtuelle, niveaux et XP, récompenses quotidiennes, jeux de hasard, quiz interactifs, et bien d'autres. Tous sont entièrement personnalisables !"
  },
  {
    question: "Comment configurer le système d'économie de mon serveur Discord ?",
    answer: "Le système d'économie se configure en quelques clics. Vous pouvez définir la monnaie, les taux de gain, les prix des récompenses, et créer des boutiques personnalisées. Vos membres pourront gagner de l'argent en participant activement au serveur."
  }
];

export const hostingFAQ: FAQItem[] = [
  {
    question: "Quels sont les avantages de l'hébergement premium ?",
    answer: "L'hébergement premium offre une disponibilité 24/7, des performances optimisées, des sauvegardes automatiques, un support prioritaire, et des fonctionnalités avancées comme les webhooks et l'API personnalisée."
  },
  {
    question: "Puis-je héberger mon bot sur mes propres serveurs ?",
    answer: "Bien sûr ! Vous pouvez télécharger le code de votre bot et l'héberger où vous le souhaitez. Nous fournissons la documentation complète et le support technique pour vous aider dans la configuration."
  }
];


