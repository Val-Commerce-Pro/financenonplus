import { ChangeEvent } from "react";

import { ClientFormDataI } from "../../types/extensionPage";
import { isDate21orMoreYearsOld } from "../../utils/formValidation";
import { Box } from "../box";

import { Select } from "../select";
import { TextField } from "../textfield";

type ClientFormProps = {
  handleModalState: (value: boolean) => void;
  handleClientFormChange: (clientFormData: ClientFormDataI) => void;
  clientFormData: ClientFormDataI;
};

export const ClientForm = ({
  clientFormData,
  handleModalState,
  handleClientFormChange,
}: ClientFormProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleClientFormChange({ ...clientFormData, [name]: value });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    handleClientFormChange({ ...clientFormData, [name]: value });
  };

  function handleSave() {
    // const localStorageData = localStorage.getItem("cp@albisLeasing");
    // const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "");
    // localStorage.setItem(
    //   "cp@albisLeasing",
    //   JSON.stringify({
    //     ...localStorageJSON,
    //     companyManagerInfoData: managerInfo,
    //   }),
    // );
  }

  return (
    <>
      <Box title="Angaben zum Geschäftsführer">
        <div className="overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]">
          <Select
            handleChange={handleSelectChange}
            name="anrede"
            label="Anrede"
            defaultText="Anrede auswählen"
            selectedValue={clientFormData.anrede}
            options={[
              { id: 1, bezeichnung: "Herr" },
              { id: 2, bezeichnung: "Frau" },
            ]}
            required
          />
          <TextField
            name="vorname"
            label="Vorname"
            type="text"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.vorname}
            required
          />
          <TextField
            name="nachname"
            label="Nachname"
            type="text"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.nachname}
            required
          />
          <TextField
            name="email"
            label="E-Mail"
            type="email"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.email}
            required
          />
          <TextField
            name="strasseGF"
            label="Strasse (GF)"
            type="text"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.strasseGF}
            required
          />
          <TextField
            name="plzGF"
            label="Postleitzahl (GF)"
            type="number"
            min={0}
            pattern="[0-9]{5}"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.plzGF}
            required
          />
          <TextField
            name="telGF"
            label="Telefon (GF)"
            type="tel"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.telGF}
            required
          />
          <TextField
            name="ortGF"
            label="Ort (GF)"
            type="text"
            handleOnChange={handleInputChange}
            handleOnBlur={handleSave}
            handleKeyDown={handleSave}
            textFieldValue={clientFormData.ortGF}
            required
          />

          <TextField
            name="geburtsdatum"
            label="Geburtsdatum"
            type="date"
            max={isDate21orMoreYearsOld()}
            handleOnChange={handleInputChange}
            handleKeyDown={handleSave}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleModalState(true)}
            type="button"
            data-modal-target="static-modal"
            id="modal-button"
            data-modal-toggle="static-modal"
            className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
            // disabled={!isSendenBtnEnable()}
          >
            Senden
          </button>
        </div>
      </Box>
    </>
  );
};
