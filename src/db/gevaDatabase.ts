import Dexie, { type Table } from 'dexie';
import type { KickRecord, ContractionRecord, DailyWellnessLog, UserPerinatalProfile } from '../types/clinical';

export class GevaDatabase extends Dexie {
  profiles!: Table<UserPerinatalProfile, string>;
  kicks!: Table<KickRecord, string>;
  contractions!: Table<ContractionRecord, string>;
  wellnessLogs!: Table<DailyWellnessLog, string>;

  constructor() {
    super('GevaSanctuaryDB');

    this.version(1).stores({
      profiles: 'id, stage, dueDate',
      kicks: 'id, timestamp, count',
      contractions: 'id, timestamp, durationSec, frequencyMinutes',
      wellnessLogs: 'date',
    });
  }
}

export const db = new GevaDatabase();
