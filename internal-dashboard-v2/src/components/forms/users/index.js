// import React, { useState } from "react";
// import Input from "../../popup/Input";
// import Button from "../../../components/button";
// import {
//   createCategory,
//   updateCategory,
// } from "../../../services/categoriesServices";
// import { useDispatch } from "react-redux";
// import {
//   loaderStart,
//   loaderSuccess,
//   error,
// } from "../../../store/reducers/loaderSlice";
// import { phoneExtensions } from "../../../constants/phoneExtension";
// import { INPUT_STYLE } from "../../../constants";
// import {
//   getAllUsers,
//   createUser,
//   editUser,
// } from "../../../services/userServices";

// const UsersForm = ({ hidePopup, updateData, btn, setPageLoad, userId }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState(updateData);

//   const editApiHandler = async () => {
//     dispatch(loaderStart());
//     try {
//       const response = await editUser(formData, userId);
//       dispatch(loaderSuccess());
//       setPageLoad((prev) => !prev);
//     } catch (e) {
//       dispatch(error("update failed"));
//     }
//   };

//   const createApiHandler = async () => {
//     dispatch(loaderStart());
//     try {
//       const response = await createUser(formData);
//       dispatch(loaderSuccess());
//       setPageLoad((prev) => !prev);
//     } catch (e) {
//       console.log(e);
//       dispatch(error("create User failed"));
//     }
//   };

//   return (
//     <>
//       <form className="flex flex-col text-lg gap-2] py-2 ">
//         <div className=" scrollbar-hide overflow-y-auto flex flex-col gap-4">
//           <div className="flex gap-2">
//             <Input
//               type={"text"}
//               label="FirstName"
//               value={formData.fname}
//               onChange={(e) => {
//                 setFormData({ ...formData, fname: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="LastName"
//               value={formData.lname}
//               onChange={(e) => {
//                 setFormData({ ...formData, lname: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"password"}
//               label="Password"
//               value={formData.password}
//               className={` w-[33%]`}
//               onChange={(e) => {
//                 setFormData({ ...formData, password: e.target.value });
//               }}
//             />
//           </div>
//           <div className="flex gap-2 items-center">
//             <Input
//               type={"date"}
//               label="DOB"
//               value={formData.date}
//               onChange={(e) => {
//                 setFormData({ ...formData, dob: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <div className="w-[33%] flex flex-col">
//               <label className="text-slate-600 text-lg">M_Ext</label>
//               <select
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     mobile_ext: e.target.value,
//                   }))
//                 }
//                 className={`${INPUT_STYLE} w-[33%]`}
//               >
//                 {phoneExtensions.map((el) => {
//                   return (
//                     <option className="text-lg" value={el.dial_code}>
//                       {el.dial_code}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <Input
//               type={"number"}
//               label="Mobile"
//               value={formData.mobile}
//               className={` w-[33%]`}
//               onChange={(e) => {
//                 setFormData({ ...formData, mobile: e.target.value });
//               }}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Input
//               type={"text"}
//               label="UserName"
//               value={formData.username}
//               onChange={(e) => {
//                 setFormData({ ...formData, username: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"email"}
//               label="Email"
//               value={formData.email}
//               className={` w-[33%]`}
//               onChange={(e) => {
//                 setFormData({ ...formData, email: e.target.value });
//               }}
//             />
//             <Input
//               type={"text"}
//               label="Bio"
//               value={formData.bio}
//               onChange={(e) => {
//                 setFormData({ ...formData, bio: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//           </div>
//           <div className="flex gap-2">
//             <div className="w-[33%] flex flex-col">
//               <label className="text-slate-600 text-lg">Gender</label>
//               <select
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, gender: e.target.value }))
//                 }
//                 className={`h-[37px] ${INPUT_STYLE} `}
//               >
//                 <option className="text-lg">Choose Gender</option>
//                 <option className="text-lg" value={1}>
//                   Male
//                 </option>
//                 <option className="text-lg" value={2}>
//                   Female
//                 </option>
//               </select>
//             </div>
//             <div className="w-[33%] flex flex-col">
//               <label className="text-slate-600 text-lg">Role</label>
//               <select
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     user_role: e.target.value,
//                   }))
//                 }
//                 className={`h-[37px] ${INPUT_STYLE}`}
//               >
//                 <option className="text-lg">Choose Role</option>
//                 <option className="text-lg" value={100}>
//                   Customer
//                 </option>
//                 <option className="text-lg" value={1}>
//                   Admin
//                 </option>
//               </select>
//             </div>
//             <div className="w-[33%] flex flex-col">
//               <label className="text-slate-600 text-lg">Is_Wp_User</label>
//               <select
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     is_wp_user: e.target.value,
//                   }))
//                 }
//                 className={`h-[37px] ${INPUT_STYLE}`}
//               >
//                 <option className="text-lg">Is_Wp_User</option>
//                 <option className="text-lg" value="Old">
//                   Old
//                 </option>
//                 <option className="text-lg" value="New">
//                   New
//                 </option>
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <Input
//               type={"text"}
//               label="CompanyName"
//               value={formData.company_name}
//               onChange={(e) => {
//                 setFormData({ ...formData, company_name: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="Address_1"
//               value={formData.address1}
//               onChange={(e) => {
//                 setFormData({ ...formData, address1: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="Address_2"
//               value={formData.address2}
//               onChange={(e) => {
//                 setFormData({ ...formData, address2: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//           </div>

//           <div className="flex gap-2">
//             <Input
//               type={"text"}
//               label="House_No"
//               value={formData.house_no}
//               onChange={(e) => {
//                 setFormData({ ...formData, house_no: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="User_Avatar"
//               value={formData.user_avatar}
//               onChange={(e) => {
//                 setFormData({ ...formData, user_avatar: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="User_Cover"
//               value={formData.user_cover}
//               onChange={(e) => {
//                 setFormData({ ...formData, user_cover: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//           </div>
//           <div className="flex gap-2">
//             <div className="w-[33%] flex flex-col">
//               <label className="text-slate-600 text-lg">Email_verified</label>
//               <select
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     email_verified: e.target.value,
//                   }))
//                 }
//                 className={`h-[37px] ${INPUT_STYLE}`}
//               >
//                 <option className="text-lg">Choose</option>
//                 <option className="text-lg" value={1}>
//                   Yes
//                 </option>
//                 <option className="text-lg" value={2}>
//                   No
//                 </option>
//               </select>
//             </div>

//             <div className="w-[33%] flex flex-col">
//               <label className="text-slate-600 text-lg">Mobile_verified</label>
//               <select
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     mobile_verified: e.target.value,
//                   }))
//                 }
//                 className={`h-[37px] ${INPUT_STYLE}`}
//               >
//                 <option>Choose</option>
//                 <option value={1}>Yes</option>
//                 <option value={2}>No</option>
//               </select>
//             </div>

//             <Input
//               type={"text"}
//               label="Facebook"
//               value={formData.facebook}
//               onChange={(e) => {
//                 setFormData({ ...formData, facebook: e.target.value });
//               }}
//               className={`w-[33%]`}
//             />
//           </div>

//           <div className="flex gap-2">
//             <Input
//               type={"text"}
//               label="Youtube"
//               value={formData.youtube}
//               onChange={(e) => {
//                 setFormData({ ...formData, youtube: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="Apple"
//               value={formData.apple}
//               onChange={(e) => {
//                 setFormData({ ...formData, apple: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//             <Input
//               type={"text"}
//               label="Twitter"
//               value={formData.twitter}
//               onChange={(e) => {
//                 setFormData({ ...formData, twitter: e.target.value });
//               }}
//               className="w-[33%]"
//             />
//           </div>

//           <div className="flex gap-2">
//             <Input
//               type={"text"}
//               label="Instagram"
//               value={formData.instagram}
//               onChange={(e) => {
//                 setFormData({ ...formData, instagram: e.target.value });
//               }}
//               className="w-[50%]"
//             />
//             <Input
//               type={"text"}
//               label="LinkedIn"
//               value={formData.linkedin}
//               onChange={(e) => {
//                 setFormData({ ...formData, linkedin: e.target.value });
//               }}
//               className="w-[50%]"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between mt-6 ">
//           <Button
//             className="p-2"
//             type="black"
//             value={"Cancel"}
//             onClick={hidePopup}
//           />
//           {btn.isEdit && (
//             <Button
//               className="p-2 "
//               type="primary"
//               value={"Update"}
//               onClick={(e) => {
//                 hidePopup();
//                 editApiHandler();
//                 e.preventDefault();
//               }}
//             />
//           )}
//           {btn.isCreate && (
//             <Button
//               className="p-2 "
//               type="primary"
//               value={"Create"}
//               onClick={(e) => {
//                 hidePopup();
//                 createApiHandler();
//                 e.preventDefault();
//               }}
//             />
//           )}
//         </div>
//       </form>
//     </>
//   );
// };

// export default UsersForm;
