import React from "react";
import Input from "../../../Components/Share/Input";
import TextArea from "../../../Components/Share/TextArea";
import { DropDown, Label } from "./Handler";

export default function Contact({ register, errors }) {
  return (
    <div>
      <div className="space-y-4 first:space-y-5">
        <h1 className="text-textHeader font-medium text-lg">
          Contact Information
        </h1>
        <div className="space-y-2">
          <Label title={"Email Address"} />
          <Input
            placeholder="Email..."
            name="email"
            register={{
              ...register("email", {
                required: "Email field is required", // Custom error message for "required"
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for a valid email format
                  message: "Please enter a valid email address", // Custom error message for invalid email
                },
              }),
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-[14px]">
              {errors.email.message} {/* Display the specific error message */}
            </p>
          )}
        </div>
        <div className="space-y-2 relative">
          <Label title={"Phone Number"} />
          <Input
            placeholder="Phone number ...."
            className="pl-32"
            type="number"
            register={{
              ...register("phone", { required: "Phone number is required" }),
            }}
          />
          <>
            {errors.phone && (
              <p className="text-red-500 text-[14px]">{errors.phone.message}</p>
            )}
          </>
          <DropDown />
        </div>
        <div className="space-y-2 relative">
          <Label title={"Alternative Phone Number (Optional)"} />
          <Input
            placeholder="Alternative Number- ...."
            className="pl-32"
            type="number"
            register={{
              ...register("altPhone", {
                required: "Alternative number is required",
              }),
            }}
          />{" "}
          <>
            {errors.altPhone && (
              <p className="text-red-500 text-[14px]">
                {errors.altPhone.message}
              </p>
            )}
          </>
          <DropDown />
        </div>
      </div>
      <div className="space-y-4 first:space-y-5 pt-12">
        <h1 className="text-textHeader font-medium text-lg">
          Shipping address
        </h1>
        <div className="flex space-x-3.5">
          <div className="space-y-2 w-full">
            <Label title={"First Name"} />
            <Input
              placeholder="Enter your first name"
              name="firstName"
              register={{
                ...register("firstName", {
                  required: "First name is required",
                }),
              }}
            />{" "}
            <>
              {errors.firstName && (
                <p className="text-red-500 text-[14px]">
                  {errors.firstName.message}
                </p>
              )}
            </>
          </div>
          <div className="space-y-2 w-full">
            <Label title={"Last Name"} />
            <Input
              placeholder="Enter your last name"
              name="lastName"
              register={{
                ...register("lastname", { required: "Last name is required" }),
              }}
            />
            <>
              {errors.lastname && (
                <p className="text-red-500 text-[14px]">
                  {errors.lastname.message}
                </p>
              )}
            </>
          </div>
        </div>
        <div className="space-y-2">
          <Label title="Address" />
          <Input
            placeholder="Enter your address"
            name="address"
            register={{
              ...register("address", { required: "Address is required" }),
            }}
          />
          <>
            {errors.address && (
              <p className="text-red-500 text-[14px]">
                {errors.address.message}
              </p>
            )}
          </>
        </div>
        <div className="flex space-x-3.5">
          <div className="space-y-2">
            <Label title="City" />
            <Input
              placeholder="Enter your City"
              name="city"
              register={{
                ...register("city", { required: "City is required" }),
              }}
            />
            <>
              {errors.city && (
                <p className="text-red-500 text-[14px]">
                  {" "}
                  {errors.city.message}
                </p>
              )}
            </>
          </div>
          <div className="space-y-2">
            <Label title="Area" />
            <Input
              placeholder="Enter your area"
              name="area"
              register={{
                ...register("area", { required: "Area is required" }),
              }}
            />
            <>
              {errors.area && (
                <p className="text-red-500 text-[14px]">
                  {errors.area.message}
                </p>
              )}
            </>
          </div>
          <div className="space-y-2">
            <Label title="Zip code" />
            <Input
              placeholder="Enter your zip"
              name="zip"
              type="number"
              register={{
                ...register("zip", { required: "Zip code is required" }),
              }}
            />{" "}
            <>
              {errors.zip && (
                <p className="text-red-500 text-[14px]">{errors.zip.message}</p>
              )}
            </>
          </div>
        </div>
        <div className="space-y-2">
          <Label title="Delivery Instructions (Optional)" />
          <TextArea
            placeholder="Enter your delivery instructions"
            name="delivery"
            register={{ ...register("delivery", { required: true }) }}
          />
        </div>
      </div>
    </div>
  );
}
