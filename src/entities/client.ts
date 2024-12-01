import { ObjectId } from "mongodb";
import { baseUrl } from "@/lib/baseUrl";

interface ClientProps {
  _id: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  city: string;
  domainName: string;
  sector: string;
  description: string;
  lastAOId: string;
  missions: ObjectId[];
}

class Client {
  _id: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  city: string;
  domainName: string;
  sector: string;
  description: string;
  lastAOId: string;
  missions: ObjectId[];

  constructor({
    _id,
    firstname,
    lastname,
    email,
    phoneNumber,
    address,
    postalCode,
    city,
    domainName,
    sector,
    description,
    lastAOId,
    missions,
  }: ClientProps) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.domainName = domainName;
    this.sector = sector;
    this.description = description;
    this.lastAOId = lastAOId;
    this.missions = missions; // Store mission references (ObjectId[])
  }

  async save() {
    const response = await fetch(`${baseUrl}/api/client`, {
      method: "POST",
      body: JSON.stringify({
        _id: this._id,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        phoneNumber: this.phoneNumber,
        address: this.address,
        city: this.city,
        domainName: this.domainName,
        sector: this.sector,
        description: this.description,
        lastAOId: this.lastAOId,
        missions: this.missions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async update() {
    if (!this._id) {
      throw new Error("Client ID (_id) is required for update");
    }

    const response = await fetch(`${baseUrl}/api/client/${this.email}`, {
      method: "PUT",
      body: JSON.stringify({
        email: this.email,
        domainName: this.domainName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        postalCode: this.postalCode,
        city: this.city,
        description: this.description,
        sector: this.sector,
        lastAOId: this.lastAOId,
        missions: this.missions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  async delete() {
    const response = await fetch(`${baseUrl}/api/client/${this.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}

export default Client;
