import { db } from "../../firebase/config";
import { useState, useEffect, useCallback } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/chatPage.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ChatPage = () => {
  let username = localStorage.getItem("name");
  let major1 = localStorage.getItem("major1");
  let major2 = localStorage.getItem("major2");
  const [theMessage, setTheMessage] = useState("");
  const [arrayOfMessages, setArrayOfMessages] = useState([]);
  let [collectionName, setCollectionName] = useState(major1);

  const createMessage = async (e) => {
    try {
      e.preventDefault();
      let message = theMessage;
      setTheMessage("");
      await addDoc(collection(db, collectionName), {
        message,
        user: username,
        createdAt: new Date(),
      });
      subscription();
    } catch (err) {
      console.log("ini error");
      console.log(err, `--------`);
    }
  };

  const subscription = useCallback(() => {
    onSnapshot(collection(db, collectionName), (snap) => {
      let result = [];
      snap.forEach((doc) => {
        // console.log(doc);
        result.push(doc.data());
        result.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      });
      setArrayOfMessages(result);
    });
  }, [collectionName]);

  const handleChange = (e) => {
    setTheMessage(e.target.value);
  };

  useEffect(() => {
    const objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, []);

  useEffect(() => {
    subscription();
  }, [collectionName, subscription]);

  const nameChatRoom = (major) => {
    let theMajor = major.split("-");
    let array1 = theMajor[0].split(" ").map((el, idx) => {
      let newString = el[0] + el.slice(1).toLowerCase();
      // console.log(newString);
      if (el[0] !== "(") return newString;
      else return el;
    });
    // console.log(array1);

    let array2 = theMajor[1].split(" ").map((el) => {
      let newString = el[0] + el.slice(1).toLowerCase();
      return newString;
    });
    array1.push("-");
    array1.push(...array2);
    let newStr = array1.join(" ");
    // console.log(array2);
    return newStr;
  };

  const toggleChatRoom = (collection) => {
    setCollectionName(collection);
  };

  const selectRoom = (e) => {
    // console.log(e.target.value);
    setCollectionName(e.target.value);
  };

  return (
    <>
      <Navbar />

      <div className="chat-container">
        <div className="select-toggle">
          <select onChange={(e) => selectRoom(e)}>
            <option value={major1}>Chat Room {nameChatRoom(major1)}</option>
            <option value={major2}>Chat Room {nameChatRoom(major2)}</option>
          </select>
        </div>

        <div id="chat-windows" className="chat-window">
          {arrayOfMessages ? (
            <div id="messages" className="messages">
              {arrayOfMessages.map((doc, idx) => {
                return (
                  <div
                    className={
                      doc.user === username ? "single-right" : "single"
                    }
                    key={idx}
                  >
                    <div className="bubble-chat">
                      <span className="name">{doc.user}</span>
                      <span className="message">{doc.message}</span>
                      <p className="createdAt">
                        {formatDistanceToNow(doc.createdAt.toDate())} ago
                      </p>
                    </div>
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
