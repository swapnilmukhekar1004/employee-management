import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";


export default function CreateEmp() {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (location.state && location.state.employeeData) {
      setFormData(location.state.employeeData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (formData.id) {
          await axios.put(
            `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${formData.id}`,
            formData
          );
          NotificationManager.success("Data saved successfully");
           setTimeout(()=>  navigate("/") ,3000) // Redirect to the listing page after saving
        } else {
          await axios.post(
            "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee",
            formData
          );
          NotificationManager.success("Data saved successfully");
        }
        
      } catch (error) {
        NotificationManager.error("Error saving data", "Error", 3000);
        console.error("Error saving data:", error);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
      NotificationManager.error("Name is required", "Validation Error", 3000);
      isValid = false;
    }

    if (!formData.emailId.trim()) {
      formErrors.emailId = "Email is required";
      NotificationManager.error("Email is required", "Validation Error", 3000);
      isValid = false;
    }

    if (!formData.mobile.trim()) {
      formErrors.mobile = "Mobile number is required";
      NotificationManager.error(
        "Mobile number is required",
        "Validation Error",
        3000
      );
      isValid = false;
    }

    if (!formData.country.trim()) {
      formErrors.country = "Country is required";
      NotificationManager.error(
        "Country is required",
        "Validation Error",
        3000
      );
      isValid = false;
    }

    if (!formData.state.trim()) {
      formErrors.state = "State is required";
      NotificationManager.error("State is required", "Validation Error", 3000);
      isValid = false;
    }

    if (!formData.district.trim()) {
      formErrors.district = "District is required";
      NotificationManager.error(
        "District is required",
        "Validation Error",
        3000
      );
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <>
      <div>
        <div>
          <div className="MainContent">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="card ">
                  <div className="card-body card-shadow ">
                    <div>
                      <div className="row">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-9">
                              <div className="row">
                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-4">
                                    <label className="form-label">Name</label>
                                    <input
                                      name="name"
                                      value={formData.name}
                                      type="text"
                                      placeholder="Enter Your Name"
                                      className="form-control"
                                      onChange={handleChange}
                                    />
                                    {errors.name && (
                                      <div
                                        style={{ color: "red" }}
                                        className="errorLine"
                                      >
                                        {errors.name}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-4">
                                    <label className="form-label">Email</label>
                                    <input
                                      name="emailId"
                                      value={formData.emailId}
                                      type="email"
                                      placeholder="Enter Email"
                                      className="form-control"
                                      onChange={handleChange}
                                    />
                                    {errors.emailId && (
                                      <div
                                        style={{ color: "red" }}
                                        className="errorLine"
                                      >
                                        {errors.emailId}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-4">
                                    <label className="form-label">
                                      Mobile No.
                                    </label>
                                    <input
                                      name="mobile"
                                      value={formData.mobile}
                                      type="number"
                                      placeholder="Enter Mobile No."
                                      className="form-control"
                                      onChange={handleChange}
                                    />
                                    {errors.mobile && (
                                      <div
                                        style={{ color: "red" }}
                                        className="errorLine"
                                      >
                                        {errors.mobile}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-4">
                                    <label className="form-label">Country</label>
                                    <select
                                      className={
                                        errors.location
                                          ? "form-select error"
                                          : "form-select"
                                      }
                                      name="country"
                                      value={formData.country}
                                      onChange={handleChange}
                                    >
                                      <option value="">Select Country</option>
                                      {countries.map((country) => (
                                        <option
                                          key={country.cca2}
                                          value={country.country}
                                        >
                                          {country.country}
                                        </option>
                                      ))}
                                    </select>
                                    {errors.country && (
                                      <div
                                        style={{ color: "red" }}
                                        className="errorLine"
                                      >
                                        {errors.country}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-4">
                                    <label className="form-label">State</label>
                                    <input
                                      name="state"
                                      value={formData.state}
                                      type="text"
                                      placeholder="Enter State"
                                      className="form-control"
                                      onChange={handleChange}
                                    />
                                    {errors.state && (
                                      <div
                                        style={{ color: "red" }}
                                        className="errorLine"
                                      >
                                        {errors.state}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-4 col-md-6">
                                  <div className="mb-4">
                                    <label className="form-label">
                                      District
                                    </label>
                                    <input
                                      name="district"
                                      value={formData.district}
                                      type="text"
                                      placeholder="Enter District"
                                      className="form-control"
                                      onChange={handleChange}
                                    />
                                    {errors.district && (
                                      <div
                                        style={{ color: "red" }}
                                        className="errorLine"
                                      >
                                        {errors.district}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div className="col-lg-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary w-150 LoginBtn float-end"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <NotificationContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
