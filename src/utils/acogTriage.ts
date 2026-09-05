export interface MaternalRedFlag {
  id: string;
  symptom: string;
  clinicalConcern: string;
  actionGuidance: string;
  isEmergency: boolean;
}

export const ACOG_WARNING_SIGNS: MaternalRedFlag[] = [
  {
    id: 'headache',
    symptom: 'Severe persistent headache unresponsive to acetaminophen',
    clinicalConcern: 'Preeclampsia / Central nervous system irritability',
    actionGuidance: 'Immediate obstetric triage evaluation required.',
    isEmergency: true,
  },
  {
    id: 'vision',
    symptom: 'Visual disturbances (scotoma, blurring, flashes of light)',
    clinicalConcern: 'Preeclampsia with severe features',
    actionGuidance: 'Call labor triage or present to emergency department immediately.',
    isEmergency: true,
  },
  {
    id: 'edema',
    symptom: 'Sudden, acute facial or hand swelling',
    clinicalConcern: 'Acute vascular fluid retention / renal compromise',
    actionGuidance: 'Check blood pressure promptly and contact care team.',
    isEmergency: false,
  },
  {
    id: 'epigastric',
    symptom: 'Severe right-upper-quadrant or epigastric pain',
    clinicalConcern: 'Hepatic capsule distension / HELLP syndrome',
    actionGuidance: 'Emergency medical evaluation required.',
    isEmergency: true,
  },
  {
    id: 'movement',
    symptom: 'Noticeable reduction or cessation of fetal movement',
    clinicalConcern: 'Fetal compromise / placental insufficiency',
    actionGuidance: 'Perform non-stress test / report to triage immediately.',
    isEmergency: true,
  },
];
