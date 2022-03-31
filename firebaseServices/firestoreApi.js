import app from "./firebaseApp";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firestore = getFirestore();
const storage = getStorage();

export const getPlaces = async (
  {
    // default value
    queryType = "nearbysearch",
    lat = 10.7697759,
    lng = 106.6563129,
    radius = 2000,
    rankby = "prominence",
    type = "hospital",
  },
  setItems,
  setLoading
) => {
  const queryString = `location=${lat},${lng}&radius=${radius}&rankby=${rankby}&type=${type}`;
  const url = `https://maps.googleapis.com/maps/api/place/${queryType}/json?${queryString}&key=${API_KEY}`;
  console.log(url);
  setLoading(true);
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));

  setItems([...result.results]);
  setLoading(false);
};

export const getImage = ({ photo_reference }) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${1600}&maxHeight=${1600}&photo_reference=${photo_reference}&key=${API_KEY}`;

  return url;
};

export const getInfo = async (place_id, setInfo, setLoading) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=address_component,formatted_address,name,geometry,photo,rating,opening_hours/open_now,international_phone_number,formatted_phone_number&key=AIzaSyAWaAtaKV8BYTY2nDCmVtA5WW0M4yyi4Y0`;

  setLoading(true);
  const result = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));

  setInfo({ ...result.result });
  setLoading(false);
};

export const createNewUser = async (userInfos) => {
  try {
    await setDoc(doc(firestore, "users", userInfos.userId), {
      userId: userInfos.userId,
      name: userInfos.name,
      email: userInfos.email,
      avatar: userInfos.photoURL || "",
      birthday: "",
      idCardNumber: "",
      address: "",
      phoneNumber: userInfos.phoneNumber ? userInfos.phoneNumber : "",
      role: "basic-user",
      gender: "",
      medicalRecord: {
        temperature: "",
        temperatureMeasureTime: "",
        SPO2: "",
        SPO2MeasureTime: "",
        heartRate: "",
        heartRateMeasureTime: "",
        bloodSugar: "",
        bloodSugarMeasureTime: "",
        bloodPressure: "",
        bloodPressureMeasureTime: "",
        height: "",
        heightMeasureTime: "",
      },
      patients: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const existsUser = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    return userDoc.exists();
  } catch (error) {
    console.log(error);
  }
};

export const getFacilities = async () => {
  try {
    const facilities = await getDocs(collection(firestore, "facilites"));
    const value = [];
    facilities.forEach((doc) => {
      value.push({ ...doc.data() });
    });
    return [...value];
  } catch (e) {
    console.log(e);
  }
};

export const getCurFacility = async (setItem, id) => {
  try {
    const facilitie = await getDoc(doc(firestore, "facilites", id));

    const value = facilitie.data();
    // console.log("value");
    // console.log(value);
    setItem({ ...value });
  } catch (e) {
    console.log(e);
  }
};

export const getUserInfo = async (userId) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalRecord = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      if (userDoc.data().medicalRecord) {
        return {
          medicalRecord: userDoc.data().medicalRecord,
          userAvatar: userDoc.data().avatar,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addMedicalRecord = async (medicalRecord, userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      medicalRecord: {
        ...medicalRecord,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPatient = async (patientInfo, userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userDoc = userSnap.data();
      userDoc.patients.push({ ...patientInfo, no: userDoc.patients.length });
      await updateDoc(userRef, userDoc);
      return [...userDoc.patients];
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

const uploadImageAsync = async (userId, uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const userAvatarRef = ref(storage, `avatars/${userId}.jpg`);
  const result = await uploadBytes(userAvatarRef, blob, {
    contentType: "image/jpeg",
  });
  blob.close();
  return getDownloadURL(userAvatarRef);
};

export const updateUserInfo = async (userInfo, userId, userAvatar) => {
  const userRef = doc(firestore, "users", userId);
  await updateDoc(userRef, userInfo).catch((error) => console.log(error));
  if (userAvatar.isChanged) {
    await uploadImageAsync(userId, userAvatar.uri)
      .then((imgUrl) => {
        updateDoc(userRef, {
          avatar: imgUrl,
        });
      })
      .catch((error) => console.log(error));
  }
};

export const getCurUser = async () => {
  try {
    const auth = await getAuth();
    const uid = auth.currentUser.uid;
    const currentUser = await getDoc(doc(firestore, "users", uid));
    return currentUser.data();
  } catch (e) {
    console.log(e);
  }
};

export const getService = async (id) => {
  try {
    const services = await getDocs(
      collection(firestore, `facilites/${id}/services`)
    );
    const value = [];
    services.forEach((doc) => {
      value.push({
        ...doc.data(),
      });
    });
    return [...value];
  } catch (e) {
    console.log(e);
  }
};

export const getDoctors = async (id) => {
  try {
    // const doctorList = await getDocs(
    //   query(collection(firestore, "doctors"), where("hospitalId", "==", id))
    // );
    const doctorList = await getDocs(collection(firestore, "doctors"));
    const value = [];
    doctorList.forEach((doc) => {
      value.push({ ...doc.data() });
    });
    return [...value];
  } catch (e) {
    console.log(e);
  }
};

export const getTime = async (id) => {
  try {
    const time = await getDocs(collection(firestore, `facilites/${id}/time`));
    const value = [];
    time.forEach((doc) => {
      const data = doc.data();
      value.push({
        ...data,
        start: data.start.toDate(),
        end: data.end.toDate(),
      });
    });
    return [...value];
  } catch (e) {
    console.log(e);
  }
};

export const setAppointment = async (info, userId) => {
  try {
    const userRef = doc(firestore, "users", userId);

    return userRef;
  } catch (e) {
    console.log(e);
  }
};

export const getUserRef = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    return userRef;
  } catch (e) {
    console.log(e);
  }
};

export const addAppointment = async (appointmentInfo) => {
  try {
    const appoint = await addDoc(
      collection(firestore, "users", appointmentInfo.userId, "appointments"),
      appointmentInfo
    );
    return "appoint: " + appoint.id;
  } catch (e) {
    console.log(e);
  }
};

export const addChat = async (info) => {
  try {
    const chatsRef = doc(firestore, "chats", `${info.userId}-${info.doctorId}`);
    const getChat = await getDoc(chatsRef);
    // console.log("yes");
    if (!getChat.exists()) {
      // console.log("no");
      const chat = await setDoc(
        doc(firestore, "chats", `${info.userId}-${info.doctorId}`),
        {
          doctorName: info.doctorName,
          doctorAvatar: info.doctorAvatar,
          userId: info.userId,
          doctorId: info.doctorId,
          doctorSpeciality: info.doctorSpeciality,
          messages: [],
        }
      );
      return "chat: " + chat.id;
    }
    return "Already have";
  } catch (e) {
    console.log(e);
  }
};

export const getAppointments = async () => {
  try {
    const auth = await getAuth();
    const uid = auth.currentUser.uid;
    const appointRef = collection(firestore, `users/${uid}/appointments`);
    const appointmentSnap = await getDocs(appointRef);
    const value = [];
    appointmentSnap.forEach((doc) => {
      value.push({ ...doc.data(), id: doc.id });
    });
    return [...value];
  } catch (e) {
    console.log(e);
  }
};

export const getContactList = async () => {
  try {
    const auth = await getAuth();
    const uid = auth.currentUser.uid;
    const chatsRef = query(
      collection(firestore, "chats"),
      where("userId", "==", uid)
    );
    const chatSnap = await getDocs(chatsRef);
    const value = [];
    chatSnap.forEach((doc) => {
      value.push({ ...doc.data() });
    });
    // console.log("value");
    // console.log(value);
    return [...value];
  } catch (e) {
    console.log(e);
  }
};

export const deleteAppointment = async (userId, appointId) => {
  try {
    const appointRef = doc(
      firestore,
      `users/${userId}/appointments/${appointId}`
    );
    return await deleteDoc(appointRef).then(() => console.log("deleted"));
  } catch (e) {
    console.log(e);
  }
};
