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
import { Calendar, Loader2, Terminal } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { safeTrack } from "@/utils/mixpanel";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shared/button/Button";

const CONFIRM_GUEST = "Si";
const NUMBER_OF_PEOPLE = 1;
const STATUS_CONFIRM = "confirm";

export const Accompanies = ({
  status,
  guest,
}: {
  status: StatusGuest;
  guest: Guest;
}) => {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    numberOfPeople: "0",
    numberOfChildren: "0",
    plusOne: "0",
  });
  const statusRef = useRef<HTMLDivElement>(null);

  const handleNumberOfPeople = (numberOfPeople: string) => {
    safeTrack("Number of people updated", {
      guest: guest.name,
      numberOfPeople: numberOfPeople,
    });
    setValues({
      ...values,
      numberOfPeople: numberOfPeople,
    });
    return;
  };

  const handlePlusOne = (plusOne: string) => {
    safeTrack("Attend with a plus", {
      guest: guest.name,
      plusOne: plusOne,
    });
    setValues({
      ...values,
      plusOne: plusOne,
    });
  };

  const handleNumberOfChildren = (numberOfChildren: string) => {
    safeTrack("Attend with a plus - Number of children updated", {
      guest: guest.name,
      numberOfChildren: numberOfChildren,
    });
    setValues({
      ...values,
      numberOfChildren: numberOfChildren,
    });
  };

  const handleConfirm = async () => {
    setLoading(true);
    safeTrack("Confirm attendance", {
      guest: guest.name,
    });

    const promises = [
      updateNumberOfPeople({
        row: guest.row,
        companions: values.numberOfPeople,
      }),
      updatePlusOne({
        row: guest.row,
        plusOne: values.plusOne,
      }),
      updateNumberOfChildren({
        row: guest.row,
        children: values.numberOfChildren,
      }),
    ];

    await Promise.all(promises);
    setSaved(true);
    setLoading(false);
  };

  useEffect(() => {
    if (status && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  return (
    <section ref={statusRef} className="mt-4">
      <div className="bg-[#bab8b8] p-6 rounded-lg border border-gray-200 m-2">
        <div className="flex items-center justify-between space-x-2 mb-2">
          <Terminal className="w-4 h-4 text-white" />
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

              <Select onValueChange={handleNumberOfPeople} disabled={loading}>
                <SelectTrigger className="h-10 text-base text-black bg-gray-100 border-[#bab8b8] outline-none focus:outline-none focus:ring-0 w-1/2">
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
                        {i + 1} {t("person")}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {parseInt(guest.children) > 0 && (
                <Select
                  onValueChange={handleNumberOfChildren}
                  disabled={loading}
                >
                  <SelectTrigger className="h-10 text-base text-black bg-gray-100 border-[#bab8b8] outline-none focus:outline-none focus:ring-0 w-1/2">
                    <SelectValue
                      placeholder={t("selectNumberOfChildren")}
                      className="text-[#3131318e] outline-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-black bg-gray-100">
                    {Array.from(
                      { length: parseInt(guest.children) },
                      (_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1} {t("child")}
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
              <Select onValueChange={handlePlusOne} disabled={loading}>
                <SelectTrigger className="h-10 text-base text-black bg-gray-100 border-[#bab8b8] outline-none focus:outline-none focus:ring-0 w-1/2">
                  <SelectValue
                    placeholder={t("selectPlusOne")}
                    className="text-[#3131318e] outline-none"
                  />
                </SelectTrigger>
                <SelectContent className="text-black bg-gray-100">
                  <SelectItem value="1">{t("yes")}</SelectItem>
                  <SelectItem value="0">{t("no")}</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
          <div className="flex flex-col justify-center items-center space-x-3">
            <Button onClick={handleConfirm} disabled={loading}>
              {t("saveAnswer")}
            </Button>
            {saved && (
              <p className="text-gray-700 font-mono text-xs text-center">
                {t("answerSaved")}
              </p>
            )}
            {loading && (
              <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Accompanies;
