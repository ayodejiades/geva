import type { UserPerinatalProfile } from '../types/clinical';

export function generateFhirBundle(profile: UserPerinatalProfile): object {
  return {
    resourceType: 'Bundle',
    type: 'document',
    timestamp: new Date().toISOString(),
    identifier: {
      system: 'urn:ietf:rfc:3986',
      value: `urn:uuid:${profile.id}`,
    },
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: profile.id,
          name: [{ use: 'official', text: profile.name }],
        },
      },
      ...profile.kicks.map((k) => ({
        resource: {
          resourceType: 'Observation',
          id: k.id,
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'vital-signs',
                  display: 'Vital Signs',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '57058-0',
                display: 'Fetal movement count',
              },
            ],
          },
          effectiveDateTime: k.timestamp,
          valueQuantity: {
            value: k.count,
            unit: 'movements',
          },
        },
      })),
    ],
  };
}
