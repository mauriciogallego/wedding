import Checkbox from "@/components/shared/checkbox/checkbox";
import { updateNumberOfPeople } from "@/services/google-sheets.action";
import { Guest, StatusGuest } from "@/types";
import { useTranslation } from "react-i18next";

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

  const statusComponent = {
    confirm: t("confirmMessage"),
    decline: t("declineMessage"),
    maybe: t("maybeMessage"),
  };

  const handleNumberOfPeople = (numberOfPeople: any) => {
    updateNumberOfPeople({
      row: guest.row,
      companions: numberOfPeople.toString(),
    });
  };

  return (
    <section
      ref={statusRef}
      className="flex flex-col items-center justify-center p-2 bg-sky-800/50 w-full"
    >
      <p className="text-md italic font-sans tracking-widest text-white p-5 text-center">
        {statusComponent[status]}
      </p>
      {status === STATUS_CONFIRM && (
        <div className="flex items-center justify-center-safe gap-4 my-3">
          {parseInt(guest.companions) > NUMBER_OF_PEOPLE && (
            <>
              <p className="text-sm italic font-sans tracking-widest text-white p-2 text-left w-1/2">
                {t("selectNumberOfPeople")}
              </p>
              <select
                onChange={(e) => handleNumberOfPeople(e.target.value)}
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                {Array.from({ length: parseInt(guest.companions) }, (_, i) => (
                  <>
                    <option value={undefined}>{t("choose")}</option>
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  </>
                ))}
              </select>
            </>
          )}
          {guest.plusOne === CONFIRM_GUEST && (
            <>
              <p className="text-sm italic font-sans tracking-widest text-white p-2 text-center">
                {t("plusOne")}
              </p>
              <Checkbox handleChange={handleNumberOfPeople} />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Accompanies;
