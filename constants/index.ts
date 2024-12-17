import { TypeOfContrat } from "@/types";
import { Status, UserRole } from "@prisma/client";
import {
  Accessibility,
  Cross,
  Database,
  DatabaseBackup,
  Frame,
  Home,
  IdCard,
  Map,
  PersonStanding,
  BadgeCheck,
  PieChart,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navUsers: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "gestion des donnees",
      url: "",
      icon: Database,
      isActive: false,
      items: [
        {
          title: "Compagnie",
          url: "/company",
        },
        {
          title: "Apporteurs",
          url: "/bringer",
        },
        {
          title: "Souscripteurs",
          url: "/subscriber",
        },
        {
          title: "Assures",
          url: "/insured",
        },
      ],
    },
    {
      title: "Recap des donnees",
      url: "",
      icon: DatabaseBackup,
      items: [
        {
          title: "Souscritpeur",
          url: "/subscriber/subscriber-summury-data-page",
        },
        {
          title: "Assuré",
          url: "/insured/insured-summury-data-page",
        },
        {
          title: "Police",
          url: "/data-table/policy-summury-data-page",
        },
        {
          title: "Garantie",
          url: "/data-table/guarantee-summury-data-page",
        },
        {
          title: "Prime",
          url: "/data-table/prime-summury-data-page",
        },
      ],
    },
    {
      title: "Sinistre",
      url: "",
      icon: PersonStanding,
      items: [
        {
          title: "Traitement",
          url: "/sinister/treatment",
        },
        {
          title: "reglement",
          url: "/sinister/regulation",
        },
      ],
    },
    {
      title: "Edition de carte",
      url: "/card-edition",
      icon: IdCard ,
    },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings2,
    //     items: [
    //         {
    //             title: "General",
    //             url: "#",
    //         },
    //         {
    //             title: "Team",
    //             url: "#",
    //         },
    //         {
    //             title: "Billing",
    //             url: "#",
    //         },
    //         {
    //             title: "Limits",
    //             url: "#",
    //         },
    //     ],
    // },
  ],
  navRescue: [
    {
      title: "Declaration de sinistre",
      url: "/first-aid",
      icon: Accessibility,
    },
  ],
  healthCenter: [
    {
      name: "Centre de santé",
      url: "/health-center",
      icon: Cross,
    },
  ],
  brokerageCompany: [
    {
      name: "Coutier",
      url: "/brokerage-company",
      icon: BadgeCheck,
    },
  ],
};

export const bloodGroups = [
  {
    value: "A+",
    label: "A+",
  },
  {
    value: "A-",
    label: "A-",
  },
  {
    value: "O+",
    label: "O+",
  },
  {
    value: "O-",
    label: "O-",
  },
  {
    value: "B+",
    label: "B+",
  },
  {
    value: "B-",
    label: "B-",
  },
  {
    value: "AB+",
    label: "AB+",
  },
  {
    value: "AB-",
    label: "AB-",
  },
];

export const typeOfContrat: TypeOfContrat[] = [
  {
    id: "1",
    name: "Formule IA 1",
    prime: 1000,
    specs: {
      deathCapital: 1000000,
      individualCapital: 1000000,
      medicalExpenses: 100000,
      dailyCosts: 1000,
    },
  },
  {
    id: "2",
    name: "Formule IA 2",
    prime: 2000,
    specs: {
      deathCapital: 2000000,
      individualCapital: 2000000,
      medicalExpenses: 200000,
      dailyCosts: 2000,
    },
  },
  {
    id: "3",
    name: "Formule IA 3",
    prime: 3000,
    specs: {
      deathCapital: 3000000,
      individualCapital: 3000000,
      medicalExpenses: 300000,
      dailyCosts: 3000,
    },
  },
  {
    id: "4",
    name: "Formule IA 4",
    prime: 4000,
    specs: {
      deathCapital: 4000000,
      individualCapital: 4000000,
      medicalExpenses: 400000,
      dailyCosts: 4000,
    },
  },
  {
    id: "5",
    name: "Formule IA 5",
    prime: 5000,
    specs: {
      deathCapital: 5000000,
      individualCapital: 5000000,
      medicalExpenses: 500000,
      dailyCosts: 5000,
    },
  },
  {
    id: "custom",
    name: "Formule IA Spéciale",
    prime: 0,
    specs: {
      deathCapital: 0,
      individualCapital: 0,
      medicalExpenses: 0,
      dailyCosts: 0,
    },
    isCustom: true,
  },
];

export const roles = [
  {
    label: "Administrateur",
    value: UserRole.ADMIN,
  },
  {
    label: "Courtier",
    value: UserRole.USER,
  },
  {
    label: "Secouristes",
    value: UserRole.FIRST_AIDERS,
  },
  {
    label: "Centre de prise en charge",
    value: UserRole.CARE_CENTER,
  },
];

export const statusOptions = [
  {
    label: "Actif",
    value: Status.ACTIVE,
  },
  {
    label: "Inactif",
    value: Status.INACTIVE,
  },
  {
    label: "En attente",
    value: Status.PENDING,
  }
];

export const roleLabels = {
  ADMIN: "Administrateur",
  USER: "Utilisateur",
  FIRST_AIDERS: "Secouristes",
  CARE_CENTER: "Centre de prise en charge",
};

export const declarantLabels = {
  FIRST_AIDERS: "Secouristes",
  HEALTH_CENTER: "Centre de santé",
}

export const statusOptionsLabel = {
  ACTIVE: "Actif",
  INACTIVE: "Inactif",
  PENDING: "En attente",
}

export const statusColors = {
  ACTIVE: "bg-green-500 text-primary-foreground text-xs px-3 py-1 rounded-md",
  INACTIVE: "bg-red-500 text-primary-foreground text-xs px-3 py-1 rounded-md",
  PENDING: "bg-yellow-500 text-primary-foreground text-xs px-3 py-1 rounded-md",
};
