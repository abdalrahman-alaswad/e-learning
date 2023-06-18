import "./AdminEditProfile.css"
import { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"

const AdminEditProfile = () => {
    const [avatar, setBase64Image] = useState()
    const [passwordNotEmpty, setPasswordNotEmpty] = useState(false)
    const [fullName, setFullName] = useState("Full Name")
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [email, setEmail] = useState("Email")
    const [phone, setPhone] = useState("Phone")
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`https://awesomeapp-1-e9667851.deta.app/user/${Cookies.get("userId")}`,
            { email, password, passwordConfirm, fullName, phone, avatar },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    // const uploadImage = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     setBase64Image(base64)
    // };

    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };
    return (
        <>
            <div className="container-xl px-4 mt-4 cont-edit">
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className="col-xl-4 ">
                        {/* <!-- Profile picture card--> */}
                        <div className="card mb-4 mb-xl-0 " style={{ background: "#191c24 " }}>
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                {/* <!-- Profile picture image--> */}
                                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                {/* <!-- Profile picture help block--> */}
                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                {/* <!-- Profile picture upload button--> */}
                                <input type="file" className="btn btn-primary" onChange={(e) => setBase64Image(e.target.files[0])} />

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-edit-profile">
                        {/* <!-- Account details card--> */}
                        <div className="card mb-4 card-profile " style={{ background: "#191c24 " }}>
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername" style={{ color: "white", display: "flex", justifyContent: "start" }}>Username </label>
                                        <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "white", display: "flex", justifyContent: "start" }}>Email address</label>
                                        <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    {/* <!-- Form Row        --> */}
                                    <div className="row" style={{ marginBottom: "10px" }}>
                                        <div className="col">
                                            <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "white", display: "flex", justifyContent: "start" }}>Password</label>
                                            <input type="password" className="form-control" placeholder="Password" aria-label="Password" onChange={(e) => {
                                                setPasswordNotEmpty(true)
                                                setPassword(e.target.value)
                                            }} />
                                        </div>
                                        <div className="col">
                                            <label className="small mb-1" htmlFor="inputEmailAddress" style={{ color: "white", display: "flex", justifyContent: "start" }}>Confirm Password</label>
                                            <input type="password" className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)} required={passwordNotEmpty ? true : false} />
                                        </div>
                                    </div>

                                    {/* <!-- Form Row--> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (phone number)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone" style={{ color: "white", display: "flex", justifyContent: "start" }}>Phone number</label>
                                            <input type="text" className="form-control" id="inputPhone" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <div className="col-md-6" style={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                                            <button className="btn btn-primary" type="submit">Save changes</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEditProfile