import { ActivityChronology } from "../../ActivityChronology";
import type { ActivityType as ActivityChronologyType } from "../../../type";

interface Props {
  activityChronologies: ActivityChronologyType[];
}

export const TimeLine = ({ activityChronologies }: Props) => {
  return activityChronologies.map((activityChronology, index) => (
    <ActivityChronology key={index} activityChronology={activityChronology} />
  ));
};
