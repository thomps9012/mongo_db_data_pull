import { CardOverview } from './CardOverview';
import { RecordOverview } from './RecordOverview';

export type Props = {
  serializedRecords: RecordOverview[];
  serializedCards: CardOverview[];
};