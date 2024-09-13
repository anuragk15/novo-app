import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";

const DynamicForm = ({ formFields, name, onBack }) => {
  const [formData, setFormData] = useState({});
  // Handle form input change
  const handleChange = (e, title) => {
    setFormData({
      ...formData,
      [title]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add validation or submit logic here
  };

  return (
    <div>
      <div
        onClick={() => onBack()}
        className="flex items-center cursor-pointer gap hover:bg-slate-100 max-w-fit pr-2 py-1 rounded-lg "
      >
        <ChevronLeft />
        <p className=" text-sm ">Select other template</p>
      </div>
      <div className="pb-4">
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          {name}
        </h1>
        <p className="text-slate-500">
          The more information you provide, the better the AI can assist you—but
          only complete the fields you feel are necessary.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 overflow-scroll px-2  h-[60vh]">
          {formFields.map((field, index) => (
            <div key={index} className="form-group space-y-2">
              <label className=" font-sans font-medium ">
                {field.title}
                {index == 0 && "*"}
              </label>
              <Input
                type="text"
                placeholder={field.placeholder}
                value={formData[field.title] || ""}
                onChange={(e) => handleChange(e, field.title)}
                required={index === 0} // Make the first field required
                className="form-control"
              />
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
