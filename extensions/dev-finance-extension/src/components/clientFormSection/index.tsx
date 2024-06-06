import { ChangeEvent } from "react";

import { ClientFormDataI } from "../../types/clientForm";
import { Box } from "../box";

import { Select } from "../select";
import { TextField } from "../textfield";

type ClientFormProps = {
  clientFormData: ClientFormDataI;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const ClientForm = ({
  clientFormData,
  handleInputChange,
  handleSelectChange,
}: ClientFormProps) => {
  return (
    <>
      <Box title="Kundendaten">
        <div className="overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]">
          <Select
            handleChange={handleSelectChange}
            name="salutation"
            label="Anrede"
            selectedValue={clientFormData.salutation}
            options={[
              { id: "HERR", bezeichnung: "Herr" },
              { id: "FRAU", bezeichnung: "Frau" },
            ]}
            required
          />
          <div className="grid grid-cols-2 gap-[8px]">
            <TextField
              name="firstName"
              label="Vorname"
              type="text"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.firstName}
              required
            />
            <TextField
              name="lastName"
              label="Nachname"
              type="text"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.lastName}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-[8px]">
            <TextField
              name="email"
              label="E-Mail"
              type="email"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.email}
              required
            />
            <TextField
              name="mobile"
              label="Telefonnummer"
              type="tel"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.mobile}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-[8px]">
            <TextField
              name="street"
              label="Street"
              type="text"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.street}
              required
            />
            <TextField
              name="housenumber"
              label="Hausnummer"
              type="text"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.housenumber}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-[8px]">
            <TextField
              name="zipCode"
              label="Postleitzahl"
              type="number"
              min={0}
              pattern="[0-9]{5}"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.zipCode}
              required
            />
            <TextField
              name="city"
              label="Stadt"
              type="text"
              handleOnChange={handleInputChange}
              textFieldValue={clientFormData.city}
              required
            />
          </div>
        </div>
      </Box>
    </>
  );
};
