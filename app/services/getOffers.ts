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
  requiredSkills?: Array<string>,
  desirableSkills?: Array<string>,
  contract?: string;
  responsabilities?: Array<string>
  benefits?: Array<string>
  culture: string;
  salary: string;
}

export interface ClientJobOffer {
  data: JobOffer,
  loading: boolean,
  detailedInformation: DetailedInformation | null
}

export interface Filters {
  [key: string]: any
}

export type FacetValue = {
  key: string;
  value: string;
  count: number;
}

export type FacetValues = Array<FacetValue>

export type Facet = {
  key: string;
  name: string;
  values: FacetValues
}

export type Facets = Array<Facet>;

const infojobsUrl = process.env.INFOJOBS_API_URL ?? '';
const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''

const FACETS_KEY_TO_REMOVE = ['city'];

export default async function getOffers(filters?: Filters) {
  const searchParams = new URLSearchParams(filters).toString();
  console.log({ searchParams })

  const res = await fetch(`${infojobsUrl}offer?facets=true&category=informatica-telecomunicaciones&${searchParams}`, {
    headers: {
      Authorization: `Basic ${infojobsToken}`
    }
  });


  const offers = await res.json();

  const jobOffers: Array<JobOffer> = await Promise.all(offers.items.map((offer: JobOffer) => getOfferById(offer.id)))

  const clientJobOffers: ClientJobOffer[] = jobOffers.map(offer => ({
    data: offer,
    detailedInformation: null,
    loading: false
  }));


  const facets: Facets = [...offers.facets].filter((facet: Facet) => {
    if (FACETS_KEY_TO_REMOVE.includes(facet.key)) return false;
    return true
  });

  return {
    pagination: {

    },
    offers: clientJobOffers,
    facets
  };
}