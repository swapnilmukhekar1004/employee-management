import React, { useState, useEffect } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function Projectlisting() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [sortBy, setSortBy] = useState("priority"); // State for sorting
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = allData.filter(item => item.id === searchTerm);
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

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        {
          status: newStatus,
        }
      );
      // Assuming the server updates successfully, we'll also update the local state
      setData(
        data.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      setAllData(
        allData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

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
                                  <p>{item.id}</p>
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
                                    onClick={() =>
                                      updateStatus(item.id, "running")
                                    }
                                    className="btn btn-outline-primary m-1"
                                  >
                                  <FaEdit />
                                  </button><br></br>
                                 
                                  <button
                                    onClick={() =>
                                      updateStatus(item.id, "cancelled")
                                    }
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
                  placeholder="search by ID"
                  value={searchTerm}
                  onChange={handleSearchChange}
                ></input>

                <HiMiniBars3BottomLeft
                  className="BarIcon"
                  onClick={() => setOpen(true)}
                  style={{ fontSize: "25px" }}
                />
              </div>
            </div>

            <div className="row">
              {currentRecords.map((item) => (
                <div className="col-lg-6 col-md-6" key={item.id}>
                  <div className="card mb-3 text-capitalize">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="NameText" style={{ fontSize: "18px" }}>
                            {item.projectname}
                          </p>
                        </div>
                        <p className="NameText">{item.status}</p>
                      </div>
                      <span className="DateMbl">
                        <span>{item.startDate}</span>{" "}
                        <span className="text-lowercase">to</span>{" "}
                        <span>{item.endDate}</span>
                      </span>

                      <div className="mt-3 InformSection">
                        <p>
                          <span className="GreyText">
                            Reason:
                            <span className="DarkText">{item.reason}</span>
                          </span>
                        </p>
                        <p className="d-flex">
                          <span className="GreyText">
                            Type:<span className="DarkText">{item.type}</span>{" "}
                          </span>
                          <span>
                            <li className="GreyText ms-3">
                              Category:
                              <span className="DarkText">{item.category}</span>
                            </li>
                          </span>
                        </p>
                        <p className="d-flex">
                          <span className="GreyText">
                            Div:
                            <span className="DarkText">{item.divison}</span>{" "}
                          </span>
                          <span>
                            <li className="GreyText ms-3">
                              Dept:
                              <span className="DarkText">
                                {item.department}
                              </span>
                            </li>
                          </span>
                        </p>
                        <p>
                          <span className="GreyText">
                            Location:
                            <span className="DarkText">{item.location}</span>{" "}
                          </span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button
                          className="btn btn-outline-primary m-1 BtnCsm"
                          onClick={() => updateStatus(item.id, "running")}
                        >
                          Start
                        </button>
                        <button
                          className="btn btn-outline-primary m-1 BtnCsm"
                          onClick={() => updateStatus(item.id, "closed")}
                        >
                          Close
                        </button>
                        <button
                          className="btn btn-outline-primary m-1 BtnCsm"
                          onClick={() => updateStatus(item.id, "cancelled")}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
