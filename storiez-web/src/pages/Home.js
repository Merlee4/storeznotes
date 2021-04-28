import axios from "axios";
import React from "react";
import Task from "../components/Task";

import Modal from "react-modal";
import timeStampToDate from "timestamp-to-date";
import moment from "moment";
import {
  InformationCircleIcon,
  LogoutIcon,
  PlusIcon,
} from "@heroicons/react/outline";

Modal.setAppElement("#root");

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      notes: [],
      noteText: "Create Note!",
      modalOpen: false,
      title: "",
      body: "",
      image: "",
      email: "",
      posterror: "",
      isOpen: false,
    };

    this.handleClick.bind = this.handleClick.bind(this);
    this.refresh = this.refresh.bind(this)
  }

  refresh() {
    // GET NEW TASKS
    const client = JSON.parse(sessionStorage.getItem("client"));
    this.setState({ email: client.email });
    axios
      .post("https://storiez-backend-server.herokuapp.com/", {
        email: client.email,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ notes: res.data });
        }
      });
  }

  handleClick = (e) => {
    e.preventDefault();
    const client = JSON.parse(sessionStorage.getItem("client"));

    if (this.state.body.length < 2) {
      this.setState({ posterror: "You need to include a title" });
      this.setState({ noteText: "Create Note!" });
    } else {
      axios
        .post("https://storiez-backend-server.herokuapp.com/post", {
          title: this.state.title.toLocaleUpperCase(),
          body: this.state.body,
          image: this.state.image,
          email: this.state.email,
          dateAdded: Date.now(),
        })
        .then((res) => {
          this.setState({ modalOpen: false });
          this.setState({ noteText: "Create Note!" });
          this.setState({ title: "" });
          this.setState({ body: "" });
          this.setState({ image: "" });
          this.setState({ email: client.email });

          //Get New NOTES
          this.refresh();
        });
    }
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const client = JSON.parse(sessionStorage.getItem("client"));

    if (!sessionStorage.getItem("client")) {
      this.props.history.push("/");
    }

    return (
      <div className="p-4">
        <div className=" flex justify-between py-2 items-center">
          <div>
            <p className="text-xl font-medium">My Notes</p>
            <p className="text-xs w-full text-gray-500">{client.name}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-black rounded-md text-white px-3 py-1"
              onClick={() => this.setState({ modalOpen: true })}
            >
              <PlusIcon className="h-5" />
            </button>
            <div>
              {client.email ? (
                <button
                  className="bg-red-300 rounded-md text-red-700 px-3 py-1 flex items-center gap-1"
                  onClick={() => {
                    sessionStorage.removeItem("client");
                    this.props.history.push("/");
                  }}
                >
                  <LogoutIcon className="h-5" />
                  <p>Logout</p>
                </button>
              ) : (
                  <button
                    className="bg-gray-500 rounded-md text-white px-3 py-1"
                    onClick={() => this.props.history.push("/login")}
                  >
                    Login
                </button>
                )}
            </div>
          </div>
        </div>
        <div>
          {this.state.notes.length < 1 ? (
            <div className="flex flex-col mt-10 text-gray-black opacity-40">
              <InformationCircleIcon className="h-20 " />
              <h1 className="text-center mt-4 text-lg">
                You do not have any posts at the moment
              </h1>
            </div>
          ) : (
              this.state.notes.map((task) => (
                <Task
                  title={task.title}
                  body={task.body}
                  id={task._id}
                  image={task.image}
                  key={task._id}
                  refresh={this.refresh}
                  date={
                    task.dateAdded ?
                      moment(
                        timeStampToDate(task.dateAdded, "yyyy-MM-dd HH:mm")
                      ).fromNow() : ""
                  }
                />
              ))
            )}
        </div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.setState({ modalOpen: false })}
          className=" w-screen h-screen p-4 flex flex-col"
        >
          <div className=" rounded-lg  my-auto mx-auto md:w-6/12 border bg-white">
            <p className="p-4 pb-2 text-2xl ">Create a note</p>
            <form
              className="flex flex-col p-4 pt-0"
              onSubmit={(e) => this.handleClick(e)}
            >
              <p className="text-red">{this.state.posterror}</p>
              <input
                type="text"
                placeholder="Title"
                className="p-2 border rounded mt-2"
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 border rounded mt-2"
                onChange={(e) => this.setState({ image: e.target.value })}
              />
              <textarea
                type="text"
                placeholder="body"
                className="p-2 border rounded mt-2"
                onChange={(e) => {
                  this.setState({ body: e.target.value });
                  this.setState({ posterror: "" });
                }}
              />
              <button
                className="bg-black rounded p-2 mt-2 text-white mb-4"
                type="submit"
                onClick={() => this.setState({ noteText: "Loading..." })}
              >
                {this.state.noteText}
              </button>
              <button onClick={() => this.setState({ modalOpen: false })}>
                Discard
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
