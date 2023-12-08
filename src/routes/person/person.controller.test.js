const request = require('supertest')
const app = require('../../app')
const {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
} = require('../../services/person.service') // replace with the actual file path

jest.mock('../../services/person.service', () => ({
  getAllPersons: jest.fn(),
  getPersonById: jest.fn(),
  createPerson: jest.fn(),
  updatePerson: jest.fn(),
  deletePerson: jest.fn()
})) // Mock the functions G

describe('Person API Endpoints', () => {
  // Test GET /persons
  it('should get all persons', async () => {
    const mockPersons = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 }
    ]
    getAllPersons.mockResolvedValueOnce(mockPersons)

    const response = await request(app).get('/persons')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockPersons)
  })

  // Test GET /persons/:personId
  it('should get a person by ID', async () => {
    const mockPerson = { name: 'John', age: 25 }
    getPersonById.mockResolvedValueOnce(mockPerson)

    const response = await request(app).get('/persons/1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockPerson)
  })

  // Test POST /persons
  it('should create a new person', async () => {
    const mockPerson = { name: 'John', age: 25 }
    createPerson.mockResolvedValueOnce(mockPerson)

    const response = await request(app)
      .post('/persons')
      .send({ name: 'John', age: 25 })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(mockPerson)
  })

  // Test PUT /persons/:personId
  it('should update a person by ID', async () => {
    const mockPerson = { name: 'John', age: 30 }
    updatePerson.mockResolvedValueOnce(mockPerson)

    const response = await request(app)
      .put('/persons/1')
      .send({ name: 'John', age: 30 })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockPerson)
  })

  // Test DELETE /persons/:personId
  it('should delete a person by ID', async () => {
    const mockPerson = { name: 'John', age: 30 }
    deletePerson.mockResolvedValueOnce(mockPerson)

    const response = await request(app).delete('/persons/1')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockPerson)
  })
})
