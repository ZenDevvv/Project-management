const mockUser = {
  username: "janedoe89",
  firstname: "Jane",
  lastname: "Doe",
  email: "janedoe89@example.com",
  password: "password1234",
  avatarImage: "https://via.placeholder.com/150",
  position: "Project Manager",
  status: "active",
  type: "admin",
  lastActive: "2024-11-02T08:45:00Z",

  // Additional information
  phoneNumber: "+1-123-456-7890", // Contact number
  address: {
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "USA",
  }, // Address object for detailed location
  bio: "Jane is a seasoned project manager with over 10 years of experience in managing cross-functional teams and delivering successful projects on time and within budget.", // Short biography
  skills: [
    "Leadership",
    "Communication",
    "Agile Project Management",
    "Risk Management",
  ], // Array of skills
  hobbies: ["Hiking", "Photography", "Traveling", "Reading"], // Array of hobbies

  company: "Tech Solutions Inc.", // Current company name
  hireDate: "2015-06-15T00:00:00Z", // Date the user joined the company
};

export { mockUser };
