import React, { useState, useEffect } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { Sheet } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Emplisting() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [isOpen, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("priority"); // State for sorting
  const [details, setDetails] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

   // Hook for navigation

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = allData.filter((item) => item.id === searchTerm);
      setData(filteredData);
    } else {
      setData(allData); // Show all data when search term is empty
    }
  }, [searchTerm, allData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee`
      );
      setData(response.data);
      setAllData(response.data); // Store all data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "priority") {
      return a.priority - b.priority;
    }
    // Add more sorting options if needed
    return 0;
  });

  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Edit Employee function And Use this function in Create form Component
  const handleEditClick = (item) => {
    navigate("Create-Employee", { state: { employeeData: item } });
  };

  //Delete Employe function with api
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      );
      NotificationManager.success("Employee Delete Succesfully");
      setData(data.filter((item) => item.id !== id));
      setAllData(allData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const DetailsPopup = (item) => {
    setOpen(true);
    setModalVisible(!isModalVisible);
    setDetails([item]);
  };

  const desktopDetails = (item) => {
    navigate("Employee-Details", { state: { employeeData: item } });
   
  };

  //Pegination Code
  const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <MdOutlineNavigateBefore
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mt-2 me-2 pe-auto"
              style={{ cursor: "pointer" }}
            />
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          <li className="page-item">
            <MdOutlineNavigateNext
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
              className="mt-2 ms-2 "
              style={{ cursor: "pointer" }}
            />
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <div>
        <div>
          {/* device section  */}
          <div className="MainContent TableSection">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="card ">
                  <div className="card-body card-shadow ">
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <input
                          type="text"
                          className="form-control SearchTable"
                          placeholder="search by ID"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        ></input>
                      </div>

                      <div>
                        {/* Dropdown for sorting */}
                        <table className="table custom-table mt-3">
                          <thead>
                            <tr>
                              <th scope="col">Id</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Mobile No.</th>
                              <th scope="col">Country</th>
                              <th scope="col">State</th>
                              <th scope="col">District</th>
                              <th scope="col">CreatedAT</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRecords.map((item) => (
                              <tr key={item.id}>
                                <td className="ProjectNameTitle">
                                  <p className="nav-link text-start p-0"  style={{ cursor: 'pointer' }} data-bs-toggle="tooltip" title="view details" onClick={() => desktopDetails(item)}>{item.id} </p>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.emailId}</td>
                                <td>{item.mobile}</td>
                                <td>{item.country}</td>
                                <td>{item.state}</td>
                                <td>{item.district}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                  <button
                                    onClick={() => handleEditClick(item)}
                                    className="btn btn-outline-primary m-1"
                                  >
                                    <FaEdit />
                                  </button>
                                  <br></br>

                                  <button
                                    onClick={() => handleDeleteClick(item.id)}
                                    className="btn btn-outline-danger m-1"
                                  >
                                    <MdDelete />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="d-flex justify-content-center">
                          <Pagination
                            itemsPerPage={perPage}
                            totalItems={sortedData.length}
                            paginate={paginate}
                            currentPage={currentPage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile section */}
          <div className="MblCardSection">
            <div className="">
              <div className="filterSection">
                <input
                  type="text"
                  className="form-control SearchTable"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="row">
              {currentRecords.map((item) => (
                <div className="col-lg-6 col-md-6">
                  <div className="card mb-3 text-capitalize" key={item.id}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <div>
                          {" "}
                          <p className="NameText" style={{ fontSize: "16px" }}>
                            ID: {item.id}
                          </p>
                        </div>
                        <div>
                          <FaEye
                            className="text-grey"
                            onClick={() => DetailsPopup(item)}
                          />
                        </div>
                      </div>
                  

                      <div className="mt-3 InformSection">
                        <p>
                          <span className="GreyText">
                            Name:
                            <span className="DarkText ms-1">{item.name}</span>
                          </span>
                        </p>

                        <p>
                          <span className="GreyText">
                            Email:
                            <span className="DarkText ms-1">
                              {item.emailId}
                            </span>
                          </span>
                        </p>

                        <p>
                          <span className="GreyText">
                            Mobile No:
                            <span className="DarkText ms-1">{item.mobile}</span>
                          </span>
                        </p>

                        <p>
                          <span className="GreyText">
                            Country:
                            <span className="DarkText ms-1">
                              {item.country}
                            </span>
                          </span>
                        </p>

                        <p>
                          <span className="GreyText">
                            State:
                            <span className="DarkText ms-1">{item.state}</span>
                          </span>
                        </p>

                        <p>
                          <span className="GreyText">
                            District:
                            <span className="DarkText ms-1">
                              {item.district}
                            </span>
                          </span>
                        </p>

                        <p>
                          <span className="GreyText">
                            CreatedAt:
                            <span className="DarkText ms-1">
                              {item.createdAt}
                            </span>
                          </span>
                        </p>

                        <div className="d-flex justify-content-between">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="btn btn-outline-primary m-1"
                          >
                            <FaEdit />
                          </button>
                          <br></br>

                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="btn btn-outline-danger m-1"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <Pagination
                itemsPerPage={perPage}
                totalItems={sortedData.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>

            {/* mobile modal */}
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                  <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Employe Details</h5>
                      <div>
                        {" "}
                        <IoClose
                          onClick={() => setOpen(false)}
                          style={{ fontSize: "25px" }}
                        />
                      </div>
                    </div>

                    <div>
                      {details.map((item) => (
                        <div
                          className=" mb-3 text-capitalize mt-5"
                          key={item.id}
                        >
                          <div className="">
                            <div className="d-flex justify-content-between ">
                              <div>
                                {" "}
                                <p
                                  className="NameText"
                                  style={{ fontSize: "16px" }}
                                >
                                  ID: {item.id}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 InformSection">
                              <p>
                                <span className="GreyText">
                                  Name:
                                  <span className="DarkText ms-1">
                                    {item.name}
                                  </span>
                                </span>
                              </p>

                              <p>
                                <span className="GreyText">
                                  Email:
                                  <span className="DarkText ms-1">
                                    {item.emailId}
                                  </span>
                                </span>
                              </p>

                              <p>
                                <span className="GreyText">
                                  Mobile No:
                                  <span className="DarkText ms-1">
                                    {item.mobile}
                                  </span>
                                </span>
                              </p>

                              <p>
                                <span className="GreyText">
                                  Country:
                                  <span className="DarkText ms-1">
                                    {item.country}
                                  </span>
                                </span>
                              </p>

                              <p>
                                <span className="GreyText">
                                  State:
                                  <span className="DarkText ms-1">
                                    {item.state}
                                  </span>
                                </span>
                              </p>

                              <p>
                                <span className="GreyText">
                                  District:
                                  <span className="DarkText ms-1">
                                    {item.district}
                                  </span>
                                </span>
                              </p>

                              <p>
                                <span className="GreyText">
                                  CreatedAt:
                                  <span className="DarkText ms-1">
                                    {item.createdAt}
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop />
            </Sheet>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
}
