export const practiceAreaSlugs = [
  'family-based',
  'asylum',
  'waivers',
  'removal-defense',
  'vawa-humanitarian',
  'employment-based',
] as const;

export type PracticeAreaSlug = typeof practiceAreaSlugs[number];

export interface PracticeAreaData {
  slug: PracticeAreaSlug;
  icon: string;
  color: string;
  keyPoints: string[];
  processSteps: string[];
  eligibility: string[];
}

export const practiceAreasData: Record<PracticeAreaSlug, PracticeAreaData> = {
  'family-based': {
    slug: 'family-based',
    icon: 'Users',
    color: 'from-blue-600 to-navy-900',
    keyPoints: [
      'Immediate relative petitions (spouses, children, parents of U.S. citizens)',
      'Family preference categories for siblings and adult children',
      'Adjustment of Status (I-485) for those already in the U.S.',
      'Consular processing for beneficiaries abroad',
      'Removal of conditions on residence (I-751)',
    ],
    processSteps: [
      'Determine eligibility and correct petition category',
      'File Form I-130 (Petition for Alien Relative)',
      'Wait for visa availability (immediate relatives have no wait)',
      'File adjustment of status or begin consular processing',
      'Attend biometrics and USCIS interview',
      'Receive green card approval',
    ],
    eligibility: [
      'U.S. citizen petitioning for a spouse, child, or parent',
      'U.S. citizen petitioning for a sibling or adult child',
      'Lawful permanent resident petitioning for a spouse or unmarried child',
    ],
  },
  'asylum': {
    slug: 'asylum',
    icon: 'Shield',
    color: 'from-green-600 to-navy-900',
    keyPoints: [
      'Affirmative asylum applications before USCIS',
      'Defensive asylum in immigration court',
      'Withholding of removal',
      'Convention Against Torture (CAT) protection',
      'Employment authorization during pending case',
      'Green card application after one year of asylum',
    ],
    processSteps: [
      'File Form I-589 within one year of arrival in the U.S.',
      'USCIS interview (affirmative) or immigration court hearing (defensive)',
      'Gather country conditions evidence and personal testimony',
      'Await grant or referral to immigration court',
      'Apply for employment authorization',
      'Apply for lawful permanent residence after one year of asylum',
    ],
    eligibility: [
      'Experienced or have a well-founded fear of persecution',
      'Persecution based on race, religion, nationality, political opinion, or particular social group',
      'Generally must apply within one year of entering the U.S.',
      'Have not firmly resettled in a third country',
    ],
  },
  'waivers': {
    slug: 'waivers',
    icon: 'Scale',
    color: 'from-indigo-600 to-navy-900',
    keyPoints: [
      'I-601A provisional unlawful presence waiver (before consular interview)',
      'I-601 waiver for those abroad (unlawful presence, criminal grounds)',
      'I-212 application after prior removal or deportation',
      'Extreme hardship waivers for qualifying U.S. citizen or LPR relatives',
      'Waivers of inadmissibility for health-related grounds',
    ],
    processSteps: [
      'Evaluate grounds of inadmissibility and applicable waiver',
      'Identify qualifying U.S. citizen or LPR relative for hardship showing',
      'Gather evidence of extreme hardship',
      'File waiver application with USCIS',
      'Respond to any Requests for Evidence (RFE)',
      'Upon approval, proceed with visa application or adjustment of status',
    ],
    eligibility: [
      'Individuals with a prior unlawful presence bar (3-year or 10-year)',
      'Persons with a prior removal or deportation order seeking return',
      'Applicants with certain criminal history grounds of inadmissibility',
      'Must demonstrate extreme hardship to a qualifying U.S. citizen or LPR relative',
    ],
  },
  'removal-defense': {
    slug: 'removal-defense',
    icon: 'Gavel',
    color: 'from-red-600 to-navy-900',
    keyPoints: [
      'Representation in removal proceedings before immigration judges',
      'Bond hearings to secure release from immigration detention',
      'Cancellation of removal for long-term residents',
      'Adjustment of status as a defense in removal proceedings',
      'Motions to reopen and motions to reconsider',
      'Appeals to the Board of Immigration Appeals (BIA)',
    ],
    processSteps: [
      'Review Notice to Appear (NTA) and understand the charges',
      'Appear at the Master Calendar Hearing',
      'File defensive applications and gather supporting evidence',
      'Individual merits hearing before an immigration judge',
      'Appeal to the BIA if the decision is adverse',
      'Federal court petition for review if warranted',
    ],
    eligibility: [
      'Any person who has received a Notice to Appear (NTA)',
      'Detained individuals seeking a bond hearing',
      'Individuals with final orders of removal seeking motions to reopen',
      'Long-term residents eligible for cancellation of removal',
    ],
  },
  'vawa-humanitarian': {
    slug: 'vawa-humanitarian',
    icon: 'Heart',
    color: 'from-rose-600 to-navy-900',
    keyPoints: [
      'VAWA self-petitions for survivors of domestic violence (Form I-360)',
      'VAWA-based adjustment of status independent of abuser',
      'U visa for victims of certain crimes who cooperate with law enforcement',
      'T visa for survivors of human trafficking',
      'Special Immigrant Juvenile Status (SIJS)',
    ],
    processSteps: [
      'Assess eligibility under VAWA, U visa, or T visa provisions',
      'Gather evidence of abuse, crime, or trafficking',
      'File Form I-360 (VAWA) or I-918 (U visa) or I-914 (T visa)',
      'Obtain certification from law enforcement (U and T visas)',
      'Await USCIS decision; apply for deferred action if eligible',
      'Apply for lawful permanent residence when eligible',
    ],
    eligibility: [
      'Spouses, children, or parents of abusive U.S. citizens or LPRs (VAWA)',
      'Victims of qualifying crimes who have suffered substantial abuse (U visa)',
      'Survivors of human trafficking who assist in investigation or prosecution (T visa)',
      'Juvenile court dependents who cannot reunify with a parent due to abuse, neglect, or abandonment (SIJS)',
    ],
  },
  'employment-based': {
    slug: 'employment-based',
    icon: 'Briefcase',
    color: 'from-purple-600 to-navy-900',
    keyPoints: [
      'EB-3 skilled workers, professionals, and other workers',
      'Labor Certification (PERM) through the Department of Labor',
      'I-140 Immigrant Petition for Alien Workers',
      'Adjustment of status or consular processing upon visa availability',
      'Maintaining valid nonimmigrant status during the process',
    ],
    processSteps: [
      'Employer conducts PERM recruitment and files labor certification',
      'File Form I-140 with USCIS after PERM approval',
      'Monitor visa bulletin for priority date to become current',
      'File adjustment of status (I-485) or pursue consular processing',
      'Attend biometrics and interview',
      'Receive employment-based green card',
    ],
    eligibility: [
      'EB-3 Skilled Workers: job requiring at least 2 years of training or experience',
      'EB-3 Professionals: job requiring at least a U.S. bachelor\'s degree',
      'EB-3 Other Workers: unskilled labor positions not temporary or seasonal',
      'Employer must sponsor and demonstrate no qualified U.S. workers available',
    ],
  },
};
