import Checkbox from "@/components/shared/checkbox/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select/select";
import { confirmations, statusComponent } from "@/consts/confirmations";
import {
  updateNumberOfChildren,
  updateNumberOfPeople,
  updatePlusOne,
} from "@/services/google-sheets.action";
import { Guest, StatusGuest } from "@/types";
import { getFirstName } from "@/utils";
import { Calendar, Terminal } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { safeTrack } from "@/utils/mixpanel";

const CONFIRM_GUEST = "Si";
const NUMBER_OF_PEOPLE = 1;
const STATUS_CONFIRM = "confirm";

export const Accompanies = ({
  statusRef,
  status,
  guest,
}: {
  statusRef: React.RefObject<HTMLDivElement | null>;
  status: StatusGuest;
  guest: Guest;
}) => {
  const { t } = useTranslation();

  const handleNumberOfPeople = (numberOfPeople: any) => {
    safeTrack("Number of people updated", {
      guest: guest.name,
      numberOfPeople: numberOfPeople.toString(),
    });
    return updateNumberOfPeople({
      row: guest.row,
      companions: numberOfPeople.toString(),
    });
  };

  const handlePlusOne = (plusOne: any) => {
    safeTrack("Attend with a plus", {
      guest: guest.name,
      plusOne: plusOne.toString(),
    });
    return updatePlusOne({
      row: guest.row,
      plusOne: plusOne.toString(),
    });
  };

  const handleNumberOfChildren = (numberOfChildren: any) => {
    safeTrack("Attend with a plus - Number of children updated", {
      guest: guest.name,
      numberOfChildren: numberOfChildren.toString(),
    });
    return updateNumberOfChildren({
      row: guest.row,
      children: numberOfChildren.toString(),
    });
  };

  return (
    <section ref={statusRef}>
      <div className="bg-gray-600 p-6 rounded-lg border border-gray-200 m-2">
        <div className="flex items-center justify-between space-x-2 mb-2">
          <Terminal className="w-4 h-4 text-white " />
          <p className="text-white font-thin italic text-base text-center">
            {confirmations[status]}
          </p>
        </div>
        <p className="text-white font-bold text-base text-center tracking-wide">
          {t(statusComponent[status])}
        </p>
      </div>
      {status === STATUS_CONFIRM && (
        <div className="flex flex-col items-center justify-between my-8 mx-4 space-y-4">
          {parseInt(guest.companions) > NUMBER_OF_PEOPLE && (
            <>
              <div className="flex justify-center items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <p className="text-gray-700 font-mono text-md text-center">
                  <Trans i18nKey="weHave" />
                </p>
                <p className="font-sisterhood text-5xl text-gray-700 text-center">
                  {parseInt(guest.companions) + parseInt(guest.children)}
                </p>
                <p className="text-gray-700 font-mono text-md text-center">
                  <Trans i18nKey="spaceReserved" />
                </p>
              </div>

              <Select onValueChange={handleNumberOfPeople}>
                <SelectTrigger className="h-10 text-base text-black bg-gray-100 border-[#3131318e] outline-none focus:outline-none focus:ring-0">
                  <SelectValue
                    placeholder={t("selectNumberOfPeople")}
                    className="text-[#3131318e] outline-none"
                  />
                </SelectTrigger>
                <SelectContent className="text-black bg-gray-100 border-none">
                  {Array.from(
                    { length: parseInt(guest.companions) },
                    (_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1} persona
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {parseInt(guest.children) > 0 && (
                <Select onValueChange={handleNumberOfChildren}>
                  <SelectTrigger className="h-10 text-base text-black bg-gray-100">
                    <SelectValue placeholder={t("selectNumberOfChildren")} />
                  </SelectTrigger>
                  <SelectContent className="text-black bg-gray-100">
                    {Array.from(
                      { length: parseInt(guest.children) },
                      (_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1} niño
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            </>
          )}
          {guest.plusOne === CONFIRM_GUEST && (
            <>
              <p className="text-md italic font-sans tracking-widest text-gray-700 p-2 text-center">
                <Trans
                  i18nKey="plusOne"
                  components={{
                    bold: (
                      <strong className="font-sisterhood font-medium tracking-widest text-gray-700 text-2xl" />
                    ),
                  }}
                  values={{ name: getFirstName(guest.name) }}
                />
              </p>
              <Checkbox handleChange={handlePlusOne} />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Accompanies;
