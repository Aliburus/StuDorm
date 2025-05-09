import React, { useState } from "react";
import { Save } from "lucide-react";
import { updateUserProfile } from "../../services/UserServices";

const ProfileForm = ({
  user,
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  handleSubmit,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least 1 uppercase, 1 digit, 6 characters

  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Yeni şifreler eşleşmiyor.");
      setSuccessMessage("");
      return;
    }

    // Password validation
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Yeni şifre en az bir büyük harf, bir rakam ve 6 karakterden oluşmalıdır."
      );
      setSuccessMessage("");
      return;
    }

    // Email validation
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Geçerli bir e-posta adresi girin.");
      setSuccessMessage("");
      return;
    }

    setFormData({
      ...formData,
      oldPassword,
      newPassword,
    });
    setErrorMessage(""); // Clear any previous error message
    setSuccessMessage("Şifre başarıyla güncellendi.");
  };

  const updateUserInfo = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const formDataWithPassword = {
        ...formData,
        oldPassword: oldPassword, // Eski şifre
        newPassword: newPassword, // Yeni şifre
      };
      const updatedUser = await updateUserProfile(formDataWithPassword, token); // API'ye yeni verileri gönderiyoruz
      setIsEditing(false);
      setSuccessMessage("Profil başarıyla güncellendi!");
    } catch (error) {
      setErrorMessage("Kullanıcı bilgileri güncellenirken bir hata oluştu.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Formun sayfa yenilenmesini engelliyoruz
          handlePasswordChange(); // Şifre değişikliği kontrolü
        }}
        className="space-y-6 bg-white rounded-xl shadow-sm p-8"
      >
        {/* Kullanıcı Bilgileri (Okunabilir alanlar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              disabled
              value={formData.name}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              disabled
              value={formData.surname}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        {/* Password Change Section */}
        {isEditing && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
            </div>
          </>
        )}

        {/* Error and Success Messages */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFormData(user);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateUserInfo} // Güncelleme işlemini başlat
                className="flex items-center px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
              >
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ProfileForm;

// import React, { useState } from "react";
// import { Save } from "lucide-react";
// import { updateUserProfile } from "../../services/UserServices";

// const ProfileForm = ({
//   user,
//   formData,
//   setFormData,
//   isEditing,
//   setIsEditing,
//   handleSubmit,
// }) => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handlePasswordChange = () => {
//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Yeni şifreler eşleşmiyor.");
//       setSuccessMessage("");
//       return;
//     }

//     setFormData({
//       ...formData,
//       oldPassword,
//       newPassword,
//     });
//     setErrorMessage(""); // Error mesajlarını sıfırlıyoruz
//     setSuccessMessage("Şifre başarıyla güncellendi.");
//   };

//   const updateUserInfo = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const formDataWithPassword = {
//         ...formData,
//         oldPassword: oldPassword, // Eski şifre
//         newPassword: newPassword, // Yeni şifre
//       };
//       const updatedUser = await updateUserProfile(formDataWithPassword, token); // API'ye yeni verileri gönderiyoruz
//       setIsEditing(false);
//       setSuccessMessage("Profil başarıyla güncellendi!");
//     } catch (error) {
//       setErrorMessage("Kullanıcı bilgileri güncellenirken bir hata oluştu.");
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault(); // Formun sayfa yenilenmesini engelliyoruz
//           handlePasswordChange(); // Şifre değişikliği kontrolü
//         }}
//         className="space-y-6 bg-white rounded-xl shadow-sm p-8"
//       >
//         {/* Kullanıcı Bilgileri (Okunabilir alanlar) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               First Name
//             </label>
//             <input
//               type="text"
//               disabled
//               value={formData.name}
//               className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Last Name
//             </label>
//             <input
//               type="text"
//               disabled
//               value={formData.surname}
//               className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             disabled={!isEditing}
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:text-gray-500"
//           />
//         </div>

//         {/* Password Change Section */}
//         {isEditing && (
//           <>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Old Password
//               </label>
//               <input
//                 type="password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
//               />
//             </div>
//           </>
//         )}

//         {/* Error and Success Messages */}
//         {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//         {successMessage && (
//           <p className="text-green-500 text-sm">{successMessage}</p>
//         )}

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-3 pt-6">
//           {isEditing ? (
//             <>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData(user);
//                   setIsEditing(false);
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={updateUserInfo} // Güncelleme işlemini başlat
//                 className="flex items-center px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
//               >
//                 <Save className="w-4 h-4 mr-2" /> Save Changes
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               onClick={() => setIsEditing(true)}
//               className="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </form>
//     </>
//   );
// };

// export default ProfileForm;
