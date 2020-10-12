import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { getUserData, getSpecialityList } from '../http/http-calls'
import './Profile.css'

class Profile extends Component {

    state = {
        user: {
            name: "",
            experience: "",
            fees: "",
            qualification: "",
            practising: "",
            email: "",
            phone: "",
            medicalNo: "",
            graduation: "",
            specialization: "",
            superSpecialization: "",
            gender: "",
            id: "",
            speciality: ""
        },
        isDirty: {
            name: false,
            experience: false,
            fees: false,
            qualification: false,
            practising: false,
            email: false,
            phone: false,
            medicalNo: false,
            graduation: false,
            specialization: false,
            superSpecialization: false,
            gender: false,
            speciality: false
        },
        errors: {}
    }

    componentDidMount() {
        let user;
        getUserData().then(resp => {
            this.setState({
                user: {
                    name: resp.doctor.name.full,
                    experience: resp.doctor.experience,
                    fees: resp.doctor.fee,
                    qualification: resp.doctor.qualification,
                    practising: resp.doctor.clinicOrHospitalName,
                    email: resp.doctor.email,
                    phone: resp.doctor.phone,
                    medicalNo: resp.doctor.registrationNumber,
                    graduation: resp.doctor.qualification,
                    specialization: resp.doctor.specialty,
                    superSpecialization: resp.doctor.superSpeciality,
                    gender: resp.doctor.gender,
                    id: resp.doctor._specialty.id
                }
            })
        }).catch(err => console.log(err))

        getSpecialityList().then(resp => {
            resp.specialties.map((data) => {
                user = this.state.user
                if (data._id === this.state.user.id) {
                    this.setState({
                        user: {
                            speciality: data.name,
                            name: user.name,
                            experience: user.experience,
                            fees: user.fees,
                            qualification: user.qualification,
                            practising: user.practising,
                            email: user.email,
                            phone: user.phone,
                            medicalNo: user.medicalNo,
                            graduation: user.graduation,
                            specialization: user.specialization,
                            superSpecialization: user.superSpecialization,
                            gender: user.gender
                        }
                    })
                }
            })
        }).catch(err => console.log(err))
    }

    handleOnChange = (field, value) => {
        const { user, isDirty } = this.state;
        user[field] = value;
        isDirty[field] = true;
        this.setState({ user, isDirty }, () => {
            this.validateForm();
        });
    };

    validateForm = () => {
        const { user, errors, isDirty } = this.state;
        Object.keys(user).forEach((each) => {
            if (each === "name" && isDirty.name) {
                if (!user.name.trim().length) {
                    errors.name = "*Required";
                } else if (user.name.trim().length &&
                    !user.name.match(/^[a-zA-Z ]*$/)
                ) {
                    errors.name = "Invalid name format";
                } else if (user.name.trim().length <= 3) {
                    errors.name = "Name should be greater than 3 characters";
                }
                else {
                    delete errors[each];
                    isDirty.name = false;
                }
            } else if (each === "experience" && isDirty.experience) {
                if (!user.experience.trim().length) {
                    errors.experience = "*Required";
                } else if (!user.experience.match(/^[0-9]{1,2}$/)) {
                    errors.experience = "Enter valid experience in years";
                } else {
                    delete errors[each];
                    isDirty.experience = false;
                }
            } else if (each === "fees" && isDirty.experience) {
                if (!user.fees.trim().length) {
                    errors.fees = "*Required";
                } else if (!user.fees.match(/^[0-9]{6}$/)) {
                    errors.fees = "Enter valid amount";
                } else {
                    delete errors[each];
                    isDirty.fees = false;
                }
            } else if (each === "qualification" && isDirty.qualification) {
                if (!user.qualification.trim().length) {
                    errors.qualification = "*Required";
                } else {
                    delete errors[each];
                    isDirty.qualification = false;
                }
            } else if (each === "practising" && isDirty.practising) {
                if (!user.practising.trim().length) {
                    errors.practising = "*Required";
                } else {
                    delete errors[each];
                    isDirty.practising = false;
                }
            } else if (each === "email" && isDirty.email) {
                if (!user.email.trim().length) {
                    errors.email = "*Required";
                } else if (!user.email.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)) {
                    errors.email = "Invalid Email";
                } else {
                    delete errors[each];
                    isDirty.email = false;
                }
            } else if (each === "phone" && isDirty.phone) {
                if (!user.phone.trim().length) {
                    errors.phone = "*Required";
                } else if (!user.phone.match(/^[0-9]{10}$/)) {
                    errors.phone = "Enter valid phone number";
                } else {
                    delete errors[each];
                    isDirty.phone = false;
                }
            } else if (each === "medicalNo" && isDirty.medicalNo) {
                if (!user.medicalNo.trim().length) {
                    errors.medicalNo = "*Required";
                } else {
                    delete errors[each];
                    isDirty.medicalNo = false;
                }
            } else if (each === "graduation" && isDirty.graduation) {
                if (!user.graduation.trim().length) {
                    errors.graduation = "*Required";
                } else {
                    delete errors[each];
                    isDirty.graduation = false;
                }
            } else if (each === "specialization" && isDirty.specialization) {
                if (!user.specialization.trim().length) {
                    errors.specialization = "*Required";
                } else {
                    delete errors[each];
                    isDirty.specialization = false;
                }
            } else if (each === "superSpecialization" && isDirty.superSpecialization) {
                if (!user.superSpecialization.trim().length) {
                    errors.superSpecialization = "*Required";
                } else {
                    delete errors[each];
                    isDirty.superSpecialization = false;
                }
            } else if (each === "speciality" && isDirty.speciality) {
                if (user.speciality === "") {
                    errors.speciality = "*Required";
                } else {
                    delete errors[each];
                    isDirty.speciality = false;
                }
            } else if (each === "gender" && isDirty.gender) {
                if (user.gender === null) {
                    errors.gender = "*Required";
                } else {
                    delete errors[each];
                    isDirty.gender = false;
                }
            }
        });
        this.setState({ errors });
        return Object.keys(errors).length ? errors : null;
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        let isDirty = {
            name: true,
            experience: true,
            fees: true,
            qualification: true,
            practising: true,
            email: true,
            phone: true,
            medicalNo: true,
            graduation: true,
            specialization: true,
            superSpecialization: true,
            gender: true,
            speciality: true
        };
        this.setState({ isDirty }, () => {
            let errors = this.validateForm();
            console.log(errors);
            if (!errors) {
                console.log("Name :- " + this.state.user.name)
                console.log("Experience :- " + this.state.user.experience)
                console.log("Consulting fees :- " + this.state.user.fees)
                console.log("Qualification :- " + this.state.user.qualification)
                console.log("Practising at :- " + this.state.user.practising)
                console.log("Email :- " + this.state.user.email)
                console.log("Phone :- " + this.state.user.phone)
                console.log("Gender :- " + this.state.user.gender)
                console.log("Medical registration number :- " + this.state.user.medicalNo)
                console.log("Graduation :- " + this.state.user.graduation)
                console.log("Specialization :- " + this.state.user.specialization)
                console.log("Super specialization :- " + this.state.user.superSpecialization)
                console.log("Speciality :- " + this.state.user.speciality)
            }
        });
    };

    render() {
        return (
            <div className="formBody">
                <div className="title">
                    <h1>Edit Basic Info</h1>
                </div>
                <Form onSubmit={this.handleOnSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="fullName">Name</Label>
                                <Input type="text" name="fullName" id="fullName"
                                    value={this.state.user.name} onChange={(e) =>
                                        this.handleOnChange("name", e.target.value)}
                                    placeholder="Enter full name"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="speciality">Speciality</Label>
                                <Row form>
                                    <select value={this.state.user.speciality}
                                        onChange={(e) => this.handleOnChange("speciality", e.target.value)} >
                                        <option></option>
                                        <option value="Dermatologists">Dermatologists</option>
                                        <option value="General Surgeons">General Surgeons</option>
                                        <option value="Cardiology">Cardiology</option>
                                        <option value="Endocrinologists">Endocrinologists</option>
                                        <option value="Gastroenterologists">Gastroenterologists</option>
                                        <option value="Urologists">Urologists</option>
                                        <option value="Gynaecology">Gynaecology</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="Orthopedic">Orthopedic</option>
                                        <option value="optho">optho</option>
                                        <option value="psychiatrist">psychiatrist</option>
                                        <option value="dietiance">dietiance</option>
                                        <option value="fcece">fcece</option>
                                        <option value="Test">Test</option>
                                    </select>
                                </Row>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="experience">Experience</Label>
                                <Input type="number" name="experience" id="experience" placeholder="Enter experience in years"
                                    value={this.state.user.experience} onChange={(e) =>
                                        this.handleOnChange("experience", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="fees">Consult Fees</Label>
                                <Input type="number" name="fees" id="fees" placeholder="Enter fees"
                                    value={this.state.user.fees} onChange={(e) =>
                                        this.handleOnChange("fees", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="qualification">Qualification</Label>
                                <Input type="text" name="qualification" id="qualification" placeholder="Enter qualification"
                                    value={this.state.user.qualification} onChange={(e) =>
                                        this.handleOnChange("qualification", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="practising">Practising At</Label>
                                <Input type="text" name="practising" id="practising" placeholder="Enter practising at"
                                    value={this.state.user.practising} onChange={(e) =>
                                        this.handleOnChange("practising", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="languages">Languages</Label>
                        <Row form>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="hindi" check>Hindi</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="english" check>English</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="bengali" check>Bengali</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="oriya" check>Oriya</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="assamese" check>Assamese</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="gujrati" check>Gujrati</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="marathi" check>Marathi</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="telugu" check>Telugu</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="tamil" check>Tamil</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="punjabi" check>Punjabi</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="malayalam" check>Malayalam</Label>
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup check>
                                    <Input type="checkbox" />
                                    <Label for="kannada" check>Kannada</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email"
                                    value={this.state.user.email} onChange={(e) =>
                                        this.handleOnChange("email", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input type="number" name="phone" id="phone" placeholder="Enter phone number"
                                    value={this.state.user.phone} onChange={(e) =>
                                        this.handleOnChange("phone", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6} className="gender">
                            <FormGroup>
                                <Label for="gender">Gender</Label>
                                <Row>
                                    <Col md={2}></Col>
                                    <Col md={2}>
                                        <div>
                                            <Input type="radio" value="Male" name="gender" checked={this.state.user.gender === "Male"}
                                                onChange={() => this.handleOnChange("gender", "Male")} />
                                            <Label for="male">Male</Label>
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <div>
                                            <Input type="radio" value="Female" name="gender" checked={this.state.user.gender === "Female"}
                                                onChange={() => this.handleOnChange("gender", "Female")} />
                                            <Label for="female">Female</Label>
                                        </div>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="medicalNo">Medical Registration Number</Label>
                                <Input type="text" name="medicalNo" id="medicalNo" placeholder="Enter Medical registration number"
                                    value={this.state.user.medicalNo} onChange={(e) =>
                                        this.handleOnChange("medicalNo", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="graduation">Graduation</Label>
                                <Input type="text" name="graduation" id="graduation" placeholder="Enter graduation details"
                                    value={this.state.user.graduation} onChange={(e) =>
                                        this.handleOnChange("graduation", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="specialization">Specialization</Label>
                                <Input type="text" name="specialization" id="specialization" placeholder="Enter specialization"
                                    value={this.state.user.specialization} onChange={(e) =>
                                        this.handleOnChange("fespecializationes", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="superSpecialization">Super Specialization</Label>
                                <Input type="text" name="superSpecialization" id="superSpecialization" placeholder="Enter super specialization"
                                    value={this.state.user.superSpecialization} onChange={(e) =>
                                        this.handleOnChange("superSpecialization", e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit">Save</Button>
                </Form>
            </div>
        )
    }
}

export default Profile
