import { clientCardDetail } from './CardDetail';
import { CardOverview } from './CardOverview';
import { clientRecordDetail } from './RecordDetail';
import { RecordOverview } from './RecordOverview';

export type Props = {
  serializedRecords: RecordOverview[];
  serializedCards: CardOverview[];
  serializedRecord: clientRecordDetail;
  serializedCard: clientCardDetail;
};