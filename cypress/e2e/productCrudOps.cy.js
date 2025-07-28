/* eslint-disable no-undef */

/// <reference types="cypress" />

import testData from "../fixtures/testData.json";

describe("Verify Login and Product CRUD Operations", () => {
  beforeEach(() => {
    // Restore the session and revisit the page
    cy.visit("http://localhost:3000");

    cy.get("#floatingInput").type(testData.login.username);
    cy.get("#floatingPassword").type(testData.login.password);
    cy.get("#signInBtn").click();
    //Asserting if login was successful
    cy.get("#porjMngTitle").should("have.text", "Project Manager");
  });

  it("Test Login", () => {
    if (cy.get("#logoutBtn").should("be.visible")) {
      cy.get("#logoutBtn").click();
      cy.wait(1000); // Wait for the error message to disappear
    }
    // Login with invalid credentials
    cy.get("#floatingInput").type(testData.login.invalidUsername);
    cy.get("#floatingPassword").type(testData.login.invalidPassword);
    cy.get("#signInBtn").click();
    cy.wait(1000);
    cy.get(".card-title").should("be.visible");

    //Login with valid credentials
    cy.get("#floatingInput").clear().type(testData.login.username);
    cy.get("#floatingPassword").clear().type(testData.login.password);
    cy.get("#signInBtn").click();
    //Asserting if login was successful
    cy.get("#porjMngTitle").should("have.text", "Project Manager");
  });

  it("Create a new project", () => {
    cy.get("#createProjectBtn").click();
    cy.get("#createNewProjTitle").should("be.visible");
    cy.get("#projName").type(testData.project.name);
    cy.get("#projDescription").type(testData.project.description);
    cy.get("#saveProjectBtn").should("be.visible").click();

    //Asserting if project creation was successful
    cy.get("#viewAllProjectsBtn").click();
    cy.wait(2000); // time for the project list to refresh

    cy.get("table tbody tr")
      .last()
      .find("td")
      .first()
      .should("have.text", testData.project.name);
  });

  it("Update an existing project", () => {
    cy.get("table tbody tr")
      .last()
      .find('a[id^="editProject"]') // select <a> tags where id starts with "editProject"
      .click();

    cy.get("#nameEdit")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty")
      .then(() => {
        cy.get("#nameEdit").clear().type(testData.project.nameUpdate);
      });

    cy.get("#descriptionEdit")
      .should("be.visible")
      .invoke("val")
      .should("not.be.empty")
      .then(() => {
        cy.get("#descriptionEdit")
          .clear()
          .type(testData.project.descriptionUpdate);
      });
    cy.get("#updateProjectBtn").click();
    cy.get("#viewAllProjectsBtn").click();

    cy.get("table tbody tr")
      .last()
      .find("td")
      .first()
      .should("have.text", testData.project.nameUpdate);
  });

  it("Delete an existing project", () => {
    cy.get("table tbody tr").last().find('button[id^="deleteProj"]').click();
    cy.get("#confrimDeleteText").should("be.visible");
    cy.get("#confirmDeleteBtn").should("be.visible").click();

    //Asseting if project deletion was successful
    cy.get("#confrimDeleteBtn").should("be.visible").click();
  });
});
