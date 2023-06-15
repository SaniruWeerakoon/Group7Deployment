const app = require("../server"); 
const request = require("supertest");


describe("Donor cases", () => {
  test("should return error message when password incorrect", async () => {
    const response = await request(app).post("/donor/login").send({
      NIC: "123456789002",
      password: "password123",
    });
    expect(response.body).toEqual({ message: "Incorrect password or email" });
  });
  test("should return error message when NIC incorrect", async () => {
    const response = await request(app).post("/donor/login").send({
      NIC: "donor0002",
      password: "qwertyuiop",
    });
    expect(response.body).toEqual({ message: "Incorrect password or email" });
  });
  test("should return error message when NIC null ", async () => {
    const response = await request(app).post("/donor/login").send({
      NIC: null,
      password: "password123",
    });
    expect(response.body).toEqual({ message: "All fields are required" });
  });
  test("should return error message when password null ", async () => {
    const response = await request(app).post("/donor/login").send({
      NIC: "123456789002",
      password: null,
    });
    expect(response.body).toEqual({ message: "All fields are required" });
  });
  test("should return success message  ", async () => {
    const response = await request(app).post("/donor/login").send({
      NIC: "123456789002",
      password: "qwertyuiop",
    });
    expect(response.body).toEqual({
      message: "User logged in successfully",
      success: true,
    });
  });
});