import { doc, updateDoc,arrayRemove, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase.js";

// İzleme listesine film ekle
export async function addToWatchlist(userUid, item) {
  const userRef = doc(db, "users", userUid);

  const itemData = {
    id: item.id,
    title: item.original_title || item.name,
    poster_path: item.poster_path || null,
    overview: item.overview || "",
    addedAt: new Date().toISOString()
  };

  try {
    // Kullanıcı dokümanı yoksa oluştur
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, { watchList: [itemData] });
      return "added";
    }

    // Film zaten varsa tekrar ekleme
    const data = snap.data();
    const exists = data.watchList?.some(i => i.id === item.id);
    if (exists) {
      console.log("Film zaten listede");
      return "already_exists";
    }

    // Yeni film ekle
    await updateDoc(userRef, {
      watchList: arrayUnion(itemData)
    });

    return "added";
  } catch (error) {
    console.error("Film eklenemedi:", error);
    return "error";
  }
}

// Kullanıcının izleme listesini getir
export async function getUserWatchlist(userUid) {
  const userRef = doc(db, "users", userUid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const data = snap.data();
    return data.watchList || [];
  } else {
    return [];
  }
}

export const removeFromWatchlist = async (userId, movie) => {
  const userDocRef = doc(db, "users", userId);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    console.error("Kullanıcı bulunamadı");
    return;
  }

  await updateDoc(userDocRef, {
    watchList: arrayRemove(movie)
  });
};
