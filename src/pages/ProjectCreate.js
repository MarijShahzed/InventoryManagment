import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../components/Layout";

function ProjecCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, []);

  const axiosInstance = axios.create({
    baseURL: "https://mock-api.binaryboxtuts.com/",
  });

  const handleSave = () => {
    setIsSaving(true);
    axiosInstance
      .post(
        "/api/projects",
        {
          name: name,
          description: description,
        },
        {
          headers: {
            "X-Binarybox-Api-Key":
              "binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt",
          },
        }
      )
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Project saved successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        setIsSaving(false);
        setName("");
        setDescription("");
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occured!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mt-5 mb-3" id="createNewProjTitle">
          Create New Project
        </h2>
        <div className="card">
          <div className="card-header">
            <Link
              className="btn btn-outline-info float-right"
              to="/dashboard"
              id="viewAllProjectsBtn"
            >
              View All Projects
            </Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  type="text"
                  className="form-control"
                  id="projName"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  className="form-control"
                  id="projDescription"
                  rows="3"
                  name="description"
                ></textarea>
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline-primary mt-3"
                id="saveProjectBtn"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjecCreate;
