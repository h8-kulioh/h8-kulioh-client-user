import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "../../css/LoginPage.css"
import axios from "axios";

const ProfilePage = () => {
    const initialStateObj = useMemo(() => {
        return {
            email: "",
            name: "",

        };
    }, []);
    const [adminObj, setAdminObj] = useState(initialStateObj);
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/users/profile`, {
                headers: {
                    access_token: localStorage.getItem("accessToken")
                }
            })
            // console.log(data, `ini data profile`);
            setAdminObj({
                email: data.email,
                name: data.name
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3001/users/profile`, {
                name: adminObj.name
            }, {
                headers: {
                    access_token: localStorage.getItem("accessToken")
                }
            })
            getUserData()
            console.log(`berhasil edit user`);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        getUserData()
    }, [])

    return (
        <>
            <Navbar />

            <div className="login-container">
                <h1>Kulioh</h1>
                <div className="form-container">
                    <form onSubmit={(e) => submitHandler(e)} className="form-component">
                        <input disabled
                            type="email"
                            placeholder="EMAIL"
                            value={adminObj.email}
                        // onChange={(e) =>
                        //     setAdminObj({ ...adminObj, email: e.target.value })
                        // }
                        />

                        <input
                            type="TEXT"
                            placeholder="Name"
                            value={adminObj.name}
                            onChange={(e) =>
                                setAdminObj({ ...adminObj, name: e.target.value })
                            }
                        />

                        <button className="btn" type="submit">
                            Update Profile
                        </button>
                    </form>


                </div>
            </div>
        </>
    )
}

export default ProfilePage


