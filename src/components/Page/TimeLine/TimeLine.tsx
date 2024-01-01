import { ActivityChronology } from "../../ActivityChronology";
import type { ActivityChronology as ActivityChronologyType } from "../../../utils/groupByYear";

interface Props {
  activityChronologies: ActivityChronologyType[];
}

export const TimeLine = ({ activityChronologies }: Props) => {
  return activityChronologies.map((activityChronology, index) => (
    <ActivityChronology key={index} activityChronology={activityChronology} />
  ));
};
