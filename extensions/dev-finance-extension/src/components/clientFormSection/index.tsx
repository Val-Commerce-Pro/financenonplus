import { ChangeEvent } from "react";

import { ClientFormDataI } from "../../types/clientForm";
import { isDate21orMoreYearsOld } from "../../utils/formValidation";
import { Box } from "../box";

import { Select } from "../select";
import { TextField } from "../textfield";

type ClientFormProps = {
  handleClientFormChange: (clientFormData: ClientFormDataI) => void;
  clientFormData: ClientFormDataI;
};

export const ClientForm = ({
  clientFormData,
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

  return (
    <>
      <Box title="Angaben zum Geschäftsführer">
        <div className="overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]">
          <Select
            handleChange={handleSelectChange}
            name="salutation"
            label="Salutation"
            selectedValue={clientFormData.salutation}
            options={[
              { id: "HERR", bezeichnung: "Herr" },
              { id: "FRAU", bezeichnung: "Frau" },
            ]}
            required
          />
          <TextField
            name="firstName"
            label="First Name"
            type="text"
            handleOnChange={handleInputChange}
            textFieldValue={clientFormData.firstName}
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            type="text"
            handleOnChange={handleInputChange}
            textFieldValue={clientFormData.lastName}
            required
          />
          <TextField
            name="email"
            label="E-Mail"
            type="email"
            handleOnChange={handleInputChange}
            textFieldValue={clientFormData.email}
            required
          />
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
          <TextField
            name="zipCode"
            label="Zipcode"
            type="number"
            min={0}
            pattern="[0-9]{5}"
            handleOnChange={handleInputChange}
            textFieldValue={clientFormData.zipCode}
            required
          />
          <TextField
            name="mobile"
            label="Telephone (Mobile)"
            type="tel"
            handleOnChange={handleInputChange}
            textFieldValue={clientFormData.mobile}
            required
          />
          <TextField
            name="city"
            label="City"
            type="text"
            handleOnChange={handleInputChange}
            textFieldValue={clientFormData.city}
            required
          />

          <TextField
            name="dataOfBirth"
            label="Date of Birth"
            type="date"
            max={isDate21orMoreYearsOld()}
            handleOnChange={handleInputChange}
            required
          />
        </div>
      </Box>
    </>
  );
};
