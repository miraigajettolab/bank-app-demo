USE Bank

ALTER TABLE Clients
ADD CONSTRAINT UC_Client_PassportNumber UNIQUE (PassportNumber)
ADD CONSTRAINT UC_Client_TaxId UNIQUE (TaxId)
ADD CONSTRAINT UC_Client_TelephoneNumber UNIQUE (TelephoneNumber)