import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/chatPage.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ChatPage = () => {
  const collectionName = "kimia";
  const [theMessage, setTheMessage] = useState("");
  const [arrayOfMessages, setArrayOfMessages] = useState([]);

  const createMessage = async (e) => {
    try {
      e.preventDefault();
      let message = theMessage;
      setTheMessage("");
      await addDoc(collection(db, collectionName), {
        message,
        // user: localStorage.getItem("Username"),
        user: "pojan",
        createdAt: new Date(),
      });
      subscription();
    } catch (err) {
      console.log("ini error");
      console.log(err, `--------`);
    }
  };

  const subscription = () => {
    onSnapshot(collection(db, collectionName), (snap) => {
      let result = [];
      snap.forEach((doc) => {
        result.push(doc.data());
        result.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        setArrayOfMessages(result);
      });
    });
  };

  const handleChange = (e) => {
    setTheMessage(e.target.value);
  };

  useEffect(() => {
    const objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, []);

  useEffect(() => {
    subscription();
  }, []);
  return (
    <>
      <Navbar />
      <div className="chat-container">
        <div id="chat-windows" className="chat-window">
          {arrayOfMessages ? (
            <div id="messages" className="messages">
              {arrayOfMessages.map((doc, idx) => {
                return (
                  <div className="single" key={idx}>
                    <span className="created-at">
                      {formatDistanceToNow(doc.createdAt.toDate())} ago
                    </span>
                    <span className="name">{doc.user}</span>
                    <span className="message">{doc.message}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <form>
          <input
            onChange={(e) => handleChange(e)}
            name="inputText"
            value={theMessage}
            placeholder="type your message here ..."
          />
          <button
            onClick={(e) => createMessage(e)}
            className="btn"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
