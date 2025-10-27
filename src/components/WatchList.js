import React, { useEffect, useState } from "react";
import { getUserWatchlist, removeFromWatchlist } from "../services/firestoreService";
import { auth } from "../Firebase";
import defaultPoster from "../images/notfound.png";
import "../styles/WatchList.css";
import { MdDeleteForever } from "react-icons/md";
import { FaRegSadTear } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const list = await getUserWatchlist(currentUser.uid);
        setWatchList(list);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <p>Lütfen giriş yapın.</p>;

  if (watchList.length === 0)
    return (
      <div className="empty-watchlist">
        <FaRegSadTear className="empty-icon" />
        <h2>İzleme Listen Boş</h2>
        <p>
          Henüz hiçbir filmi eklemedin. Beğendiğin filmleri keşfet ve listene ekle.
        </p>
        <button
          className="add-btn"
          onClick={() => (window.location.href = "/")}
        >
          Filmleri Keşfet
        </button>
      </div>
    );

  const handleDelItem = async (movie) => {
    if (!user) return;
    try {
      await removeFromWatchlist(user.uid, movie);
      setWatchList((prevList) => prevList.filter((item) => item.id !== movie.id));
    } catch (error) {
      console.error("Film silinirken hata oluştu:", error);
    }
  };

  // 🔹 Sürükle-bırak sonrası sıralamayı güncelle
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(watchList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWatchList(items);
  };

  return (
    <div className="watchlist-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="watchlist" direction="horizontal">
          {(provided) => (
            <div
              className="watchlist-dropzone"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {watchList.map((movie, index) => (
                <Draggable key={movie.id.toString()} draggableId={movie.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`watchlist-item ${snapshot.isDragging ? "dragging" : ""}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <button
                          className="del-item-btn"
                          onClick={() => handleDelItem(movie)}
                        >
                          <MdDeleteForever className="del-item-icon" />
                        </button>
                      </div>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : defaultPoster
                        }
                        alt="Poster"
                      />
                      <div className="watchlist-content">
                        <h1>{movie.title}</h1>
                        <p>
                          <span>Dil:</span> {movie.original_language || "Bilinmiyor"}
                        </p>
                        <p>
                          <span>Açıklama:</span> {movie.overview}
                        </p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default WatchList;
