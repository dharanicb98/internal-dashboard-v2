import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUser } from '../../../services/userServices';
import UserEditForm, { RenderUserNames } from './userEditForm';
import UserPopup from './userPopup';
import { userInputDetails, userInputNames, userInputStatus } from '../../../constants/userData';
import Dialog from '../../../ui/dialog';
import { formatDate, formatInput } from '../../../utils/common';

const UserID = () => {
    const parms = useParams();
    const [userData, setUserData] = useState({});
    const [pageLoad, setPageLoad] = useState(false);
    const [isPopup, setIspopup] = useState(false);
    const [pop, setPop] = useState({});
    const [isEdit, setEdit] = useState({
        editNames: false,
        editUserDetails: false,
        editUserStatus: false
    });

    const {
        id,
        fname,
        lname,
        mobile,
        dob,
        email,
        gender,
        postal_code,
        address1,
        address2,
        bio,
        mobile_ext,
        house_no,
        username,
        user_role,
        is_wp_user,
        company_name,
        user_avatar,
        user_cover,
        email_verified,
        mobile_verified,
        facebook,
        youtube,
        apple,
        linkedIn,
        twitter,
        instagram,
        amount_paid,
        activation_key,
        city_id,
        country_id,
        created_at,
        updated_at,
        email_otp,
        email_otp_expire,
        is_active,
        is_deleted,
        is_paying_customer,
        languages,
        last_login,
        login_attempts,
        mobile_otp,
        reset_attempts,
        session_tokens,
        sms_otp_expire,
        state_id,
        total_checkouts,
        total_orders,
        whishlist,
    } = userData


    const getUserData = async () => {
        try {
            const response = await getUser(parms.id);
            setUserData(...response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [pageLoad]);


    const handleEdit = () => {
        setEdit({
            ...isEdit,
            editNames: !isEdit.editNames,
        });
    };

    const handleUserStatus = () => {
        setEdit({
            ...isEdit,
            editUserStatus: !isEdit.editUserStatus,
        });
    };

    const handleUserDetails = () => {
        setEdit({
            ...isEdit,
            editUserDetails: !isEdit.editUserDetails,
        });
    };

    const handleClose = () => {
        setIspopup(false);
    };

    const onPopupActionChange = (e) => {
        setIspopup(e);
    };

    const popUpContainer = (updateData) => {
        setPop({ ...pop,  updateData: updateData });
    };



    const userNames = [
        { name: "First Name", value: fname },
        { name: "Last Name", value: lname },
        { name: "Mobile", value: mobile ? `${mobile_ext + " " + mobile}` : " " },
        { name: "Date of Birth", value: formatDate(dob) },
        { name: "Email", value: email },
        { name: "Gender", value: gender },
        { name: "Address 1", value: address1 },
        { name: "Address 2", value: address2 },
        { name: "House No", value: house_no },
        { name: "Pincode", value: postal_code },
        { name: "Bio", value: bio },
    ];

    const userDetails = [
        { name: "User Name", value: username },
        { name: "User Role", value: user_role },
        { name: "User Avatar", value: user_avatar },
        { name: "User Cover", value: user_cover },
        { name: "Is-WP User", value: is_wp_user },
        { name: "Company Name", value: company_name },
        { name: "Email Varified", value: email_verified },
        { name: "Mobile Varified", value: mobile_verified },
        { name: "Facebook", value: facebook },
        { name: "YouTube", value: youtube },
        { name: "Apple", value: apple },
        { name: "Twitter", value: twitter },
        { name: "Instagram", value: instagram },
        { name: "Linkdin", value: linkedIn },
    ];
    const userStatus = [
        { name: "Amount Paid", value: amount_paid },
        { name: "Languages", value: languages },
        { name: "Activation key", value: activation_key },
        { name: "Country ID", value: country_id },
        { name: "State ID", value: state_id },
        { name: "City ID", value: city_id },
        { name: "Created At", value: created_at ? formatDate(created_at) : "" },
        { name: "Updated At", value: updated_at ? formatDate(updated_at) : "", hr: true },
        { name: "Email Otp", value: email_otp },
        { name: "Email Otp Expire", value: email_otp_expire },
        { name: "Mobile Otp", value: mobile_otp },
        { name: "Is Active", value: is_active },
        { name: "Is Deleted", value: is_deleted },
        { name: "Is Paying Customer", value: is_paying_customer },
        { name: "Last Login", value: last_login },
        { name: "Login Attempts", value: login_attempts },
        { name: "Reset Attempts", value: reset_attempts },
        { name: "Session tokens", value: session_tokens },
        { name: "Sms Otp Expire", value: sms_otp_expire, hr: true },
        { name: "Total checkouts", value: total_checkouts },
        { name: "Total orders", value: total_orders },
        { name: "Whishlist", value: whishlist },

    ];


    console.log("userId", parms.id, userData)

    return (
        <div className='h-screen overflow-y-auto mb-20'>
            <div className="flex justify-between self-center m-4">
                <h1 className="text-2xl font-semibold">
                    {userData.fname && userData.lname && userData?.fname + " " + userData?.lname} User{" "}
                </h1>
            </div>
            <div className="flex flex-col m-3">
                <div className="mt-4">
                    <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
                        <div className="mt-12">
                            {isEdit.editNames ? (
                                <UserEditForm
                                    formData={{
                                        fname: fname ? fname : "",
                                        lname: lname ? lname : "",
                                        mobile: mobile ? mobile : "",
                                        mobile_ext: mobile_ext ? mobile_ext : "",
                                        dob: dob ? formatInput(dob) : "",
                                        email: email ? email : "",
                                        gender: gender ? gender : "",
                                        address1: address1 ? address1 : "",
                                        address2: address2 ? address2 : "",
                                        postal_code: postal_code ? postal_code : "",
                                        bio: bio ? bio : "",
                                        house_no: house_no ? house_no : "",
                                    }}
                                    InputData={userInputNames}
                                    isEdit={isEdit.editNames}
                                    onClick={handleEdit}
                                    popUpContainer={popUpContainer}
                                    onPopupAction={(e) => onPopupActionChange(e)}
                                />
                            ) : (
                                <RenderUserNames
                                    checkoutStatus={userNames}
                                    handleEdit={handleEdit}
                                    readButton={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
                        <div className="mt-12">
                            {isEdit.editUserDetails ? (
                                <UserEditForm
                                    formData={{
                                        username: username ? username : "",
                                        user_role: user_role ? user_role : "",
                                        is_wp_user: is_wp_user ? is_wp_user : "",
                                        company_name: company_name ? company_name : "",
                                        user_avatar: user_avatar ? user_avatar : "",
                                        user_cover: user_cover ? user_cover : "",
                                        email_verified: email_verified ? email_verified : "",
                                        mobile_verified: mobile_verified ? mobile_verified : "",
                                        facebook: facebook ? facebook : "",
                                        youtube: youtube ? youtube : "",
                                        apple: apple ? apple : "",
                                        twitter: twitter ? twitter : "",
                                        instagram: instagram ? instagram : "",
                                        linkedIn: linkedIn ? linkedIn : "",
                                    }}
                                    InputData={userInputDetails}
                                    isEdit={isEdit.editUserDetails}
                                    onClick={handleUserDetails}
                                    popUpContainer={popUpContainer}
                                    onPopupAction={(e) => onPopupActionChange(e)}
                                />
                            ) : (
                                <RenderUserNames
                                    checkoutStatus={userDetails}
                                    handleEdit={handleUserDetails}
                                    readButton={true}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="w-4/5 px-6 rounded  p-3 drop-shadow mx-auto bg-white">
                        <div className="mt-12">
                            {isEdit.editUserStatus ? (
                                <div>
                                    <UserEditForm
                                        formData={{
                                            amount_paid: amount_paid ? amount_paid : "",
                                        }}
                                        InputData={userInputStatus}
                                        isEdit={isEdit.editUserStatus}
                                        onClick={handleUserStatus}
                                        popUpContainer={popUpContainer}
                                        onPopupAction={(e) => onPopupActionChange(e)}
                                    />
                                    <RenderUserNames
                                        checkoutStatus={userStatus.slice(userInputStatus.length)}
                                        handleEdit={handleUserStatus}
                                        readButton={!isEdit.editUserStatus}
                                    />
                                </div>
                            ) : (
                                <RenderUserNames
                                    checkoutStatus={userStatus}
                                    handleEdit={handleUserStatus}
                                    readButton={!isEdit.editUserStatus}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isPopup && (
                <Dialog
                    closeModal={handleClose}
                    isOpen={isPopup}
                    title={"Order"}
                    childrenClass={"w-[50%] max-h-[60%] p-6 rounded-md overflow-auto no-scrollbar dark-scrollbar"}
                >
                    <UserPopup
                        value={"Update"}
                        formData={pop.updateData}
                        putID={parms.id}
                        setPageLoad = {(item)=> setPageLoad(item)}
                        close={handleClose}
                        isOpen={isPopup}
                        data={userData && userData}
                    />
                </Dialog>
            )}
        </div>
    )
}

export default UserID