import getOfferById from "@/app/services/getOfferById";

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
export type FacetKey = string;

export type FacetInputType = "checkbox" | "radio" | "text";

export type Facet = {
  key: FacetKey;
  name: string;
  values: FacetValues,
  inputType?: FacetInputType;
}

export type Facets = Array<Facet>;

export interface PaginationData {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  currentResults: number;
  totalPages: number;
}

const infojobsUrl = process.env.INFOJOBS_API_URL ?? '';
const infojobsToken = process.env.INFOJOBS_TOKEN ?? ''

/**
 * Returns a string of URL parameters based on the provided filters.
 * Normalized to infojobs api like category=[category1]&category=[category2]
 *
 * @param {Filters} filter - An object containing key-value pairs of filters.
 * @return {string} A string of URL parameters, including normalized array parameters.
 */
export const getParams = (filter: Filters) => {
  const mapFilter = new Map(Object.entries(filter));
  const normalizedParams: string[] = []

  if (!mapFilter.size) return "";

  mapFilter.forEach((value, key) => {
    if (!value) mapFilter.delete(key);
    if (Array.isArray(value)) {
      value.forEach(param => value && normalizedParams.push(`${key}=${param}`))
      mapFilter.delete(key);
    }
  })

  return new URLSearchParams(Object.fromEntries(mapFilter)).toString() + "&" + normalizedParams.join("&")
}

const FACETS_KEY_TO_REMOVE = ['city'];

export async function getOffers(filters: Filters) {
  const searchParams = filters && getParams(filters);
  try {
    const res = await fetch(`${infojobsUrl}offer?${searchParams}`, {
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

    const OrderFacet: Facet = {
      key: 'order',
      name: 'Ordenar ofertas',
      values: [
        {
          key: 'updated-desc',
          value: 'Fecha de publicación',
          count: 0
        },
        {
          key: 'relevancia-desc',
          value: 'Relevancia',
          count: 0
        }
      ],
      inputType: "radio"
    }

    const DateFacet: Facet = {
      key: 'sinceDate',
      name: "Fecha",
      values: [
        {
          key: 'ANY',
          value: 'Cualquier fecha',
          count: 0
        },
        {
          key: '_24_HOURS',
          value: 'Últimas 24 horas',
          count: 0
        },
        {
          key: '_7_DAYS',
          value: 'Últimos 7 días',
          count: 0
        },
        {
          key: '_15_DAYS',
          value: 'Últimos 15 días',
          count: 0
        }
      ],
      inputType: 'radio'
    }

    const keyWordFacet: Facet = {
      key: 'q',
      name: 'Palabra clave',
      values: [
        {
          key: 'keyword',
          value: '',
          count: 0
        }
      ],
      inputType: "text"
    }

    const staticFacets: Facets = [OrderFacet, keyWordFacet, DateFacet]

    facets.unshift(...staticFacets)

    const { currentPage, pageSize, totalResults, currentResults, totalPages }: PaginationData = offers;

    return {
      pagination: {
        currentPage,
        pageSize,
        totalResults,
        currentResults,
        totalPages,
      },
      offers: clientJobOffers,
      facets
    }
  } catch (e) {
    //TODO handle errors
    console.log(e)
    return {
      pagination: {
        currentPage: 0,
        pageSize: 0,
        totalResults: 0,
        currentResults: 0,
        totalPages: 0
      },
      offers: [],
      facets: []
    }
  }
}
