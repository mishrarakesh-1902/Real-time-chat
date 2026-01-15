// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// // const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
// // const BASE_URL = import.meta.env.MODE === "development" ? "https://real-time-chat1-8hhq.onrender.com" : "/";
// const BASE_URL = "https://real-time-chat1-8hhq.onrender.com";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isCheckingAuth: true,
//   isSigningUp: false,
//   isLoggingIn: false,
//   socket: null,
//   onlineUsers: [],

//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (error) {
//       console.log("Error in authCheck:", error);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signup: async (data) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await axiosInstance.post("/auth/signup", data);
//       set({ authUser: res.data });

//       toast.success("Account created successfully!");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       set({ authUser: res.data });

//       toast.success("Logged in successfully");

//       get().connectSocket();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ authUser: null });
//       toast.success("Logged out successfully");
//       get().disconnectSocket();
//     } catch (error) {
//       toast.error("Error logging out");
//       console.log("Logout error:", error);
//     }
//   },

//   updateProfile: async (data) => {
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       set({ authUser: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("Error in update profile:", error);
//       toast.error(error.response.data.message);
//     }
//   },

//   connectSocket: () => {
//     const { authUser } = get();
//     if (!authUser || get().socket?.connected) return;

//     const socket = io(BASE_URL, {
//       withCredentials: true, // this ensures cookies are sent with the connection
//     });

//     socket.connect();

//     set({ socket });

//     // listen for online users event
//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },

//   disconnectSocket: () => {
//     if (get().socket?.connected) get().socket.disconnect();
//   },
// }));


// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL = "https://real-time-chat1-8hhq.onrender.com";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isCheckingAuth: true,
//   isSigningUp: false,
//   isLoggingIn: false,
//   socket: null,
//   onlineUsers: [],

//   /* ===================== CHECK AUTH ===================== */
//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       set({ authUser: res.data });

//       // connect socket ONLY if user is authenticated
//       get().connectSocket();
//     } catch (error) {
//       // ❗ 401 here is NORMAL (user not logged in)
//       // ❌ DO NOT show toast
//       // ❌ DO NOT treat as real error
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   /* ===================== SIGNUP ===================== */
//   signup: async (data) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await axiosInstance.post("/auth/signup", data);
//       set({ authUser: res.data });

//       toast.success("Account created successfully!");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Signup failed");
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   /* ===================== LOGIN ===================== */
//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       set({ authUser: res.data });

//       toast.success("Logged in successfully");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Login failed");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   /* ===================== LOGOUT ===================== */
//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ authUser: null });

//       get().disconnectSocket();
//       toast.success("Logged out successfully");
//     } catch (error) {
//       toast.error("Error logging out");
//       console.log("Logout error:", error);
//     }
//   },

//   /* ===================== UPDATE PROFILE ===================== */
//   updateProfile: async (data) => {
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       set({ authUser: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Update failed");
//     }
//   },

//   /* ===================== SOCKET ===================== */
//   connectSocket: () => {
//     const { authUser, socket } = get();
//     if (!authUser || socket?.connected) return;

//     const newSocket = io(BASE_URL, {
//       withCredentials: true,
//     });

//     newSocket.connect();

//     newSocket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });

//     set({ socket: newSocket });
//   },

//   disconnectSocket: () => {
//     const { socket } = get();
//     if (socket?.connected) socket.disconnect();
//   },
// }));


import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://real-time-chat1-8hhq.onrender.com";

export const useAuthStore = create((set, get) => ({
  /* ===================== AUTH STATE ===================== */
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  /* ===================== SOCKET STATE ===================== */
  socket: null,
  onlineUsers: [],

  /* ===================== VIDEO CALL STATE ===================== */
  incomingCall: null, // { fromUserId, offer, isGroup }
  activeCall: null,   // { withUserId }

  /* ===================== CHECK AUTH ===================== */
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      if (res.data) {
        get().connectSocket();
      }
    } catch {
      // user not logged in → NORMAL
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  /* ===================== SIGNUP ===================== */
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  /* ===================== LOGIN ===================== */
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  /* ===================== LOGOUT ===================== */
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({
        authUser: null,
        incomingCall: null,
        activeCall: null,
      });

      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  },

  /* ===================== UPDATE PROFILE ===================== */
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  },

  /* ===================== SOCKET ===================== */
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
    });

    newSocket.connect();

    /* ===== ONLINE USERS ===== */
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    /* ===== VIDEO CALL EVENTS ===== */

    // Incoming call
    newSocket.on("incoming-call", ({ fromUserId, offer, isGroup }) => {
      set({
        incomingCall: { fromUserId, offer, isGroup },
      });
    });

    // Call answered
    newSocket.on("call-answered", ({ answer }) => {
      // peerRef is attached by WebRTC logic (ChatHeader / hook)
      newSocket.peerRef?.setRemoteDescription(answer);
    });

    // ICE candidate received
    newSocket.on("ice-candidate", ({ candidate }) => {
      newSocket.peerRef?.addIceCandidate(candidate);
    });

    // Call ended
    newSocket.on("call-ended", () => {
      set({
        activeCall: null,
        incomingCall: null,
      });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
    set({ socket: null });
  },
}));
