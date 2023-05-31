import { createContext, useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase-config";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export const MediumContext = createContext();

export const MediumProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    // Check if user info exists in local storage
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));

      setAllUsers(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };

    getAllUsers();
  }, [user]);

  useEffect(() => {
    const getAllPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));

      setAllPosts(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              body: doc.data().body,
              brief: doc.data().brief,
              category: doc.data().category,
              postLength: doc.data().postLength,
              bannerImage: doc.data().bannerImage,
              title: doc.data().title,
              comments: doc.data().comments,
              postedOn: doc.data().postedOn.toDate(),
              author: doc.data().author,
            },
          };
        })
      );
    };

    getAllPosts();
  }, []);

  const saveUser = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      imageUrl: user.photoURL,
      followerCount: 0,
    });
  };

  const handleUserAuth = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsLoading(true);
        setUser(user);
        saveUser(user);
        navigate("/");
        // Save user info in local storage
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          setIsLoading(false);
          setAlert({
            open: true,
            message: `Sign up successful. welcome ${user.displayName}`,
            type: "success",
          });
        }, 1000);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const SignUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      setAlert({
        open: true,
        message: `Sign out successful. goodby ${user.displayName}`,
        type: "error",
      });
    });
  };

  return (
    <MediumContext.Provider
      value={{
        user,
        handleUserAuth,
        allPosts,
        allUsers,
        SignUserOut,
        isLoading,
        alert,
        setAlert,
      }}
    >
      {children}
    </MediumContext.Provider>
  );
};
