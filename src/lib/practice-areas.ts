export const practiceAreaSlugs = [
  'family-based',
  'marriage-green-card',
  'citizenship',
  'asylum',
  'work-visas',
  'student-visas',
  'deportation-defense',
  'daca',
  'appeals-waivers',
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
      'Family preference categories for other relatives',
      'Adjustment of Status (I-485) for those in the U.S.',
      'Consular processing for those abroad',
      'VAWA self-petitions for abuse survivors',
    ],
    processSteps: [
      'Determine eligibility and petition category',
      'File Form I-130 (Petition for Alien Relative)',
      'Wait for visa availability (immediate relatives have no wait)',
      'File adjustment of status or begin consular processing',
      'Attend biometrics and interview',
      'Receive green card approval',
    ],
    eligibility: [
      'U.S. citizen petitioning for a spouse, child, or parent',
      'U.S. citizen petitioning for a sibling or adult child',
      'Permanent resident (green card holder) petitioning for a spouse or unmarried child',
    ],
  },
  'marriage-green-card': {
    slug: 'marriage-green-card',
    icon: 'Heart',
    color: 'from-rose-500 to-navy-900',
    keyPoints: [
      'Spousal visas (IR-1/CR-1) for married couples',
      'Fiancé(e) visa (K-1) for couples planning to marry',
      'Conditional green card removal of conditions (I-751)',
      'Joint filing and waiver options',
      'Consular interviews preparation',
    ],
    processSteps: [
      'File I-130 (if already married) or I-129F (fiancé visa)',
      'USCIS reviews the petition',
      'Attend consular interview or file for adjustment of status',
      'Receive conditional or permanent green card',
      'File I-751 to remove conditions after 2 years (if applicable)',
    ],
    eligibility: [
      'U.S. citizen married to a foreign national',
      'U.S. citizen engaged to a foreign national (fiancé visa)',
      'Permanent resident married to a foreign national (longer processing)',
    ],
  },
  'citizenship': {
    slug: 'citizenship',
    icon: 'Star',
    color: 'from-gold-500 to-navy-900',
    keyPoints: [
      'Naturalization application (N-400)',
      'English language and civics test preparation',
      'Citizenship through parents (N-600)',
      'Military naturalization',
      'Certificate of citizenship',
    ],
    processSteps: [
      'Confirm eligibility (5 years LPR, or 3 years if married to U.S. citizen)',
      'File Form N-400 with supporting documents',
      'Biometrics appointment',
      'English and civics interview',
      'Pass the naturalization test',
      'Oath of Allegiance ceremony',
    ],
    eligibility: [
      'Permanent resident for at least 5 years',
      'Permanent resident for at least 3 years, married to and living with a U.S. citizen',
      'Person who acquired citizenship at birth through a parent',
      'Qualifying military service member or veteran',
    ],
  },
  'asylum': {
    slug: 'asylum',
    icon: 'Shield',
    color: 'from-green-600 to-navy-900',
    keyPoints: [
      'Affirmative asylum before USCIS',
      'Defensive asylum in immigration court',
      'Withholding of removal',
      'Convention Against Torture (CAT) protection',
      'Asylum-based green card after 1 year',
    ],
    processSteps: [
      'File Form I-589 within 1 year of arrival',
      'Asylum interview with USCIS officer (affirmative) or hearing in immigration court (defensive)',
      'Provide country conditions evidence and personal testimony',
      'Await decision',
      'If granted, apply for employment authorization',
      'Apply for green card after 1 year of asylum',
    ],
    eligibility: [
      'Persecuted or have a well-founded fear of persecution',
      'Persecution based on race, religion, nationality, political opinion, or social group',
      'Generally must apply within 1 year of arriving in the U.S.',
      'Cannot have firmly resettled in another country',
    ],
  },
  'work-visas': {
    slug: 'work-visas',
    icon: 'Briefcase',
    color: 'from-purple-600 to-navy-900',
    keyPoints: [
      'H-1B for specialty occupation workers',
      'L-1 for intracompany transferees',
      'O-1 for extraordinary ability',
      'TN for Canadian and Mexican professionals',
      'E-2 treaty investor visas',
      'Employment authorization documents (EAD)',
    ],
    processSteps: [
      'Determine the right visa category',
      'Employer files Labor Condition Application (H-1B) or petition',
      'USCIS adjudicates the petition',
      'Consular processing if abroad',
      'Maintain valid status and extensions',
    ],
    eligibility: [
      'H-1B: Specialty occupation requiring at least a bachelor\'s degree',
      'L-1: Employed by multinational company for at least 1 year in last 3',
      'O-1: Extraordinary ability demonstrated by sustained national/international acclaim',
      'TN: Canadian or Mexican national in qualifying USMCA profession',
    ],
  },
  'student-visas': {
    slug: 'student-visas',
    icon: 'GraduationCap',
    color: 'from-teal-600 to-navy-900',
    keyPoints: [
      'F-1 visa for academic students',
      'J-1 for exchange visitors',
      'M-1 for vocational students',
      'OPT and STEM OPT extensions',
      'CPT (Curricular Practical Training)',
      'Change of status to student',
    ],
    processSteps: [
      'Obtain I-20 from your school (SEVIS form)',
      'Pay the SEVIS fee',
      'Apply at the U.S. Embassy/Consulate',
      'Attend visa interview',
      'Maintain full-time enrollment and SEVIS status',
    ],
    eligibility: [
      'Enrolled in an SEVP-certified school',
      'Sufficient financial resources to cover education and living expenses',
      'Intent to depart the U.S. after completing studies (for F-1)',
      'Maintaining satisfactory academic progress',
    ],
  },
  'deportation-defense': {
    slug: 'deportation-defense',
    icon: 'Gavel',
    color: 'from-red-600 to-navy-900',
    keyPoints: [
      'Representation in removal proceedings',
      'Bond hearings to secure release from detention',
      'Cancellation of removal',
      'Adjustment of status as defense',
      'Voluntary departure',
      'Emergency motions to stay deportation',
    ],
    processSteps: [
      'Review Notice to Appear (NTA) and understand charges',
      'Appear at Master Calendar Hearing',
      'File defensive applications and gather evidence',
      'Individual merits hearing before immigration judge',
      'Appeal to the Board of Immigration Appeals (BIA) if necessary',
      'Federal court appeals if warranted',
    ],
    eligibility: [
      'Any person in removal proceedings',
      'Detained individuals seeking bond',
      'Those with final orders of removal seeking motions to reopen',
      'Individuals eligible for cancellation of removal (10 years in U.S., hardship)',
    ],
  },
  'daca': {
    slug: 'daca',
    icon: 'Sunrise',
    color: 'from-orange-500 to-navy-900',
    keyPoints: [
      'DACA initial applications',
      'DACA renewals (every 2 years)',
      'Advance Parole travel authorization',
      'Employment Authorization Documents (EADs)',
      'Benefits and rights as a DACA recipient',
    ],
    processSteps: [
      'Confirm DACA eligibility requirements',
      'Gather required documentation',
      'File Form I-821D (DACA request) and I-765 (EAD)',
      'Pay filing fees',
      'Biometrics appointment',
      'Receive DACA approval and EAD card',
    ],
    eligibility: [
      'Entered the U.S. before your 16th birthday',
      'Continuous U.S. residence since June 15, 2007',
      'Under 31 years of age as of June 15, 2012',
      'No lawful status on June 15, 2012',
      'Currently in school, graduated, or honorably discharged veteran',
      'No felony convictions or significant misdemeanors',
    ],
  },
  'appeals-waivers': {
    slug: 'appeals-waivers',
    icon: 'Scale',
    color: 'from-indigo-600 to-navy-900',
    keyPoints: [
      'BIA appeals from immigration court decisions',
      'Motions to reopen and reconsider',
      'Federal court petitions for review',
      'I-601 and I-601A unlawful presence waivers',
      'I-212 reapplication after deportation',
      'I-290B appeals on USCIS denials',
    ],
    processSteps: [
      'Review denial or adverse decision for legal errors',
      'Identify grounds for appeal or waiver',
      'File notice of appeal within deadlines (strict)',
      'Prepare and submit brief with legal arguments',
      'Oral argument if warranted',
      'Await BIA or court decision',
    ],
    eligibility: [
      'Any person who received an adverse immigration decision',
      'Individuals subject to bars due to unlawful presence (I-601A waiver)',
      'Those who were previously removed and wish to return (I-212)',
      'Persons with USCIS denial eligible for I-290B',
    ],
  },
};
