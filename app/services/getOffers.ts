import getOfferById from "./getOfferById";

export interface JobOffer {
  title: string;
  id: string;
  state: number;
  creationDate: string;
  updateDate: string;
  city: string;
  externalUrlForm: string;
  blocked: boolean;
  applications: number;
  teleworking: Category;
  province: Category;
  experienceMin: Category;
  category: Category;
  subcategory: Category;
  studiesMin: Category;
  residence: Category;
  country: Category;
  contractType: Category;
  journey: Category;
  subSegment: number;
  profile: Profile;
  cityPD: number;
  zipCode: string;
  latitude: number;
  longitude: number;
  exactLocation: boolean;
  department: string;
  vacancies: number;
  minRequirements: string;
  description: string;
  desiredRequirements: string;
  commissions: string;
  contractDuration: string;
  referenceId: string;
  detailedStudiesId: number;
  studying: boolean;
  showPay: boolean;
  multiProvince: boolean;
  maxPay: Pay;
  minPay: Pay;
  schedule: string;
  jobLevel: Category;
  staffInCharge: Category;
  hasKillerQuestions: number;
  hasOpenQuestions: number;
  upsellings: Upsellings;
  epreselec: boolean;
  fiscalAddress: string;
  shouldAskExportConsent: boolean;
  exportConsentName: string;
  link: string;
  active: boolean;
  archived: boolean;
  deleted: boolean;
  disponibleForFullVisualization: boolean;
  availableForVisualization: boolean;
  skillsList: SkillsList[];
  salaryDescription: string;
}

export interface Category {
  id: number;
  value: string;
}

export interface Pay {
  amount: number;
  amountId: number;
  periodId: number;
  periodValue: string;
  amountValue: string;
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  province: Category;
  web: string;
  numberWorkers: number;
  logoUrl: string;
  url: string;
  corporateWebsiteUrl: string;
  websiteUrl: string;
  hidden: boolean;
  typeIndustry: Category;
  country: Category;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
  clientId: number;
  followable: boolean;
}

export interface SkillsList {
  skill: string;
}

export interface Upsellings {
  highlightHomeMonth: boolean;
  highlightHomeWeek: boolean;
  highlightSubcategory: boolean;
  highlightLogo: boolean;
  highlightColor: boolean;
  highlightUrgent: boolean;
  highlightStandingOffer: boolean;
}

export interface DetailedInformation {
  yearsOfExperience?: string;
  schedule?: string;
  skills?: {
    required?: Array<string>,
    desired?: Array<string>
  },
  contract?: string;
  responsabilities?: Array<string>
  benefits?: Array<string>
  culture: string;
}

export interface ClientJobOffer {
  data: JobOffer,
  loading: boolean,
  detailedInformation: DetailedInformation | null
}

export type MapClientJobOffer = Map<string, ClientJobOffer>

const infojobsUrl = process.env.INFOJOBS_API_URL ?? '';
const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''

export default async function getOffers(query: string) {
  const res = await fetch(`${infojobsUrl}offer?category=informatica-telecomunicaciones&q=${query}`, {
    headers: {
      Authorization: `Basic ${infojobsToken}`
    }
  });

  const offers = await res.json();

  const jobOffers: Array<JobOffer> = await Promise.all(offers.items.map((offer: JobOffer) => getOfferById(offer.id)))

  const clientJobOffers: MapClientJobOffer = new Map();

  jobOffers.forEach(offer => {
    clientJobOffers.set(offer.id, {
      data: offer,
      detailedInformation: null,
      loading: false
    })
  });

  return {
    pagination: {

    },
    offers: clientJobOffers
  };
}