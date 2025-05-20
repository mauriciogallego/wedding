import Checkbox from "@/components/shared/checkbox/checkbox";
import { Guest, StatusGuest } from "@/types";
import { useTranslation } from "react-i18next";

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

  return (
    <section
      ref={statusRef}
      className="flex flex-col items-center justify-center p-2 bg-sky-800/50 w-full"
    >
      <p className="text-md italic font-sans tracking-widest text-white p-5 text-center">
        {statusComponent[status]}
      </p>
      <div className="flex items-center justify-around gap-4 my-3">
        {parseInt(guest.companions) > 1 && (
          <>
            <p className="text-md italic font-sans tracking-widest text-white p-2 text-left">
              Selecciona el número de personas, incluyendote a ti
            </p>
            <select>
              {Array.from({ length: parseInt(guest.companions) }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </>
        )}
        {guest.plusOne === "Si" && (
          <>
            <p className="text-md italic font-sans tracking-widest text-white p-2 text-center">
              Vienes con plus one?
            </p>
            <Checkbox label="Plus one? 👀" />
          </>
        )}
      </div>
    </section>
  );
};

export default Accompanies;
