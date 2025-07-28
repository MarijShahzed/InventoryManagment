import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../components/Layout";

function ProjectList() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
    fetchProjectList();
  }, []);

  const axiosInstance = axios.create({
    baseURL: "https://mock-api.binaryboxtuts.com/",
  });

  const fetchProjectList = () => {
    axiosInstance
      .get("/api/projects", {
        headers: {
          "X-Binarybox-Api-Key":
            "binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt",
        },
      })
      .then(function (response) {
        setProjectList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      didOpen: () => {
        // Add ID to the title text
        const titleEl = document.querySelector(".swal2-title");
        if (titleEl) titleEl.id = "confrimDeleteText";

        // Add ID to the confirm button
        const confirmBtn = document.querySelector(".swal2-confirm");
        if (confirmBtn) confirmBtn.id = "confirmDeleteBtn";

        // Add ID to the cancel button
        const cancelBtn = document.querySelector(".swal2-cancel");
        if (cancelBtn) cancelBtn.id = "cancelBtn";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/api/projects/${id}`, {
            headers: {
              "X-Binarybox-Api-Key":
                "binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt",
            },
          })
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Project deleted successfully!",
              showConfirmButton: true,
              didOpen: () => {
                // Add ID to the title text
                const titleEl = document.querySelector(".swal2-confirm");
                if (titleEl) titleEl.id = "confrimDeleteBtn";
              },
            });
            fetchProjectList();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "An Error Occured!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3" id="porjMngTitle">
          Project Manager
        </h2>
        <div className="card">
          <div className="card-header">
            <Link
              className="btn btn-outline-primary"
              to="/create"
              id="createProjectBtn"
            >
              Create New Project{" "}
            </Link>
            <button
              onClick={() => Logout()}
              className="btn btn-outline-danger float-end"
              id="logoutBtn"
            >
              {" "}
              Logout{" "}
            </button>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th width="240px">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project, key) => {
                  return (
                    <tr key={key}>
                      <td id={`projectId${project.id}`}>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                        <Link
                          to={`/show/${project.id}`}
                          className="btn btn-outline-info mx-1"
                        >
                          Show
                        </Link>
                        <Link
                          id={`editProject${project.id}`}
                          className="btn btn-outline-success mx-1"
                          to={`/edit/${project.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          id={`deleteProj${project.id}`}
                          onClick={() => handleDelete(project.id)}
                          className="btn btn-outline-danger mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectList;
