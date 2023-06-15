const app = require("../server");
const request = require("supertest");

describe("BloodBank cases", () => {
  test("should return error message when password incorrect", async () => {
    const response = await request(app).post("/bloodBank/login").send({
      username: "BloodBank001",
      password: "password123",
    });
    expect(response.body).toEqual({ message: "Incorrect password or email" });
  });
  test("should return error message when username incorrect", async () => {
    const response = await request(app).post("/bloodBank/login").send({
      username: "bloodBank0002",
      password: "QQ!!11qq",
    });
    expect(response.body).toEqual({ message: "Incorrect password or email" });
  });
  test("should return error message when username null ", async () => {
    const response = await request(app).post("/bloodBank/login").send({
      username: null,
      password: "password123",
    });
    expect(response.body).toEqual({ message: "All fields are required" });
  });
  test("should return error message when password null ", async () => {
    const response = await request(app).post("/bloodBank/login").send({
      username: "BloodBank001",
      password: null,
    });
    expect(response.body).toEqual({ message: "All fields are required" });
  });
  test("should return success message ", async () => {
    const response = await request(app).post("/bloodBank/login").send({
      username: "Bloodbank001",
      password: "QQ!!11qq",
    });
    expect(response.body).toEqual({
      message: "User logged in successfully",
      success: true,
    });
  });
});
afterAll((done) => {
  done();
});
