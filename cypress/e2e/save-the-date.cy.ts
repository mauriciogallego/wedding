// Mock the Google Sheets service
const mockSheetData = [
  {
    name: "test plus one",
    companions: "2",
    children: "1",
    plusOne: "No",
    invitationName: "test plus one",
    row: 1,
  },
  {
    name: "test accompanies",
    companions: "2",
    children: "1",
    plusOne: "Si",
    invitationName: "test accompanies",
    row: 2,
  },
];

// Mock the getSheetData function
beforeEach(() => {
  cy.intercept("GET", "**/api/sheet-data", {
    statusCode: 200,
    body: { data: mockSheetData },
  }).as("getSheetData");
});

describe("Save The Date Page", () => {
  beforeEach(() => {
    // Visit the save-the-date page before each test
    cy.visit("/en/save-the-date");
    // Wait for the sheet data to be loaded
    cy.wait("@getSheetData");
  });

  describe("Page Loading and Basic Structure", () => {
    it("should load the save-the-date page successfully", () => {
      cy.url().should("include", "/save-the-date");
    });

    it("should display the main content", () => {
      cy.get("main").should("be.visible");
    });

    it("should have proper translations", () => {
      cy.get("main").should("not.be.empty");
    });

    it("should handle language switching", () => {
      cy.visit("/es/save-the-date");
      cy.url().should("include", "/es/save-the-date");
    });
  });

  describe("Intro Animation", () => {
    it("should display the loading animation initially", () => {
      cy.get("[data-testid='loading-animation']").should("be.visible");
    });

    it("should show the wedding image", () => {
      cy.get("img[alt='Wedding Save the Date']").should("be.visible");
    });

    it("should display the typewriter effect with wedding names", () => {
      // Wait for the typewriter to be visible
      cy.get(".Typewriter").should("be.visible");

      // Wait for the typewriter to complete typing
      cy.get(".Typewriter__wrapper", { timeout: 10000 }).should("not.be.empty");
    });

    it("should complete the intro animation and show guest authentication form", () => {
      cy.wait(5000);
      // First verify the terminal is visible
      cy.get("aside.bg-black").should("be.visible");

      // Wait for the terminal animation to complete
      cy.get(".Typewriter__wrapper", { timeout: 10000 }).should("not.be.empty");

      // Verify the terminal shows the npm install message
      cy.contains("$ npm install save-the-date").should("be.visible");
      cy.contains("success installed save-the-date").should("be.visible");

      // Wait for the input to appear and verify it's ready for interaction
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 })
        .should("be.visible")
        .and("not.be.disabled");

      // Verify the input has placeholder text
      cy.get("[data-testid='guest-name-input']")
        .should("have.attr", "placeholder")
        .and("not.be.empty");

      // Verify the typewriter is no longer visible
      cy.get(".Typewriter").should("not.exist");
    });
  });

  describe("Guest Authentication - Plus One User", () => {
    beforeEach(() => {
      // Wait for intro animation to complete and guest authentication form to be visible
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.get("[data-testid='guest-name-input']").type("test plus one");
      cy.get("[data-testid='submit-button']").click();
    });

    it("should authenticate plus one user successfully", () => {
      cy.get("[data-testid='authentication-success']").should("be.visible");
    });

    describe("Response Options - English", () => {
      it("should handle 'Attend' response with plus one", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='plusOne']").select("Yes");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Attend' response without plus one", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='plusOne']").select("No");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Decline' response", () => {
        cy.get("[data-testid='decline-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });

      it("should handle 'Unsure' response", () => {
        cy.get("[data-testid='maybe-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });
    });

    describe("Response Options - Spanish", () => {
      beforeEach(() => {
        cy.visit("/es/save-the-date");
        cy.wait(5000);
        cy.get("[data-testid='guest-name-input']").type("test plus one");
        cy.get("[data-testid='submit-button']").click();
      });

      it("should handle 'Asistir' response with plus one", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='plusOne']").select("Sí");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Asistir' response without plus one", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='plusOne']").select("No");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Declinar' response", () => {
        cy.get("[data-testid='decline-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });

      it("should handle 'No sé' response", () => {
        cy.get("[data-testid='maybe-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });
    });
  });

  describe("Guest Authentication - Accompanies User", () => {
    beforeEach(() => {
      // Wait for intro animation to complete and guest authentication form to be visible
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.get("[data-testid='guest-name-input']").type("test accompanies");
      cy.get("[data-testid='submit-button']").click();
    });

    it("should authenticate accompanies user successfully", () => {
      cy.get("[data-testid='authentication-success']").should("be.visible");
    });

    describe("Response Options - English", () => {
      it("should handle 'Attend' response with all companions", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='adults']").select("2");
        cy.get("select[name='children']").select("1");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Attend' response with only adults", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='adults']").select("2");
        cy.get("select[name='children']").select("0");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Decline' response", () => {
        cy.get("[data-testid='decline-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });

      it("should handle 'Unsure' response", () => {
        cy.get("[data-testid='maybe-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });
    });

    describe("Response Options - Spanish", () => {
      beforeEach(() => {
        cy.visit("/es/save-the-date");
        cy.wait(5000);
        cy.get("[data-testid='guest-name-input']").type("test accompanies");
        cy.get("[data-testid='submit-button']").click();
      });

      it("should handle 'Asistir' response with all companions", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='adults']").select("2");
        cy.get("select[name='children']").select("1");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Asistir' response with only adults", () => {
        cy.get("[data-testid='attend-button']").click();
        cy.get("select[name='adults']").select("2");
        cy.get("select[name='children']").select("0");
        cy.get("[data-testid='submit-button']").click();
        cy.get("[data-testid='confetti']").should("exist");
      });

      it("should handle 'Declinar' response", () => {
        cy.get("[data-testid='decline-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });

      it("should handle 'No sé' response", () => {
        cy.get("[data-testid='maybe-button']").click();
        cy.get("[data-testid='confetti']").should("not.exist");
      });
    });
  });

  describe("Confirmation Display", () => {
    it("should show correct confirmation message for plus one user", () => {
      // Wait for intro animation to complete and guest authentication form to be visible
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.get("[data-testid='guest-name-input']").type("test plus one");
      cy.get("[data-testid='submit-button']").click();
      cy.get("[data-testid='attend-button']").click();
      cy.get("select[name='plusOne']").select("Yes");
      cy.get("[data-testid='submit-button']").click();
      cy.get("[data-testid='confetti']").should("exist");
    });

    it("should show correct confirmation message for accompanies user", () => {
      // Wait for intro animation to complete and guest authentication form to be visible
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.get("[data-testid='guest-name-input']").type("test accompanies");
      cy.get("[data-testid='submit-button']").click();
      cy.get("[data-testid='attend-button']").click();
      cy.get("select[name='adults']").select("2");
      cy.get("select[name='children']").select("1");
      cy.get("[data-testid='submit-button']").click();
      cy.get("[data-testid='confetti']").should("exist");
    });
  });

  describe("Navigation and State Management", () => {
    it("should maintain state between language switches", () => {
      cy.visit("/en/save-the-date");
      // Wait for intro animation to complete
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.visit("/es/save-the-date");
      cy.get("main").should("be.visible");
    });

    it("should handle page refresh gracefully", () => {
      // Wait for intro animation to complete
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.reload();
      cy.get("main").should("be.visible");
    });
  });

  describe("Error Handling", () => {
    it("should show error message for invalid input", () => {
      // Wait for intro animation to complete and guest authentication form to be visible
      cy.get("[data-testid='guest-name-input']", { timeout: 10000 }).should(
        "be.visible"
      );
      cy.get("[data-testid='guest-name-input']").type("invalid name");
      cy.get("[data-testid='submit-button']").click();
      cy.get("[data-testid='error-message']").should("be.visible");
    });
  });
});
