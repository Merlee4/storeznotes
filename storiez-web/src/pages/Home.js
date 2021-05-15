import axios from "axios";
import React from "react";
import Modal from "react-modal";
import timeStampToDate from "timestamp-to-date";
import moment from "moment";
import {
  LogoutIcon,
  PlusIcon,
  XIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import loadingIcon from '../components/images/loading.gif'
import Task from "../components/Task";

Modal.setAppElement("#root");

class Home extends React.Component {
  constructor(props) {
    super(props);
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
      gettingNotes: true,
      noNotesYet: false
    };

    this.handleClick.bind = this.handleClick.bind(this);
    this.refresh = this.refresh.bind(this)
  }

  refresh() {
    // GET NEW TASKS
    const client = JSON.parse(localStorage.getItem("client"));
    this.setState({ email: client.email });
    axios
      .post("https://storiez-backend-server.herokuapp.com/", {
        email: client.email
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            notes: res.data,
            gettingNotes: false
          });
          if (res.data.length < 1) {
            this.setState({ noNotesYet: true })
          }
        }
      });
  }

  handleClick = (e) => {
    e.preventDefault();
    const client = JSON.parse(localStorage.getItem("client"));

    if (this.state.body.length < 2) {
      this.setState({ posterror: "You need to include a title" });
      this.setState({ noteText: "Create Note!" });
    } else {
      axios
        .post("https://storiez-backend-server.herokuapp.com/post", {
          title: this.state.title.toLocaleUpperCase(),
          body: this.state.body,
          image: this.state.image,
          email: client.email,
          dateAdded: Date.now(),
        })
        .then((res) => {
          this.setState({
            modalOpen: false,
            noteText: "Create Note!",
            title: "",
            body: "",
            image: ""
          });
          //Get New NOTES
          this.refresh();
        });
    }
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    const client = JSON.parse(localStorage.getItem("client"));

    if (!localStorage.getItem("client")) {
      this.props.history.push("/");
    }

    return (
      <div >
        <div className="p-2 bg-black flex justify-between text-white font-mono">
          <p>{client.name}</p>
          {this.state.notes.length > 1 || this.state.notes.length == 1 ?
            <p>
              {this.state.notes.length === 1 ? this.state.notes.length + ` Note` : null}
              {this.state.notes.length > 1 ? this.state.notes.length + ` Notes` : null}
            </p>
            : null}
        </div>
        <div className=" flex justify-between py-2 items-center p-4">
          <div>
            <p className="text-xl font-medium">{moment().format('dddd, D')}</p>
            <p className="text-sm w-full text-gray-500">{moment().format('MMMM')}</p>
          </div>

          <div className="flex">
            {/* Add Icon */}
            {this.state.notes.length > 0 ? <button
              className="bg-black rounded-md text-white px-3 py-1 mr-2 items-center flex gap-2"
              onClick={() => this.setState({ modalOpen: true })}
            >
              <PlusIcon className="h-5" />
              <p className="md:flex hidden">Add Note!</p>
            </button> : null}
            <div>
              {client.email ? (
                <button
                  className="bg-red-300 rounded-md text-red-700 px-3 py-1 flex items-center gap-1"
                  onClick={() => {
                    localStorage.removeItem("client");
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
        <div className="mx-4 flex items-baseline gap-4">
          <p className="font-semibold text-2xl cursor-pointer" onClick={() => this.props.history.push('/dash')}>My Notes</p>
          <p className="text-lg text-gray-500 cursor-pointer" onClick={() => this.props.history.push('/shared')}>Shared Notes</p>
        </div>
        <div className="md:w-6/12 mx-auto">
          {this.state.gettingNotes === true ? (
            <div className="flex flex-col mt-10 text-gray-black opacity-40">
              <img src={loadingIcon} className="h-36 w-36 mx-auto" alt="loading" />
            </div>
          ) :
            this.state.noNotesYet === true ?
              <div className="flex flex-col mt-10 text-gray-black opacity-36">
                {/* <TrashIcon className="h-20 text-gray-600 " /> */}
                <h1 className="text-center mt-4 mx-20">
                  You do not have any notes at the moment
                </h1>
                <button className="bg-black rounded-sm text-white w-32 mt-4 mx-auto py-1" onClick={() => this.setState({modalOpen: true})}>Add Note</button>
              </div> : this.state.notes.map((task) => (
                <Task
                  title={task.title}
                  body={task.body}
                  id={task._id}
                  email={task.email}
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
          }
        </div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.setState({ modalOpen: false })}
          className=" w-screen h-screen p-4 flex flex-col bg-white md:w-9/12 mx-auto md:mt-10 md:rounded"
        >
          <div className="flex justify-between items-center mx-3 my-6">
            <p className=" text-2xl font-semibold">Create a note</p>
            <XIcon className="h-8 cursor-pointer" onClick={() => this.setState({ modalOpen: false })} />
          </div>
          <form
            className="flex flex-col p-4 pt-0"
            onSubmit={(e) => this.handleClick(e)}
          >
            <p className="text-red">{this.state.posterror}</p>
            <div className="w-full flex flex-col">
              <p className="text-sm">Title</p>
              <input
                type="text"
                className="p-2 border rounded mt-2"
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <p className="text-sm">Image Url</p>
              <input
                type="text"
                className="p-2 border rounded mt-2"
                onChange={(e) => this.setState({ image: e.target.value })}
              />
            </div>

            <div className="w-full flex flex-col">
              <p className="text-sm">Type in your main content here</p>
              <textarea
                type="text"
                placeholder="Type here..."
                className="p-2 border rounded mt-2"
                onChange={(e) => {
                  this.setState({ body: e.target.value });
                  this.setState({ posterror: "" });
                }}
              />
            </div>

            <button
              className="bg-black rounded p-2 mt-2 text-white mb-4"
              type="submit"
              onClick={() => this.setState({ noteText: <RefreshIcon className="h-6 mx-auto " /> })}
            >
              {this.state.noteText}
            </button>
            <button onClick={() => this.setState({ modalOpen: false })}>
              Discard
              </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Home;
